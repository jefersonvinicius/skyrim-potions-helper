import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { cleanDOMText } from './common.js';

const INGREDIENTS_PAGE =
  'https://elderscrolls.fandom.com/wiki/Ingredients_(Skyrim)';
const OUTPUT_INGREDIENTS = path.join('./ingredients.json');
const browser = await puppeteer.launch({ headless: false });

async function main() {
  const page = await browser.newPage();
  await page.goto(INGREDIENTS_PAGE, { waitUntil: 'networkidle2' });
  await page.addScriptTag({ content: `${cleanDOMText}` });

  const rawIngredients = await page.evaluate(async () => {
    const ingredientsTable = document.querySelectorAll('table')[1];
    const cellsNodes = ingredientsTable.querySelectorAll('tr td:first-child');
    const cells = Array.from(cellsNodes);

    const result = [];
    for await (const cell of cells) {
      console.log(cell);
      const aElement = cell.querySelector('a');
      const ingredientName = cleanDOMText(cell.textContent);
      const ingredientLink = aElement?.href ?? '';

      result.push({ link: ingredientLink, name: ingredientName });
    }

    return result;
  });

  const file = fs.createWriteStream(OUTPUT_INGREDIENTS, {});
  file.write('[');
  let isFirst = true;
  for await (const ingredient of rawIngredients) {
    if (!isFirst) file.write(',');
    isFirst = false;

    if (!ingredient.link) {
      file.write(JSON.stringify(ingredient, null, 4));
      continue;
    }

    console.log(`Visiting ${ingredient.name} page...`);
    await page.goto(ingredient.link, { waitUntil: 'networkidle2' });
    const image = await page.evaluate(() => {
      return document
        .querySelector('.image.image-thumbnail')
        .querySelector('img').src;
    });
    file.write(JSON.stringify({ ...ingredient, image }, null, 4));
  }
  file.write(']');
  file.close();

  await browser.close();
}

main();
