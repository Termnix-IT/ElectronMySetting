# Electron React Template

今後の Electron アプリを始めるときに、そのまま複製して使える最小テンプレートです。  
`main / preload / renderer / shared` を分離しつつ、`React + Vite`、最小 `IPC`、`electron-builder`、`ESLint / Prettier` までを初期状態に含めています。

## 目的

- どの案件にも持っていける薄い土台を用意する
- `contextIsolation` を有効にした安全寄りの初期構成にする
- `window.electronAPI` を唯一の renderer 公開面に固定する
- 追加機能を入れすぎず、案件ごとに拡張しやすくする

## 含めているもの

- `Electron main / preload / renderer / shared` の分離
- `React + Vite` による renderer 開発環境
- `ping` と `app info` の最小 `IPC` サンプル
- `electron-builder` による Windows 向け package 基盤
- `ESLint` と `Prettier`

## 含めていないもの

- state management
- UI component library
- i18n
- auto-update
- authentication
- database integration
- unit test / e2e test

## ディレクトリ

```text
src/
  main/        Electron main process
  preload/     contextBridge で公開する最小 API
  renderer/    React + Vite UI
  shared/      IPC channel と共有型
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
```

## 開発フロー

### `npm run dev`

- `electron-vite` が main / preload / renderer をまとめて起動します
- renderer は Vite dev server で配信されます
- Electron は `preload` 経由でのみ renderer に API を公開します

### `npm run build`

- renderer を `dist/` に build
- main / preload を `dist-electron/` に build
- `electron-builder` で Windows 向け package を `release/` に出力

### `npm run preview`

- build 済み成果物を Electron で確認します

## IPC 方針

- renderer から `ipcRenderer` を直接使わない
- `preload` の `window.electronAPI` だけを公開面にする
- request / response 型と channel 名は `src/shared/ipc.ts` に置く

## 今後よく足す候補

- persistent storage
- app menu
- native notifications
- tray
- updater
- feature ごとの module 分割

## メモ

- 初期ターゲットは Windows です
- code signing と auto-update はこのテンプレートには入れていません
- アイコンや配布メタデータは、実案件に合わせて `build` 設定を更新してください
