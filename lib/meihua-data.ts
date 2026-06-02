// 梅花易数数据库

// 八卦基础数据
export const BA_GUA = {
  乾: { number: 1, wuxing: "金", xiang: "天", direction: "西北", body: "首", family: "父" },
  兑: { number: 2, wuxing: "金", xiang: "泽", direction: "西", body: "口", family: "少女" },
  离: { number: 3, wuxing: "火", xiang: "火", direction: "南", body: "目", family: "中女" },
  震: { number: 4, wuxing: "木", xiang: "雷", direction: "东", body: "足", family: "长男" },
  巽: { number: 5, wuxing: "木", xiang: "风", direction: "东南", body: "股", family: "长女" },
  坎: { number: 6, wuxing: "水", xiang: "水", direction: "北", body: "耳", family: "中男" },
  艮: { number: 7, wuxing: "土", xiang: "山", direction: "东北", body: "手", family: "少男" },
  坤: { number: 8, wuxing: "土", xiang: "地", direction: "西南", body: "腹", family: "母" },
}

// 八卦名称数组
const GUA_NAMES = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"]

// 六十四卦
export const GUA_64_MEIHUA: Record<string, { name: string, guaCi: string, xiangCi: string }> = {
  "乾乾": { name: "乾为天", guaCi: "元亨利贞", xiangCi: "天行健，君子以自强不息" },
  "坤坤": { name: "坤为地", guaCi: "元亨，利牝马之贞", xiangCi: "地势坤，君子以厚德载物" },
  "坎坎": { name: "坎为水", guaCi: "习坎，有孚，维心亨", xiangCi: "水洊至，习坎。君子以常德行，习教事" },
  "离离": { name: "离为火", guaCi: "利贞，亨。畜牝牛吉", xiangCi: "明两作，离。大人以继明照于四方" },
  "震震": { name: "震为雷", guaCi: "亨。震来虩虩，笑言哑哑", xiangCi: "洊雷，震。君子以恐惧修省" },
  "艮艮": { name: "艮为山", guaCi: "艮其背，不获其身", xiangCi: "兼山，艮。君子以思不出其位" },
  "巽巽": { name: "巽为风", guaCi: "小亨，利有攸往", xiangCi: "随风，巽。君子以申命行事" },
  "兑兑": { name: "兑为泽", guaCi: "亨，利贞", xiangCi: "丽泽，兑。君子以朋友讲习" },
  "乾坤": { name: "天地否", guaCi: "否之匪人，不利君子贞", xiangCi: "天地不交，否。君子以俭德辟难" },
  "坤乾": { name: "地天泰", guaCi: "小往大来，吉亨", xiangCi: "天地交，泰。后以财成天地之道" },
  "乾坎": { name: "天水讼", guaCi: "有孚窒惕，中吉", xiangCi: "天与水违行，讼。君子以作事谋始" },
  "坎乾": { name: "水天需", guaCi: "有孚，光亨，贞吉", xiangCi: "云上于天，需。君子以饮食宴乐" },
  "乾离": { name: "天火同人", guaCi: "同人于野，亨", xiangCi: "天与火，同人。君子以类族辨物" },
  "离乾": { name: "火天大有", guaCi: "元亨", xiangCi: "火在天上，大有。君子以遏恶扬善" },
  "乾震": { name: "天雷无妄", guaCi: "元亨利贞", xiangCi: "天下雷行，物与无妄" },
  "震乾": { name: "雷天大壮", guaCi: "利贞", xiangCi: "雷在天上，大壮。君子以非礼弗履" },
  "乾巽": { name: "天风姤", guaCi: "女壮，勿用取女", xiangCi: "天下有风，姤。后以施命诰四方" },
  "巽乾": { name: "风天小畜", guaCi: "亨，密云不雨，自我西郊", xiangCi: "风行天上，小畜。君子以懿文德" },
  "乾艮": { name: "天山遁", guaCi: "亨，小利贞", xiangCi: "天下有山，遁。君子以远小人，不恶而严" },
  "艮乾": { name: "山天大畜", guaCi: "利贞，不家食吉，利涉大川", xiangCi: "天在山中，大畜。君子以多识前言往行，以畜其德" },
  "乾兑": { name: "天泽履", guaCi: "履虎尾，不咥人，亨", xiangCi: "上天下泽，履。君子以辨上下，定民志" },
  "兑乾": { name: "泽天夬", guaCi: "扬于王庭，孚号有厉", xiangCi: "泽上于天，夬。君子以施禄及下，居德则忌" },
  "坤坎": { name: "地水师", guaCi: "贞丈人吉，无咎", xiangCi: "地中有水，师。君子以容民畜众" },
  "坎坤": { name: "水地比", guaCi: "吉，原筮元永贞无咎", xiangCi: "地上有水，比。先王以建万国，亲诸侯" },
  "坤离": { name: "地火明夷", guaCi: "利艰贞", xiangCi: "明入地中，明夷。君子以莅众，用晦而明" },
  "离坤": { name: "火地晋", guaCi: "康侯用锡马蕃庶，昼日三接", xiangCi: "明出地上，晋。君子以自昭明德" },
  "坤震": { name: "地雷复", guaCi: "亨，出入无疾，朋来无咎", xiangCi: "雷在地中，复。先王以至日闭关，商旅不行" },
  "震坤": { name: "雷地豫", guaCi: "利建侯行师", xiangCi: "雷出地奋，豫。先王以作乐崇德" },
  "坤巽": { name: "地风升", guaCi: "元亨，用见大人，勿恤，南征吉", xiangCi: "地中生木，升。君子以顺德，积小以高大" },
  "巽坤": { name: "风地观", guaCi: "盥而不荐，有孚颙若", xiangCi: "风行地上，观。先王以省方观民设教" },
  "坤艮": { name: "地山谦", guaCi: "亨，君子有终", xiangCi: "地中有山，谦。君子以裒多益寡，称物平施" },
  "艮坤": { name: "山地剥", guaCi: "不利有攸往", xiangCi: "山附于地，剥。上以厚下安宅" },
  "坤兑": { name: "地泽临", guaCi: "元亨利贞，至于八月有凶", xiangCi: "泽上有地，临。君子以教思无穷，容保民无疆" },
  "兑坤": { name: "泽地萃", guaCi: "亨，王假有庙，利见大人", xiangCi: "泽上于地，萃。君子以除戎器，戒不虞" },
  "坎离": { name: "水火既济", guaCi: "亨小利贞，初吉终乱", xiangCi: "水在火上，既济。君子以思患而豫防之" },
  "离坎": { name: "火水未济", guaCi: "亨，小狐汔济濡其尾", xiangCi: "火在水上，未济。君子以慎辨物居方" },
  "坎震": { name: "水雷屯", guaCi: "元亨利贞，勿用有攸往，利建侯", xiangCi: "云雷，屯。君子以经纶" },
  "震坎": { name: "雷水解", guaCi: "利西南，无所往，其来复吉", xiangCi: "雷雨作，解。君子以赦过宥罪" },
  "坎巽": { name: "水风井", guaCi: "改邑不改井，无丧无得", xiangCi: "木上有水，井。君子以劳民劝相" },
  "巽坎": { name: "风水涣", guaCi: "亨，王假有庙，利涉大川", xiangCi: "风行水上，涣。先王以享于帝立庙" },
  "坎艮": { name: "水山蹇", guaCi: "利西南不利东北，利见大人", xiangCi: "山上有水，蹇。君子以反身修德" },
  "艮坎": { name: "山水蒙", guaCi: "亨，匪我求童蒙，童蒙求我", xiangCi: "山下出泉，蒙。君子以果行育德" },
  "坎兑": { name: "水泽节", guaCi: "亨，苦节不可贞", xiangCi: "泽上有水，节。君子以制数度，议德行" },
  "兑坎": { name: "泽水困", guaCi: "亨贞，大人吉无咎", xiangCi: "泽无水，困。君子以致命遂志" },
  "离震": { name: "火雷噬嗑", guaCi: "亨，利用狱", xiangCi: "雷电，噬嗑。先王以明罚敕法" },
  "震离": { name: "雷火丰", guaCi: "亨，王假之勿忧，宜日中", xiangCi: "雷电皆至，丰。君子以折狱致刑" },
  "离巽": { name: "火风鼎", guaCi: "元吉亨", xiangCi: "木上有火，鼎。君子以正位凝命" },
  "巽离": { name: "风火家人", guaCi: "利女贞", xiangCi: "风自火出，家人。君子以言有物而行有恒" },
  "离艮": { name: "火山旅", guaCi: "小亨，旅贞吉", xiangCi: "山上有火，旅。君子以明慎用刑而不留狱" },
  "艮离": { name: "山火贲", guaCi: "亨，小利有攸往", xiangCi: "山下有火，贲。君子以明庶政，无敢折狱" },
  "离兑": { name: "火泽睽", guaCi: "小事吉", xiangCi: "上火下泽，睽。君子以同而异" },
  "兑离": { name: "泽火革", guaCi: "己日乃孚，元亨利贞", xiangCi: "泽中有火，革。君子以治历明时" },
  "震巽": { name: "雷风恒", guaCi: "亨无咎利贞，利有攸往", xiangCi: "雷风，恒。君子以立不易方" },
  "巽震": { name: "风雷益", guaCi: "利有攸往，利涉大川", xiangCi: "风雷，益。君子以见善则迁，有过则改" },
  "震艮": { name: "雷山小过", guaCi: "亨利贞，可小事不可大事", xiangCi: "山上有雷，小过。君子以行过乎恭，丧过乎哀" },
  "艮震": { name: "山雷颐", guaCi: "贞吉，观颐自求口实", xiangCi: "山下有雷，颐。君子以慎言语，节饮食" },
  "震兑": { name: "雷泽归妹", guaCi: "征凶，无攸利", xiangCi: "泽上有雷，归妹。君子以永终知敝" },
  "兑震": { name: "泽雷随", guaCi: "元亨利贞，无咎", xiangCi: "泽中有雷，随。君子以向晦入宴息" },
  "巽艮": { name: "风山渐", guaCi: "女归吉，利贞", xiangCi: "山上有木，渐。君子以居贤德善俗" },
  "艮巽": { name: "山风蛊", guaCi: "元亨，利涉大川", xiangCi: "山下有风，蛊。君子以振民育德" },
  "巽兑": { name: "风泽中孚", guaCi: "豚鱼吉，利涉大川", xiangCi: "泽上有风，中孚。君子以议狱缓死" },
  "兑巽": { name: "泽风大过", guaCi: "栋桡，利有攸往亨", xiangCi: "泽灭木，大过。君子以独立不惧，遁世无闷" },
  "艮兑": { name: "山泽损", guaCi: "有孚，元吉无咎，可贞，利有攸往", xiangCi: "山下有泽，损。君子以惩忿窒欲" },
  "兑艮": { name: "泽山咸", guaCi: "亨利贞，取女吉", xiangCi: "山上有泽，咸。君子以虚受人" },
}

// 体用生克关系
export const TI_YONG_SHENGKE = {
  "体生用": { jixiong: "小凶", desc: "体卦生用卦，我去生他，耗我之气，主有付出、损失" },
  "用生体": { jixiong: "大吉", desc: "用卦生体卦，他来生我，增我之力，主有收获、帮助" },
  "体克用": { jixiong: "小吉", desc: "体卦克用卦，我去克他，主事可成，但需费力" },
  "用克体": { jixiong: "大凶", desc: "用卦克体卦，他来克我，主有阻碍、破败、损伤" },
  "体用比和": { jixiong: "吉", desc: "体用同类，五行相同，主事顺遂，相互帮扶" },
}

// 古籍断语 - 《梅花易数》原文
export const MEIHUA_DUANYU = {
  起卦法: {
    原文: "凡占卦之法，先观来意，次观动静。静则以年月日时起卦，动则以数目字起卦。",
    译文: "占卦的方法，先观察来人的意图，再观察动静。安静时用年月日时起卦，有动态时用数字起卦。",
    出处: "《梅花易数·观梅占》"
  },
  体用诀: {
    原文: "体卦为己，用卦为人。体卦为事之主，用卦为事之应。",
    译文: "体卦代表自己，用卦代表对方或事物。体卦是事情的主体，用卦是事情的应验。",
    出处: "《梅花易数·体用总诀》"
  },
  断卦要诀: {
    原文: "卦有体用，体为己，用为彼。动爻为应期，互卦为事中之变化。",
    译文: "卦分体用，体代表自己，用代表对方。动爻表示应验时期，互卦表示事情中的变化过程。",
    出处: "《梅花易数·断卦口诀》"
  },
}

// 万物类象
export const WAN_WU_LEI_XIANG = {
  乾: {
    人物: ["君王", "父亲", "老人", "长者", "官贵"],
    事物: ["金玉", "圆物", "冠帽", "镜子", "宝物"],
    场所: ["京都", "高地", "寺院", "楼阁"],
    时间: ["秋季", "九十月", "戌亥时"],
    身体: ["头部", "肺部", "骨骼"],
  },
  坤: {
    人物: ["母亲", "老妇", "农民", "众人"],
    事物: ["布帛", "五谷", "车辆", "方形物"],
    场所: ["田野", "平地", "仓库", "乡村"],
    时间: ["夏末秋初", "六七月", "未申时"],
    身体: ["腹部", "脾胃", "肌肉"],
  },
  震: {
    人物: ["长子", "青年", "军人", "运动员"],
    事物: ["竹木", "乐器", "车舟", "花草"],
    场所: ["森林", "大路", "市场"],
    时间: ["春季", "正二月", "卯时"],
    身体: ["足部", "肝胆", "声音"],
  },
  巽: {
    人物: ["长女", "寡妇", "工匠", "商人"],
    事物: ["绳索", "羽毛", "扇子", "香气"],
    场所: ["庭院", "寺观", "草木之处"],
    时间: ["春夏之交", "三四月", "辰巳时"],
    身体: ["股部", "气管", "神经"],
  },
  坎: {
    人物: ["中男", "盗贼", "渔民", "酒徒"],
    事物: ["酒水", "油墨", "弓轮", "带核之物"],
    场所: ["河海", "沟渠", "酒店", "暗处"],
    时间: ["冬季", "十一月", "子时"],
    身体: ["耳朵", "肾脏", "血液"],
  },
  离: {
    人物: ["中女", "文人", "美人", "军人"],
    事物: ["书画", "文章", "兵器", "甲胄"],
    场所: ["明堂", "窑灶", "图书馆"],
    时间: ["夏季", "五六月", "午时"],
    身体: ["眼睛", "心脏", "血脉"],
  },
  艮: {
    人物: ["少男", "儿童", "僧道", "门卫"],
    事物: ["石头", "门阙", "小路", "果实"],
    场所: ["山林", "丘陵", "寺庙", "门庭"],
    时间: ["冬春之交", "十二正月", "丑寅时"],
    身体: ["手指", "鼻子", "背部"],
  },
  兑: {
    人物: ["少女", "歌伎", "巫师", "说客"],
    事物: ["金属", "刀剑", "口舌", "羊"],
    场所: ["泽地", "洼地", "娱乐场所"],
    时间: ["秋季", "八九月", "酉时"],
    身体: ["口舌", "牙齿", "喉咙"],
  },
}

// 获取卦象信息
export function getGuaInfo(shangGua: string, xiaGua: string) {
  const key = shangGua + xiaGua
  return GUA_64_MEIHUA[key] || { 
    name: `${shangGua}${xiaGua}卦`, 
    guaCi: "待查",
    xiangCi: "待查"
  }
}

// 判断体用生克
export function getTiYongGuanxi(tiWuxing: string, yongWuxing: string): string {
  const shengMap: Record<string, string> = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" }
  const keMap: Record<string, string> = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" }
  
  if (tiWuxing === yongWuxing) return "体用比和"
  if (shengMap[tiWuxing] === yongWuxing) return "体生用"
  if (shengMap[yongWuxing] === tiWuxing) return "用生体"
  if (keMap[tiWuxing] === yongWuxing) return "体克用"
  if (keMap[yongWuxing] === tiWuxing) return "用克体"
  return "体用比和"
}

// 梅花易数起卦结果接口
export interface MeihuaResult {
  benGua: {
    name: string
    shangGua: string
    xiaGua: string
    guaCi: string
    xiangCi: string
  }
  huGua?: {
    name: string
    shangGua: string
    xiaGua: string
  }
  bianGua?: {
    name: string
    shangGua: string
    xiaGua: string
  }
  dongYao: number
  tiGua: string
  yongGua: string
  tiYongGuanxi: string
  jixiong: string
  guanxiDesc: string
}

// 时间起卦法（年月日时起卦）
export function timeQiGua(
  year: number,
  month: number,
  day: number,
  hour: number
): MeihuaResult {
  // 计算上卦：(年+月+日) % 8
  const shangGuaNum = (year + month + day) % 8 || 8
  const shangGua = GUA_NAMES[shangGuaNum - 1]
  
  // 计算下卦：(年+月+日+时) % 8
  const xiaGuaNum = (year + month + day + hour) % 8 || 8
  const xiaGua = GUA_NAMES[xiaGuaNum - 1]
  
  // 计算动爻：(年+月+日+时) % 6
  const dongYao = (year + month + day + hour) % 6 || 6
  
  // 本卦信息
  const benGuaKey = shangGua + xiaGua
  const benGuaInfo = getGuaInfo(shangGua, xiaGua)
  
  // 确定体用：动爻在下卦则下卦为用，上卦为体；反之亦然
  let tiGua, yongGua
  if (dongYao <= 3) {
    tiGua = shangGua  // 动在下卦，上卦为体
    yongGua = xiaGua  // 下卦为用
  } else {
    tiGua = xiaGua    // 动在上卦，下卦为体
    yongGua = shangGua // 上卦为用
  }
  
  // 体用关系
  const tiWuxing = BA_GUA[tiGua as keyof typeof BA_GUA].wuxing
  const yongWuxing = BA_GUA[yongGua as keyof typeof BA_GUA].wuxing
  const tiYongGuanxi = getTiYongGuanxi(tiWuxing, yongWuxing)
  const tiYongInfo = TI_YONG_SHENGKE[tiYongGuanxi as keyof typeof TI_YONG_SHENGKE]
  
  // 互卦（取二、三、四爻为下互，三、四、五爻为上互）
  // 简化互卦计算
  const huShangNum = (shangGuaNum + xiaGuaNum) % 8 || 8
  const huXiaNum = (shangGuaNum - xiaGuaNum + 8) % 8 || 8
  const huShangGua = GUA_NAMES[huShangNum - 1]
  const huXiaGua = GUA_NAMES[huXiaNum - 1]
  const huGuaInfo = getGuaInfo(huShangGua, huXiaGua)
  
  // 变卦（动爻变阴阳）
  // 简化变卦计算
  const bianShangNum = (shangGuaNum + dongYao) % 8 || 8
  const bianXiaNum = (xiaGuaNum + dongYao) % 8 || 8
  const bianShangGua = GUA_NAMES[bianShangNum - 1]
  const bianXiaGua = GUA_NAMES[bianXiaNum - 1]
  const bianGuaInfo = getGuaInfo(bianShangGua, bianXiaGua)
  
  return {
    benGua: {
      name: benGuaInfo.name,
      shangGua,
      xiaGua,
      guaCi: benGuaInfo.guaCi,
      xiangCi: benGuaInfo.xiangCi,
    },
    huGua: {
      name: huGuaInfo.name,
      shangGua: huShangGua,
      xiaGua: huXiaGua,
    },
    bianGua: {
      name: bianGuaInfo.name,
      shangGua: bianShangGua,
      xiaGua: bianXiaGua,
    },
    dongYao,
    tiGua,
    yongGua,
    tiYongGuanxi,
    jixiong: tiYongInfo.jixiong,
    guanxiDesc: tiYongInfo.desc,
  }
}

// 数字起卦法
export function numberQiGua(num1: number, num2: number, num3: number = 0): MeihuaResult {
  // 上卦：num1 % 8
  const shangGuaNum = num1 % 8 || 8
  const shangGua = GUA_NAMES[shangGuaNum - 1]
  
  // 下卦：num2 % 8
  const xiaGuaNum = num2 % 8 || 8
  const xiaGua = GUA_NAMES[xiaGuaNum - 1]
  
  // 动爻：num3 % 6 或 (num1 + num2) % 6
  const dongYao = (num3 > 0 ? num3 : num1 + num2) % 6 || 6
  
  return timeQiGua(num1, num2, num3 || 1, dongYao)
}
