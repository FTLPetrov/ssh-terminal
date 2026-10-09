export interface AppInfo {
  name: string
  version: string
}

// Add named capabilities as their implementations become available.
export interface DesktopApi {
  app: {
    getInfo: () => Promise<AppInfo>
  }
}
