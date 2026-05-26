"use client"

// 六爻纳甲完整数据库

// 六十四卦数据
export const GUA_64: Record<string, {
  name: string
  symbol: string
  binary: string
  upperGua: string
  lowerGua: string
  guaCi: string
}> = {
  "111111": { name: "乾为天", symbol: "☰☰", binary: "111111", upperGua: "乾", lowerGua: "乾", guaCi: "元亨利贞" },
  "000000": { name: "坤为地", symbol: "☷☷", binary: "000000", upperGua: "坤", lowerGua: "坤", guaCi: "元亨，利牝马之贞" },
  "100010": { name: "水雷屯", symbol: "☵☳", binary: "100010", upperGua: "坎", lowerGua: "震", guaCi: "元亨利贞，勿用有攸往" },
  "010001": { name: "山水蒙", symbol: "☶☵", binary: "010001", upperGua: "艮", lowerGua: "坎", guaCi: "亨，匪我求童蒙" },
  "111010": { name: "水天需", symbol: "☵☰", binary: "111010", upperGua: "坎", lowerGua: "乾", guaCi: "有孚，光亨贞吉" },
  "010111": { name: "天水讼", symbol: "☰☵", binary: "010111", upperGua: "乾", lowerGua: "坎", guaCi: "有孚窒惕，中吉终凶" },
  "010000": { name: "地水师", symbol: "☷☵", binary: "010000", upperGua: "坤", lowerGua: "坎", guaCi: "贞丈人吉，无咎" },
  "000010": { name: "水地比", symbol: "☵☷", binary: "000010", upperGua: "坎", lowerGua: "坤", guaCi: "吉，原筮元永贞无咎" },
  "111011": { name: "风天小畜", symbol: "☴☰", binary: "111011", upperGua: "巽", lowerGua: "乾", guaCi: "亨，密云不雨" },
  "110111": { name: "天泽履", symbol: "☰☱", binary: "110111", upperGua: "乾", lowerGua: "兑", guaCi: "履虎尾，不咥人亨" },
  "111000": { name: "地天泰", symbol: "☷☰", binary: "111000", upperGua: "坤", lowerGua: "乾", guaCi: "小往大来，吉亨" },
  "000111": { name: "天地否", symbol: "☰☷", binary: "000111", upperGua: "乾", lowerGua: "坤", guaCi: "否之匪人，不利君子贞" },
  "101111": { name: "天火同人", symbol: "☰☲", binary: "101111", upperGua: "乾", lowerGua: "离", guaCi: "同人于野，亨" },
  "111101": { name: "火天大有", symbol: "☲☰", binary: "111101", upperGua: "离", lowerGua: "乾", guaCi: "元亨" },
  "001000": { name: "地山谦", symbol: "☷☶", binary: "001000", upperGua: "坤", lowerGua: "艮", guaCi: "亨，君子有终" },
  "000100": { name: "雷地豫", symbol: "☳☷", binary: "000100", upperGua: "震", lowerGua: "坤", guaCi: "利建侯行师" },
  "100110": { name: "泽雷随", symbol: "☱☳", binary: "100110", upperGua: "兑", lowerGua: "震", guaCi: "元亨利贞，无咎" },
  "011001": { name: "山风蛊", symbol: "☶☴", binary: "011001", upperGua: "艮", lowerGua: "巽", guaCi: "元亨，利涉大川" },
  "110000": { name: "地泽临", symbol: "☷☱", binary: "110000", upperGua: "坤", lowerGua: "兑", guaCi: "元亨利贞，至于八月有凶" },
  "000011": { name: "风地观", symbol: "☴☷", binary: "000011", upperGua: "巽", lowerGua: "坤", guaCi: "盥而不荐，有孚颙若" },
  "100101": { name: "火雷噬嗑", symbol: "☲☳", binary: "100101", upperGua: "离", lowerGua: "震", guaCi: "亨，利用狱" },
  "101001": { name: "山火贲", symbol: "☶☲", binary: "101001", upperGua: "艮", lowerGua: "离", guaCi: "亨，小利有攸往" },
  "000001": { name: "山地剥", symbol: "☶☷", binary: "000001", upperGua: "艮", lowerGua: "坤", guaCi: "不利有攸往" },
  "100000": { name: "地雷复", symbol: "☷☳", binary: "100000", upperGua: "坤", lowerGua: "震", guaCi: "亨，出入无疾" },
  "100111": { name: "天雷无妄", symbol: "☰☳", binary: "100111", upperGua: "乾", lowerGua: "震", guaCi: "元亨利贞" },
  "111001": { name: "山天大畜", symbol: "☶☰", binary: "111001", upperGua: "艮", lowerGua: "乾", guaCi: "利贞，不家食吉" },
  "100001": { name: "山雷颐", symbol: "☶☳", binary: "100001", upperGua: "艮", lowerGua: "震", guaCi: "贞吉，观颐自求口实" },
  "011110": { name: "泽风大过", symbol: "☱☴", binary: "011110", upperGua: "兑", lowerGua: "巽", guaCi: "栋桡，利有攸往亨" },
  "010010": { name: "坎为水", symbol: "☵☵", binary: "010010", upperGua: "坎", lowerGua: "坎", guaCi: "有孚维心亨" },
  "101101": { name: "离为火", symbol: "☲☲", binary: "101101", upperGua: "离", lowerGua: "离", guaCi: "利贞亨，畜牝牛吉" },
  "001110": { name: "泽山咸", symbol: "☱☶", binary: "001110", upperGua: "兑", lowerGua: "艮", guaCi: "亨利贞，取女吉" },
  "011100": { name: "雷风恒", symbol: "☳☴", binary: "011100", upperGua: "震", lowerGua: "巽", guaCi: "亨无咎利贞" },
  "001111": { name: "天山遁", symbol: "☰☶", binary: "001111", upperGua: "乾", lowerGua: "艮", guaCi: "亨，小利贞" },
  "111100": { name: "雷天大壮", symbol: "☳☰", binary: "111100", upperGua: "震", lowerGua: "乾", guaCi: "利贞" },
  "000101": { name: "火地晋", symbol: "☲☷", binary: "000101", upperGua: "离", lowerGua: "坤", guaCi: "康侯用锡马蕃庶" },
  "101000": { name: "地火明夷", symbol: "☷☲", binary: "101000", upperGua: "坤", lowerGua: "离", guaCi: "利艰贞" },
  "101011": { name: "风火家人", symbol: "☴☲", binary: "101011", upperGua: "巽", lowerGua: "离", guaCi: "利女贞" },
  "110101": { name: "火泽睽", symbol: "☲☱", binary: "110101", upperGua: "离", lowerGua: "兑", guaCi: "小事吉" },
  "001010": { name: "水山蹇", symbol: "☵☶", binary: "001010", upperGua: "坎", lowerGua: "艮", guaCi: "利西南不利东北" },
  "010100": { name: "雷水解", symbol: "☳☵", binary: "010100", upperGua: "震", lowerGua: "坎", guaCi: "利西南，无所往" },
  "110001": { name: "山泽损", symbol: "☶☱", binary: "110001", upperGua: "艮", lowerGua: "兑", guaCi: "有孚，元吉无咎" },
  "100011": { name: "风雷益", symbol: "☴☳", binary: "100011", upperGua: "巽", lowerGua: "震", guaCi: "利有攸往，利涉大川" },
  "111110": { name: "泽天夬", symbol: "☱☰", binary: "111110", upperGua: "兑", lowerGua: "乾", guaCi: "扬于王庭，孚号有厉" },
  "011111": { name: "天风姤", symbol: "☰☴", binary: "011111", upperGua: "乾", lowerGua: "巽", guaCi: "女壮，勿用取女" },
  "000110": { name: "泽地萃", symbol: "☱☷", binary: "000110", upperGua: "兑", lowerGua: "坤", guaCi: "亨，王假有庙" },
  "011000": { name: "地风升", symbol: "☷☴", binary: "011000", upperGua: "坤", lowerGua: "巽", guaCi: "元亨，用见大人" },
  "010110": { name: "泽水困", symbol: "☱☵", binary: "010110", upperGua: "兑", lowerGua: "坎", guaCi: "亨贞，大人吉无咎" },
  "011010": { name: "水风井", symbol: "☵☴", binary: "011010", upperGua: "坎", lowerGua: "巽", guaCi: "改邑不改井，无丧无得" },
  "101110": { name: "泽火革", symbol: "☱☲", binary: "101110", upperGua: "兑", lowerGua: "离", guaCi: "己日乃孚，元亨利贞" },
  "011101": { name: "火风鼎", symbol: "☲☴", binary: "011101", upperGua: "离", lowerGua: "巽", guaCi: "元吉亨" },
  "100100": { name: "震为雷", symbol: "☳☳", binary: "100100", upperGua: "震", lowerGua: "震", guaCi: "亨，震来虩虩" },
  "001001": { name: "艮为山", symbol: "☶☶", binary: "001001", upperGua: "艮", lowerGua: "艮", guaCi: "艮其背不获其身" },
  "001011": { name: "风山渐", symbol: "☴☶", binary: "001011", upperGua: "巽", lowerGua: "艮", guaCi: "女归吉，利贞" },
  "110100": { name: "雷泽归妹", symbol: "☳☱", binary: "110100", upperGua: "震", lowerGua: "兑", guaCi: "征凶，无攸利" },
  "101100": { name: "雷火丰", symbol: "☳☲", binary: "101100", upperGua: "震", lowerGua: "离", guaCi: "亨，王假之勿忧" },
  "001101": { name: "火山旅", symbol: "☲☶", binary: "001101", upperGua: "离", lowerGua: "艮", guaCi: "小亨，旅贞吉" },
  "011011": { name: "巽为风", symbol: "☴☴", binary: "011011", upperGua: "巽", lowerGua: "巽", guaCi: "小亨，利有攸往" },
  "110110": { name: "兑为泽", symbol: "☱☱", binary: "110110", upperGua: "兑", lowerGua: "兑", guaCi: "亨利贞" },
  "010011": { name: "风水涣", symbol: "☴☵", binary: "010011", upperGua: "巽", lowerGua: "坎", guaCi: "亨，王假有庙" },
  "110010": { name: "水泽节", symbol: "☵☱", binary: "110010", upperGua: "坎", lowerGua: "兑", guaCi: "亨，苦节不可贞" },
  "110011": { name: "风泽中孚", symbol: "☴☱", binary: "110011", upperGua: "巽", lowerGua: "兑", guaCi: "豚鱼吉，利涉大川" },
  "001100": { name: "雷山小过", symbol: "☳☶", binary: "001100", upperGua: "震", lowerGua: "艮", guaCi: "亨利贞，可小事" },
  "010101": { name: "水火既济", symbol: "☵☲", binary: "010101", upperGua: "坎", lowerGua: "离", guaCi: "亨小利贞，初吉终乱" },
  "101010": { name: "火水未济", symbol: "☲☵", binary: "101010", upperGua: "离", lowerGua: "坎", guaCi: "亨，小狐汔济濡其尾" }
}

// 八卦纳甲
export const BA_GUA_NA_JIA: Record<string, { gan: string; zhi: string[] }> = {
  乾: { gan: "甲壬", zhi: ["子", "寅", "辰", "午", "申", "戌"] },
  坤: { gan: "乙癸", zhi: ["未", "巳", "卯", "丑", "亥", "酉"] },
  震: { gan: "庚", zhi: ["子", "寅", "辰", "午", "申", "戌"] },
  巽: { gan: "辛", zhi: ["丑", "亥", "酉", "未", "巳", "卯"] },
  坎: { gan: "戊", zhi: ["寅", "辰", "午", "申", "戌", "子"] },
  离: { gan: "己", zhi: ["卯", "丑", "亥", "酉", "未", "巳"] },
  艮: { gan: "丙", zhi: ["辰", "午", "申", "戌", "子", "寅"] },
  兑: { gan: "丁", zhi: ["巳", "卯", "丑", "亥", "酉", "未"] }
}

// 六亲
export const LIU_QIN = ["父母", "兄弟", "子孙", "妻财", "官鬼"]

// 六兽（六神）
export const LIU_SHOU = ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"]

// 根据日干确定六兽起始
export const LIU_SHOU_START: Record<string, number> = {
  甲: 0, 乙: 0, // 青龙
  丙: 1, 丁: 1, // 朱雀
  戊: 2,       // 勾陈
  己: 3,       // 螣蛇
  庚: 4, 辛: 4, // 白虎
  壬: 5, 癸: 5  // 玄武
}

// 五行生克关系计算六亲
export function getLiuQin(guaWuxing: string, yaoWuxing: string): string {
  const wuxingOrder = ["木", "火", "土", "金", "水"]
  const guaIdx = wuxingOrder.indexOf(guaWuxing)
  const yaoIdx = wuxingOrder.indexOf(yaoWuxing)
  
  if (guaIdx === -1 || yaoIdx === -1) return "兄弟"
  
  const diff = (yaoIdx - guaIdx + 5) % 5
  
  switch (diff) {
    case 0: return "兄弟" // 同我
    case 1: return "子孙" // 我生
    case 2: return "妻财" // 我克
    case 3: return "官鬼" // 克我
    case 4: return "父母" // 生我
    default: return "兄弟"
  }
}

// 地支对应五行
export const ZHI_WUXING: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
}

// 卦宫五行
export const GUA_GONG_WUXING: Record<string, string> = {
  乾: "金", 兑: "金", 离: "火", 震: "木",
  巽: "木", 坎: "水", 艮: "土", 坤: "土"
}

// 世应位置（根据卦序）
export const SHI_YING: Record<number, { shi: number; ying: number }> = {
  1: { shi: 6, ying: 3 }, // 本宫卦：世在六爻
  2: { shi: 1, ying: 4 }, // 一世卦：世在初爻
  3: { shi: 2, ying: 5 }, // 二世卦：世在二爻
  4: { shi: 3, ying: 6 }, // 三世卦：世在三爻
  5: { shi: 4, ying: 1 }, // 四世卦：世在四爻
  6: { shi: 5, ying: 2 }, // 五世卦：世在五爻
  7: { shi: 4, ying: 1 }, // 游魂卦：世在四爻
  8: { shi: 3, ying: 6 }  // 归魂卦：世在三爻
}

// 起卦结果接口
export interface LiuYaoResult {
  guaName: string
  binary: string
  guaCi: string
  yaoList: {
    position: number
    yinYang: "阳" | "阴"
    dong: boolean  // 是否动爻
    ganZhi: string
    liuQin: string
    liuShou: string
    shiYing: "世" | "应" | ""
  }[]
  bianGua?: string // 变卦
  guaGong: string
}

// 根据六次投掷结果生成卦象
export function generateLiuYao(
  throws: number[], // 6次投掷结果，每次6-9
  dayGan: string
): LiuYaoResult {
  // 转换为二进制（7,9为阳=1，6,8为阴=0）
  const binary = throws.map(t => (t === 7 || t === 9) ? "1" : "0").join("")
  
  // 查找卦象
  const gua = GUA_64[binary] || GUA_64["111111"]
  
  // 确定卦宫
  const guaGong = gua.upperGua
  const guaGongWuxing = GUA_GONG_WUXING[guaGong] || "金"
  
  // 获取纳甲信息
  const upperNaJia = BA_GUA_NA_JIA[gua.upperGua] || BA_GUA_NA_JIA["乾"]
  const lowerNaJia = BA_GUA_NA_JIA[gua.lowerGua] || BA_GUA_NA_JIA["乾"]
  
  // 六兽起始
  const liuShouStart = LIU_SHOU_START[dayGan] || 0
  
  // 世应位置（简化处理）
  const shiYingData = SHI_YING[1] // 默认本宫卦
  
  // 生成六爻
  const yaoList = throws.map((t, idx) => {
    const position = idx + 1
    const yinYang: "阳" | "阴" = (t === 7 || t === 9) ? "阳" : "阴"
    const dong = t === 6 || t === 9 // 老阴老阳为动爻
    
    // 纳甲干支
    const isUpper = position > 3
    const naJia = isUpper ? upperNaJia : lowerNaJia
    const zhiIdx = isUpper ? position - 4 : position - 1
    const zhi = naJia.zhi[zhiIdx] || "子"
    const gan = naJia.gan[0]
    const ganZhi = gan + zhi
    
    // 六亲
    const yaoWuxing = ZHI_WUXING[zhi] || "水"
    const liuQin = getLiuQin(guaGongWuxing, yaoWuxing)
    
    // 六兽
    const liuShou = LIU_SHOU[(liuShouStart + idx) % 6]
    
    // 世应
    let shiYing: "世" | "应" | "" = ""
    if (position === shiYingData.shi) shiYing = "世"
    if (position === shiYingData.ying) shiYing = "应"
    
    return {
      position,
      yinYang,
      dong,
      ganZhi,
      liuQin,
      liuShou,
      shiYing
    }
  })
  
  // 变卦（如果有动爻）
  let bianGua: string | undefined
  const hasDong = throws.some(t => t === 6 || t === 9)
  if (hasDong) {
    const bianBinary = throws.map(t => {
      if (t === 9) return "0" // 老阳变阴
      if (t === 6) return "1" // 老阴变阳
      return (t === 7) ? "1" : "0"
    }).join("")
    const bian = GUA_64[bianBinary]
    if (bian) bianGua = bian.name
  }
  
  return {
    guaName: gua.name,
    binary,
    guaCi: gua.guaCi,
    yaoList,
    bianGua,
    guaGong
  }
}

// 手动起卦（时间起卦）
export function timeToGua(year: number, month: number, day: number, hour: number): number[] {
  // 简化的时间起卦法
  const upperNum = (year + month + day) % 8 || 8
  const lowerNum = (year + month + day + hour) % 8 || 8
  const dongYao = (year + month + day + hour) % 6 || 6
  
  // 转换为六爻（简化）
  const upperBinary = upperNum.toString(2).padStart(3, "0")
  const lowerBinary = lowerNum.toString(2).padStart(3, "0")
  
  const throws = (lowerBinary + upperBinary).split("").map((b, idx) => {
    const isYang = b === "1"
    const isDong = idx + 1 === dongYao
    if (isDong) {
      return isYang ? 9 : 6 // 动爻
    }
    return isYang ? 7 : 8 // 静爻
  })
  
  return throws
}
