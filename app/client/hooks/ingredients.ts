import { Ingredient } from '@app/core/ingredient';
import { useEffect, useRef, useState } from 'react';
import allIngredients from '@app/client/static/ingredients.json';

type SearchParams = {
  text: string;
};

export function useIngredientSearch({ text }: SearchParams) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(allIngredients);

  const searchTimeout = useRef(0);
  useEffect(() => {
    const normalized = text.trim();
    if (normalized) {
      searchTimeout.current = window.setTimeout(() => {
        const filtered = allIngredients.filter((ingredient) =>
          normalizeText(ingredient.name).includes(normalized)
        );
        setIngredients(filtered);
      }, 200);
    } else {
      setIngredients(allIngredients);
    }

    return () => {
      window.clearTimeout(searchTimeout.current);
    };
  }, [text]);

  return { ingredients };
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}
