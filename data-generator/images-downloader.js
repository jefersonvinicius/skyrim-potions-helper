import axios from 'axios';
import fs from 'node:fs';
import { createFilename } from './common.js';

async function main() {
  const ingredientsWithImage = JSON.parse(
    fs.readFileSync('./ingredients.json')
  ).filter((ingredient) => !!ingredient.image);

  const ingredientsNames = {};
  const requests = ingredientsWithImage.map((ingredient) => {
    ingredientsNames[ingredient.image] = ingredient.name;
    return axios.get(ingredient.image, {
      responseType: 'stream',
    });
  });
  const results = await Promise.allSettled(requests);

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const response = result.value;
      const url = response.data.responseUrl;

      const extension = response.headers['content-type'].split('/').pop();
      const output = fs.createWriteStream(
        `./images/${createFilename(ingredientsNames[url], extension)}`
      );
      response.data.pipe(output);
      output.on('finish', () => output.close());
    }
  });
}

main();
