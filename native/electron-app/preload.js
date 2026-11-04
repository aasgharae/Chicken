const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  save: (b) => ipcRenderer.invoke('save', b),
  load: () => ipcRenderer.invoke('load')
});
