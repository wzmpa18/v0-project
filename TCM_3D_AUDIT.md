# TCM_3D_AUDIT

## 1. 交付范围
- 嵌入位置：中医首页快捷栏（保留原有分类菜单与网格布局，不改底层导航结构）。
- 新增入口：
  - `tcm-3d-anatomy`（3D人体解剖）
  - `tcm-acupuncture-sim`（虚拟针灸模拟）
  - `tcm-bone-reset`（正骨模拟）
- 路由实现：三入口统一进入 `components/pages/tcm-3d-page.tsx`，以 `initialTab` 指定子模块。

## 2. 模型与数据资产清单

### 2.1 3D模型资产
- 文件：`public/models/tcm-human-base.glb`
- 类型：基础版开发载体（占位模型）
- 状态：已接入 `GLTFLoader`；若加载失败自动 fallback 到程序生成人体壳体。
- 说明：当前用于功能联调，后续可无缝替换高精分层模型。

### 2.2 穴位坐标数据
- 文件：`public/tcm/acupoints.xyz.json`
- 内容：国标穴位样例点位（XYZ）、进针深度、留针时长、配伍配穴。
- 结构：独立 JSON，不依赖模型内置点位。
- 来源标注：含 `sourceRef.work/chapter/edition` 与 `version`。

### 2.3 经络路径数据
- 文件：`public/tcm/meridian-paths.json`
- 内容：经络循行离散点，使用 `CatmullRomCurve3` 生成连线。
- 来源标注：按条目标注《黄帝内经》《针灸甲乙经》章节与版本说明。

## 3. 子模块实现状态

### 3.1 3D人体解剖
- 代码：`components/pages/tcm-3d-page.tsx`（`anatomy`）
- 渲染技术：Three.js + GLB（GLTFLoader）。
- 分层显隐：支持皮肤/肌肉/骨骼/筋膜/内脏/血管显隐切换。
- 穴位系统：读取穴位 XYZ JSON，动态生成穴位光点。
- 经络系统：读取经络路径 JSON，使用 `CatmullRomCurve3` 动态绘制循行线。
- 病灶问诊：点击人体触发症状多选与自定义输入；提交后写入本地 triage 并跳转辨证入口。
- 状态：已实现（开发版）。

### 3.2 虚拟针灸模拟
- 代码：`components/pages/tcm-3d-page.tsx`（`acupuncture`）
- 方案切换：
  - 《针灸大成》
  - 董氏奇穴
  - 倪海厦方案
- 穴位信息：显示取穴位置、进针深度、留针时长、配伍配穴。
- 3D交互：
  - 圆柱针体刺入动画（TWEEN）。
  - 刺入时皮肤层缩放模拟凹陷。
  - 组织层级提示（皮肤→肌肉）与血管避让提示弹层文案。
- 状态：已实现（开发版，碰撞体为规则提示版）。

### 3.3 正骨模拟
- 代码：`components/pages/tcm-3d-page.tsx`（`bone-setting`）
- 功能：
  - 颈椎一键错位偏移
  - 腰椎一键错位偏移
  - TWEEN 动画平滑复位
- 状态：已实现（开发版示意骨块）。

## 4. 数据结构升级（经方本草）
- 文件：`lib/herbal-data.ts`
- 已升级字段：
  - `sourceRef`（work/chapter/clause/edition）
  - `version`
- 兼容策略：对未显式补齐条目进行统一归一化补齐，保证每条都有结构化来源与版本字段。

## 5. 依赖与工程改动
- 依赖新增：
  - `three`
  - `@tweenjs/tween.js`
- 接入文件：
  - `components/pages/tcm-page.tsx`（新增快捷入口）
  - `app/page.tsx`（新增路由分发）
  - `components/pages/tcm-3d-page.tsx`（三子模块主实现）
  - `public/tcm/*.json`、`public/models/*.glb`

## 6. 可商用状态评估
- 交互功能：可用于内测与演示。
- 数据层：已建立 sourceRef/version 结构，满足审计链路基础要求。
- 待增强项（上线前建议）：
  - 替换高精多层 GLB 模型并补充真实组织碰撞体。
  - 穴位/经络坐标全量化并做医学专家复核。
  - 将血管避让从规则提示升级为几何碰撞检测。
