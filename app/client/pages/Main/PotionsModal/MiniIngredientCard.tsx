import { Ingredient } from '@app/core/ingredient';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 50px;

  & > img {
    height: 50px;
    width: 50px;
    object-fit: contain;
  }

  & > h2 {
    font-size: 10px;
    text-align: center;
  }
`;

type Props = {
  ingredient: Ingredient;
};

export default function MiniIngredientCard({ ingredient }: Props) {
  const src = ingredient.image
    ? '../../../static/images/' + ingredient.image
    : '../../../static/images/placeholder.jpg';

  return (
    <Container>
      <img src={src} />
      <h2>{ingredient.name}</h2>
    </Container>
  );
}
