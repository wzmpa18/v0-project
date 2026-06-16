========================================
国学传承 APP - 本地打包说明
========================================

【前置条件】
- Node.js 18+
- Android Studio (最新版)
- Android SDK 36+
- Java JDK 17+

【第一步：安装依赖】
npm install

【第二步：一键打包 APK】

Mac/Linux:
  chmod +x build-apk.sh
  ./build-apk.sh

Windows:
  双击 build-apk.bat

【第三步：APK 输出位置】
android/app/build/outputs/apk/release/app-release.apk

【第四步：部署到网站】
1. 把 APK 复制到:
   deploy/app-download/guoxue/guoxue-chuancheng-v1.0.apk

2. 上传 deploy/ 整个目录到腾讯云 COS:
   控制台：https://console.cloud.tencent.com/cos/bucket?bucket=yandao-1300262413&region=ap-guangzhou
   按 deploy/ 目录结构上传即可

【备用方案：用 Android Studio 打开】
如果脚本报错，直接用 Android Studio 打开 android/ 目录：
File → Open → 选择 android/ 文件夹 → Build → Build Bundle(s)/APK(s) → Build APK(s)

【如果修改了前端代码需要重新构建】
npm run build          # 重新生成静态文件
npx cap copy android   # 同步到 Android 项目
cd android && ./gradlew assembleRelease   # 重新打包 APK

========================================
联系方式
商务合作：wzmpa18@gmail.com
技术咨询：wuzhimin666@163.com
========================================