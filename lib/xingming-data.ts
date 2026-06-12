// 姓名学相关数据 - 参考《姓名学大全》《五格剖象法》

// 天干五行
export const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const GAN_WUXING: Record<string, string> = {
  "甲": "木", "乙": "木",
  "丙": "火", "丁": "火",
  "戊": "土", "己": "土",
  "庚": "金", "辛": "金",
  "壬": "水", "癸": "水"
}

// 数字五行
export const NUMBER_WUXING: Record<number, string> = {
  1: "水", 2: "火", 3: "木", 4: "木", 5: "土",
  6: "土", 7: "金", 8: "金", 9: "水", 0: "火"
}

// 笔画数计算（简体字常用字）
export const CHAR_STROKES: Record<string, number> = {
  "一": 1, "二": 2, "三": 3, "四": 5, "五": 4, "六": 4, "七": 2, "八": 2, "九": 2, "十": 2,
  "人": 2, "大": 3, "小": 3, "口": 3, "手": 4, "山": 3, "水": 4, "火": 4, "土": 3, "木": 4,
  "金": 8, "石": 5, "日": 4, "月": 4, "星": 9, "风": 9, "云": 4, "雨": 8, "雷": 13, "电": 5,
  "王": 4, "天": 4, "地": 6, "中": 4, "国": 8, "方": 4, "东": 5, "南": 9, "西": 6, "北": 5,
  "上": 3, "下": 3, "左": 5, "右": 5, "前": 9, "后": 6, "里": 7, "外": 5, "内": 4, "间": 7,
  "生": 5, "死": 6, "出": 5, "入": 2, "来": 8, "去": 5, "进": 7, "退": 9, "开": 4, "关": 6,
  "男": 7, "女": 3, "子": 3, "儿": 2, "父": 4, "母": 5, "兄": 5, "弟": 7, "姐": 8, "妹": 8,
  "夫": 4, "妻": 8, "爱": 10, "情": 11, "心": 4, "意": 13, "思": 9, "念": 8, "想": 13,
  "志": 7, "智": 12, "慧": 15, "贤": 8, "良": 7, "善": 12, "仁": 4, "义": 3, "礼": 5,
  "信": 9, "勇": 9, "强": 11, "刚": 6, "柔": 9, "和": 8, "顺": 9, "正": 5, "直": 8,
  "明": 8, "亮": 9, "光": 6, "华": 6, "丽": 19, "美": 9, "好": 6, "佳": 8, "优": 6,
  "学": 8, "习": 3, "书": 4, "读": 10, "写": 5, "文": 4, "章": 11, "诗": 8, "词": 7,
  "富": 12, "贵": 9, "财": 7, "福": 13, "寿": 7, "吉": 6, "祥": 11, "瑞": 13, "喜": 12,
  "康": 11, "健": 11, "安": 6, "宁": 5, "平": 5, "顺": 9, "乐": 5, "欢": 6, "笑": 10,
  "张": 11, "李": 7, "王": 4, "赵": 9, "刘": 6, "陈": 7, "杨": 7, "黄": 11, "周": 8, "吴": 7,
  "徐": 10, "孙": 6, "马": 10, "朱": 6, "胡": 9, "林": 8, "何": 7, "郭": 10, "罗": 8, "高": 10,
  "梁": 11, "郑": 8, "谢": 17, "宋": 7, "唐": 10, "许": 6, "韩": 12, "曹": 11, "邓": 4, "萧": 18,
  "冯": 5, "曾": 12, "程": 12, "蔡": 17, "彭": 12, "潘": 15, "袁": 10, "于": 3, "董": 15, "余": 7,
  "苏": 12, "叶": 5, "吕": 6, "魏": 17, "蒋": 12, "田": 5, "杜": 7, "丁": 2, "沈": 8, "姜": 9,
  "范": 8, "江": 6, "傅": 12, "钟": 17, "卢": 5, "汪": 8, "戴": 17, "崔": 11, "任": 6, "陆": 7,
  "廖": 14, "姚": 9, "方": 4, "金": 8, "邱": 7, "夏": 10, "谭": 19, "韦": 4, "贾": 13, "邹": 7,
  "石": 5, "熊": 14, "孟": 8, "秦": 10, "阎": 16, "薛": 19, "侯": 9, "雷": 13, "白": 5, "龙": 5,
  "段": 9, "郝": 9, "孔": 4, "邵": 7, "史": 5, "毛": 4, "常": 11, "万": 3, "顾": 21, "赖": 16,
  "武": 8, "康": 11, "贺": 12, "严": 19, "尹": 4, "钱": 10, "施": 9, "汤": 6, "陶": 10, "黎": 15,
  "莫": 13, "孔": 4, "向": 6, "华": 6, "梁": 11, "罗": 8, "郑": 8, "谢": 17, "韩": 12, "曹": 11,
  "胡": 9, "邓": 4, "许": 6, "傅": 12, "沈": 8, "曾": 12, "彭": 12, "吕": 6, "苏": 12, "卢": 5,
  "蒋": 12, "蔡": 17, "丁": 2, "魏": 17, "薛": 19, "叶": 5, "阎": 16, "余": 7, "潘": 15, "杜": 7,
  "戴": 17, "夏": 10, "钟": 17, "汪": 8, "田": 5, "任": 6, "姜": 9, "范": 8, "方": 4, "石": 5,
  "姚": 9, "谭": 19, "廖": 14, "邹": 7, "熊": 14, "金": 8, "陆": 7, "郝": 9, "孔": 4, "邵": 7,
  "史": 5, "毛": 4, "常": 11, "万": 3, "顾": 21, "赖": 16, "武": 8, "康": 11, "贺": 12, "严": 19
}

// 计算单个字的笔画数
export function getStrokeCount(char: string): number {
  return CHAR_STROKES[char] || 0
}

// 计算名字总笔画数
export function getTotalStrokes(name: string): number {
  let total = 0
  for (const char of name) {
    total += getStrokeCount(char)
  }
  return total
}

// 计算天格
export function getTianGe(surname: string): number {
  const strokes = getTotalStrokes(surname)
  return strokes + 1
}

// 计算人格
export function getRenGe(surname: string, givenName: string): number {
  const surnameStrokes = getTotalStrokes(surname)
  const givenNameStrokes = getTotalStrokes(givenName)
  return surnameStrokes + givenNameStrokes
}

// 计算地格
export function getDiGe(givenName: string): number {
  return getTotalStrokes(givenName)
}

// 计算总格
export function getZongGe(surname: string, givenName: string): number {
  return getTotalStrokes(surname) + getTotalStrokes(givenName)
}

// 计算外格
export function getWaiGe(surname: string, givenName: string): number {
  const tianGe = getTianGe(surname)
  const renGe = getRenGe(surname, givenName)
  const diGe = getDiGe(givenName)
  const zongGe = getZongGe(surname, givenName)
  return zongGe - renGe + 1
}

// 数字吉凶判断
export const NUMBER_LUCKY: Record<number, { luck: string; desc: string }> = {
  1: { luck: "吉", desc: "太极之数，万物开泰，生发无穷，利禄亨通" },
  2: { luck: "吉", desc: "两仪之数，混沌未开，进退保守，志望难达" },
  3: { luck: "吉", desc: "三才之数，天地人和，大事大业，繁荣昌盛" },
  4: { luck: "凶", desc: "四象之数，待于生发，万事慎重，不具营谋" },
  5: { luck: "吉", desc: "五行俱权，循环相生，圆通畅达，福祉无穷" },
  6: { luck: "吉", desc: "六爻之数，发展变化，天赋美德，吉祥安泰" },
  7: { luck: "吉", desc: "七政之数，精悍严谨，天赋之力，吉星照耀" },
  8: { luck: "吉", desc: "八卦之数，乾坎艮震，巽离坤兑，无穷无尽" },
  9: { luck: "凶", desc: "大成之数，蕴涵凶险，或成或败，难以把握" },
  10: { luck: "凶", desc: "终结之数，雪暗飘零，偶或有成，回顾茫然" },
  11: { luck: "吉", desc: "万物更新，调顺发达，恢弘泽世，繁荣富贵" },
  12: { luck: "凶", desc: "掘井无泉，意志薄弱，家庭寂寞，事不如意" },
  13: { luck: "吉", desc: "春日牡丹，才艺多能，智谋奇略，忍柔当事" },
  14: { luck: "凶", desc: "破兆，家庭缘薄，孤独遭难，谋事不达" },
  15: { luck: "吉", desc: "福寿，福寿圆满，富贵荣誉，涵养雅量" },
  16: { luck: "吉", desc: "厚重，贵人得助，兴家立业，大吉大利" },
  17: { luck: "吉", desc: "刚强，突破万难，如日中天，权威旺盛" },
  18: { luck: "吉", desc: "铁镜重磨，有志竟成，内外有运，博得名利" },
  19: { luck: "凶", desc: "多难，风云蔽日，辛苦重来，虽有智谋" },
  20: { luck: "凶", desc: "非业，破灭之象，进退维谷，诸事难成" },
  21: { luck: "吉", desc: "明月中天，光风霁月，万物确立，官运亨通" },
  22: { luck: "凶", desc: "秋草，秋草逢霜，怀才不遇，忧愁怨苦" },
  23: { luck: "吉", desc: "壮丽，旭日东升，壮丽壮观，权威旺盛" },
  24: { luck: "吉", desc: "掘藏得金，家门余庆，金钱丰盈，白手成家" },
  25: { luck: "吉", desc: "英俊，资性英敏，才能奇特，克服傲慢" },
  26: { luck: "凶", desc: "变怪，豪杰气概，变化无穷，涵养不足" },
  27: { luck: "凶", desc: "增长，欲望无止，自我强烈，多受毁谤" },
  28: { luck: "凶", desc: "阔水浮萍，豪气生离，骨肉分离，孤独悲愁" },
  29: { luck: "吉", desc: "不平，智谋优秀，财力归集，名闻海内" },
  30: { luck: "半吉", desc: "非运，沉浮不定，凶吉难辨，若明若暗" },
  31: { luck: "吉", desc: "春日花开，智勇得志，博得名利，统领众人" },
  32: { luck: "吉", desc: "宝马金鞍，侥幸多望，贵人得助，财帛如裕" },
  33: { luck: "吉", desc: "旭日升天，鸾凤相会，名闻天下，隆昌至极" },
  34: { luck: "凶", desc: "破家，破家之身，见识短小，辛苦遭逢" },
  35: { luck: "吉", desc: "高楼望月，温和平静，智达通畅，文昌技艺" },
  36: { luck: "凶", desc: "波澜，波澜重叠，沉浮万状，侠肝义胆" },
  37: { luck: "吉", desc: "猛虎出林，权威显达，热诚忠信，宜着雅量" },
  38: { luck: "半吉", desc: "磨铁成针，意志薄弱，刻意经营，才识不凡" },
  39: { luck: "吉", desc: "富贵，富贵荣华，财帛丰盈，暗藏险象" },
  40: { luck: "凶", desc: "退安，谨慎保安，进退保守，智胆力俱备" },
  41: { luck: "吉", desc: "有德，纯阳独秀，德高望重，和顺畅达" },
  42: { luck: "凶", desc: "寒蝉在柳，博识多能，精通世情，无奈非命" },
  43: { luck: "凶", desc: "散财，散财破产，诸事不遂，虽有智谋" },
  44: { luck: "凶", desc: "烦闷，破家亡身，暗藏惨淡，事不如意" },
  45: { luck: "吉", desc: "顺风，新生泰和，顺风扬帆，智谋经纬" },
  46: { luck: "凶", desc: "浪里淘金，载宝沉舟，浪里淘金，大难尝尽" },
  47: { luck: "吉", desc: "点石成金，花开之象，万事如意，祯祥吉庆" },
  48: { luck: "吉", desc: "古松立鹤，智谋兼备，德量荣达，威望成师" },
  49: { luck: "半吉", desc: "转变，吉临则吉，凶来则凶，进退维谷" },
  50: { luck: "凶", desc: "小舟入海，一成一败，吉凶参半，先得庇荫" },
  51: { luck: "半吉", desc: "沉浮，盛衰交加，波澜重叠，如能慎始" },
  52: { luck: "吉", desc: "达眼，卓识达眼，先见之明，智谋超群" },
  53: { luck: "凶", desc: "曲卷难星，外祥内苦，先吉后凶，先凶后吉" },
  54: { luck: "凶", desc: "石上栽花，石上栽花，难得有活，忧闷烦来" },
  55: { luck: "凶", desc: "善恶，善善得恶，恶恶得善，吉到极限" },
  56: { luck: "凶", desc: "浪里行舟，历尽艰辛，四周障害，万事难成" },
  57: { luck: "吉", desc: "日照春松，寒雪青松，夜莺吟春，必遭一过" },
  58: { luck: "半吉", desc: "晚行遇月，沉浮多端，先苦后甘，先甘后苦" },
  59: { luck: "凶", desc: "寒蝉悲风，寒蝉悲风，意志衰退，缺乏忍耐" },
  60: { luck: "凶", desc: "无谋，无谋之人，漂泊不定，晦暝暗黑" },
  61: { luck: "吉", desc: "牡丹芙蓉，牡丹芙蓉，花开富贵，名利双收" },
  62: { luck: "凶", desc: "衰败，衰败之象，内外不和，志望难达" },
  63: { luck: "吉", desc: "舟归平海，富贵荣华，身心安泰，雨露惠泽" },
  64: { luck: "凶", desc: "非命，骨肉分离，孤独悲愁，事不如意" },
  65: { luck: "吉", desc: "巨流归海，天长地久，家运隆昌，福寿绵长" },
  66: { luck: "凶", desc: "岩头步马，进退维谷，艰难不堪，进退两难" },
  67: { luck: "吉", desc: "通达，利路亨通，万事顺利，立竿见影" },
  68: { luck: "吉", desc: "顺风吹帆，智虑周密，集众信达，发明能智" },
  69: { luck: "凶", desc: "非业，坐立不安，处世多难，志望难达" },
  70: { luck: "凶", desc: "残菊逢霜，残菊逢霜，寂寞无碍，惨淡忧愁" },
  71: { luck: "半吉", desc: "石上金花，石上金花，内心劳苦，功成名就" },
  72: { luck: "凶", desc: "劳苦，荣苦相伴，阴云覆月，外祥内苦" },
  73: { luck: "半吉", desc: "无勇，盛衰交加，徒有高志，大事难成" },
  74: { luck: "凶", desc: "残菊经霜，残菊经霜，秋叶寂寞，徒劳无功" },
  75: { luck: "半吉", desc: "退守，退守保吉，发迹甚迟，虽有吉象" },
  76: { luck: "凶", desc: "离散，倾覆离散，骨肉分离，内外不和" },
  77: { luck: "半吉", desc: "半吉，家庭有悦，半吉半凶，能获成功" },
  78: { luck: "凶", desc: "晚苦，祸福参半，先天智能，中年发达" },
  79: { luck: "凶", desc: "云头望月，云头望月，身疲力尽，穷迫不移" },
  80: { luck: "凶", desc: "遁吉，辛苦不绝，早入隐遁，安心立命" },
  81: { luck: "吉", desc: "万物回春，还原复始，吉祥重叠，富贵尊荣" },
}

// 获取数字吉凶
export function getNumberLuck(num: number): { luck: string; desc: string } {
  const n = num % 81
  return NUMBER_LUCKY[n] || { luck: "半吉", desc: "数理普通" }
}

// 五行相生相克
export const WUXING_SHENG: Record<string, string> = {
  "木": "火", "火": "土", "土": "金", "金": "水", "水": "木"
}

export const WUXING_KE: Record<string, string> = {
  "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
}

// 名字评分
export function calculateNameScore(name: string): number {
  if (!name || name.length < 2) return 0
  
  const surname = name.charAt(0)
  const givenName = name.slice(1)
  
  const tianGe = getTianGe(surname)
  const renGe = getRenGe(surname, givenName)
  const diGe = getDiGe(givenName)
  const zongGe = getZongGe(surname, givenName)
  const waiGe = getWaiGe(surname, givenName)
  
  const tianLuck = getNumberLuck(tianGe).luck
  const renLuck = getNumberLuck(renGe).luck
  const diLuck = getNumberLuck(diGe).luck
  const zongLuck = getNumberLuck(zongGe).luck
  const waiLuck = getNumberLuck(waiGe).luck
  
  let score = 60
  
  if (tianLuck === "吉") score += 8
  if (renLuck === "吉") score += 12
  if (diLuck === "吉") score += 8
  if (zongLuck === "吉") score += 8
  if (waiLuck === "吉") score += 4
  
  if (tianLuck === "半吉") score += 4
  if (renLuck === "半吉") score += 6
  if (diLuck === "半吉") score += 4
  if (zongLuck === "半吉") score += 4
  if (waiLuck === "半吉") score += 2
  
  return Math.min(100, score)
}

// 生成姓名分析报告
export function generateNameAnalysis(name: string, gender: "男" | "女") {
  if (!name || name.length < 2) {
    return {
      valid: false,
      message: "请输入至少2个字符的姓名"
    }
  }
  
  const surname = name.charAt(0)
  const givenName = name.slice(1)
  
  const tianGe = getTianGe(surname)
  const renGe = getRenGe(surname, givenName)
  const diGe = getDiGe(givenName)
  const zongGe = getZongGe(surname, givenName)
  const waiGe = getWaiGe(surname, givenName)
  
  const tianLuck = getNumberLuck(tianGe)
  const renLuck = getNumberLuck(renGe)
  const diLuck = getNumberLuck(diGe)
  const zongLuck = getNumberLuck(zongGe)
  const waiLuck = getNumberLuck(waiGe)
  
  const score = calculateNameScore(name)
  
  const wuxingAnalysis = analyzeWuxing(name)
  
  return {
    valid: true,
    name,
    gender,
    surname,
    givenName,
    tianGe: { number: tianGe, ...tianLuck },
    renGe: { number: renGe, ...renLuck },
    diGe: { number: diGe, ...diLuck },
    zongGe: { number: zongGe, ...zongLuck },
    waiGe: { number: waiGe, ...waiLuck },
    score,
    wuxing: wuxingAnalysis,
    suggestions: generateSuggestions(name, gender, score, tianLuck.luck, renLuck.luck, diLuck.luck, zongLuck.luck, waiLuck.luck)
  }
}

// 五行分析
function analyzeWuxing(name: string) {
  let wuxingCount: Record<string, number> = { "木": 0, "火": 0, "土": 0, "金": 0, "水": 0 }
  
  for (const char of name) {
    const strokes = getStrokeCount(char)
    if (strokes > 0) {
      const wuxing = NUMBER_WUXING[strokes % 10]
      if (wuxing) {
        wuxingCount[wuxing]++
      }
    }
  }
  
  let maxWuxing = ""
  let maxCount = 0
  for (const [wuxing, count] of Object.entries(wuxingCount)) {
    if (count > maxCount) {
      maxCount = count
      maxWuxing = wuxing
    }
  }
  
  return {
    counts: wuxingCount,
    dominant: maxWuxing,
    balanced: maxCount <= Math.ceil(name.length / 2)
  }
}

// 生成建议
function generateSuggestions(name: string, gender: string, score: number, ...lucks: string[]) {
  const suggestions: string[] = []
  
  if (score >= 80) {
    suggestions.push("姓名数理配置良好，是一个吉名！")
  } else if (score >= 60) {
    suggestions.push("姓名数理配置尚可，可适当优化。")
  } else {
    suggestions.push("建议考虑改名或调整用字。")
  }
  
  if (lucks.filter(l => l === "凶").length > 2) {
    suggestions.push("五格中有较多凶数，建议重新评估姓名。")
  }
  
  if (gender === "男") {
    suggestions.push("男性姓名宜刚强、稳重，建议多选用阳刚之气的字。")
  } else {
    suggestions.push("女性姓名宜柔美、文雅，建议多选用温和之字。")
  }
  
  return suggestions
}