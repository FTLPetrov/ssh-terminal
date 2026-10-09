import { join } from 'node:path'
import { BrowserWindow } from 'electron'

export async function createMainWindow(rendererUrl: string): Promise<BrowserWindow> {
  const window = new BrowserWindow({
    title: 'SSH Desktop',
    width: 1200,
    height: 800,
    minWidth: 760,
    minHeight: 500,
    backgroundColor: '#1F1F1F',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: false,
    },
  })

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  window.webContents.on('will-navigate', (event) => event.preventDefault())
  window.webContents.on('will-redirect', (event) => event.preventDefault())
  window.webContents.on('will-attach-webview', (event) => event.preventDefault())
  window.once('ready-to-show', () => window.show())

  try {
    await window.loadURL(rendererUrl)
  } catch (error) {
    window.destroy()
    throw error
  }

  return window
}
