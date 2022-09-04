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
import MakePotionsButton from './MakePotionsButton';
import PotionsModal from './PotionsModal';

export default function IngredientsSelectorPage() {
  const [search, setSearch] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const { isIngredientSelected, toggleIngredient, ingredientsSelected } =
    useIngredientsSelector();
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
      {ingredientsSelected.length >= 2 && (
        <MakePotionsButton onClick={() => setModalIsVisible(true)} />
      )}
      <PotionsModal
        isVisible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        ingredients={ingredientsSelected}
      />
    </MainPageContainer>
  );
}
