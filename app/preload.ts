import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('app', {
  saveIngredientsSelected: (...args: any) =>
    ipcRenderer.invoke('storage:saveIngredientsSelected', ...args),
  readIngredientsSelected: () =>
    ipcRenderer.invoke('storage:readIngredientsSelected'),
});
