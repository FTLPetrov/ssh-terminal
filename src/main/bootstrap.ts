import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { app, BrowserWindow, session } from 'electron'
import { registerHandlers } from './ipc/register-handlers'
import { createMainWindow } from './windows/window-manager'

function getRendererUrl(): string {
  const developmentUrl = process.env['ELECTRON_RENDERER_URL']

  if (!app.isPackaged && developmentUrl) {
    const url = new URL(developmentUrl)

    if (url.origin !== 'http://127.0.0.1:5173' || url.pathname !== '/') {
      throw new Error('Unexpected renderer development URL.')
    }

    return url.href
  }

  return pathToFileURL(join(__dirname, '../renderer/index.html')).href
}

export async function bootstrap(): Promise<void> {
  const rendererUrl = getRendererUrl()

  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => {
    callback(false)
  })
  session.defaultSession.setPermissionCheckHandler(() => false)

  const removeHandlers = registerHandlers(rendererUrl)
  app.once('will-quit', removeHandlers)

  await createMainWindow(rendererUrl)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createMainWindow(rendererUrl).catch((error: unknown) => {
        console.error('Could not reopen the application window.', error)
        app.quit()
      })
    }
  })
}
