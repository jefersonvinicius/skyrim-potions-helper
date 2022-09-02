import { Ingredient } from '@app/core/ingredient';
import React from 'react';
import { IngredientCardContainer } from './styles';

type Props = {
  ingredient: Ingredient;
};

export default function IngredientCard({ ingredient }: Props) {
  return (
    <IngredientCardContainer>
      {ingredient.image && <img src={ingredient.image} />}
      <h3>{ingredient.name}</h3>
    </IngredientCardContainer>
  );
}
