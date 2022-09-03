import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > span {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <span>No ingredients found</span>
    </Container>
  );
}
