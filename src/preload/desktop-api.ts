import { ipcRenderer } from 'electron'
import type { DesktopApi } from '../shared/contracts/desktop-api'
import { IPC_CHANNELS } from '../shared/contracts/ipc-channels'

export const desktopApi: DesktopApi = {
  app: {
    getInfo: () => ipcRenderer.invoke(IPC_CHANNELS.appGetInfo),
  },
}
