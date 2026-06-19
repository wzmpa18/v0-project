# TRAE 云端部署纯命令版

## 1. 构建网页资源

```bash
pnpm install
pnpm build
```

## 2. 上传内容

### 方式 A：SSH / rsync

```bash
rsync -avz --delete out/ user@server:/var/www/guoxue-web/
```

### 方式 B：腾讯云 COS

```bash
coscli cp -r out cos://your-bucket/guoxue-web/
```

### 方式 C：GitHub Actions

```yaml
- run: pnpm install --frozen-lockfile
- run: pnpm build
- run: rsync -avz --delete out/ user@server:/var/www/guoxue-web/
```

## 3. 服务器目录

```text
/var/www/guoxue-web/
├── index.html
├── 404.html
├── _next/
├── assets/runtime-manifest.json
├── data/acupoints.xyz.json
├── data/meridian-paths.json
├── models/tcm-human-base.glb
├── tcm/acupoints.xyz.json
└── tcm/meridian-paths.json
```

## 4. 云端地址

### `.env.local`

```bash
NEXT_PUBLIC_RESOURCE_BASE_URL=https://cdn.example.com/guoxue-web
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_REMOTE_RESOURCE_MODE=remote
```

### 重新打包 APK

```bash
pnpm build
npx cap sync android
```

## 5. 验证

```bash
curl -I https://cdn.example.com/guoxue-web/index.html
curl -I https://cdn.example.com/guoxue-web/models/tcm-human-base.glb
curl -I https://cdn.example.com/guoxue-web/data/acupoints.xyz.json
curl -I https://cdn.example.com/guoxue-web/data/meridian-paths.json
curl -I https://cdn.example.com/guoxue-web/tcm/acupoints.xyz.json
curl -I https://cdn.example.com/guoxue-web/tcm/meridian-paths.json
```

## 6. 关键配置文件

- [lib/app-config.ts](lib/app-config.ts)
- [TRAE_CLOUD_CONTENT_DEPLOY_GUIDE.md](TRAE_CLOUD_CONTENT_DEPLOY_GUIDE.md)
