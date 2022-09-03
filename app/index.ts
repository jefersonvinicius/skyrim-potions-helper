import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.setMenu(null);

  const isDev = process.env.NODE_ENV === 'dev';

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  try {
    if (isDev) win.loadURL('http://localhost:9000/');
    else win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } catch (error) {
    console.log(error);
  }
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(async () => {
  await import('./ipc-main');

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
