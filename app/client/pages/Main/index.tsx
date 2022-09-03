import React, { useState } from 'react';
import IngredientCard from '@app/client/components/IngredientCard';
import Grid from '@app/client/components/Grid';
import SearchBar from './SearchBar';
import {
  useIngredientSearch,
  useIngredientsSelector,
} from '@app/client/hooks/ingredients';
import { Ingredient } from '@app/core/ingredient';
import NotFound from './NotFound';
import { MainPageContainer } from './styles';

export default function Main() {
  const [search, setSearch] = useState('');
  const { isIngredientSelected, toggleIngredient } = useIngredientsSelector();
  const { ingredients } = useIngredientSearch({ text: search });

  function handleIngredientClick(ingredient: Ingredient) {
    toggleIngredient(ingredient);
  }

  return (
    <MainPageContainer>
      <SearchBar value={search} onChangeValue={setSearch} />
      {ingredients.length ? (
        <Grid>
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.name}
              ingredient={ingredient}
              isSelected={isIngredientSelected(ingredient)}
              onClick={handleIngredientClick}
            />
          ))}
        </Grid>
      ) : (
        <NotFound />
      )}
    </MainPageContainer>
  );
}
