export const HE_TU = {
  name: "河图",
  description: "河图是中国古代流传下来的神秘图案，蕴含着宇宙数理的奥秘。河图为体，洛书为用，二者共同构成了中国传统文化的数理基础。",
  numbers: [
    { position: "北", number: 1, wuxing: "水", color: "black" },
    { position: "南", number: 2, wuxing: "火", color: "red" },
    { position: "东", number: 3, wuxing: "木", color: "green" },
    { position: "西", number: 4, wuxing: "金", color: "white" },
    { position: "中", number: 5, wuxing: "土", color: "yellow" },
    { position: "北", number: 6, wuxing: "水", color: "black" },
    { position: "南", number: 7, wuxing: "火", color: "red" },
    { position: "东", number: 8, wuxing: "木", color: "green" },
    { position: "西", number: 9, wuxing: "金", color: "white" },
    { position: "中", number: 10, wuxing: "土", color: "yellow" },
  ],
  principles: [
    "天一生水，地六成之",
    "地二生火，天七成之",
    "天三生木，地八成之",
    "地四生金，天九成之",
    "天五生土，地十成之",
  ],
};

export const LUO_SHU = {
  name: "洛书",
  description: "洛书是中国古代流传下来的神秘图案，与河图并称，是易经数理的基础。洛书以九宫格的形式排列数字，形成了后天八卦的排列依据。",
  numbers: [
    { position: "北", number: 1, wuxing: "水", bagua: "坎" },
    { position: "西南", number: 2, wuxing: "土", bagua: "坤" },
    { position: "东", number: 3, wuxing: "木", bagua: "震" },
    { position: "东南", number: 4, wuxing: "木", bagua: "巽" },
    { position: "中", number: 5, wuxing: "土", bagua: "中" },
    { position: "西北", number: 6, wuxing: "金", bagua: "乾" },
    { position: "西", number: 7, wuxing: "金", bagua: "兑" },
    { position: "东北", number: 8, wuxing: "土", bagua: "艮" },
    { position: "南", number: 9, wuxing: "火", bagua: "离" },
  ],
  magicSquare: [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ],
  principles: [
    "戴九履一",
    "左三右七",
    "二四为肩",
    "六八为足",
    "五居中央",
  ],
};

export const HE_LUO_SHEN_SHU = [
  { code: 1, ti: "第一数", wen: "天一生水，地六成之。水为万物之源，滋润万物生长。", jie: "此数主智慧与流动。天一生水，水为智慧之象征，六为成数，预示智慧得以成就。得此数者，思维敏捷，善于变通。" },
  { code: 2, ti: "第二数", wen: "地二生火，天七成之。火为文明之光，照亮世间万物。", jie: "此数主才华与热情。地二生火，火为文明之象征，七为成数，预示才华得以展现。得此数者，才华横溢，热情洋溢。" },
  { code: 3, ti: "第三数", wen: "天三生木，地八成之。木为生长之象，象征生机勃发。", jie: "此数主成长与发展。天三生木，木为生长之象征，八为成数，预示事业得以发展。得此数者，事业有成，蒸蒸日上。" },
  { code: 4, ti: "第四数", wen: "地四生金，天九成之。金为收敛之象，象征财富积累。", jie: "此数主财富与收获。地四生金，金为财富之象征，九为成数，预示财富得以积累。得此数者，财运亨通，财源广进。" },
  { code: 5, ti: "第五数", wen: "天五生土，地十成之。土为中和之象，象征稳定和谐。", jie: "此数主稳定与和谐。天五生土，土为稳定之象征，十为成数，预示家庭事业皆得稳固。得此数者，家庭和睦，事业稳定。" },
];

export function getHeLuoNumber(number: number) {
  const index = (number - 1) % HE_LUO_SHEN_SHU.length;
  return HE_LUO_SHEN_SHU[index];
}

export function getRandomHeLuo() {
  const randomNum = Math.floor(Math.random() * HE_LUO_SHEN_SHU.length) + 1;
  return getHeLuoNumber(randomNum);
}

export const HE_LUO_WEN = {
  title: "河洛理数",
  origin: "河图洛书",
  description: "河洛理数是基于河图洛书的一种数理预测学。河图为体，洛书为用，通过数理推算来预测人事吉凶。",
  features: [
    "基于河图洛书",
    "运用五行生克",
    "结合八卦数理",
    "推算人事吉凶",
  ],
};
