// 十四经穴完整数据库 - 基于国家标准《腧穴名称与定位》(GB/T 12346-2006) 和《针灸大成》
// 共361个穴位：十二正经309穴 + 任脉24穴 + 督脉28穴
// 坐标系：Y轴向上，X轴左右（左负右正），Z轴前后（前正后负）
// 人体高度约1.8单位，中心在原点

export interface AcupointFull {
  id: string          // 如 "LU1"
  name: string        // 如 "中府"
  pinyin: string      // 如 "zhōng fǔ"
  meridian: string    // 经络代码：LU/LI/ST/SP/HT/SI/BL/KI/PC/TE/GB/LR/CV/GV
  system: "fourteen"  // 体系标识
  category: string    // 如 "特定穴：肺募穴" 或 "普通穴"
  locationDesc: string  // 定位描述
  indications: string[] // 主治病症数组
  needling: string    // 针刺方法
  coordinates: [number, number, number]  // 3D坐标 [x, y, z]
}

export const ACUPOINTS_FOURTEEN: AcupointFull[] = [
  // ═══════════════════════════════════════════════════════════
  // 1. 手太阴肺经 (LU) - 11穴 - 左臂内侧前缘
  // ═══════════════════════════════════════════════════════════
  {
    id: "LU1", name: "中府", pinyin: "zhōng fǔ", meridian: "LU", system: "fourteen",
    category: "特定穴：肺募穴；手足太阴之会",
    locationDesc: "在胸前壁外上方，前正中线旁开6寸，平第1肋间隙处",
    indications: ["咳嗽", "气喘", "胸痛", "肩背痛", "肺胀满"],
    needling: "向外斜刺或平刺0.5-0.8寸，不可深刺伤肺脏",
    coordinates: [-0.12, 0.38, 0.08]
  },
  {
    id: "LU2", name: "云门", pinyin: "yún mén", meridian: "LU", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸前壁外上方，前正中线旁开6寸，锁骨下窝凹陷处",
    indications: ["咳嗽", "气喘", "胸痛", "肩背痛"],
    needling: "向外斜刺0.5-0.8寸，不可深刺",
    coordinates: [-0.12, 0.40, 0.08]
  },
  {
    id: "LU3", name: "天府", pinyin: "tiān fǔ", meridian: "LU", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂内侧面，肱二头肌桡侧缘，腋前纹头下3寸处",
    indications: ["气喘", "鼻衄", "瘿气", "上臂内侧痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.30, 0.05]
  },
  {
    id: "LU4", name: "侠白", pinyin: "xiá bái", meridian: "LU", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂内侧面，肱二头肌桡侧缘，腋前纹头下4寸处",
    indications: ["咳嗽", "气喘", "干呕", "上臂内侧痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.21, 0.25, 0.05]
  },
  {
    id: "LU5", name: "尺泽", pinyin: "chǐ zé", meridian: "LU", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在肘横纹中，肱二头肌腱桡侧凹陷处",
    indications: ["咳嗽", "气喘", "咯血", "咽喉肿痛", "肘臂挛痛"],
    needling: "直刺0.8-1.2寸，或点刺出血",
    coordinates: [-0.24, 0.15, 0.04]
  },
  {
    id: "LU6", name: "孔最", pinyin: "kǒng zuì", meridian: "LU", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在前臂掌面桡侧，当尺泽与太渊连线上，腕横纹上7寸处",
    indications: ["咯血", "咳嗽", "气喘", "咽喉肿痛", "肘臂挛痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.23, 0.05, 0.04]
  },
  {
    id: "LU7", name: "列缺", pinyin: "liè quē", meridian: "LU", system: "fourteen",
    category: "特定穴：络穴；八脉交会穴通任脉",
    locationDesc: "在前臂桡侧缘，桡骨茎突上方，腕横纹上1.5寸处",
    indications: ["咳嗽", "气喘", "咽喉肿痛", "头痛", "口眼歪斜", "颈项强痛"],
    needling: "向上斜刺0.3-0.5寸",
    coordinates: [-0.22, -0.05, 0.04]
  },
  {
    id: "LU8", name: "经渠", pinyin: "jīng qú", meridian: "LU", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在前臂掌面桡侧，桡骨茎突与桡动脉之间，腕横纹上1寸处",
    indications: ["咳嗽", "气喘", "胸痛", "咽喉肿痛", "手腕痛"],
    needling: "避开桡动脉，直刺0.3-0.5寸",
    coordinates: [-0.22, -0.10, 0.04]
  },
  {
    id: "LU9", name: "太渊", pinyin: "tài yuān", meridian: "LU", system: "fourteen",
    category: "特定穴：五输穴之输穴；原穴；八会穴之脉会",
    locationDesc: "在腕掌侧横纹桡侧，桡动脉搏动处",
    indications: ["咳嗽", "气喘", "咯血", "胸痛", "腕臂痛", "无脉症"],
    needling: "避开桡动脉，直刺0.3-0.5寸",
    coordinates: [-0.22, -0.13, 0.04]
  },
  {
    id: "LU10", name: "鱼际", pinyin: "yú jì", meridian: "LU", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在手拇指本节后凹陷处，约当第1掌骨中点桡侧，赤白肉际处",
    indications: ["咳嗽", "咯血", "咽喉肿痛", "发热", "失音"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.22, -0.18, 0.05]
  },
  {
    id: "LU11", name: "少商", pinyin: "shào shāng", meridian: "LU", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在手拇指末节桡侧，距指甲角0.1寸处",
    indications: ["咽喉肿痛", "鼻衄", "高热", "昏迷", "癫狂"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.22, -0.25, 0.06]
  },

  // ═══════════════════════════════════════════════════════════
  // 2. 手阳明大肠经 (LI) - 20穴 - 左臂外侧前缘
  // ═══════════════════════════════════════════════════════════
  {
    id: "LI1", name: "商阳", pinyin: "shāng yáng", meridian: "LI", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在手食指末节桡侧，距指甲角0.1寸处",
    indications: ["咽喉肿痛", "牙痛", "耳聋", "热病", "昏迷", "手指麻木"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.22, -0.27, 0.03]
  },
  {
    id: "LI2", name: "二间", pinyin: "èr jiān", meridian: "LI", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "微握拳，在食指本节前，桡侧凹陷处",
    indications: ["咽喉肿痛", "牙痛", "鼻衄", "热病", "食指屈伸不利"],
    needling: "直刺0.2-0.3寸",
    coordinates: [-0.23, -0.24, 0.02]
  },
  {
    id: "LI3", name: "三间", pinyin: "sān jiān", meridian: "LI", system: "fourteen",
    category: "特定穴：五输穴之输穴",
    locationDesc: "微握拳，在食指本节后，桡侧凹陷处",
    indications: ["牙痛", "咽喉肿痛", "腹胀", "肠鸣", "手指拘急"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.24, -0.20, 0.02]
  },
  {
    id: "LI4", name: "合谷", pinyin: "hé gǔ", meridian: "LI", system: "fourteen",
    category: "特定穴：原穴",
    locationDesc: "在手背，第1、2掌骨之间，当第2掌骨桡侧的中点处",
    indications: ["头痛", "牙痛", "目赤肿痛", "咽喉肿痛", "口眼歪斜", "热病", "经闭", "滞产"],
    needling: "直刺0.5-1寸，孕妇禁针",
    coordinates: [-0.25, -0.16, 0.02]
  },
  {
    id: "LI5", name: "阳溪", pinyin: "yáng xī", meridian: "LI", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在腕背横纹桡侧，当拇短伸肌腱与拇长伸肌腱之间的凹陷中",
    indications: ["头痛", "耳鸣", "耳聋", "咽喉肿痛", "手腕痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.25, -0.13, 0.02]
  },
  {
    id: "LI6", name: "偏历", pinyin: "piān lì", meridian: "LI", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "屈肘，在前臂背面桡侧，当阳溪与曲池连线上，腕横纹上3寸处",
    indications: ["鼻衄", "耳鸣", "耳聋", "口眼歪斜", "手臂酸痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.25, -0.05, 0.02]
  },
  {
    id: "LI7", name: "温溜", pinyin: "wēn liū", meridian: "LI", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "屈肘，在前臂背面桡侧，当阳溪与曲池连线上，腕横纹上5寸处",
    indications: ["头痛", "面肿", "咽喉肿痛", "肠鸣腹痛", "肩臂酸痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.25, 0.03, 0.02]
  },
  {
    id: "LI8", name: "下廉", pinyin: "xià lián", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在前臂背面桡侧，当阳溪与曲池连线上，肘横纹下4寸处",
    indications: ["头痛", "眩晕", "腹痛", "肘臂痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.25, 0.08, 0.02]
  },
  {
    id: "LI9", name: "上廉", pinyin: "shàng lián", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在前臂背面桡侧，当阳溪与曲池连线上，肘横纹下3寸处",
    indications: ["头痛", "手臂麻木", "肠鸣腹痛", "半身不遂"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.25, 0.11, 0.02]
  },
  {
    id: "LI10", name: "手三里", pinyin: "shǒu sān lǐ", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在前臂背面桡侧，当阳溪与曲池连线上，肘横纹下2寸处",
    indications: ["牙痛", "颊肿", "上肢不遂", "腹痛", "腹泻"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.25, 0.13, 0.02]
  },
  {
    id: "LI11", name: "曲池", pinyin: "qū chí", meridian: "LI", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在肘横纹外侧端，屈肘，当尺泽与肱骨外上髁连线中点处",
    indications: ["热病", "咽喉肿痛", "牙痛", "目赤痛", "手臂肿痛", "高血压", "荨麻疹"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.25, 0.15, 0.02]
  },
  {
    id: "LI12", name: "肘髎", pinyin: "zhǒu liáo", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂外侧，屈肘，曲池上方1寸，当肱骨边缘处",
    indications: ["肘臂酸痛", "麻木", "拘急"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.24, 0.17, 0.01]
  },
  {
    id: "LI13", name: "手五里", pinyin: "shǒu wǔ lǐ", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂外侧，当曲池与肩髃连线上，曲池上3寸处",
    indications: ["肘臂挛痛", "瘰疬", "嗜睡"],
    needling: "直刺0.5-1寸，避开动脉",
    coordinates: [-0.23, 0.22, 0.01]
  },
  {
    id: "LI14", name: "臂臑", pinyin: "bì nào", meridian: "LI", system: "fourteen",
    category: "普通穴；手足太阳阳维之会",
    locationDesc: "在臂外侧，当曲池与肩髃连线上，曲池上7寸处，三角肌止点处",
    indications: ["肩臂痛", "颈项拘急", "瘰疬", "目疾"],
    needling: "直刺0.5-1寸，或斜刺1-1.5寸",
    coordinates: [-0.22, 0.30, 0.01]
  },
  {
    id: "LI15", name: "肩髃", pinyin: "jiān yú", meridian: "LI", system: "fourteen",
    category: "特定穴；手阳明阳跷之会",
    locationDesc: "在肩部，三角肌上，肩峰前下方，当肩峰与肱骨大结节之间凹陷处",
    indications: ["肩臂疼痛", "上肢不遂", "肩周炎", "瘾疹"],
    needling: "直刺或向下斜刺0.8-1.5寸",
    coordinates: [-0.22, 0.40, 0.01]
  },
  {
    id: "LI16", name: "巨骨", pinyin: "jù gǔ", meridian: "LI", system: "fourteen",
    category: "普通穴；手阳明阳跷之会",
    locationDesc: "在肩上部，当锁骨肩峰端与肩胛冈之间凹陷处",
    indications: ["肩臂疼痛", "肩背痛", "瘰疬", "瘿气"],
    needling: "直刺0.5-0.8寸，不可深刺",
    coordinates: [-0.18, 0.43, -0.01]
  },
  {
    id: "LI17", name: "天鼎", pinyin: "tiān dǐng", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈外侧部，胸锁乳突肌后缘，当扶突与缺盆连线之中点处",
    indications: ["咽喉肿痛", "暴喑", "气梗", "瘰疬", "瘿气"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.08, 0.48, 0.03]
  },
  {
    id: "LI18", name: "扶突", pinyin: "fú tū", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈外侧部，结喉旁，当胸锁乳突肌的前后缘之间处",
    indications: ["咽喉肿痛", "暴喑", "咳嗽", "气喘", "瘿气", "瘰疬"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.06, 0.50, 0.04]
  },
  {
    id: "LI19", name: "口禾髎", pinyin: "kǒu hé liáo", meridian: "LI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上唇部，鼻孔外缘直下，平水沟穴处",
    indications: ["鼻塞", "鼻衄", "口歪", "口噤"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.03, 0.66, 0.08]
  },
  {
    id: "LI20", name: "迎香", pinyin: "yíng xiāng", meridian: "LI", system: "fourteen",
    category: "普通穴；手足阳明之会",
    locationDesc: "在鼻翼外缘中点旁，当鼻唇沟中",
    indications: ["鼻塞", "鼻衄", "口歪", "面痒", "胆道蛔虫症"],
    needling: "斜刺或平刺0.3-0.5寸",
    coordinates: [-0.04, 0.68, 0.08]
  },
  // ═══════════════════════════════════════════════════════════
  // 3. 足阳明胃经 (ST) - 45穴 - 右侧前缘
  // ═══════════════════════════════════════════════════════════
  {
    id: "ST1", name: "承泣", pinyin: "chéng qì", meridian: "ST", system: "fourteen",
    category: "普通穴；足阳明阳跷任脉之会",
    locationDesc: "在面部，瞳孔直下，当眼球与眶下缘之间",
    indications: ["目赤肿痛", "流泪", "夜盲", "眼睑瞤动", "口眼歪斜"],
    needling: "以左手拇指向上轻推眼球，紧贴眶缘缓慢直刺0.5-1寸，不提插",
    coordinates: [0.03, 0.72, 0.08]
  },
  {
    id: "ST2", name: "四白", pinyin: "sì bái", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在面部，瞳孔直下，眶下孔凹陷处",
    indications: ["目赤痛", "目翳", "眼睑瞤动", "口眼歪斜", "头痛眩晕"],
    needling: "直刺0.2-0.3寸，或斜刺0.5-0.8寸",
    coordinates: [0.03, 0.69, 0.08]
  },
  {
    id: "ST3", name: "巨髎", pinyin: "jù liáo", meridian: "ST", system: "fourteen",
    category: "普通穴；跷脉足阳明之会",
    locationDesc: "在面部，瞳孔直下，平鼻翼下缘处，当鼻唇沟外侧",
    indications: ["口眼歪斜", "眼睑瞤动", "鼻衄", "牙痛", "唇颊肿"],
    needling: "斜刺或平刺0.3-0.5寸",
    coordinates: [0.04, 0.66, 0.08]
  },
  {
    id: "ST4", name: "地仓", pinyin: "dì cāng", meridian: "ST", system: "fourteen",
    category: "普通穴；跷脉手足阳明之会",
    locationDesc: "在面部，口角外侧，上直瞳孔处",
    indications: ["口眼歪斜", "流涎", "眼睑瞤动", "唇缓不收"],
    needling: "斜刺或平刺0.5-0.8寸",
    coordinates: [0.04, 0.62, 0.08]
  },
  {
    id: "ST5", name: "大迎", pinyin: "dà yíng", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在下颌角前方，咬肌附着部前缘，当面动脉搏动处",
    indications: ["牙痛", "颊肿", "口噤", "口歪", "面肿"],
    needling: "避开动脉，斜刺0.3-0.5寸",
    coordinates: [0.05, 0.60, 0.07]
  },
  {
    id: "ST6", name: "颊车", pinyin: "jiá chē", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在面颊部，下颌角前上方约一横指，咀嚼时咬肌隆起处",
    indications: ["牙痛", "颊肿", "口眼歪斜", "口噤不语", "颈项强痛"],
    needling: "直刺0.3-0.5寸，或向地仓方向斜刺1-1.5寸",
    coordinates: [0.07, 0.58, 0.05]
  },
  {
    id: "ST7", name: "下关", pinyin: "xià guān", meridian: "ST", system: "fourteen",
    category: "普通穴；足阳明少阳之会",
    locationDesc: "在面部耳前方，当颧弓下缘中央与下颌切迹之间凹陷处",
    indications: ["牙痛", "面疼", "口眼歪斜", "耳聋", "耳鸣", "下颌关节炎"],
    needling: "直刺0.5-1寸",
    coordinates: [0.08, 0.62, 0.04]
  },
  {
    id: "ST8", name: "头维", pinyin: "tóu wéi", meridian: "ST", system: "fourteen",
    category: "普通穴；足少阳阳明之会",
    locationDesc: "在头侧部，当额角发际上0.5寸，头正中线旁开4.5寸",
    indications: ["头痛", "眩晕", "目痛", "眼睑瞤动", "迎风流泪"],
    needling: "平刺0.5-1寸",
    coordinates: [0.10, 0.72, 0.02]
  },
  {
    id: "ST9", name: "人迎", pinyin: "rén yíng", meridian: "ST", system: "fourteen",
    category: "普通穴；足阳明少阳之会",
    locationDesc: "在颈部，结喉旁，当胸锁乳突肌的前缘，颈总动脉搏动处",
    indications: ["咽喉肿痛", "气闷", "高血压", "头痛", "瘿气"],
    needling: "避开颈总动脉，直刺0.3-0.5寸",
    coordinates: [0.05, 0.50, 0.05]
  },
  {
    id: "ST10", name: "水突", pinyin: "shuǐ tū", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈部，胸锁乳突肌的前缘，当人迎与气舍连线的中点",
    indications: ["咽喉肿痛", "咳嗽", "气喘", "瘿气", "瘰疬"],
    needling: "直刺0.3-0.5寸",
    coordinates: [0.05, 0.48, 0.04]
  },
  {
    id: "ST11", name: "气舍", pinyin: "qì shè", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈部，当锁骨内侧端的上缘，胸锁乳突肌的胸骨头与锁骨头之间",
    indications: ["咽喉肿痛", "气喘", "呃逆", "瘿气", "瘰疬", "颈项强痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [0.06, 0.46, 0.03]
  },
  {
    id: "ST12", name: "缺盆", pinyin: "quē pén", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在锁骨上窝中央，前正中线旁开4寸",
    indications: ["咳嗽", "气喘", "咽喉肿痛", "缺盆中痛", "瘰疬"],
    needling: "直刺0.3-0.5寸，不可深刺",
    coordinates: [0.08, 0.42, 0.06]
  },
  {
    id: "ST13", name: "气户", pinyin: "qì hù", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当锁骨中点下缘，前正中线旁开4寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "呃逆", "胸背痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [0.08, 0.38, 0.08]
  },
  {
    id: "ST14", name: "库房", pinyin: "kù fáng", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第1肋间隙，前正中线旁开4寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "咳吐脓血"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [0.08, 0.34, 0.08]
  },
  {
    id: "ST15", name: "屋翳", pinyin: "wū yì", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第2肋间隙，前正中线旁开4寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "乳痈", "咳吐脓血"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [0.08, 0.31, 0.08]
  },
  {
    id: "ST16", name: "膺窗", pinyin: "yīng chuāng", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第3肋间隙，前正中线旁开4寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "乳痈"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [0.08, 0.28, 0.08]
  },
  {
    id: "ST17", name: "乳中", pinyin: "rǔ zhōng", meridian: "ST", system: "fourteen",
    category: "普通穴（定位标志，禁针禁灸）",
    locationDesc: "在胸部，当第4肋间隙，乳头中央，前正中线旁开4寸",
    indications: ["本穴不针不灸，仅作定位标志"],
    needling: "禁针禁灸",
    coordinates: [0.08, 0.25, 0.09]
  },
  {
    id: "ST18", name: "乳根", pinyin: "rǔ gēn", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当乳头直下，第5肋间隙，前正中线旁开4寸",
    indications: ["咳嗽", "气喘", "胸痛", "乳痈", "乳汁少", "呃逆"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [0.08, 0.22, 0.08]
  },
  {
    id: "ST19", name: "不容", pinyin: "bù róng", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，当脐中上6寸，前正中线旁开2寸",
    indications: ["腹胀", "呕吐", "胃痛", "食欲不振", "胁痛"],
    needling: "直刺0.5-1寸",
    coordinates: [0.04, 0.18, 0.08]
  },
  {
    id: "ST20", name: "承满", pinyin: "chéng mǎn", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，当脐中上5寸，前正中线旁开2寸",
    indications: ["胃痛", "腹胀", "呕吐", "食欲不振", "吐血"],
    needling: "直刺0.5-1寸",
    coordinates: [0.04, 0.15, 0.08]
  },
  {
    id: "ST21", name: "梁门", pinyin: "liáng mén", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，当脐中上4寸，前正中线旁开2寸",
    indications: ["胃痛", "呕吐", "腹胀", "食欲不振", "泄泻"],
    needling: "直刺0.5-1寸",
    coordinates: [0.04, 0.12, 0.08]
  },
  {
    id: "ST22", name: "关门", pinyin: "guān mén", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，当脐中上3寸，前正中线旁开2寸",
    indications: ["腹胀", "腹痛", "肠鸣", "泄泻", "水肿"],
    needling: "直刺0.8-1.2寸",
    coordinates: [0.04, 0.09, 0.08]
  },
  {
    id: "ST23", name: "太乙", pinyin: "tài yǐ", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，当脐中上2寸，前正中线旁开2寸",
    indications: ["胃痛", "腹胀", "消化不良", "癫狂", "心烦不宁"],
    needling: "直刺0.8-1.2寸",
    coordinates: [0.04, 0.07, 0.08]
  },
  {
    id: "ST24", name: "滑肉门", pinyin: "huá ròu mén", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，当脐中上1寸，前正中线旁开2寸",
    indications: ["胃痛", "呕吐", "腹胀", "癫狂", "月经不调"],
    needling: "直刺0.8-1.2寸",
    coordinates: [0.04, 0.06, 0.08]
  },
  {
    id: "ST25", name: "天枢", pinyin: "tiān shū", meridian: "ST", system: "fourteen",
    category: "特定穴：大肠募穴",
    locationDesc: "在腹中部，脐中旁开2寸",
    indications: ["腹痛", "腹胀", "便秘", "泄泻", "痢疾", "月经不调", "痛经"],
    needling: "直刺1-1.5寸",
    coordinates: [0.04, 0.05, 0.08]
  },
  {
    id: "ST26", name: "外陵", pinyin: "wài líng", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在下腹部，当脐中下1寸，前正中线旁开2寸",
    indications: ["腹痛", "腹胀", "疝气", "痛经", "月经不调"],
    needling: "直刺1-1.5寸",
    coordinates: [0.04, 0.03, 0.08]
  },
  {
    id: "ST27", name: "大巨", pinyin: "dà jù", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在下腹部，当脐中下2寸，前正中线旁开2寸",
    indications: ["小腹胀满", "小便不利", "疝气", "遗精", "早泄"],
    needling: "直刺1-1.5寸",
    coordinates: [0.04, 0.01, 0.08]
  },
  {
    id: "ST28", name: "水道", pinyin: "shuǐ dào", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在下腹部，当脐中下3寸，前正中线旁开2寸",
    indications: ["小腹胀满", "小便不利", "痛经", "不孕", "疝气"],
    needling: "直刺1-1.5寸",
    coordinates: [0.04, -0.01, 0.08]
  },
  {
    id: "ST29", name: "归来", pinyin: "guī lái", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在下腹部，当脐中下4寸，前正中线旁开2寸",
    indications: ["月经不调", "痛经", "白带", "阴挺", "疝气", "茎中痛"],
    needling: "直刺1-1.5寸",
    coordinates: [0.04, -0.03, 0.08]
  },
  {
    id: "ST30", name: "气冲", pinyin: "qì chōng", meridian: "ST", system: "fourteen",
    category: "普通穴；冲脉所起",
    locationDesc: "在腹股沟稍上方，当脐中下5寸，前正中线旁开2寸",
    indications: ["腹痛", "疝气", "月经不调", "不孕", "阳痿", "阴茎痛"],
    needling: "直刺0.5-1寸",
    coordinates: [0.05, -0.06, 0.07]
  },
  {
    id: "ST31", name: "髀关", pinyin: "bì guān", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿前面，当髂前上棘与髌底外侧端的连线上，屈股时平会阴，居缝匠肌外侧凹陷处",
    indications: ["腰腿疼痛", "下肢痿痹", "股膝冷痛", "腹痛"],
    needling: "直刺1-2寸",
    coordinates: [0.10, -0.20, 0.06]
  },
  {
    id: "ST32", name: "伏兔", pinyin: "fú tù", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿前面，当髂前上棘与髌底外侧端的连线上，髌底上6寸",
    indications: ["腰腿冷痛", "下肢痿痹", "膝脚麻木", "疝气", "腹胀"],
    needling: "直刺1-2寸",
    coordinates: [0.12, -0.30, 0.06]
  },
  {
    id: "ST33", name: "阴市", pinyin: "yīn shì", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿前面，当髂前上棘与髌底外侧端的连线上，髌底上3寸",
    indications: ["腿膝冷痛", "下肢痿痹", "疝气", "腹胀腹痛"],
    needling: "直刺1-1.5寸",
    coordinates: [0.12, -0.40, 0.06]
  },
  {
    id: "ST34", name: "梁丘", pinyin: "liáng qiū", meridian: "ST", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在大腿前面，当髂前上棘与髌底外侧端的连线上，髌底上2寸",
    indications: ["胃痛", "膝肿痛", "下肢不遂", "乳痈"],
    needling: "直刺1-1.5寸",
    coordinates: [0.12, -0.44, 0.06]
  },
  {
    id: "ST35", name: "犊鼻", pinyin: "dú bí", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "屈膝，在膝部，髌骨与髌韧带外侧凹陷中",
    indications: ["膝痛", "下肢痿痹", "脚气", "关节屈伸不利"],
    needling: "向后内斜刺0.5-1寸",
    coordinates: [0.13, -0.48, 0.05]
  },
  {
    id: "ST36", name: "足三里", pinyin: "zú sān lǐ", meridian: "ST", system: "fourteen",
    category: "特定穴：五输穴之合穴；下合穴（胃）",
    locationDesc: "在小腿前外侧，当犊鼻下3寸，距胫骨前缘一横指",
    indications: ["胃痛", "呕吐", "腹胀", "泄泻", "便秘", "痢疾", "下肢痿痹", "虚劳羸瘦", "保健要穴"],
    needling: "直刺1-2寸",
    coordinates: [0.12, -0.55, 0.05]
  },
  {
    id: "ST37", name: "上巨虚", pinyin: "shàng jù xū", meridian: "ST", system: "fourteen",
    category: "特定穴：大肠下合穴",
    locationDesc: "在小腿前外侧，当犊鼻下6寸，距胫骨前缘一横指",
    indications: ["腹痛", "腹胀", "便秘", "泄泻", "痢疾", "肠痈", "下肢痿痹"],
    needling: "直刺1-2寸",
    coordinates: [0.12, -0.62, 0.05]
  },
  {
    id: "ST38", name: "条口", pinyin: "tiáo kǒu", meridian: "ST", system: "fourteen",
    category: "普通穴",
    locationDesc: "在小腿前外侧，当犊鼻下8寸，距胫骨前缘一横指",
    indications: ["肩凝症", "下肢痿痹", "转筋", "脘腹疼痛"],
    needling: "直刺1-1.5寸",
    coordinates: [0.12, -0.66, 0.05]
  },
  {
    id: "ST39", name: "下巨虚", pinyin: "xià jù xū", meridian: "ST", system: "fourteen",
    category: "特定穴：小肠下合穴",
    locationDesc: "在小腿前外侧，当犊鼻下9寸，距胫骨前缘一横指",
    indications: ["小腹痛", "泄泻", "痢疾", "乳痈", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [0.12, -0.69, 0.05]
  },
  {
    id: "ST40", name: "丰隆", pinyin: "fēng lóng", meridian: "ST", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在小腿前外侧，当外踝尖上8寸，条口外，距胫骨前缘二横指",
    indications: ["头痛", "眩晕", "咳嗽痰多", "呕吐", "便秘", "癫狂", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [0.14, -0.64, 0.05]
  },
  {
    id: "ST41", name: "解溪", pinyin: "jiě xī", meridian: "ST", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在足背与小腿交界处的横纹中央凹陷中，当拇长伸肌腱与趾长伸肌腱之间",
    indications: ["踝关节疼痛", "下肢痿痹", "头痛", "眩晕", "癫狂", "腹胀", "便秘"],
    needling: "直刺0.5-1寸",
    coordinates: [0.12, -0.78, 0.05]
  },
  {
    id: "ST42", name: "冲阳", pinyin: "chōng yáng", meridian: "ST", system: "fourteen",
    category: "特定穴：原穴",
    locationDesc: "在足背最高处，当拇长伸肌腱与趾长伸肌腱之间，足背动脉搏动处",
    indications: ["胃痛", "腹胀", "口眼歪斜", "面肿", "牙痛", "足痿无力"],
    needling: "避开动脉，直刺0.3-0.5寸",
    coordinates: [0.12, -0.82, 0.05]
  },
  {
    id: "ST43", name: "陷谷", pinyin: "xiàn gǔ", meridian: "ST", system: "fourteen",
    category: "特定穴：五输穴之输穴",
    locationDesc: "在足背，当第2、3跖骨结合部前方凹陷处",
    indications: ["面浮身肿", "目赤痛", "肠鸣腹痛", "足背肿痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [0.12, -0.85, 0.05]
  },
  {
    id: "ST44", name: "内庭", pinyin: "nèi tíng", meridian: "ST", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在足背，当第2、3趾间，趾蹼缘后方赤白肉际处",
    indications: ["牙痛", "咽喉肿痛", "鼻衄", "胃痛吐酸", "腹胀", "泄泻", "热病"],
    needling: "直刺0.3-0.5寸",
    coordinates: [0.12, -0.88, 0.05]
  },
  {
    id: "ST45", name: "厉兑", pinyin: "lì duì", meridian: "ST", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在足第2趾末节外侧，距趾甲角0.1寸",
    indications: ["鼻衄", "牙痛", "咽喉肿痛", "热病", "多梦", "癫狂"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [0.12, -0.90, 0.05]
  },
  // ═══════════════════════════════════════════════════════════
  // 4. 足太阴脾经 (SP) - 21穴 - 左腿内侧前缘
  // ═══════════════════════════════════════════════════════════
  {
    id: "SP1", name: "隐白", pinyin: "yǐn bái", meridian: "SP", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在足大趾末节内侧，距趾甲角0.1寸",
    indications: ["月经过多", "崩漏", "便血", "尿血", "腹胀", "癫狂", "多梦", "惊风"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.10, -0.90, 0.05]
  },
  {
    id: "SP2", name: "大都", pinyin: "dà dū", meridian: "SP", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在足内侧缘，当足大趾本节前下方赤白肉际凹陷处",
    indications: ["腹胀", "胃痛", "呕吐", "泄泻", "便秘", "热病无汗"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.87, 0.05]
  },
  {
    id: "SP3", name: "太白", pinyin: "tài bái", meridian: "SP", system: "fourteen",
    category: "特定穴：五输穴之输穴；原穴",
    locationDesc: "在足内侧缘，当足大趾本节后下方赤白肉际凹陷处",
    indications: ["胃痛", "腹胀", "腹痛", "泄泻", "便秘", "痢疾", "纳呆", "体重节痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.10, -0.84, 0.05]
  },
  {
    id: "SP4", name: "公孙", pinyin: "gōng sūn", meridian: "SP", system: "fourteen",
    category: "特定穴：络穴；八脉交会穴通冲脉",
    locationDesc: "在足内侧缘，当第1跖骨基底的前下方",
    indications: ["胃痛", "呕吐", "腹痛", "腹胀", "泄泻", "痢疾", "心烦失眠"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.10, -0.82, 0.05]
  },
  {
    id: "SP5", name: "商丘", pinyin: "shāng qiū", meridian: "SP", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在足内踝前下方凹陷中，当舟骨结节与内踝尖连线的中点处",
    indications: ["腹胀", "泄泻", "便秘", "黄疸", "足踝痛", "癫狂", "小儿癫痫"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.78, 0.04]
  },
  {
    id: "SP6", name: "三阴交", pinyin: "sān yīn jiāo", meridian: "SP", system: "fourteen",
    category: "特定穴：足三阴经之交会穴",
    locationDesc: "在小腿内侧，当足内踝尖上3寸，胫骨内侧缘后方",
    indications: ["月经不调", "痛经", "崩漏", "带下", "不孕", "遗精", "阳痿", "遗尿", "失眠", "腹胀", "泄泻"],
    needling: "直刺1-1.5寸，孕妇禁针",
    coordinates: [-0.10, -0.68, 0.04]
  },
  {
    id: "SP7", name: "漏谷", pinyin: "lòu gǔ", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在小腿内侧，当内踝尖与阴陵泉的连线上，距内踝尖6寸，胫骨内侧缘后方",
    indications: ["腹胀", "肠鸣", "小便不利", "遗精", "下肢痿痹", "腿膝厥冷"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.10, -0.58, 0.04]
  },
  {
    id: "SP8", name: "地机", pinyin: "dì jī", meridian: "SP", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在小腿内侧，当内踝尖与阴陵泉的连线上，阴陵泉下3寸",
    indications: ["月经不调", "痛经", "崩漏", "遗精", "腹胀", "腹痛", "泄泻", "小便不利"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.10, -0.52, 0.04]
  },
  {
    id: "SP9", name: "阴陵泉", pinyin: "yīn líng quán", meridian: "SP", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在小腿内侧，当胫骨内侧髁后下方凹陷处",
    indications: ["腹胀", "水肿", "黄疸", "泄泻", "小便不利", "遗精", "膝痛", "阴茎痛"],
    needling: "直刺1-2寸",
    coordinates: [-0.10, -0.48, 0.04]
  },
  {
    id: "SP10", name: "血海", pinyin: "xuè hǎi", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿内侧，髌底内侧端上2寸，当股四头肌内侧头的隆起处",
    indications: ["月经不调", "痛经", "崩漏", "经闭", "湿疹", "荨麻疹", "皮肤瘙痒", "股内侧痛"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.10, -0.42, 0.05]
  },
  {
    id: "SP11", name: "箕门", pinyin: "jī mén", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿内侧，当血海与冲门连线上，血海上6寸",
    indications: ["小便不利", "遗尿", "阴囊湿疹", "腹股沟肿痛", "腿膝肿痛"],
    needling: "避开动脉，直刺0.5-1寸",
    coordinates: [-0.09, -0.35, 0.05]
  },
  {
    id: "SP12", name: "冲门", pinyin: "chōng mén", meridian: "SP", system: "fourteen",
    category: "普通穴；足太阴厥阴之会",
    locationDesc: "在腹股沟外侧，距耻骨联合上缘中点3.5寸，当髂外动脉搏动处的外侧",
    indications: ["腹痛", "疝气", "崩漏", "带下", "胎气上冲"],
    needling: "避开动脉，直刺0.5-1寸",
    coordinates: [-0.08, -0.15, 0.06]
  },
  {
    id: "SP13", name: "府舍", pinyin: "fǔ shè", meridian: "SP", system: "fourteen",
    category: "普通穴；足太阴厥阴阴维之会",
    locationDesc: "在下腹部，当脐中下4寸，冲门上方0.7寸，前正中线旁开4寸",
    indications: ["腹痛", "疝气", "积聚", "霍乱吐泻"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.08, -0.10, 0.06]
  },
  {
    id: "SP14", name: "腹结", pinyin: "fù jié", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在下腹部，大横下1.3寸，距前正中线4寸",
    indications: ["腹痛", "腹胀", "泄泻", "便秘", "痢疾", "疝气"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.08, -0.02, 0.06]
  },
  {
    id: "SP15", name: "大横", pinyin: "dà héng", meridian: "SP", system: "fourteen",
    category: "普通穴；足太阴阴维之会",
    locationDesc: "在腹中部，距脐中4寸",
    indications: ["腹痛", "腹胀", "泄泻", "便秘", "痢疾", "蛔虫症"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.08, 0.05, 0.07]
  },
  {
    id: "SP16", name: "腹哀", pinyin: "fù āi", meridian: "SP", system: "fourteen",
    category: "普通穴；足太阴阴维之会",
    locationDesc: "在上腹部，当脐中上3寸，距前正中线4寸",
    indications: ["腹痛", "腹胀", "消化不良", "便秘", "痢疾"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.08, 0.12, 0.07]
  },
  {
    id: "SP17", name: "食窦", pinyin: "shí dòu", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸外侧部，当第5肋间隙，距前正中线6寸",
    indications: ["胸胁胀痛", "腹胀", "翻胃", "噫气", "水肿"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.12, 0.22, 0.07]
  },
  {
    id: "SP18", name: "天溪", pinyin: "tiān xī", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸外侧部，当第4肋间隙，距前正中线6寸",
    indications: ["胸胁疼痛", "咳嗽", "气喘", "乳痈", "乳汁少"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.12, 0.25, 0.07]
  },
  {
    id: "SP19", name: "胸乡", pinyin: "xiōng xiāng", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸外侧部，当第3肋间隙，距前正中线6寸",
    indications: ["胸胁胀痛", "胸引背痛", "卧难转侧"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.12, 0.28, 0.07]
  },
  {
    id: "SP20", name: "周荣", pinyin: "zhōu róng", meridian: "SP", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸外侧部，当第2肋间隙，距前正中线6寸",
    indications: ["胸胁胀满", "咳嗽", "气喘", "食不下"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.12, 0.31, 0.07]
  },
  {
    id: "SP21", name: "大包", pinyin: "dà bāo", meridian: "SP", system: "fourteen",
    category: "特定穴：脾之大络",
    locationDesc: "在侧胸部，腋中线上，当第6肋间隙处",
    indications: ["气喘", "胸胁痛", "全身疼痛", "四肢无力"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.14, 0.19, 0.06]
  },

  // ═══════════════════════════════════════════════════════════
  // 5. 手少阴心经 (HT) - 9穴 - 左臂内侧后缘
  // ═══════════════════════════════════════════════════════════
  {
    id: "HT1", name: "极泉", pinyin: "jí quán", meridian: "HT", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腋窝顶点，腋动脉搏动处",
    indications: ["心痛", "心悸", "胸闷", "胁肋疼痛", "肩臂疼痛", "咽干烦渴"],
    needling: "避开腋动脉，直刺0.5-1寸",
    coordinates: [-0.20, 0.38, 0.04]
  },
  {
    id: "HT2", name: "青灵", pinyin: "qīng líng", meridian: "HT", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂内侧，当极泉与少海的连线上，肘横纹上3寸",
    indications: ["头痛", "目黄", "胁痛", "肩臂疼痛", "腋下肿痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.22, 0.22, 0.03]
  },
  {
    id: "HT3", name: "少海", pinyin: "shào hǎi", meridian: "HT", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "屈肘，在肘横纹内侧端与肱骨内上髁连线的中点处",
    indications: ["心痛", "肘臂挛痛", "瘰疬", "头项痛", "腋胁痛", "癫狂"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.24, 0.15, 0.03]
  },
  {
    id: "HT4", name: "灵道", pinyin: "líng dào", meridian: "HT", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在前臂掌侧，当尺侧腕屈肌腱的桡侧缘，腕横纹上1.5寸",
    indications: ["心痛", "心悸", "癔症", "悲恐善笑", "暴喑", "肘臂挛痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.24, -0.02, 0.03]
  },
  {
    id: "HT5", name: "通里", pinyin: "tōng lǐ", meridian: "HT", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在前臂掌侧，当尺侧腕屈肌腱的桡侧缘，腕横纹上1寸",
    indications: ["心悸", "怔忡", "暴喑", "舌强不语", "腕臂痛", "遗尿"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.24, -0.06, 0.03]
  },
  {
    id: "HT6", name: "阴郄", pinyin: "yīn xì", meridian: "HT", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在前臂掌侧，当尺侧腕屈肌腱的桡侧缘，腕横纹上0.5寸",
    indications: ["心痛", "惊悸", "骨蒸盗汗", "吐血", "衄血", "暴喑"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.24, -0.09, 0.03]
  },
  {
    id: "HT7", name: "神门", pinyin: "shén mén", meridian: "HT", system: "fourteen",
    category: "特定穴：五输穴之输穴；原穴",
    locationDesc: "在腕部，腕掌侧横纹尺侧端，尺侧腕屈肌腱的桡侧凹陷处",
    indications: ["失眠", "心悸", "心烦", "健忘", "癫狂", "痫症", "痴呆", "胸痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.24, -0.13, 0.03]
  },
  {
    id: "HT8", name: "少府", pinyin: "shào fǔ", meridian: "HT", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在手掌面，第4、5掌骨间，握拳时当小指与无名指指端之间",
    indications: ["心悸", "胸痛", "小便不利", "遗尿", "阴痒", "阴痛", "小指挛痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.23, -0.20, 0.05]
  },
  {
    id: "HT9", name: "少冲", pinyin: "shào chōng", meridian: "HT", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在手小指末节桡侧，距指甲角0.1寸",
    indications: ["心悸", "心痛", "胸胁痛", "癫狂", "热病", "昏迷"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.23, -0.27, 0.05]
  },

  // ═══════════════════════════════════════════════════════════
  // 6. 手太阳小肠经 (SI) - 19穴 - 左臂外侧后缘
  // ═══════════════════════════════════════════════════════════
  {
    id: "SI1", name: "少泽", pinyin: "shào zé", meridian: "SI", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在手小指末节尺侧，距指甲角0.1寸",
    indications: ["头痛", "目翳", "咽喉肿痛", "乳痈", "乳汁少", "昏迷", "热病"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.23, -0.27, 0.01]
  },
  {
    id: "SI2", name: "前谷", pinyin: "qián gǔ", meridian: "SI", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在手尺侧，微握拳，当小指本节前的掌指横纹头赤白肉际",
    indications: ["头痛", "目痛", "耳鸣", "咽喉肿痛", "乳少", "热病"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.24, -0.24, 0.01]
  },
  {
    id: "SI3", name: "后溪", pinyin: "hòu xī", meridian: "SI", system: "fourteen",
    category: "特定穴：五输穴之输穴；八脉交会穴通督脉",
    locationDesc: "在手掌尺侧，微握拳，当小指本节后的远侧掌横纹头赤白肉际",
    indications: ["头项强痛", "腰背痛", "手指及肘臂挛痛", "耳聋", "目赤", "癫狂", "痫症", "疟疾"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.25, -0.20, 0.00]
  },
  {
    id: "SI4", name: "腕骨", pinyin: "wàn gǔ", meridian: "SI", system: "fourteen",
    category: "特定穴：原穴",
    locationDesc: "在手掌尺侧，当第5掌骨基底与钩骨之间的凹陷处，赤白肉际",
    indications: ["头项强痛", "耳鸣", "目翳", "指挛臂痛", "黄疸", "热病", "疟疾"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.25, -0.16, 0.00]
  },
  {
    id: "SI5", name: "阳谷", pinyin: "yáng gǔ", meridian: "SI", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在手腕尺侧，当尺骨茎突与三角骨之间的凹陷处",
    indications: ["头痛", "目眩", "耳鸣", "耳聋", "热病", "癫狂", "腕臂痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.25, -0.13, 0.00]
  },
  {
    id: "SI6", name: "养老", pinyin: "yǎng lǎo", meridian: "SI", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在前臂背面尺侧，当尺骨小头近端桡侧凹陷中",
    indications: ["目视不明", "肩背肘臂酸痛", "急性腰痛", "落枕"],
    needling: "直刺或斜刺0.5-0.8寸",
    coordinates: [-0.25, -0.10, -0.01]
  },
  {
    id: "SI7", name: "支正", pinyin: "zhī zhèng", meridian: "SI", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在前臂背面尺侧，当阳谷与小海的连线上，腕背横纹上5寸",
    indications: ["头痛", "项强", "肘臂酸痛", "热病", "癫狂", "疣目"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.25, -0.02, -0.01]
  },
  {
    id: "SI8", name: "小海", pinyin: "xiǎo hǎi", meridian: "SI", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在肘内侧，当尺骨鹰嘴与肱骨内上髁之间的凹陷处",
    indications: ["肘臂疼痛", "癫痫", "舞蹈病", "颈项肩臂痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.25, 0.15, -0.01]
  },
  {
    id: "SI9", name: "肩贞", pinyin: "jiān zhēn", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在肩关节后下方，臂内收时，腋后纹头上1寸",
    indications: ["肩臂疼痛", "瘰疬", "耳鸣", "肩周炎"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.20, 0.38, -0.02]
  },
  {
    id: "SI10", name: "臑俞", pinyin: "nào shū", meridian: "SI", system: "fourteen",
    category: "普通穴；手太阳阳维跷之会",
    locationDesc: "在肩部，当腋后纹头直上，肩胛冈下缘凹陷中",
    indications: ["肩臂酸痛无力", "肩肿", "颈项瘰疬"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.18, 0.40, -0.04]
  },
  {
    id: "SI11", name: "天宗", pinyin: "tiān zōng", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在肩胛部，当冈下窝中央凹陷处，与第4胸椎相平",
    indications: ["肩胛疼痛", "肘臂外后侧痛", "气喘", "乳痈"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.14, 0.36, -0.06]
  },
  {
    id: "SI12", name: "秉风", pinyin: "bǐng fēng", meridian: "SI", system: "fourteen",
    category: "普通穴；手阳明太阳足少阳之会",
    locationDesc: "在肩胛部，冈上窝中央，天宗直上，举臂有凹陷处",
    indications: ["肩胛疼痛", "上肢酸麻", "肩臂拘急"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.14, 0.42, -0.06]
  },
  {
    id: "SI13", name: "曲垣", pinyin: "qū yuán", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在肩胛部，冈上窝内侧端，当臑俞与第2胸椎棘突连线的中点处",
    indications: ["肩胛背项疼痛", "肩臂拘急"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.10, 0.42, -0.06]
  },
  {
    id: "SI14", name: "肩外俞", pinyin: "jiān wài shū", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第1胸椎棘突下，旁开3寸",
    indications: ["肩背酸痛", "颈项强急", "肘臂冷痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.40, -0.08]
  },
  {
    id: "SI15", name: "肩中俞", pinyin: "jiān zhōng shū", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第7颈椎棘突下，旁开2寸",
    indications: ["咳嗽", "气喘", "肩背疼痛", "目视不明", "唾血"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.06, 0.44, -0.07]
  },
  {
    id: "SI16", name: "天窗", pinyin: "tiān chuāng", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈外侧部，胸锁乳突肌的后缘，扶突后，与喉结相平",
    indications: ["耳鸣", "耳聋", "咽喉肿痛", "颈项强痛", "暴喑", "颊肿"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.06, 0.50, 0.02]
  },
  {
    id: "SI17", name: "天容", pinyin: "tiān róng", meridian: "SI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈外侧部，下颌角的后方，胸锁乳突肌的前缘凹陷中",
    indications: ["耳鸣", "耳聋", "咽喉肿痛", "颈项肿痛", "咽下困难"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.05, 0.54, 0.03]
  },
  {
    id: "SI18", name: "颧髎", pinyin: "quán liáo", meridian: "SI", system: "fourteen",
    category: "普通穴；手少阴太阳之会",
    locationDesc: "在面部，当目外眦直下，颧骨下缘凹陷处",
    indications: ["口眼歪斜", "眼睑瞤动", "面赤", "牙痛", "颊肿", "三叉神经痛"],
    needling: "直刺0.3-0.5寸，或斜刺0.5-1寸",
    coordinates: [-0.05, 0.62, 0.06]
  },
  {
    id: "SI19", name: "听宫", pinyin: "tīng gōng", meridian: "SI", system: "fourteen",
    category: "普通穴；手足少阳手太阳之会",
    locationDesc: "在面部，耳屏前，下颌骨髁状突的后方，张口时呈凹陷处",
    indications: ["耳鸣", "耳聋", "聤耳", "牙痛", "癫狂痫"],
    needling: "张口，直刺1-1.5寸",
    coordinates: [-0.06, 0.60, 0.04]
  },
  // ═══════════════════════════════════════════════════════════
  // 7. 足太阳膀胱经 (BL) - 67穴 - 左背及左腿后侧
  // ═══════════════════════════════════════════════════════════
  {
    id: "BL1", name: "睛明", pinyin: "jīng míng", meridian: "BL", system: "fourteen",
    category: "普通穴；手足太阳足阳明阴阳跷之会",
    locationDesc: "在面部，目内眦角稍上方凹陷处",
    indications: ["目赤肿痛", "目痒", "迎风流泪", "夜盲", "色盲", "近视", "目眩"],
    needling: "嘱患者闭目，左手将眼球推向外侧固定，沿眶缘缓慢直刺0.5-1寸",
    coordinates: [-0.01, 0.74, 0.07]
  },
  {
    id: "BL2", name: "攒竹", pinyin: "cuán zhú", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在面部，当眉头陷中，眶上切迹处",
    indications: ["头痛", "目眩", "目赤肿痛", "眼睑瞤动", "迎风流泪", "面瘫", "眉棱骨痛"],
    needling: "平刺0.5-0.8寸，或向下斜刺透睛明",
    coordinates: [-0.02, 0.76, 0.06]
  },
  {
    id: "BL3", name: "眉冲", pinyin: "méi chōng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当攒竹直上入发际0.5寸，神庭与曲差之间",
    indications: ["头痛", "眩晕", "鼻塞", "癫痫", "目视不明"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.03, 0.78, 0.05]
  },
  {
    id: "BL4", name: "曲差", pinyin: "qū chā", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上0.5寸，旁开1.5寸",
    indications: ["头痛", "目眩", "鼻塞", "鼻衄", "目视不明"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.04, 0.80, 0.04]
  },
  {
    id: "BL5", name: "五处", pinyin: "wǔ chù", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上1寸，旁开1.5寸",
    indications: ["头痛", "目眩", "癫痫", "小儿惊风", "目视不明"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.04, 0.82, 0.02]
  },
  {
    id: "BL6", name: "承光", pinyin: "chéng guāng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上2.5寸，旁开1.5寸",
    indications: ["头痛", "眩晕", "呕吐", "目视不明", "鼻塞多涕"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.04, 0.84, 0.00]
  },
  {
    id: "BL7", name: "通天", pinyin: "tōng tiān", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上4寸，旁开1.5寸",
    indications: ["头痛", "眩晕", "鼻塞", "鼻衄", "鼻渊", "口眼歪斜"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.04, 0.86, -0.02]
  },
  {
    id: "BL8", name: "络却", pinyin: "luò què", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上5.5寸，旁开1.5寸",
    indications: ["眩晕", "耳鸣", "目视不明", "癫狂", "瘿气", "项肿"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.04, 0.87, -0.03]
  },
  {
    id: "BL9", name: "玉枕", pinyin: "yù zhěn", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在后头部，当后发际正中直上2.5寸，旁开1.3寸，平枕外隆凸上缘凹陷处",
    indications: ["头项痛", "目眩", "目痛", "鼻塞", "多汗"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.04, 0.82, -0.06]
  },
  {
    id: "BL10", name: "天柱", pinyin: "tiān zhù", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在项部，大筋外缘之后发际凹陷中，约当后发际正中旁开1.3寸",
    indications: ["头痛", "项强", "鼻塞", "肩背痛", "癫狂", "热病", "咽喉肿痛"],
    needling: "直刺0.5-0.8寸，不可向上深刺",
    coordinates: [-0.03, 0.50, -0.05]
  },
  {
    id: "BL11", name: "大杼", pinyin: "dà zhù", meridian: "BL", system: "fourteen",
    category: "特定穴：八会穴之骨会；手足太阳之会",
    locationDesc: "在背部，当第1胸椎棘突下，旁开1.5寸",
    indications: ["咳嗽", "发热", "头痛", "肩背痛", "颈项强急", "骨节酸痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.40, -0.10]
  },
  {
    id: "BL12", name: "风门", pinyin: "fēng mén", meridian: "BL", system: "fourteen",
    category: "普通穴；督脉足太阳之会",
    locationDesc: "在背部，当第2胸椎棘突下，旁开1.5寸",
    indications: ["伤风", "咳嗽", "发热", "头痛", "项强", "胸背痛", "荨麻疹"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.38, -0.10]
  },
  {
    id: "BL13", name: "肺俞", pinyin: "fèi shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（肺）",
    locationDesc: "在背部，当第3胸椎棘突下，旁开1.5寸",
    indications: ["咳嗽", "气喘", "吐血", "骨蒸", "潮热", "盗汗", "鼻塞", "皮肤瘙痒"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.35, -0.10]
  },
  {
    id: "BL14", name: "厥阴俞", pinyin: "jué yīn shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（心包）",
    locationDesc: "在背部，当第4胸椎棘突下，旁开1.5寸",
    indications: ["心痛", "心悸", "胸闷", "咳嗽", "呕吐", "牙痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.32, -0.10]
  },
  {
    id: "BL15", name: "心俞", pinyin: "xīn shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（心）",
    locationDesc: "在背部，当第5胸椎棘突下，旁开1.5寸",
    indications: ["心痛", "心悸", "失眠", "健忘", "癫狂", "痫症", "咳嗽", "吐血", "遗精"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.29, -0.10]
  },
  {
    id: "BL16", name: "督俞", pinyin: "dū shū", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第6胸椎棘突下，旁开1.5寸",
    indications: ["心痛", "胸闷", "腹胀", "肠鸣", "腹痛", "呃逆"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.26, -0.10]
  },
  {
    id: "BL17", name: "膈俞", pinyin: "gé shū", meridian: "BL", system: "fourteen",
    category: "特定穴：八会穴之血会；背俞穴（膈）",
    locationDesc: "在背部，当第7胸椎棘突下，旁开1.5寸",
    indications: ["呕吐", "呃逆", "气喘", "咳嗽", "吐血", "潮热", "盗汗", "贫血", "皮肤瘙痒"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.23, -0.10]
  },
  {
    id: "BL18", name: "肝俞", pinyin: "gān shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（肝）",
    locationDesc: "在背部，当第9胸椎棘突下，旁开1.5寸",
    indications: ["黄疸", "胁痛", "目赤", "目眩", "癫狂", "痫症", "脊背痛", "吐血", "鼻衄"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.18, -0.10]
  },
  {
    id: "BL19", name: "胆俞", pinyin: "dǎn shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（胆）",
    locationDesc: "在背部，当第10胸椎棘突下，旁开1.5寸",
    indications: ["黄疸", "口苦", "呕吐", "胁痛", "饮食不下", "肺痨", "潮热"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.15, -0.10]
  },
  {
    id: "BL20", name: "脾俞", pinyin: "pí shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（脾）",
    locationDesc: "在背部，当第11胸椎棘突下，旁开1.5寸",
    indications: ["腹胀", "黄疸", "呕吐", "泄泻", "痢疾", "便血", "水肿", "背痛", "纳呆"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.12, -0.10]
  },
  {
    id: "BL21", name: "胃俞", pinyin: "wèi shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（胃）",
    locationDesc: "在背部，当第12胸椎棘突下，旁开1.5寸",
    indications: ["胃脘痛", "腹胀", "呕吐", "肠鸣", "脾胃虚弱", "胸胁痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.04, 0.09, -0.10]
  },
  {
    id: "BL22", name: "三焦俞", pinyin: "sān jiāo shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（三焦）",
    locationDesc: "在腰部，当第1腰椎棘突下，旁开1.5寸",
    indications: ["腹胀", "肠鸣", "呕吐", "泄泻", "痢疾", "水肿", "腰背强痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.04, 0.05, -0.10]
  },
  {
    id: "BL23", name: "肾俞", pinyin: "shèn shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（肾）",
    locationDesc: "在腰部，当第2腰椎棘突下，旁开1.5寸",
    indications: ["腰痛", "遗精", "阳痿", "遗尿", "月经不调", "白带", "耳鸣", "耳聋", "水肿"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.04, 0.02, -0.10]
  },
  {
    id: "BL24", name: "气海俞", pinyin: "qì hǎi shū", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腰部，当第3腰椎棘突下，旁开1.5寸",
    indications: ["腰痛", "痛经", "痔疮", "腹胀", "遗尿", "下肢痿痹"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.04, -0.01, -0.10]
  },
  {
    id: "BL25", name: "大肠俞", pinyin: "dà cháng shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（大肠）",
    locationDesc: "在腰部，当第4腰椎棘突下，旁开1.5寸",
    indications: ["腰腿痛", "腹胀", "泄泻", "便秘", "痢疾", "痔疮", "遗尿"],
    needling: "直刺0.5-1.2寸",
    coordinates: [-0.04, -0.04, -0.10]
  },
  {
    id: "BL26", name: "关元俞", pinyin: "guān yuán shū", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腰部，当第5腰椎棘突下，旁开1.5寸",
    indications: ["腰痛", "腹胀", "泄泻", "遗尿", "小便频数", "小便难", "痛经"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.04, -0.07, -0.09]
  },
  {
    id: "BL27", name: "小肠俞", pinyin: "xiǎo cháng shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（小肠）",
    locationDesc: "在骶部，当骶正中嵴旁1.5寸，平第1骶后孔",
    indications: ["遗精", "遗尿", "尿血", "白带", "腹胀", "泄泻", "痢疾", "腰痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.04, -0.10, -0.09]
  },
  {
    id: "BL28", name: "膀胱俞", pinyin: "páng guāng shū", meridian: "BL", system: "fourteen",
    category: "特定穴：背俞穴（膀胱）",
    locationDesc: "在骶部，当骶正中嵴旁1.5寸，平第2骶后孔",
    indications: ["小便不利", "遗尿", "泄泻", "便秘", "腰脊强痛", "腿痛", "阴部肿痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.04, -0.13, -0.09]
  },
  {
    id: "BL29", name: "中膂俞", pinyin: "zhōng lǚ shū", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当骶正中嵴旁1.5寸，平第3骶后孔",
    indications: ["腰脊强痛", "腹胀", "泄泻", "疝气", "痢疾", "脚气", "下消"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.04, -0.16, -0.08]
  },
  {
    id: "BL30", name: "白环俞", pinyin: "bái huán shū", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当骶正中嵴旁1.5寸，平第4骶后孔",
    indications: ["腰骶疼痛", "遗尿", "遗精", "月经不调", "白带", "疝气", "下肢痿痹"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.04, -0.19, -0.08]
  },
  {
    id: "BL31", name: "上髎", pinyin: "shàng liáo", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当髂后上棘与后正中线之间，适对第1骶后孔处",
    indications: ["月经不调", "赤白带下", "遗精", "阳痿", "阴挺", "腰痛", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.05, -0.10, -0.09]
  },
  {
    id: "BL32", name: "次髎", pinyin: "cì liáo", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当髂后上棘内下方，适对第2骶后孔处",
    indications: ["月经不调", "痛经", "带下", "遗精", "疝气", "腰痛", "下肢痿痹", "小便不利"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.05, -0.13, -0.09]
  },
  {
    id: "BL33", name: "中髎", pinyin: "zhōng liáo", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当次髎下内方，适对第3骶后孔处",
    indications: ["月经不调", "带下", "便秘", "泄泻", "小便不利", "腰痛"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.05, -0.16, -0.08]
  },
  {
    id: "BL34", name: "下髎", pinyin: "xià liáo", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当中髎下内方，适对第4骶后孔处",
    indications: ["小腹痛", "腰骶痛", "便秘", "泄泻", "小便不利", "带下", "痛经"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.05, -0.19, -0.08]
  },
  {
    id: "BL35", name: "会阳", pinyin: "huì yáng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，尾骨端旁开0.5寸",
    indications: ["泄泻", "痢疾", "痔疮", "阳痿", "带下", "阴部痒痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.03, -0.20, -0.08]
  },
  {
    id: "BL36", name: "承扶", pinyin: "chéng fú", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿后面，臀下横纹的中点",
    indications: ["腰骶臀股部疼痛", "痔疮", "下肢痿痹", "大便难", "小便不利"],
    needling: "直刺1.5-2.5寸",
    coordinates: [-0.10, -0.22, -0.06]
  },
  {
    id: "BL37", name: "殷门", pinyin: "yīn mén", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿后面，当承扶与委中的连线上，承扶下6寸",
    indications: ["腰腿痛", "下肢痿痹", "后头痛", "股外侧肿"],
    needling: "直刺1.5-2.5寸",
    coordinates: [-0.11, -0.32, -0.04]
  },
  {
    id: "BL38", name: "浮郄", pinyin: "fú xì", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腘横纹外侧端，委阳上1寸，股二头肌腱的内侧",
    indications: ["便秘", "股腘部疼痛", "麻木", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.11, -0.42, -0.03]
  },
  {
    id: "BL39", name: "委阳", pinyin: "wěi yáng", meridian: "BL", system: "fourteen",
    category: "特定穴：三焦下合穴",
    locationDesc: "在腘横纹外侧端，当股二头肌腱内侧",
    indications: ["腹满", "小便不利", "腰脊强痛", "腿足拘挛疼痛", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.10, -0.46, -0.03]
  },
  {
    id: "BL40", name: "委中", pinyin: "wěi zhōng", meridian: "BL", system: "fourteen",
    category: "特定穴：五输穴之合穴；下合穴（膀胱）",
    locationDesc: "在腘横纹中点，当股二头肌腱与半腱肌肌腱的中间",
    indications: ["腰痛", "下肢痿痹", "腹痛", "吐泻", "小便不利", "遗尿", "丹毒", "中暑"],
    needling: "直刺1-1.5寸，或用三棱针点刺腘静脉出血",
    coordinates: [-0.12, -0.48, -0.03]
  },
  {
    id: "BL41", name: "附分", pinyin: "fù fēn", meridian: "BL", system: "fourteen",
    category: "普通穴；手足太阳之会",
    locationDesc: "在背部，当第2胸椎棘突下，旁开3寸",
    indications: ["颈项强痛", "肩背拘急", "肘臂麻木"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.38, -0.10]
  },
  {
    id: "BL42", name: "魄户", pinyin: "pò hù", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第3胸椎棘突下，旁开3寸",
    indications: ["咳嗽", "气喘", "肺痨", "项强", "肩背痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.35, -0.10]
  },
  {
    id: "BL43", name: "膏肓", pinyin: "gāo huāng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第4胸椎棘突下，旁开3寸",
    indications: ["咳嗽", "气喘", "肺痨", "健忘", "遗精", "盗汗", "虚劳诸证"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.32, -0.10]
  },
  {
    id: "BL44", name: "神堂", pinyin: "shén táng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第5胸椎棘突下，旁开3寸",
    indications: ["心痛", "心悸", "胸闷", "咳嗽", "气喘", "背痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.29, -0.10]
  },
  {
    id: "BL45", name: "譩譆", pinyin: "yì xǐ", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第6胸椎棘突下，旁开3寸",
    indications: ["咳嗽", "气喘", "疟疾", "热病", "肩背痛", "目眩"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.26, -0.10]
  },
  {
    id: "BL46", name: "膈关", pinyin: "gé guān", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第7胸椎棘突下，旁开3寸",
    indications: ["胸闷", "嗳气", "呕吐", "饮食不下", "脊背强痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.23, -0.10]
  },
  {
    id: "BL47", name: "魂门", pinyin: "hún mén", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第9胸椎棘突下，旁开3寸",
    indications: ["胸胁痛", "呕吐", "泄泻", "背痛", "饮食不下"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.17, -0.10]
  },
  {
    id: "BL48", name: "阳纲", pinyin: "yáng gāng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第10胸椎棘突下，旁开3寸",
    indications: ["肠鸣", "腹痛", "泄泻", "黄疸", "消渴"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.14, -0.10]
  },
  {
    id: "BL49", name: "意舍", pinyin: "yì shè", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第11胸椎棘突下，旁开3寸",
    indications: ["腹胀", "肠鸣", "泄泻", "呕吐", "饮食不下", "背痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.11, -0.10]
  },
  {
    id: "BL50", name: "胃仓", pinyin: "wèi cāng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当第12胸椎棘突下，旁开3寸",
    indications: ["胃脘痛", "腹胀", "小儿食积", "水肿", "背脊痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.08, -0.10]
  },
  {
    id: "BL51", name: "肓门", pinyin: "huāng mén", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腰部，当第1腰椎棘突下，旁开3寸",
    indications: ["腹痛", "便秘", "痞块", "乳疾", "腰痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.08, 0.05, -0.10]
  },
  {
    id: "BL52", name: "志室", pinyin: "zhì shì", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腰部，当第2腰椎棘突下，旁开3寸",
    indications: ["遗精", "阳痿", "阴痛", "小便不利", "水肿", "腰脊强痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.08, 0.02, -0.10]
  },
  {
    id: "BL53", name: "胞肓", pinyin: "bāo huāng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臀部，平第2骶后孔，骶正中嵴旁开3寸",
    indications: ["肠鸣", "腹胀", "腰脊痛", "小便不利", "阴部肿痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.08, -0.13, -0.09]
  },
  {
    id: "BL54", name: "秩边", pinyin: "zhì biān", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臀部，平第4骶后孔，骶正中嵴旁开3寸",
    indications: ["腰骶痛", "下肢痿痹", "小便不利", "便秘", "痔疮", "阴痛"],
    needling: "直刺1.5-3寸",
    coordinates: [-0.08, -0.18, -0.09]
  },
  {
    id: "BL55", name: "合阳", pinyin: "hé yáng", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在小腿后面，当委中与承山的连线上，委中下2寸",
    indications: ["腰脊强痛", "下肢痿痹", "疝气", "崩漏", "阴挺"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.12, -0.52, -0.04]
  },
  {
    id: "BL56", name: "承筋", pinyin: "chéng jīn", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在小腿后面，当委中与承山的连线上，腓肠肌肌腹中央，委中下5寸",
    indications: ["小腿痛", "腰背拘急", "痔疮", "霍乱转筋", "下肢痿痹"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.12, -0.56, -0.04]
  },
  {
    id: "BL57", name: "承山", pinyin: "chéng shān", meridian: "BL", system: "fourteen",
    category: "普通穴",
    locationDesc: "在小腿后面正中，委中与昆仑之间，当伸直小腿或足跟上提时腓肠肌肌腹下出现尖角凹陷处",
    indications: ["腰腿痛", "小腿转筋", "痔疮", "便秘", "脚气", "脱肛", "疝气"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.12, -0.62, -0.04]
  },
  {
    id: "BL58", name: "飞扬", pinyin: "fēi yáng", meridian: "BL", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在小腿后面，当外踝后，昆仑穴直上7寸，承山穴外下方1寸处",
    indications: ["头痛", "目眩", "鼻塞", "鼻衄", "腰背痛", "腿软无力", "痔疮", "癫狂"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.13, -0.58, -0.04]
  },
  {
    id: "BL59", name: "跗阳", pinyin: "fū yáng", meridian: "BL", system: "fourteen",
    category: "特定穴：阳蹻脉郄穴",
    locationDesc: "在小腿后面，外踝后，昆仑穴直上3寸",
    indications: ["头痛", "腰骶痛", "下肢痿痹", "外踝肿痛", "瘫痪"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.12, -0.66, -0.04]
  },
  {
    id: "BL60", name: "昆仑", pinyin: "kūn lún", meridian: "BL", system: "fourteen",
    category: "特定穴：五输穴之经穴；孕妇禁针",
    locationDesc: "在足部外踝后方，当外踝尖与跟腱之间的凹陷处",
    indications: ["头痛", "项强", "目眩", "鼻衄", "癫痫", "难产", "腰背痛", "足跟痛", "脚气"],
    needling: "直刺0.5-0.8寸，孕妇禁针",
    coordinates: [-0.08, -0.78, -0.04]
  },
  {
    id: "BL61", name: "仆参", pinyin: "pú cān", meridian: "BL", system: "fourteen",
    category: "普通穴；足太阳本经",
    locationDesc: "在足外侧部，外踝后下方，昆仑直下，跟骨外侧，赤白肉际处",
    indications: ["下肢痿痹", "足跟痛", "癫痫", "脚气", "膝痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.80, -0.05]
  },
  {
    id: "BL62", name: "申脉", pinyin: "shēn mài", meridian: "BL", system: "fourteen",
    category: "特定穴：八脉交会穴通阳蹻脉",
    locationDesc: "在足外侧部，外踝直下方凹陷中",
    indications: ["癫痫", "癫狂", "头痛", "失眠", "眩晕", "腰腿痛", "项强", "目赤痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.07, -0.80, -0.04]
  },
  {
    id: "BL63", name: "金门", pinyin: "jīn mén", meridian: "BL", system: "fourteen",
    category: "特定穴：郄穴；阳维脉所别属",
    locationDesc: "在足外侧，当外踝前缘直下，骰骨下缘处，申脉前下方",
    indications: ["癫痫", "小儿惊风", "头痛", "腰痛", "下肢痿痹", "外踝痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.82, -0.04]
  },
  {
    id: "BL64", name: "京骨", pinyin: "jīng gǔ", meridian: "BL", system: "fourteen",
    category: "特定穴：原穴",
    locationDesc: "在足外侧，第5跖骨粗隆下方，赤白肉际处",
    indications: ["癫痫", "头痛", "目翳", "项强", "腰腿痛", "膝痛", "脚挛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.84, -0.04]
  },
  {
    id: "BL65", name: "束骨", pinyin: "shù gǔ", meridian: "BL", system: "fourteen",
    category: "特定穴：五输穴之输穴",
    locationDesc: "在足外侧，足小趾本节（第5跖趾关节）的后方，赤白肉际处",
    indications: ["癫痫", "头痛", "项强", "目眩", "腰背痛", "下肢后侧痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.85, -0.04]
  },
  {
    id: "BL66", name: "足通谷", pinyin: "zú tōng gǔ", meridian: "BL", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在足外侧，足小趾本节（第5跖趾关节）的前方，赤白肉际处",
    indications: ["头痛", "项强", "目眩", "鼻衄", "癫痫", "热病"],
    needling: "直刺0.2-0.3寸",
    coordinates: [-0.10, -0.86, -0.04]
  },
  {
    id: "BL67", name: "至阴", pinyin: "zhì yīn", meridian: "BL", system: "fourteen",
    category: "特定穴：五输穴之井穴；足太阳所出",
    locationDesc: "在足小趾外侧，距趾甲角0.1寸",
    indications: ["胎位不正", "难产", "胞衣不下", "头痛", "鼻塞", "鼻衄", "目痛", "足下热"],
    needling: "浅刺0.1寸，胎位不正用灸法",
    coordinates: [-0.10, -0.88, -0.04]
  },
  // ═══════════════════════════════════════════════════════════
  // 8. 足少阴肾经 (KI) - 27穴 - 左腿内侧及胸腹部前正中线旁开0.5寸
  // ═══════════════════════════════════════════════════════════
  {
    id: "KI1", name: "涌泉", pinyin: "yǒng quán", meridian: "KI", system: "fourteen",
    category: "特定穴：五输穴之井穴；回阳九穴之一",
    locationDesc: "在足底部，卷足时足前部凹陷处，约当足底第2、3跖趾缝纹头端与足跟连线的前1/3与后2/3交点上",
    indications: ["昏厥", "癫痫", "头痛", "头晕", "咯血", "咽喉肿痛", "大便难", "小便不利", "足心热"],
    needling: "直刺0.5-0.8寸，临床常用灸法或按摩",
    coordinates: [0.00, -0.88, 0.15]
  },
  {
    id: "KI2", name: "然谷", pinyin: "rán gǔ", meridian: "KI", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在足内侧缘，足舟骨粗隆下方，赤白肉际",
    indications: ["月经不调", "阴挺", "阴痒", "遗精", "消渴", "泄泻", "咳血", "小儿脐风"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.05, -0.85, 0.02]
  },
  {
    id: "KI3", name: "太溪", pinyin: "tài xī", meridian: "KI", system: "fourteen",
    category: "特定穴：五输穴之输穴；原穴",
    locationDesc: "在足内侧，内踝后方，当内踝尖与跟腱之间的凹陷处",
    indications: ["头痛", "目眩", "咽喉肿痛", "齿痛", "耳聋", "耳鸣", "咳嗽", "气喘", "消渴", "月经不调", "失眠", "健忘", "遗精", "阳痿"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.05, -0.78, -0.03]
  },
  {
    id: "KI4", name: "大钟", pinyin: "dà zhōng", meridian: "KI", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在足内侧，内踝后下方，当跟腱附着部的内侧前方凹陷处，太溪下0.5寸稍后",
    indications: ["癃闭", "遗尿", "便秘", "咳血", "气喘", "痴呆", "足跟痛", "腰脊强痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.06, -0.80, -0.03]
  },
  {
    id: "KI5", name: "水泉", pinyin: "shuǐ quán", meridian: "KI", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在足内侧，内踝后下方，当太溪直下1寸，跟骨结节的内侧凹陷处",
    indications: ["月经不调", "痛经", "阴挺", "小便不利", "目昏花", "踝关节痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.05, -0.80, -0.02]
  },
  {
    id: "KI6", name: "照海", pinyin: "zhào hǎi", meridian: "KI", system: "fourteen",
    category: "特定穴：八脉交会穴通阴蹻脉",
    locationDesc: "在足内侧，内踝尖直下凹陷处",
    indications: ["咽喉干燥", "失眠", "癫痫", "嗜卧", "惊恐不宁", "目赤肿痛", "月经不调", "痛经", "赤白带下", "阴挺", "阴痒", "小便频数"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.04, -0.80, 0.00]
  },
  {
    id: "KI7", name: "复溜", pinyin: "fù liū", meridian: "KI", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在小腿内侧，太溪直上2寸，跟腱的前方",
    indications: ["水肿", "腹胀", "泄泻", "盗汗", "热病汗不出", "下肢痿痹", "腰脊强痛"],
    needling: "直刺0.6-1寸",
    coordinates: [-0.07, -0.70, -0.02]
  },
  {
    id: "KI8", name: "交信", pinyin: "jiāo xìn", meridian: "KI", system: "fourteen",
    category: "特定穴：阴蹻脉郄穴",
    locationDesc: "在小腿内侧，当太溪直上2寸，复溜前0.5寸，胫骨内侧缘的后方",
    indications: ["月经不调", "崩漏", "阴挺", "泄泻", "便秘", "睾丸肿痛", "痢疾"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.07, -0.70, 0.00]
  },
  {
    id: "KI9", name: "筑宾", pinyin: "zhù bīn", meridian: "KI", system: "fourteen",
    category: "特定穴：阴维脉郄穴",
    locationDesc: "在小腿内侧，当太溪与阴谷的连线上，太溪上5寸，腓肠肌肌腹的内下方",
    indications: ["癫狂", "癫痫", "呕吐", "疝气", "小腿内侧痛", "脚软无力"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.08, -0.58, -0.02]
  },
  {
    id: "KI10", name: "阴谷", pinyin: "yīn gǔ", meridian: "KI", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在腘窝内侧，屈膝时，当半腱肌肌腱与半膜肌肌腱之间",
    indications: ["阳痿", "疝气", "月经不调", "崩漏", "小便难", "阴中痛", "癫狂", "膝股内侧痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.10, -0.48, -0.02]
  },
  {
    id: "KI11", name: "横骨", pinyin: "héng gǔ", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在下腹部，当脐中下5寸，前正中线旁开0.5寸",
    indications: ["少腹胀痛", "小便不利", "遗尿", "遗精", "阳痿", "疝气", "阴痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.02, -0.15, 0.08]
  },
  {
    id: "KI12", name: "大赫", pinyin: "dà hè", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在下腹部，当脐中下4寸，前正中线旁开0.5寸",
    indications: ["遗精", "阳痿", "阴挺", "带下", "月经不调", "痛经", "不孕"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.02, -0.12, 0.08]
  },
  {
    id: "KI13", name: "气穴", pinyin: "qì xué", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在下腹部，当脐中下3寸，前正中线旁开0.5寸",
    indications: ["月经不调", "痛经", "不孕", "泄泻", "痢疾", "小便不利", "腰脊痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.02, -0.09, 0.08]
  },
  {
    id: "KI14", name: "四满", pinyin: "sì mǎn", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在下腹部，当脐中下2寸，前正中线旁开0.5寸",
    indications: ["月经不调", "痛经", "产后腹痛", "遗精", "遗尿", "疝气", "便秘", "水肿"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.02, -0.06, 0.08]
  },
  {
    id: "KI15", name: "中注", pinyin: "zhōng zhù", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在下腹部，当脐中下1寸，前正中线旁开0.5寸",
    indications: ["月经不调", "腹痛", "便秘", "泄泻", "痢疾", "腰脊疼痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.02, -0.03, 0.08]
  },
  {
    id: "KI16", name: "肓俞", pinyin: "huāng shū", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在腹中部，当脐中旁开0.5寸",
    indications: ["腹痛", "腹胀", "呕吐", "便秘", "泄泻", "疝气", "月经不调", "腰脊痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.02, 0.00, 0.08]
  },
  {
    id: "KI17", name: "商曲", pinyin: "shāng qū", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在上腹部，当脐中上2寸，前正中线旁开0.5寸",
    indications: ["腹痛", "泄泻", "便秘", "腹中积聚", "食欲不振"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.02, 0.05, 0.08]
  },
  {
    id: "KI18", name: "石关", pinyin: "shí guān", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在上腹部，当脐中上3寸，前正中线旁开0.5寸",
    indications: ["呕吐", "腹痛", "便秘", "产后腹痛", "不孕", "痛经", "胃痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.02, 0.08, 0.08]
  },
  {
    id: "KI19", name: "阴都", pinyin: "yīn dū", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在上腹部，当脐中上4寸，前正中线旁开0.5寸",
    indications: ["腹胀", "腹痛", "便秘", "不孕", "疟疾", "心下烦闷"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.02, 0.11, 0.08]
  },
  {
    id: "KI20", name: "腹通谷", pinyin: "fù tōng gǔ", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在上腹部，当脐中上5寸，前正中线旁开0.5寸",
    indications: ["腹痛", "腹胀", "呕吐", "消化不良", "心痛", "胸胁痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.02, 0.14, 0.08]
  },
  {
    id: "KI21", name: "幽门", pinyin: "yōu mén", meridian: "KI", system: "fourteen",
    category: "普通穴；冲脉足少阴之会",
    locationDesc: "在上腹部，当脐中上6寸，前正中线旁开0.5寸",
    indications: ["腹痛", "腹胀", "呕吐", "消化不良", "泄泻", "痢疾"],
    needling: "直刺0.5-0.8寸，不可深刺",
    coordinates: [-0.02, 0.17, 0.08]
  },
  {
    id: "KI22", name: "步廊", pinyin: "bù láng", meridian: "KI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第5肋间隙，前正中线旁开2寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "呕吐", "食欲不振"],
    needling: "斜刺或平刺0.5-0.8寸，不可深刺",
    coordinates: [-0.06, 0.26, 0.08]
  },
  {
    id: "KI23", name: "神封", pinyin: "shén fēng", meridian: "KI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第4肋间隙，前正中线旁开2寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "乳痈", "呕吐", "食欲不振"],
    needling: "斜刺或平刺0.5-0.8寸，不可深刺",
    coordinates: [-0.06, 0.29, 0.08]
  },
  {
    id: "KI24", name: "灵墟", pinyin: "líng xū", meridian: "KI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第3肋间隙，前正中线旁开2寸",
    indications: ["咳嗽", "气喘", "胸胁胀痛", "乳痈", "呕吐", "食欲不振"],
    needling: "斜刺或平刺0.5-0.8寸，不可深刺",
    coordinates: [-0.06, 0.32, 0.08]
  },
  {
    id: "KI25", name: "神藏", pinyin: "shén cáng", meridian: "KI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第2肋间隙，前正中线旁开2寸",
    indications: ["咳嗽", "气喘", "胸痛", "胸闷", "呕吐", "食欲不振"],
    needling: "斜刺或平刺0.5-0.8寸，不可深刺",
    coordinates: [-0.06, 0.35, 0.08]
  },
  {
    id: "KI26", name: "彧中", pinyin: "yù zhōng", meridian: "KI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当第1肋间隙，前正中线旁开2寸",
    indications: ["咳嗽", "气喘", "胸胁胀满", "痰壅", "食欲不振"],
    needling: "斜刺或平刺0.5-0.8寸，不可深刺",
    coordinates: [-0.06, 0.38, 0.08]
  },
  {
    id: "KI27", name: "俞府", pinyin: "shū fǔ", meridian: "KI", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当锁骨下缘，前正中线旁开2寸",
    indications: ["咳嗽", "气喘", "胸痛", "腹胀", "呕吐", "食欲不振"],
    needling: "斜刺或平刺0.5-0.8寸，不可深刺",
    coordinates: [-0.06, 0.42, 0.08]
  },
  // ═══════════════════════════════════════════════════════════
  // 9. 手厥阴心包经 (PC) - 9穴 - 左臂内侧中线
  // ═══════════════════════════════════════════════════════════
  {
    id: "PC1", name: "天池", pinyin: "tiān chí", meridian: "PC", system: "fourteen",
    category: "普通穴；手足厥阴少阳之会",
    locationDesc: "在胸部，当第4肋间隙，乳头外1寸，前正中线旁开5寸",
    indications: ["胸闷", "心烦", "咳嗽", "气喘", "胸痛", "腋下肿痛", "瘰疬", "乳痈"],
    needling: "斜刺或平刺0.3-0.5寸，不可深刺",
    coordinates: [-0.12, 0.29, 0.08]
  },
  {
    id: "PC2", name: "天泉", pinyin: "tiān quán", meridian: "PC", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂内侧，当腋前纹头下2寸，肱二头肌的长、短头之间",
    indications: ["心痛", "咳嗽", "胸胁胀满", "上臂内侧痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.18, 0.32, 0.05]
  },
  {
    id: "PC3", name: "曲泽", pinyin: "qū zé", meridian: "PC", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在肘横纹中，当肱二头肌腱的尺侧缘凹陷处",
    indications: ["心痛", "心悸", "胃痛", "呕吐", "泄泻", "热病", "烦躁", "肘臂挛痛"],
    needling: "直刺0.8-1寸，或点刺出血",
    coordinates: [-0.20, 0.22, 0.05]
  },
  {
    id: "PC4", name: "郄门", pinyin: "xì mén", meridian: "PC", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在前臂掌侧，当曲泽与大陵的连线上，腕横纹上5寸",
    indications: ["心痛", "心悸", "疔疮", "癫痫", "胸痛", "呕血", "咳血"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.12, 0.05]
  },
  {
    id: "PC5", name: "间使", pinyin: "jiān shǐ", meridian: "PC", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在前臂掌侧，当曲泽与大陵的连线上，腕横纹上3寸，掌长肌腱与桡侧腕屈肌腱之间",
    indications: ["心痛", "心悸", "胃痛", "呕吐", "热病", "烦躁", "癫痫", "疟疾", "肘臂挛痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.08, 0.05]
  },
  {
    id: "PC6", name: "内关", pinyin: "nèi guān", meridian: "PC", system: "fourteen",
    category: "特定穴：络穴；八脉交会穴通阴维脉",
    locationDesc: "在前臂掌侧，当曲泽与大陵的连线上，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间",
    indications: ["心痛", "心悸", "胸闷", "胃痛", "呕吐", "呃逆", "失眠", "癫痫", "眩晕", "中风", "偏头痛", "上肢痹痛", "产后血晕"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.06, 0.05]
  },
  {
    id: "PC7", name: "大陵", pinyin: "dà líng", meridian: "PC", system: "fourteen",
    category: "特定穴：五输穴之输穴；原穴",
    locationDesc: "在腕掌横纹的中点处，当掌长肌腱与桡侧腕屈肌腱之间",
    indications: ["心痛", "心悸", "胃痛", "呕吐", "癫狂", "痫症", "疮疡", "失眠", "手腕麻痛", "胸胁痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.20, 0.04, 0.05]
  },
  {
    id: "PC8", name: "劳宫", pinyin: "láo gōng", meridian: "PC", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在手掌心，当第2、3掌骨之间偏于第3掌骨，握拳屈指时中指尖处",
    indications: ["中风昏迷", "中暑", "心痛", "癫狂", "痫症", "口疮", "口臭", "鹅掌风", "小儿惊厥"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.22, -0.02, 0.05]
  },
  {
    id: "PC9", name: "中冲", pinyin: "zhōng chōng", meridian: "PC", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在手中指末节尖端中央",
    indications: ["中风昏迷", "舌强不语", "中暑", "昏厥", "小儿惊风", "热病", "心痛", "耳鸣"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.24, -0.10, 0.05]
  },
  // ═══════════════════════════════════════════════════════════
  // 10. 手少阳三焦经 (TE) - 23穴 - 左臂外侧中线及头侧部
  // ═══════════════════════════════════════════════════════════
  {
    id: "TE1", name: "关冲", pinyin: "guān chōng", meridian: "TE", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在手环指末节尺侧，距指甲角0.1寸",
    indications: ["头痛", "目赤", "耳聋", "耳鸣", "咽喉肿痛", "热病", "中暑", "昏厥"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.24, -0.10, 0.05]
  },
  {
    id: "TE2", name: "液门", pinyin: "yè mén", meridian: "TE", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在手背部，当第4、5指间，指蹼缘后方赤白肉际处",
    indications: ["头痛", "目赤", "耳聋", "耳鸣", "咽喉肿痛", "疟疾", "手臂痛", "手指拘挛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.22, -0.02, 0.05]
  },
  {
    id: "TE3", name: "中渚", pinyin: "zhōng zhǔ", meridian: "TE", system: "fourteen",
    category: "特定穴：五输穴之输穴",
    locationDesc: "在手背部，当环指本节（掌指关节）的后方，第4、5掌骨间凹陷处",
    indications: ["头痛", "目赤", "耳聋", "耳鸣", "咽喉肿痛", "热病", "肩背肘臂酸痛", "手指不能屈伸"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.21, 0.00, 0.05]
  },
  {
    id: "TE4", name: "阳池", pinyin: "yáng chí", meridian: "TE", system: "fourteen",
    category: "特定穴：原穴",
    locationDesc: "在腕背横纹中，当指伸肌腱的尺侧缘凹陷处",
    indications: ["腕痛", "肩背痛", "耳聋", "疟疾", "消渴", "口干", "咽喉肿痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.20, 0.04, 0.05]
  },
  {
    id: "TE5", name: "外关", pinyin: "wài guān", meridian: "TE", system: "fourteen",
    category: "特定穴：络穴；八脉交会穴通阳维脉",
    locationDesc: "在前臂背侧，当阳池与肘尖的连线上，腕背横纹上2寸，尺骨与桡骨之间",
    indications: ["热病", "头痛", "颊痛", "目赤肿痛", "耳聋", "耳鸣", "肩背痛", "肘臂屈伸不利", "手指疼痛", "手颤", "胁肋痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.08, 0.05]
  },
  {
    id: "TE6", name: "支沟", pinyin: "zhī gōu", meridian: "TE", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在前臂背侧，当阳池与肘尖的连线上，腕背横纹上3寸，尺骨与桡骨之间",
    indications: ["便秘", "热病", "胁肋痛", "肩背痛", "耳聋", "耳鸣", "暴喑", "瘰疬", "产后血晕"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.12, 0.05]
  },
  {
    id: "TE7", name: "会宗", pinyin: "huì zōng", meridian: "TE", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在前臂背侧，当腕背横纹上3寸，支沟尺侧，尺骨的桡侧缘",
    indications: ["耳聋", "癫痫", "上肢肌肤痛", "喘满"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.21, 0.12, 0.05]
  },
  {
    id: "TE8", name: "三阳络", pinyin: "sān yáng luò", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在前臂背侧，当腕背横纹上4寸，支沟尺侧，尺骨与桡骨之间",
    indications: ["耳聋", "暴喑", "齿痛", "上肢痹痛", "挫闪腰痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.16, 0.05]
  },
  {
    id: "TE9", name: "四渎", pinyin: "sì dú", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在前臂背侧，当阳池与肘尖的连线上，肘尖下5寸，尺骨与桡骨之间",
    indications: ["耳聋", "暴喑", "齿痛", "咽阻", "呼吸气短", "上肢痹痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.18, 0.05]
  },
  {
    id: "TE10", name: "天井", pinyin: "tiān jǐng", meridian: "TE", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在臂外侧，屈肘时，当肘尖直上1寸凹陷处",
    indications: ["偏头痛", "癫痫", "瘰疬", "肘臂痛", "耳聋", "咽喉肿痛", "颈项肩臂痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.22, 0.05]
  },
  {
    id: "TE11", name: "清冷渊", pinyin: "qīng lěng yuān", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂外侧，屈肘，当肘尖直上2寸，即天井上1寸",
    indications: ["头痛", "目黄", "肩臂痛", "上肢不遂", "胁痛"],
    needling: "直刺0.5-1寸",
    coordinates: [-0.20, 0.26, 0.05]
  },
  {
    id: "TE12", name: "消泺", pinyin: "xiāo luò", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在臂外侧，当清冷渊与臑会连线的中点处",
    indications: ["头痛", "项强", "肩臂痛", "齿痛", "癫痫"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.20, 0.32, 0.05]
  },
  {
    id: "TE13", name: "臑会", pinyin: "nào huì", meridian: "TE", system: "fourteen",
    category: "普通穴；手阳明少阳络之会",
    locationDesc: "在臂外侧，当肘尖与肩髎的连线上，肩髎下3寸，三角肌的后下缘",
    indications: ["肩臂痛", "瘿气", "瘰疬", "目疾", "上肢痿痹"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.20, 0.36, 0.05]
  },
  {
    id: "TE14", name: "肩髎", pinyin: "jiān liáo", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在肩部，肩髎后方，当臂外展时，于肩峰后下方呈现凹陷处",
    indications: ["肩重不举", "肩臂痛", "上肢痿痹", "中风瘫痪"],
    needling: "直刺0.8-1.2寸，或向背透刺",
    coordinates: [-0.18, 0.42, 0.00]
  },
  {
    id: "TE15", name: "天髎", pinyin: "tiān liáo", meridian: "TE", system: "fourteen",
    category: "普通穴；手足少阳阳维之会",
    locationDesc: "在肩胛部，肩井与曲垣的中间，当肩胛骨上角处",
    indications: ["肩臂痛", "颈项强急", "胸中烦满", "缺盆中痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.10, 0.44, -0.05]
  },
  {
    id: "TE16", name: "天牖", pinyin: "tiān yǒu", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在颈侧部，当乳突的后方直下，平下颌角，胸锁乳突肌的后缘",
    indications: ["头痛", "目痛", "耳聋", "耳鸣", "瘰疬", "项强", "面肿", "目眩"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.08, 0.52, -0.05]
  },
  {
    id: "TE17", name: "翳风", pinyin: "yì fēng", meridian: "TE", system: "fourteen",
    category: "普通穴；手足少阳之会",
    locationDesc: "在耳垂后方，当乳突与下颌骨边缘的凹陷中",
    indications: ["口眼歪斜", "牙关紧闭", "颊肿", "耳鸣", "耳聋", "瘰疬", "面瘫", "三叉神经痛"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.07, 0.58, -0.02]
  },
  {
    id: "TE18", name: "瘈脉", pinyin: "chì mài", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，耳后乳突中央，当角孙至翳风之间，沿耳轮连线的中、下1/3的交点处",
    indications: ["头痛", "耳聋", "耳鸣", "小儿惊风", "癫痫", "呕吐", "泄泻"],
    needling: "平刺0.3-0.5寸，或点刺出血",
    coordinates: [-0.07, 0.62, -0.05]
  },
  {
    id: "TE19", name: "颅息", pinyin: "lú xī", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当角孙至翳风之间，沿耳轮连线的上、中1/3的交点处",
    indications: ["头痛", "耳聋", "耳鸣", "小儿惊风", "癫痫", "视网膜出血"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.08, 0.66, -0.05]
  },
  {
    id: "TE20", name: "角孙", pinyin: "jiǎo sūn", meridian: "TE", system: "fourteen",
    category: "普通穴；手足少阳之会",
    locationDesc: "在头部，折耳廓向前，当耳尖直上入发际处",
    indications: ["耳部肿痛", "目赤肿痛", "齿痛", "头痛", "项强", "痄腮"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.08, 0.70, -0.05]
  },
  {
    id: "TE21", name: "耳门", pinyin: "ěr mén", meridian: "TE", system: "fourteen",
    category: "普通穴",
    locationDesc: "在面部，当耳屏上切迹的前方，下颌骨髁状突后缘，张口有凹陷处",
    indications: ["耳聋", "耳鸣", "聤耳", "齿痛", "颈颔痛", "唇吻强"],
    needling: "微张口，直刺0.5-1寸",
    coordinates: [-0.07, 0.66, 0.02]
  },
  {
    id: "TE22", name: "耳和髎", pinyin: "ěr hé liáo", meridian: "TE", system: "fourteen",
    category: "普通穴；手足少阳手太阳之会",
    locationDesc: "在头侧部，当鬓发后缘，平耳廓根之前方，颞浅动脉的后缘",
    indications: ["头痛", "耳鸣", "牙关拘急", "口歪", "面颊肿", "鼻准肿痛"],
    needling: "斜刺或平刺0.3-0.5寸，避开动脉",
    coordinates: [-0.08, 0.68, 0.02]
  },
  {
    id: "TE23", name: "丝竹空", pinyin: "sī zhú kōng", meridian: "TE", system: "fourteen",
    category: "普通穴；足少阳脉气所发",
    locationDesc: "在面部，当眉梢凹陷处",
    indications: ["头痛", "目眩", "目赤痛", "眼睑瞤动", "癫痫", "齿痛", "面瘫"],
    needling: "平刺0.5-1寸，禁灸",
    coordinates: [-0.06, 0.72, 0.05]
  },
  // ═══════════════════════════════════════════════════════════
  // 11. 足少阳胆经 (GB) - 44穴 - 左侧头颞、身侧及下肢外侧
  // ═══════════════════════════════════════════════════════════
  {
    id: "GB1", name: "瞳子髎", pinyin: "tóng zǐ liáo", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳手太阳之会",
    locationDesc: "在面部，目外眦旁，当眶外侧缘处",
    indications: ["头痛", "目赤肿痛", "迎风流泪", "远视不明", "内障", "目翳", "面瘫"],
    needling: "平刺0.3-0.5寸，或点刺出血，禁灸",
    coordinates: [-0.05, 0.70, 0.05]
  },
  {
    id: "GB2", name: "听会", pinyin: "tīng huì", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在面部，当耳屏间切迹的前方，下颌骨髁状突的后缘，张口有凹陷处",
    indications: ["耳鸣", "耳聋", "聤耳", "齿痛", "面瘫", "下颌脱臼", "腮肿"],
    needling: "微张口，直刺0.5-0.8寸",
    coordinates: [-0.07, 0.64, 0.02]
  },
  {
    id: "GB3", name: "上关", pinyin: "shàng guān", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳足阳明之会",
    locationDesc: "在耳前，下关直上，当颧弓的上缘凹陷处",
    indications: ["头痛", "耳鸣", "耳聋", "聤耳", "口眼歪斜", "齿痛", "面瘫", "惊痫"],
    needling: "直刺0.5-0.8寸，禁深刺",
    coordinates: [-0.07, 0.66, 0.03]
  },
  {
    id: "GB4", name: "颔厌", pinyin: "hàn yàn", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳足阳明之会",
    locationDesc: "在头部鬓发上，当头维与曲鬓弧形连线的上1/4与下3/4的交点处",
    indications: ["偏头痛", "眩晕", "癫痫", "齿痛", "耳鸣", "目眩"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.08, 0.74, 0.00]
  },
  {
    id: "GB5", name: "悬颅", pinyin: "xuán lú", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部鬓发上，当头维与曲鬓弧形连线的中点处",
    indications: ["偏头痛", "面肿", "目外眦痛", "齿痛", "鼽衄", "癫痫"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.09, 0.76, -0.02]
  },
  {
    id: "GB6", name: "悬厘", pinyin: "xuán lí", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳足阳明之会",
    locationDesc: "在头部鬓发上，当头维与曲鬓弧形连线的上3/4与下1/4的交点处",
    indications: ["偏头痛", "面肿", "目外眦痛", "耳鸣", "癫痫", "热病汗不出"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.09, 0.74, -0.03]
  },
  {
    id: "GB7", name: "曲鬓", pinyin: "qǔ bìn", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在头部，当耳前鬓角后缘的垂线与耳尖水平线交点处",
    indications: ["偏头痛", "颔颊肿痛", "牙关紧闭", "颈项强急", "呕吐"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.09, 0.72, -0.04]
  },
  {
    id: "GB8", name: "率谷", pinyin: "shuài gǔ", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在头部，当耳尖直上入发际1.5寸，角孙直上方",
    indications: ["偏头痛", "眩晕", "呕吐", "小儿惊风", "癫痫"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.10, 0.78, -0.05]
  },
  {
    id: "GB9", name: "天冲", pinyin: "tiān chōng", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在头部，当耳根后缘直上入发际2寸，率谷后0.5寸处",
    indications: ["头痛", "癫痫", "牙龈肿痛", "惊恐", "瘿气"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.11, 0.80, -0.06]
  },
  {
    id: "GB10", name: "浮白", pinyin: "fú bái", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在头部，当耳后乳突的后上方，天冲与完骨的弧形连线的中1/3与上1/3交点处",
    indications: ["头痛", "颈项强痛", "耳鸣", "耳聋", "齿痛", "瘰疬", "瘿气", "喉痹"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.11, 0.78, -0.07]
  },
  {
    id: "GB11", name: "头窍阴", pinyin: "tóu qiào yīn", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在头部，当耳后乳突的后上方，天冲与完骨的中1/3与下1/3交点处",
    indications: ["头痛", "眩晕", "颈项强痛", "耳鸣", "耳聋", "癫痫", "口苦", "舌强"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.10, 0.74, -0.07]
  },
  {
    id: "GB12", name: "完骨", pinyin: "wán gǔ", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在头部，当耳后乳突的后下方凹陷处",
    indications: ["头痛", "颈项强痛", "失眠", "癫痫", "口眼歪斜", "喉痹", "齿痛", "颊肿"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.09, 0.68, -0.07]
  },
  {
    id: "GB13", name: "本神", pinyin: "běn shén", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳阳维之会",
    locationDesc: "在头部，当前发际上0.5寸，神庭旁开3寸，神庭与头维连线的内2/3与外1/3的交点处",
    indications: ["头痛", "目眩", "癫痫", "小儿惊风", "颈项强痛", "胸胁痛", "中风昏迷"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.07, 0.78, 0.03]
  },
  {
    id: "GB14", name: "阳白", pinyin: "yáng bái", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳阳明之会",
    locationDesc: "在前额部，当瞳孔直上，眉上1寸",
    indications: ["头痛", "目眩", "目痛", "眼睑瞤动", "面瘫", "近视", "三叉神经痛"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.04, 0.74, 0.06]
  },
  {
    id: "GB15", name: "头临泣", pinyin: "tóu lín qì", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳太阳之会",
    locationDesc: "在头部，当瞳孔直上，入前发际0.5寸，神庭与头维连线的中点处",
    indications: ["头痛", "目眩", "目赤痛", "流泪", "鼻塞", "鼻渊", "小儿惊风", "癫痫"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.05, 0.78, 0.05]
  },
  {
    id: "GB16", name: "目窗", pinyin: "mù chuāng", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳阳维之会",
    locationDesc: "在头部，当前发际上1.5寸，头正中线旁开2.25寸",
    indications: ["头痛", "目眩", "目赤肿痛", "远视不明", "面浮肿", "癫痫", "上齿龋痛"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.06, 0.80, 0.02]
  },
  {
    id: "GB17", name: "正营", pinyin: "zhèng yíng", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳阳维之会",
    locationDesc: "在头部，当前发际上2.5寸，头正中线旁开2.25寸",
    indications: ["头痛", "头晕", "目眩", "齿痛", "唇吻强急"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.07, 0.80, 0.00]
  },
  {
    id: "GB18", name: "承灵", pinyin: "chéng líng", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳阳维之会",
    locationDesc: "在头部，当前发际上4寸，头正中线旁开2.25寸",
    indications: ["头痛", "眩晕", "目痛", "鼻塞", "鼻渊", "鼽衄", "喘息", "发热"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.08, 0.80, -0.02]
  },
  {
    id: "GB19", name: "脑空", pinyin: "nǎo kōng", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳阳维之会",
    locationDesc: "在头部，当脑户旁开2.25寸，枕外隆凸的上缘外侧",
    indications: ["头痛", "眩晕", "颈项强痛", "癫痫", "惊悸", "心慌", "耳鸣", "鼻痛"],
    needling: "平刺0.3-0.5寸",
    coordinates: [-0.09, 0.78, -0.04]
  },
  {
    id: "GB20", name: "风池", pinyin: "fēng chí", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳阳维之会",
    locationDesc: "在项部，当枕骨之下，与风府相平，胸锁乳突肌与斜方肌上端之间的凹陷处",
    indications: ["头痛", "眩晕", "颈项强痛", "感冒", "目赤肿痛", "鼻塞", "鼻渊", "耳鸣", "中风", "癫痫", "热病", "失眠", "高血压"],
    needling: "向鼻尖方向斜刺0.5-0.8寸，不可深刺",
    coordinates: [-0.05, 0.62, -0.06]
  },
  {
    id: "GB21", name: "肩井", pinyin: "jiān jǐng", meridian: "GB", system: "fourteen",
    category: "普通穴；手足少阳阳维之会；孕妇禁针",
    locationDesc: "在肩上，前直乳中，当大椎与肩峰端连线的中点处",
    indications: ["肩背痛", "颈项强痛", "上肢不遂", "难产", "乳痈", "乳汁不下", "瘰疬", "中风", "高血压"],
    needling: "直刺0.3-0.5寸，不可深刺，孕妇禁针",
    coordinates: [-0.12, 0.44, -0.05]
  },
  {
    id: "GB22", name: "渊腋", pinyin: "yuān yè", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在侧胸部，举臂，当腋中线上，腋下3寸，第4肋间隙中",
    indications: ["胸满", "胁痛", "腋下肿", "臂痛不举", "咳嗽", "气喘"],
    needling: "斜刺0.3-0.5寸，不可深刺",
    coordinates: [-0.14, 0.29, 0.05]
  },
  {
    id: "GB23", name: "辄筋", pinyin: "zhé jīn", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在侧胸部，渊腋前1寸，当第4肋间隙中",
    indications: ["胸胁痛", "气喘", "腋肿", "呕吐", "吞酸", "肩臂痛"],
    needling: "斜刺0.3-0.5寸，不可深刺",
    coordinates: [-0.13, 0.29, 0.06]
  },
  {
    id: "GB24", name: "日月", pinyin: "rì yuè", meridian: "GB", system: "fourteen",
    category: "特定穴：胆募穴；足太阴少阳之会",
    locationDesc: "在上腹部，当乳头直下，第7肋间隙，前正中线旁开4寸",
    indications: ["黄疸", "胁肋疼痛", "胃脘痛", "呕吐", "吞酸", "呃逆", "腹胀", "疝气"],
    needling: "斜刺0.3-0.5寸，不可深刺",
    coordinates: [-0.10, 0.14, 0.08]
  },
  {
    id: "GB25", name: "京门", pinyin: "jīng mén", meridian: "GB", system: "fourteen",
    category: "特定穴：肾募穴",
    locationDesc: "在侧腰部，章门后1.8寸，当第12肋骨游离端的下方",
    indications: ["小便不利", "水肿", "腰痛", "胁痛", "腹胀", "泄泻", "肠鸣"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.14, 0.05, -0.05]
  },
  {
    id: "GB26", name: "带脉", pinyin: "dài mài", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳带脉之会",
    locationDesc: "在侧腹部，章门下1.8寸，当第11肋骨游离端下方垂线与脐水平线的交点上",
    indications: ["月经不调", "赤白带下", "闭经", "痛经", "腰胁痛", "疝气", "小腹痛", "子宫脱垂"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.12, 0.00, 0.06]
  },
  {
    id: "GB27", name: "五枢", pinyin: "wǔ shū", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳带脉之会",
    locationDesc: "在侧腹部，当髂前上棘的前方，横平脐下3寸处",
    indications: ["月经不调", "赤白带下", "腹痛", "疝气", "腰胯痛", "便秘"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.12, -0.07, 0.05]
  },
  {
    id: "GB28", name: "维道", pinyin: "wéi dào", meridian: "GB", system: "fourteen",
    category: "普通穴；足少阳带脉之会",
    locationDesc: "在侧腹部，当髂前上棘的前下方，五枢前下0.5寸",
    indications: ["月经不调", "赤白带下", "阴挺", "少腹痛", "疝气", "腰胯痛", "水肿"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.11, -0.10, 0.05]
  },
  {
    id: "GB29", name: "居髎", pinyin: "jū liáo", meridian: "GB", system: "fourteen",
    category: "普通穴；阳蹻足少阳之会",
    locationDesc: "在髋部，当髂前上棘与股骨大转子最凸点连线的中点处",
    indications: ["腰腿痹痛", "瘫痪", "足痿", "疝气", "下腹痛"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.14, -0.15, 0.04]
  },
  {
    id: "GB30", name: "环跳", pinyin: "huán tiào", meridian: "GB", system: "fourteen",
    category: "普通穴；足太阳少阳之会",
    locationDesc: "在股外侧部，侧卧屈股，当股骨大转子最凸点与骶管裂孔连线的外1/3与中1/3的交点处",
    indications: ["腰胯疼痛", "下肢痿痹", "半身不遂", "坐骨神经痛", "遍身风疹", "膝踝肿痛"],
    needling: "直刺2-3寸",
    coordinates: [-0.16, -0.20, -0.05]
  },
  {
    id: "GB31", name: "风市", pinyin: "fēng shì", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿外侧部的中线上，当腘横纹上7寸，或直立垂手时中指尖处",
    indications: ["下肢痿痹", "半身不遂", "遍身瘙痒", "脚气", "荨麻疹", "头痛", "腰腿痛"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.14, -0.30, 0.03]
  },
  {
    id: "GB32", name: "中渎", pinyin: "zhōng dú", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿外侧，当风市下2寸，或腘横纹上5寸，股外侧肌与股二头肌之间",
    indications: ["下肢痿痹", "半身不遂", "腿膝酸痛", "脚气", "筋痹不仁"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.14, -0.35, 0.03]
  },
  {
    id: "GB33", name: "膝阳关", pinyin: "xī yáng guān", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在膝外侧，当阳陵泉上3寸，股骨外上髁上方的凹陷处",
    indications: ["膝膑肿痛", "腘筋挛急", "小腿麻木", "半身不遂", "脚气"],
    needling: "直刺0.8-1寸",
    coordinates: [-0.13, -0.42, 0.03]
  },
  {
    id: "GB34", name: "阳陵泉", pinyin: "yáng líng quán", meridian: "GB", system: "fourteen",
    category: "特定穴：五输穴之合穴；八会穴之筋会；下合穴（胆）",
    locationDesc: "在小腿外侧，当腓骨头前下方凹陷处",
    indications: ["胁痛", "口苦", "呕吐", "黄疸", "膝肿痛", "下肢痿痹", "半身不遂", "小儿惊风", "脚气", "肩痛"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.13, -0.46, 0.03]
  },
  {
    id: "GB35", name: "阳交", pinyin: "yáng jiāo", meridian: "GB", system: "fourteen",
    category: "特定穴：阳维脉郄穴",
    locationDesc: "在小腿外侧，当外踝尖上7寸，腓骨后缘",
    indications: ["胸胁胀满疼痛", "面肿", "癫狂", "癫痫", "惊狂", "膝股痛", "下肢痿痹"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.12, -0.60, 0.02]
  },
  {
    id: "GB36", name: "外丘", pinyin: "wài qiū", meridian: "GB", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在小腿外侧，当外踝尖上7寸，腓骨前缘，平阳交",
    indications: ["癫狂", "胸胁胀满", "颈项强痛", "下肢痿痹", "脚气", "犬伤毒"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.12, -0.60, 0.03]
  },
  {
    id: "GB37", name: "光明", pinyin: "guāng míng", meridian: "GB", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在小腿外侧，当外踝尖上5寸，腓骨前缘",
    indications: ["目痛", "夜盲", "目视不明", "近视", "白内障", "乳胀痛", "下肢痿痹", "膝痛", "颊肿"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.12, -0.65, 0.03]
  },
  {
    id: "GB38", name: "阳辅", pinyin: "yáng fǔ", meridian: "GB", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在小腿外侧，当外踝尖上4寸，腓骨前缘稍前方",
    indications: ["偏头痛", "目外眦痛", "腋下肿痛", "瘰疬", "腰痛", "胸胁痛", "下肢痿痹", "疟疾", "缺盆中痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.12, -0.68, 0.03]
  },
  {
    id: "GB39", name: "悬钟", pinyin: "xuán zhōng", meridian: "GB", system: "fourteen",
    category: "特定穴：八会穴之髓会",
    locationDesc: "在小腿外侧，当外踝尖上3寸，腓骨前缘",
    indications: ["颈项强痛", "胸胁胀痛", "下肢痿痹", "半身不遂", "咽喉肿痛", "脚气", "痔血", "腋下肿", "落枕"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.12, -0.70, 0.03]
  },
  {
    id: "GB40", name: "丘墟", pinyin: "qiū xū", meridian: "GB", system: "fourteen",
    category: "特定穴：原穴",
    locationDesc: "在足外踝的前下方，当趾长伸肌腱的外侧凹陷处",
    indications: ["胸胁胀痛", "下肢痿痹", "外踝肿痛", "疟疾", "疝气", "目赤肿痛", "目生翳膜", "中风偏瘫"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.10, -0.78, 0.03]
  },
  {
    id: "GB41", name: "足临泣", pinyin: "zú lín qì", meridian: "GB", system: "fourteen",
    category: "特定穴：五输穴之输穴；八脉交会穴通带脉",
    locationDesc: "在足背外侧，当第4、5跖骨结合部前方凹陷处，当小趾伸肌腱的外侧",
    indications: ["偏头痛", "目赤肿痛", "胁肋疼痛", "足跗肿痛", "乳腺炎", "月经不调", "瘰疬", "疟疾", "足趾挛痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.10, -0.84, 0.03]
  },
  {
    id: "GB42", name: "地五会", pinyin: "dì wǔ huì", meridian: "GB", system: "fourteen",
    category: "普通穴",
    locationDesc: "在足背外侧，当足4趾本节（第4跖趾关节）的后方，第4、5跖骨之间，小趾伸肌腱的内侧",
    indications: ["足跗肿痛", "头痛", "目赤痛", "耳鸣", "耳聋", "乳腺炎", "腰痛", "胁痛"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.85, 0.03]
  },
  {
    id: "GB43", name: "侠溪", pinyin: "xiá xī", meridian: "GB", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在足背外侧，当第4、5趾间，趾蹼缘后方赤白肉际处",
    indications: ["头痛", "眩晕", "惊悸", "耳鸣", "耳聋", "目外眦赤痛", "颊肿", "胸胁痛", "膝股痛", "足跗肿痛", "疟疾"],
    needling: "直刺0.3-0.5寸",
    coordinates: [-0.10, -0.86, 0.03]
  },
  {
    id: "GB44", name: "足窍阴", pinyin: "zú qiào yīn", meridian: "GB", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在第4趾末节外侧，距趾甲角0.1寸",
    indications: ["偏头痛", "目眩", "目赤肿痛", "耳鸣", "耳聋", "咽喉肿痛", "胸胁痛", "多梦", "热病", "呃逆"],
    needling: "浅刺0.1寸，或点刺出血",
    coordinates: [-0.10, -0.88, 0.03]
  },
  // ═══════════════════════════════════════════════════════════
  // 12. 足厥阴肝经 (LR) - 14穴 - 左下肢内侧及胸腹部
  // ═══════════════════════════════════════════════════════════
  {
    id: "LR1", name: "大敦", pinyin: "dà dūn", meridian: "LR", system: "fourteen",
    category: "特定穴：五输穴之井穴",
    locationDesc: "在足大趾末节外侧，距趾甲角0.1寸",
    indications: ["疝气", "遗尿", "癃闭", "经闭", "崩漏", "阴挺", "癫痫", "少腹痛", "嗜睡"],
    needling: "浅刺0.1-0.2寸，或点刺出血",
    coordinates: [-0.05, -0.88, 0.05]
  },
  {
    id: "LR2", name: "行间", pinyin: "xíng jiān", meridian: "LR", system: "fourteen",
    category: "特定穴：五输穴之荥穴",
    locationDesc: "在足背侧，当第1、2趾间，趾蹼缘的后方赤白肉际处",
    indications: ["头痛", "眩晕", "目赤肿痛", "青盲", "口歪", "胁痛", "疝气", "小便不利", "月经不调", "痛经", "癫痫", "失眠"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.06, -0.86, 0.05]
  },
  {
    id: "LR3", name: "太冲", pinyin: "tài chōng", meridian: "LR", system: "fourteen",
    category: "特定穴：五输穴之输穴；原穴",
    locationDesc: "在足背侧，当第1、2跖骨结合部前方凹陷处",
    indications: ["头痛", "眩晕", "目赤肿痛", "口苦", "胁痛", "疝气", "遗尿", "癃闭", "月经不调", "癫痫", "小儿惊风", "失眠", "高血压", "下肢痿痹"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.07, -0.84, 0.05]
  },
  {
    id: "LR4", name: "中封", pinyin: "zhōng fēng", meridian: "LR", system: "fourteen",
    category: "特定穴：五输穴之经穴",
    locationDesc: "在足背侧，当足内踝前，商丘与解溪连线之间，胫骨前肌腱的内侧凹陷处",
    indications: ["疝气", "遗精", "小便不利", "腹痛", "黄疸", "踝关节痛", "内踝肿痛"],
    needling: "直刺0.5-0.8寸",
    coordinates: [-0.07, -0.78, 0.04]
  },
  {
    id: "LR5", name: "蠡沟", pinyin: "lí gōu", meridian: "LR", system: "fourteen",
    category: "特定穴：络穴",
    locationDesc: "在小腿内侧，当足内踝尖上5寸，胫骨内侧面的中央",
    indications: ["月经不调", "赤白带下", "阴挺", "阴痒", "疝气", "睾丸肿痛", "小便不利", "足胫痿痹"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.08, -0.65, 0.03]
  },
  {
    id: "LR6", name: "中都", pinyin: "zhōng dū", meridian: "LR", system: "fourteen",
    category: "特定穴：郄穴",
    locationDesc: "在小腿内侧，当足内踝尖上7寸，胫骨内侧面的中央",
    indications: ["疝气", "崩漏", "腹痛", "泄泻", "恶露不尽", "下肢痿痹"],
    needling: "平刺0.5-0.8寸",
    coordinates: [-0.08, -0.60, 0.03]
  },
  {
    id: "LR7", name: "膝关", pinyin: "xī guān", meridian: "LR", system: "fourteen",
    category: "普通穴",
    locationDesc: "在小腿内侧，当胫骨内侧髁的后下方，阴陵泉后1寸，腓肠肌内侧头的上部",
    indications: ["膝膑肿痛", "下肢痿痹", "咽喉肿痛", "寒湿走注", "白虎历节风"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.09, -0.46, 0.02]
  },
  {
    id: "LR8", name: "曲泉", pinyin: "qū quán", meridian: "LR", system: "fourteen",
    category: "特定穴：五输穴之合穴",
    locationDesc: "在膝内侧，屈膝，当膝关节内侧面横纹内侧端，股骨内侧髁的后缘，半腱肌、半膜肌止端的前缘凹陷处",
    indications: ["月经不调", "痛经", "白带", "阴挺", "阴痒", "产后腹痛", "遗精", "阳痿", "疝气", "小便不利", "膝膑肿痛", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.10, -0.46, 0.03]
  },
  {
    id: "LR9", name: "阴包", pinyin: "yīn bāo", meridian: "LR", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿内侧，当股骨内上髁上4寸，股内肌与缝匠肌之间",
    indications: ["月经不调", "遗尿", "小便不利", "腰骶痛引小腹", "下肢痿痹"],
    needling: "直刺1-1.5寸",
    coordinates: [-0.10, -0.35, 0.02]
  },
  {
    id: "LR10", name: "足五里", pinyin: "zú wǔ lǐ", meridian: "LR", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿内侧，当气冲直下3寸，大腿根部，耻骨结节的下方，长收肌的外缘",
    indications: ["少腹胀痛", "小便不通", "阴挺", "睾丸肿痛", "阴囊湿痒", "嗜卧", "瘰疬"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.08, -0.20, 0.04]
  },
  {
    id: "LR11", name: "阴廉", pinyin: "yīn lián", meridian: "LR", system: "fourteen",
    category: "普通穴",
    locationDesc: "在大腿内侧，当气冲直下2寸，大腿根部，耻骨结节的下方，长收肌的外缘",
    indications: ["月经不调", "赤白带下", "少腹疼痛", "股内侧痛", "下肢痿痹"],
    needling: "直刺0.8-1.2寸",
    coordinates: [-0.08, -0.18, 0.04]
  },
  {
    id: "LR12", name: "急脉", pinyin: "jí mài", meridian: "LR", system: "fourteen",
    category: "普通穴",
    locationDesc: "在耻骨结节的外侧，当气冲外下方腹股沟股动脉搏动处，前正中线旁开2.5寸",
    indications: ["疝气", "少腹痛", "阴挺", "阴茎痛", "股内侧痛"],
    needling: "避开动脉，直刺0.5-0.8寸",
    coordinates: [-0.06, -0.15, 0.05]
  },
  {
    id: "LR13", name: "章门", pinyin: "zhāng mén", meridian: "LR", system: "fourteen",
    category: "特定穴：脾募穴；八会穴之脏会；足厥阴少阳之会",
    locationDesc: "在侧腹部，当第11肋游离端的下方",
    indications: ["腹胀", "泄泻", "痞块", "胸胁痛", "黄疸", "呕吐", "消化不良", "小儿疳积", "腰脊痛"],
    needling: "斜刺0.5-0.8寸",
    coordinates: [-0.14, 0.05, 0.06]
  },
  {
    id: "LR14", name: "期门", pinyin: "qī mén", meridian: "LR", system: "fourteen",
    category: "特定穴：肝募穴；足厥阴太阴之会",
    locationDesc: "在胸部，当乳头直下，第6肋间隙，前正中线旁开4寸",
    indications: ["胸胁胀痛", "呕吐", "呃逆", "吞酸", "腹胀", "泄泻", "饥不欲食", "乳痈", "郁证", "奔豚", "疟疾"],
    needling: "斜刺0.3-0.5寸，不可深刺",
    coordinates: [-0.10, 0.20, 0.08]
  },
  // ═══════════════════════════════════════════════════════════
  // 13. 任脉 (CV) - 24穴 - 前正中线
  // ═══════════════════════════════════════════════════════════
  {
    id: "CV1", name: "会阴", pinyin: "huì yīn", meridian: "CV", system: "fourteen",
    category: "普通穴；任督冲三脉之会",
    locationDesc: "在会阴部，男性当阴囊根部与肛门连线的中点，女性当大阴唇后联合与肛门连线的中点",
    indications: ["小便不利", "遗尿", "遗精", "阳痿", "月经不调", "阴痛", "阴挺", "痔疾", "脱肛", "溺水窒息", "癫狂", "昏迷"],
    needling: "直刺0.5-1寸，孕妇慎用",
    coordinates: [0.00, -0.20, 0.00]
  },
  {
    id: "CV2", name: "曲骨", pinyin: "qū gǔ", meridian: "CV", system: "fourteen",
    category: "普通穴；任脉足厥阴之会",
    locationDesc: "在下腹部，当前正中线上，耻骨联合上缘的中点处",
    indications: ["少腹胀满", "小便不利", "遗尿", "遗精", "阳痿", "阴囊湿痒", "月经不调", "痛经", "带下", "子宫脱垂"],
    needling: "直刺0.5-1寸，孕妇慎用",
    coordinates: [0.00, -0.15, 0.08]
  },
  {
    id: "CV3", name: "中极", pinyin: "zhōng jí", meridian: "CV", system: "fourteen",
    category: "特定穴：膀胱募穴；足三阴任脉之会",
    locationDesc: "在下腹部，前正中线上，当脐中下4寸",
    indications: ["小便不利", "遗尿", "癃闭", "遗精", "阳痿", "早泄", "月经不调", "痛经", "带下", "阴挺", "不孕", "产后恶露不尽", "疝气"],
    needling: "直刺0.5-1寸，孕妇慎用",
    coordinates: [0.00, -0.12, 0.08]
  },
  {
    id: "CV4", name: "关元", pinyin: "guān yuán", meridian: "CV", system: "fourteen",
    category: "特定穴：小肠募穴；足三阴任脉之会；强壮要穴",
    locationDesc: "在下腹部，前正中线上，当脐中下3寸",
    indications: ["中风脱证", "虚劳冷惫", "少腹痛", "泄泻", "痢疾", "脱肛", "遗尿", "尿闭", "遗精", "阳痿", "早泄", "月经不调", "痛经", "经闭", "带下", "阴挺", "不孕", "产后恶露不尽", "虚脱"],
    needling: "直刺0.5-1寸，孕妇慎用，常用灸法",
    coordinates: [0.00, -0.09, 0.08]
  },
  {
    id: "CV5", name: "石门", pinyin: "shí mén", meridian: "CV", system: "fourteen",
    category: "特定穴：三焦募穴；足三阴任脉之会；妇女禁针",
    locationDesc: "在下腹部，前正中线上，当脐中下2寸",
    indications: ["腹胀", "泄泻", "痢疾", "小便不利", "遗尿", "疝气", "遗精", "阳痿", "经闭", "带下", "崩漏", "产后恶露不尽"],
    needling: "直刺0.5-1寸，孕妇慎用，妇女禁针",
    coordinates: [0.00, -0.06, 0.08]
  },
  {
    id: "CV6", name: "气海", pinyin: "qì hǎi", meridian: "CV", system: "fourteen",
    category: "普通穴；足三阴任脉之会；强壮要穴",
    locationDesc: "在下腹部，前正中线上，当脐中下1.5寸",
    indications: ["虚脱", "形体羸瘦", "脏气虚惫", "乏力", "水谷不化", "绕脐腹痛", "泄泻", "痢疾", "便秘", "小便不利", "遗尿", "遗精", "阳痿", "月经不调", "痛经", "经闭", "崩漏", "带下", "产后恶露不尽"],
    needling: "直刺0.5-1寸，孕妇慎用，常用灸法",
    coordinates: [0.00, -0.04, 0.08]
  },
  {
    id: "CV7", name: "阴交", pinyin: "yīn jiāo", meridian: "CV", system: "fourteen",
    category: "普通穴；任脉冲脉足少阴之会",
    locationDesc: "在下腹部，前正中线上，当脐中下1寸",
    indications: ["腹胀", "水肿", "绕脐冷痛", "泄泻", "月经不调", "崩漏", "带下", "阴挺", "产后恶露不尽", "疝气"],
    needling: "直刺0.5-1寸，孕妇慎用",
    coordinates: [0.00, -0.02, 0.08]
  },
  {
    id: "CV8", name: "神阙", pinyin: "shén què", meridian: "CV", system: "fourteen",
    category: "普通穴；强壮要穴；禁针",
    locationDesc: "在腹中部，脐中央",
    indications: ["中风脱证", "四肢厥冷", "尸厥", "风痫", "形惫体乏", "绕脐腹痛", "水肿鼓胀", "泄泻", "痢疾", "便秘", "脱肛", "小便不禁", "五淋", "妇女不孕"],
    needling: "禁针，多用灸法",
    coordinates: [0.00, 0.00, 0.08]
  },
  {
    id: "CV9", name: "水分", pinyin: "shuǐ fēn", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，前正中线上，当脐中上1寸",
    indications: ["水肿", "小便不通", "腹水", "腹痛", "腹胀", "泄泻", "反胃", "吐食"],
    needling: "直刺0.5-1寸",
    coordinates: [0.00, 0.03, 0.08]
  },
  {
    id: "CV10", name: "下脘", pinyin: "xià wǎn", meridian: "CV", system: "fourteen",
    category: "普通穴；足太阴任脉之会",
    locationDesc: "在上腹部，前正中线上，当脐中上2寸",
    indications: ["腹痛", "腹胀", "呕吐", "呃逆", "泄泻", "虚肿", "消化不良", "痞块"],
    needling: "直刺0.5-1寸",
    coordinates: [0.00, 0.05, 0.08]
  },
  {
    id: "CV11", name: "建里", pinyin: "jiàn lǐ", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在上腹部，前正中线上，当脐中上3寸",
    indications: ["胃脘疼痛", "腹胀", "呕吐", "食欲不振", "肠中切痛", "水肿"],
    needling: "直刺0.5-1寸",
    coordinates: [0.00, 0.08, 0.08]
  },
  {
    id: "CV12", name: "中脘", pinyin: "zhōng wǎn", meridian: "CV", system: "fourteen",
    category: "特定穴：胃募穴；八会穴之腑会；手太阳少阳足阳明任脉之会",
    locationDesc: "在上腹部，前正中线上，当脐中上4寸",
    indications: ["胃脘痛", "腹胀", "呕吐", "呃逆", "吞酸", "纳呆", "泄泻", "黄疸", "癫痫", "失眠", "脏躁", "哮喘", "产后血晕", "消化不良"],
    needling: "直刺0.5-1寸",
    coordinates: [0.00, 0.11, 0.08]
  },
  {
    id: "CV13", name: "上脘", pinyin: "shàng wǎn", meridian: "CV", system: "fourteen",
    category: "普通穴；手太阳少阳足阳明任脉之会",
    locationDesc: "在上腹部，前正中线上，当脐中上5寸",
    indications: ["胃脘疼痛", "腹胀", "呕吐", "呃逆", "纳呆", "消化不良", "癫痫", "黄疸", "虚劳吐血"],
    needling: "直刺0.5-1寸",
    coordinates: [0.00, 0.14, 0.08]
  },
  {
    id: "CV14", name: "巨阙", pinyin: "jù quē", meridian: "CV", system: "fourteen",
    category: "特定穴：心募穴",
    locationDesc: "在上腹部，前正中线上，当脐中上6寸",
    indications: ["胸痛", "心痛", "心悸", "心烦", "癫痫", "惊悸", "健忘", "胃痛", "反胃", "吞酸", "呕吐", "黄疸", "噎膈"],
    needling: "直刺0.3-0.5寸，不可深刺",
    coordinates: [0.00, 0.17, 0.08]
  },
  {
    id: "CV15", name: "鸠尾", pinyin: "jiū wěi", meridian: "CV", system: "fourteen",
    category: "特定穴：络穴；膏的原穴",
    locationDesc: "在上腹部，前正中线上，当胸剑结合部下1寸",
    indications: ["心痛", "心悸", "心烦", "癫痫", "惊狂", "胸满", "呃逆", "咳嗽", "呕吐", "反胃", "胃痛"],
    needling: "向下斜刺0.3-0.5寸，不可深刺",
    coordinates: [0.00, 0.20, 0.08]
  },
  {
    id: "CV16", name: "中庭", pinyin: "zhōng tíng", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当前正中线上，平第5肋间，即胸剑结合部",
    indications: ["胸胁胀满", "心痛", "呕吐", "小儿吐乳", "食管炎", "噎膈"],
    needling: "平刺0.3-0.5寸",
    coordinates: [0.00, 0.23, 0.08]
  },
  {
    id: "CV17", name: "膻中", pinyin: "dàn zhōng", meridian: "CV", system: "fourteen",
    category: "特定穴：心包募穴；八会穴之气会；足太阴少阴手太阳少阳任脉之会",
    locationDesc: "在胸部，当前正中线上，平第4肋间隙，两乳头连线的中点",
    indications: ["胸闷", "气短", "胸痛", "心痛", "咳嗽", "气喘", "心悸", "乳汁少", "乳痈", "噎膈", "产妇少乳"],
    needling: "平刺0.3-0.5寸，常用灸法",
    coordinates: [0.00, 0.29, 0.08]
  },
  {
    id: "CV18", name: "玉堂", pinyin: "yù táng", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当前正中线上，平第3肋间隙",
    indications: ["咳嗽", "气喘", "胸痛", "呕吐", "胸闷", "烦心"],
    needling: "平刺0.3-0.5寸",
    coordinates: [0.00, 0.32, 0.08]
  },
  {
    id: "CV19", name: "紫宫", pinyin: "zǐ gōng", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当前正中线上，平第2肋间隙",
    indications: ["咳嗽", "气喘", "胸痛", "胸闷", "喉痹", "咽塞"],
    needling: "平刺0.3-0.5寸",
    coordinates: [0.00, 0.35, 0.08]
  },
  {
    id: "CV20", name: "华盖", pinyin: "huá gài", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当前正中线上，平第1肋间隙",
    indications: ["咳嗽", "气喘", "胸痛", "胁胀", "喉痹", "咽肿"],
    needling: "平刺0.3-0.5寸",
    coordinates: [0.00, 0.38, 0.08]
  },
  {
    id: "CV21", name: "璇玑", pinyin: "xuán jī", meridian: "CV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在胸部，当前正中线上，天突下1寸",
    indications: ["咳嗽", "气喘", "胸痛", "咽喉肿痛", "食管痉挛"],
    needling: "平刺0.3-0.5寸",
    coordinates: [0.00, 0.41, 0.08]
  },
  {
    id: "CV22", name: "天突", pinyin: "tiān tū", meridian: "CV", system: "fourteen",
    category: "普通穴；阴维任脉之会",
    locationDesc: "在颈部，当前正中线上，胸骨上窝中央",
    indications: ["咳嗽", "哮喘", "胸痛", "咽喉肿痛", "暴喑", "梅核气", "噎膈", "呃逆", "瘿气", "食管炎"],
    needling: "先直刺0.2寸，然后沿胸骨柄后缘向下平刺0.5-1寸，严格掌握针刺方向和深度",
    coordinates: [0.00, 0.50, 0.05]
  },
  {
    id: "CV23", name: "廉泉", pinyin: "lián quán", meridian: "CV", system: "fourteen",
    category: "普通穴；阴维任脉之会",
    locationDesc: "在颈部，当前正中线上，结喉上方，舌骨上缘凹陷处",
    indications: ["舌强不语", "舌缓流涎", "舌下肿痛", "吞咽困难", "暴喑", "口舌生疮", "咽喉肿痛", "中风失语"],
    needling: "向舌根斜刺0.5-0.8寸",
    coordinates: [0.00, 0.56, 0.05]
  },
  {
    id: "CV24", name: "承浆", pinyin: "chéng jiāng", meridian: "CV", system: "fourteen",
    category: "普通穴；手足阳明任脉之会",
    locationDesc: "在面部，当颏唇沟的正中凹陷处",
    indications: ["口眼歪斜", "面肿", "齿痛", "龈肿", "流涎", "癫痫", "口舌生疮", "暴喑", "消渴嗜饮"],
    needling: "斜刺0.3-0.5寸",
    coordinates: [0.00, 0.60, 0.05]
  },
  // ═══════════════════════════════════════════════════════════
  // 14. 督脉 (GV) - 28穴 - 后正中线及头面部
  // ═══════════════════════════════════════════════════════════
  {
    id: "GV1", name: "长强", pinyin: "cháng qiáng", meridian: "GV", system: "fourteen",
    category: "特定穴：络穴；督脉足少阴少阳之会",
    locationDesc: "在尾骨端下，当尾骨端与肛门连线的中点处",
    indications: ["泄泻", "痢疾", "便秘", "便血", "痔疮", "脱肛", "阴挺", "遗精", "阳痿", "癫痫", "癫狂", "脊强反折", "腰脊痛"],
    needling: "斜刺0.5-1寸，紧靠尾骨前面斜刺",
    coordinates: [0.00, -0.22, -0.08]
  },
  {
    id: "GV2", name: "腰俞", pinyin: "yāo shū", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在骶部，当后正中线上，适对骶管裂孔",
    indications: ["腰脊强痛", "下肢痿痹", "月经不调", "痔疾", "脱肛", "便秘", "便血", "癫痫", "淋浊"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, -0.18, -0.09]
  },
  {
    id: "GV3", name: "腰阳关", pinyin: "yāo yáng guān", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腰部，当后正中线上，第4腰椎棘突下凹陷中",
    indications: ["腰骶疼痛", "下肢痿痹", "月经不调", "赤白带下", "遗精", "阳痿", "便血", "遗尿"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, -0.04, -0.10]
  },
  {
    id: "GV4", name: "命门", pinyin: "mìng mén", meridian: "GV", system: "fourteen",
    category: "普通穴；强壮要穴",
    locationDesc: "在腰部，当后正中线上，第2腰椎棘突下凹陷中",
    indications: ["虚损腰痛", "脊强反折", "遗精", "阳痿", "早泄", "月经不调", "赤白带下", "遗尿", "尿频", "泄泻", "五更泄", "头晕", "耳鸣", "癫痫", "惊恐"],
    needling: "向上斜刺0.5-1寸，常用灸法",
    coordinates: [0.00, 0.02, -0.10]
  },
  {
    id: "GV5", name: "悬枢", pinyin: "xuán shū", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在腰部，当后正中线上，第1腰椎棘突下凹陷中",
    indications: ["腰脊强痛", "腹胀", "腹痛", "泄泻", "完谷不化", "痢疾"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.05, -0.10]
  },
  {
    id: "GV6", name: "脊中", pinyin: "jǐ zhōng", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第11胸椎棘突下凹陷中",
    indications: ["腰脊强痛", "黄疸", "腹泻", "痢疾", "便血", "痔疮", "脱肛", "癫痫", "小儿疳积"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.08, -0.10]
  },
  {
    id: "GV7", name: "中枢", pinyin: "zhōng shū", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第10胸椎棘突下凹陷中",
    indications: ["腰脊强痛", "胃痛", "腹胀", "呕吐", "食欲不振", "黄疸", "胆囊炎"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.11, -0.10]
  },
  {
    id: "GV8", name: "筋缩", pinyin: "jīn suō", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第9胸椎棘突下凹陷中",
    indications: ["癫痫", "抽搐", "脊强", "胃痛", "黄疸", "四肢不收", "筋挛拘急"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.14, -0.10]
  },
  {
    id: "GV9", name: "至阳", pinyin: "zhì yáng", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第7胸椎棘突下凹陷中",
    indications: ["黄疸", "胸胁胀痛", "身热", "胃痛", "腹胀", "呕吐", "咳嗽", "气喘", "脊强", "背痛"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.20, -0.10]
  },
  {
    id: "GV10", name: "灵台", pinyin: "líng tái", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第6胸椎棘突下凹陷中",
    indications: ["咳嗽", "气喘", "脊背强痛", "疔疮", "疖肿", "胃痛", "项强"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.23, -0.10]
  },
  {
    id: "GV11", name: "神道", pinyin: "shén dào", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第5胸椎棘突下凹陷中",
    indications: ["心悸", "怔忡", "失眠", "健忘", "癫痫", "中风不语", "咳嗽", "气喘", "脊背强痛", "疟疾"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.26, -0.10]
  },
  {
    id: "GV12", name: "身柱", pinyin: "shēn zhù", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在背部，当后正中线上，第3胸椎棘突下凹陷中",
    indications: ["咳嗽", "气喘", "癫痫", "身热", "脊背强痛", "疔疮", "百日咳", "小儿惊风"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.32, -0.10]
  },
  {
    id: "GV13", name: "陶道", pinyin: "táo dào", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉足太阳之会",
    locationDesc: "在背部，当后正中线上，第1胸椎棘突下凹陷中",
    indications: ["热病", "头痛", "项强", "疟疾", "癫痫", "脊背强痛", "咳嗽", "气喘"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.38, -0.10]
  },
  {
    id: "GV14", name: "大椎", pinyin: "dà zhuī", meridian: "GV", system: "fourteen",
    category: "普通穴；手足三阳督脉之会；强壮要穴",
    locationDesc: "在项部，当后正中线上，第7颈椎棘突下凹陷中",
    indications: ["热病", "感冒", "咳嗽", "气喘", "项强", "癫痫", "疟疾", "骨蒸潮热", "盗汗", "荨麻疹", "黄疸", "小儿惊风", "落枕", "肩背痛"],
    needling: "向上斜刺0.5-1寸",
    coordinates: [0.00, 0.44, -0.08]
  },
  {
    id: "GV15", name: "哑门", pinyin: "yǎ mén", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉阳维之会",
    locationDesc: "在项部，当后发际正中直上0.5寸，第1颈椎下",
    indications: ["暴喑", "舌强不语", "癫痫", "癫狂", "头痛", "项强", "中风", "脑性瘫痪", "聋哑"],
    needling: "伏案正坐位，向下颌方向缓慢刺入0.5-1寸，不可向上斜刺或深刺",
    coordinates: [0.00, 0.50, -0.07]
  },
  {
    id: "GV16", name: "风府", pinyin: "fēng fǔ", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉阳维之会",
    locationDesc: "在项部，当后发际正中直上1寸，枕外隆凸直下，两侧斜方肌之间凹陷中",
    indications: ["头痛", "项强", "眩晕", "咽喉肿痛", "失音", "癫痫", "中风", "半身不遂", "感冒", "癫狂"],
    needling: "伏案正坐位，向下颌方向缓慢刺入0.5-1寸，不可向上深刺",
    coordinates: [0.00, 0.56, -0.07]
  },
  {
    id: "GV17", name: "脑户", pinyin: "nǎo hù", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉足太阳之会",
    locationDesc: "在头部，当后发际正中直上2.5寸，脑户正当枕外粗隆上方凹陷处",
    indications: ["头痛", "头晕", "项强", "失音", "癫痫", "目痛", "面赤", "黄疸"],
    needling: "平刺0.5-0.8寸",
    coordinates: [0.00, 0.62, -0.07]
  },
  {
    id: "GV18", name: "强间", pinyin: "qiáng jiān", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当后发际正中直上4寸，脑户上1.5寸",
    indications: ["头痛", "目眩", "项强", "癫痫", "失眠", "呕吐"],
    needling: "平刺0.5-0.8寸",
    coordinates: [0.00, 0.68, -0.06]
  },
  {
    id: "GV19", name: "后顶", pinyin: "hòu dǐng", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当后发际正中直上5.5寸，百会后1.5寸",
    indications: ["头痛", "眩晕", "项强", "癫痫", "失眠", "烦心", "瘛疭"],
    needling: "平刺0.5-0.8寸",
    coordinates: [0.00, 0.76, -0.05]
  },
  {
    id: "GV20", name: "百会", pinyin: "bǎi huì", meridian: "GV", system: "fourteen",
    category: "普通穴；手足三阳督脉之会；强壮要穴",
    locationDesc: "在头部，当前发际正中直上5寸，或两耳尖连线的中点处",
    indications: ["头痛", "眩晕", "中风不语", "癫痫", "癫狂", "健忘", "失眠", "尸厥", "脱肛", "阴挺", "久泻", "子宫脱垂", "小儿惊风", "高血压"],
    needling: "平刺0.5-0.8寸，常用灸法",
    coordinates: [0.00, 0.82, 0.00]
  },
  {
    id: "GV21", name: "前顶", pinyin: "qián dǐng", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上3.5寸，百会前1.5寸",
    indications: ["癫痫", "头晕", "目眩", "头顶痛", "鼻渊", "小儿惊风"],
    needling: "平刺0.5-0.8寸",
    coordinates: [0.00, 0.82, 0.03]
  },
  {
    id: "GV22", name: "囟会", pinyin: "xìn huì", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上2寸，百会前3寸",
    indications: ["头痛", "眩晕", "鼻渊", "鼻塞", "鼻衄", "癫痫", "小儿惊风", "面肿"],
    needling: "平刺0.5-0.8寸，小儿禁针",
    coordinates: [0.00, 0.80, 0.05]
  },
  {
    id: "GV23", name: "上星", pinyin: "shàng xīng", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在头部，当前发际正中直上1寸",
    indications: ["头痛", "眩晕", "目赤肿痛", "迎风流泪", "面赤肿", "鼻渊", "鼻衄", "鼻痔", "鼻塞", "癫痫", "疟疾", "热病"],
    needling: "平刺0.5-0.8寸，或点刺出血",
    coordinates: [0.00, 0.78, 0.06]
  },
  {
    id: "GV24", name: "神庭", pinyin: "shén tíng", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉足太阳阳明之会",
    locationDesc: "在头部，当前发际正中直上0.5寸",
    indications: ["头痛", "眩晕", "失眠", "癫痫", "惊悸", "鼻渊", "鼻衄", "喘息", "目赤肿痛", "目翳"],
    needling: "平刺0.5-0.8寸",
    coordinates: [0.00, 0.76, 0.06]
  },
  {
    id: "GV25", name: "素髎", pinyin: "sù liáo", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉足阳明之会",
    locationDesc: "在面部，当鼻尖的正中央",
    indications: ["鼻塞", "鼻衄", "鼻流清涕", "鼻疮", "鼻渊", "酒齄鼻", "昏迷", "新生儿窒息", "惊厥", "呼吸衰竭"],
    needling: "向上斜刺0.3-0.5寸，或点刺出血",
    coordinates: [0.00, 0.70, 0.08]
  },
  {
    id: "GV26", name: "水沟", pinyin: "shuǐ gōu", meridian: "GV", system: "fourteen",
    category: "普通穴；手足阳明督脉之会；急救要穴",
    locationDesc: "在面部，当人中沟的上1/3与中1/3交点处",
    indications: ["昏迷", "晕厥", "癫痫", "中风", "中暑", "急惊风", "牙关紧闭", "口眼歪斜", "面肿", "腰脊强痛", "挫闪腰痛", "晕车", "晕船"],
    needling: "向上斜刺0.3-0.5寸，或用指甲按掐",
    coordinates: [0.00, 0.62, 0.07]
  },
  {
    id: "GV27", name: "兑端", pinyin: "duì duān", meridian: "GV", system: "fourteen",
    category: "普通穴",
    locationDesc: "在面部，当上唇的尖端，人中沟下端的皮肤与唇的移行部",
    indications: ["昏迷", "晕厥", "癫痫", "癔症", "齿龈痛", "鼻塞", "鼻衄", "口歪唇动", "黄疸", "消渴"],
    needling: "向上斜刺0.2-0.3寸",
    coordinates: [0.00, 0.60, 0.06]
  },
  {
    id: "GV28", name: "龈交", pinyin: "yín jiāo", meridian: "GV", system: "fourteen",
    category: "普通穴；督脉任脉足阳明之会",
    locationDesc: "在上唇内，当上唇系带与上齿龈的相接处",
    indications: ["牙龈肿痛", "鼻渊", "鼻衄", "面疮", "面赤颊肿", "癫痫", "腰强", "痔疮", "项强", "目泪", "目赤痛"],
    needling: "向上斜刺0.2-0.3寸，或点刺出血",
    coordinates: [0.00, 0.60, 0.05]
  }
]
