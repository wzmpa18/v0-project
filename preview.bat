@echo off
echo ============================================
echo   国学应用 - 本地预览启动
echo ============================================
echo.

cd /d %~dp0

if not exist node_modules (
    echo [1/3] 正在安装依赖...
    call npm install
    if errorlevel 1 (
        echo 依赖安装失败，请检查网络
        pause
        exit /b 1
    )
) else (
    echo [1/3] 依赖已存在，跳过安装
)

if not exist out (
    echo [2/3] 正在构建生产版本...
    call npm run build
    if errorlevel 1 (
        echo 构建失败
        pause
        exit /b 1
    )
) else (
    echo [2/3] 构建产物已存在
)

echo [3/3] 启动本地预览服务器 http://localhost:8080
echo.
echo 正在打开浏览器...
start http://localhost:8080/index.html
echo.

cd out
call npx --yes serve -l 8080 .

pause
