import fs from 'node:fs';
import { createFilename } from './common.js';

async function main() {
  const ingredients = JSON.parse(fs.readFileSync('./ingredients.json'));
  const result = [];

  for (const ingredient of ingredients) {
    const enriched = { name: ingredient.name };
    if (ingredient.image)
      enriched.image = createFilename(ingredient.name, 'png');
    result.push(enriched);
  }

  fs.writeFileSync('./enriched-ingredients.json', JSON.stringify(result));
}

main();
