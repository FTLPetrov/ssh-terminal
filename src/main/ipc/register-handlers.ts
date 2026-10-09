import { app, ipcMain } from 'electron'
import type { AppInfo } from '../../shared/contracts/desktop-api'
import { IPC_CHANNELS } from '../../shared/contracts/ipc-channels'
import { validateSender } from './validate-sender'

export function registerHandlers(rendererUrl: string): () => void {
  ipcMain.handle(IPC_CHANNELS.appGetInfo, (event, ...args: unknown[]): AppInfo => {
    validateSender(event, rendererUrl)

    if (args.length !== 0) {
      throw new Error('Application information does not accept arguments.')
    }

    return { name: app.getName(), version: app.getVersion() }
  })

  return () => ipcMain.removeHandler(IPC_CHANNELS.appGetInfo)
}
