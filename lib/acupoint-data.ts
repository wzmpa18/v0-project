// 完整穴位数据库 - 包含十二正经、奇经八脉、董氏奇穴

export interface Acupoint {
  id: string
  name: string
  pinyin: string
  code?: string // 国际代码如 LU1, ST36
  position: [number, number, number] // 3D坐标
  meridian: string
  category: "正经" | "奇经" | "董氏" | "经外奇穴"
  location: string // 取穴位置描述
  effect: string // 功效主治
  method?: string // 针刺方法
  depth?: string // 针刺深度
  caution?: string // 注意事项
}

// 经络颜色映射
export const MERIDIAN_COLORS: Record<string, string> = {
  // 十二正经
  "手太阴肺经": "#87CEEB",
  "手阳明大肠经": "#F4A460",
  "足阳明胃经": "#FFD700",
  "足太阴脾经": "#DAA520",
  "手少阴心经": "#DC143C",
  "手太阳小肠经": "#FF6347",
  "足太阳膀胱经": "#4169E1",
  "足少阴肾经": "#2F4F4F",
  "手厥阴心包经": "#8B008B",
  "手少阳三焦经": "#FF69B4",
  "足少阳胆经": "#32CD32",
  "足厥阴肝经": "#006400",
  // 奇经八脉
  "督脉": "#e63946",
  "任脉": "#f4a261",
  "冲脉": "#9B59B6",
  "带脉": "#3498DB",
  "阴维脉": "#1ABC9C",
  "阳维脉": "#E74C3C",
  "阴跷脉": "#2ECC71",
  "阳跷脉": "#F39C12",
  // 董氏奇穴
  "董氏奇穴": "#00CED1",
  // 经外奇穴
  "经外奇穴": "#9370DB",
}

// 经络简称映射
export const MERIDIAN_SHORT: Record<string, string> = {
  "手太阴肺经": "肺经",
  "手阳明大肠经": "大肠经",
  "足阳明胃经": "胃经",
  "足太阴脾经": "脾经",
  "手少阴心经": "心经",
  "手太阳小肠经": "小肠经",
  "足太阳膀胱经": "膀胱经",
  "足少阴肾经": "肾经",
  "手厥阴心包经": "心包经",
  "手少阳三焦经": "三焦经",
  "足少阳胆经": "胆经",
  "足厥阴肝经": "肝经",
}

// ==================== 手太阴肺经 (11穴) ====================
export const LUNG_MERIDIAN: Acupoint[] = [
  { id: "LU1", name: "中府", pinyin: "zhongfu", code: "LU1", position: [0.32, 1.52, 0.18], meridian: "手太阴肺经", category: "正经", location: "胸前壁外上方，前正中线旁开6寸，平第1肋间隙", effect: "肃降肺气，和胃利水，止咳平喘，清泻肺热，健脾补气", method: "斜刺或平刺", depth: "0.5-0.8寸" },
  { id: "LU2", name: "云门", pinyin: "yunmen", code: "LU2", position: [0.35, 1.58, 0.15], meridian: "手太阴肺经", category: "正经", location: "胸前壁外上方，锁骨下窝凹陷中，前正中线旁开6寸", effect: "肃降肺气，清热除烦", method: "斜刺", depth: "0.5-0.8寸", caution: "不可深刺，以免伤及肺脏" },
  { id: "LU3", name: "天府", pinyin: "tianfu", code: "LU3", position: [0.38, 1.42, 0.08], meridian: "手太阴肺经", category: "正经", location: "臂内侧面，肱二头肌桡侧缘，腋前纹头下3寸", effect: "清肺凉血，降逆止血", method: "直刺", depth: "0.5-1寸" },
  { id: "LU4", name: "侠白", pinyin: "xiabai", code: "LU4", position: [0.40, 1.35, 0.08], meridian: "手太阴肺经", category: "正经", location: "臂内侧面，肱二头肌桡侧缘，腋前纹头下4寸", effect: "宣肺理气，宽胸和胃", method: "直刺", depth: "0.5-1寸" },
  { id: "LU5", name: "尺泽", pinyin: "chize", code: "LU5", position: [0.48, 1.18, 0.08], meridian: "手太阴肺经", category: "正经", location: "肘横纹中，肱二头肌腱桡侧凹陷处", effect: "清肺泻火，和胃降逆，舒筋活络", method: "直刺", depth: "0.8-1.2寸" },
  { id: "LU6", name: "孔最", pinyin: "kongzui", code: "LU6", position: [0.50, 1.02, 0.08], meridian: "手太阴肺经", category: "正经", location: "前臂掌面桡侧，尺泽与太渊连线上，腕横纹上7寸", effect: "清热止血，润肺理气", method: "直刺", depth: "0.5-1寸" },
  { id: "LU7", name: "列缺", pinyin: "lieque", code: "LU7", position: [0.52, 0.82, 0.06], meridian: "手太阴肺经", category: "正经", location: "前臂桡侧缘，桡骨茎突上方，腕横纹上1.5寸", effect: "宣肺解表，通经活络，通调任脉", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "LU8", name: "经渠", pinyin: "jingqu", code: "LU8", position: [0.53, 0.72, 0.06], meridian: "手太阴肺经", category: "正经", location: "前臂掌面桡侧，桡骨茎突与桡动脉之间凹陷处，腕横纹上1寸", effect: "宣肺理气，清肺平喘", method: "直刺", depth: "0.3-0.5寸", caution: "避开桡动脉" },
  { id: "LU9", name: "太渊", pinyin: "taiyuan", code: "LU9", position: [0.54, 0.65, 0.06], meridian: "手太阴肺经", category: "正经", location: "腕掌侧横纹桡侧，桡动脉搏动处", effect: "补肺益气，止咳化痰，通经活络", method: "直刺", depth: "0.3-0.5寸", caution: "避开桡动脉" },
  { id: "LU10", name: "鱼际", pinyin: "yuji", code: "LU10", position: [0.58, 0.58, 0.08], meridian: "手太阴肺经", category: "正经", location: "手掌，第1掌骨中点桡侧，赤白肉际处", effect: "清肺泻热，利咽止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "LU11", name: "少商", pinyin: "shaoshang", code: "LU11", position: [0.62, 0.52, 0.10], meridian: "手太阴肺经", category: "正经", location: "拇指末节桡侧，距指甲角0.1寸", effect: "清热利咽，醒脑开窍", method: "浅刺", depth: "0.1寸或点刺出血" },
]

// ==================== 手阳明大肠经 (20穴) ====================
export const LARGE_INTESTINE_MERIDIAN: Acupoint[] = [
  { id: "LI1", name: "商阳", pinyin: "shangyang", code: "LI1", position: [0.63, 0.53, 0.05], meridian: "手阳明大肠经", category: "正经", location: "食指末节桡侧，距指甲角0.1寸", effect: "清热解表，醒脑开窍", method: "浅刺", depth: "0.1寸或点刺出血" },
  { id: "LI2", name: "二间", pinyin: "erjian", code: "LI2", position: [0.61, 0.55, 0.04], meridian: "手阳明大肠经", category: "正经", location: "食指本节前，桡侧凹陷处", effect: "清热解表，利咽消肿", method: "直刺", depth: "0.2-0.3寸" },
  { id: "LI3", name: "三间", pinyin: "sanjian", code: "LI3", position: [0.59, 0.57, 0.03], meridian: "手阳明大肠经", category: "正经", location: "食指本节后，桡侧凹陷处", effect: "清热解表，消肿止痛", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI4", name: "合谷", pinyin: "hegu", code: "LI4", position: [0.58, 0.60, 0.03], meridian: "手阳明大肠经", category: "正经", location: "手背，第1、2掌骨间，第2掌骨桡侧中点处", effect: "镇静止痛，通经活络，清热解表", method: "直刺", depth: "0.5-1寸", caution: "孕妇禁针" },
  { id: "LI5", name: "阳溪", pinyin: "yangxi", code: "LI5", position: [0.54, 0.68, 0.02], meridian: "手阳明大肠经", category: "正经", location: "腕背横纹桡侧，拇短伸肌腱与拇长伸肌腱之间凹陷处", effect: "清热散风，通利关节", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI6", name: "偏历", pinyin: "pianli", code: "LI6", position: [0.52, 0.78, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，腕横纹上3寸", effect: "清热利水，通经活络", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "LI7", name: "温溜", pinyin: "wenliu", code: "LI7", position: [0.51, 0.88, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，腕横纹上5寸", effect: "清热解毒，消肿止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "LI8", name: "下廉", pinyin: "xialian", code: "LI8", position: [0.50, 0.95, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，曲池下4寸", effect: "调理肠胃，通经活络", method: "直刺", depth: "0.5-1寸" },
  { id: "LI9", name: "上廉", pinyin: "shanglian", code: "LI9", position: [0.50, 1.02, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，曲池下3寸", effect: "调理肠胃，通经活络", method: "直刺", depth: "0.5-1寸" },
  { id: "LI10", name: "手三里", pinyin: "shousanli", code: "LI10", position: [0.50, 1.08, 0.03], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，曲池下2寸", effect: "通经活络，清热明目，调理肠胃", method: "直刺", depth: "0.8-1.2寸" },
  { id: "LI11", name: "曲池", pinyin: "quchi", code: "LI11", position: [0.52, 1.18, 0.03], meridian: "手阳明大肠经", category: "正经", location: "肘横纹外侧端，屈肘时肘横纹尽处与肱骨外上髁连线中点", effect: "清热解表，疏经通络，调和气血", method: "直刺", depth: "1-1.5寸" },
  { id: "LI12", name: "肘髎", pinyin: "zhouliao", code: "LI12", position: [0.50, 1.22, 0.02], meridian: "手阳明大肠经", category: "正经", location: "臂外侧，曲池上1寸，肱骨边缘处", effect: "舒筋活络，消肿止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "LI13", name: "手五里", pinyin: "shouwuli", code: "LI13", position: [0.48, 1.30, 0.02], meridian: "手阳明大肠经", category: "正经", location: "臂外侧，曲池与肩髃连线上，曲池上3寸", effect: "理气散结，通经活络", method: "直刺", depth: "0.5-1寸" },
  { id: "LI14", name: "臂臑", pinyin: "binao", code: "LI14", position: [0.45, 1.42, 0.02], meridian: "手阳明大肠经", category: "正经", location: "臂外侧，三角肌下端，曲池与肩髃连线上，曲池上7寸", effect: "理气通络，清热明目", method: "直刺或斜刺", depth: "0.5-1.5寸" },
  { id: "LI15", name: "肩髃", pinyin: "jianyu", code: "LI15", position: [0.40, 1.60, 0.02], meridian: "手阳明大肠经", category: "正经", location: "肩峰端下缘，三角肌上部中央，上臂外展时呈现凹陷处", effect: "疏经利节，祛风通络", method: "直刺或斜刺", depth: "0.8-1.5寸" },
  { id: "LI16", name: "巨骨", pinyin: "jugu", code: "LI16", position: [0.35, 1.65, -0.02], meridian: "手阳明大肠经", category: "正经", location: "肩上部，锁骨肩峰端与肩胛冈之间凹陷处", effect: "通经活络，消肿止痛", method: "直刺", depth: "0.5-1寸", caution: "不可深刺" },
  { id: "LI17", name: "天鼎", pinyin: "tianding", code: "LI17", position: [0.18, 1.78, 0.08], meridian: "手阳明大肠经", category: "正经", location: "颈外侧部，胸锁乳突肌后缘，扶突穴下1寸", effect: "清利咽喉，理气化痰", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI18", name: "扶突", pinyin: "futu", code: "LI18", position: [0.18, 1.82, 0.10], meridian: "手阳明大肠经", category: "正经", location: "颈外侧部，喉结旁开3寸，胸锁乳突肌前后缘之间", effect: "理气化痰，清热利咽", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI19", name: "口禾髎", pinyin: "kouheliao", code: "LI19", position: [0.12, 1.95, 0.40], meridian: "手阳明大肠经", category: "正经", location: "上唇部，鼻孔外缘直下，平水沟穴", effect: "清热散风，通鼻窍", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "LI20", name: "迎香", pinyin: "yingxiang", code: "LI20", position: [0.15, 1.98, 0.38], meridian: "手阳明大肠经", category: "正经", location: "鼻翼外缘中点旁，鼻唇沟中", effect: "散风清热，通利鼻窍", method: "斜刺或平刺", depth: "0.3-0.5寸" },
]

// ==================== 足阳明胃经 (45穴) ====================
export const STOMACH_MERIDIAN: Acupoint[] = [
  { id: "ST1", name: "承泣", pinyin: "chengqi", code: "ST1", position: [0.10, 2.02, 0.42], meridian: "足阳明胃经", category: "正经", location: "面部，瞳孔直下，眼球与眶下缘之间", effect: "散风清热，明目止泪", method: "直刺或斜刺", depth: "0.3-0.7寸", caution: "不可提插捻转，以免伤及眼球" },
  { id: "ST2", name: "四白", pinyin: "sibai", code: "ST2", position: [0.10, 1.98, 0.42], meridian: "足阳明胃经", category: "正经", location: "面部，瞳孔直下，眶下孔凹陷处", effect: "祛风明目，通络止痛", method: "直刺", depth: "0.3-0.5寸" },
  { id: "ST3", name: "巨髎", pinyin: "juliao", code: "ST3", position: [0.12, 1.95, 0.42], meridian: "足阳明胃经", category: "正经", location: "面部，瞳孔直下，平鼻翼下缘处，鼻唇沟外侧", effect: "清热熄风，明目退翳", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "ST4", name: "地仓", pinyin: "dicang", code: "ST4", position: [0.15, 1.90, 0.42], meridian: "足阳明胃经", category: "正经", location: "面部，口角外侧，瞳孔直下", effect: "祛风止痛，舒筋活络", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "ST5", name: "大迎", pinyin: "daying", code: "ST5", position: [0.18, 1.88, 0.38], meridian: "足阳明胃经", category: "正经", location: "下颌角前方，咬肌附着部前缘，面动脉搏动处", effect: "祛风通络，消肿止痛", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "ST6", name: "颊车", pinyin: "jiache", code: "ST6", position: [0.22, 1.88, 0.32], meridian: "足阳明胃经", category: "正经", location: "面颊部，下颌角前上方约1横指，咬肌中", effect: "祛风清热，开关通络", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "ST7", name: "下关", pinyin: "xiaguan", code: "ST7", position: [0.25, 1.95, 0.28], meridian: "足阳明胃经", category: "正经", location: "面部耳前方，颧弓与下颌切迹所形成的凹陷中", effect: "消肿止痛，聪耳通络", method: "直刺", depth: "0.3-0.5寸" },
  { id: "ST8", name: "头维", pinyin: "touwei", code: "ST8", position: [0.20, 2.18, 0.20], meridian: "足阳明胃经", category: "正经", location: "头侧部，额角发际上0.5寸，头正中线旁开4.5寸", effect: "清头明目，止痛镇痉", method: "平刺", depth: "0.5-1寸" },
  { id: "ST9", name: "人迎", pinyin: "renying", code: "ST9", position: [0.15, 1.80, 0.12], meridian: "足阳明胃经", category: "正经", location: "颈部，喉结旁开1.5寸，胸锁乳突肌前缘，颈总动脉搏动处", effect: "利咽散结，理气降逆", method: "直刺", depth: "0.3-0.5寸", caution: "避开颈动脉" },
  { id: "ST10", name: "水突", pinyin: "shuitu", code: "ST10", position: [0.15, 1.75, 0.12], meridian: "足阳明胃经", category: "正经", location: "颈部，胸锁乳突肌前缘，人迎与气舍连线中点", effect: "清热利咽，降逆平喘", method: "直刺", depth: "0.3-0.5寸" },
  { id: "ST11", name: "气舍", pinyin: "qishe", code: "ST11", position: [0.15, 1.70, 0.12], meridian: "足阳明胃经", category: "正经", location: "颈部，锁骨上窝，锁骨内侧端上缘，胸锁乳突肌胸骨头与锁骨头之间", effect: "理气化痰，降逆止呕", method: "直刺", depth: "0.3-0.5寸" },
  { id: "ST12", name: "缺盆", pinyin: "quepen", code: "ST12", position: [0.18, 1.65, 0.12], meridian: "足阳明胃经", category: "正经", location: "锁骨上窝中央，前正中线旁开4寸", effect: "宽胸利膈，止咳平喘", method: "直刺", depth: "0.3-0.5寸", caution: "不可深刺" },
  { id: "ST13", name: "气户", pinyin: "qihu", code: "ST13", position: [0.20, 1.58, 0.15], meridian: "足阳明胃经", category: "正经", location: "胸部，锁骨下缘，前正中线旁开4寸", effect: "理气宽胸，止咳平喘", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "ST14", name: "库房", pinyin: "kufang", code: "ST14", position: [0.20, 1.52, 0.16], meridian: "足阳明胃经", category: "正经", location: "胸部，第1肋间隙，前正中线旁开4寸", effect: "理气宽胸，止咳化痰", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "ST15", name: "屋翳", pinyin: "wuyi", code: "ST15", position: [0.20, 1.46, 0.17], meridian: "足阳明胃经", category: "正经", location: "胸部，第2肋间隙，前正中线旁开4寸", effect: "止咳化痰，消肿止痛", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "ST16", name: "膺窗", pinyin: "yingchuang", code: "ST16", position: [0.20, 1.40, 0.18], meridian: "足阳明胃经", category: "正经", location: "胸部，第3肋间隙，前正中线旁开4寸", effect: "宽胸理气，消肿止痛", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "ST17", name: "乳中", pinyin: "ruzhong", code: "ST17", position: [0.20, 1.34, 0.19], meridian: "足阳明胃经", category: "正经", location: "胸部，乳头中央", effect: "定位取穴标志", method: "禁针灸", caution: "禁针灸" },
  { id: "ST18", name: "乳根", pinyin: "rugen", code: "ST18", position: [0.20, 1.28, 0.19], meridian: "足阳明胃经", category: "正经", location: "胸部，乳头直下，第5肋间隙，前正中线旁开4寸", effect: "通乳化瘀，宽胸利气", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "ST19", name: "不容", pinyin: "burong", code: "ST19", position: [0.10, 1.18, 0.18], meridian: "足阳明胃经", category: "正经", location: "上腹部，脐中上6寸，前正中线旁开2寸", effect: "调中和胃，理气止痛", method: "直刺", depth: "0.5-0.8寸" },
  { id: "ST20", name: "承满", pinyin: "chengman", code: "ST20", position: [0.10, 1.14, 0.18], meridian: "足阳明胃经", category: "正经", location: "上腹部，脐中上5寸，前正中线旁开2寸", effect: "理气和胃，降逆止呕", method: "直刺", depth: "0.5-0.8寸" },
  { id: "ST21", name: "梁门", pinyin: "liangmen", code: "ST21", position: [0.10, 1.10, 0.18], meridian: "足阳明胃经", category: "正经", location: "上腹部，脐中上4寸，前正中线旁开2寸", effect: "和胃理气，健脾消食", method: "直刺", depth: "0.5-1寸" },
  { id: "ST22", name: "关门", pinyin: "guanmen", code: "ST22", position: [0.10, 1.06, 0.18], meridian: "足阳明胃经", category: "正经", location: "上腹部，脐中上3寸，前正中线旁开2寸", effect: "调理肠胃，利水消肿", method: "直刺", depth: "0.5-1寸" },
  { id: "ST23", name: "太乙", pinyin: "taiyi", code: "ST23", position: [0.10, 1.02, 0.18], meridian: "足阳明胃经", category: "正经", location: "上腹部，脐中上2寸，前正中线旁开2寸", effect: "安神定志，健脾和胃", method: "直刺", depth: "0.5-1寸" },
  { id: "ST24", name: "滑肉门", pinyin: "huaroumen", code: "ST24", position: [0.10, 0.98, 0.17], meridian: "足阳明胃经", category: "正经", location: "上腹部，脐中上1寸，前正中线旁开2寸", effect: "镇惊安神，调理肠胃", method: "直刺", depth: "0.5-1寸" },
  { id: "ST25", name: "天枢", pinyin: "tianshu", code: "ST25", position: [0.10, 0.92, 0.16], meridian: "足阳明胃经", category: "正经", location: "腹中部，脐中旁开2寸", effect: "调中和胃，理气健脾，调经止带", method: "直刺", depth: "1-1.5寸" },
  { id: "ST26", name: "外陵", pinyin: "wailing", code: "ST26", position: [0.10, 0.88, 0.16], meridian: "足阳明胃经", category: "正经", location: "下腹部，脐中下1寸，前正中线旁开2寸", effect: "理气止痛，调经止带", method: "直刺", depth: "0.5-1寸" },
  { id: "ST27", name: "大巨", pinyin: "daju", code: "ST27", position: [0.10, 0.84, 0.15], meridian: "足阳明胃经", category: "正经", location: "下腹部，脐中下2寸，前正中线旁开2寸", effect: "调经止带，调理下焦", method: "直刺", depth: "0.5-1.5寸" },
  { id: "ST28", name: "水道", pinyin: "shuidao", code: "ST28", position: [0.10, 0.80, 0.15], meridian: "足阳明胃经", category: "正经", location: "下腹部，脐中下3寸，前正中线旁开2寸", effect: "利水消肿，调经止痛", method: "直刺", depth: "0.5-1.5寸" },
  { id: "ST29", name: "归来", pinyin: "guilai", code: "ST29", position: [0.10, 0.76, 0.15], meridian: "足阳明胃经", category: "正经", location: "下腹部，脐中下4寸，前正中线旁开2寸", effect: "活血调经，升举下陷", method: "直刺", depth: "0.5-1.5寸" },
  { id: "ST30", name: "气冲", pinyin: "qichong", code: "ST30", position: [0.10, 0.70, 0.14], meridian: "足阳明胃经", category: "正经", location: "腹股沟区，耻骨联合上缘，前正中线旁开2寸，股动脉搏动处", effect: "理气止痛，调经止带", method: "直刺", depth: "0.5-1寸", caution: "避开股动脉" },
  { id: "ST31", name: "髀关", pinyin: "biguan", code: "ST31", position: [0.18, 0.55, 0.10], meridian: "足阳明胃经", category: "正经", location: "大腿前面，髂前上棘与髌底外侧端连线上，屈股时平会阴处", effect: "强腰膝，通经络", method: "直刺", depth: "1-2寸" },
  { id: "ST32", name: "伏兔", pinyin: "futu", code: "ST32", position: [0.18, 0.42, 0.11], meridian: "足阳明胃经", category: "正经", location: "大腿前面，髌底上6寸，髂前上棘与髌底外缘连线上", effect: "散寒化湿，通经活络", method: "直刺", depth: "1-2寸" },
  { id: "ST33", name: "阴市", pinyin: "yinshi", code: "ST33", position: [0.18, 0.32, 0.11], meridian: "足阳明胃经", category: "正经", location: "大腿前面，髌底上3寸，股四头肌与股外侧肌之间", effect: "温经散寒，理气止痛", method: "直刺", depth: "1-1.5寸" },
  { id: "ST34", name: "梁丘", pinyin: "liangqiu", code: "ST34", position: [0.18, 0.25, 0.11], meridian: "足阳明胃经", category: "正经", location: "大腿前面，髌底上2寸，股四头肌与股外侧肌之间", effect: "和胃理气，通经活络", method: "直刺", depth: "0.5-1.2寸" },
  { id: "ST35", name: "犊鼻", pinyin: "dubi", code: "ST35", position: [0.19, 0.15, 0.12], meridian: "足阳明胃经", category: "正经", location: "膝部，髌韧带外侧凹陷中", effect: "通经活络，疏风散寒", method: "斜刺", depth: "0.5-1寸" },
  { id: "ST36", name: "足三里", pinyin: "zusanli", code: "ST36", position: [0.20, 0.05, 0.12], meridian: "足阳明胃经", category: "正经", location: "小腿前外侧，犊鼻下3寸，距胫骨前缘1横指", effect: "健脾和胃，扶正培元，通经活络，升降气机", method: "直刺", depth: "1-2寸" },
  { id: "ST37", name: "上巨虚", pinyin: "shangjuxu", code: "ST37", position: [0.20, -0.05, 0.12], meridian: "足阳明胃经", category: "正经", location: "小腿前外侧，犊鼻下6寸，足三里下3寸", effect: "调肠胃，通经络", method: "直刺", depth: "1-2寸" },
  { id: "ST38", name: "条口", pinyin: "tiaokou", code: "ST38", position: [0.20, -0.12, 0.12], meridian: "足阳明胃经", category: "正经", location: "小腿前外侧，犊鼻下8寸，条口外开1寸", effect: "舒筋活络，理气和中", method: "直刺", depth: "1-1.5寸" },
  { id: "ST39", name: "下巨虚", pinyin: "xiajuxu", code: "ST39", position: [0.20, -0.18, 0.12], meridian: "足阳明胃经", category: "正经", location: "小腿前外侧，犊鼻下9寸，条口下1寸", effect: "调肠腑，通经络", method: "直刺", depth: "1-1.5寸" },
  { id: "ST40", name: "丰隆", pinyin: "fenglong", code: "ST40", position: [0.22, -0.12, 0.10], meridian: "足阳明胃经", category: "正经", location: "小腿前外侧，条口穴外侧1寸", effect: "和胃化痰，通络安神", method: "直刺", depth: "1-1.5寸" },
  { id: "ST41", name: "解溪", pinyin: "jiexi", code: "ST41", position: [0.18, -0.45, 0.12], meridian: "足阳明胃经", category: "正经", location: "足背与小腿交界处横纹中央凹陷中，两筋之间", effect: "清胃化痰，镇惊安神", method: "直刺", depth: "0.3-0.5寸" },
  { id: "ST42", name: "冲阳", pinyin: "chongyang", code: "ST42", position: [0.16, -0.52, 0.15], meridian: "足阳明胃经", category: "正经", location: "足背最高处，第2、3跖骨结合部前方凹陷中", effect: "和胃化痰，通络宁神", method: "直刺", depth: "0.3-0.5寸", caution: "避开足背动脉" },
  { id: "ST43", name: "陷谷", pinyin: "xiangu", code: "ST43", position: [0.15, -0.58, 0.15], meridian: "足阳明胃经", category: "正经", location: "足背，第2、3跖骨结合部前方凹陷中", effect: "和胃行水，理气止痛", method: "直刺", depth: "0.3-0.5寸" },
  { id: "ST44", name: "内庭", pinyin: "neiting", code: "ST44", position: [0.14, -0.64, 0.15], meridian: "足阳明胃经", category: "正经", location: "足背，第2、3趾间缝纹端", effect: "清胃泻火，通络止痛", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "ST45", name: "厉兑", pinyin: "lidui", code: "ST45", position: [0.13, -0.68, 0.15], meridian: "足阳明胃经", category: "正经", location: "足第2趾末节外侧，距趾甲角0.1寸", effect: "清热和胃，苏厥醒神", method: "浅刺", depth: "0.1寸或点刺出血" },
]

// ==================== 足太阴脾经 (21穴) ====================
export const SPLEEN_MERIDIAN: Acupoint[] = [
  { id: "SP1", name: "隐白", pinyin: "yinbai", code: "SP1", position: [0.08, -0.68, 0.12], meridian: "足太阴脾经", category: "正经", location: "足大趾末节内侧，距趾甲角0.1寸", effect: "调经统血，健脾回阳", method: "浅刺", depth: "0.1寸或点刺出血" },
  { id: "SP2", name: "大都", pinyin: "dadu", code: "SP2", position: [0.06, -0.62, 0.12], meridian: "足太阴脾经", category: "正经", location: "足内侧缘，第1跖趾关节前下方赤白肉际凹陷处", effect: "健脾和中，清热止痛", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SP3", name: "太白", pinyin: "taibai", code: "SP3", position: [0.05, -0.58, 0.10], meridian: "足太阴脾经", category: "正经", location: "足内侧缘，第1跖骨小头后下方凹陷处", effect: "健脾和胃，清热化湿", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SP4", name: "公孙", pinyin: "gongsun", code: "SP4", position: [0.04, -0.52, 0.08], meridian: "足太阴脾经", category: "正经", location: "足内侧缘，第1跖骨基底部前下方", effect: "健脾和胃，调冲任", method: "直刺", depth: "0.5-1寸" },
  { id: "SP5", name: "商丘", pinyin: "shangqiu", code: "SP5", position: [0.06, -0.48, 0.04], meridian: "足太阴脾经", category: "正经", location: "足内踝前下方凹陷中，舟骨结节与内踝尖连线中点", effect: "健脾化湿，通调肠胃", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SP6", name: "三阴交", pinyin: "sanyinjiao", code: "SP6", position: [0.10, -0.35, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，内踝尖上3寸，胫骨内侧缘后方", effect: "健脾益血，调肝补肾，安神助眠", method: "直刺", depth: "1-1.5寸", caution: "孕妇禁针" },
  { id: "SP7", name: "漏谷", pinyin: "lougu", code: "SP7", position: [0.10, -0.25, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，内踝尖上6寸，胫骨内侧缘后方", effect: "健脾渗湿，利尿消肿", method: "直刺", depth: "0.5-1寸" },
  { id: "SP8", name: "地机", pinyin: "diji", code: "SP8", position: [0.10, -0.15, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，内踝尖与阴陵泉连线上，阴陵泉下3寸", effect: "健脾渗湿，调经止带", method: "直刺", depth: "0.5-1寸" },
  { id: "SP9", name: "阴陵泉", pinyin: "yinlingquan", code: "SP9", position: [0.12, 0.05, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，胫骨内侧髁后下方凹陷中", effect: "健脾利湿，通利小便", method: "直刺", depth: "1-2寸" },
  { id: "SP10", name: "血海", pinyin: "xuehai", code: "SP10", position: [0.12, 0.20, 0.06], meridian: "足太阴脾经", category: "正经", location: "大腿内侧，髌底内侧端上2寸，股四头肌内侧头隆起处", effect: "调经统血，健脾化湿", method: "直刺", depth: "1-1.5寸" },
  { id: "SP11", name: "箕门", pinyin: "jimen", code: "SP11", position: [0.12, 0.35, 0.06], meridian: "足太阴脾经", category: "正经", location: "大腿内侧，血海与冲门连线上，血海上6寸", effect: "利尿通淋，健脾渗湿", method: "直刺", depth: "0.5-1寸" },
  { id: "SP12", name: "冲门", pinyin: "chongmen", code: "SP12", position: [0.08, 0.68, 0.12], meridian: "足太阴脾经", category: "正经", location: "腹股沟外侧，耻骨联合上缘中点旁开3.5寸，股动脉搏动处外侧", effect: "健脾化湿，理气解痉", method: "直刺", depth: "0.5-1寸", caution: "避开股动脉" },
  { id: "SP13", name: "府舍", pinyin: "fushe", code: "SP13", position: [0.06, 0.72, 0.14], meridian: "足太阴脾经", category: "正经", location: "下腹部，脐中下4.3寸，冲门上方0.7寸，前正中线旁开4寸", effect: "健脾理气，调经止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "SP14", name: "腹结", pinyin: "fujie", code: "SP14", position: [0.06, 0.82, 0.14], meridian: "足太阴脾经", category: "正经", location: "下腹部，大横下1.3寸，前正中线旁开4寸", effect: "健脾温中，行气止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "SP15", name: "大横", pinyin: "daheng", code: "SP15", position: [0.06, 0.92, 0.14], meridian: "足太阴脾经", category: "正经", location: "腹中部，脐中旁开4寸", effect: "温中散寒，调理肠胃", method: "直刺", depth: "0.5-1寸" },
  { id: "SP16", name: "腹哀", pinyin: "fuai", code: "SP16", position: [0.06, 1.02, 0.15], meridian: "足太阴脾经", category: "正经", location: "上腹部，脐中上3寸，前正中线旁开4寸", effect: "健脾和胃，理气消滞", method: "直刺", depth: "0.5-1寸" },
  { id: "SP17", name: "食窦", pinyin: "shidou", code: "SP17", position: [0.28, 1.28, 0.16], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第5肋间隙，前正中线旁开6寸", effect: "健脾理气，利水消肿", method: "斜刺或平刺", depth: "0.3-0.5寸", caution: "不可深刺" },
  { id: "SP18", name: "天溪", pinyin: "tianxi", code: "SP18", position: [0.28, 1.34, 0.16], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第4肋间隙，前正中线旁开6寸", effect: "宽胸理气，通乳消肿", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "SP19", name: "胸乡", pinyin: "xiongxiang", code: "SP19", position: [0.28, 1.40, 0.15], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第3肋间隙，前正中线旁开6寸", effect: "宽胸降气，舒肝理气", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "SP20", name: "周荣", pinyin: "zhourong", code: "SP20", position: [0.28, 1.46, 0.14], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第2肋间隙，前正中线旁开6寸", effect: "理气止咳，宽胸消肿", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "SP21", name: "大包", pinyin: "dabao", code: "SP21", position: [0.32, 1.30, 0.08], meridian: "足太阴脾经", category: "正经", location: "侧胸部，腋中线上，第6肋间隙处", effect: "统血通络，宽胸利胁", method: "斜刺或平刺", depth: "0.3-0.5寸" },
]

// ==================== 手少阴心经 (9穴) ====================
export const HEART_MERIDIAN: Acupoint[] = [
  { id: "HT1", name: "极泉", pinyin: "jiquan", code: "HT1", position: [0.38, 1.55, 0.02], meridian: "手少阴心经", category: "正经", location: "腋窝顶点，腋动脉搏动处", effect: "宽胸理气，通经活络", method: "直刺", depth: "0.3-0.5寸", caution: "避开腋动脉" },
  { id: "HT2", name: "青灵", pinyin: "qingling", code: "HT2", position: [0.42, 1.42, 0.05], meridian: "手少阴心经", category: "正经", location: "臂内侧，少海与极泉连线上，肘横纹上3寸", effect: "理气止痛，通络宁心", method: "直刺", depth: "0.5-1寸" },
  { id: "HT3", name: "少海", pinyin: "shaohai", code: "HT3", position: [0.45, 1.18, 0.08], meridian: "手少阴心经", category: "正经", location: "肘横纹内侧端与肱骨内上髁连线中点处", effect: "宁心安神，通络止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "HT4", name: "灵道", pinyin: "lingdao", code: "HT4", position: [0.46, 0.88, 0.08], meridian: "手少阴心经", category: "正经", location: "前臂掌侧，腕横纹上1.5寸，尺侧腕屈肌腱桡侧缘", effect: "宁心安神，通经活络", method: "直刺", depth: "0.3-0.5寸" },
  { id: "HT5", name: "通里", pinyin: "tongli", code: "HT5", position: [0.46, 0.82, 0.08], meridian: "手少阴心经", category: "正经", location: "前臂掌侧，腕横纹上1寸，尺侧腕屈肌腱桡侧缘", effect: "宁心安神，清热利咽", method: "直刺", depth: "0.3-0.5寸" },
  { id: "HT6", name: "阴郄", pinyin: "yinxi", code: "HT6", position: [0.46, 0.76, 0.08], meridian: "手少阴心经", category: "正经", location: "前臂掌侧，腕横纹上0.5寸，尺侧腕屈肌腱桡侧缘", effect: "养心安神，清热止汗", method: "直刺", depth: "0.3-0.5寸" },
  { id: "HT7", name: "神门", pinyin: "shenmen", code: "HT7", position: [0.46, 0.68, 0.08], meridian: "手少阴心经", category: "正经", location: "腕部，腕掌侧横纹尺侧端，尺侧腕屈肌腱桡侧凹陷处", effect: "宁心安神，通经活络", method: "直刺", depth: "0.3-0.5寸" },
  { id: "HT8", name: "少府", pinyin: "shaofu", code: "HT8", position: [0.50, 0.58, 0.10], meridian: "手少阴心经", category: "正经", location: "手掌面，第4、5掌骨之间，握拳时小指尖处", effect: "清心泻火，活血通络", method: "直刺", depth: "0.3-0.5寸" },
  { id: "HT9", name: "少冲", pinyin: "shaochong", code: "HT9", position: [0.55, 0.52, 0.10], meridian: "手少阴心经", category: "正经", location: "小指末节桡侧，距指甲角0.1寸", effect: "清热开窍，回阳救逆", method: "浅刺", depth: "0.1寸或点刺出血" },
]

// ==================== 手太阳小肠经 (19穴) ====================
export const SMALL_INTESTINE_MERIDIAN: Acupoint[] = [
  { id: "SI1", name: "少泽", pinyin: "shaoze", code: "SI1", position: [0.56, 0.52, 0.08], meridian: "手太阳小肠经", category: "正经", location: "小指末节尺侧，距指甲角0.1寸", effect: "清热利咽，通乳开窍", method: "浅刺", depth: "0.1寸或点刺出血" },
  { id: "SI2", name: "前谷", pinyin: "qiangu", code: "SI2", position: [0.54, 0.55, 0.06], meridian: "手太阳小肠经", category: "正经", location: "小指本节前，第5掌指关节尺侧凹陷处", effect: "清热消肿，安神定志", method: "直刺", depth: "0.2-0.3寸" },
  { id: "SI3", name: "后溪", pinyin: "houxi", code: "SI3", position: [0.52, 0.58, 0.04], meridian: "手太阳小肠经", category: "正经", location: "手掌尺侧，第5掌指关节后方凹陷处", effect: "清心安神，通经活络，清热利咽", method: "直刺", depth: "0.5-1寸" },
  { id: "SI4", name: "腕骨", pinyin: "wangu", code: "SI4", position: [0.50, 0.62, 0.02], meridian: "手太阳小肠经", category: "正经", location: "手掌尺侧，第5掌骨基底与钩骨之间凹陷处", effect: "清热利湿，舒筋活络", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SI5", name: "阳谷", pinyin: "yanggu", code: "SI5", position: [0.48, 0.68, 0.0], meridian: "手太阳小肠经", category: "正经", location: "手腕尺侧，三角骨与尺骨茎突之间凹陷处", effect: "清热散风，安神定志", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SI6", name: "养老", pinyin: "yanglao", code: "SI6", position: [0.48, 0.72, -0.02], meridian: "手太阳小肠经", category: "正经", location: "前臂背面尺侧，尺骨茎突上方，尺骨小头桡侧缘凹陷中", effect: "明目舒筋，通络止痛", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "SI7", name: "支正", pinyin: "zhizheng", code: "SI7", position: [0.48, 0.85, -0.02], meridian: "手太阳小肠经", category: "正经", location: "前臂背面尺侧，阳谷与小海连线上，腕横纹上5寸", effect: "安神定志，清热解表", method: "直刺或斜刺", depth: "0.5-1寸" },
  { id: "SI8", name: "小海", pinyin: "xiaohai", code: "SI8", position: [0.48, 1.18, -0.02], meridian: "手太阳小肠经", category: "正经", location: "肘内侧，尺骨鹰嘴与肱骨内上髁之间凹陷处", effect: "安神定志，清热通络", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SI9", name: "肩贞", pinyin: "jianzhen", code: "SI9", position: [0.38, 1.58, -0.10], meridian: "手太阳小肠经", category: "正经", location: "肩关节后下方，臂内收时腋后纹头上1寸", effect: "通经活络，清热聪耳", method: "直刺", depth: "1-1.5寸" },
  { id: "SI10", name: "臑俞", pinyin: "naoshu", code: "SI10", position: [0.35, 1.62, -0.12], meridian: "手太阳小肠经", category: "正经", location: "肩部，腋后纹头直上，肩胛冈下缘凹陷中", effect: "舒筋活络，化痰消肿", method: "直刺或斜刺", depth: "0.5-1.5寸" },
  { id: "SI11", name: "天宗", pinyin: "tianzong", code: "SI11", position: [0.22, 1.48, -0.18], meridian: "手太阳小肠经", category: "正经", location: "肩胛部，冈下窝中央凹陷处，约肩胛冈下缘与肩胛下角连线上1/3与下2/3交点处", effect: "舒筋活络，理气消肿", method: "直刺或斜刺", depth: "0.5-1寸" },
  { id: "SI12", name: "秉风", pinyin: "bingfeng", code: "SI12", position: [0.22, 1.58, -0.15], meridian: "手太阳小肠经", category: "正经", location: "肩胛部，冈上窝中央，天宗直上，举臂有凹陷处", effect: "散风活络，止咳化痰", method: "直刺或斜刺", depth: "0.5-1寸" },
  { id: "SI13", name: "曲垣", pinyin: "quyuan", code: "SI13", position: [0.15, 1.62, -0.15], meridian: "手太阳小肠经", category: "正经", location: "肩胛部，冈上窝内侧端，臑俞与第2胸椎棘突连线中点", effect: "舒筋活络，消肿止痛", method: "直刺或斜刺", depth: "0.5-1寸" },
  { id: "SI14", name: "肩外俞", pinyin: "jianwaishu", code: "SI14", position: [0.12, 1.68, -0.18], meridian: "手太阳小肠经", category: "正经", location: "背部，第1胸椎棘突下，后正中线旁开3寸", effect: "舒筋活络，祛风止痛", method: "斜刺", depth: "0.3-0.6寸" },
  { id: "SI15", name: "肩中俞", pinyin: "jianzhongshu", code: "SI15", position: [0.10, 1.72, -0.18], meridian: "手太阳小肠经", category: "正经", location: "背部，第7颈椎棘突下，后正中线旁开2寸", effect: "宣肺解表，疏经活络", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "SI16", name: "天窗", pinyin: "tianchuang", code: "SI16", position: [0.20, 1.82, 0.05], meridian: "手太阳小肠经", category: "正经", location: "颈外侧部，胸锁乳突肌后缘，扶突穴后方，与喉结相平", effect: "清热利咽，聪耳通窍", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SI17", name: "天容", pinyin: "tianrong", code: "SI17", position: [0.22, 1.88, 0.08], meridian: "手太阳小肠经", category: "正经", location: "颈外侧部，下颌角后方，胸锁乳突肌前缘凹陷中", effect: "清热利咽，消肿止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "SI18", name: "颧髎", pinyin: "quanliao", code: "SI18", position: [0.25, 1.98, 0.30], meridian: "手太阳小肠经", category: "正经", location: "面部，颧骨下缘凹陷处，目外眦直下", effect: "清热消肿，祛风止痛", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "SI19", name: "听宫", pinyin: "tinggong", code: "SI19", position: [0.28, 2.00, 0.22], meridian: "手太阳小肠经", category: "正经", location: "面部，耳屏前，下颌骨髁状突后方，张口时呈凹陷处", effect: "聪耳开窍，安神定志", method: "直刺", depth: "0.5-1寸" },
]

// ==================== 督脉 (28穴) ====================
export const DU_MERIDIAN: Acupoint[] = [
  { id: "DU1", name: "长强", pinyin: "changqiang", code: "DU1", position: [0, 0.45, -0.12], meridian: "督脉", category: "奇经", location: "尾骨端下，尾骨端与肛门连线中点处", effect: "通调督脉，调畅二便，清热利湿", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU2", name: "腰俞", pinyin: "yaoshu", code: "DU2", position: [0, 0.60, -0.15], meridian: "督脉", category: "奇经", location: "骶部，后正中线上，骶管裂孔处", effect: "调经清热，散寒除湿", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU3", name: "腰阳关", pinyin: "yaoyanguan", code: "DU3", position: [0, 0.85, -0.18], meridian: "督脉", category: "奇经", location: "腰部，后正中线上，第4腰椎棘突下凹陷中", effect: "祛寒除湿，舒筋活络", method: "直刺", depth: "0.5-1寸" },
  { id: "DU4", name: "命门", pinyin: "mingmen", code: "DU4", position: [0, 0.95, -0.18], meridian: "督脉", category: "奇经", location: "腰部，后正中线上，第2腰椎棘突下凹陷中", effect: "补肾壮阳，培元固本，强健腰膝", method: "直刺", depth: "0.5-1寸" },
  { id: "DU5", name: "悬枢", pinyin: "xuanshu", code: "DU5", position: [0, 1.02, -0.18], meridian: "督脉", category: "奇经", location: "腰部，后正中线上，第1腰椎棘突下凹陷中", effect: "强腰补肾，健脾和胃", method: "直刺", depth: "0.5-1寸" },
  { id: "DU6", name: "脊中", pinyin: "jizhong", code: "DU6", position: [0, 1.15, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第11胸椎棘突下凹陷中", effect: "健脾利湿，宁神镇痉", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU7", name: "中枢", pinyin: "zhongshu", code: "DU7", position: [0, 1.22, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第10胸椎棘突下凹陷中", effect: "健脾利湿，清热止痛", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU8", name: "筋缩", pinyin: "jinsuo", code: "DU8", position: [0, 1.28, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第9胸椎棘突下凹陷中", effect: "平肝熄风，宁神镇痉", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU9", name: "至阳", pinyin: "zhiyang", code: "DU9", position: [0, 1.35, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第7胸椎棘突下凹陷中", effect: "利胆退黄，宽胸利膈", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU10", name: "灵台", pinyin: "lingtai", code: "DU10", position: [0, 1.42, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第6胸椎棘突下凹陷中", effect: "清热化痰，止咳定喘", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU11", name: "神道", pinyin: "shendao", code: "DU11", position: [0, 1.48, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第5胸椎棘突下凹陷中", effect: "宁心安神，清热平喘", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU12", name: "身柱", pinyin: "shenzhu", code: "DU12", position: [0, 1.55, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第3胸椎棘突下凹陷中", effect: "宣肺清热，宁神镇痉", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU13", name: "陶道", pinyin: "taodao", code: "DU13", position: [0, 1.62, -0.20], meridian: "督脉", category: "奇经", location: "背部，后正中线上，第1胸椎棘突下凹陷中", effect: "解表清热，截疟宁神", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU14", name: "大椎", pinyin: "dazhui", code: "DU14", position: [0, 1.75, -0.18], meridian: "督脉", category: "奇经", location: "后正中线上，第7颈椎棘突下凹陷中", effect: "清热解表，截疟止痫，肃肺宁心", method: "斜刺", depth: "0.5-1寸" },
  { id: "DU15", name: "哑门", pinyin: "yamen", code: "DU15", position: [0, 1.88, -0.15], meridian: "督脉", category: "奇经", location: "项部，后正中线上，第1颈椎下方凹陷中", effect: "散风熄风，开窍醒神", method: "直刺", depth: "0.5-1寸", caution: "针尖向下颌方向" },
  { id: "DU16", name: "风府", pinyin: "fengfu", code: "DU16", position: [0, 1.95, -0.12], meridian: "督脉", category: "奇经", location: "项部，后正中线上，枕外隆凸直下，两侧斜方肌之间凹陷中", effect: "散风熄风，通关开窍", method: "直刺", depth: "0.5-1寸", caution: "针尖向下颌方向" },
  { id: "DU17", name: "脑户", pinyin: "naohu", code: "DU17", position: [0, 2.05, -0.08], meridian: "督脉", category: "奇经", location: "头部，后正中线上，枕外隆凸上缘凹陷处", effect: "醒脑安神，熄风止痉", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU18", name: "强间", pinyin: "qiangjian", code: "DU18", position: [0, 2.12, -0.02], meridian: "督脉", category: "奇经", location: "头部，后正中线上，脑户上1.5寸", effect: "醒脑安神，熄风止痉", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU19", name: "后顶", pinyin: "houding", code: "DU19", position: [0, 2.20, 0.02], meridian: "督脉", category: "奇经", location: "头部，后正中线上，强间上1.5寸", effect: "醒脑安神，熄风止痉", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU20", name: "百会", pinyin: "baihui", code: "DU20", position: [0, 2.35, 0.05], meridian: "督脉", category: "奇经", location: "头部，后正中线上，两耳尖连线中点", effect: "醒脑开窍，升阳举陷，宁心安神", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU21", name: "前顶", pinyin: "qianding", code: "DU21", position: [0, 2.30, 0.15], meridian: "督脉", category: "奇经", location: "头部，前正中线上，百会前1.5寸", effect: "熄风醒脑，宁神镇痉", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU22", name: "囟会", pinyin: "xinhui", code: "DU22", position: [0, 2.25, 0.25], meridian: "督脉", category: "奇经", location: "头部，前正中线上，前发际正中直上2寸", effect: "清热消肿，安神醒脑", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU23", name: "上星", pinyin: "shangxing", code: "DU23", position: [0, 2.18, 0.32], meridian: "督脉", category: "奇经", location: "头部，前正中线上，前发际正中直上1寸", effect: "清热散风，通鼻开窍", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU24", name: "神庭", pinyin: "shenting", code: "DU24", position: [0, 2.12, 0.38], meridian: "督脉", category: "奇经", location: "头部，前正中线上，前发际正中直上0.5寸", effect: "宁神醒脑，清热散风", method: "平刺", depth: "0.3-0.5寸" },
  { id: "DU25", name: "素髎", pinyin: "suliao", code: "DU25", position: [0, 2.0, 0.50], meridian: "督脉", category: "奇经", location: "面部，鼻尖正中", effect: "清热消肿，通利鼻窍", method: "点刺出血或向上斜刺", depth: "0.3-0.5寸" },
  { id: "DU26", name: "水沟", pinyin: "shuigou", code: "DU26", position: [0, 1.95, 0.45], meridian: "督脉", category: "奇经", location: "面部，人中沟上1/3与下2/3交点处", effect: "醒神开窍，清热熄风", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "DU27", name: "兑端", pinyin: "duiduan", code: "DU27", position: [0, 1.90, 0.45], meridian: "督脉", category: "奇经", location: "面部，上唇尖端，人中沟下端的皮肤与唇的移行部", effect: "宁神醒脑，生津止渴", method: "斜刺", depth: "0.2-0.3寸" },
  { id: "DU28", name: "龈交", pinyin: "yinjiao", code: "DU28", position: [0, 1.88, 0.42], meridian: "督脉", category: "奇经", location: "口腔内，上唇系带与上牙龈连接处", effect: "宁神镇痉，清热消肿", method: "点刺出血", depth: "0.1-0.2寸" },
]

// ==================== 任脉 (24穴) ====================
export const REN_MERIDIAN: Acupoint[] = [
  { id: "RN1", name: "会阴", pinyin: "huiyin", code: "RN1", position: [0, 0.50, 0.10], meridian: "任脉", category: "奇经", location: "会阴部，男性当阴囊根部与肛门连线中点，女性当大阴唇后联合与肛门连线中点", effect: "醒神开窍，通调二便", method: "直刺", depth: "0.5-1寸" },
  { id: "RN2", name: "曲骨", pinyin: "qugu", code: "RN2", position: [0, 0.62, 0.15], meridian: "任脉", category: "奇经", location: "下腹部，前正中线上，耻骨联合上缘中点处", effect: "通利膀胱，调经止带", method: "直刺", depth: "0.5-1寸" },
  { id: "RN3", name: "中极", pinyin: "zhongji", code: "RN3", position: [0, 0.68, 0.16], meridian: "任脉", category: "奇经", location: "下腹部，前正中线上，脐中下4寸", effect: "益肾兴阳，通调下焦", method: "直刺", depth: "0.5-1寸" },
  { id: "RN4", name: "关元", pinyin: "guanyuan", code: "RN4", position: [0, 0.75, 0.17], meridian: "任脉", category: "奇经", location: "下腹部，前正中线上，脐中下3寸", effect: "培补元气，回阳救逆，调经止带", method: "直刺", depth: "0.5-1寸" },
  { id: "RN5", name: "石门", pinyin: "shimen", code: "RN5", position: [0, 0.80, 0.17], meridian: "任脉", category: "奇经", location: "下腹部，前正中线上，脐中下2寸", effect: "利水消肿，理气止痛", method: "直刺", depth: "0.5-1寸", caution: "孕妇禁针" },
  { id: "RN6", name: "气海", pinyin: "qihai", code: "RN6", position: [0, 0.85, 0.17], meridian: "任脉", category: "奇经", location: "下腹部，前正中线上，脐中下1.5寸", effect: "补气益元，温阳固脱，调经止带", method: "直刺", depth: "0.5-1寸" },
  { id: "RN7", name: "阴交", pinyin: "yinjiao", code: "RN7", position: [0, 0.88, 0.17], meridian: "任脉", category: "奇经", location: "下腹部，前正中线上，脐中下1寸", effect: "调经止带，利水消肿", method: "直刺", depth: "0.5-1寸" },
  { id: "RN8", name: "神阙", pinyin: "shenque", code: "RN8", position: [0, 0.92, 0.17], meridian: "任脉", category: "奇经", location: "腹中部，脐中央", effect: "温阳救逆，利水固脱", method: "禁针，宜灸", caution: "禁针" },
  { id: "RN9", name: "水分", pinyin: "shuifen", code: "RN9", position: [0, 0.96, 0.18], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上1寸", effect: "通调水道，健脾利湿", method: "直刺", depth: "0.5-1寸" },
  { id: "RN10", name: "下脘", pinyin: "xiawan", code: "RN10", position: [0, 1.00, 0.18], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上2寸", effect: "健脾和胃，降逆止呕", method: "直刺", depth: "0.5-1寸" },
  { id: "RN11", name: "建里", pinyin: "jianli", code: "RN11", position: [0, 1.04, 0.19], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上3寸", effect: "健脾和胃，消积化滞", method: "直刺", depth: "0.5-1寸" },
  { id: "RN12", name: "中脘", pinyin: "zhongwan", code: "RN12", position: [0, 1.08, 0.19], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上4寸", effect: "健脾和胃，降逆止呕，和中消滞", method: "直刺", depth: "0.5-1寸" },
  { id: "RN13", name: "上脘", pinyin: "shangwan", code: "RN13", position: [0, 1.12, 0.20], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上5寸", effect: "健脾和胃，降逆止呕", method: "直刺", depth: "0.5-1寸" },
  { id: "RN14", name: "巨阙", pinyin: "juque", code: "RN14", position: [0, 1.18, 0.20], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上6寸", effect: "宽胸化痰，宁心安神", method: "斜刺", depth: "0.3-0.6寸" },
  { id: "RN15", name: "鸠尾", pinyin: "jiuwei", code: "RN15", position: [0, 1.22, 0.21], meridian: "任脉", category: "奇经", location: "上腹部，前正中线上，脐中上7寸，剑突下", effect: "宽胸化痰，和胃降逆", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "RN16", name: "中庭", pinyin: "zhongting", code: "RN16", position: [0, 1.28, 0.21], meridian: "任脉", category: "奇经", location: "胸部，前正中线上，平第5肋间", effect: "宽胸理气，降逆止呕", method: "平刺", depth: "0.3-0.5寸" },
  { id: "RN17", name: "膻中", pinyin: "danzhong", code: "RN17", position: [0, 1.35, 0.22], meridian: "任脉", category: "奇经", location: "胸部，前正中线上，两乳头连线中点，平第4肋间", effect: "宽胸理气，降逆止呕，通乳化痰", method: "平刺", depth: "0.3-0.5寸" },
  { id: "RN18", name: "玉堂", pinyin: "yutang", code: "RN18", position: [0, 1.42, 0.22], meridian: "任脉", category: "奇经", location: "胸部，前正中线上，平第3肋间", effect: "宽胸止咳，降逆止呕", method: "平刺", depth: "0.3-0.5寸" },
  { id: "RN19", name: "紫宫", pinyin: "zigong", code: "RN19", position: [0, 1.48, 0.22], meridian: "任脉", category: "奇经", location: "胸部，前正中线上，平第2肋间", effect: "宽胸理气，止咳平喘", method: "平刺", depth: "0.3-0.5寸" },
  { id: "RN20", name: "华盖", pinyin: "huagai", code: "RN20", position: [0, 1.54, 0.21], meridian: "任脉", category: "奇经", location: "胸部，前正中线上，平第1肋间", effect: "宽胸利肺，止咳平喘", method: "平刺", depth: "0.3-0.5寸" },
  { id: "RN21", name: "璇玑", pinyin: "xuanji", code: "RN21", position: [0, 1.60, 0.20], meridian: "任脉", category: "奇经", location: "胸部，前正中线上，天突下1寸", effect: "宽胸利肺，止咳平喘", method: "平刺", depth: "0.3-0.5寸" },
  { id: "RN22", name: "天突", pinyin: "tiantu", code: "RN22", position: [0, 1.68, 0.18], meridian: "任脉", category: "奇经", location: "颈部，前正中线上，胸骨上窝中央", effect: "宣肺化痰，降逆止呕，利咽开音", method: "先直刺", depth: "0.2-0.3寸后向下沿胸骨柄后缘刺入0.5-1寸" },
  { id: "RN23", name: "廉泉", pinyin: "lianquan", code: "RN23", position: [0, 1.78, 0.22], meridian: "任脉", category: "奇经", location: "颈部，前正中线上，喉结上方，舌骨上缘凹陷处", effect: "利咽消肿，清火利窍", method: "斜刺", depth: "0.5-1寸" },
  { id: "RN24", name: "承浆", pinyin: "chengjiang", code: "RN24", position: [0, 1.88, 0.45], meridian: "任脉", category: "奇经", location: "面部，颏唇沟正中凹陷处", effect: "祛风通络，消肿止痛", method: "斜刺", depth: "0.3-0.5寸" },
]

// ==================== 董氏奇穴 (代表性穴位) ====================
export const DONG_EXTRA_POINTS: Acupoint[] = [
  // 一一部位 (手指部)
  { id: "D-11-01", name: "大间", pinyin: "dajian", position: [0.60, 0.54, 0.10], meridian: "董氏奇穴", category: "董氏", location: "食指第一节正中央偏外侧三分", effect: "心脏病，膝盖痛，前头痛，偏头痛", method: "针刺", depth: "2-3分" },
  { id: "D-11-02", name: "小间", pinyin: "xiaojian", position: [0.61, 0.55, 0.10], meridian: "董氏奇穴", category: "董氏", location: "食指第一节正中央偏内侧三分", effect: "支气管炎，吐黄痰，胸部发闷，心跳", method: "针刺", depth: "2-3分" },
  { id: "D-11-03", name: "浮间", pinyin: "fujian", position: [0.59, 0.56, 0.10], meridian: "董氏奇穴", category: "董氏", location: "食指第二节正中央偏外侧三分", effect: "疝气，尿道炎，小便出血，淋病", method: "针刺", depth: "2-3分" },
  { id: "D-11-04", name: "外间", pinyin: "waijian", position: [0.58, 0.57, 0.10], meridian: "董氏奇穴", category: "董氏", location: "食指第二节正中央", effect: "疝气，尿道炎，牙痛，皮肤病", method: "针刺", depth: "2-3分" },
  { id: "D-11-05", name: "中间", pinyin: "zhongjian", position: [0.57, 0.58, 0.10], meridian: "董氏奇穴", category: "董氏", location: "食指第二节正中央偏内侧三分", effect: "心悸，头晕，眼花，眼皮跳", method: "针刺", depth: "2-3分" },

  // 一二部位 (手掌部)
  { id: "D-12-01", name: "木火", pinyin: "muhuo", position: [0.58, 0.60, 0.08], meridian: "董氏奇穴", category: "董氏", location: "手掌面，食指掌骨与中指掌骨之间", effect: "心悸，头晕，眼花，胸闷，肝火旺", method: "针刺", depth: "3-5分" },
  { id: "D-12-02", name: "重子", pinyin: "zhongzi", position: [0.56, 0.62, 0.08], meridian: "董氏奇穴", category: "董氏", location: "手背面，虎口下一寸", effect: "背痛，肺炎，感冒，咳嗽，气喘", method: "针刺", depth: "3-5分" },
  { id: "D-12-03", name: "重仙", pinyin: "zhongxian", position: [0.55, 0.63, 0.08], meridian: "董氏奇穴", category: "董氏", location: "手背面，虎口下一寸五分", effect: "背痛，肺炎，感冒，咳嗽，气喘", method: "针刺", depth: "3-5分" },

  // 二二部位 (小臂部)
  { id: "D-22-01", name: "灵骨", pinyin: "linggu", position: [0.56, 0.62, 0.05], meridian: "董氏奇穴", category: "董氏", location: "手背面，拇指与食指叉骨间，第一掌骨与第二掌骨接合处", effect: "肺气肿，坐骨神经痛，腰痛，脚痛，半面神经麻痹，半身不遂，骨骼胀大，妇女经脉不调，经闭，难产，耳鸣，偏头痛", method: "针刺", depth: "5分-1.5寸" },
  { id: "D-22-02", name: "大白", pinyin: "dabai", position: [0.57, 0.60, 0.04], meridian: "董氏奇穴", category: "董氏", location: "手背面，大指与食指叉口之中央", effect: "小儿气喘，发高烧，肺炎", method: "针刺", depth: "3-5分" },
  { id: "D-22-03", name: "中白", pinyin: "zhongbai", position: [0.52, 0.65, 0.02], meridian: "董氏奇穴", category: "董氏", location: "手背面，小指掌骨与无名指掌骨之间，距指骨与掌骨接合处5分", effect: "肾脏炎，腰痛，背痛，头晕，眼散光，疲劳，四肢浮肿，坐骨神经痛", method: "针刺", depth: "3-5分" },
  { id: "D-22-04", name: "下白", pinyin: "xiabai", position: [0.51, 0.68, 0.02], meridian: "董氏奇穴", category: "董氏", location: "手背面，小指掌骨与无名指掌骨之间，距指骨与掌骨接合处1.5寸", effect: "肝炎，眼痛，坐骨神经痛", method: "针刺", depth: "3-5分" },

  // 三三部位 (上臂部)
  { id: "D-33-01", name: "其门", pinyin: "qimen", position: [0.48, 1.05, 0.03], meridian: "董氏奇穴", category: "董氏", location: "前臂桡侧，阳池穴上3寸", effect: "妇科经痛，子宫炎", method: "针刺", depth: "3-5分" },
  { id: "D-33-02", name: "其角", pinyin: "qijiao", position: [0.48, 1.08, 0.03], meridian: "董氏奇穴", category: "董氏", location: "前臂桡侧，其门穴上2寸", effect: "同其门", method: "针刺", depth: "3-5分" },
  { id: "D-33-03", name: "其正", pinyin: "qizheng", position: [0.48, 1.11, 0.03], meridian: "董氏奇穴", category: "董氏", location: "前臂桡侧，其角穴上2寸", effect: "同其门", method: "针刺", depth: "3-5分" },

  // 四四部位 (大腿部)
  { id: "D-44-01", name: "驷马上", pinyin: "simashang", position: [0.18, 0.50, 0.12], meridian: "董氏奇穴", category: "董氏", location: "大腿外侧，膝上12寸", effect: "肺病，肋膜炎，腮腺炎，乳腺炎，乳瘤，肝病，半身不遂", method: "针刺", depth: "1-1.5寸" },
  { id: "D-44-02", name: "驷马中", pinyin: "simazhong", position: [0.18, 0.45, 0.12], meridian: "董氏奇穴", category: "董氏", location: "大腿外侧，驷马上穴下2寸", effect: "同驷马上", method: "针刺", depth: "1-1.5寸" },
  { id: "D-44-03", name: "驷马下", pinyin: "simaxia", position: [0.18, 0.40, 0.12], meridian: "董氏奇穴", category: "董氏", location: "大腿外侧，驷马中穴下2寸", effect: "同驷马上", method: "针刺", depth: "1-1.5寸" },

  // 五五部位 (小腿部)
  { id: "D-55-01", name: "足三里", pinyin: "zusanli", position: [0.20, 0.02, 0.12], meridian: "董氏奇穴", category: "董氏", location: "小腿前外侧，外膝眼下3寸", effect: "肠胃病，腹胀，腹痛，腹泻，消化不良", method: "针刺", depth: "1-2寸" },
  { id: "D-55-02", name: "足千金", pinyin: "zuqianjin", position: [0.22, -0.08, 0.12], meridian: "董氏奇穴", category: "董氏", location: "小腿前外侧，足三里下4寸", effect: "喉痛，急性扁桃体炎", method: "针刺", depth: "5分-1寸" },
  { id: "D-55-03", name: "足五金", pinyin: "zuwujin", position: [0.22, -0.12, 0.12], meridian: "董氏奇穴", category: "董氏", location: "小腿前外侧，足千金下2寸", effect: "同足千金", method: "针刺", depth: "5分-1寸" },

  // 七七部位 (足部)
  { id: "D-77-01", name: "木斗", pinyin: "mudou", position: [0.12, -0.65, 0.10], meridian: "董氏奇穴", category: "董氏", location: "足背面，第一跖骨与第二跖骨之间", effect: "肝病，心闷，头晕，眼花", method: "针刺", depth: "3-5分" },
  { id: "D-77-02", name: "木留", pinyin: "muliu", position: [0.13, -0.62, 0.10], meridian: "董氏奇穴", category: "董氏", location: "足背面，木斗穴上5分", effect: "同木斗", method: "针刺", depth: "3-5分" },
  { id: "D-77-03", name: "火硬", pinyin: "huoying", position: [0.14, -0.63, 0.12], meridian: "董氏奇穴", category: "董氏", location: "足背面，第二跖骨与第三跖骨之间", effect: "骨骼胀大，腹胀，胃酸过多", method: "针刺", depth: "3-5分" },
  { id: "D-77-04", name: "火主", pinyin: "huozhu", position: [0.15, -0.60, 0.12], meridian: "董氏奇穴", category: "董氏", location: "足背面，火硬穴上5分", effect: "同火硬", method: "针刺", depth: "3-5分" },

  // 八八部位 (头面部)
  { id: "D-88-01", name: "正会", pinyin: "zhenghui", position: [0, 2.35, 0.08], meridian: "董氏奇穴", category: "董氏", location: "头顶部，两耳尖向上连线中点，即百会穴位置", effect: "四肢麻痹，癫痫，中风，半身不遂", method: "针刺", depth: "2-3分" },
  { id: "D-88-02", name: "前会", pinyin: "qianhui", position: [0, 2.32, 0.12], meridian: "董氏奇穴", category: "董氏", location: "头顶部，正会穴前8分", effect: "头痛，眩晕，神经衰弱", method: "针刺", depth: "2-3分" },
  { id: "D-88-03", name: "后会", pinyin: "houhui", position: [0, 2.32, 0.02], meridian: "董氏奇穴", category: "董氏", location: "头顶部，正会穴后8分", effect: "同前会", method: "针刺", depth: "2-3分" },
  { id: "D-88-04", name: "州昆", pinyin: "zhoukun", position: [0.18, 2.25, 0.15], meridian: "董氏奇穴", category: "董氏", location: "头侧部，阳白穴向上1寸", effect: "眼痛，眉棱骨痛", method: "针刺", depth: "2-3分" },
  { id: "D-88-05", name: "州仑", pinyin: "zhoulun", position: [0.20, 2.28, 0.12], meridian: "董氏奇穴", category: "董氏", location: "头侧部，州昆穴向上1寸", effect: "同州昆", method: "针刺", depth: "2-3分" },
  { id: "D-88-06", name: "州圆", pinyin: "zhouyuan", position: [0.22, 2.31, 0.10], meridian: "董氏奇穴", category: "董氏", location: "头侧部，州仑穴向上1寸", effect: "同州昆", method: "针刺", depth: "2-3分" },

  // 九九部位 (耳部)
  { id: "D-99-01", name: "耳三穴", pinyin: "ersanxue", position: [0.30, 2.02, 0.15], meridian: "董氏奇穴", category: "董氏", location: "耳尖直上入发际2分处", effect: "眼红肿痛，沙眼，目翳", method: "针刺", depth: "1-2分" },
  { id: "D-99-02", name: "耳背穴", pinyin: "erbeibei", position: [0.32, 2.00, 0.12], meridian: "董氏奇穴", category: "董氏", location: "耳背上方之静脉血管", effect: "眼睛发红，眼球充血，沙眼", method: "点刺出血", depth: "点刺" },
]

// ==================== 经外奇穴 (常用) ====================
export const EXTRA_POINTS: Acupoint[] = [
  { id: "EX-HN1", name: "四神聪", pinyin: "sishencong", position: [0, 2.35, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "头顶部，百会前后左右各1寸，共4穴", effect: "镇静安神，清头明目，醒脑开窍", method: "平刺", depth: "0.3-0.5寸" },
  { id: "EX-HN3", name: "印堂", pinyin: "yintang", position: [0, 2.10, 0.45], meridian: "经外奇穴", category: "经外奇穴", location: "额部，两眉头连线中点", effect: "清头明目，通鼻开窍", method: "平刺", depth: "0.3-0.5寸" },
  { id: "EX-HN4", name: "鱼腰", pinyin: "yuyao", position: [0.12, 2.08, 0.42], meridian: "经外奇穴", category: "经外奇穴", location: "额部，瞳孔直上，眉毛中", effect: "镇惊安神，清利头目", method: "平刺", depth: "0.3-0.5寸" },
  { id: "EX-HN5", name: "太阳", pinyin: "taiyang", position: [0.35, 2.02, 0.25], meridian: "经外奇穴", category: "经外奇穴", location: "颞部，眉梢与目外眦之间向后约1横指凹陷处", effect: "清热止痛，清肝明目", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "EX-HN6", name: "耳尖", pinyin: "erjian", position: [0.32, 2.10, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "耳郭折叠时，耳廓上方尖端处", effect: "清热祛风，解痉止痛", method: "点刺出血", depth: "点刺" },
  { id: "EX-HN7", name: "球后", pinyin: "qiuhou", position: [0.12, 2.00, 0.40], meridian: "经外奇穴", category: "经外奇穴", location: "眶下缘外1/4与内3/4交点处", effect: "清热明目", method: "直刺", depth: "0.5-1寸", caution: "勿伤眼球" },
  { id: "EX-HN8", name: "上迎香", pinyin: "shangyingxiang", position: [0.10, 2.02, 0.42], meridian: "经外奇穴", category: "经外奇穴", location: "鼻翼软骨与鼻甲交界处", effect: "通利鼻窍，清热散邪", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "EX-HN9", name: "内迎香", pinyin: "neiyingxiang", position: [0.08, 2.00, 0.40], meridian: "经外奇穴", category: "经外奇穴", location: "鼻腔内，下鼻甲前端", effect: "通利鼻窍，清热解毒", method: "点刺出血", depth: "点刺" },
  { id: "EX-HN10", name: "聚泉", pinyin: "juquan", position: [0, 1.85, 0.38], meridian: "经外奇穴", category: "经外奇穴", location: "口腔内，舌系带正中，舌下肉阜上", effect: "清热除烦，生津止渴", method: "点刺", depth: "点刺" },
  { id: "EX-HN11", name: "海泉", pinyin: "haiquan", position: [0, 1.82, 0.35], meridian: "经外奇穴", category: "经外奇穴", location: "口腔内，舌下系带中点", effect: "清热生津，消肿止痛", method: "点刺", depth: "点刺" },
  { id: "EX-HN12", name: "金津", pinyin: "jinjin", position: [-0.02, 1.82, 0.36], meridian: "经外奇穴", category: "经外奇穴", location: "口腔内，舌系带两侧静脉上，左为金津", effect: "清热除烦，消肿止痛", method: "点刺出血", depth: "点刺" },
  { id: "EX-HN13", name: "玉液", pinyin: "yuye", position: [0.02, 1.82, 0.36], meridian: "经外奇穴", category: "经外奇穴", location: "口腔内，舌系带两侧静脉上，右为玉液", effect: "清热除烦，消肿止痛", method: "点刺出血", depth: "点刺" },
  { id: "EX-HN14", name: "翳明", pinyin: "yiming", position: [0.22, 1.98, -0.05], meridian: "经外奇穴", category: "经外奇穴", location: "项部，翳风穴后1寸", effect: "明目聪耳，安神定志", method: "直刺", depth: "0.5-1寸" },
  { id: "EX-HN15", name: "颈百劳", pinyin: "jingbailao", position: [0.08, 1.78, -0.15], meridian: "经外奇穴", category: "经外奇穴", location: "项部，大椎穴直上2寸，后正中线旁开1寸", effect: "补虚益损，止咳平喘", method: "直刺", depth: "0.5-1寸" },
  { id: "EX-B1", name: "定喘", pinyin: "dingchuan", position: [0.08, 1.75, -0.18], meridian: "经外奇穴", category: "经外奇穴", location: "背部，第7颈椎棘突下，旁开0.5寸", effect: "止咳平喘，通宣理肺", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-B2", name: "夹脊", pinyin: "jiaji", position: [0.06, 1.55, -0.20], meridian: "经外奇穴", category: "经外奇穴", location: "背腰部，第1胸椎至第5腰椎棘突下两侧，后正中线旁开0.5寸，每侧17穴，共34穴", effect: "调理脏腑，疏通经络", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-B3", name: "胃脘下俞", pinyin: "weiwanxiashu", position: [0.06, 1.25, -0.22], meridian: "经外奇穴", category: "经外奇穴", location: "背部，第8胸椎棘突下，旁开1.5寸", effect: "健脾和胃，理气止痛", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-B4", name: "痞根", pinyin: "pigen", position: [0.10, 1.15, -0.22], meridian: "经外奇穴", category: "经外奇穴", location: "腰部，第1腰椎棘突下，旁开3.5寸", effect: "健脾化痰，消痞散结", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-B5", name: "下极俞", pinyin: "xiajishu", position: [0, 0.78, -0.18], meridian: "经外奇穴", category: "经外奇穴", location: "腰部，第3腰椎棘突下", effect: "强腰补肾，通经止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "EX-B6", name: "腰宜", pinyin: "yaoyi", position: [0.08, 0.88, -0.18], meridian: "经外奇穴", category: "经外奇穴", location: "腰部，第4腰椎棘突下，旁开3寸", effect: "调经止带，补肾壮腰", method: "直刺", depth: "0.8-1.2寸" },
  { id: "EX-B7", name: "腰眼", pinyin: "yaoyan", position: [0.10, 0.90, -0.18], meridian: "经外奇穴", category: "经外奇穴", location: "腰部，第4腰椎棘突下，旁开3.5寸凹陷处", effect: "强腰健肾，活血通络", method: "直刺", depth: "0.8-1.2寸" },
  { id: "EX-B8", name: "十七椎", pinyin: "shiqizhui", position: [0, 0.65, -0.15], meridian: "经外奇穴", category: "经外奇穴", location: "腰部，第5腰椎棘突下", effect: "调经止带，强腰健肾", method: "直刺", depth: "0.5-1寸" },
  { id: "EX-B9", name: "腰奇", pinyin: "yaoqi", position: [0, 0.55, -0.12], meridian: "经外奇穴", category: "经外奇穴", location: "骶部，尾骨端直上2寸", effect: "通调督脉，镇痉止痛", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-UE1", name: "肩前", pinyin: "jianqian", position: [0.38, 1.62, 0.08], meridian: "经外奇穴", category: "经外奇穴", location: "肩部，腋前纹头与肩髃连线中点", effect: "通利关节，疏经止痛", method: "直刺", depth: "0.8-1.5寸" },
  { id: "EX-UE2", name: "二白", pinyin: "erbai", position: [0.50, 0.95, 0.06], meridian: "经外奇穴", category: "经外奇穴", location: "前臂掌侧，腕横纹上4寸，桡侧腕屈肌腱两侧，每侧1穴", effect: "清利肠道，止血止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "EX-UE3", name: "中泉", pinyin: "zhongquan", position: [0.52, 0.72, 0.04], meridian: "经外奇穴", category: "经外奇穴", location: "腕背横纹中，指总伸肌腱桡侧凹陷处", effect: "理气宽胸，和胃降逆", method: "直刺", depth: "0.3-0.5寸" },
  { id: "EX-UE4", name: "中魁", pinyin: "zhongkui", position: [0.62, 0.56, 0.08], meridian: "经外奇穴", category: "经外奇穴", location: "中指背侧，近侧指间关节中点", effect: "和胃降逆，消积导滞", method: "灸法为主", depth: "艾灸" },
  { id: "EX-UE5", name: "大骨空", pinyin: "dagukong", position: [0.60, 0.55, 0.09], meridian: "经外奇穴", category: "经外奇穴", location: "拇指背侧，指间关节中点", effect: "明目退翳，安神镇惊", method: "灸法为主", depth: "艾灸" },
  { id: "EX-UE6", name: "小骨空", pinyin: "xiaogukong", position: [0.55, 0.54, 0.09], meridian: "经外奇穴", category: "经外奇穴", location: "小指背侧，近侧指间关节中点", effect: "明目退翳，利咽止痛", method: "灸法为主", depth: "艾灸" },
  { id: "EX-UE7", name: "腰痛点", pinyin: "yaotongdian", position: [0.56, 0.62, 0.06], meridian: "经外奇穴", category: "经外奇穴", location: "手背，第2、3掌骨及第4、5掌骨之间，腕横纹与掌指关节中点处，每侧2穴", effect: "活血止痛，舒筋活络", method: "直刺", depth: "0.5-0.8寸" },
  { id: "EX-UE8", name: "外劳宫", pinyin: "wailaogong", position: [0.54, 0.58, 0.04], meridian: "经外奇穴", category: "经外奇穴", location: "手背，第2、3掌骨间，掌指关节后0.5寸", effect: "活血止痛，通经活络", method: "直刺", depth: "0.5-0.8寸" },
  { id: "EX-UE9", name: "八邪", pinyin: "baxie", position: [0.58, 0.55, 0.06], meridian: "经外奇穴", category: "经外奇穴", location: "手背，各指缝中，每侧4穴，共8穴", effect: "祛风通络，清热解毒", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "EX-UE10", name: "四缝", pinyin: "sifeng", position: [0.60, 0.56, 0.08], meridian: "经外奇穴", category: "经外奇穴", location: "第2-5指掌侧，近侧指间关节横纹中央，每侧4穴", effect: "消食导滞，祛痰化积", method: "点刺", depth: "点刺出血或黄白透明液" },
  { id: "EX-UE11", name: "十宣", pinyin: "shixuan", position: [0.62, 0.52, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "手十指尖端，距指甲游离缘0.1寸，共10穴", effect: "清热开窍，醒脑安神", method: "点刺", depth: "点刺出血" },
  { id: "EX-LE1", name: "髋骨", pinyin: "kuangu", position: [0.18, 0.28, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "大腿前面，梁丘上1.5寸", effect: "通经活络，祛风除湿", method: "直刺", depth: "1-2寸" },
  { id: "EX-LE2", name: "鹤顶", pinyin: "heding", position: [0.17, 0.18, 0.12], meridian: "经外奇穴", category: "经外奇穴", location: "膝上部，髌底中点上方凹陷处", effect: "通利关节，祛风除湿", method: "直刺", depth: "0.5-1寸" },
  { id: "EX-LE3", name: "百虫窝", pinyin: "baichongwo", position: [0.13, 0.22, 0.06], meridian: "经外奇穴", category: "经外奇穴", location: "大腿内侧，血海上1寸", effect: "祛风活血，驱虫止痒", method: "直刺", depth: "1-1.5寸" },
  { id: "EX-LE4", name: "内膝眼", pinyin: "neixiyan", position: [0.15, 0.15, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "膝部，髌韧带内侧凹陷中", effect: "活血通络，疏利关节", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-LE5", name: "膝眼", pinyin: "xiyan", position: [0.19, 0.15, 0.12], meridian: "经外奇穴", category: "经外奇穴", location: "膝部，髌韧带两侧凹陷处，共2穴", effect: "活血通络，疏利关节", method: "斜刺", depth: "0.5-1寸" },
  { id: "EX-LE6", name: "胆囊", pinyin: "dannang", position: [0.22, 0.02, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "小腿外侧，阳陵泉下2寸", effect: "利胆通腑，清热利湿", method: "直刺", depth: "1-2寸" },
  { id: "EX-LE7", name: "阑尾", pinyin: "lanwei", position: [0.20, -0.02, 0.12], meridian: "经外奇穴", category: "经外奇穴", location: "小腿前侧，足三里下2寸", effect: "清热解毒，通腑泄热", method: "直刺", depth: "1-2寸" },
  { id: "EX-LE8", name: "内踝尖", pinyin: "neihuaijian", position: [0.08, -0.50, 0.02], meridian: "经外奇穴", category: "经外奇穴", location: "足内踝尖端", effect: "活血通络，消肿止痛", method: "艾灸", depth: "艾灸为主" },
  { id: "EX-LE9", name: "外踝尖", pinyin: "waihuaijian", position: [0.18, -0.50, 0.02], meridian: "经外奇穴", category: "经外奇穴", location: "足外踝尖端", effect: "活血通络，消肿止痛", method: "艾灸", depth: "艾灸为主" },
  { id: "EX-LE10", name: "八风", pinyin: "bafeng", position: [0.12, -0.66, 0.12], meridian: "经外奇穴", category: "经外奇穴", location: "足背，各趾缝间凹陷处，每侧4穴，共8穴", effect: "祛风通络，清热解毒", method: "斜刺", depth: "0.3-0.5寸" },
  { id: "EX-LE11", name: "独阴", pinyin: "duyin", position: [0.08, -0.68, 0.08], meridian: "经外奇穴", category: "经外奇穴", location: "足底，第2趾跖侧远侧指间关节横纹中点", effect: "理血调经，通利下焦", method: "直刺", depth: "0.1-0.2寸" },
  { id: "EX-LE12", name: "气端", pinyin: "qiduan", position: [0.10, -0.70, 0.10], meridian: "经外奇穴", category: "经外奇穴", location: "足十趾尖端，距趾甲游离缘0.1寸，共10穴", effect: "通络开窍，消肿止痛", method: "点刺", depth: "点刺出血" },
]

// ==================== 合并所有穴位 ====================
export const ALL_ACUPOINTS: Acupoint[] = [
  ...LUNG_MERIDIAN,
  ...LARGE_INTESTINE_MERIDIAN,
  ...STOMACH_MERIDIAN,
  ...SPLEEN_MERIDIAN,
  ...HEART_MERIDIAN,
  ...SMALL_INTESTINE_MERIDIAN,
  ...DU_MERIDIAN,
  ...REN_MERIDIAN,
  ...DONG_EXTRA_POINTS,
  ...EXTRA_POINTS,
]

// 获取所有经络列表
export const MERIDIAN_LIST = [
  // 十二正经
  { id: "lung", name: "手太阴肺经", short: "肺经", count: LUNG_MERIDIAN.length },
  { id: "large_intestine", name: "手阳明大肠经", short: "大肠经", count: LARGE_INTESTINE_MERIDIAN.length },
  { id: "stomach", name: "足阳明胃经", short: "胃经", count: STOMACH_MERIDIAN.length },
  { id: "spleen", name: "足太阴脾经", short: "脾经", count: SPLEEN_MERIDIAN.length },
  { id: "heart", name: "手少阴心经", short: "心经", count: HEART_MERIDIAN.length },
  { id: "small_intestine", name: "手太阳小肠经", short: "小肠经", count: SMALL_INTESTINE_MERIDIAN.length },
  // 奇经八脉
  { id: "du", name: "督脉", short: "督脉", count: DU_MERIDIAN.length },
  { id: "ren", name: "任脉", short: "任脉", count: REN_MERIDIAN.length },
  // 董氏奇穴
  { id: "dong", name: "董氏奇穴", short: "董氏", count: DONG_EXTRA_POINTS.length },
  // 经外奇穴
  { id: "extra", name: "经外奇穴", short: "经外", count: EXTRA_POINTS.length },
]

// 按经络获取穴位
export function getAcupointsByMeridian(meridianName: string): Acupoint[] {
  return ALL_ACUPOINTS.filter(p => p.meridian === meridianName)
}

// 按分类获取穴位
export function getAcupointsByCategory(category: Acupoint["category"]): Acupoint[] {
  return ALL_ACUPOINTS.filter(p => p.category === category)
}

// 搜索穴位
export function searchAcupoints(keyword: string): Acupoint[] {
  const lowerKeyword = keyword.toLowerCase()
  return ALL_ACUPOINTS.filter(p => 
    p.name.includes(keyword) ||
    p.pinyin.includes(lowerKeyword) ||
    p.meridian.includes(keyword) ||
    p.effect.includes(keyword) ||
    p.location.includes(keyword)
  )
}

// 获取穴位统计
export function getAcupointStats() {
  return {
    total: ALL_ACUPOINTS.length,
    zhengJing: ALL_ACUPOINTS.filter(p => p.category === "正经").length,
    qiJing: ALL_ACUPOINTS.filter(p => p.category === "奇经").length,
    dongShi: ALL_ACUPOINTS.filter(p => p.category === "董氏").length,
    extra: ALL_ACUPOINTS.filter(p => p.category === "经外奇穴").length,
  }
}
