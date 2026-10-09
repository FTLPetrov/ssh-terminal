export function mountApp(root: HTMLElement): void {
  root.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" aria-labelledby="connections-heading">
        <div class="sidebar-heading">
          <h2 id="connections-heading">Connections</h2>
          <span class="connection-count" aria-label="0 saved connections">0</span>
        </div>
        <p class="sidebar-empty">No saved connections yet.</p>
      </aside>

      <main class="workspace" aria-labelledby="welcome-heading">
        <div class="workspace-heading">Welcome</div>
        <div class="welcome">
          <svg class="app-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="44" height="38" rx="6" />
            <path d="m12 16 8 8-8 8m14 0h10" />
          </svg>
          <p class="eyebrow">Initial setup</p>
          <h1 id="welcome-heading">SSH Desktop</h1>
          <p class="welcome-description">A workspace for your servers and terminal sessions.</p>
          <p class="setup-note">Saved connections and SSH terminals are coming next.</p>
        </div>
      </main>

      <footer class="statusbar" aria-label="Application status">
        <p class="app-status" role="status" aria-live="polite" aria-atomic="true">
          <span class="status-indicator" aria-hidden="true"></span>
          <span data-app-status>Starting…</span>
        </p>
        <span class="app-version" data-app-version></span>
      </footer>
    </div>
  `

  void loadAppInfo(root)
}

async function loadAppInfo(root: HTMLElement): Promise<void> {
  const status = root.querySelector<HTMLElement>('[data-app-status]')
  const version = root.querySelector<HTMLElement>('[data-app-version]')

  if (!status || !version) {
    return
  }

  try {
    const info = await window.desktop.app.getInfo()
    document.title = info.name
    status.textContent = 'Initial setup ready'
    version.textContent = `v${info.version}`
    root.dataset.ready = 'true'
  } catch {
    status.textContent = 'App information is unavailable. Restart SSH Desktop to try again.'
    root.dataset.ready = 'false'
  }
}
