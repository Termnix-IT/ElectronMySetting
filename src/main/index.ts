import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';

import {
  IPC_CHANNELS,
  type AppInfo,
  type PingRequest,
  type PingResponse,
} from '@shared/ipc';

const isDev = !app.isPackaged;

function registerIpcHandlers() {
  ipcMain.handle(
    IPC_CHANNELS.ping,
    (_event, payload: PingRequest): PingResponse => {
      return {
        message: `main process received: ${payload.message}`,
        receivedAt: new Date().toISOString(),
      };
    },
  );

  ipcMain.handle(IPC_CHANNELS.getAppInfo, (): AppInfo => {
    return {
      appName: app.getName(),
      appVersion: app.getVersion(),
      electronVersion: process.versions.electron,
      chromeVersion: process.versions.chrome,
      nodeVersion: process.versions.node,
      platform: process.platform,
    };
  });
}

async function createWindow() {
  const window = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 960,
    minHeight: 640,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#f4efe6',
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    await window.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    await window.loadFile(join(__dirname, '../../dist/index.html'));
  }

  if (isDev) {
    window.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(async () => {
  registerIpcHandlers();
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
