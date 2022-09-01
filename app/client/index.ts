import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    // },
  });

  win.loadFile(path.resolve(__dirname, 'index.html'));
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

export function startClient() {
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}