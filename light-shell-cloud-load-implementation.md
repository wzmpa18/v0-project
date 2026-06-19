# 轻壳云加载实施说明

## 1. 目标

- APK 仅保留 Capacitor 容器，业务资源全部云端加载。
- 资源采用 SHA-256 清单校验，防止篡改。
- 支持断网提示与本地缓存兜底，避免无限转圈。
- API 统一通过配置中心管理地址、鉴权、超时重试与限流参数。

## 2. 环境变量配置

复制并填写环境变量模板：

```bash
cp .env.example .env.local
```

至少需要配置以下变量：

- NEXT_PUBLIC_APP_SHELL_URL
- NEXT_PUBLIC_API_BASE_URL
- NEXT_PUBLIC_AI_API_BASE_URL
- NEXT_PUBLIC_RESOURCE_BASE_URL
- NEXT_PUBLIC_DUANZI_BATCH_API_PATH
- NEXT_PUBLIC_API_AUTH_TOKEN
- NEXT_PUBLIC_AI_AUTH_TOKEN
- NEXT_PUBLIC_API_TIMEOUT_MS
- NEXT_PUBLIC_API_RETRY_TIMES
- NEXT_PUBLIC_API_RATE_LIMIT_PER_MINUTE

注意：服务端主密钥只能使用 SERVER_ 前缀变量，不得以 NEXT_PUBLIC_ 暴露。

## 3. 生成资源清单

执行资源清单脚本：

```bash
node scripts/generate-resource-manifest.mjs --input=public --output=public/assets/runtime-manifest.json
```

脚本输出包括：

- 每个资源文件的路径、大小、SHA-256
- 分类清单（data/models/tcm/images/scripts/json 等）
- totalFiles 与 totalBytes 汇总

## 4. 本地自检流程

按顺序执行：

```bash
C:/Users/ZhuanZ/.workbuddy/binaries/node/versions/22.22.2/node.exe ./node_modules/typescript/bin/tsc --noEmit
node scripts/generate-resource-manifest.mjs --input=public --output=public/assets/runtime-manifest.json
node scripts/selftest-light-shell.mjs
```

自检覆盖：

- TypeScript 全量静态检查
- 资源清单生成与 SHA-256 校验
- 网络监听、断网提示、离线缓存配置契约
- API 超时、重试、鉴权、限流配置契约

## 5. Codemagic 打包约束

- codemagic.yaml 必须位于项目根目录
- max_build_duration 必须为 120
- JAVA_VERSION 必须为 "21.0.0"
- 不允许添加国内镜像源

## 6. Android 构建约束

android/build.gradle 固定保留以下结构：

```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:8.5.0"
    }
}
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

## 7. 上线步骤

1. 完成本地自检并提交到 main。
2. 在 Codemagic 触发 release-android。
3. 下载 artifacts 中 APK/AAB。
4. 切换新服务器时仅更新云端资源与环境变量，无需重新打包 APK。
