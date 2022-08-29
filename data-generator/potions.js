import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import { cleanDOMText } from './common.js';

const POTIONS_PAGE =
  'https://elderscrolls.fandom.com/wiki/Created_Potions_(Skyrim)';
const OUTPUT_FILE = './potions.json';

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(POTIONS_PAGE, { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const potionsTable = document.querySelectorAll('table')[2];
    const rowsNodes = potionsTable
      .querySelector('tbody')
      .querySelectorAll('tr');
    const potionsResult = {};
    rowsNodes.forEach((row) => {
      const [potionColumn, ingredientsColumn] = row.querySelectorAll('td');
      potionsResult[potionColumn.textContent] =
        ingredientsColumn.textContent.split('\n');
    });
    return potionsResult;
  });

  const cleanResult = {};
  Object.entries(result).forEach(([potion, ingredients]) => {
    cleanResult[cleanDOMText(potion)] = ingredients
      .map(cleanDOMText)
      .filter((ingredient) => !!ingredient);
  });

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(cleanResult, null, 4));

  await browser.close();
}

main();
