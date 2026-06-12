// 杨公风水数据 - 基于《撼龙经》《疑龙经》

// 杨公简介
export const YANG_GONG_INTRO = {
  title: "杨公风水",
  origin: "《撼龙经》《疑龙经》",
  master: "杨筠松（杨公）",
  description: "杨公风水又称形势派风水，由唐代杨筠松创立，注重山川形势、龙脉走向、砂水配合，是风水学的重要流派。",
  features: [
    "注重山川形势",
    "龙脉砂水配合",
    "形势理气结合",
    "实地勘察为主",
  ],
}

// 龙脉类型
export const LONG_MAI = [
  { name: "干龙", desc: "大山脉主干，气势宏大，绵延千里" },
  { name: "支龙", desc: "干龙分支，气势稍弱，绵延百里" },
  { name: "真龙", desc: "有生气之龙，结穴之地" },
  { name: "假龙", desc: "无生气之龙，不结穴" },
]

// 砂水配合
export const SHA_SHUI = [
  { name: "青龙", position: "左", desc: "左侧砂山，宜高宜长，主贵人" },
  { name: "白虎", position: "右", desc: "右侧砂山，宜低宜短，主财富" },
  { name: "朱雀", position: "前", desc: "前方水聚，宜开阔明亮，主事业" },
  { name: "玄武", position: "后", desc: "后方山靠，宜高大稳重，主根基" },
]

// 穴位类型
export const XUE_WEI = [
  { name: "窝穴", desc: "山窝之中，生气聚集" },
  { name: "钳穴", desc: "山钳之间，生气流通" },
  { name: "乳穴", desc: "山乳之上，生气旺盛" },
  { name: "突穴", desc: "山突之处，生气显露" },
]

// 水法
export const SHUI_FA = [
  { name: "朝水", desc: "水从前方朝来，主事业顺利" },
  { name: "聚水", desc: "水在前方聚集，主财富丰厚" },
  { name: "环水", desc: "水环绕穴场，主贵人相助" },
  { name: "抱水", desc: "水抱穴场，主家庭和睦" },
]

// 杨公十二倒杖法
export const DAO_ZHANG_FA = [
  { name: "顺杖", desc: "顺龙脉而下，适用于直龙" },
  { name: "逆杖", desc: "逆龙脉而上，适用于回龙" },
  { name: "缩杖", desc: "缩入穴中，适用于高龙" },
  { name: "缀杖", desc: "缀连穴场，适用于长龙" },
  { name: "开杖", desc: "开穴于中，适用于阔龙" },
  { name: "穿杖", desc: "穿穴而过，适用于穿龙" },
  { name: "离杖", desc: "离穴而立，适用于离龙" },
  { name: "没杖", desc: "没入穴中，适用于深龙" },
  { name: "对杖", desc: "对穴而立，适用于对龙" },
  { name: "截杖", desc: "截断龙脉，适用于截龙" },
  { name: "犯杖", desc: "犯穴而入，适用于犯龙" },
  { name: "顿杖", desc: "顿住穴场，适用于顿龙" },
]

// 杨公断语
export const YANG_GONG_DUAN_YU = {
  吉地: [
    { name: "龙真穴的", desc: "龙脉真实，穴位准确，主大富大贵", chuchu: "《撼龙经》" },
    { name: "砂环水抱", desc: "砂山环绕，水流环抱，主丁财两旺", chuchu: "《疑龙经》" },
    { name: "明堂开阔", desc: "明堂宽阔平坦，主事业顺利", chuchu: "《撼龙经》" },
    { name: "龙虎相配", desc: "青龙白虎高低相配，主贵人相助", chuchu: "《疑龙经》" },
  ],
  凶地: [
    { name: "龙假穴虚", desc: "龙脉虚假，穴位空虚，主破败灾厄", chuchu: "《撼龙经》" },
    { name: "砂飞水走", desc: "砂山飞散，水流离去，主破财离乡", chuchu: "《疑龙经》" },
    { name: "明堂狭窄", desc: "明堂狭窄闭塞，主事业受阻", chuchu: "《撼龙经》" },
    { name: "龙虎不配", desc: "青龙白虎高低不配，主是非口舌", chuchu: "《疑龙经》" },
  ],
}