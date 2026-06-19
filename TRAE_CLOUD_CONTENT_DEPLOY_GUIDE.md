# TRAE 云端内容部署教程

本文档用于把当前项目的云端内容部署到服务器或对象存储，并让新打包的 APK 从云端加载 3D 模型、数据文件和前端静态资源。

## 0. 先给结论

当前项目的云端加载入口由 [lib/app-config.ts](lib/app-config.ts) 控制：

- `NEXT_PUBLIC_RESOURCE_BASE_URL`：资源根地址，决定 `/models/`、`/data/`、`/tcm/`、`/assets/` 这些资源从哪里加载。
- `NEXT_PUBLIC_API_BASE_URL`：接口根地址，如果页面还会访问后端 API，就一起配置。
- `NEXT_PUBLIC_REMOTE_RESOURCE_MODE=remote`：建议生产环境设置为 remote。

网页资源由 Next.js 静态导出生成到 `out/` 目录，`public/` 目录里的内容会被复制到导出产物中。

---

## 1. 需要上传的文件清单

### 1.1 必须上传的完整网页产物

如果你要让 APK 安装后完整加载页面、脚本、样式、3D 资源，最稳妥的做法是直接上传 `pnpm build` 生成的整个 `out/` 目录。

也就是说，服务器上最终要放的是 `out/` 里导出的全部文件，而不是只上传源码。

### 1.2 关键资源文件

当前项目里实际会被页面读取的资源路径如下：

- [public/models/tcm-human-base.glb](public/models/tcm-human-base.glb)
- [public/data/acupoints.xyz.json](public/data/acupoints.xyz.json)
- [public/data/meridian-paths.json](public/data/meridian-paths.json)
- [public/tcm/acupoints.xyz.json](public/tcm/acupoints.xyz.json)
- [public/tcm/meridian-paths.json](public/tcm/meridian-paths.json)
- [public/assets/runtime-manifest.json](public/assets/runtime-manifest.json) 如果你已经生成了资源清单，建议一并上传

### 1.3 建议按类型上传

TRAE 执行时建议把资源拆成三类：

1. 前端静态站点：`out/`
2. 3D 与业务资源：`public/models/`、`public/data/`、`public/tcm/`、`public/assets/runtime-manifest.json`
3. 如果你后续新增云端图片或静态文件，也放到 `public/` 对应目录并随 `out/` 一起发布

---

## 2. 服务器目录结构

### 2.1 推荐的线上目录

建议把网页静态站点统一发布到一个独立目录，例如：

```text
/var/www/guoxue-web/
├── index.html
├── 404.html
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
├── _next/
│   ├── static/
│   └── ...
├── apple-icon.png
├── icon.svg
└── icon-*.png
```

### 2.2 如果你用对象存储/CDN

推荐使用一个固定前缀，比如：

```text
guoxue-web/
├── index.html
├── assets/
├── data/
├── models/
├── tcm/
└── _next/
```

然后把 CDN 域名作为 `NEXT_PUBLIC_RESOURCE_BASE_URL`，例如：

```text
https://cdn.example.com/guoxue-web
```

### 2.3 资源最终访问路径

部署后，页面会按下面方式访问：

- `https://cdn.example.com/guoxue-web/models/tcm-human-base.glb`
- `https://cdn.example.com/guoxue-web/data/acupoints.xyz.json`
- `https://cdn.example.com/guoxue-web/data/meridian-paths.json`
- `https://cdn.example.com/guoxue-web/tcm/acupoints.xyz.json`
- `https://cdn.example.com/guoxue-web/tcm/meridian-paths.json`
- `https://cdn.example.com/guoxue-web/assets/runtime-manifest.json`

---

## 3. 上传方式

### 3.1 方式一：腾讯云 COS CLI / COSCMD

如果你用腾讯云 COS 作为静态资源仓库，TRAE 可以按下面思路执行。

#### 3.1.1 先构建

在项目根目录执行：

```bash
pnpm install
pnpm build
```

构建完成后，上传 `out/` 目录。

#### 3.1.2 使用 COSCLI 上传

示例命令：

```bash
coscli config init
coscli cp -r out cos://your-bucket/guoxue-web/
```

如果你只想增量同步静态资源，也可以单独同步这些目录：

```bash
coscli cp -r public/models cos://your-bucket/guoxue-web/models/
coscli cp -r public/data cos://your-bucket/guoxue-web/data/
coscli cp -r public/tcm cos://your-bucket/guoxue-web/tcm/
coscli cp public/assets/runtime-manifest.json cos://your-bucket/guoxue-web/assets/runtime-manifest.json
```

#### 3.1.3 使用 COSCMD 上传

如果团队沿用 COSCMD，执行逻辑同样是把 `out/` 或对应资源目录同步到桶里，路径结构保持一致即可。

### 3.2 方式二：直接通过 SSH 上传到服务器

适合你的服务器已经装了 Nginx 或 Caddy，能直接提供静态站点服务。

#### 3.2.1 构建产物

```bash
pnpm install
pnpm build
```

#### 3.2.2 使用 rsync

```bash
rsync -avz --delete out/ user@your-server:/var/www/guoxue-web/
```

如果你只想替换资源目录，也可以单独同步：

```bash
rsync -avz --delete public/models/ user@your-server:/var/www/guoxue-web/models/
rsync -avz --delete public/data/ user@your-server:/var/www/guoxue-web/data/
rsync -avz --delete public/tcm/ user@your-server:/var/www/guoxue-web/tcm/
rsync -avz public/assets/runtime-manifest.json user@your-server:/var/www/guoxue-web/assets/runtime-manifest.json
```

#### 3.2.3 Nginx 配置示例

```nginx
server {
  listen 80;
  server_name cdn.example.com;
  root /var/www/guoxue-web;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|ico|glb|json)$ {
    expires 7d;
    add_header Cache-Control "public";
  }
}
```

### 3.3 方式三：GitHub Actions 自动部署

适合你每次提交代码后自动把 `out/` 发布到服务器或 COS。

#### 3.3.1 自动部署到 SSH 服务器

示例流程：

1. 拉取仓库
2. 安装依赖
3. 执行 `pnpm build`
4. 把 `out/` 通过 SSH/rsync 部署到服务器

示例 YAML：

```yaml
name: Deploy Static Site

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Deploy out/
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          source: "out/*"
          target: "/var/www/guoxue-web"
```

#### 3.3.2 自动部署到 COS

如果你使用 COS，可以把 `out/` 上传到桶里，再通过 CDN 域名访问。

---

## 4. 验证步骤

上传完成后，TRAE 按下面顺序验证：

### 4.1 先检查静态资源是否可访问

打开以下 URL，确认都能返回 200：

- `https://cdn.example.com/guoxue-web/index.html`
- `https://cdn.example.com/guoxue-web/assets/runtime-manifest.json`
- `https://cdn.example.com/guoxue-web/models/tcm-human-base.glb`
- `https://cdn.example.com/guoxue-web/data/acupoints.xyz.json`
- `https://cdn.example.com/guoxue-web/data/meridian-paths.json`
- `https://cdn.example.com/guoxue-web/tcm/acupoints.xyz.json`
- `https://cdn.example.com/guoxue-web/tcm/meridian-paths.json`

### 4.2 检查浏览器网络请求

打开网页后，浏览器开发者工具里应该能看到资源请求都走云端地址，而不是本地 `localhost`。

重点看：

- `/models/tcm-human-base.glb`
- `/data/acupoints.xyz.json`
- `/data/meridian-paths.json`
- `/tcm/acupoints.xyz.json`
- `/tcm/meridian-paths.json`
- `/assets/runtime-manifest.json`

### 4.3 检查资源哈希

如果你已经生成了 `runtime-manifest.json`，可以在服务器上对照 SHA-256：

```bash
sha256sum models/tcm-human-base.glb
sha256sum data/acupoints.xyz.json
sha256sum data/meridian-paths.json
```

确保服务器上的文件哈希和清单里一致。

### 4.4 检查 APK 内的云端加载

安装新 APK 后，确认：

- 打开页面不再依赖本地资源
- 3D 人体模型能从云端加载
- 穴位、经络 JSON 能正常加载
- 资源加载失败时能显示友好提示，而不是黑屏或卡死

---

## 5. 更新 APK 的云端地址

### 5.1 需要改哪个配置文件

当前项目真正控制资源云端地址的是 [lib/app-config.ts](lib/app-config.ts)：

- `NEXT_PUBLIC_RESOURCE_BASE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_REMOTE_RESOURCE_MODE`

### 5.2 本地打包时怎么改

如果你是本地打包，修改 `.env.local`：

```bash
NEXT_PUBLIC_RESOURCE_BASE_URL=https://cdn.example.com/guoxue-web
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_REMOTE_RESOURCE_MODE=remote
```

然后重新执行：

```bash
pnpm build
npx cap sync android
```

再重新打 APK。

### 5.3 Codemagic 打包时怎么改

如果你是 Codemagic 构建 APK，把同样的变量配置到 Codemagic 的环境变量里：

- `NEXT_PUBLIC_RESOURCE_BASE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_REMOTE_RESOURCE_MODE`

这样每次重新打包出来的 APK，都会自动读取新的云端地址。

### 5.4 运行时临时覆盖

项目还支持浏览器本地存储覆盖：

- `RUNTIME_RESOURCE_BASE_URL`
- `RUNTIME_API_BASE_URL`

但正式发布时，建议仍然通过环境变量重新构建 APK。

---

## 6. 推荐给 TRAE 的执行顺序

1. 先执行 `pnpm build`，生成 `out/`
2. 把 `out/` 上传到服务器或 COS
3. 确认资源地址可访问
4. 修改 `.env.local` 或 Codemagic 环境变量中的 `NEXT_PUBLIC_RESOURCE_BASE_URL`
5. 重新构建 APK
6. 安装新 APK 验证云端加载

---

## 7. 一句话总结

这套项目的最佳实践是：

- 服务器/COS 负责承载 `out/` 和 `public/` 导出的静态资源
- APK 只负责壳和加载逻辑
- 云端内容更新后，只要替换服务器资源并重新打包一次 APK，就能让用户拿到新版本并从云端加载内容
