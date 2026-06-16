#!/bin/bash
# 一键打包国学传承 APK
# 请在本地 Android Studio 环境中运行

echo "========================================="
echo "国学传承 APK 打包脚本"
echo "========================================="

# 1. 检查是否有 Android SDK
if [ -z "$ANDROID_HOME" ]; then
  echo "⚠️  请先设置 ANDROID_HOME 环境变量"
  echo "   export ANDROID_HOME=~/Library/Android/sdk"
  echo "   或"
  echo "   export ANDROID_HOME=/Users/你的用户名/Library/Android/sdk"
  exit 1
fi

echo "✅ Android SDK found at $ANDROID_HOME"

# 2. 同步 Next.js 静态文件到 capacitor
echo ""
echo "🔄 复制静态文件 out/ 到 Android 项目..."
npx cap copy android
if [ $? -ne 0 ]; then
  echo "❌ copy 失败，请检查是否安装了 @capacitor/cli"
  echo "   运行: npm install @capacitor/cli"
  exit 1
fi
echo "✅ 静态文件复制完成"

# 3. 更新 Android 项目
echo ""
echo "🔄 更新 Android 依赖..."
npx cap update android
echo "✅ 更新完成"

# 4. 构建 APK
echo ""
echo "🏗️  开始构建 release APK..."
cd android
./gradlew assembleRelease
if [ $? -ne 0 ]; then
  echo "❌ 构建失败"
  exit 1
fi

# 5. 显示结果
echo ""
echo "✅ 构建完成!"
echo ""
APK_PATH="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
  SIZE=$(du -h "$APK_PATH" | cut -f1)
  echo "📦 APK 文件: $(pwd)/$APK_PATH ($SIZE)"
  echo ""
  echo "👉 下一步:"
  echo "   1. mv app/build/outputs/apk/release/app-release.apk ../deploy/app-download/guoxue/guoxue-chuancheng-v1.0.apk"
  echo "   2. 上传 deploy/ 整个目录到腾讯云 COS (按文档目录结构)"
else
  echo "⚠️  APK 文件未生成，请检查上面的错误日志"
fi

echo "========================================="
