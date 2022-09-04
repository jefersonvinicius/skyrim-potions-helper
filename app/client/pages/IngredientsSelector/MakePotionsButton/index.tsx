import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  border: none;
  background-color: #fff;
  box-shadow: 1px 1px 10px #999;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 15px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }

  & > img {
    width: 40px;
    height: 40px;
  }
`;

type Props = {
  onClick: () => void;
};

export default function MakePotionsButton(props: Props) {
  return (
    <Container {...props}>
      <img src="./static/icons/potion.png " />
    </Container>
  );
}
