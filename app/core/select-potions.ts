import potions from './potions.json';

function ingredientsMatches(
  potionIngredients: string[],
  ingredients: string[]
) {
  return ingredients.filter((ingredient) =>
    potionIngredients.includes(ingredient)
  );
}

type PotionSelectorParams = {
  ingredients: string[];
};

export function selectPotions({ ingredients }: PotionSelectorParams) {
  const result: { potion: string; ingredients: string[] }[] = [];
  Object.entries(potions).forEach(([potion, potionIngredients]) => {
    const matched = ingredientsMatches(potionIngredients, ingredients);
    if (matched.length > 1) {
      result.push({ potion, ingredients: matched });
    }
  });
  return result;
}
