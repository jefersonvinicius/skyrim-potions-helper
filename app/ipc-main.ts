import { ipcMain } from 'electron';
import { IngredientsStorage } from './storage/ingredients';

ipcMain.handle(
  'storage:saveIngredientsSelected',
  (_, selected: Record<string, boolean>) => {
    IngredientsStorage.saveSelected(selected);
  }
);

ipcMain.handle('storage:readIngredientsSelected', () => {
  return IngredientsStorage.readSelected();
});
