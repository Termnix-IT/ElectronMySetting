import { contextBridge, ipcRenderer } from 'electron';

import {
  IPC_CHANNELS,
  type AppInfo,
  type PingRequest,
  type PingResponse,
} from '@shared/ipc';

const electronAPI = {
  ping: (payload: PingRequest) =>
    ipcRenderer.invoke(IPC_CHANNELS.ping, payload) as Promise<PingResponse>,
  getAppInfo: () =>
    ipcRenderer.invoke(IPC_CHANNELS.getAppInfo) as Promise<AppInfo>,
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export type ElectronAPI = typeof electronAPI;
