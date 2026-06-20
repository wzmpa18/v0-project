type CapacitorConfig = {
  appId: string
  appName: string
  webDir: string
  bundledWebRuntime: boolean
  server: {
    url: string
    cleartext: boolean
    hostname: string
    androidScheme: string
  }
}

const config: CapacitorConfig = {
  appId: 'com.getcapacitor.myapp',
  appName: '国学综合',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/index.html',
    cleartext: true,
    hostname: 'yandao-1300262413.cos.ap-guangzhou.myqcloud.com',
    androidScheme: 'https',
  },
}

export default config
