export const HUANG_JI_JING_SHI = {
  title: "皇极经世",
  author: "邵雍",
  dynasty: "北宋",
  description: "《皇极经世》是北宋邵雍的代表作，是一部探讨宇宙起源、演化规律的巨著。它以'元会运世'为框架，构建了一个宏大的宇宙历史观。",
  structure: [
    { name: "元", desc: "一元为129600年，为宇宙的一个完整周期" },
    { name: "会", desc: "一会为10800年，一元包含12会" },
    { name: "运", desc: "一运为360年，一会包含30运" },
    { name: "世", desc: "一世为30年，一运包含12世" },
  ],
  cycles: [
    { name: "日甲", desc: "太阳纪年，主白天" },
    { name: "月甲", desc: "太阴纪年，主夜晚" },
    { name: "星甲", desc: "星辰纪年，主星辰" },
    { name: "辰甲", desc: "辰宿纪年，主辰宿" },
  ],
  principles: [
    "以元会运世为时间框架",
    "以日月星辰为空间坐标",
    "以易经八卦为数理基础",
    "以象数推演为方法手段",
  ],
};

export const YUAN_HUI_YUN_SHI = [
  { code: 1, ti: "元", wen: "一元复始，万象更新。天地初开，宇宙诞生。", jie: "元者，始也。一元为宇宙之始，象征万物之开端。一元包含十二会，每会一万零八百年。" },
  { code: 2, ti: "会", wen: "十二会运，周而复始。阴阳交替，四季循环。", jie: "会者，合也。一会为一万零八百年，代表宇宙演化的一个重要阶段。十二会构成一元。" },
  { code: 3, ti: "运", wen: "三十运世，岁月流转。光阴似箭，日月如梭。", jie: "运者，转也。一运为三百六十年，代表一个较长的历史时期。三十运构成一会。" },
  { code: 4, ti: "世", wen: "十二世代，传承不息。生生不息，代代相传。", jie: "世者，代也。一世为三十年，代表一代人的时间跨度。十二世构成一运。" },
];

export function getHuangJiNumber(number: number) {
  const index = (number - 1) % YUAN_HUI_YUN_SHI.length;
  return YUAN_HUI_YUN_SHI[index];
}

export function getRandomHuangJi() {
  const randomNum = Math.floor(Math.random() * YUAN_HUI_YUN_SHI.length) + 1;
  return getHuangJiNumber(randomNum);
}

export const WAN_WU_GUAN_WU = [
  { category: "天", items: ["日", "月", "星", "辰"] },
  { category: "地", items: ["水", "火", "土", "石"] },
  { category: "人", items: ["士", "农", "工", "商"] },
  { category: "物", items: ["飞", "走", "草", "木"] },
];

export const XIAN_TIAN_BAGUA = [
  { name: "乾", symbol: "☰", wuxing: "金", position: "南", number: 1 },
  { name: "兑", symbol: "☱", wuxing: "金", position: "东南", number: 2 },
  { name: "离", symbol: "☲", wuxing: "火", position: "东", number: 3 },
  { name: "震", symbol: "☳", wuxing: "木", position: "东北", number: 4 },
  { name: "巽", symbol: "☴", wuxing: "木", position: "西南", number: 5 },
  { name: "坎", symbol: "☵", wuxing: "水", position: "西", number: 6 },
  { name: "艮", symbol: "☶", wuxing: "土", position: "西北", number: 7 },
  { name: "坤", symbol: "☷", wuxing: "土", position: "北", number: 8 },
];
