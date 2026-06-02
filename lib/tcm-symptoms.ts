// 中医症状数据库
// 基于《黄帝内经》《伤寒论》《金匮要略》等经典

export interface Symptom {
  id: string
  name: string
  category: string
  subCategory: string
  relatedOrgans: string[] // 相关脏腑
  relatedMeridians: string[] // 相关经络
  relatedPoints: string[] // 常用配穴
  possibleCauses: string[] // 可能病因
  descriptions: string[] // 症状描述
  tongue: string[] // 舌象
  pulse: string[] // 脉象
  severity: "mild" | "moderate" | "severe"
}

// 症状分类
export const SYMPTOM_CATEGORIES = {
  head面部: {
    头痛: ["头痛", "偏头痛", "巅顶痛", "前额痛", "后头痛", "眉棱骨痛"],
    眼部: ["眼睛干涩", "眼睛疲劳", "视力模糊", "眼睑跳动", "目赤肿痛", "视物昏花"],
    耳部: ["耳鸣", "耳聋", "听力下降", "耳内流脓", "耳痒"],
    鼻部: ["鼻塞", "流涕", "鼻出血", "嗅觉减退", "鼻炎"],
    口腔: ["口干", "口苦", "口臭", "口腔溃疡", "牙痛", "舌痛"],
    面部: ["面部麻木", "面部疼痛", "面瘫", "痤疮", "色斑"],
  },
  胸腹部: {
    胸部: ["胸闷", "胸痛", "心悸", "喘息", "咳嗽", "气短"],
    乳房: ["乳房胀痛", "乳腺增生", "乳汁不下"],
    腹部: ["腹痛", "腹胀", "腹泻", "便秘", "恶心呕吐", "嗳气", "胃脘痛"],
    胁部: ["胁痛", "胁胀", "胁下痞硬"],
  },
  四肢: {
    上肢: ["肩周炎", "手臂疼痛", "手臂麻木", "手指关节痛", "上肢无力"],
    下肢: ["腿痛", "腿麻", "膝关节痛", "脚踝肿痛", "下肢静脉曲张", "小腿抽筋"],
    关节: ["关节疼痛", "关节肿胀", "关节僵硬", "类风湿性关节炎"],
    运动: ["运动障碍", "步态异常", "肌肉萎缩", "肌肉痉挛"],
  },
  全身: {
    寒热: ["发热", "畏寒", "寒热往来", "低热", "高热", "潮热"],
    出汗: ["自汗", "盗汗", "多汗", "冷汗", "汗出不畅"],
    睡眠: ["失眠", "多梦", "嗜睡", "早醒", "睡眠质量差"],
    精神: ["疲劳", "乏力", "精神萎靡", "烦躁", "焦虑", "抑郁", "记忆力减退"],
    体重: ["体重下降", "体重增加", "消瘦", "肥胖"],
    其他: ["水肿", "黄疸", "出血", "皮疹", "瘙痒"],
  },
  泌尿: {
    排尿: ["尿频", "尿急", "尿痛", "尿不尽", "夜尿多", "少尿", "多尿"],
    异常: ["血尿", "蛋白尿", "尿浑浊", "石淋"],
  },
  生殖: {
    男性: ["阳痿", "早泄", "遗精", "少精", "不育", "睾丸疼痛"],
    女性: ["月经不调", "痛经", "闭经", "崩漏", "带下", "不孕", "妊娠反应", "产后调理"],
    乳房: ["乳汁不足", "乳腺炎", "乳房胀痛"],
  },
  消化: {
    食欲: ["食欲不振", "食欲亢进", "消化不良", "嗳气", "吞酸"],
    胃肠: ["胃痛", "胃胀", "恶心", "呕吐", "腹泻", "便秘", "便溏", "便血"],
    肝胆: ["胁痛", "黄疸", "口苦", "厌油腻"],
  },
  皮肤: {
    皮损: ["皮疹", "湿疹", "荨麻疹", "银屑病", "白癜风", "带状疱疹"],
    瘙痒: ["皮肤瘙痒", "阴痒", "肛痒"],
    颜色: ["皮肤发黄", "皮肤苍白", "皮肤青紫", "色素沉着"],
    其他: ["疖肿", "痈疽", "丹毒", "褥疮"],
  },
  舌象脉象: {
    舌质: ["舌淡", "舌红", "舌绛", "舌紫", "舌胖", "舌瘦", "舌裂"],
    舌苔: ["苔薄", "苔厚", "苔白", "苔黄", "苔灰", "苔黑", "苔腻", "苔燥"],
    脉象: ["浮脉", "沉脉", "迟脉", "数脉", "滑脉", "涩脉", "虚脉", "实脉", "洪脉", "细脉", "弦脉", "紧脉", "缓脉", "弱脉"],
  },
}

// 症状详情数据
export const SYMPTOMS_DETAIL: Record<string, Symptom> = {
  头痛: {
    id: "headache",
    name: "头痛",
    category: "头面部",
    subCategory: "头痛",
    relatedOrgans: ["肝", "肾", "脾"],
    relatedMeridians: ["GB", "LR", "BL"],
    relatedPoints: ["百会", "太阳", "风池", "合谷", "太冲"],
    possibleCauses: ["外感风寒", "肝阳上亢", "气血亏虚", "肾虚", "痰浊上扰", "瘀血阻络"],
    descriptions: ["头部疼痛，范围可局限于额头、顶部、颞部或枕部", "可伴有恶心、呕吐、畏光等症状"],
    tongue: ["舌淡红", "舌红苔黄", "舌紫暗"],
    pulse: ["浮紧", "弦数", "细弱"],
    severity: "moderate"
  },
  胸闷: {
    id: "chest_stuffiness",
    name: "胸闷",
    category: "胸腹部",
    subCategory: "胸部",
    relatedOrgans: ["心", "肺"],
    relatedMeridians: ["HT", "LU", "PC"],
    relatedPoints: ["膻中", "内关", "心俞", "肺俞", "太渊"],
    possibleCauses: ["气滞", "痰阻", "血瘀", "寒凝", "心气不足", "肺气郁闭"],
    descriptions: ["胸部痞闷，呼吸不畅", "轻者自觉气息不足，重者呼吸困难"],
    tongue: ["舌淡红", "舌紫暗", "苔白腻"],
    pulse: ["弦", "涩", "滑"],
    severity: "moderate"
  },
  腹痛: {
    id: "abdominal_pain",
    name: "腹痛",
    category: "胸腹部",
    subCategory: "腹部",
    relatedOrgans: ["脾", "胃", "肝", "肾", "大肠"],
    relatedMeridians: ["SP", "ST", "LR", "KI", "CV"],
    relatedPoints: ["中脘", "天枢", "足三里", "关元", "太冲"],
    possibleCauses: ["寒凝", "热结", "气滞", "血瘀", "食积", "虫积", "虚寒"],
    descriptions: ["腹部疼痛，范围可在上腹、脐周、下腹", "性质可表现为胀痛、刺痛、冷痛、隐痛等"],
    tongue: ["舌淡苔白", "舌红苔黄", "舌紫暗"],
    pulse: ["沉紧", "弦", "涩", "迟"],
    severity: "moderate"
  },
  肩周炎: {
    id: "frozen_shoulder",
    name: "肩周炎",
    category: "四肢",
    subCategory: "上肢",
    relatedOrgans: ["肝", "肾"],
    relatedMeridians: ["LI", "TE", "GB", "SI"],
    relatedPoints: ["肩髃", "肩髎", "肩贞", "天宗", "曲池", "外关"],
    possibleCauses: ["风寒湿侵袭", "慢性劳损", "气血瘀滞", "肝肾亏虚"],
    descriptions: ["肩部疼痛，活动受限", "夜间疼痛加重，严重者不能梳头、穿衣"],
    tongue: ["舌淡苔白", "舌红苔黄"],
    pulse: ["弦紧", "涩"],
    severity: "moderate"
  },
  失眠: {
    id: "insomnia",
    name: "失眠",
    category: "全身",
    subCategory: "睡眠",
    relatedOrgans: ["心", "肝", "脾", "肾", "胆"],
    relatedMeridians: ["HT", "LR", "SP", "KI", "GB"],
    relatedPoints: ["神门", "内关", "百会", "安眠", "三阴交", "太冲"],
    possibleCauses: ["心肾不交", "心脾两虚", "肝郁化火", "痰热内扰", "心胆气虚"],
    descriptions: ["难以入睡，或睡后易醒，醒后难再睡", "严重者整夜不眠，伴有头痛、健忘、心悸等"],
    tongue: ["舌红少苔", "舌淡苔白", "舌苔黄腻"],
    pulse: ["细数", "弦数", "滑"],
    severity: "mild"
  },
  腰痛: {
    id: "low_back_pain",
    name: "腰痛",
    category: "四肢",
    subCategory: "下肢",
    relatedOrgans: ["肾", "肝"],
    relatedMeridians: ["BL", "GV", "KI", "LR"],
    relatedPoints: ["肾俞", "腰俞", "委中", "阿是穴", "太溪"],
    possibleCauses: ["肾虚", "寒湿", "湿热", "瘀血", "扭伤"],
    descriptions: ["腰部疼痛，可放射至臀部或下肢", "常见于腰肌劳损、腰椎间盘突出、肾虚等"],
    tongue: ["舌淡苔白", "舌红少苔", "舌紫暗"],
    pulse: ["沉细", "弦", "涩"],
    severity: "moderate"
  },
  膝关节痛: {
    id: "knee_pain",
    name: "膝关节痛",
    category: "四肢",
    subCategory: "关节",
    relatedOrgans: ["肝", "肾", "脾"],
    relatedMeridians: ["ST", "SP", "GB", "BL", "KI"],
    relatedPoints: ["膝眼", "犊鼻", "足三里", "阴陵泉", "阳陵泉", "委中"],
    possibleCauses: ["风寒湿痹", "肝肾亏虚", "气血不足", "外伤瘀血"],
    descriptions: ["膝关节疼痛，肿胀，屈伸不利", "行走困难，遇寒加重"],
    tongue: ["舌淡苔白", "舌红苔黄", "舌紫暗"],
    pulse: ["弦紧", "沉细", "涩"],
    severity: "moderate"
  },
  胃痛: {
    id: "stomach_pain",
    name: "胃痛",
    category: "消化",
    subCategory: "胃肠",
    relatedOrgans: ["胃", "脾", "肝"],
    relatedMeridians: ["ST", "SP", "LR", "CV"],
    relatedPoints: ["中脘", "内关", "足三里", "公孙", "期门"],
    possibleCauses: ["寒邪客胃", "饮食伤胃", "肝气犯胃", "脾胃虚寒", "胃阴亏虚"],
    descriptions: ["上腹部疼痛，胀满，嗳气", "可伴有反酸、恶心、呕吐等症状"],
    tongue: ["舌淡苔白", "舌红苔黄", "舌红少苔"],
    pulse: ["沉紧", "弦", "细数"],
    severity: "moderate"
  },
  月经不调: {
    id: "menstrual_disorder",
    name: "月经不调",
    category: "生殖",
    subCategory: "女性",
    relatedOrgans: ["肝", "脾", "肾", "子宫"],
    relatedMeridians: ["LR", "SP", "KI", "CV", "BL"],
    relatedPoints: ["三阴交", "关元", "血海", "太冲", "肾俞", "地机"],
    possibleCauses: ["肝郁", "脾虚", "肾虚", "血瘀", "痰湿", "寒凝"],
    descriptions: ["月经周期紊乱，经量异常", "可表现为提前、推后、先后不定，量多或量少"],
    tongue: ["舌淡苔白", "舌红少苔", "舌紫暗"],
    pulse: ["弦", "细", "涩"],
    severity: "moderate"
  },
  便秘: {
    id: "constipation",
    name: "便秘",
    category: "消化",
    subCategory: "胃肠",
    relatedOrgans: ["大肠", "脾", "胃", "肝", "肾"],
    relatedMeridians: ["LI", "ST", "SP", "LR", "CV"],
    relatedPoints: ["天枢", "大肠俞", "上巨虚", "支沟", "照海", "足三里"],
    possibleCauses: ["热秘", "气秘", "虚秘", "冷秘", "血虚", "阴虚"],
    descriptions: ["大便干结，排便困难", "可数日一行，伴有腹胀、腹痛、口臭等"],
    tongue: ["舌红苔黄", "舌淡苔白", "舌红少苔"],
    pulse: ["滑数", "弦", "沉细"],
    severity: "mild"
  },
}

// 常见症状组合（证型）
export const SYNDROME_PATTERNS = {
  肝郁气滞: {
    name: "肝郁气滞",
    symptoms: ["胸闷", "胁痛", "腹痛", "胃痛"],
    tongue: ["舌淡红", "苔白", "舌边红"],
    pulse: ["弦"],
    treatment: "疏肝理气",
    points: ["太冲", "期门", "内关", "阳陵泉", "支沟"],
    herbs: ["柴胡", "香附", "郁金", "川芎", "枳壳"],
  },
  脾胃虚寒: {
    name: "脾胃虚寒",
    symptoms: ["胃痛", "腹痛", "腹泻", "食欲不振"],
    tongue: ["舌淡", "苔白", "舌边有齿痕"],
    pulse: ["沉细", "迟"],
    treatment: "温中健脾",
    points: ["中脘", "足三里", "关元", "脾俞", "胃俞"],
    herbs: ["党参", "白术", "干姜", "炙甘草", "附子"],
  },
  肾阴虚: {
    name: "肾阴虚",
    symptoms: ["腰痛", "失眠", "疲劳", "耳鸣"],
    tongue: ["舌红", "少苔", "舌裂"],
    pulse: ["细数"],
    treatment: "滋阴补肾",
    points: ["肾俞", "太溪", "三阴交", "照海", "涌泉"],
    herbs: ["熟地", "山茱萸", "山药", "泽泻", "知母"],
  },
  风湿痹: {
    name: "风湿痹",
    symptoms: ["关节疼痛", "腰痛", "肩周炎", "四肢麻木"],
    tongue: ["舌淡", "苔白腻"],
    pulse: ["弦紧", "涩"],
    treatment: "祛风除湿",
    points: ["阿是穴", "曲池", "合谷", "阴陵泉", "委中"],
    herbs: ["独活", "寄生", "秦艽", "防风", "川芎"],
  },
  心肾不交: {
    name: "心肾不交",
    symptoms: ["失眠", "心悸", "腰痛", "疲劳"],
    tongue: ["舌红", "少苔"],
    pulse: ["细数", "寸脉旺"],
    treatment: "交通心肾",
    points: ["神门", "内关", "肾俞", "太溪", "心俞"],
    herbs: ["黄连", "肉桂", "生地", "山茱萸", "五味子"],
  },
  痰湿体质: {
    name: "痰湿体质",
    symptoms: ["肥胖", "胸闷", "腹胀", "疲劳"],
    tongue: ["舌胖", "苔白腻", "舌边有齿痕"],
    pulse: ["滑"],
    treatment: "化痰祛湿",
    points: ["丰隆", "阴陵泉", "中脘", "足三里", "脾俞"],
    herbs: ["半夏", "陈皮", "茯苓", "甘草", "枳实"],
  },
}

// 症状部位关联（用于人体模型点击）
export const BODY_PART_SYMPTOMS: Record<string, string[]> = {
  头部: ["头痛", "头晕", "眩晕", "耳鸣", "失眠", "记忆力减退"],
  颈部: ["颈椎痛", "颈部僵硬", "落枕", "肩背痛"],
  肩部: ["肩周炎", "肩痛", "手臂麻木", "肩部怕冷"],
  胸部: ["胸闷", "心悸", "喘息", "咳嗽", "胁痛"],
  上腹部: ["胃痛", "胃胀", "嗳气", "反酸", "恶心"],
  下腹部: ["腹痛", "腹胀", "腹泻", "便秘", "尿频"],
  腰部: ["腰痛", "腰酸", "腰部怕冷", "坐骨神经痛"],
  上肢: ["手臂疼痛", "手指关节痛", "上肢麻木", "肌肉萎缩"],
  下肢: ["腿痛", "腿麻", "膝关节痛", "脚踝肿痛", "小腿抽筋"],
  全身: ["疲劳", "乏力", "发热", "畏寒", "自汗", "盗汗", "失眠", "肥胖", "消瘦"],
}

// 获取症状详情
export function getSymptomDetail(symptomName: string): Symptom | undefined {
  return SYMPTOMS_DETAIL[symptomName]
}

// 获取相关症状
export function getRelatedSymptoms(symptomName: string): string[] {
  const symptom = SYMPTOMS_DETAIL[symptomName]
  if (!symptom) return []

  const related: string[] = []
  Object.values(SYMPTOMS_DETAIL).forEach(s => {
    if (s.id !== symptom.id) {
      // 检查是否有共同的经络或脏腑
      const commonOrgans = s.relatedOrgans.filter(o => symptom.relatedOrgans.includes(o))
      const commonMeridians = s.relatedMeridians.filter(m => symptom.relatedMeridians.includes(m))
      if (commonOrgans.length > 0 || commonMeridians.length > 0) {
        related.push(s.name)
      }
    }
  })

  return related.slice(0, 5)
}
