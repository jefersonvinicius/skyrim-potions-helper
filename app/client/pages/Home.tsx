import React from 'react';
import IngredientCard from '@app/client/components/IngredientCard';
import ingredients from '@app/client/static/ingredients.json';
import Grid from '@app/client/components/Grid';

export default function Home() {
  return (
    <Grid>
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient.name} ingredient={ingredient} />
      ))}
    </Grid>
  );
}
