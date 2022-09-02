import React, { useState } from 'react';
import IngredientCard from '@app/client/components/IngredientCard';
import Grid from '@app/client/components/Grid';
import SearchBar from './SearchBar';
import { useIngredientSearch } from '@app/client/hooks/ingredients';
import { Ingredient } from '@app/core/ingredient';

export default function Home() {
  const [search, setSearch] = useState('');
  const [ingredientsSelected, setIngredientsSelected] = useState<{
    [key: string]: boolean;
  }>({});
  const { ingredients } = useIngredientSearch({ text: search });

  function handleIngredientClick(ingredient: Ingredient) {
    setIngredientsSelected((old) => ({
      ...old,
      [ingredient.name]:
        old[ingredient.name] !== undefined ? !old[ingredient.name] : true,
    }));
  }

  return (
    <div>
      <SearchBar value={search} onChangeValue={setSearch} />
      <Grid>
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.name}
            ingredient={ingredient}
            isSelected={ingredientsSelected[ingredient.name]}
            onClick={handleIngredientClick}
          />
        ))}
      </Grid>
    </div>
  );
}
