// 罗盘数据 - 基于《风水罗盘》

// 罗盘简介
export const LUO_PAN_INTRO = {
  title: "风水罗盘",
  origin: "《风水罗盘》",
  description: "风水罗盘是风水师必备工具，用于测量方位、判断吉凶。罗盘包含天池、内盘、外盘三部分，层层嵌套，内容丰富。",
  features: [
    "测量方位角度",
    "判断风水吉凶",
    "包含多层内容",
    "风水师必备工具",
  ],
}

// 罗盘层次
export const LUO_PAN_CENG_CI = [
  { name: "天池", number: 1, desc: "罗盘中心，放置磁针，指示南北" },
  { name: "八卦层", number: 2, desc: "先天八卦、后天八卦排列" },
  { name: "地支层", number: 3, desc: "十二地支排列，指示方位" },
  { name: "二十四山", number: 4, desc: "二十四山方位，风水核心" },
  { name: "二十八星宿", number: 5, desc: "二十八星宿排列，天星风水" },
  { name: "六十四卦", number: 6, desc: "六十四卦排列，易卦风水" },
  { name: "穿山七十二龙", number: 7, desc: "七十二龙排列，龙脉风水" },
  { name: "一百二十分金", number: 8, desc: "一百二十分金，精确方位" },
]

// 八卦方位
export const BA_GUA_FANG_WEI = [
  { name: "乾", symbol: "☰", direction: "西北", degree: "307.5-322.5", wuxing: "金" },
  { name: "坤", symbol: "☷", direction: "西南", degree: "217.5-232.5", wuxing: "土" },
  { name: "震", symbol: "☳", direction: "东", degree: "67.5-82.5", wuxing: "木" },
  { name: "巽", symbol: "☴", direction: "东南", degree: "127.5-142.5", wuxing: "木" },
  { name: "坎", symbol: "☵", direction: "北", degree: "352.5-7.5", wuxing: "水" },
  { name: "离", symbol: "☲", direction: "南", degree: "172.5-187.5", wuxing: "火" },
  { name: "艮", symbol: "☶", direction: "东北", degree: "37.5-52.5", wuxing: "土" },
  { name: "兑", symbol: "☱", direction: "西", degree: "247.5-262.5", wuxing: "金" },
]

// 罗盘使用方法
export const LUO_PAN_SHI_YONG = [
  { step: 1, name: "定中心", desc: "将罗盘放置在测量点中心，保持水平" },
  { step: 2, name: "调水平", desc: "调整罗盘水平，使磁针自由转动" },
  { step: 3, name: "等稳定", desc: "等待磁针稳定，不再晃动" },
  { step: 4, name: "读方位", desc: "读取磁针指示的方位角度" },
  { step: 5, name: "定坐向", desc: "根据方位确定建筑的坐山朝向" },
  { step: 6, name: "判吉凶", desc: "结合风水理论判断方位吉凶" },
]

// 方位吉凶
export const FANG_WEI_JI_XIONG = {
  吉方位: [
    { name: "生气方", desc: "大吉方位，主财运事业", chuchu: "《八宅明镜》" },
    { name: "天医方", desc: "次吉方位，主健康贵人", chuchu: "《八宅明镜》" },
    { name: "延年方", desc: "吉方位，主长寿婚姻", chuchu: "《八宅明镜》" },
    { name: "伏位方", desc: "小吉方位，主稳定平安", chuchu: "《八宅明镜》" },
  ],
  凶方位: [
    { name: "绝命方", desc: "大凶方位，主灾厄疾病", chuchu: "《八宅明镜》" },
    { name: "五鬼方", desc: "次凶方位，主火灾官司", chuchu: "《八宅明镜》" },
    { name: "六煞方", desc: "凶方位，主口舌是非", chuchu: "《八宅明镜》" },
    { name: "祸害方", desc: "小凶方位，主疾病阻碍", chuchu: "《八宅明镜》" },
  ],
}