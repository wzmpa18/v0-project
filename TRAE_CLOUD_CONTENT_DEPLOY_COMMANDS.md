# TRAE 云端部署纯命令版

本项目固定使用以下 COS 参数，避免与你其他两个 APP 混淆：

- 桶名: yandao-1300262413
- 地域: ap-guangzhou
- 项目前缀: apps/guoxue/
- 访问域名: https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com

最终资源根地址:

- https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue

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
coscli cp -r out cos://yandao-1300262413/apps/guoxue/
```

可选: 上传前先清理历史内容，确保本项目目录完全覆盖

```bash
coscli rm -r -f cos://yandao-1300262413/apps/guoxue/
coscli cp -r out cos://yandao-1300262413/apps/guoxue/
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
NEXT_PUBLIC_RESOURCE_BASE_URL=https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue
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
curl -I https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue/index.html
curl -I https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue/models/tcm-human-base.glb
curl -I https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue/data/acupoints.xyz.json
curl -I https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue/data/meridian-paths.json
curl -I https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue/tcm/acupoints.xyz.json
curl -I https://yandao-1300262413.cos.ap-guangzhou.myqcloud.com/apps/guoxue/tcm/meridian-paths.json
```

## 7. 多 APP 隔离规则

- 本项目只使用 apps/guoxue/
- 其他项目建议分别使用 apps/app2/ 和 apps/app3/
- 任何上传命令都不要写到 guoxue-web/、app/ 这样的公共旧目录

## 6. 关键配置文件

- [lib/app-config.ts](lib/app-config.ts)
- [TRAE_CLOUD_CONTENT_DEPLOY_GUIDE.md](TRAE_CLOUD_CONTENT_DEPLOY_GUIDE.md)
