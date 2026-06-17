import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guoxuechuan.app',
  appName: '国学传承',
  webDir: 'out',
  server: {
    allowNavigation: ['localhost', 'capacitor://localhost'],
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;