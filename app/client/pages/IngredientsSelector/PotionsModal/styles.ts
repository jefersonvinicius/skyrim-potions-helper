import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 10px;

  & > div:not(:first-child) {
    margin-top: 10px;
  }

  & > div > div.ingredients-list {
    display: flex;
    flex-direction: row;
    overflow-y: auto;

    & > div:not(:first-child) {
      margin-left: 10px;
    }
  }

  & > div > h2 {
    margin-bottom: 10px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
