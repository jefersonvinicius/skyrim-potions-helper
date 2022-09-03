import ingredientsImages from '@app/client/data/ingredients-images.json';

export function getIngredientImage(ingredientName: string) {
  return (ingredientsImages as Record<string, string | undefined>)[
    ingredientName
  ];
}
