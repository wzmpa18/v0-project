@echo off
chcp 65001 >nul
echo =========================================
echo 国学传承 APK 打包脚本 (Windows)
echo =========================================
echo.

:: 1. 检查 Android SDK
if "%ANDROID_HOME%"=="" (
  echo ⚠️ 请先设置 ANDROID_HOME 环境变量
  echo    set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
  pause
  exit /b 1
)

echo ✅ Android SDK found at %ANDROID_HOME%

:: 2. 同步静态文件
echo.
echo 🔄 复制静态文件 out/ 到 Android 项目...
call npx cap copy android
if %errorlevel% neq 0 (
  echo ❌ copy 失败，请检查是否安装了 @capacitor/cli
  echo   运行: npm install @capacitor/cli
  pause
  exit /b 1
)
echo ✅ 静态文件复制完成

:: 3. 更新依赖
echo.
echo 🔄 更新 Android 依赖...
call npx cap update android
echo ✅ 更新完成

:: 4. 构建 APK
echo.
echo 🏗️ 开始构建 release APK...
cd android
call gradlew assembleRelease
if %errorlevel% neq 0 (
  echo ❌ 构建失败
  pause
  exit /b 1
)

:: 5. 显示结果
echo.
echo ✅ 构建完成!
echo.
echo 📦 APK 文件: android\app\build\outputs\apk\release\app-release.apk
echo.
echo 👉 下一步:
echo    1. 把 APK 文件复制到 deploy\app-download\guoxue\guoxue-chuancheng-v1.0.apk
echo    2. 上传 deploy/ 整个目录到腾讯云 COS
echo.
echo =========================================
pause