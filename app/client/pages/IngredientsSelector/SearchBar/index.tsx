import React from 'react';
import { SearchBarContainer } from './styles';

type Props = {
  value: string;
  onChangeValue: (value: string) => void;
};

export default function SearchBar({ onChangeValue, value }: Props) {
  return (
    <SearchBarContainer>
      <input
        placeholder="Ingredient name..."
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </SearchBarContainer>
  );
}
