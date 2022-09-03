import store from './store';

const INGREDIENTS_SELECTED_KEY = '@@ingredients_selected';

export class IngredientsStorage {
  static saveSelected(selected: Record<string, boolean>) {
    store.set(INGREDIENTS_SELECTED_KEY, JSON.stringify(selected));
  }

  static readSelected() {
    const str = (store.get(INGREDIENTS_SELECTED_KEY) ?? '') as string;

    if (!str) return {};
    return JSON.parse(str) as Record<string, boolean>;
  }
}
