import { app, dialog, nativeTheme } from 'electron'
import { bootstrap } from './bootstrap'

app.setName('SSH Desktop')

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

void app.whenReady().then(async () => {
  app.setAppUserModelId('local.ssh-desktop')
  nativeTheme.themeSource = 'dark'

  try {
    await bootstrap()
  } catch (error) {
    console.error('Application startup failed.', error)
    dialog.showErrorBox(
      'SSH Desktop could not start',
      'Please restart the application and try again.',
    )
    app.exit(1)
  }
})
