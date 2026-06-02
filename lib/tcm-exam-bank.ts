// 中医题库数据库
// 包含中医基础理论、经络穴位、方剂学、诊断学等题目

export interface Question {
  id: string
  type: "single" | "multiple" | "truefalse" | "short"  // 单选、多选、判断、简答
  category: string
  subCategory: string
  difficulty: 1 | 2 | 3  // 1简单 2中等 3困难
  question: string
  options?: string[]  // 选择题选项
  answer: string | string[]  // 答案
  explanation: string  // 解析
  source?: string  // 出处/来源
  points?: string[]  // 相关穴位/经络/方剂
  tips?: string  // 答题技巧
}

// 题库分类
export const QUESTION_CATEGORIES = {
  中医基础: {
    阴阳五行: ["阴阳学说", "五行学说", "脏腑关系"],
    气血津液: ["气", "血", "津液", "气血关系"],
    病因病机: ["六淫", "七情", "饮食劳逸", "病机"],
  },
  经络穴位: {
    十二正经: ["手三阴经", "手三阳经", "足三阴经", "足三阳经"],
    奇经八脉: ["任脉", "督脉", "冲脉", "带脉", "阴维脉", "阳维脉", "阴跷脉", "阳跷脉"],
    穴位定位: ["头颈部", "胸腹部", "背腰部", "上肢部", "下肢部"],
    穴位功效: ["五腧穴", "原穴", "络穴", "郄穴", "背俞穴", "募穴"],
  },
  中药学: {
    四气五味: ["寒热温凉", "辛甘酸苦咸"],
    配伍禁忌: ["十八反", "十九畏", "妊娠禁忌"],
    常用中药: ["解表药", "清热药", "泻下药", "祛风湿药", "化湿药", "利水渗湿药", "温里药", "理气药", "消食药", "止血药", "活血化瘀药", "化痰止咳平喘药", "安神药", "补虚药"],
  },
  方剂学: {
    解表剂: ["辛温解表", "辛凉解表", "扶正解表"],
    和解剂: ["和解少阳", "调和肝脾", "调和肠胃"],
    清热剂: ["清气分热", "清营凉血", "清热解毒", "清脏腑热"],
    温里剂: ["温中祛寒", "回阳救逆", "温经散寒"],
    补益剂: ["补气", "补血", "气血双补", "补阴", "补阳"],
  },
  诊断学: {
    望诊: ["望神", "望色", "望形", "望态", "舌诊"],
    闻诊: ["听声音", "嗅气味"],
    问诊: ["问寒热", "问汗", "问疼痛", "问睡眠", "问饮食", "问二便"],
    切诊: ["脉诊", "按诊"],
  },
  针灸学: {
    针灸理论: ["针灸原理", "针灸原则", "配穴方法"],
    针灸操作: ["针刺手法", "艾灸方法", "拔罐方法"],
    针灸治疗: ["内科病证", "外科病证", "妇科病证", "儿科病证", "五官科病证"],
  },
  内科学: {
    肺系疾病: ["感冒", "咳嗽", "哮喘", "肺痿"],
    心系疾病: ["心悸", "胸痹", "不寐"],
    脾胃疾病: ["胃痛", "腹痛", "便秘", "泄泻"],
    肝胆疾病: ["胁痛", "黄疸", "眩晕"],
    肾系疾病: ["水肿", "淋证", "腰痛"],
  },
}

// 题库数据
export const QUESTIONS: Question[] = [
  // 经络穴位 - 单选题
  {
    id: "meridian_001",
    type: "single",
    category: "经络穴位",
    subCategory: "十二正经",
    difficulty: 1,
    question: "手太阴肺经的起始穴位是？",
    options: ["中府", "云门", "少商", "商阳"],
    answer: "中府",
    explanation: "手太阴肺经起于中焦胃脘部，向下联络大肠，回绕过来沿着胃的上口，通过横膈，连属肺脏，从肺系（气管、喉咙）横行出来，向下沿上臂内侧，行于手少阴心经和手厥阴心包经的前面，下至肘中，沿着前臂内侧桡骨边缘，进入寸口（桡动脉搏动处），上向大鱼际部，沿边际，出大指的末端。其起始穴为中府。",
    source: "《针灸学》",
    tips: "肺经起于中府，终于少商"
  },
  {
    id: "meridian_002",
    type: "single",
    category: "经络穴位",
    subCategory: "十二正经",
    difficulty: 2,
    question: "足阳明胃经的合穴是？",
    options: ["内庭", "陷谷", "足三里", "解溪"],
    answer: "足三里",
    explanation: "足三里是足阳明胃经的合穴，也是胃的下合穴。合穴多位于肘膝关节附近，是经气汇合之处。足三里具有调理脾胃、补中益气、通经活络、扶正祛邪的功效，是保健要穴。",
    source: "《针灸学》",
    points: ["足三里", "合穴"]
  },
  {
    id: "meridian_003",
    type: "single",
    category: "经络穴位",
    subCategory: "穴位功效",
    difficulty: 2,
    question: "下列穴位中，哪个是心包的募穴？",
    options: ["膻中", "巨阙", "中脘", "关元"],
    answer: "膻中",
    explanation: "膻中是心包的募穴，也是气会。位于胸部，当前正中线上，平第4肋间，两乳头连线的中点。主治心痛、心悸、胸闷、气短等心系病证，以及咳嗽、哮喘等肺系病证。",
    source: "《针灸学》",
    points: ["膻中", "募穴", "心包"]
  },
  {
    id: "meridian_004",
    type: "multiple",
    category: "经络穴位",
    subCategory: "奇经八脉",
    difficulty: 3,
    question: "下列哪些经脉与奇经八脉中的督脉有直接联系？（多选）",
    options: ["足太阳膀胱经", "足少阴肾经", "手太阳小肠经", "足少阳胆经"],
    answer: ["足太阳膀胱经", "手太阳小肠经"],
    explanation: "督脉行于身后正中线，与足太阳膀胱经在风府、哑门处相络入脑，手太阳小肠经从肩胛部下循脊柱，与督脉相交。其他选项的经脉主要循行于身体侧面或前方。",
    source: "《经络学》",
    points: ["督脉", "足太阳膀胱经", "手太阳小肠经"]
  },
  {
    id: "meridian_005",
    type: "truefalse",
    category: "经络穴位",
    subCategory: "穴位定位",
    difficulty: 1,
    question: "合谷穴在手背，第1、2掌骨间，当掌骨间的中点处。",
    options: ["正确", "错误"],
    answer: "错误",
    explanation: "合谷穴在手背，第1、2掌骨间，当第2掌骨桡侧的中点处。不是掌骨间的中点，而是第2掌骨桡侧的中点。简便取穴法：以一手的拇指指骨关节横纹，放在另一手拇指、食指之间的指蹼缘上，当拇指尖下是穴。",
    source: "《针灸学》",
    points: ["合谷"]
  },
  // 方剂学 - 单选题
  {
    id: "formula_001",
    type: "single",
    category: "方剂学",
    subCategory: "解表剂",
    difficulty: 1,
    question: "桂枝汤的组成药物不包括下列哪一味？",
    options: ["桂枝", "白芍", "麻黄", "甘草"],
    answer: "麻黄",
    explanation: "桂枝汤出自《伤寒论》，由桂枝、白芍、生姜、大枣、炙甘草组成，用于外感风寒表虚证。麻黄汤虽也是解表剂，但组成是麻黄、桂枝、杏仁、炙甘草，用于外感风寒表实证。两者组成不同，需注意区分。",
    source: "《伤寒论》",
    points: ["桂枝汤", "麻黄汤"]
  },
  {
    id: "formula_002",
    type: "single",
    category: "方剂学",
    subCategory: "补益剂",
    difficulty: 2,
    question: "六味地黄丸的“三补”是指哪三味药？",
    options: ["熟地、山药、茯苓", "熟地、山茱萸、丹皮", "熟地、山药、山茱萸", "山药、茯苓、泽泻"],
    answer: "熟地、山药、山茱萸",
    explanation: "六味地黄丸由熟地黄、山茱萸、山药、泽泻、茯苓、丹皮组成。其中熟地黄、山茱萸、山药为“三补”，滋阴补肾；泽泻、茯苓、丹皮为“三泻”，泻浊利湿。三补三泻配伍特点使其补而不腻。",
    source: "《小儿药证直诀》",
    points: ["六味地黄丸", "三补"]
  },
  {
    id: "formula_003",
    type: "multiple",
    category: "方剂学",
    subCategory: "补益剂",
    difficulty: 2,
    question: "下列哪些是补中益气汤的功用？（多选）",
    options: ["补中益气", "升阳举陷", "清热解毒", "调和营卫"],
    answer: ["补中益气", "升阳举陷"],
    explanation: "补中益气汤出自《脾胃论》，功用是补中益气、升阳举陷。主治脾胃气虚证、中气下陷证和气虚发热证。方中黄芪为君药，人参、白术、炙甘草健脾益气为臣，当归养血、陈皮理气为佐，升麻、柴胡升阳举陷为使。",
    source: "《脾胃论》",
    points: ["补中益气汤", "补中益气", "升阳举陷"]
  },
  {
    id: "formula_004",
    type: "single",
    category: "方剂学",
    subCategory: "和解剂",
    difficulty: 2,
    question: "小柴胡汤中和解少阳的药物组合是？",
    options: ["柴胡、黄芩", "人参、半夏", "生姜、大枣", "甘草、白芍"],
    answer: "柴胡、黄芩",
    explanation: "小柴胡汤中柴胡透散少阳之邪，黄芩清泄少阳之热，二者合用为和解少阳的核心药物。人参、半夏、生姜、大枣、甘草主要是健脾和胃、益气扶正的功用。",
    source: "《伤寒论》",
    points: ["小柴胡汤", "柴胡", "黄芩"]
  },
  // 诊断学 - 单选题
  {
    id: "diagnosis_001",
    type: "single",
    category: "诊断学",
    subCategory: "望诊",
    difficulty: 2,
    question: "下列哪种舌象主热证？",
    options: ["舌淡", "舌红", "舌淡胖", "舌边有齿痕"],
    answer: "舌红",
    explanation: "舌红主热证，舌色越红，热象越重。舌淡主气血虚；舌淡胖主脾肾阳虚；舌边有齿痕主脾虚湿盛。需要注意的是，舌红少苔主阴虚，舌红苔黄主实热。",
    source: "《中医诊断学》",
    tips: "舌诊中，红主热，淡主虚，紫主瘀，青主寒"
  },
  {
    id: "diagnosis_002",
    type: "single",
    category: "诊断学",
    subCategory: "问诊",
    difficulty: 1,
    question: "“但欲漱水不欲咽”常见于下列哪种证候？",
    options: ["外感风寒", "阳明经热证", "瘀血内阻", "痰饮内停"],
    answer: "瘀血内阻",
    explanation: "“但欲漱水不欲咽”出自《伤寒论》，是瘀血内阻的特征性表现。瘀血内阻，津液不能上承，故口燥欲漱水；但病在血分，非气分热盛，故又不欲咽下。阳明经热证是渴欲饮水且饮水量多。",
    source: "《伤寒论》",
    tips: "瘀血特征：口燥漱水不欲咽，舌质紫暗，脉涩"
  },
  {
    id: "diagnosis_003",
    type: "multiple",
    category: "诊断学",
    subCategory: "脉诊",
    difficulty: 3,
    question: "下列哪些脉象主痰饮？（多选）",
    options: ["滑脉", "弦脉", "迟脉", "濡脉"],
    answer: ["滑脉", "弦脉"],
    explanation: "滑脉主痰饮、食滞、实热。弦脉主痰饮、肝胆病、痛证。迟脉主寒证。濡脉（浮而细软）主虚证、湿证。痰饮病证常见滑脉和弦脉，如《金匮要略》所言：“脉偏弦者饮也”。",
    source: "《中医诊断学》",
    points: ["滑脉", "弦脉", "痰饮"]
  },
  // 中药学 - 单选题
  {
    id: "herb_001",
    type: "single",
    category: "中药学",
    subCategory: "配伍禁忌",
    difficulty: 2,
    question: "“十八反”中，与乌头相反的药物是？",
    options: ["甘草", "海藻", "藜芦", "细辛"],
    answer: "甘草",
    explanation: "“十八反”歌诀中有“本草明言十八反，半蒌贝蔹芨攻乌，藻戟遂芫俱战草，诸参辛芍叛藜芦”。其中乌头（包括川乌、草乌、附子）反甘草。所以开方时乌头不能与甘草同用。",
    source: "《中药学》",
    tips: "十八反是常考内容，需熟记歌诀"
  },
  {
    id: "herb_002",
    type: "single",
    category: "中药学",
    subCategory: "四气五味",
    difficulty: 1,
    question: "下列药物中，哪一味药性属寒？",
    options: ["附子", "干姜", "黄连", "肉桂"],
    answer: "黄连",
    explanation: "黄连性寒，归心、脾、胃、肝、胆、大肠经，具有清热燥湿、泻火解毒的功效。附子、干姜、肉桂均为温热性药物，其中附子、肉桂补火助阳，干姜温中散寒。",
    source: "《中药学》",
    points: ["黄连", "寒", "清热燥湿"]
  },
  // 针灸学 - 判断题
  {
    id: "acupuncture_001",
    type: "truefalse",
    category: "针灸学",
    subCategory: "针灸操作",
    difficulty: 2,
    question: "对于体质虚弱者，针刺治疗时应采用强刺激手法，以达到治疗效果。",
    options: ["正确", "错误"],
    answer: "错误",
    explanation: "对于体质虚弱者，应采用弱刺激或中等刺激手法，宜轻不宜重，留针时间不宜过长。《灵枢·经脉》篇指出：“盛则泻之，虚则补之。”体质虚弱者本已正气不足，应以补法为主，慎用泻法，强刺激会加重虚损。",
    source: "《灵枢》",
    points: ["针刺手法", "补泻"]
  },
  {
    id: "acupuncture_002",
    type: "single",
    category: "针灸学",
    subCategory: "配穴方法",
    difficulty: 2,
    question: "“肚腹三里留”体现的是哪种配穴方法？",
    options: ["近部选穴", "远部选穴", "辨证选穴", "对症选穴"],
    answer: "远部选穴",
    explanation: "“肚腹三里留”是《四总穴歌》中的内容，体现了远部选穴的原则。远部选穴是指在距离病变部位较远的地方选取穴位。足三里是胃的下合穴，位于膝关节以下，可治疗腹部脾胃病证。",
    source: "《针灸大成》",
    points: ["足三里", "远部选穴", "下合穴"]
  },
  // 中医基础 - 简答题
  {
    id: "basic_001",
    type: "short",
    category: "中医基础",
    subCategory: "阴阳五行",
    difficulty: 3,
    question: "试述阴阳学说在中医学中的应用。",
    answer: [
      "1. 说明人体的组织结构：人体上部为阳，下部为阴；体表为阳，体内为阴；背为阳，腹为阴；五脏为阴，六腑为阳等。",
      "2. 说明人体的生理功能：阴阳平衡是人体正常生理活动的基础，如《素问·生气通天论》说：'阴平阳秘，精神乃治'。",
      "3. 说明人体的病理变化：阴阳偏盛偏衰是疾病的基本病机，如'阳胜则热，阴胜则寒'、'阳虚则外寒，阴虚则内热'。",
      "4. 用于疾病的诊断：通过四诊收集的资料，以阴阳辨证纲领，如'善诊者，察色按脉，先别阴阳'。",
      "5. 用于疾病的治疗：确定治疗原则，如'谨察阴阳所在而调之，以平为期'，以及'阴病治阳，阳病治阴'等。"
    ],
    explanation: "本题考察阴阳学说在中医学中的具体应用。需要从人体结构、生理、病理、诊断、治疗五个方面全面回答，体现阴阳学说对中医理论体系的指导作用。",
    source: "《中医基础理论》"
  },
  {
    id: "basic_002",
    type: "short",
    category: "中医基础",
    subCategory: "脏腑关系",
    difficulty: 3,
    question: "试述心与肾之间的关系。",
    answer: [
      "心与肾的关系主要体现在水火既济、精神互用君安位三个方面的关系。",
      "1. 水火既济：心属火，居上焦；肾属水，居下焦。正常情况下，心火下降于肾，温煦肾水，使肾水不寒；肾水上济于心，滋养心阴，使心火不亢。这种水火升降互济的关系，称为'水火既济'或'心肾相交'。",
      "2. 精神互用：心藏神，肾藏精。精能化气生神，神能统精驭气。精与神、肾与心的功能活动相互依存、相互为用。",
      "3. 君安其位：心为君火，肾为相火（命火）。君火安于上位，相火潜藏于下，共同温煦脏腑，推动人体的生命活动。若心肾不交、水火不济，则出现心悸、失眠、腰痛、耳鸣、遗精等病证。"
    ],
    explanation: "心肾关系是五脏关系中的重要考点。主要从水火既济（心肾相交）、精神互用、君安其位三个方面论述，这是中医理论中心肾相关的基本内容。",
    source: "《中医基础理论》"
  },
]

// 获取分类下的所有题目
export function getQuestionsByCategory(category: string, subCategory?: string): Question[] {
  return QUESTIONS.filter(q => {
    if (subCategory) {
      return q.category === category && q.subCategory === subCategory
    }
    return q.category === category
  })
}

// 搜索题目
export function searchQuestions(keyword: string): Question[] {
  const lowerKeyword = keyword.toLowerCase()
  return QUESTIONS.filter(q =>
    q.question.toLowerCase().includes(lowerKeyword) ||
    q.category.toLowerCase().includes(lowerKeyword) ||
    q.subCategory.toLowerCase().includes(lowerKeyword) ||
    (q.points && q.points.some(p => p.toLowerCase().includes(lowerKeyword)))
  )
}

// 获取随机题目
export function getRandomQuestions(count: number, category?: string): Question[] {
  let pool = category ? getQuestionsByCategory(category) : QUESTIONS
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// 难度标签
export const DIFFICULTY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "简单", color: "text-green-600 bg-green-50" },
  2: { label: "中等", color: "text-yellow-600 bg-yellow-50" },
  3: { label: "困难", color: "text-red-600 bg-red-50" },
}

// 题目类型标签
export const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  single: { label: "单选题", icon: "○" },
  multiple: { label: "多选题", icon: "☑" },
  truefalse: { label: "判断题", icon: "△" },
  short: { label: "简答题", icon: "□" },
}
