import { Ingredient } from '@app/core/ingredient';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [ingredientsSelectedStatuses, setIngredientsSelectedStatuses] =
    useState<Record<string, boolean> | undefined>(undefined);

  useEffect(() => {
    window.app.readIngredientsSelected().then(setIngredientsSelectedStatuses);
  }, []);

  useEffect(() => {
    if (ingredientsSelectedStatuses)
      window.app.saveIngredientsSelected(ingredientsSelectedStatuses);
  }, [ingredientsSelectedStatuses]);

  const toggleIngredient = useCallback((ingredient: Ingredient) => {
    setIngredientsSelectedStatuses((old) => ({
      ...old,
      [ingredient.name]:
        old?.[ingredient.name] !== undefined ? !old[ingredient.name] : true,
    }));
  }, []);

  const isIngredientSelected = useCallback(
    (ingredient: Ingredient) => {
      return !!ingredientsSelectedStatuses?.[ingredient.name];
    },
    [ingredientsSelectedStatuses]
  );

  const ingredientsSelected = useMemo(() => {
    const ingredientsNames = Object.entries(ingredientsSelectedStatuses ?? {})
      .filter(([, selected]) => selected === true)
      .map(([name]) => name);

    return allIngredients.filter((ingredient) =>
      ingredientsNames.includes(ingredient.name)
    );
  }, [ingredientsSelectedStatuses]);

  return {
    isIngredientSelected,
    toggleIngredient,
    ingredientsSelected,
  };
}
