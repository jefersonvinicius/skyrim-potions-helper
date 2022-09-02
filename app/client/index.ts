import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  try {
    win.setMenu(null);
    win.loadURL('http://localhost:9000/');
  } catch (error) {
    console.log(error);
  }
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
