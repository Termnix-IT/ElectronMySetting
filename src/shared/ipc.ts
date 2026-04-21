export const IPC_CHANNELS = {
  ping: 'app:ping',
  getAppInfo: 'app:get-app-info',
} as const;

export interface PingRequest {
  message: string;
}

export interface PingResponse {
  message: string;
  receivedAt: string;
}

export interface AppInfo {
  appName: string;
  appVersion: string;
  electronVersion: string;
  chromeVersion: string;
  nodeVersion: string;
  platform: string;
}
