import { Ingredient } from '@app/core/ingredient';
import { useCallback, useEffect, useRef, useState } from 'react';
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

export function useIngredientsSelector() {
  const [ingredientsSelected, setIngredientsSelected] = useState<
    Record<string, boolean> | undefined
  >(undefined);

  console.log({ ingredientsSelected });

  useEffect(() => {
    window.app.readIngredientsSelected().then(setIngredientsSelected);
  }, []);

  useEffect(() => {
    if (ingredientsSelected)
      window.app.saveIngredientsSelected(ingredientsSelected);
  }, [ingredientsSelected]);

  const toggleIngredient = useCallback((ingredient: Ingredient) => {
    setIngredientsSelected((old) => ({
      ...old,
      [ingredient.name]:
        old?.[ingredient.name] !== undefined ? !old[ingredient.name] : true,
    }));
  }, []);

  const isIngredientSelected = useCallback(
    (ingredient: Ingredient) => {
      return !!ingredientsSelected?.[ingredient.name];
    },
    [ingredientsSelected]
  );

  return { isIngredientSelected, toggleIngredient };
}
