import { getRuntimeConfig } from './lib/app-config'

type CapacitorConfig = {
  appId: string
  appName: string
  webDir: string
  bundledWebRuntime: boolean
}

const runtimeConfig = getRuntimeConfig()

const config: CapacitorConfig = {
  appId: runtimeConfig.appId,
  appName: runtimeConfig.appName,
  webDir: 'out',
  bundledWebRuntime: false,
}

export default config
