# TRAE 云端内容部署速查版

目标：把当前项目的云端内容一次性部署到服务器/CDN，让 APK 安装后从云端加载页面、3D 模型、数据文件。

## 1. 需要上传的内容

把 `pnpm build` 生成的整个 `out/` 目录上传到服务器。

如果你要单独核对资源，关键文件是：

- `public/models/tcm-human-base.glb`
- `public/data/acupoints.xyz.json`
- `public/data/meridian-paths.json`
- `public/tcm/acupoints.xyz.json`
- `public/tcm/meridian-paths.json`
- `public/assets/runtime-manifest.json`

## 2. 服务器目录结构

```text
/var/www/guoxue-web/
├── index.html
├── 404.html
├── _next/
├── assets/
│   └── runtime-manifest.json
├── data/
│   ├── acupoints.xyz.json
│   └── meridian-paths.json
├── models/
│   └── tcm-human-base.glb
├── tcm/
│   ├── acupoints.xyz.json
│   └── meridian-paths.json
└── icon*.png / icon.svg / apple-icon.png
```

如果用 COS/CDN，就把同样目录结构放到桶里，例如：

```text
https://cdn.example.com/guoxue-web/
```

## 3. 上传方式

### 方式 A：SSH / rsync

```bash
pnpm install
pnpm build
rsync -avz --delete out/ user@server:/var/www/guoxue-web/
```

### 方式 B：腾讯云 COS / COSCLI

```bash
pnpm install
pnpm build
coscli cp -r out cos://your-bucket/guoxue-web/
```

### 方式 C：GitHub Actions 自动部署

1. push 到 `main`
2. Actions 执行 `pnpm install`
3. 执行 `pnpm build`
4. 用 SSH/rsync 或 COSCLI 上传 `out/`

## 4. 验证步骤

打开这些 URL，确认都能访问：

- `/index.html`
- `/assets/runtime-manifest.json`
- `/models/tcm-human-base.glb`
- `/data/acupoints.xyz.json`
- `/data/meridian-paths.json`
- `/tcm/acupoints.xyz.json`
- `/tcm/meridian-paths.json`

浏览器开发者工具里，资源请求应该走云端域名，而不是本地地址。

## 5. APK 云端地址要改哪里

改这几个环境变量：

- `NEXT_PUBLIC_RESOURCE_BASE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_REMOTE_RESOURCE_MODE=remote`

它们在 [lib/app-config.ts](lib/app-config.ts) 里被读取。

### 本地打包

修改 `.env.local`：

```bash
NEXT_PUBLIC_RESOURCE_BASE_URL=https://cdn.example.com/guoxue-web
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_REMOTE_RESOURCE_MODE=remote
```

然后重新打包：

```bash
pnpm build
npx cap sync android
```

### Codemagic 打包

在 Codemagic 环境变量里设置同样三项，然后重新触发 `release-android`。

## 6. 一次性执行顺序

1. `pnpm install`
2. `pnpm build`
3. 上传 `out/`
4. 配置云端地址
5. 重新打 APK
6. 安装验证

## 7. 结论

只要 `out/` 和上述资源能在云端正确访问，新的 APK 就能从云端加载完整功能。
