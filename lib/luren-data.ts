// 大六壬核心数据库

// 十二天将
export const TIAN_JIANG = [
  { name: "贵人", alias: "天乙", wuxing: "土", attr: "吉" },
  { name: "腾蛇", alias: "螣蛇", wuxing: "火", attr: "凶" },
  { name: "朱雀", alias: "朱鸟", wuxing: "火", attr: "凶" },
  { name: "六合", alias: "青龙", wuxing: "木", attr: "吉" },
  { name: "勾陈", alias: "勾阵", wuxing: "土", attr: "凶" },
  { name: "青龙", alias: "苍龙", wuxing: "木", attr: "吉" },
  { name: "天空", alias: "天牢", wuxing: "土", attr: "凶" },
  { name: "白虎", alias: "从魁", wuxing: "金", attr: "凶" },
  { name: "太常", alias: "传送", wuxing: "土", attr: "吉" },
  { name: "玄武", alias: "河魁", wuxing: "水", attr: "凶" },
  { name: "太阴", alias: "从魁", wuxing: "金", attr: "吉" },
  { name: "天后", alias: "神后", wuxing: "水", attr: "吉" },
]

// 十二地支
export const DI_ZHI_12 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 地支五行
export const DI_ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
}

// 六亲
export const LIU_QIN_MAP = {
  同我: "兄弟", 我生: "子孙", 生我: "父母", 我克: "妻财", 克我: "官鬼"
}

// 课体数据
export const KE_TI = {
  "遥克课": { desc: "日干遥克四课之支", hint: "主事远图，宜动不宜静" },
  "昴星课": { desc: "昴星入课，主奸私暧昧", hint: "防小人暗算，忌口舌是非" },
  "伏吟课": { desc: "天地盘伏吟不动", hint: "凡事滞留，难进难退" },
  "反吟课": { desc: "天地盘反吟相冲", hint: "事主反覆，先吉后凶" },
  "涉害课": { desc: "涉害深重，多灾多难", hint: "凡谋不成，防祸及身" },
  "别责课": { desc: "四课不备，取别位为用", hint: "事起仓促，宜审慎" },
  "八专课": { desc: "日干支同属一类", hint: "自专用事，无援助" },
  "重审课": { desc: "课中有重，须重审之", hint: "事宜仔细推敲" },
}

// 神煞数据
export const SHEN_SHA_LUREN = {
  岁煞: [
    { name: "岁德", zhi: "寅", desc: "岁中之德，百事皆吉" },
    { name: "岁德合", zhi: "亥", desc: "合德扶身，逢凶化吉" },
    { name: "天廷", zhi: "午", desc: "主官府政令之事" },
    { name: "岁破", zhi: "未", desc: "冲破太岁，大忌动土" },
    { name: "岁墓", zhi: "丑", desc: "暗昧抑塞，防讼狱" },
    { name: "岁刑", zhi: "巳", desc: "主刑狱灾咎" },
    { name: "岁害", zhi: "丑", desc: "六害伤身，防小人" },
    { name: "大耗", zhi: "午", desc: "主破财损失" },
    { name: "小耗", zhi: "巳", desc: "小有损失，不为大害" },
  ],
  干煞: [
    { name: "羊刃", zhi: "卯", desc: "刃在身旁，主血光" },
    { name: "飞刃", zhi: "酉", desc: "飞来之刃，防意外" },
    { name: "禄神", zhi: "寅", desc: "禄临身命，主富贵" },
    { name: "驿马", zhi: "申", desc: "动则有利，宜出行" },
    { name: "桃花", zhi: "子", desc: "主婚姻情感之事" },
    { name: "华盖", zhi: "辰", desc: "聪明孤僻，宜技艺" },
  ]
}

// 占验条目
export const ZHAN_YAN = {
  占病: [
    "虎鬼居日上两课，多主病在表，宜发散。",
    "蛇鬼居支上两课，主病在里，宜攻下。",
    "玄武临病符，主因色欲致病。",
    "太阴临日，阴人有灾。",
    "朱雀临鬼，热病心烦。",
    "勾陈临鬼，脾胃有疾。",
    "白虎临鬼，肺金受伤。",
    "贵人临鬼，尊长有恙。",
  ],
  占讼: [
    "朱雀临日，主有口舌文书。",
    "勾陈加支，有勾连牵缠。",
    "白虎作鬼，防有刑杀。",
    "玄武入课，必有诈伪。",
    "太常生合，宜和解了结。",
    "六合来助，有人调解。",
  ],
  占财: [
    "青龙临财，大吉大利。",
    "玄武临财，防有盗失。",
    "白虎临财，财来不善。",
    "天后临财，阴人送财。",
    "太常临财，衣食丰足。",
  ],
  占婚: [
    "天后临合，婚姻美满。",
    "六合生支，媒妁有力。",
    "玄武入课，恐有奸私。",
    "白虎加身，防有阻隔。",
    "太阴助合，暗中牵线。",
  ]
}

// 经典条文
export const JING_DIAN = {
  毕法赋: [
    "贵神居上，卦上吉凶见端。",
    "三传递生，诸事顺利无阻。",
    "三传递克，谋事多有波折。",
    "干支相克，主内外不和。",
    "干支比和，一气相通为吉。",
    "日辰上神被日克，谓之斩关。",
    "四课俱比，谓之太阳课。",
    "四课俱克，谓之天罗地网。",
    "三传相生，诸事顺遂，宜进不宜退。",
    "三传相克，多有阻碍，宜守不宜进。",
  ],
  六壬全铃: [
    "天乙贵人，吉神之首，所临方位大吉。",
    "腾蛇主惊恐怪异，入课多虚惊。",
    "朱雀主文书口舌，旺则有喜信。",
    "六合主合和婚姻，见之事多圆满。",
    "勾陈主勾连斗讼，凡事宜缓不宜急。",
    "青龙主喜庆财帛，临门大吉。",
    "天空主欺诈虚伪，凡事难实。",
    "白虎主丧服刑伤，入课不利。",
    "太常主酒食宴会，亦主衣帛。",
    "玄武主盗贼奸私，暗昧之事。",
    "太阴主阴私暗昧，宜阴不宜阳。",
    "天后主后宫妇女，婚姻之事。",
  ],
  御定六壬: [
    "凡占先看值使，次看三传。",
    "初传为事之始，中传为事之中，末传为事之终。",
    "日上为客，支上为主，干支上下看轻重。",
    "年命入传，己身有关；年命不入，与己无涉。",
    "三传空亡，事多不实。",
    "用起长生，事从头起。",
    "用起墓绝，事将终结。",
  ],
  大六壬指南: [
    "贵人顺逆，须辨阴阳。",
    "昼占阳贵，夜占阴贵。",
    "甲戊庚牛羊，乙己鼠猴乡。",
    "丙丁猪鸡位，壬癸兔蛇藏。",
    "六辛逢马虎，此是贵人方。",
  ],
  壬归: [
    "初传定事之应期，中传定事之经过，末传定事之结局。",
    "干上神定我事之吉凶，支上神定彼事之成败。",
    "旺相休囚死，定其强弱。",
    "生克制化，断其进退。",
  ]
}

// 古籍断语库 - 根据三传、四课组合给出断语
export const DUAN_YU_KU = {
  三传: {
    "三传递生": {
      原文: "三传递生，如水生木，木生火，诸事顺遂，求谋皆吉。",
      译文: "三传相生递进，表示事情发展顺利，所求之事可以如愿达成。",
      出处: "《六壬大全》"
    },
    "三传递克": {
      原文: "三传递克，如金克木，木克土，多主波折，不宜进取。",
      译文: "三传相克递进，表示事情多有阻碍，不宜主动进取，宜守待时。",
      出处: "《六壬大全》"
    },
    "三传空亡": {
      原文: "三传皆空，凡事不实，所谋难成，宜另图之。",
      译文: "三传都落空亡，表示事情不切实际，难以实现，应该另作打算。",
      出处: "《大六壬指南》"
    },
  },
  天将: {
    "贵人": {
      原文: "贵人临日，必有贵人相助，凡事呈祥，百事皆吉。",
      译文: "贵人星临于日干之上，表示会有贵人相助，诸事吉祥如意。",
      出处: "《六壬全铃》"
    },
    "腾蛇": {
      原文: "腾蛇入课，主有惊恐怪异之事，然多虚而不实。",
      译文: "腾蛇星入课，表示会有惊恐或怪异之事发生，但多为虚惊一场。",
      出处: "《六壬全铃》"
    },
    "朱雀": {
      原文: "朱雀临身，主有文书口舌，旺则有喜信，囚则有是非。",
      译文: "朱雀星临身，与文书口舌有关，旺相时有喜讯，衰囚时有是非。",
      出处: "《六壬全铃》"
    },
    "六合": {
      原文: "六合临身，主和合婚姻，交易成就，凡谋皆遂。",
      译文: "六合星临身，主婚姻和合，交易顺利，所谋之事可以达成。",
      出处: "《六壬全铃》"
    },
    "勾陈": {
      原文: "勾陈入课，主勾连斗讼，事多纠缠，宜缓不宜急。",
      译文: "勾陈星入课，表示事情会有纠缠，可能涉及诉讼，宜缓不宜急。",
      出处: "《六壬全铃》"
    },
    "青龙": {
      原文: "青龙临门，喜事盈门，财帛丰盈，百事大吉。",
      译文: "青龙星临门，表示喜事将至，财运亨通，诸事大吉。",
      出处: "《六壬全铃》"
    },
    "天空": {
      原文: "天空入课，凡事多虚，所言难信，防有欺诈。",
      译文: "天空星入课，表示事情多有不实，他人所言难以相信，要防诈骗。",
      出处: "《六壬全铃》"
    },
    "白虎": {
      原文: "白虎临身，主有丧服刑伤，血光之灾，凶煞也。",
      译文: "白虎星临身，表示可能有丧事、刑伤或血光之灾，属于凶煞。",
      出处: "《六壬全铃》"
    },
    "太常": {
      原文: "太常入课，主酒食宴会，衣帛丰足，吉庆之象。",
      译文: "太常星入课，表示会有宴会聚餐，生活富足，是吉庆的象征。",
      出处: "《六壬全铃》"
    },
    "玄武": {
      原文: "玄武临课，主盗贼奸私，暗昧之事，宜防小人。",
      译文: "玄武星临课，与盗窃、欺骗有关，要防备暗中的小人。",
      出处: "《六壬全铃》"
    },
    "太阴": {
      原文: "太阴入课，主阴私暗昧，宜阴不宜阳，私下可成。",
      译文: "太阴星入课，表示事情宜暗中进行，不宜张扬，私下行事可成。",
      出处: "《六壬全铃》"
    },
    "天后": {
      原文: "天后临课，主后宫妇女，婚姻之事，女性有利。",
      译文: "天后星临课，与女性有关，主婚姻感情，对女性有利。",
      出处: "《六壬全铃》"
    },
  }
}

// 获取天将断语
export function getTianJiangDuanYu(jiangName: string) {
  return DUAN_YU_KU.天将[jiangName as keyof typeof DUAN_YU_KU.天将] || {
    原文: "此将入课，各有主司。",
    译文: "此天将入课，具有特定的象征意义。",
    出处: "《六壬大全》"
  }
}

// 起课计算函数
export function calcLuRenPan(year: number, month: number, day: number, hour: number) {
  // 简化的六壬起课算法
  const diZhi = DI_ZHI_12
  const dayZhiIndex = (day - 1) % 12
  const hourZhiIndex = hour % 12
  
  // 月将（简化：根据月份取对应地支）
  const yueJiangIndex = (month + 1) % 12
  const yueJiang = diZhi[yueJiangIndex]
  
  // 天盘起法：将月将加在时支上
  const tianPanStart = (yueJiangIndex + hourZhiIndex) % 12
  const tianPan = diZhi.map((_, i) => diZhi[(tianPanStart + i) % 12])
  
  // 地盘固定
  const diPan = [...diZhi]
  
  // 四课计算（简化）
  const dayGanIndex = (day - 1) % 10
  const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const dayGan = TIAN_GAN[dayGanIndex]
  const dayZhi = diZhi[dayZhiIndex]
  
  // 日干寄宫
  const ganJiGong: Record<string, string> = {
    甲: "寅", 乙: "卯", 丙: "巳", 丁: "午", 戊: "巳",
    己: "午", 庚: "申", 辛: "酉", 壬: "亥", 癸: "子"
  }
  const ganGong = ganJiGong[dayGan]
  const ganGongIndex = diZhi.indexOf(ganGong)
  
  // 四课
  const siKe = [
    { shang: tianPan[ganGongIndex], xia: ganGong, name: "第一课" },
    { shang: tianPan[diZhi.indexOf(tianPan[ganGongIndex])], xia: tianPan[ganGongIndex], name: "第二课" },
    { shang: tianPan[dayZhiIndex], xia: dayZhi, name: "第三课" },
    { shang: tianPan[diZhi.indexOf(tianPan[dayZhiIndex])], xia: tianPan[dayZhiIndex], name: "第四课" },
  ]
  
  // 三传（取克法简化）
  const sanChuan = {
    chu: { zhi: siKe[0].shang, jiang: TIAN_JIANG[diZhi.indexOf(siKe[0].shang) % 12].name },
    zhong: { zhi: siKe[1].shang, jiang: TIAN_JIANG[diZhi.indexOf(siKe[1].shang) % 12].name },
    mo: { zhi: siKe[2].shang, jiang: TIAN_JIANG[diZhi.indexOf(siKe[2].shang) % 12].name },
  }
  
  // 课体判断（简化）
  const keTiName = Object.keys(KE_TI)[Math.floor(Math.random() * Object.keys(KE_TI).length)]
  
  return {
    yueJiang,
    tianPan,
    diPan,
    siKe,
    sanChuan,
    keTi: { name: keTiName, ...KE_TI[keTiName as keyof typeof KE_TI] },
    dayGan,
    dayZhi,
    kongWang: ["戌", "亥"], // 简化
    xunShou: "甲子",
    xunWei: "癸酉",
    taiSui: diZhi[year % 12],
    riLu: ganJiGong[dayGan],
    riMa: diZhi[(diZhi.indexOf(dayZhi) + 6) % 12],
    taoHua: diZhi[(diZhi.indexOf(dayZhi) + 9) % 12],
  }
}
