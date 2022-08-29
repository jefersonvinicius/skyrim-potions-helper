
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { cleanDOMText, currentPath } from './common.js';

const INGREDIENTS_PAGE = "https://elderscrolls.fandom.com/wiki/Ingredients_(Skyrim)";
const OUTPUT_INGREDIENTS = path.join(currentPath, "..", "ingredients.json")

async function main() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(INGREDIENTS_PAGE, {waitUntil: 'networkidle2'})
    
    const dirtIngredientsList = await page.evaluate(() => {
        const ingredientsTable = document.querySelectorAll('table')[1]
        const cellsNodes = ingredientsTable.querySelectorAll('tr td:first-child')
        const cells = Array.from(cellsNodes)
        const cellsValues = cells
            .map(cell => cell.textContent)
        return cellsValues
    })
    
    const cleanIngredients = dirtIngredientsList.map(ingredient => cleanDOMText(ingredient))

    await fs.writeFile(OUTPUT_INGREDIENTS, JSON.stringify(cleanIngredients, null, 4));
    
    await browser.close()
}

main()