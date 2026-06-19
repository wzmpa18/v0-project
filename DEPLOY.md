# DEPLOY

## 1. 本地开发环境搭建与启动

### 1.1 环境要求
- Node.js 20+
- pnpm 9+
- JDK 21（用于 Android 构建）
- Android Studio（可选，调试 Android 壳工程时使用）
- Xcode 15+（仅 iOS 打包需要，macOS）

### 1.2 安装与启动
```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

### 1.3 关键原则
- 壳应用仅承载基础框架与容器能力。
- 业务数据与内容资源由远端加载，不在 APK/IPA 内硬编码服务器地址或密钥。
- 服务地址通过环境变量或运行时配置注入，可由部署方自由替换。

## 2. 构建用于分发的网页资源包

### 2.1 生产构建
```bash
pnpm build
```

说明：本项目使用 Next.js static export，构建产物输出到 out 目录，可直接部署到任意静态服务器/CDN。

### 2.2 可选本地验证
```bash
pnpm start
```

## 3. Codemagic 触发 Android 与 iOS 打包

### 3.1 Android
1. 将代码推送到远端仓库。
2. 在 Codemagic 选择工作流 release-android。
3. 执行步骤：安装依赖 -> 构建网页资源 -> npx cap sync android -> Gradle 产出 APK/AAB。
4. 制品路径：android/app/build/outputs/**。

### 3.2 iOS
1. 先在本地创建 iOS 壳工程并提交：
```bash
npx cap add ios
npx cap sync ios
```
2. 推送后在 Codemagic 选择工作流 release-ios。
3. 执行步骤：安装依赖 -> 构建网页资源 -> npx cap sync ios -> xcodebuild archive。
4. 若 ios/App 不存在，工作流会失败并提示先创建壳工程。

## 4. 将网页资源部署到自己的服务器

### 4.1 部署 out 目录
你可以选择任意基础设施：Nginx、对象存储（S3/OSS/COS）+ CDN、静态托管平台等。

### 4.2 Nginx 示例
```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /var/www/guoxue-out;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico)$ {
    expires 7d;
    add_header Cache-Control "public";
  }
}
```

### 4.3 客户端配置建议
- 在 .env.local 中配置 NEXT_PUBLIC_RESOURCE_BASE_URL 与 NEXT_PUBLIC_API_BASE_URL。
- 若客户端需要热切换服务器，可通过运行时配置（本地存储）覆盖地址。
- 生产环境不应把密钥放入前端环境变量；密钥应仅保存在服务端。

## 5. 常见问题

### 5.1 为什么不在壳工程里写死 server.url？
为了保证发行后可替换资源服务器，避免平台绑定与迁移成本。

### 5.2 如何切换到新的资源服务器？
只需要替换 NEXT_PUBLIC_RESOURCE_BASE_URL（构建时）或运行时覆盖地址（启动后），无需改动业务代码。
