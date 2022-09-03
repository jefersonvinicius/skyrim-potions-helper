import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  border: none;
  background-color: #fff;
  box-shadow: 1px 1px 10px #999;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 20px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

type Props = {
  onClick: () => void;
};

export default function MakePotionsButton(props: Props) {
  return <Container {...props}>Make Potions</Container>;
}
