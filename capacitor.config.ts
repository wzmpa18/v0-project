import { getRuntimeConfig } from './lib/app-config'

type CapacitorConfig = {
  appId: string
  appName: string
  webDir: string
  bundledWebRuntime: boolean
  server: {
    url: string
    cleartext: boolean
    allowNavigation: string[]
  }
}

const runtimeConfig = getRuntimeConfig()

const config: CapacitorConfig = {
  appId: runtimeConfig.appId,
  appName: runtimeConfig.appName,
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: runtimeConfig.appShellUrl,
    cleartext: false,
    allowNavigation: [
      'app.guoxueyun.com',
      'api.guoxueyun.com',
      'ai.guoxueyun.com',
      'res.guoxueyun.com',
    ],
  },
}

export default config
