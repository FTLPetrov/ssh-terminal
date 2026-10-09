import { BrowserWindow } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

export function validateSender(event: IpcMainInvokeEvent, rendererUrl: string): void {
  const window = BrowserWindow.fromWebContents(event.sender)
  const frame = event.senderFrame

  if (
    !window ||
    window.isDestroyed() ||
    !frame ||
    frame !== event.sender.mainFrame ||
    frame.url !== rendererUrl
  ) {
    throw new Error('Untrusted IPC sender.')
  }
}
