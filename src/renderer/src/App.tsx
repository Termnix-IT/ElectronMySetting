import { useEffect, useState } from 'react';

import type { AppInfo, PingResponse } from '@shared/ipc';

const initialPingMessage = 'hello from renderer';

export default function App() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [pingResult, setPingResult] = useState<PingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void window.electronAPI.getAppInfo().then((result) => {
      setAppInfo(result);
      setIsLoading(false);
    });
  }, []);

  const handlePing = async () => {
    const response = await window.electronAPI.ping({
      message: initialPingMessage,
    });

    setPingResult(response);
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Electron Template</p>
        <h1>最小構成のまま、次のデスクトップアプリに持っていける土台。</h1>
        <p className="lead">
          `main / preload / renderer / shared` を分離し、最初の IPC と build
          まで揃えた React + Vite ベースのテンプレートです。
        </p>
        <div className="hero-actions">
          <button type="button" onClick={handlePing}>
            Ping main process
          </button>
          <span>
            {pingResult
              ? `${pingResult.message} (${new Date(
                  pingResult.receivedAt,
                ).toLocaleTimeString()})`
              : 'まだ疎通確認はしていません。'}
          </span>
        </div>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <div className="panel-header">
            <p>Runtime</p>
            <strong>{isLoading ? 'Loading...' : 'Connected'}</strong>
          </div>
          <dl className="info-list">
            <div>
              <dt>App</dt>
              <dd>{appInfo?.appName ?? '-'}</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{appInfo?.appVersion ?? '-'}</dd>
            </div>
            <div>
              <dt>Electron</dt>
              <dd>{appInfo?.electronVersion ?? '-'}</dd>
            </div>
            <div>
              <dt>Chrome</dt>
              <dd>{appInfo?.chromeVersion ?? '-'}</dd>
            </div>
            <div>
              <dt>Node</dt>
              <dd>{appInfo?.nodeVersion ?? '-'}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{appInfo?.platform ?? '-'}</dd>
            </div>
          </dl>
        </article>

        <article className="panel accent-panel">
          <div className="panel-header">
            <p>Included</p>
            <strong>Template Baseline</strong>
          </div>
          <ul className="feature-list">
            <li>contextIsolation 有効 / nodeIntegration 無効</li>
            <li>window.electronAPI 経由のみで renderer に公開</li>
            <li>shared 型で IPC の request / response を共通化</li>
            <li>electron-builder による Windows 配布の土台</li>
            <li>ESLint / Prettier を初期状態から利用可能</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
