# DATA_AUDIT

## 审计范围
- 范围：八字、排盘页（含奇门/六爻入口）、大六壬页面数据层。
- 目标：在不复刻任何竞品品牌、UI 或文案格式前提下，实现可追踪的商业数据内核。
- 结论：已建立“刘文元体系 + 开源引擎 + 缘份居API适配”并行架构，前端可按 provider 切换。

## 数据来源与理论依据

### 1. 八字（Bazi）
- 计算引擎：
  - 本地引擎：`lunar-javascript` + 现有规则函数（`lib/bazi-data.ts`）。
  - 远端引擎：缘份居 API（`/bazi/paipan`，由 `lib/yixue/bazi-engine.ts` 适配）。
- 理论体系：
  - 主体系：刘文元四柱命理体系（`lib/yixue/liu-wenyuan-profile.ts`）。
  - 规则位：用神不变论、食生忘克、真太阳时优先、干支并审。
- 审计字段：
  - `kernel`: `yuanfenju-api` | `local-open-engine`
  - `ruleSetVersion`: 默认 `liuwenyuan-v1`
  - `theory`: 刘文元四柱命理体系
- 当前状态：部分通过
  - 已完成：provider 切换、规则版本字段、fallback 策略。
  - 待补：与后端签署稳定 schema（sourceRef 到每条断语级）。

### 2. 大六壬（Luren）
- 计算引擎：当前为本地规则实现（`lib/luren-data.ts` + `components/pages/luren-page.tsx`）。
- 理论依据：以传统课传推演逻辑为基础，需补齐“刘文元系解释层”映射。
- 审计字段：当前缺少标准化 `sourceRef` 与步骤级 trace。
- 当前状态：待补
  - 待完成项：
    - 四课（第一课至第四课）推导过程结构化输出。
    - 三传形成路径（贼克/比用/涉害等）与能量权重可追踪。
    - 每条断语绑定来源与版本号。

### 3. 奇门 / 六爻（Paipan 子模块）
- 计算引擎：页面内本地规则为主（`components/pages/paipan-page.tsx`）。
- 理论依据：传统遁甲与纳甲规则，尚未统一成“服务层 + sourceRef”格式。
- 当前状态：部分通过
  - 已完成：八字入口改走商用内核。
  - 待补：奇门/六爻同样迁入 `lib/yixue` 服务层。

## 中医模块审计

### 1. 经方本草（herbal-page）
- 模块名称：`components/pages/herbal-page.tsx`
- 当前数据来源：
  - 页面数据来自本地静态库 `lib/herbal-data.ts`（`JING_FANG_DATA`、`BEN_CAO_DATA`）。
  - 方剂与本草条目已包含 `source` 字段（如《伤寒论》《金匮要略》《神农本草经》）。
  - 六经辨证映射 `LIUJING_MAP` 位于页面内，为本地规则常量。
- 审计状态：需补充
  - 已有真实结构化条目，但不是 `sourceRef` 结构，只是简化 `source` 文本。
  - 部分规则仍在页面硬编码（`LIUJING_MAP`），未版本化、未附出处章节。
- 是否可商用：有条件可商用（需补充后）
  - 建议把 `source` 升级为标准 `sourceRef[]`（书名/篇章/条文/版本/更新时间）。
  - 建议将六经辨证规则迁移到规则层并增加 `ruleId`、`ruleSetVersion`。

### 2. 经络/3D人体模型相关
- 模块名称：
  - `lib/meridian-data.ts`
  - `components/pages/tcm-page.tsx`（经络入口与子午流注入口）
- 当前数据来源：
  - 已有子午流注、灵龟八法、辨证映射等本地静态数据。
  - 文件注释声明参考《针灸甲乙经》《针灸大成》，但未到条目级引用。
  - 当前仓库未发现独立 3D 人体模型组件与可核验的经络循行坐标路径数据。
- 审计状态：待人工
  - 经络循行路径（3D/坐标）数据源缺失，无法验证真实性与版权边界。
  - 经典依据仅有注释级声明，缺少条目级 sourceRef 与版本信息。
- 是否可商用：当前不可商用（作为“经络循行路径”能力）
  - 建议数据源：
    - WHO/WPRO《WHO Standard Acupuncture Point Locations in the Western Pacific Region》标准点位数据。
    - 国家标准《腧穴名称与定位》及可商用授权的经络解剖/数字人体数据。
    - 若上 3D 模型，需引入明确许可的 mesh + 路径点位文件，并在条目绑定 `sourceRef`。

### 3. 中医分析规则（tcm-analysis-rules）
- 模块名称：`lib/tcm-analysis-rules.ts`
- 当前数据来源：本地规则文案，引用为字符串数组（如《伤寒论》《温病条辨》《黄帝内经》）。
- 审计状态：待人工
  - 当前具备 `id`（可视为 `ruleId`），但缺少独立 `ruleId` 语义规范与规则版本号。
  - 当前 `sourceRefs` 为纯文本，不是结构化 `sourceRef`（无卷次/篇章/版本/校勘本信息）。
  - 未见“刘文元体系”在中医规则中的明确映射关系。
- 是否可商用：当前不可商用
  - 建议：
    - 每条规则补齐 `ruleId`、`ruleSetVersion`、`sourceRef[]`（书名、篇章、条文、版本）。
    - 规则输出增加“命中条件”和“可追溯证据链”。
    - 未能核验出处的规则标记为“待人工补充”。

### 4. 经典阅读模块（classics/luren）
- 模块名称：
  - `components/pages/classics-page.tsx` + `lib/classics-data.ts`
  - `components/pages/luren-page.tsx`（评注与断语展示）
- 当前数据来源：本地静态文本（条文、译文、注解、歌诀、断语）。
- 审计状态：需补充
  - 已有可读内容，但并非完整古籍全文（例如 `SHANGHAN_CLAUSES` 为节选）。
  - 未标注文献版本来源（如四库本、中华书局点校本、具体整理者与版次）。
  - luren 断语未统一到条目级 `sourceRef` 与版本号。
- 是否可商用：有条件可商用（需补充后）
  - 建议：
    - 为每条文本补齐版本来源、整理本、出版信息与版权状态。
    - 对节选内容标注“节选/非全文/来源版本”。
    - 为六壬断语增加 `sourceRef` + `ruleId` + `ruleSetVersion`。

### 5. 中医模块审计总表

| 模块名称 | 当前数据来源 | 审计状态 | 是否可商用 |
|---|---|---|---|
| 经方本草（herbal-page） | `lib/herbal-data.ts` 本地静态条目 + 页面内六经规则常量 | 需补充 | 有条件可商用 |
| 经络/子午流注（含3D路径诉求） | `lib/meridian-data.ts` 本地静态规则；无3D路径坐标资产 | 待人工 | 不可商用（经络路径能力） |
| 中医分析规则（tcm-analysis-rules） | 本地规则文案 + 纯文本来源字符串 | 待人工 | 不可商用 |
| 经典阅读（classics） | `lib/classics-data.ts` 本地节选条文/译注 | 需补充 | 有条件可商用 |
| 六壬评注（luren-page） | 本地断语与评注常量 | 需补充 | 有条件可商用 |

## 竞品对标合规声明
- 仅做功能边界与能力对比，不复制任何竞品品牌、页面结构、视觉样式、文案模板、字段命名规范。
- 当前代码未引入竞品资源文件；理论表述以通用术数体系与公开资料为基础。

## 差距与补齐策略
- P0：后端契约化
  - 为八字/大六壬/奇门/六爻统一输出 schema，强制 `sourceRef[]`、`ruleSetVersion`、`engineVersion`。
- P0：大六壬步骤审计
  - 输出四课、三传、将神、神煞的步骤日志，支持复盘。
- P1：真太阳时链路
  - 增加经纬度与时区修正，避免仅展示文案。
- P1：断语 provenance
  - 每条断语绑定来源文献、章节、算法命中条件。
- P2：本地开源引擎增强
  - 引入可插拔开源实现，减少远端 API 依赖。

## 验收口径
- 已完成：八字数据内核切换与 provider/fallback 架构。
- 需在具备 node/pnpm 环境执行构建验证（当前环境不可真实打包）。
