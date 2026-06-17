import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guoxuechuan.app',
  appName: '国学传承',
  webDir: 'out',
  android: {
    allowMixedContent: true,
  },
};

export default config;