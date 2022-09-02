import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;

  & > input {
    padding: 10px;
    width: 60%;
    text-align: center;
    border: none;
    font-size: 18px;
    outline: none;
  }
`;
