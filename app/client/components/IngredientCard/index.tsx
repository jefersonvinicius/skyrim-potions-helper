import React from 'react';
import { Ingredient } from '@app/core/ingredient';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IngredientCardContainer } from './styles';

type Props = {
  ingredient: Ingredient;
  isSelected: boolean;
  onClick: (ingredient: Ingredient) => void;
};

export default function IngredientCard({
  ingredient,
  isSelected,
  onClick,
}: Props) {
  return (
    <IngredientCardContainer onClick={() => onClick(ingredient)}>
      {ingredient.image && <img src={'../static/images/' + ingredient.image} />}
      <h3>{ingredient.name}</h3>
      {isSelected && (
        <div className="check-icon">
          <AiFillCheckCircle size={25} color="#9ccc65" />
        </div>
      )}
    </IngredientCardContainer>
  );
}
