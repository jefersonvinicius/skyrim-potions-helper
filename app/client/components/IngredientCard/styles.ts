import styled from 'styled-components';

export const IngredientCardContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  transition-duration: 400ms;

  & > img {
    height: 300px;
    width: 100%;
    object-fit: contain;
  }

  & > h3 {
    text-align: center;
  }

  &:hover {
    box-shadow: 1px 1px 10px #000;
    cursor: pointer;
  }
`;
