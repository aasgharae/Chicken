const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

function dataDir() {
  const d = path.join(app.getPath('documents'), 'Poultry');
  fs.mkdirSync(d, { recursive: true });
  return d;
}
ipcMain.handle('save', (e, buf) => {
  fs.writeFileSync(path.join(dataDir(), 'poultry.sqlite'), Buffer.from(buf));
  return true;
});
ipcMain.handle('load', () => {
  const f = path.join(dataDir(), 'poultry.sqlite');
  return fs.existsSync(f) ? fs.readFileSync(f) : null;
});

app.whenReady().then(() => {
  const w = new BrowserWindow({
    width: 520, height: 900, autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  w.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  w.loadFile(path.join(__dirname, 'www', 'index.html'));
});
app.on('window-all-closed', () => app.quit());
