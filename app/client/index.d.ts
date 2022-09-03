export interface App {
  saveIngredientsSelected: (selected: Record<string, boolean>) => void;
  readIngredientsSelected: () => Promise<Record<string, boolean>>;
}

declare global {
  interface Window {
    app: App;
  }
}
