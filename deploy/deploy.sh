#!/bin/bash
# 言道科技主站部署脚本
# 目标服务器: 82.156.228.87
# 目标目录: /www/yandao-app/current/

set -e

SERVER="root@82.156.228.87"
TARGET="/www/yandao-app/current"

echo "🚀 开始部署言道科技主站到 $SERVER ..."

# 确保目标目录和子目录存在
ssh $SERVER "mkdir -p $TARGET/app-pages $TARGET/app-download"

# 上传所有文件
echo "📦 上传主站文件..."
scp index.html app.html $SERVER:$TARGET/

echo "📦 上传子页面..."
scp app-pages/guoxue.html app-pages/shenghuo.html app-pages/yandao.html $SERVER:$TARGET/app-pages/

echo "📦 上传APK下载文件..."
scp -r app-download/guoxue $SERVER:$TARGET/app-download/

echo ""
echo "✅ 部署完成！"
echo "访问地址: https://yandao.vip"
echo ""
echo "--- 部署内容 ---"
echo "主站:   index.html, app.html"
echo "子页:   app-pages/guoxue.html, app-pages/shenghuo.html, app-pages/yandao.html"
echo "下载:   app-download/guoxue/guoxue-chuancheng-v1.0.apk"