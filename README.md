# 国学综合应用

基于 Next.js 的离线优先国学与中医综合应用，当前包含排盘、经方本草、学习资料、中医辅助分析等模块。

## 本地开发

安装依赖后运行：

```bash
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm start
```

## 当前工程约束

- 默认以本地静态数据运行，不依赖固定第三方服务。
- 页面保留现有模块结构，优先补齐缺失功能与正式文案。
- 构建流程不绑定 v0 / Vercel 专属注入脚本。

## 网络与资源扩展

- 全局网络入口使用环境变量配置：`NEXT_PUBLIC_API_BASE_URL`、`NEXT_PUBLIC_RESOURCE_BASE_URL`。
- 可切换资源模式：`NEXT_PUBLIC_REMOTE_RESOURCE_MODE=bundled|remote`。
- 离线缓存前缀可配置：`NEXT_PUBLIC_OFFLINE_CACHE_PREFIX`。
- 可开启资源加密开关：`NEXT_PUBLIC_ENABLE_ENCRYPTED_RESOURCES=true`。

## 壳 APK 架构预留

- 已补齐 `android/` 目录与 Capacitor 配置文件：`capacitor.config.ts`、`capacitor.config.json`。
- Android Gradle 仓库源仅保留 `google()` 与 `mavenCentral()`。
- Java 编译目标固定为 21，Codemagic 侧配置同步为 `JAVA_VERSION=21.0.0`。

## Codemagic 规范

- 配置文件位于根目录：`codemagic.yaml`。
- `max_build_duration` 固定为 `120`。
- 构建文件需保持 UTF-8 无 BOM。

## Codemagic 流程摘要

- 安装依赖：`npm install`
- 前端导出：`npm run build`
- 同步壳工程：`npx cap sync android`
- APK 构建：`cd android && ./gradlew assembleRelease`
- AAB 构建：`cd android && ./gradlew bundleRelease`

## 商用改造文档

- 数据契约：`docs/COMMERCIAL_DATA_SCHEMA.md`
- 竞品对标矩阵：`docs/BENCHMARK_MATRIX.md`
- 差距报告：`docs/COMMERCIAL_GAP_REPORT.md`

## Git 拉取加速说明

- 若网络受限，请按你所在环境使用可审计的 Git 代理策略。
- 生产环境建议保持统一远端地址策略，避免开发与构建环境不一致。
