const { selectPotions } = require('./dist/select-potions');

async function main() {
  const ingredients = ['Blue Dartwing', 'Nordic Barnacle', 'Abecean Longfin'];
  const result = selectPotions({ ingredients });
  console.table(result);
}

main();
