// 董氏奇穴完整数据库 - 董景昌先生传世奇穴
// 数据来源：《董氏针灸正经奇穴学》《董氏奇穴讲座》《董氏奇穴针灸学》

export interface DongPoint {
  id: string; name: string; pinyin: string; area: string; location: string
  locationDesc: string; indications: string[]; method: string; depth: string
  moxibustion: string; notes?: string
}

export const DONG_POINTS: DongPoint[] = [
  // ═══════════════ 一一部位（手指部位）═══════════════
  { id: "DONG-11-01", name: "木穴", pinyin: "mù xué", area: "一一部位", location: "食指掌面第一节中央线，距指甲根角约0.5寸", locationDesc: "食指第一节掌面中央线", indications: ["肝火旺", "脾气暴躁", "眼睛干涩", "皮肤瘙痒", "手癣"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸", notes: "治疗肝火及皮肤瘙痒要穴" },
  { id: "DONG-11-02", name: "二角明", pinyin: "èr jiǎo míng", area: "一一部位", location: "食指背侧第一节中央，距指甲根角约0.2寸", locationDesc: "食指第一节背侧正中", indications: ["眼睛疲劳", "视力模糊", "目赤肿痛", "头痛"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-03", name: "心膝", pinyin: "xīn xī", area: "一一部位", location: "中指背侧，距指甲根角约0.1寸，中指正中线", locationDesc: "中指背侧指甲根下方", indications: ["心悸", "心痛", "心慌", "心律不齐"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-04", name: "肺心", pinyin: "fèi xīn", area: "一一部位", location: "中指背侧第一节，距指甲根约0.2寸，中线偏桡侧", locationDesc: "中指第一节背侧", indications: ["咳嗽", "气喘", "胸闷", "心痛心悸"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-05", name: "五虎", pinyin: "wǔ hǔ", area: "一一部位", location: "拇指掌面第一节，距指甲根角约0.2寸，共五穴", locationDesc: "拇指掌面第一节五穴", indications: ["手指麻木", "上肢疼痛", "腕管综合征", "腱鞘炎"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-06", name: "重子", pinyin: "zhòng zǐ", area: "一一部位", location: "拇指背侧第一节，距指甲根角约0.2寸", locationDesc: "拇指背侧第一节", indications: ["背痛", "项强", "落枕", "头痛", "腰背痛"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-07", name: "重仙", pinyin: "zhòng xiān", area: "一一部位", location: "拇指背侧，重子穴下约0.2寸", locationDesc: "重子穴下0.2寸", indications: ["背痛", "肩痛", "项强", "颈项痛"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-08", name: "小间", pinyin: "xiǎo jiān", area: "一一部位", location: "食指掌面，距指甲根约0.3寸，中线偏桡侧", locationDesc: "食指掌面中线偏桡侧", indications: ["支气管炎", "咳嗽", "气喘", "吐黄痰"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-09", name: "大间", pinyin: "dà jiān", area: "一一部位", location: "食指掌面，距指甲根约0.5寸，中线偏桡侧", locationDesc: "食指掌面距指甲根0.5寸", indications: ["心脏病", "心悸", "膝盖痛", "疝气"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-10", name: "中间", pinyin: "zhōng jiān", area: "一一部位", location: "食指掌面，大间穴与小间穴之间", locationDesc: "食指掌面大间小间之间", indications: ["心悸", "心绞痛", "胸闷", "膝盖痛"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-11", name: "侧间", pinyin: "cè jiān", area: "一一部位", location: "食指掌面尺侧，距指甲根约0.5寸", locationDesc: "食指掌面尺侧", indications: ["支气管扩张", "咳嗽气喘", "肺炎"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-12", name: "浮间", pinyin: "fú jiān", area: "一一部位", location: "食指掌面桡侧，距指甲根约0.3寸", locationDesc: "食指掌面桡侧", indications: ["疝气", "胃痛", "十二指肠溃疡"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-13", name: "外间", pinyin: "wài jiān", area: "一一部位", location: "食指掌面，浮间穴下约0.2寸", locationDesc: "浮间穴下0.2寸", indications: ["疝气", "胃痛", "腹胀", "十二指肠溃疡"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-14", name: "还巢", pinyin: "huán cháo", area: "一一部位", location: "无名指尺侧，第二节中央，距指甲根约0.5寸", locationDesc: "无名指第二节尺侧", indications: ["子宫肌瘤", "月经不调", "痛经", "不孕症"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸", notes: "妇科要穴" },
  { id: "DONG-11-15", name: "指五金", pinyin: "zhǐ wǔ jīn", area: "一一部位", location: "食指尺侧，距指甲根约0.5寸", locationDesc: "食指尺侧", indications: ["肠炎", "腹痛", "消化不良", "阑尾炎"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-16", name: "指驷马", pinyin: "zhǐ sì mǎ", area: "一一部位", location: "食指背侧，第二节中央，距指甲根约0.5寸", locationDesc: "食指第二节背侧", indications: ["过敏性鼻炎", "皮肤病", "湿疹", "气喘"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },
  { id: "DONG-11-17", name: "指千金", pinyin: "zhǐ qiān jīn", area: "一一部位", location: "中指背侧，距指甲根约0.5寸", locationDesc: "中指背侧", indications: ["肠炎", "腹痛", "阑尾炎", "消化不良"], method: "直刺", depth: "0.1-0.15寸", moxibustion: "可灸" },

  // ═══════════════ 二二部位（手掌部位）═══════════════
  { id: "DONG-22-01", name: "重魁", pinyin: "chóng kuí", area: "二二部位", location: "手背，第一掌骨与第二掌骨接合处，食指与拇指骨叉处", locationDesc: "第一二掌骨接合处", indications: ["三叉神经痛", "头痛", "牙痛", "面神经麻痹"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-22-02", name: "大白", pinyin: "dà bái", area: "二二部位", location: "手背，第一掌骨与第二掌骨之间，重魁穴后1寸", locationDesc: "重魁穴后1寸", indications: ["全身骨痛", "腰痛", "坐骨神经痛", "头痛", "小儿麻痹"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-22-03", name: "灵骨", pinyin: "líng gǔ", area: "二二部位", location: "手背，第一掌骨与第二掌骨接合处，重魁穴后1.5寸", locationDesc: "第一二掌骨接合处后方1.5寸", indications: ["肺气不足", "坐骨神经痛", "腰痛", "头痛", "月经不调", "半身不遂", "耳鸣"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸", notes: "补气要穴，大白灵骨倒马针治全身痛" },
  { id: "DONG-22-04", name: "腕顺一", pinyin: "wàn shùn yī", area: "二二部位", location: "手背，小指掌骨与无名指掌骨之间，腕横纹上1.5寸", locationDesc: "腕背横纹上1.5寸", indications: ["肾亏头痛", "眼花", "腰痛", "耳鸣", "坐骨神经痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-22-05", name: "腕顺二", pinyin: "wàn shùn èr", area: "二二部位", location: "手背，腕顺一穴上1寸", locationDesc: "腕顺一穴上1寸", indications: ["肾亏头痛", "眼花", "腰痛", "耳鸣", "鼻出血"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-22-06", name: "三叉一", pinyin: "sān chā yī", area: "二二部位", location: "手背，食指与中指指缝间，距指蹼缘约1寸", locationDesc: "食指中指指缝上1寸", indications: ["三叉神经痛", "头晕", "项强", "肩背痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-22-07", name: "三叉二", pinyin: "sān chā èr", area: "二二部位", location: "手背，中指与无名指指缝间，距指蹼缘约1寸", locationDesc: "中指无名指指缝上1寸", indications: ["三叉神经痛", "头晕", "耳鸣", "肘臂痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-22-08", name: "三叉三", pinyin: "sān chā sān", area: "二二部位", location: "手背，无名指与小指指缝间，距指蹼缘约1寸", locationDesc: "无名指小指指缝上1寸", indications: ["三叉神经痛", "头晕", "眼痛", "耳鸣", "坐骨神经痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-22-09", name: "小节", pinyin: "xiǎo jié", area: "二二部位", location: "手背，小指掌骨与无名指掌骨之间，距指蹼缘约0.5寸", locationDesc: "小指无名指掌骨间", indications: ["踝关节扭伤", "脚跟痛", "腰痛", "坐骨神经痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-22-10", name: "土水", pinyin: "tǔ shuǐ", area: "二二部位", location: "手掌面，拇指根部掌横纹上，桡侧与尺侧各一穴", locationDesc: "拇指根部掌横纹上", indications: ["胃痛", "消化不良", "腹胀", "腹泻", "腹痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-22-11", name: "手解", pinyin: "shǒu jiě", area: "二二部位", location: "手掌面，小指掌骨与无名指掌骨之间，掌指关节后1寸", locationDesc: "小指无名指掌骨间掌指关节后", indications: ["皮肤过敏", "荨麻疹", "瘙痒", "湿疹"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },

  // ═══════════════ 三三部位（前臂部位）═══════════════
  { id: "DONG-33-01", name: "其门", pinyin: "qí mén", area: "三三部位", location: "前臂背侧，腕横纹上2寸，桡骨外侧缘", locationDesc: "腕背横纹上2寸桡侧", indications: ["痔疮", "便秘", "月经不调", "妇科炎症"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-02", name: "其角", pinyin: "qí jiǎo", area: "三三部位", location: "前臂背侧，其门穴上2寸", locationDesc: "其门穴上2寸", indications: ["痔疮", "便秘", "月经不调", "妇科炎症"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-03", name: "其正", pinyin: "qí zhèng", area: "三三部位", location: "前臂背侧，其角穴上2寸", locationDesc: "其角穴上2寸", indications: ["痔疮", "便秘", "月经不调", "妇科炎症", "脱肛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-04", name: "火串", pinyin: "huǒ chuàn", area: "三三部位", location: "前臂背侧，腕横纹上2.5寸，桡骨外侧缘", locationDesc: "腕背横纹上2.5寸桡侧", indications: ["便秘", "心悸", "胸闷", "胁痛", "手指麻木"], method: "直刺", depth: "0.3-1寸", moxibustion: "可灸" },
  { id: "DONG-33-05", name: "火陵", pinyin: "huǒ líng", area: "三三部位", location: "前臂背侧，火串穴上2寸", locationDesc: "火串穴上2寸", indications: ["便秘", "心悸", "胸闷", "胁痛", "上肢疼痛"], method: "直刺", depth: "0.3-1寸", moxibustion: "可灸" },
  { id: "DONG-33-06", name: "火山", pinyin: "huǒ shān", area: "三三部位", location: "前臂背侧，火陵穴上2寸", locationDesc: "火陵穴上2寸", indications: ["便秘", "心悸", "胸闷", "胸痛", "上肢痿痹"], method: "直刺", depth: "0.3-1寸", moxibustion: "可灸" },
  { id: "DONG-33-07", name: "人士", pinyin: "rén shì", area: "三三部位", location: "前臂掌侧，腕横纹上4寸，桡侧腕屈肌腱与掌长肌腱之间", locationDesc: "腕横纹上4寸掌侧", indications: ["气喘", "咳嗽", "吐痰", "支气管炎", "心脏病"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-33-08", name: "地士", pinyin: "dì shì", area: "三三部位", location: "前臂掌侧，人士穴上3寸", locationDesc: "人士穴上3寸", indications: ["气喘", "咳嗽", "吐痰", "感冒", "心脏病"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-33-09", name: "天士", pinyin: "tiān shì", area: "三三部位", location: "前臂掌侧，地士穴上3寸", locationDesc: "地士穴上3寸", indications: ["气喘", "咳嗽", "鼻炎", "感冒", "心脏病"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-33-10", name: "曲陵", pinyin: "qū líng", area: "三三部位", location: "前臂掌侧，肘横纹上，肱二头肌腱桡侧凹陷处", locationDesc: "肘横纹肱二头肌腱桡侧", indications: ["咳嗽", "气喘", "肘关节痛", "前臂疼痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-11", name: "建力", pinyin: "jiàn lì", area: "三三部位", location: "前臂背侧，腕横纹上3寸，尺骨桡侧缘", locationDesc: "腕背横纹上3寸", indications: ["腰背痛", "坐骨神经痛", "下肢无力", "腰腿痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-12", name: "中力", pinyin: "zhōng lì", area: "三三部位", location: "前臂背侧，建力穴上1.5寸", locationDesc: "建力穴上1.5寸", indications: ["腰背痛", "坐骨神经痛", "下肢痿痹", "腰腿痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-13", name: "云白", pinyin: "yún bái", area: "三三部位", location: "前臂背侧，腕横纹上6寸，尺骨与桡骨之间", locationDesc: "腕背横纹上6寸", indications: ["妇科炎症", "白带过多", "月经不调", "子宫炎"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-14", name: "李白", pinyin: "lǐ bái", area: "三三部位", location: "前臂背侧，云白穴上2寸", locationDesc: "云白穴上2寸", indications: ["白带过多", "月经不调", "子宫炎", "盆腔炎"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-15", name: "上白", pinyin: "shàng bái", area: "三三部位", location: "前臂背侧，腕横纹上4寸，桡骨与尺骨之间", locationDesc: "腕背横纹上4寸", indications: ["角膜炎", "结膜炎", "麦粒肿", "眼痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-16", name: "分白", pinyin: "fēn bái", area: "三三部位", location: "前臂背侧，上白穴上1寸", locationDesc: "上白穴上1寸", indications: ["角膜炎", "结膜炎", "近视", "眼疲劳"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-17", name: "内白", pinyin: "nèi bái", area: "三三部位", location: "前臂掌侧，腕横纹上4寸，掌长肌腱桡侧", locationDesc: "腕横纹上4寸掌侧", indications: ["白细胞减少", "贫血", "面色苍白", "体虚乏力"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-18", name: "外白", pinyin: "wài bái", area: "三三部位", location: "前臂背侧，内白穴对应处", locationDesc: "内白穴对应的背侧", indications: ["白细胞减少", "贫血", "体虚", "免疫力低下"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-19", name: "心门", pinyin: "xīn mén", area: "三三部位", location: "前臂掌侧，腕横纹上5寸，掌长肌腱与桡侧腕屈肌腱之间", locationDesc: "腕横纹上5寸掌长肌腱间", indications: ["心脏病", "心悸", "心绞痛", "心律不齐", "胸闷"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-20", name: "肝门", pinyin: "gān mén", area: "三三部位", location: "前臂掌侧，腕横纹上6寸，掌长肌腱桡侧", locationDesc: "腕横纹上6寸掌侧", indications: ["肝炎", "肝硬化", "肝气郁结", "胁痛", "黄疸"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-33-21", name: "肠门", pinyin: "cháng mén", area: "三三部位", location: "前臂掌侧，腕横纹上3寸，掌长肌腱桡侧", locationDesc: "腕横纹上3寸掌侧", indications: ["肠炎", "腹泻", "便秘", "腹痛", "消化不良"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },

  // ═══════════════ 四四部位（上臂部位）═══════════════
  { id: "DONG-44-01", name: "分金", pinyin: "fēn jīn", area: "四四部位", location: "上臂外侧，肩峰与肘尖连线中点，肱骨外侧", locationDesc: "上臂外侧中点", indications: ["感冒", "咳嗽", "气喘", "咽喉炎", "过敏性鼻炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-02", name: "合金", pinyin: "hé jīn", area: "四四部位", location: "上臂外侧，分金穴上1寸", locationDesc: "分金穴上1寸", indications: ["感冒", "咳嗽", "气喘", "咽喉炎", "过敏性鼻炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-03", name: "内金", pinyin: "nèi jīn", area: "四四部位", location: "上臂外侧，合金穴上1寸", locationDesc: "合金穴上1寸", indications: ["感冒", "咳嗽", "气喘", "咽喉炎", "过敏性鼻炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-04", name: "足千金", pinyin: "zú qiān jīn", area: "四四部位", location: "上臂外侧，肩峰下约3寸，肱骨外侧", locationDesc: "肩峰下3寸", indications: ["甲状腺肿", "咽喉肿痛", "颈部淋巴结肿大", "扁桃体炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-05", name: "足五金", pinyin: "zú wǔ jīn", area: "四四部位", location: "上臂外侧，足千金穴下1寸", locationDesc: "足千金穴下1寸", indications: ["甲状腺肿", "咽喉肿痛", "颈部淋巴结肿大", "扁桃体炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-06", name: "肩中", pinyin: "jiān zhōng", area: "四四部位", location: "上臂外侧，肩峰与肘尖连线上，三角肌止点处", locationDesc: "三角肌止点处", indications: ["肩周炎", "肩背痛", "颈项强痛", "上肢不遂"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-07", name: "背面", pinyin: "bèi miàn", area: "四四部位", location: "上臂背侧，肩峰下约4寸，肱三头肌处", locationDesc: "上臂背侧肩峰下4寸", indications: ["背痛", "腰痛", "肩背酸痛", "腹膜炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-08", name: "人宗", pinyin: "rén zōng", area: "四四部位", location: "上臂背侧，肘横纹上3寸，肱三头肌尺侧", locationDesc: "肘横纹上3寸背侧", indications: ["感冒", "气喘", "咳嗽", "脚痛", "小腿痛"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-09", name: "地宗", pinyin: "dì zōng", area: "四四部位", location: "上臂背侧，人宗穴上3寸", locationDesc: "人宗穴上3寸", indications: ["心脏病", "心悸", "休克", "急救回阳"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸", notes: "急救要穴" },
  { id: "DONG-44-10", name: "天宗", pinyin: "tiān zōng", area: "四四部位", location: "上臂背侧，地宗穴上3寸", locationDesc: "地宗穴上3寸", indications: ["妇科疾病", "阴道炎", "子宫炎", "赤白带下"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-11", name: "后椎", pinyin: "hòu zhuī", area: "四四部位", location: "上臂背侧，肘横纹上2.5寸，肱三头肌尺侧", locationDesc: "肘横纹上2.5寸背侧", indications: ["脊椎骨痛", "闪腰", "腰痛", "坐骨神经痛"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-12", name: "首英", pinyin: "shǒu yīng", area: "四四部位", location: "上臂背侧，后椎穴上2寸", locationDesc: "后椎穴上2寸", indications: ["脊椎骨痛", "闪腰", "腰痛", "坐骨神经痛"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-13", name: "富顶", pinyin: "fù dǐng", area: "四四部位", location: "上臂背侧，首英穴上2寸", locationDesc: "首英穴上2寸", indications: ["脊椎骨痛", "闪腰", "腰痛", "坐骨神经痛", "血压高"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-44-14", name: "后枝", pinyin: "hòu zhī", area: "四四部位", location: "上臂背侧，富顶穴上2寸", locationDesc: "富顶穴上2寸", indications: ["脊椎骨痛", "闪腰", "腰痛", "坐骨神经痛", "血压高"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },

  // ═══════════════ 五五部位（足部部位）═══════════════
  { id: "DONG-55-01", name: "火包", pinyin: "huǒ bāo", area: "五五部位", location: "足底第二趾第二节中央线", locationDesc: "足第二趾掌面中央", indications: ["心绞痛", "胸闷", "心慌", "手足冰冷", "心肌梗塞"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-55-02", name: "上瘤", pinyin: "shàng liú", area: "五五部位", location: "足底，足跟前方，足底跖腱膜中央凹陷处", locationDesc: "足底足跟前凹陷处", indications: ["脑瘤", "脑积水", "头痛", "眩晕", "脑神经痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-03", name: "海豹", pinyin: "hǎi bào", area: "五五部位", location: "足底，大趾与二趾间向下约1.5寸，跖骨间", locationDesc: "大趾二趾间下1.5寸", indications: ["疝气", "睾丸炎", "阑尾炎", "腹痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-04", name: "木妇", pinyin: "mù fù", area: "五五部位", location: "足大趾背侧，跖趾关节后，第一跖骨背侧", locationDesc: "足大趾背侧跖趾关节后", indications: ["月经不调", "痛经", "子宫肌瘤", "妇科炎症"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-05", name: "水曲", pinyin: "shuǐ qū", area: "五五部位", location: "足背，第四趾与第五趾间，跖趾关节后约1.5寸", locationDesc: "第四五趾间跖趾关节后1.5寸", indications: ["腰痛", "坐骨神经痛", "下肢麻木", "耳鸣"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-06", name: "火主", pinyin: "huǒ zhǔ", area: "五五部位", location: "足背，第一趾与第二趾间，跖趾关节后约1.5寸", locationDesc: "第一二趾间跖趾关节后1.5寸", indications: ["头痛", "眼痛", "牙痛", "心绞痛", "难产"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-07", name: "门金", pinyin: "mén jīn", area: "五五部位", location: "足背，第二趾与第三趾间，跖趾关节后约2寸", locationDesc: "第二三趾间跖趾关节后2寸", indications: ["急性胃肠炎", "腹痛", "腹泻", "阑尾炎", "呕吐"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-08", name: "木斗", pinyin: "mù dǒu", area: "五五部位", location: "足背，第三趾与第四趾间，跖趾关节后约1.5寸", locationDesc: "第三四趾间跖趾关节后1.5寸", indications: ["脾肿大", "消化不良", "肝病", "胁痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-09", name: "木留", pinyin: "mù liú", area: "五五部位", location: "足背，木斗穴后1寸", locationDesc: "木斗穴后1寸", indications: ["脾肿大", "消化不良", "肝病", "胁痛", "白血病"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-10", name: "六完", pinyin: "liù wán", area: "五五部位", location: "足背，第四趾与第五趾间，跖趾关节后约5分", locationDesc: "第四五趾间跖趾关节后5分", indications: ["偏头痛", "眩晕", "耳鸣", "鼻出血", "失眠"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-11", name: "水相", pinyin: "shuǐ xiāng", area: "五五部位", location: "足内侧，内踝尖直下，足跟内侧骨缘凹陷处", locationDesc: "内踝尖直下足跟内侧", indications: ["肾炎", "水肿", "腰痛", "肾虚", "蛋白尿"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-55-12", name: "水中", pinyin: "shuǐ zhōng", area: "五五部位", location: "足内侧，水相穴下1寸", locationDesc: "水相穴下1寸", indications: ["肾炎", "水肿", "腰痛", "肾虚", "蛋白尿"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },

  // ═══════════════ 六六部位（小腿部位）═══════════════
  { id: "DONG-66-01", name: "天皇", pinyin: "tiān huáng", area: "六六部位", location: "小腿内侧，胫骨内侧髁后下方凹陷处，弯曲膝盖时膝内侧凹陷处下方", locationDesc: "胫骨内侧髁后下方凹陷处", indications: ["胃酸过多", "胃痛", "反胃", "糖尿病", "蛋白尿", "肾炎", "尿频"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-02", name: "人皇", pinyin: "rén huáng", area: "六六部位", location: "小腿内侧，内踝上3寸，胫骨内侧后缘", locationDesc: "内踝上3寸胫骨后缘", indications: ["淋病", "阳痿", "早泄", "遗精", "腰脊椎骨痛", "脖子痛", "头晕", "手麻", "糖尿病", "蛋白尿"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-03", name: "地皇", pinyin: "dì huáng", area: "六六部位", location: "小腿内侧，内踝上7寸，胫骨内侧后缘", locationDesc: "内踝上7寸胫骨后缘", indications: ["肾脏炎", "四肢浮肿", "糖尿病", "淋病", "阳痿", "早泄", "遗精", "蛋白尿", "小便出血"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-04", name: "四肢", pinyin: "sì zhī", area: "六六部位", location: "小腿内侧，胫骨内侧髁后下方，天皇穴内侧", locationDesc: "胫骨内侧髁内侧", indications: ["四肢麻木", "四肢疼痛", "手足冰冷", "半身不遂"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-05", name: "明黄", pinyin: "míng huáng", area: "六六部位", location: "大腿内侧，膝盖内侧上方约3寸，肌腹中央", locationDesc: "大腿内侧膝上3寸", indications: ["肝硬化", "肝炎", "黄疸", "眼病", "脊椎骨膜炎"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-66-06", name: "天黄", pinyin: "tiān huáng", area: "六六部位", location: "大腿内侧，明黄穴上3寸", locationDesc: "明黄穴上3寸", indications: ["肝硬化", "肝炎", "黄疸", "眼病", "脊椎骨膜炎"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-66-07", name: "其黄", pinyin: "qí huáng", area: "六六部位", location: "大腿内侧，天黄穴上3寸", locationDesc: "天黄穴上3寸", indications: ["肝硬化", "肝炎", "黄疸", "眼病", "脊椎骨膜炎", "白血病"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-66-08", name: "通关", pinyin: "tōng guān", area: "六六部位", location: "小腿前侧，大腿正中线，膝盖上缘横纹上约5寸", locationDesc: "大腿正中膝上5寸", indications: ["心脏病", "心悸", "心包炎", "心绞痛", "心肌炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-09", name: "通山", pinyin: "tōng shān", area: "六六部位", location: "小腿前侧，通关穴上2寸", locationDesc: "通关穴上2寸", indications: ["心脏病", "心悸", "心包炎", "心绞痛", "心肌炎"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-10", name: "通天", pinyin: "tōng tiān", area: "六六部位", location: "小腿前侧，通山穴上2寸", locationDesc: "通山穴上2寸", indications: ["心脏病", "心悸", "心包炎", "心绞痛", "心肌炎", "头痛"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-11", name: "姐妹一", pinyin: "jiě mèi yī", area: "六六部位", location: "小腿内侧，胫骨内侧髁后下方，天皇穴后约1寸", locationDesc: "天皇穴后1寸", indications: ["子宫肌瘤", "子宫炎", "月经不调", "痛经", "不孕症"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-12", name: "姐妹二", pinyin: "jiě mèi èr", area: "六六部位", location: "小腿内侧，姐妹一穴上1寸", locationDesc: "姐妹一穴上1寸", indications: ["子宫肌瘤", "子宫炎", "月经不调", "痛经", "不孕症"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-13", name: "姐妹三", pinyin: "jiě mèi sān", area: "六六部位", location: "小腿内侧，姐妹二穴上1寸", locationDesc: "姐妹二穴上1寸", indications: ["子宫肌瘤", "子宫炎", "月经不调", "痛经", "不孕症"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-14", name: "外三关一", pinyin: "wài sān guān yī", area: "六六部位", location: "小腿外侧，腓骨小头与腓骨外踝连线上，腓骨小头下方约3寸", locationDesc: "小腿外侧腓骨小头下3寸", indications: ["扁桃体炎", "喉炎", "腮腺炎", "甲状腺肿", "颈部淋巴结"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-15", name: "外三关二", pinyin: "wài sān guān èr", area: "六六部位", location: "小腿外侧，外三关一穴下1.5寸", locationDesc: "外三关一穴下1.5寸", indications: ["扁桃体炎", "喉炎", "腮腺炎", "甲状腺肿", "颈部淋巴结"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },
  { id: "DONG-66-16", name: "外三关三", pinyin: "wài sān guān sān", area: "六六部位", location: "小腿外侧，外三关二穴下1.5寸", locationDesc: "外三关二穴下1.5寸", indications: ["扁桃体炎", "喉炎", "腮腺炎", "甲状腺肿", "颈部淋巴结"], method: "直刺", depth: "0.5-1.5寸", moxibustion: "可灸" },

  // ═══════════════ 七七部位（大腿部位）═══════════════
  { id: "DONG-77-01", name: "驷马上穴", pinyin: "sì mǎ shàng xué", area: "七七部位", location: "大腿外侧，髌骨外上缘上7.5寸", locationDesc: "膝髌骨外上缘上7.5寸", indications: ["过敏性鼻炎", "各种皮肤病", "牛皮癣", "湿疹", "荨麻疹", "气喘", "肺气肿"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸", notes: "皮肤病特效穴" },
  { id: "DONG-77-02", name: "驷马中穴", pinyin: "sì mǎ zhōng xué", area: "七七部位", location: "大腿外侧，驷马上穴下2寸", locationDesc: "驷马上穴直下2寸", indications: ["过敏性鼻炎", "各种皮肤病", "牛皮癣", "湿疹", "荨麻疹", "气喘", "肺气肿"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸", notes: "皮肤病特效穴" },
  { id: "DONG-77-03", name: "驷马下穴", pinyin: "sì mǎ xià xué", area: "七七部位", location: "大腿外侧，驷马中穴下2寸", locationDesc: "驷马中穴直下2寸", indications: ["过敏性鼻炎", "各种皮肤病", "牛皮癣", "湿疹", "荨麻疹", "气喘", "肺气肿"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸", notes: "皮肤病特效穴" },
  { id: "DONG-77-04", name: "中九里", pinyin: "zhōng jiǔ lǐ", area: "七七部位", location: "大腿外侧，大腿外侧正中线，膝盖上约9寸", locationDesc: "大腿外侧正中膝上9寸", indications: ["腰背痛", "坐骨神经痛", "大腿痛", "中风后遗症"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-77-05", name: "上九里", pinyin: "shàng jiǔ lǐ", area: "七七部位", location: "大腿外侧，中九里穴上1.5寸", locationDesc: "中九里穴上1.5寸", indications: ["腰背痛", "坐骨神经痛", "大腿痛", "中风后遗症"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-77-06", name: "下九里", pinyin: "xià jiǔ lǐ", area: "七七部位", location: "大腿外侧，中九里穴下1.5寸", locationDesc: "中九里穴下1.5寸", indications: ["腰背痛", "坐骨神经痛", "大腿痛", "中风后遗症"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-77-07", name: "七里穴", pinyin: "qī lǐ xué", area: "七七部位", location: "大腿外侧，中九里穴下2寸，膝盖上约7寸", locationDesc: "大腿外侧膝上7寸", indications: ["腰背痛", "坐骨神经痛", "大腿痛", "下肢不遂"], method: "直刺", depth: "1-2.5寸", moxibustion: "可灸" },
  { id: "DONG-77-08", name: "解穴", pinyin: "jiě xué", area: "七七部位", location: "大腿前侧，膝盖上缘横纹上约1寸，股直肌肌腱处", locationDesc: "膝盖上缘横纹上1寸", indications: ["各种痛症", "运动伤害", "扭伤", "肌肉拉伤", "止痛"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸", notes: "止痛要穴" },
  { id: "DONG-77-09", name: "金前", pinyin: "jīn qián", area: "七七部位", location: "大腿内侧，膝盖内侧上缘横纹上约3寸", locationDesc: "大腿内侧膝上3寸", indications: ["肝病", "肝硬化", "肝炎", "黄疸", "眼病"], method: "直刺", depth: "1-2寸", moxibustion: "可灸" },
  { id: "DONG-77-10", name: "金中", pinyin: "jīn zhōng", area: "七七部位", location: "大腿内侧，金前穴上3寸", locationDesc: "金前穴上3寸", indications: ["肝病", "肝硬化", "肝炎", "黄疸", "眼病"], method: "直刺", depth: "1-2寸", moxibustion: "可灸" },
  { id: "DONG-77-11", name: "金后", pinyin: "jīn hòu", area: "七七部位", location: "大腿内侧，金中穴上3寸", locationDesc: "金中穴上3寸", indications: ["肝病", "肝硬化", "肝炎", "黄疸", "眼病"], method: "直刺", depth: "1-2寸", moxibustion: "可灸" },
  { id: "DONG-77-12", name: "失音一", pinyin: "shī yīn yī", area: "七七部位", location: "大腿内侧，膝盖内侧上缘横纹上约5寸", locationDesc: "大腿内侧膝上5寸", indications: ["失音", "声音嘶哑", "咽喉炎", "喉头炎"], method: "直刺", depth: "1-2寸", moxibustion: "可灸" },
  { id: "DONG-77-13", name: "失音二", pinyin: "shī yīn èr", area: "七七部位", location: "大腿内侧，失音一穴上2寸", locationDesc: "失音一穴上2寸", indications: ["失音", "声音嘶哑", "咽喉炎", "喉头炎"], method: "直刺", depth: "1-2寸", moxibustion: "可灸" },

  // ═══════════════ 八八部位（躯干部位）═══════════════
  { id: "DONG-88-01", name: "总枢", pinyin: "zǒng shū", area: "八八部位", location: "后头部枕骨正下方凹陷处，后发际正中", locationDesc: "后发际正中央凹陷处", indications: ["呕吐", "头痛", "项强", "小儿惊风", "角弓反张", "晕车"], method: "直刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-02", name: "正会", pinyin: "zhèng huì", area: "八八部位", location: "头顶正中，两耳尖连线的中点，即百会穴处", locationDesc: "两耳尖连线中点", indications: ["中风", "半身不遂", "头痛", "眩晕", "癫痫", "脱肛"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-03", name: "后会", pinyin: "hòu huì", area: "八八部位", location: "正会穴后1.5寸", locationDesc: "正会穴后1.5寸", indications: ["中风", "头晕", "癫狂", "摇头", "小儿惊风"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-04", name: "州圆", pinyin: "zhōu yuán", area: "八八部位", location: "正会穴向右旁开1.3寸", locationDesc: "正会穴旁开1.3寸", indications: ["半身不遂", "中风", "四肢不遂", "风瘫"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-05", name: "州昆", pinyin: "zhōu kūn", area: "八八部位", location: "州圆穴后1.5寸", locationDesc: "州圆穴后1.5寸", indications: ["半身不遂", "中风", "四肢不遂", "风瘫"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-06", name: "州仑", pinyin: "zhōu lún", area: "八八部位", location: "州昆穴后1.5寸", locationDesc: "州昆穴后1.5寸", indications: ["半身不遂", "中风", "四肢不遂", "风瘫"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-07", name: "前会", pinyin: "qián huì", area: "八八部位", location: "正会穴前1.5寸", locationDesc: "正会穴前1.5寸", indications: ["中风", "头晕", "癫狂", "小儿惊风", "摇头"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-88-08", name: "镇静", pinyin: "zhèn jìng", area: "八八部位", location: "两眉头之间，印堂穴直上约0.5寸", locationDesc: "两眉头之间上0.5寸", indications: ["失眠", "神经衰弱", "癔病", "癫狂", "焦虑", "烦躁不安"], method: "平刺", depth: "0.3-0.5寸", moxibustion: "可灸", notes: "安神镇静要穴" },
  { id: "DONG-88-09", name: "马金水", pinyin: "mǎ jīn shuǐ", area: "八八部位", location: "面部，外眼角直下，颧骨下缘凹陷处", locationDesc: "外眼角直下颧骨下缘", indications: ["肾结石", "腰痛", "肾炎", "小便不利", "水肿"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-88-10", name: "马快水", pinyin: "mǎ kuài shuǐ", area: "八八部位", location: "面部，马金水穴下约0.4寸", locationDesc: "马金水穴下0.4寸", indications: ["膀胱结石", "尿道结石", "小便不利", "水肿"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-88-11", name: "腑快", pinyin: "fǔ kuài", area: "八八部位", location: "面部，鼻翼外侧，鼻唇沟上端", locationDesc: "鼻翼外侧鼻唇沟上端", indications: ["腹胀", "腹痛", "消化不良", "便秘", "腹泻"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },

  // ═══════════════ 九九部位（耳部）═══════════════
  { id: "DONG-99-01", name: "耳背", pinyin: "ěr bèi", area: "九九部位", location: "耳廓背面，耳廓背侧正中央", locationDesc: "耳廓背侧正中央", indications: ["高血压", "头痛", "眩晕", "失眠", "耳鸣"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-99-02", name: "耳上", pinyin: "ěr shàng", area: "九九部位", location: "耳廓上方尖端处", locationDesc: "耳廓尖端", indications: ["高血压", "头痛", "发热", "中暑", "咽喉肿痛"], method: "点刺出血", depth: "0.1寸", moxibustion: "可灸" },
  { id: "DONG-99-03", name: "耳下", pinyin: "ěr xià", area: "九九部位", location: "耳垂下方，耳垂与面部连接处", locationDesc: "耳垂下方", indications: ["牙痛", "面痛", "三叉神经痛", "口腔溃疡"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-99-04", name: "金耳", pinyin: "jīn ěr", area: "九九部位", location: "耳廓背侧上方，耳背穴上方约1cm", locationDesc: "耳背穴上方1cm", indications: ["肺病", "咳嗽", "气喘", "支气管炎", "肺炎"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-99-05", name: "木耳", pinyin: "mù ěr", area: "九九部位", location: "耳廓背侧下方，耳背穴下方约1cm", locationDesc: "耳背穴下方1cm", indications: ["肝病", "肝炎", "胁痛", "黄疸", "眼病"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-99-06", name: "水耳", pinyin: "shuǐ ěr", area: "九九部位", location: "耳廓背侧中部，耳背穴水平方向", locationDesc: "耳背穴水平", indications: ["肾病", "肾炎", "水肿", "耳鸣", "腰痛"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-99-07", name: "火耳", pinyin: "huǒ ěr", area: "九九部位", location: "耳廓背侧上方偏前，金耳穴前", locationDesc: "耳廓背侧上方偏前", indications: ["心脏病", "心悸", "心绞痛", "失眠", "口腔溃疡"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },
  { id: "DONG-99-08", name: "土耳", pinyin: "tǔ ěr", area: "九九部位", location: "耳廓背侧中部偏下，木耳穴上方", locationDesc: "耳廓背侧中部偏下", indications: ["脾胃病", "消化不良", "腹胀", "腹泻", "食欲不振"], method: "直刺", depth: "0.1-0.2寸", moxibustion: "可灸" },

  // ═══════════════ 十十部位（头面部）═══════════════
  { id: "DONG-10-01", name: "正脑一", pinyin: "zhèng nǎo yī", area: "十十部位", location: "头部，正会穴旁开1寸，左右各一", locationDesc: "正会穴旁开1寸", indications: ["脑震荡", "脑膜炎", "头痛", "癫狂", "癫痫"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-10-02", name: "正脑二", pinyin: "zhèng nǎo èr", area: "十十部位", location: "头部，正脑一穴后1寸", locationDesc: "正脑一穴后1寸", indications: ["脑震荡", "脑膜炎", "头痛", "癫狂", "癫痫"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-10-03", name: "州火", pinyin: "zhōu huǒ", area: "十十部位", location: "头部，正会穴旁开1.5寸，前方约0.5寸", locationDesc: "正会穴旁开1.5寸前", indications: ["半身不遂", "中风", "颜面神经麻痹", "口眼歪斜"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-10-04", name: "州金", pinyin: "zhōu jīn", area: "十十部位", location: "头部，州火穴后1寸", locationDesc: "州火穴后1寸", indications: ["半身不遂", "中风", "颜面神经麻痹", "口眼歪斜"], method: "平刺", depth: "0.5-1寸", moxibustion: "可灸" },
  { id: "DONG-10-05", name: "鼻翼", pinyin: "bí yì", area: "十十部位", location: "面部，鼻翼两侧，鼻翼根部外侧凹陷处", locationDesc: "鼻翼根部外侧凹陷", indications: ["鼻炎", "鼻塞", "鼻出血", "过敏性鼻炎", "副鼻窦炎"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-10-06", name: "玉火", pinyin: "yù huǒ", area: "十十部位", location: "面部，眼外角直下，颧骨下缘凹陷处", locationDesc: "眼外角直下颧骨下缘", indications: ["心绞痛", "胸痛", "坐骨神经痛", "腰痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-10-07", name: "水通", pinyin: "shuǐ tōng", area: "十十部位", location: "面部，嘴角外侧，口角旁开约0.5寸", locationDesc: "嘴角外侧0.5寸", indications: ["颜面神经麻痹", "口眼歪斜", "三叉神经痛", "牙痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
  { id: "DONG-10-08", name: "水金", pinyin: "shuǐ jīn", area: "十十部位", location: "面部，水通穴下约0.5寸，下颌骨边缘", locationDesc: "水通穴下0.5寸", indications: ["颜面神经麻痹", "口眼歪斜", "三叉神经痛", "牙痛"], method: "直刺", depth: "0.3-0.5寸", moxibustion: "可灸" },
]

// 导出董氏奇穴总数
export const DONG_POINTS_COUNT = DONG_POINTS.length