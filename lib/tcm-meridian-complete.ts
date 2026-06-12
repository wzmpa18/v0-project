// 完整经络穴位数据库 - 基于《针灸甲乙经》《针灸大成》《董氏奇穴》等经典

// ========== 十二正经完整数据 ==========

export interface MeridianFull {
  id: string
  name: string
  nameAbbr: string
  yinYang: "阴" | "阳"
  handFoot: "手" | "足"
  fiveElements: string
  organ: string
  luoConnect: string
  pointsCount: number
  circulationTime: string
  pathway: string
  keyPoints: string[]
  functions: string[]
  indications: string[]
}

export const MERIDIANS_FULL: MeridianFull[] = [
  // 手太阴肺经
  {
    id: "LU",
    name: "手太阴肺经",
    nameAbbr: "肺经",
    yinYang: "阴",
    handFoot: "手",
    fiveElements: "金",
    organ: "肺",
    luoConnect: "手阳明大肠经",
    pointsCount: 11,
    circulationTime: "寅时（3-5点）",
    pathway: "起于中焦，下络大肠，还循胃口，上膈属肺，从肺系横行至腋下，沿上肢内侧前缘下行，入寸口，上鱼际，出于大指内侧端。其支者，从腕后直出次指内廉，出其端。",
    keyPoints: ["中府", "云门", "天府", "侠白", "尺泽", "孔最", "列缺", "经渠", "太渊", "鱼际", "少商"],
    functions: ["肺主气，司呼吸", "主宣发肃降", "通调水道", "朝百脉", "主治肺系疾病"],
    indications: ["咳嗽", "气喘", "咽喉肿痛", "胸闷", "鼻塞", "手臂内侧疼痛"]
  },
  // 手阳明大肠经
  {
    id: "LI",
    name: "手阳明大肠经",
    nameAbbr: "大肠经",
    yinYang: "阳",
    handFoot: "手",
    fiveElements: "金",
    organ: "大肠",
    luoConnect: "手太阴肺经",
    pointsCount: 20,
    circulationTime: "卯时（5-7点）",
    pathway: "起于食指末端，沿食指内侧上缘，经腕背，上肢外侧前缘，至肩，上颈，贯颊，入下齿中，还出挟口，交人中，左之右，右之左，上挟鼻孔。",
    keyPoints: ["商阳", "二间", "三间", "合谷", "阳溪", "偏历", "温溜", "下廉", "上廉", "手三里", "曲池", "肘髎", "手五里", "臂臑", "肩髃", "巨骨", "天鼎", "扶突", "口禾髎", "迎香"],
    functions: ["传导化物", "主津液", "主治大肠疾病", "面部疾病"],
    indications: ["腹痛", "腹泻", "便秘", "痔疮", "咽喉肿痛", "牙痛", "面瘫", "鼻病"]
  },
  // 足阳明胃经
  {
    id: "ST",
    name: "足阳明胃经",
    nameAbbr: "胃经",
    yinYang: "阳",
    handFoot: "足",
    fiveElements: "土",
    organ: "胃",
    luoConnect: "足太阴脾经",
    pointsCount: 45,
    circulationTime: "辰时（7-9点）",
    pathway: "起于鼻旁，上行鼻根，旁入目内眦，下循鼻外，入上齿中，还出挟口环唇，下交承浆，循颐后下廉，出大迎，循颊车，上耳前，过客主人，循发际，至额颅。其支者，从大迎前下走人迎，循喉咙，入缺盆，下膈，属胃，络脾。其直者，从缺盆下乳内廉，下挟脐，入气街中。",
    keyPoints: ["承泣", "四白", "巨髎", "地仓", "大迎", "颊车", "下关", "头维", "人迎", "水突", "气舍", "缺盆", "气户", "库房", "屋翳", "膺窗", "乳中", "乳根", "不容", "承满", "梁门", "关门", "太乙", "滑肉门", "天枢", "外陵", "大巨", "水道", "归来", "气冲", "髀关", "伏兔", "阴市", "梁丘", "犊鼻", "足三里", "上巨虚", "条口", "下巨虚", "丰隆", "解溪", "冲阳", "陷谷", "内庭", "厉兑"],
    functions: ["受纳腐熟水谷", "主通降", "以降为和", "主治胃腑疾病"],
    indications: ["胃痛", "呕吐", "腹胀", "腹泻", "便秘", "牙痛", "咽喉肿痛", "癫狂"]
  },
  // 足太阴脾经
  {
    id: "SP",
    name: "足太阴脾经",
    nameAbbr: "脾经",
    yinYang: "阴",
    handFoot: "足",
    fiveElements: "土",
    organ: "脾",
    luoConnect: "足阳明胃经",
    pointsCount: 21,
    circulationTime: "巳时（9-11点）",
    pathway: "起于大趾末端，循趾内侧白肉际，过核骨后，上内踝前廉，上踹内，循胫骨后，交出厥阴之前，上膝股内前廉，入腹，属脾，络胃，上膈，挟咽，连舌本，散舌下。",
    keyPoints: ["隐白", "大都", "太白", "公孙", "商丘", "三阴交", "漏谷", "地机", "阴陵泉", "血海", "箕门", "冲门", "府舍", "腹结", "大横", "腹哀", "食窦", "天溪", "胸乡", "周荣", "大包"],
    functions: ["主运化", "主升清", "主统血", "主治脾脏疾病"],
    indications: ["腹胀", "腹泻", "便秘", "食欲不振", "水肿", "月经不调", "湿疹"]
  },
  // 手少阴心经
  {
    id: "HT",
    name: "手少阴心经",
    nameAbbr: "心经",
    yinYang: "阴",
    handFoot: "手",
    fiveElements: "火",
    organ: "心",
    luoConnect: "手太阳小肠经",
    pointsCount: 9,
    circulationTime: "午时（11-13点）",
    pathway: "起于心中，出属心系，下膈，络小肠。其支者，从心系，上挟咽，系目系。其直者，复从心系却上肺，下出腋下，循臑内后廉，行太阴、心主之后，下肘内，循臂内后廉，抵掌后锐骨之端，入掌内后廉，循小指之内，出其端。",
    keyPoints: ["极泉", "青灵", "少海", "灵道", "通里", "阴郄", "神门", "少府", "少冲"],
    functions: ["心主血脉", "藏神", "开窍于舌", "其华在面", "主治心脏疾病"],
    indications: ["心悸", "失眠", "健忘", "癫狂", "胸痛", "咽干", "手臂内侧疼痛"]
  },
  // 手太阳小肠经
  {
    id: "SI",
    name: "手太阳小肠经",
    nameAbbr: "小肠经",
    yinYang: "阳",
    handFoot: "手",
    fiveElements: "火",
    organ: "小肠",
    luoConnect: "手少阴心经",
    pointsCount: 19,
    circulationTime: "未时（13-15点）",
    pathway: "起于小指之端，循手外侧上腕，出踝中，直上循臂骨下廉，出肘内侧两筋之间，上循臑外后廉，出肩解，绕肩胛，交肩上，入缺盆，络心，循咽，下膈，抵胃，属小肠。",
    keyPoints: ["少泽", "前谷", "后溪", "腕骨", "阳谷", "养老", "支正", "小海", "肩贞", "臑俞", "天宗", "秉风", "曲垣", "肩外俞", "肩中俞", "天窗", "天容", "颧髎", "听宫"],
    functions: ["受盛化物", "主液", "主治小肠疾病"],
    indications: ["腹痛", "腹泻", "便秘", "咽喉肿痛", "耳鸣", "耳聋", "肩背疼痛"]
  },
  // 足太阳膀胱经
  {
    id: "BL",
    name: "足太阳膀胱经",
    nameAbbr: "膀胱经",
    yinYang: "阳",
    handFoot: "足",
    fiveElements: "水",
    organ: "膀胱",
    luoConnect: "足少阴肾经",
    pointsCount: 67,
    circulationTime: "申时（15-17点）",
    pathway: "起于目内眦，上额，交巅。其支者，从巅至耳上角。其直者，从巅入络脑，还出别下项，循肩膊内，挟脊抵腰中，入循膂，络肾，属膀胱。",
    keyPoints: ["睛明", "攒竹", "眉冲", "曲差", "五处", "承光", "通天", "络却", "玉枕", "天柱", "大杼", "风门", "肺俞", "厥阴俞", "心俞", "督俞", "膈俞", "肝俞", "胆俞", "脾俞", "胃俞", "三焦俞", "肾俞", "气海俞", "大肠俞", "关元俞", "小肠俞", "膀胱俞", "中膂俞", "白环俞", "上髎", "次髎", "中髎", "下髎", "会阳", "承扶", "殷门", "浮郄", "委阳", "委中", "附分", "魄户", "膏肓", "神堂", "譩譆", "膈关", "魂门", "阳纲", "意舍", "胃仓", "肓门", "志室", "胞肓", "秩边", "合阳", "承筋", "承山", "飞扬", "跗阳", "昆仑", "仆参", "申脉", "金门", "京骨", "束骨", "足通谷", "至阴"],
    functions: ["州都之官", "主气化", "主津液", "蓄尿和排尿", "主治膀胱疾病"],
    indications: ["尿频", "尿急", "尿痛", "腰痛", "背痛", "头痛", "项强", "目赤肿痛"]
  },
  // 足少阴肾经
  {
    id: "KI",
    name: "足少阴肾经",
    nameAbbr: "肾经",
    yinYang: "阴",
    handFoot: "足",
    fiveElements: "水",
    organ: "肾",
    luoConnect: "足太阳膀胱经",
    pointsCount: 27,
    circulationTime: "酉时（17-19点）",
    pathway: "起于小指之下，邪走足心，出于然谷之下，循内踝之后，别入跟中，以上踹内，出腘内廉，上股内后廉，贯脊属肾，络膀胱。",
    keyPoints: ["涌泉", "然谷", "太溪", "大钟", "水泉", "照海", "复溜", "交信", "筑宾", "阴谷", "横骨", "大赫", "气穴", "四满", "中注", "肓俞", "商曲", "石关", "阴都", "腹通谷", "幽门", "步廊", "神封", "灵墟", "神藏", "彧中", "俞府"],
    functions: ["肾藏精", "主生长发育", "主生殖", "主纳气", "主水", "主治肾脏疾病"],
    indications: ["遗精", "阳痿", "月经不调", "腰痛", "耳鸣", "耳聋", "水肿", "喘咳"]
  },
  // 手厥阴心包经
  {
    id: "PC",
    name: "手厥阴心包经",
    nameAbbr: "心包经",
    yinYang: "阴",
    handFoot: "手",
    fiveElements: "火",
    organ: "心包",
    luoConnect: "手少阳三焦经",
    pointsCount: 9,
    circulationTime: "戌时（19-21点）",
    pathway: "起于胸中，出属心包络，下膈，历络三焦。其支者，循胸出胁，下腋三寸，上抵腋下，循臑内，行太阴少阴之间，入肘中，下臂，行两筋之间，入掌中，循中指，出其端。",
    keyPoints: ["天池", "天泉", "曲泽", "郄门", "间使", "内关", "大陵", "劳宫", "中冲"],
    functions: ["保护心脏", "代心受邪", "主治心包疾病"],
    indications: ["心悸", "胸闷", "心痛", "失眠", "胃痛", "呕吐", "手臂内侧疼痛"]
  },
  // 手少阳三焦经
  {
    id: "TE",
    name: "手少阳三焦经",
    nameAbbr: "三焦经",
    yinYang: "阳",
    handFoot: "手",
    fiveElements: "火",
    organ: "三焦",
    luoConnect: "手厥阴心包经",
    pointsCount: 23,
    circulationTime: "亥时（21-23点）",
    pathway: "起于小指次指之端，上出两指之间，循手表腕，出臂外两骨之间，上贯肘，循臑外上肩，而交出足少阳之后，入缺盆，布膻中，散络心包，下膈，遍属三焦。",
    keyPoints: ["关冲", "液门", "中渚", "阳池", "外关", "支沟", "会宗", "三阳络", "四渎", "天井", "清冷渊", "消泺", "臑会", "肩髎", "天髎", "天牖", "翳风", "瘈脉", "颅息", "角孙", "耳门", "耳和髎", "丝竹空"],
    functions: ["通行诸气", "运行水液", "主决渎", "主治三焦疾病"],
    indications: ["感冒", "发热", "耳鸣", "耳聋", "咽喉肿痛", "偏头痛", "胁肋疼痛"]
  },
  // 足少阳胆经
  {
    id: "GB",
    name: "足少阳胆经",
    nameAbbr: "胆经",
    yinYang: "阳",
    handFoot: "足",
    fiveElements: "木",
    organ: "胆",
    luoConnect: "足厥阴肝经",
    pointsCount: 44,
    circulationTime: "子时（23-1点）",
    pathway: "起于目锐眦，上抵头角，下耳后，循颈，行手少阳之前，至肩上，却交出手少阳之后，入缺盆。",
    keyPoints: ["瞳子髎", "听会", "上关", "颔厌", "悬颅", "悬厘", "曲鬓", "率谷", "天冲", "浮白", "头窍阴", "完骨", "本神", "阳白", "头临泣", "目窗", "正营", "承灵", "脑空", "风池", "肩井", "渊腋", "辄筋", "日月", "京门", "带脉", "五枢", "维道", "居髎", "环跳", "风市", "中渎", "膝阳关", "阳陵泉", "阳交", "外丘", "光明", "阳辅", "悬钟", "丘墟", "足临泣", "地五会", "侠溪", "足窍阴"],
    functions: ["贮存和排泄胆汁", "主决断", "主治胆腑疾病"],
    indications: ["胆囊炎", "胆结石", "口苦", "咽干", "偏头痛", "耳鸣", "胁肋疼痛"]
  },
  // 足厥阴肝经
  {
    id: "LR",
    name: "足厥阴肝经",
    nameAbbr: "肝经",
    yinYang: "阴",
    handFoot: "足",
    fiveElements: "木",
    organ: "肝",
    luoConnect: "足少阳胆经",
    pointsCount: 14,
    circulationTime: "丑时（1-3点）",
    pathway: "起于大指丛毛之际，上循足跗上廉，去内踝一寸，上踝八寸，交出太阴之后，上腘内廉，循股阴，入毛中，过阴器，抵小腹，挟胃，属肝，络胆，上贯膈，布胁肋，循喉咙之后，上入颃颡，连目系，上出额，与督脉会于巅。",
    keyPoints: ["大敦", "行间", "太冲", "中封", "蠡沟", "中都", "膝关", "曲泉", "阴包", "足五里", "阴廉", "急脉", "章门", "期门"],
    functions: ["主疏泄", "藏血", "主筋", "开窍于目", "主治肝脏疾病"],
    indications: ["胁痛", "腹胀", "呕吐", "腹泻", "月经不调", "痛经", "头晕目眩"]
  }
]

// ========== 奇经八脉 ==========

export interface ExtraMeridian {
  id: string
  name: string
  keyPoints: string[]
  pathway: string
  mainFunctions: string[]
  indications: string[]
}

export const EXTRA_MERIDIANS: ExtraMeridian[] = [
  {
    id: "CV",
    name: "任脉",
    keyPoints: ["会阴", "曲骨", "中极", "关元", "石门", "气海", "阴交", "神阙", "水分", "下脘", "建里", "中脘", "上脘", "巨阙", "鸠尾", "中庭", "膻中", "玉堂", "紫宫", "华盖", "璇玑", "天突", "廉泉", "承浆"],
    pathway: "起于胞中，出于会阴，沿腹胸正中线上行，经过咽喉，到达下颌，环绕口唇，联系目眶下。",
    mainFunctions: ["阴脉之海", "总任一身之阴经", "主胞胎"],
    indications: ["生殖系统疾病", "泌尿系统疾病", "消化系统疾病", "胸腹部疾病"]
  },
  {
    id: "GV",
    name: "督脉",
    keyPoints: ["长强", "腰俞", "腰阳关", "命门", "悬枢", "脊中", "中枢", "筋缩", "至阳", "灵台", "神道", "身柱", "陶道", "大椎", "哑门", "风府", "脑户", "强间", "后顶", "百会", "前顶", "顖会", "上星", "神庭", "素髎", "水沟", "兑端", "龈交"],
    pathway: "起于胞中，出于会阴，沿脊柱正中线上行，入颅络脑，再沿头部正中线下达鼻柱。",
    mainFunctions: ["阳脉之海", "总督一身之阳经", "入络脑"],
    indications: ["脊柱疾病", "脑病", "神志病", "发热"]
  },
  {
    id: "CH",
    name: "冲脉",
    keyPoints: ["气冲", "横骨", "大赫", "气穴", "四满", "中注", "肓俞", "商曲", "石关", "阴都", "腹通谷", "幽门"],
    pathway: "起于胞中，出于气冲，与任督脉合，从气街起上行，沿腹胸壁至咽喉。",
    mainFunctions: ["十二经脉之海", "血海", "调节月经"],
    indications: ["月经不调", "不孕", "流产", "腹胀", "胸闷"]
  },
  {
    id: "DV",
    name: "带脉",
    keyPoints: ["带脉", "五枢", "维道"],
    pathway: "起于季胁，绕腰一周。",
    mainFunctions: ["约束诸经", "主司带下"],
    indications: ["腰胁疼痛", "带下病", "腹胀"]
  },
  {
    id: "YV",
    name: "阴维脉",
    keyPoints: ["筑宾", "腹哀", "大横", "府舍", "期门", "天突", "廉泉"],
    pathway: "起于小腿内侧，沿下肢内侧上行至胸腹。",
    mainFunctions: ["维系诸阴经"],
    indications: ["心痛", "胃痛", "胸腹痛"]
  },
  {
    id: "YH",
    name: "阳维脉",
    keyPoints: ["金门", "阳交", "臑俞", "肩井", "头维", "本神", "阳白", "头临泣", "目窗", "正营", "承灵", "脑空", "风池", "风府", "哑门"],
    pathway: "起于足跟外侧，沿下肢外侧上行至项。",
    mainFunctions: ["维系诸阳经"],
    indications: ["感冒", "发热", "头痛", "腰痛"]
  },
  {
    id: "YQ",
    name: "阴跷脉",
    keyPoints: ["照海", "交信"],
    pathway: "起于足跟内侧，沿下肢内侧上行，过阴部，上至目内眦。",
    mainFunctions: ["主司目开阖", "主下肢运动"],
    indications: ["失眠", "嗜睡", "足内翻", "咽痛"]
  },
  {
    id: "YH2",
    name: "阳跷脉",
    keyPoints: ["申脉", "仆参", "跗阳", "居髎", "臑俞", "肩髎", "巨骨", "天髎", "地仓", "巨髎", "承泣", "睛明", "风池"],
    pathway: "起于足跟外侧，沿下肢外侧上行，过颈，至目内眦。",
    mainFunctions: ["主司目开阖", "主下肢运动"],
    indications: ["失眠", "嗜睡", "足外翻", "目赤肿痛"]
  }
]

// ========== 董氏奇穴 ==========

export interface DongPoint {
  id: string
  name: string
  location: string
  functions: string[]
  indications: string[]
  method: string
  category: string
}

export const DONG_POINTS: DongPoint[] = [
  // 一一部位（手指部位）
  {
    id: "d1",
    name: "大间穴",
    location: "食指掌面第一节正中央偏外三分",
    functions: ["清心泻火", "理气宽胸"],
    indications: ["心悸", "胸闷", "心绞痛", "胃痛", "膝盖痛"],
    method: "直刺2-3分，局部酸胀感",
    category: "一一部位"
  },
  {
    id: "d2",
    name: "小间穴",
    location: "食指掌面第一节正中央偏内三分",
    functions: ["清肺热", "理气宽胸"],
    indications: ["咳嗽", "气喘", "胸闷", "心悸"],
    method: "直刺2-3分",
    category: "一一部位"
  },
  {
    id: "d3",
    name: "中间穴",
    location: "食指掌面第一节正中央",
    functions: ["调气理气"],
    indications: ["胃痛", "胸闷", "心悸"],
    method: "直刺2-3分",
    category: "一一部位"
  },
  {
    id: "d4",
    name: "浮间穴",
    location: "食指第二节外侧正中央",
    functions: ["清热泻火"],
    indications: ["牙痛", "胃痛", "心悸"],
    method: "直刺2-3分",
    category: "一一部位"
  },
  {
    id: "d5",
    name: "外间穴",
    location: "食指第二节外侧正中央偏下三分",
    functions: ["清热理气"],
    indications: ["胃痛", "牙痛", "心悸"],
    method: "直刺2-3分",
    category: "一一部位"
  },
  {
    id: "d6",
    name: "还巢穴",
    location: "无名指第二节正中央",
    functions: ["补肾壮阳", "调理冲任"],
    indications: ["子宫疾病", "月经不调", "不孕", "肾虚"],
    method: "直刺2-3分",
    category: "一一部位"
  },
  // 二二部位（手掌部位）
  {
    id: "d7",
    name: "重子穴",
    location: "手掌朝上，大拇指掌骨与食指掌骨间虎口下一寸",
    functions: ["理气解郁", "宣肺平喘"],
    indications: ["感冒", "咳嗽", "气喘", "胸闷", "背痛"],
    method: "直刺5-8分",
    category: "二二部位"
  },
  {
    id: "d8",
    name: "重仙穴",
    location: "手掌朝上，大拇指掌骨与食指掌骨间虎口下一寸五分",
    functions: ["理气解郁", "通经活络"],
    indications: ["感冒", "咳嗽", "气喘", "背痛", "颈椎病"],
    method: "直刺5-8分",
    category: "二二部位"
  },
  {
    id: "d9",
    name: "灵骨穴",
    location: "第一掌骨与第二掌骨间，距合谷穴一寸五分",
    functions: ["通经活络", "清热解毒"],
    indications: ["头痛", "头晕", "耳鸣", "目赤", "腹痛"],
    method: "直刺1-1.5寸",
    category: "二二部位"
  },
  {
    id: "d10",
    name: "大白穴",
    location: "第二掌骨外侧，距灵骨穴一寸",
    functions: ["清热利咽", "理气宽胸"],
    indications: ["咽喉肿痛", "咳嗽", "气喘", "头痛"],
    method: "直刺5-8分",
    category: "二二部位"
  },
  {
    id: "d11",
    name: "手解穴",
    location: "小指与无名指掌骨间，距指缝五分",
    functions: ["清热解毒", "利尿通淋"],
    indications: ["尿道炎", "膀胱炎", "尿频", "尿急"],
    method: "直刺3-5分",
    category: "二二部位"
  },
  // 三三部位（前臂部位）
  {
    id: "d12",
    name: "人士穴",
    location: "前臂内侧，腕横纹上四寸",
    functions: ["理气宽胸", "和胃止痛"],
    indications: ["胸闷", "胃痛", "腹胀", "气喘"],
    method: "直刺5-8分",
    category: "三三部位"
  },
  {
    id: "d13",
    name: "地士穴",
    location: "前臂内侧，腕横纹上七寸",
    functions: ["理气化痰", "止咳平喘"],
    indications: ["咳嗽", "气喘", "胸闷", "痰多"],
    method: "直刺5-8分",
    category: "三三部位"
  },
  {
    id: "d14",
    name: "天士穴",
    location: "前臂内侧，腕横纹上十寸",
    functions: ["理气化痰", "宣肺止咳"],
    indications: ["咳嗽", "气喘", "咽喉肿痛"],
    method: "直刺5-8分",
    category: "三三部位"
  },
  {
    id: "d15",
    name: "曲陵穴",
    location: "肘横纹内侧端，肱二头肌腱内侧",
    functions: ["清热利咽", "止咳平喘"],
    indications: ["咽喉肿痛", "咳嗽", "气喘", "胸闷"],
    method: "直刺5-8分",
    category: "三三部位"
  },
  // 四四部位（上臂部位）
  {
    id: "d16",
    name: "肩中穴",
    location: "上臂肱骨外侧，肩峰直下二寸",
    functions: ["活血通络", "祛风除湿"],
    indications: ["肩周炎", "上肢疼痛", "背痛", "颈椎病"],
    method: "直刺5-8分",
    category: "四四部位"
  },
  {
    id: "d17",
    name: "建中穴",
    location: "上臂肱骨外侧，肩中穴下二寸",
    functions: ["通经活络"],
    indications: ["肩背疼痛", "手臂麻木"],
    method: "直刺5-8分",
    category: "四四部位"
  },
  // 五五部位（足趾部位）
  {
    id: "d18",
    name: "火硬穴",
    location: "足背第一、二趾间，趾蹼缘后方赤白肉际",
    functions: ["清热泻火", "理气止痛"],
    indications: ["头痛", "眩晕", "胃痛", "腹胀"],
    method: "直刺3-5分",
    category: "五五部位"
  },
  {
    id: "d19",
    name: "火主穴",
    location: "足背第一、二趾间，趾蹼缘后方赤白肉际上一寸",
    functions: ["清热理气", "活血通络"],
    indications: ["心悸", "胸闷", "胃痛", "腹胀"],
    method: "直刺3-5分",
    category: "五五部位"
  },
  // 六六部位（足掌部位）
  {
    id: "d20",
    name: "门金穴",
    location: "足背第二、三趾间，趾蹼缘后方赤白肉际",
    functions: ["清热利湿", "理气止痛"],
    indications: ["胃痛", "腹胀", "腹泻", "便秘"],
    method: "直刺3-5分",
    category: "六六部位"
  },
  {
    id: "d21",
    name: "木枝穴",
    location: "足背第三、四趾间，趾蹼缘后方赤白肉际",
    functions: ["清热利湿"],
    indications: ["耳鸣", "耳聋", "头痛", "眩晕"],
    method: "直刺3-5分",
    category: "六六部位"
  },
  // 七七部位（小腿部位）
  {
    id: "d22",
    name: "正筋穴",
    location: "小腿后面，承山穴内侧一寸",
    functions: ["舒筋活络"],
    indications: ["腰腿痛", "足跟痛", "背痛"],
    method: "直刺5-8分",
    category: "七七部位"
  },
  {
    id: "d23",
    name: "正士穴",
    location: "小腿后面，承山穴内侧二寸",
    functions: ["舒筋活络"],
    indications: ["腰腿痛", "坐骨神经痛"],
    method: "直刺5-8分",
    category: "七七部位"
  },
  {
    id: "d24",
    name: "博球穴",
    location: "小腿后面，承山穴下一寸",
    functions: ["活血通络"],
    indications: ["腰腿痛", "下肢麻木"],
    method: "直刺5-8分",
    category: "七七部位"
  },
  {
    id: "d25",
    name: "鼻翼穴",
    location: "足三里穴外侧一寸",
    functions: ["调理脾胃"],
    indications: ["胃痛", "腹胀", "消化不良"],
    method: "直刺5-8分",
    category: "七七部位"
  },
  // 八八部位（大腿部位）
  {
    id: "d26",
    name: "通关穴",
    location: "大腿前面，膝盖上缘直上五寸",
    functions: ["调理气血"],
    indications: ["气血不足", "头晕", "心悸"],
    method: "直刺5-8分",
    category: "八八部位"
  },
  {
    id: "d27",
    name: "通山穴",
    location: "大腿前面，膝盖上缘直上七寸",
    functions: ["理气宽胸"],
    indications: ["胸闷", "心悸", "气短"],
    method: "直刺5-8分",
    category: "八八部位"
  },
  {
    id: "d28",
    name: "通背穴",
    location: "大腿前面，膝盖上缘直上九寸",
    functions: ["通经活络"],
    indications: ["腰背痛", "四肢疼痛"],
    method: "直刺5-8分",
    category: "八八部位"
  },
  // 九九部位（耳朵部位）
  {
    id: "d29",
    name: "耳环穴",
    location: "耳垂前面",
    functions: ["清热泻火"],
    indications: ["目赤肿痛", "咽喉肿痛", "发热"],
    method: "点刺出血或埋针",
    category: "九九部位"
  },
  {
    id: "d30",
    name: "耳背穴",
    location: "耳背后静脉",
    functions: ["清热泻火"],
    indications: ["感冒发热", "咽喉肿痛", "目赤"],
    method: "点刺出血",
    category: "九九部位"
  },
  // 十十部位（头面部位）
  {
    id: "d31",
    name: "总枢穴",
    location: "后发际正中直上五分",
    functions: ["清热开窍"],
    indications: ["头痛", "眩晕", "鼻塞"],
    method: "平刺3-5分",
    category: "十十部位"
  },
  {
    id: "d32",
    name: "镇静穴",
    location: "两眉正中之间",
    functions: ["镇静安神"],
    indications: ["失眠", "头痛", "眩晕"],
    method: "平刺3-5分",
    category: "十十部位"
  }
]

// ========== 完整穴位数据库 ==========

export interface AcupointFull {
  id: string
  name: string
  pinyin: string
  meridianId: string
  meridianName: string
  location: string
  locationDesc: string
  category: string
  functions: string[]
  indications: string[]
  method: string
  moxibustion: string
  caution?: string
  isDongPoint?: boolean
}

export const ACUPOINTS_FULL: AcupointFull[] = [

  // ==================== 手太阴肺经 (11 points) ====================
  { id: "LU1", name: "中府", pinyin: "zhōng fǔ", meridianId: "LU", meridianName: "手太阴肺经", location: "胸部，锁骨下窝外侧，云门下1寸，平第1肋间隙", locationDesc: "锁骨外侧端下方，云门下1寸", category: "募穴", functions: ["止咳平喘", "清肺泄热", "宣肺理气"], indications: ["咳嗽", "气喘", "胸满", "肩背痛", "肺胀满"], method: "向外斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可向内深刺" },
  { id: "LU2", name: "云门", pinyin: "yún mén", meridianId: "LU", meridianName: "手太阴肺经", location: "胸部，锁骨下窝凹陷中，肩胛骨喙突上方，前正中线旁开6寸", locationDesc: "锁骨下窝凹陷处，锁骨外侧端下方", category: "", functions: ["宣肺理气", "止咳平喘"], indications: ["咳嗽", "气喘", "胸痛", "肩背痛", "胸中烦热"], method: "向外斜刺0.5-0.8寸", moxibustion: "可灸", caution: "不可向内深刺，以免伤及肺脏" },
  { id: "LU3", name: "天府", pinyin: "tiān fǔ", meridianId: "LU", meridianName: "手太阴肺经", location: "上臂前内侧，腋前纹头下3寸，肱二头肌桡侧缘", locationDesc: "腋前纹头下3寸，肱二头肌外侧", category: "", functions: ["清肺凉血", "理气散结"], indications: ["咳嗽", "气喘", "鼻衄", "瘿气", "上臂内侧疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LU4", name: "侠白", pinyin: "xiá bái", meridianId: "LU", meridianName: "手太阴肺经", location: "上臂前内侧，腋前纹头下4寸，肱二头肌桡侧缘", locationDesc: "天府下1寸，肱二头肌外侧", category: "", functions: ["宣肺理气", "宽胸和胃"], indications: ["咳嗽", "气喘", "胸闷", "心痛", "上臂内侧疼痛", "干呕"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LU5", name: "尺泽", pinyin: "chǐ zé", meridianId: "LU", meridianName: "手太阴肺经", location: "肘横纹中，肱二头肌腱桡侧凹陷处", locationDesc: "肘窝横纹上，肱二头肌腱外侧", category: "合穴", functions: ["清热化痰", "降逆止咳", "宣肺利气"], indications: ["咳嗽", "气喘", "咯血", "咽喉肿痛", "肘臂挛痛"], method: "直刺0.8-1.2寸，或点刺出血", moxibustion: "可灸", caution: "不宜疤痕灸" },
  { id: "LU6", name: "孔最", pinyin: "kǒng zuì", meridianId: "LU", meridianName: "手太阴肺经", location: "前臂前内侧，腕掌侧远端横纹上7寸，尺泽与太渊连线上", locationDesc: "腕横纹上7寸，尺泽下5寸", category: "郄穴", functions: ["清热止血", "宣肺平喘"], indications: ["咳嗽", "气喘", "咯血", "咽喉肿痛", "肘臂挛痛", "痔疮出血"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LU7", name: "列缺", pinyin: "liè quē", meridianId: "LU", meridianName: "手太阴肺经", location: "前臂，腕掌侧远端横纹上1.5寸，拇短伸肌腱与拇长展肌腱之间", locationDesc: "腕横纹上1.5寸，桡骨茎突上方", category: "络穴；八脉交会穴（通任脉）", functions: ["宣肺解表", "祛风通络", "利咽止痛"], indications: ["咳嗽", "气喘", "咽喉肿痛", "偏正头痛", "齿痛", "项强", "手腕疼痛"], method: "向上斜刺0.5-0.8寸", moxibustion: "可灸", caution: "孕妇禁针" },
  { id: "LU8", name: "经渠", pinyin: "jīng qú", meridianId: "LU", meridianName: "手太阴肺经", location: "前臂前内侧，腕掌侧远端横纹上1寸，桡骨茎突与桡动脉之间凹陷处", locationDesc: "腕横纹上1寸，桡动脉搏动处外侧", category: "经穴", functions: ["宣肺止咳", "理气宽胸"], indications: ["咳嗽", "气喘", "咽喉肿痛", "胸痛", "手腕疼痛"], method: "直刺0.2-0.3寸", moxibustion: "可灸", caution: "避开桡动脉" },
  { id: "LU9", name: "太渊", pinyin: "tài yuān", meridianId: "LU", meridianName: "手太阴肺经", location: "腕掌侧横纹桡侧，桡骨茎突与舟状骨之间，拇长展肌腱凹陷中", locationDesc: "腕横纹桡侧端", category: "输穴；原穴；脉会", functions: ["宣肺止咳", "益气通脉", "理血止痛"], indications: ["咳嗽", "气喘", "咯血", "胸闷", "手腕疼痛", "无脉症"], method: "直刺0.2-0.3寸", moxibustion: "可灸", caution: "避开桡动脉" },
  { id: "LU10", name: "鱼际", pinyin: "yú jì", meridianId: "LU", meridianName: "手太阴肺经", location: "手外侧，第1掌骨桡侧中点赤白肉际处", locationDesc: "第一掌骨中点桡侧，赤白肉际处", category: "荥穴", functions: ["清肺泄热", "利咽止痛"], indications: ["咳嗽", "咯血", "咽喉肿痛", "失音", "发热", "小儿疳积"], method: "直刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "LU11", name: "少商", pinyin: "shào shāng", meridianId: "LU", meridianName: "手太阴肺经", location: "手指拇指末节桡侧，指甲根角侧上方0.1寸", locationDesc: "拇指桡侧指甲角旁开0.1寸", category: "井穴", functions: ["清肺利咽", "泻热开窍"], indications: ["咽喉肿痛", "鼻衄", "高热", "昏迷", "癫狂", "指腕挛急"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸", caution: "孕妇慎刺" },

  // ==================== 手阳明大肠经 (20 points) ====================
  { id: "LI1", name: "商阳", pinyin: "shāng yáng", meridianId: "LI", meridianName: "手阳明大肠经", location: "手指食指末节桡侧，指甲根角侧上方0.1寸", locationDesc: "食指桡侧指甲角旁开0.1寸", category: "井穴", functions: ["清热泻火", "消肿开窍"], indications: ["齿痛", "咽喉肿痛", "手指麻木", "热病昏迷", "耳鸣耳聋"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "LI2", name: "二间", pinyin: "èr jiān", meridianId: "LI", meridianName: "手阳明大肠经", location: "手指第2掌指关节桡侧远端赤白肉际处", locationDesc: "微握拳，食指桡侧掌指关节前凹陷中", category: "荥穴", functions: ["清热泻火", "散风利咽"], indications: ["齿痛", "咽喉肿痛", "鼻衄", "目痛", "口眼㖞斜", "热病"], method: "直刺0.2-0.3寸", moxibustion: "可灸" },
  { id: "LI3", name: "三间", pinyin: "sān jiān", meridianId: "LI", meridianName: "手阳明大肠经", location: "手背第2掌指关节桡侧近端凹陷中", locationDesc: "微握拳，食指桡侧掌指关节后凹陷中", category: "输穴", functions: ["清热泻火", "通经活络"], indications: ["齿痛", "咽喉肿痛", "目痛", "腹胀", "肠鸣", "手指麻木"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "LI4", name: "合谷", pinyin: "hé gǔ", meridianId: "LI", meridianName: "手阳明大肠经", location: "手背，第1、2掌骨间，第2掌骨桡侧中点处", locationDesc: "手背，第一、二掌骨之间，约平第二掌骨中点处", category: "原穴", functions: ["疏风解表", "通经活络", "清热泻火", "镇静止痛"], indications: ["头痛", "目赤肿痛", "鼻衄", "齿痛", "牙关紧闭", "口眼㖞斜", "耳聋", "痄腮", "咽喉肿痛", "热病无汗", "腹痛", "便秘", "经闭", "滞产"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "孕妇禁针" },
  { id: "LI5", name: "阳溪", pinyin: "yáng xī", meridianId: "LI", meridianName: "手阳明大肠经", location: "腕后区，腕背侧远端横纹桡侧，桡骨茎突远端，鼻烟窝凹陷中", locationDesc: "拇指上翘时，鼻烟窝凹陷处", category: "经穴", functions: ["清热散风", "通经活络"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "齿痛", "咽喉肿痛", "手腕疼痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "LI6", name: "偏历", pinyin: "piān lì", meridianId: "LI", meridianName: "手阳明大肠经", location: "前臂后外侧，腕背侧远端横纹上3寸，阳溪与曲池连线上", locationDesc: "腕背横纹上3寸，桡骨外侧", category: "络穴", functions: ["清热利尿", "明目聪耳"], indications: ["耳鸣耳聋", "鼻衄", "目赤", "手臂酸痛", "水肿", "喉痛"], method: "直刺或斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "LI7", name: "温溜", pinyin: "wēn liū", meridianId: "LI", meridianName: "手阳明大肠经", location: "前臂后外侧，腕背侧远端横纹上5寸，阳溪与曲池连线上", locationDesc: "腕背横纹上5寸，桡骨外侧", category: "郄穴", functions: ["清热理气", "消肿止痛"], indications: ["头痛", "面肿", "咽喉肿痛", "肩背酸痛", "肠鸣腹痛", "疔疮"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LI8", name: "下廉", pinyin: "xià lián", meridianId: "LI", meridianName: "手阳明大肠经", location: "前臂后外侧，肘横纹下4寸，阳溪与曲池连线上", locationDesc: "曲池下4寸，前臂桡侧", category: "", functions: ["调理肠胃", "通经活络"], indications: ["腹痛", "腹胀", "腹泻", "肘臂疼痛", "眩晕", "头痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LI9", name: "上廉", pinyin: "shàng lián", meridianId: "LI", meridianName: "手阳明大肠经", location: "前臂后外侧，肘横纹下3寸，阳溪与曲池连线上", locationDesc: "曲池下3寸，前臂桡侧", category: "", functions: ["调理肠胃", "通经活络"], indications: ["腹痛", "腹胀", "腹泻", "上肢不遂", "肩臂酸痛", "头痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LI10", name: "手三里", pinyin: "shǒu sān lǐ", meridianId: "LI", meridianName: "手阳明大肠经", location: "前臂后外侧，肘横纹下2寸，阳溪与曲池连线上", locationDesc: "曲池下2寸，前臂桡侧", category: "", functions: ["调理肠胃", "通经活络"], indications: ["腹痛", "腹泻", "齿痛", "上肢不遂", "肩臂疼痛", "腰背痛"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "LI11", name: "曲池", pinyin: "qū chí", meridianId: "LI", meridianName: "手阳明大肠经", location: "肘横纹外侧端，屈肘，肱骨外上髁与肘横纹尽头连线中点", locationDesc: "肘横纹外侧端，肱骨外上髁内下方", category: "合穴", functions: ["清热解表", "祛风除湿", "调和气血"], indications: ["热病", "咽喉肿痛", "手臂肿痛", "上肢不遂", "高血压", "癫狂", "腹痛吐泻", "月经不调"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "深刺需注意避开神经" },
  { id: "LI12", name: "肘髎", pinyin: "zhǒu liáo", meridianId: "LI", meridianName: "手阳明大肠经", location: "肘区，肱骨外上髁上缘，曲池上1寸，肱骨边缘", locationDesc: "曲池上1寸，肱骨外上髁上缘", category: "", functions: ["舒筋活络"], indications: ["肘臂酸痛", "麻木", "上肢活动不利", "肘关节挛急"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LI13", name: "手五里", pinyin: "shǒu wǔ lǐ", meridianId: "LI", meridianName: "手阳明大肠经", location: "臂部，肘横纹上3寸，曲池与肩髃连线上", locationDesc: "曲池上3寸，肱骨外侧", category: "", functions: ["通经活络", "理气散结"], indications: ["瘰疬", "上肢痿痹", "肩臂疼痛", "咳嗽", "吐血"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "避开血管" },
  { id: "LI14", name: "臂臑", pinyin: "bì nào", meridianId: "LI", meridianName: "手阳明大肠经", location: "臂部，曲池上7寸，三角肌前缘处", locationDesc: "曲池上7寸，三角肌下端", category: "手足太阳、阳维脉交会穴", functions: ["通经活络", "清热明目"], indications: ["肩臂疼痛", "上肢不遂", "瘰疬", "目疾", "颈项拘急"], method: "直刺或向上斜刺0.8-1.5寸", moxibustion: "可灸" },
  { id: "LI15", name: "肩髃", pinyin: "jiān yú", meridianId: "LI", meridianName: "手阳明大肠经", location: "肩部，三角肌上，臂外展时肩峰前下方凹陷处", locationDesc: "肩峰前下方，肱骨大结节与肩峰之间凹陷中", category: "手阳明、阳跷脉交会穴", functions: ["祛风除湿", "通经活络"], indications: ["肩臂疼痛", "上肢不遂", "肩周炎", "风疹", "瘰疬", "半身不遂"], method: "直刺或向下斜刺0.8-1.5寸", moxibustion: "可灸" },
  { id: "LI16", name: "巨骨", pinyin: "jù gǔ", meridianId: "LI", meridianName: "手阳明大肠经", location: "肩胛区，锁骨肩峰端与肩胛冈之间凹陷中", locationDesc: "肩峰端与肩胛冈之间凹陷处", category: "手阳明、阳跷脉交会穴", functions: ["通经活络", "理气散结"], indications: ["肩臂疼痛", "抬举不利", "瘰疬", "瘿气", "颈项强痛"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺，以免伤及肺尖" },
  { id: "LI17", name: "天鼎", pinyin: "tiān dǐng", meridianId: "LI", meridianName: "手阳明大肠经", location: "颈部，横平环状软骨，胸锁乳突肌后缘，扶突下1寸", locationDesc: "喉结旁，扶突下1寸，胸锁乳突肌后缘", category: "", functions: ["清热利咽", "理气散结"], indications: ["咽喉肿痛", "声音嘶哑", "瘰疬", "瘿气", "吞咽困难"], method: "直刺0.3-0.5寸", moxibustion: "可灸", caution: "不宜深刺，注意避开颈动脉" },
  { id: "LI18", name: "扶突", pinyin: "fú tū", meridianId: "LI", meridianName: "手阳明大肠经", location: "颈部，喉结旁开3寸，胸锁乳突肌前、后缘之间", locationDesc: "喉结旁开3寸，胸锁乳突肌的胸骨头与锁骨头之间", category: "", functions: ["清热利咽", "理气化痰"], indications: ["咽喉肿痛", "咳嗽", "气喘", "声音嘶哑", "瘰疬", "甲状腺肿大"], method: "直刺0.3-0.5寸", moxibustion: "可灸", caution: "不可深刺，避开颈动脉" },
  { id: "LI19", name: "口禾髎", pinyin: "kǒu hé liáo", meridianId: "LI", meridianName: "手阳明大肠经", location: "面部，鼻孔外缘直下，平水沟穴处", locationDesc: "鼻翼外缘直下，水沟旁开0.5寸", category: "", functions: ["祛风通窍", "清热止痛"], indications: ["鼻塞", "鼻衄", "鼻渊", "口㖞", "口噤不开", "牙痛"], method: "平刺或斜刺0.3-0.5寸", moxibustion: "不宜灸" },
  { id: "LI20", name: "迎香", pinyin: "yíng xiāng", meridianId: "LI", meridianName: "手阳明大肠经", location: "面部，鼻翼外缘中点旁，鼻唇沟中", locationDesc: "鼻翼旁开0.5寸，鼻唇沟中", category: "手、足阳明经交会穴", functions: ["祛风通窍", "理气止痛"], indications: ["鼻塞", "鼻衄", "鼻渊", "鼻息肉", "面痒", "面肿", "口㖞", "胆道蛔虫症"], method: "平刺或斜刺0.3-0.5寸", moxibustion: "不宜灸", caution: "不宜艾灸" },

  // ==================== 足阳明胃经 (45 points) ====================
  { id: "ST1", name: "承泣", pinyin: "chéng qì", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，眼球与眶下缘之间，瞳孔直下", locationDesc: "目正视，瞳孔直下，眼球与眶下缘之间", category: "足阳明、阳跷、任脉交会穴", functions: ["散风清热", "明目止泪"], indications: ["目赤肿痛", "流泪", "夜盲", "口眼㖞斜", "眼睑瞤动"], method: "轻推眼球向上，沿眶下缘缓慢直刺0.3-0.5寸", moxibustion: "不宜灸", caution: "不宜大幅度捻转" },
  { id: "ST2", name: "四白", pinyin: "sì bái", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，眶下孔凹陷处，瞳孔直下", locationDesc: "目正视，瞳孔直下，眶下孔凹陷中", category: "", functions: ["祛风明目", "通经活络"], indications: ["目赤肿痛", "目翳", "口眼㖞斜", "眼睑瞤动", "头痛", "眩晕", "面痛"], method: "直刺或微向上斜刺0.3-0.5寸", moxibustion: "不宜灸", caution: "不宜深刺，不宜灸" },
  { id: "ST3", name: "巨髎", pinyin: "jù liáo", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，瞳孔直下，平鼻翼下缘，鼻唇沟外侧", locationDesc: "目正视，瞳孔直下，与鼻翼下缘平齐处", category: "手足阳明、阳跷脉交会穴", functions: ["祛风通络", "清热明目"], indications: ["口眼㖞斜", "眼睑瞤动", "鼻衄", "齿痛", "唇颊肿痛", "面瘫"], method: "平刺或斜刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "ST4", name: "地仓", pinyin: "dì cāng", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，口角旁开0.4寸，上直瞳孔", locationDesc: "口角旁开0.4寸处", category: "手足阳明、阳跷脉交会穴", functions: ["散风通络", "祛风止痛"], indications: ["口角㖞斜", "流涎", "牙痛", "颊肿", "眼睑瞤动"], method: "平刺或斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "ST5", name: "大迎", pinyin: "dà yíng", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，下颌角前方，咬肌附着部前缘，面动脉搏动处", locationDesc: "下颌角前下方，咬肌前缘凹陷处", category: "", functions: ["祛风通络", "消肿止痛"], indications: ["口角㖞斜", "牙关紧闭", "颊肿", "齿痛", "面痛", "颈项强痛"], method: "直刺或斜刺0.3-0.5寸", moxibustion: "可灸", caution: "避开面动脉" },
  { id: "ST6", name: "颊车", pinyin: "jiá chē", meridianId: "ST", meridianName: "足阳明胃经", location: "面颊部，下颌角前上方约一横指，咀嚼时咬肌隆起处", locationDesc: "下颌角前上方一横指，咬肌隆起处", category: "", functions: ["散风通络", "祛风止痛"], indications: ["口角㖞斜", "牙痛", "颊肿", "牙关紧闭", "面颊肿胀"], method: "直刺0.3-0.5寸，或平刺0.5-1寸", moxibustion: "可灸" },
  { id: "ST7", name: "下关", pinyin: "xià guān", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，颧弓下缘中央与下颌切迹之间凹陷中，闭口取之", locationDesc: "颧弓下缘凹陷中，张口时隆起", category: "足阳明、少阳经交会穴", functions: ["祛风通络", "消肿止痛"], indications: ["耳鸣耳聋", "齿痛", "口眼㖞斜", "牙关开合不利", "面痛", "眩晕"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "闭口取穴" },
  { id: "ST8", name: "头维", pinyin: "tóu wéi", meridianId: "ST", meridianName: "足阳明胃经", location: "头部，额角发际直上0.5寸，头正中线旁开4.5寸", locationDesc: "额角发际上0.5寸，神庭旁开4.5寸", category: "足阳明、少阳、阳维脉交会穴", functions: ["祛风明目", "清头止痛"], indications: ["头痛", "眩晕", "目赤肿痛", "流泪", "眼睑瞤动", "视物不明"], method: "平刺0.5-1寸", moxibustion: "可灸" },
  { id: "ST9", name: "人迎", pinyin: "rén yíng", meridianId: "ST", meridianName: "足阳明胃经", location: "颈部，喉结旁开1.5寸，胸锁乳突肌前缘，颈总动脉搏动处", locationDesc: "喉结旁开1.5寸，人迎穴处", category: "足阳明、少阳经交会穴", functions: ["理气降逆", "清热利咽"], indications: ["咽喉肿痛", "气喘", "瘰疬", "瘿气", "高血压", "眩晕"], method: "直刺0.3-0.5寸", moxibustion: "不宜灸", caution: "避开颈总动脉，不可深刺" },
  { id: "ST10", name: "水突", pinyin: "shuǐ tū", meridianId: "ST", meridianName: "足阳明胃经", location: "颈部，人迎与气舍连线的中点，胸锁乳突肌前缘", locationDesc: "喉结旁，人迎与气舍之间", category: "", functions: ["清热利咽", "降逆平喘"], indications: ["咽喉肿痛", "咳嗽", "气喘", "声音嘶哑", "瘰疬"], method: "直刺0.3-0.5寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST11", name: "气舍", pinyin: "qì shě", meridianId: "ST", meridianName: "足阳明胃经", location: "颈部，锁骨内侧端上缘，胸锁乳突肌胸骨头与锁骨头之间", locationDesc: "锁骨内侧端上缘，人迎直下", category: "", functions: ["理气降逆", "清热利咽"], indications: ["咽喉肿痛", "气喘", "呃逆", "瘰疬", "瘿气", "颈项强痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST12", name: "缺盆", pinyin: "quē pén", meridianId: "ST", meridianName: "足阳明胃经", location: "颈部，锁骨上窝中央，前正中线旁开4寸", locationDesc: "锁骨上窝中央，乳头直上", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["咳嗽", "气喘", "咽喉肿痛", "缺盆中痛", "瘰疬", "上肢麻木"], method: "直刺或斜刺0.3-0.5寸", moxibustion: "可灸", caution: "不可深刺，避免伤及肺尖" },
  { id: "ST13", name: "气户", pinyin: "qì hù", meridianId: "ST", meridianName: "足阳明胃经", location: "胸部，锁骨下缘，前正中线旁开4寸", locationDesc: "锁骨中点下缘，乳头直上", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["咳嗽", "气喘", "胸胁胀满", "呃逆", "胸痛", "肩背痛"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST14", name: "库房", pinyin: "kù fáng", meridianId: "ST", meridianName: "足阳明胃经", location: "胸部，第1肋间隙，前正中线旁开4寸", locationDesc: "第一肋间隙，乳头直上", category: "", functions: ["理气宽胸", "止咳化痰"], indications: ["咳嗽", "气喘", "胸胁胀痛", "咳唾脓血", "乳痈"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST15", name: "屋翳", pinyin: "wū yì", meridianId: "ST", meridianName: "足阳明胃经", location: "胸部，第2肋间隙，前正中线旁开4寸", locationDesc: "第二肋间隙，乳头直上", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["咳嗽", "气喘", "胸胁胀痛", "乳痈", "乳癖", "胸满"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST16", name: "膺窗", pinyin: "yīng chuāng", meridianId: "ST", meridianName: "足阳明胃经", location: "胸部，第3肋间隙，前正中线旁开4寸", locationDesc: "第三肋间隙，乳头直上", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["咳嗽", "气喘", "胸胁胀痛", "乳痈", "心悸", "胸满"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST17", name: "乳中", pinyin: "rǔ zhōng", meridianId: "ST", meridianName: "足阳明胃经", location: "胸部，第4肋间隙，乳头中央", locationDesc: "乳头中央", category: "", functions: ["定位标志"], indications: ["仅作定位标志，不针不灸"], method: "不针不灸", moxibustion: "禁灸", caution: "禁针禁灸，仅作定位标志" },
  { id: "ST18", name: "乳根", pinyin: "rǔ gēn", meridianId: "ST", meridianName: "足阳明胃经", location: "胸部，第5肋间隙，前正中线旁开4寸", locationDesc: "第五肋间隙，乳头直下", category: "", functions: ["理气宽胸", "通乳散结"], indications: ["咳嗽", "气喘", "呃逆", "胸痛", "乳痈", "乳少", "胸满"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST19", name: "不容", pinyin: "bù róng", meridianId: "ST", meridianName: "足阳明胃经", location: "上腹部，脐中上6寸，前正中线旁开2寸", locationDesc: "脐上6寸，旁开2寸", category: "", functions: ["调理脾胃", "降逆止呕"], indications: ["胃痛", "呕吐", "腹胀", "食欲不振", "胁痛", "心悸"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST20", name: "承满", pinyin: "chéng mǎn", meridianId: "ST", meridianName: "足阳明胃经", location: "上腹部，脐中上5寸，前正中线旁开2寸", locationDesc: "脐上5寸，旁开2寸", category: "", functions: ["理气和胃", "降逆止呕"], indications: ["胃痛", "呕吐", "腹胀", "食欲不振", "吐血", "胁下坚痛"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "ST21", name: "梁门", pinyin: "liáng mén", meridianId: "ST", meridianName: "足阳明胃经", location: "上腹部，脐中上4寸，前正中线旁开2寸", locationDesc: "脐上4寸，旁开2寸", category: "", functions: ["和胃降逆", "理气止痛"], indications: ["胃痛", "呕吐", "腹胀", "食欲不振", "腹泻", "便溏"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "ST22", name: "关门", pinyin: "guān mén", meridianId: "ST", meridianName: "足阳明胃经", location: "上腹部，脐中上3寸，前正中线旁开2寸", locationDesc: "脐上3寸，旁开2寸", category: "", functions: ["调理肠胃", "利水消肿"], indications: ["腹痛", "腹胀", "腹泻", "水肿", "食欲不振", "肠鸣"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "ST23", name: "太乙", pinyin: "tài yǐ", meridianId: "ST", meridianName: "足阳明胃经", location: "上腹部，脐中上2寸，前正中线旁开2寸", locationDesc: "脐上2寸，旁开2寸", category: "", functions: ["调理脾胃", "安神定志"], indications: ["胃痛", "腹胀", "心烦", "癫狂", "消化不良", "肠鸣"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "ST24", name: "滑肉门", pinyin: "huá ròu mén", meridianId: "ST", meridianName: "足阳明胃经", location: "上腹部，脐中上1寸，前正中线旁开2寸", locationDesc: "脐上1寸，旁开2寸", category: "", functions: ["调理脾胃", "安神定志"], indications: ["胃痛", "呕吐", "腹胀", "癫狂", "舌强", "月经不调"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "ST25", name: "天枢", pinyin: "tiān shū", meridianId: "ST", meridianName: "足阳明胃经", location: "腹部，脐中旁开2寸", locationDesc: "脐旁开2寸处", category: "大肠募穴", functions: ["理气止痛", "调中和胃", "通调肠腑"], indications: ["腹胀肠鸣", "绕脐腹痛", "便秘", "腹泻", "痢疾", "月经不调", "癥瘕"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST26", name: "外陵", pinyin: "wài líng", meridianId: "ST", meridianName: "足阳明胃经", location: "下腹部，脐中下1寸，前正中线旁开2寸", locationDesc: "脐下1寸，旁开2寸", category: "", functions: ["理气止痛", "调理月经"], indications: ["腹痛", "腹胀", "疝气", "痛经", "月经不调", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST27", name: "大巨", pinyin: "dà jù", meridianId: "ST", meridianName: "足阳明胃经", location: "下腹部，脐中下2寸，前正中线旁开2寸", locationDesc: "脐下2寸，旁开2寸", category: "", functions: ["理气止痛", "调经利尿"], indications: ["小腹胀满", "小便不利", "疝气", "遗精", "早泄", "月经不调"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST28", name: "水道", pinyin: "shuǐ dào", meridianId: "ST", meridianName: "足阳明胃经", location: "下腹部，脐中下3寸，前正中线旁开2寸", locationDesc: "脐下3寸，旁开2寸", category: "", functions: ["利水消肿", "调经止痛"], indications: ["小便不利", "水肿", "疝气", "痛经", "月经不调", "不孕"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST29", name: "归来", pinyin: "guī lái", meridianId: "ST", meridianName: "足阳明胃经", location: "下腹部，脐中下4寸，前正中线旁开2寸", locationDesc: "脐下4寸，旁开2寸", category: "", functions: ["调经止带", "理气止痛"], indications: ["腹痛", "月经不调", "带下", "阴挺", "疝气", "遗精", "阳痿"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST30", name: "气冲", pinyin: "qì chōng", meridianId: "ST", meridianName: "足阳明胃经", location: "腹股沟区，脐中下5寸，前正中线旁开2寸，腹股沟动脉搏动处", locationDesc: "腹股沟稍上方，耻骨联合上缘中点旁开2寸", category: "冲脉起点", functions: ["调理气血", "舒筋活络"], indications: ["腹痛", "疝气", "月经不调", "不孕", "阳痿", "阴肿", "下肢痿痹"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "ST31", name: "髀关", pinyin: "bì guān", meridianId: "ST", meridianName: "足阳明胃经", location: "股前区，髂前上棘与髌底外侧端连线上，缝匠肌外侧凹陷处", locationDesc: "大腿前面，髂前上棘下，缝匠肌外侧", category: "", functions: ["通经活络", "祛风除湿"], indications: ["腰腿疼痛", "下肢痿痹", "膝关节疼痛", "腹痛", "股内筋急"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "ST32", name: "伏兔", pinyin: "fú tù", meridianId: "ST", meridianName: "足阳明胃经", location: "股前区，髌底上6寸，髂前上棘与髌底外侧端连线上", locationDesc: "大腿前面，膝盖上6寸，股直肌隆起处", category: "", functions: ["通经活络", "祛风除湿"], indications: ["腰腿疼痛", "下肢痿痹", "膝关节疼痛", "脚气", "疝气", "腹胀"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "ST33", name: "阴市", pinyin: "yīn shì", meridianId: "ST", meridianName: "足阳明胃经", location: "股前区，髌底上3寸，股直肌腱外侧缘", locationDesc: "大腿前面，膝盖上3寸", category: "", functions: ["通经活络", "祛风除湿"], indications: ["膝关节疼痛", "下肢痿痹", "屈伸不利", "腰痛", "腹胀", "疝气"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST34", name: "梁丘", pinyin: "liáng qiū", meridianId: "ST", meridianName: "足阳明胃经", location: "股前区，髌底上2寸，股外侧肌与股直肌肌腱之间", locationDesc: "膝盖外侧上2寸，膝外上缘凹陷处", category: "郄穴", functions: ["理气和胃", "通经活络"], indications: ["胃痛", "膝关节疼痛", "下肢不遂", "乳痈", "血尿", "腹泻"], method: "直刺1-1.2寸", moxibustion: "可灸" },
  { id: "ST35", name: "犊鼻", pinyin: "dú bí", meridianId: "ST", meridianName: "足阳明胃经", location: "膝前区，髌韧带外侧凹陷中", locationDesc: "屈膝，外膝眼凹陷中", category: "", functions: ["通经活络", "消肿止痛"], indications: ["膝关节疼痛", "屈伸不利", "下肢痿痹", "脚气", "膝关节肿痛"], method: "向后内斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "ST36", name: "足三里", pinyin: "zú sān lǐ", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，犊鼻穴下3寸，胫骨前缘旁开一横指", locationDesc: "外膝眼下3寸，胫骨前缘旁开一横指", category: "合穴；胃下合穴", functions: ["健脾和胃", "补益气血", "扶正培元", "通经活络"], indications: ["胃痛", "呕吐", "腹胀", "腹泻", "便秘", "痢疾", "乳痈", "肠痈", "下肢痿痹", "虚劳羸瘦", "高血压", "癫狂"], method: "直刺1-2寸", moxibustion: "可灸", caution: "强身保健可灸" },
  { id: "ST37", name: "上巨虚", pinyin: "shàng jù xū", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，犊鼻下6寸，胫骨前缘旁开一横指", locationDesc: "外膝眼下6寸，足三里下3寸", category: "大肠下合穴", functions: ["调理肠胃", "通经活络"], indications: ["腹痛", "腹泻", "便秘", "肠痈", "痢疾", "下肢痿痹", "中风瘫痪"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST38", name: "条口", pinyin: "tiáo kǒu", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，犊鼻下8寸，胫骨前缘旁开一横指", locationDesc: "外膝眼下8寸，上巨虚下2寸", category: "", functions: ["通经活络", "祛风除湿"], indications: ["下肢痿痹", "肩臂疼痛", "小腿转筋", "腹痛", "腹胀", "脚气"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST39", name: "下巨虚", pinyin: "xià jù xū", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，犊鼻下9寸，胫骨前缘旁开一横指", locationDesc: "外膝眼下9寸，条口下1寸", category: "小肠下合穴", functions: ["调理肠胃", "通经活络"], indications: ["小腹痛", "腹泻", "痢疾", "下肢痿痹", "腰脊痛引睾丸", "乳痈"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST40", name: "丰隆", pinyin: "fēng lóng", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，外踝尖上8寸，胫骨前肌外缘，条口外一横指", locationDesc: "外踝尖上8寸，胫骨前缘旁开二横指", category: "络穴", functions: ["化痰祛湿", "和胃降逆"], indications: ["咳嗽痰多", "气喘", "眩晕", "癫狂", "呕吐", "便秘", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST41", name: "解溪", pinyin: "jiě xī", meridianId: "ST", meridianName: "足阳明胃经", location: "踝区，踝关节前面中央凹陷中，𧿹长伸肌腱与趾长伸肌腱之间", locationDesc: "足背与小腿交界处横纹中央凹陷中", category: "经穴", functions: ["清胃降逆", "通经活络"], indications: ["头痛", "眩晕", "癫狂", "腹胀", "便秘", "下肢痿痹", "踝关节疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "ST42", name: "冲阳", pinyin: "chōng yáng", meridianId: "ST", meridianName: "足阳明胃经", location: "足背，第2跖骨基底部与中间楔骨关节处，足背动脉搏动处", locationDesc: "足背最高处，足背动脉搏动处", category: "原穴", functions: ["和胃降逆", "通经活络"], indications: ["胃痛", "腹胀", "口眼㖞斜", "面肿", "齿痛", "癫狂", "足背肿痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸", caution: "避开足背动脉" },
  { id: "ST43", name: "陷谷", pinyin: "xiàn gǔ", meridianId: "ST", meridianName: "足阳明胃经", location: "足背，第2、3跖骨结合部前方凹陷中", locationDesc: "足背第二、三跖骨结合部前凹陷中", category: "输穴", functions: ["清热利湿", "理气止痛"], indications: ["面目浮肿", "水肿", "肠鸣", "腹痛", "足背肿痛", "热病"], method: "直刺或斜刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "ST44", name: "内庭", pinyin: "nèi tíng", meridianId: "ST", meridianName: "足阳明胃经", location: "足背，第2、3趾间，趾蹼缘后方赤白肉际处", locationDesc: "足背第二、三趾间，趾蹼缘后方", category: "荥穴", functions: ["清胃泻火", "理气止痛"], indications: ["齿痛", "咽喉肿痛", "鼻衄", "胃痛", "腹胀", "腹泻", "便秘", "热病"], method: "直刺或斜刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "ST45", name: "厉兑", pinyin: "lì duì", meridianId: "ST", meridianName: "足阳明胃经", location: "足趾，第2趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足第二趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["清热和胃", "苏厥醒神"], indications: ["齿痛", "咽喉肿痛", "腹胀", "热病", "多梦", "癫狂", "鼻衄"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },

  // ==================== 足太阴脾经 (21 points) ====================
  { id: "SP1", name: "隐白", pinyin: "yǐn bái", meridianId: "SP", meridianName: "足太阴脾经", location: "足大趾末节内侧，趾甲根角侧后方0.1寸", locationDesc: "足大趾内侧，趾甲角旁开0.1寸", category: "井穴", functions: ["健脾摄血", "开窍醒神"], indications: ["月经过多", "崩漏", "便血", "尿血", "吐血", "鼻衄", "失眠", "多梦", "惊风", "癫狂"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  { id: "SP2", name: "大都", pinyin: "dà dū", meridianId: "SP", meridianName: "足太阴脾经", location: "足内侧，第1跖趾关节前下方，赤白肉际凹陷处", locationDesc: "足大趾内侧，第一跖趾关节前下方", category: "荥穴", functions: ["健脾和中", "清热利湿"], indications: ["腹胀", "胃痛", "呕吐", "腹泻", "便秘", "热病", "心烦"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SP3", name: "太白", pinyin: "tài bái", meridianId: "SP", meridianName: "足太阴脾经", location: "足内侧，第1跖趾关节后下方，赤白肉际凹陷处", locationDesc: "足内侧，第一跖趾关节后下方", category: "输穴；原穴", functions: ["健脾和胃", "理气止痛"], indications: ["胃痛", "腹胀", "便秘", "腹泻", "痢疾", "体重节痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SP4", name: "公孙", pinyin: "gōng sūn", meridianId: "SP", meridianName: "足太阴脾经", location: "足内侧，第1跖骨底的前下方，赤白肉际处", locationDesc: "足内侧，第一跖骨基底前下方", category: "络穴；八脉交会穴（通冲脉）", functions: ["健脾和胃", "理气止痛"], indications: ["胃痛", "呕吐", "腹胀", "腹泻", "痢疾", "心烦失眠"], method: "直刺0.6-1.2寸", moxibustion: "可灸" },
  { id: "SP5", name: "商丘", pinyin: "shāng qiū", meridianId: "SP", meridianName: "足太阴脾经", location: "踝区，内踝前下方，舟骨结节与内踝尖连线中点凹陷中", locationDesc: "内踝前下方凹陷中", category: "经穴", functions: ["健脾利湿", "理气止痛"], indications: ["腹胀", "腹泻", "便秘", "黄疸", "足踝疼痛", "痔疮", "舌本强痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SP6", name: "三阴交", pinyin: "sān yīn jiāo", meridianId: "SP", meridianName: "足太阴脾经", location: "小腿内侧，内踝尖上3寸，胫骨内侧缘后方", locationDesc: "内踝尖上3寸，胫骨内侧缘后缘", category: "足太阴、少阴、厥阴经交会穴", functions: ["健脾和胃", "调补肝肾", "滋阴降火"], indications: ["脾胃虚弱", "腹胀腹泻", "月经不调", "痛经", "带下", "不孕", "遗精", "阳痿", "遗尿", "失眠", "心悸"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇禁针" },
  { id: "SP7", name: "漏谷", pinyin: "lòu gǔ", meridianId: "SP", meridianName: "足太阴脾经", location: "小腿内侧，内踝尖上6寸，胫骨内侧缘后方", locationDesc: "三阴交上3寸，胫骨后缘", category: "", functions: ["健脾利湿", "利尿消肿"], indications: ["腹胀", "腹泻", "小便不利", "水肿", "下肢痿痹", "遗精"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP8", name: "地机", pinyin: "dì jī", meridianId: "SP", meridianName: "足太阴脾经", location: "小腿内侧，阴陵泉下3寸，胫骨内侧缘后方", locationDesc: "阴陵泉下3寸，胫骨内缘", category: "郄穴", functions: ["健脾调经", "利水消肿"], indications: ["腹痛", "腹泻", "月经不调", "痛经", "崩漏", "遗精", "小便不利"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP9", name: "阴陵泉", pinyin: "yīn líng quán", meridianId: "SP", meridianName: "足太阴脾经", location: "小腿内侧，胫骨内侧髁下缘与胫骨内侧缘之间的凹陷中", locationDesc: "膝下，胫骨内侧髁下缘凹陷中", category: "合穴", functions: ["健脾利湿", "消肿止痛"], indications: ["腹胀", "腹泻", "水肿", "黄疸", "小便不利", "遗精", "膝痛", "带下"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "SP10", name: "血海", pinyin: "xuè hǎi", meridianId: "SP", meridianName: "足太阴脾经", location: "股前区，髌底内侧端上2寸，股内侧肌隆起处", locationDesc: "髌骨内侧端上2寸，屈膝取之", category: "", functions: ["调经统血", "祛风除湿"], indications: ["月经不调", "痛经", "崩漏", "湿疹", "丹毒", "皮肤瘙痒", "贫血"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP11", name: "箕门", pinyin: "jī mén", meridianId: "SP", meridianName: "足太阴脾经", location: "股前内侧，血海上6寸，血海与冲门连线上", locationDesc: "大腿内侧，血海上6寸，缝匠肌内侧", category: "", functions: ["利尿通淋", "清热利湿"], indications: ["小便不利", "遗尿", "腹股沟肿痛", "下肢痿痹", "带下"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "SP12", name: "冲门", pinyin: "chōng mén", meridianId: "SP", meridianName: "足太阴脾经", location: "腹股沟区，腹股沟韧带中点外侧，髂外动脉搏动处外侧", locationDesc: "腹股沟韧带中点下方，耻骨联合上缘中点旁开3.5寸", category: "足太阴、厥阴、阴维脉交会穴", functions: ["清热利湿", "调理下焦"], indications: ["腹痛", "疝气", "小便不利", "带下", "崩漏", "下肢痿痹"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "SP13", name: "府舍", pinyin: "fǔ shě", meridianId: "SP", meridianName: "足太阴脾经", location: "下腹部，脐中下4.3寸，前正中线旁开4寸", locationDesc: "脐下4寸，旁开4寸", category: "足太阴、厥阴、阴维脉交会穴", functions: ["理气止痛", "调理下焦"], indications: ["腹痛", "疝气", "便秘", "腹胀", "小便不利", "痛经"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP14", name: "腹结", pinyin: "fù jié", meridianId: "SP", meridianName: "足太阴脾经", location: "下腹部，脐中下1.3寸，前正中线旁开4寸", locationDesc: "脐下1.3寸，旁开4寸", category: "", functions: ["理气止痛", "调理肠胃"], indications: ["腹痛", "腹泻", "便秘", "疝气", "腹胀", "胁痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP15", name: "大横", pinyin: "dà héng", meridianId: "SP", meridianName: "足太阴脾经", location: "腹部，脐中旁开4寸", locationDesc: "脐旁开4寸", category: "足太阴、阴维脉交会穴", functions: ["调理肠胃", "理气止痛"], indications: ["腹痛", "腹泻", "便秘", "痢疾", "蛔虫症", "蛔厥"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP16", name: "腹哀", pinyin: "fù āi", meridianId: "SP", meridianName: "足太阴脾经", location: "上腹部，脐中上3寸，前正中线旁开4寸", locationDesc: "脐上3寸，旁开4寸", category: "足太阴、阴维脉交会穴", functions: ["调理脾胃", "理气止痛"], indications: ["腹痛", "腹胀", "消化不良", "便秘", "痢疾", "胃痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SP17", name: "食窦", pinyin: "shí dòu", meridianId: "SP", meridianName: "足太阴脾经", location: "胸部，第5肋间隙，前正中线旁开6寸", locationDesc: "第五肋间隙，旁开6寸", category: "", functions: ["理气宽胸", "和胃降逆"], indications: ["胸胁胀痛", "反胃", "嗳气", "腹胀", "水肿", "咳嗽"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "SP18", name: "天溪", pinyin: "tiān xī", meridianId: "SP", meridianName: "足太阴脾经", location: "胸部，第4肋间隙，前正中线旁开6寸", locationDesc: "第四肋间隙，旁开6寸", category: "", functions: ["理气宽胸", "通乳散结"], indications: ["胸胁疼痛", "咳嗽", "气喘", "乳痈", "乳少", "胸满"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "SP19", name: "胸乡", pinyin: "xiōng xiāng", meridianId: "SP", meridianName: "足太阴脾经", location: "胸部，第3肋间隙，前正中线旁开6寸", locationDesc: "第三肋间隙，旁开6寸", category: "", functions: ["理气宽胸", "通络止痛"], indications: ["胸胁胀痛", "咳嗽", "气喘", "胸满", "转侧不利", "心悸"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "SP20", name: "周荣", pinyin: "zhōu róng", meridianId: "SP", meridianName: "足太阴脾经", location: "胸部，第2肋间隙，前正中线旁开6寸", locationDesc: "第二肋间隙，旁开6寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸胁胀痛", "咳嗽", "气喘", "不思饮食", "胸满", "呕吐"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "SP21", name: "大包", pinyin: "dà bāo", meridianId: "SP", meridianName: "足太阴脾经", location: "胸外侧区，第6肋间隙，腋中线上", locationDesc: "腋中线，第六肋间隙", category: "脾之大络", functions: ["理气宽胸", "通络止痛"], indications: ["胸胁胀痛", "气喘", "全身疼痛", "四肢无力", "咳嗽", "胁痛"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },

  // ==================== 手少阴心经 (9 points) ====================
  { id: "HT1", name: "极泉", pinyin: "jí quán", meridianId: "HT", meridianName: "手少阴心经", location: "腋窝正中，腋动脉搏动处", locationDesc: "腋窝正中，腋动脉搏动处", category: "", functions: ["宽胸理气", "活血通络"], indications: ["心痛", "心悸", "胸闷", "胁肋疼痛", "瘰疬", "肩臂疼痛"], method: "避开动脉，直刺或斜刺0.3-0.5寸", moxibustion: "可灸", caution: "避开腋动脉" },
  { id: "HT2", name: "青灵", pinyin: "qīng líng", meridianId: "HT", meridianName: "手少阴心经", location: "臂前内侧，肘横纹上3寸，肱二头肌内侧沟中", locationDesc: "少海上3寸，肱二头肌内侧", category: "", functions: ["理气止痛", "通经活络"], indications: ["头痛", "胁痛", "肩臂疼痛", "目黄", "上肢不遂", "振寒"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "HT3", name: "少海", pinyin: "shào hǎi", meridianId: "HT", meridianName: "手少阴心经", location: "肘前内侧，屈肘时肘横纹内侧端与肱骨内上髁连线中点凹陷中", locationDesc: "屈肘，肘横纹内侧端凹陷中", category: "合穴", functions: ["宁心安神", "理气止痛"], indications: ["心痛", "心悸", "失眠", "健忘", "肘臂挛痛", "瘰疬", "手颤"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "HT4", name: "灵道", pinyin: "líng dào", meridianId: "HT", meridianName: "手少阴心经", location: "前臂前内侧，腕掌侧远端横纹上1.5寸，尺侧腕屈肌腱桡侧缘", locationDesc: "腕横纹上1.5寸，尺侧腕屈肌腱桡侧", category: "经穴", functions: ["宁心安神", "活血通络"], indications: ["心痛", "心悸", "失眠", "暴喑", "舌强不语", "肘臂挛痛", "手指麻木"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT5", name: "通里", pinyin: "tōng lǐ", meridianId: "HT", meridianName: "手少阴心经", location: "前臂前内侧，腕掌侧远端横纹上1寸，尺侧腕屈肌腱桡侧缘", locationDesc: "腕横纹上1寸，尺侧腕屈肌腱桡侧", category: "络穴", functions: ["清心安神", "开音利咽"], indications: ["心悸", "失眠", "健忘", "舌强不语", "咽喉肿痛", "暴喑", "腕臂疼痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT6", name: "阴郄", pinyin: "yīn xì", meridianId: "HT", meridianName: "手少阴心经", location: "前臂前内侧，腕掌侧远端横纹上0.5寸，尺侧腕屈肌腱桡侧缘", locationDesc: "腕横纹上0.5寸，尺侧腕屈肌腱桡侧", category: "郄穴", functions: ["清心安神", "固表止汗"], indications: ["心痛", "心悸", "失眠", "盗汗", "骨蒸潮热", "吐血", "衄血"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT7", name: "神门", pinyin: "shén mén", meridianId: "HT", meridianName: "手少阴心经", location: "腕掌侧远端横纹尺侧端，尺侧腕屈肌腱桡侧缘凹陷中", locationDesc: "腕横纹尺侧端，尺侧腕屈肌腱桡侧", category: "输穴；原穴", functions: ["宁心安神", "清心泻火"], indications: ["心痛", "心烦", "失眠", "健忘", "癫狂", "痫证", "心悸", "怔忡", "胸胁痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT8", name: "少府", pinyin: "shào fǔ", meridianId: "HT", meridianName: "手少阴心经", location: "手掌，第4、5掌骨之间，握拳时小指尖所指处", locationDesc: "手掌，第四、五掌骨间，小指端与无名指端之间", category: "荥穴", functions: ["清心泻火", "理气止痛"], indications: ["心悸", "心痛", "心烦", "小便不利", "遗尿", "阴痒", "阴痛", "小指挛痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT9", name: "少冲", pinyin: "shào chōng", meridianId: "HT", meridianName: "手少阴心经", location: "手指小指末节桡侧，指甲根角侧上方0.1寸", locationDesc: "小指桡侧，指甲角旁开0.1寸", category: "井穴", functions: ["开窍泻热", "醒神开窍"], indications: ["心悸", "心痛", "癫狂", "热病昏迷", "胸胁痛"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },

  // ==================== 手太阳小肠经 (19 points) ====================
  { id: "SI1", name: "少泽", pinyin: "shào zé", meridianId: "SI", meridianName: "手太阳小肠经", location: "手指小指末节尺侧，指甲根角侧上方0.1寸", locationDesc: "小指尺侧，指甲角旁开0.1寸", category: "井穴", functions: ["清热利咽", "通乳开窍"], indications: ["头痛", "咽喉肿痛", "耳鸣耳聋", "乳少", "乳痈", "热病昏迷"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  { id: "SI2", name: "前谷", pinyin: "qián gǔ", meridianId: "SI", meridianName: "手太阳小肠经", location: "手内侧，第5掌指关节尺侧远端赤白肉际凹陷中", locationDesc: "微握拳，小指尺侧掌指关节前凹陷中", category: "荥穴", functions: ["清热利咽", "通经活络"], indications: ["头痛", "目痛", "耳鸣耳聋", "咽喉肿痛", "热病", "手指麻木", "乳少"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SI3", name: "后溪", pinyin: "hòu xī", meridianId: "SI", meridianName: "手太阳小肠经", location: "手内侧，第5掌指关节尺侧远端，赤白肉际凹陷处", locationDesc: "微握拳，第五掌指关节后，掌横纹头赤白肉际", category: "输穴；八脉交会穴（通督脉）", functions: ["清心安神", "通督活络"], indications: ["头项强痛", "腰背痛", "手指及肘臂挛痛", "耳鸣耳聋", "癫狂", "热病", "盗汗"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "SI4", name: "腕骨", pinyin: "wàn gǔ", meridianId: "SI", meridianName: "手太阳小肠经", location: "手内侧，第5掌骨基底部与钩骨之间，赤白肉际凹陷处", locationDesc: "手掌尺侧，三角骨与钩骨之间凹陷中", category: "原穴", functions: ["祛风清热", "通经活络"], indications: ["头痛", "项强", "耳鸣耳聋", "目翳", "黄疸", "热病", "手指麻木"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SI5", name: "阳谷", pinyin: "yáng gǔ", meridianId: "SI", meridianName: "手太阳小肠经", location: "腕后区，尺骨茎突与三角骨之间凹陷中", locationDesc: "腕背横纹尺侧端，尺骨茎突前凹陷中", category: "经穴", functions: ["清热明目", "通经活络"], indications: ["头痛", "目眩", "耳鸣耳聋", "热病", "癫狂", "腕臂疼痛", "颈颔肿痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SI6", name: "养老", pinyin: "yǎng lǎo", meridianId: "SI", meridianName: "手太阳小肠经", location: "前臂后内侧，腕背横纹上1寸，尺骨小头近端桡侧凹陷中", locationDesc: "掌心向下，尺骨小头最高点桡侧凹陷中", category: "郄穴", functions: ["清头明目", "舒筋活络"], indications: ["目视不明", "肩、背、肘、臂酸痛", "头痛", "面痛"], method: "直刺或斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "SI7", name: "支正", pinyin: "zhī zhèng", meridianId: "SI", meridianName: "手太阳小肠经", location: "前臂后内侧，腕背横纹上5寸，阳谷与小海连线上", locationDesc: "腕背横纹上5寸，尺骨内侧", category: "络穴", functions: ["清热安神", "通经活络"], indications: ["头痛", "项强", "热病", "癫狂", "肘臂挛痛", "手指麻木", "疣"], method: "直刺或斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "SI8", name: "小海", pinyin: "xiǎo hǎi", meridianId: "SI", meridianName: "手太阳小肠经", location: "肘后内侧，尺骨鹰嘴与肱骨内上髁之间凹陷中", locationDesc: "屈肘，尺骨鹰嘴与肱骨内上髁之间凹陷中", category: "合穴", functions: ["清热安神", "通经活络"], indications: ["肘臂疼痛", "头痛", "癫痫", "耳鸣耳聋", "齿痛", "颈项强痛", "上肢麻木"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SI9", name: "肩贞", pinyin: "jiān zhēn", meridianId: "SI", meridianName: "手太阳小肠经", location: "肩胛区，肩关节后下方，腋后纹头直上1寸", locationDesc: "腋后纹头上1寸，垂臂取之", category: "", functions: ["通经活络", "清热止痛"], indications: ["肩臂疼痛", "上肢不遂", "瘰疬", "耳鸣耳聋", "肩关节周围炎"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "SI10", name: "臑俞", pinyin: "nào shū", meridianId: "SI", meridianName: "手太阳小肠经", location: "肩胛区，腋后纹头直上，肩胛冈下缘凹陷中", locationDesc: "肩贞直上，肩胛冈下缘", category: "手太阳、阳维、阳跷脉交会穴", functions: ["通经活络", "散结止痛"], indications: ["肩臂疼痛", "瘰疬", "肩周炎", "上肢不遂", "颈项强痛"], method: "直刺或斜刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "SI11", name: "天宗", pinyin: "tiān zōng", meridianId: "SI", meridianName: "手太阳小肠经", location: "肩胛区，肩胛冈中点下缘，冈下窝中央凹陷处，约在肩胛冈下缘与肩胛下角之间的上1/3折点处", locationDesc: "肩胛骨冈下窝中央凹陷处，约肩胛冈下缘与肩胛下角上1/3处", category: "", functions: ["通经活络", "理气止痛"], indications: ["肩胛疼痛", "肘臂酸痛", "乳痈", "气喘", "咳嗽", "肩背痛"], method: "直刺或斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "SI12", name: "秉风", pinyin: "bǐng fēng", meridianId: "SI", meridianName: "手太阳小肠经", location: "肩胛区，肩胛冈中点上方，冈上窝中央，天宗直上，举臂有凹陷处", locationDesc: "肩胛骨冈上窝中，天宗直上", category: "手阳明、太阳、手足少阳经交会穴", functions: ["通经活络", "祛风止痛"], indications: ["肩胛疼痛", "上肢酸麻", "肩臂不举", "颈项强痛", "咳嗽"], method: "直刺或斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "SI13", name: "曲垣", pinyin: "qū yuán", meridianId: "SI", meridianName: "手太阳小肠经", location: "肩胛区，肩胛冈内侧端上缘凹陷中，约当臑俞与第2胸椎棘突连线的中点", locationDesc: "肩胛骨冈上窝内侧端凹陷中", category: "", functions: ["通经活络", "祛风止痛"], indications: ["肩胛疼痛", "肩臂拘急", "肘臂疼痛", "咳嗽", "气喘"], method: "直刺或斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "SI14", name: "肩外俞", pinyin: "jiān wài shū", meridianId: "SI", meridianName: "手太阳小肠经", location: "背部，第1胸椎棘突下，后正中线旁开3寸", locationDesc: "第一胸椎棘突下，旁开3寸", category: "", functions: ["通经活络", "祛风止痛"], indications: ["肩背疼痛", "颈项强急", "上肢麻木", "肘臂疼痛", "咳嗽"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "SI15", name: "肩中俞", pinyin: "jiān zhōng shū", meridianId: "SI", meridianName: "手太阳小肠经", location: "背部，第7颈椎棘突下，后正中线旁开2寸", locationDesc: "大椎旁开2寸", category: "", functions: ["宣肺止咳", "通经活络"], indications: ["咳嗽", "气喘", "肩背疼痛", "目视不明", "颈项强痛", "吐血"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "SI16", name: "天窗", pinyin: "tiān chuāng", meridianId: "SI", meridianName: "手太阳小肠经", location: "颈部，胸锁乳突肌后缘，扶突后方，与喉结相平", locationDesc: "喉结旁开3.5寸，胸锁乳突肌后缘", category: "", functions: ["清热利咽", "聪耳开窍"], indications: ["咽喉肿痛", "声音嘶哑", "耳鸣耳聋", "颈项强痛", "瘰疬", "瘿气"], method: "直刺0.3-0.5寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "SI17", name: "天容", pinyin: "tiān róng", meridianId: "SI", meridianName: "手太阳小肠经", location: "颈部，下颌角后方，胸锁乳突肌前缘凹陷中", locationDesc: "下颌角后，胸锁乳突肌前缘", category: "", functions: ["清热利咽", "消肿止痛"], indications: ["咽喉肿痛", "耳鸣耳聋", "颈项肿痛", "瘰疬", "瘿气", "颊肿"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "避开血管" },
  { id: "SI18", name: "颧髎", pinyin: "quán liáo", meridianId: "SI", meridianName: "手太阳小肠经", location: "面部，目外眦直下，颧骨下缘凹陷中", locationDesc: "目外眦直下，颧骨下缘凹陷处", category: "手少阳、太阳经交会穴", functions: ["祛风通络", "消肿止痛"], indications: ["口眼㖞斜", "眼睑瞤动", "齿痛", "面痛", "颊肿", "三叉神经痛"], method: "直刺0.3-0.5寸，或平刺0.5-1寸", moxibustion: "可灸" },
  { id: "SI19", name: "听宫", pinyin: "tīng gōng", meridianId: "SI", meridianName: "手太阳小肠经", location: "面部，耳屏正中与下颌骨髁突之间的凹陷中", locationDesc: "耳屏前，下颌骨髁状突后方，张口呈凹陷处", category: "手足少阳、手太阳经交会穴", functions: ["开窍聪耳"], indications: ["耳鸣耳聋", "中耳炎", "外耳道炎", "牙痛", "癫狂"], method: "张口直刺1-1.5寸", moxibustion: "可灸", caution: "留针时需张口" },

  // ==================== 足太阳膀胱经 (67 points) ====================
  { id: "BL1", name: "睛明", pinyin: "jīng míng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "面部，目内眦内上方眶内侧壁凹陷中", locationDesc: "目内眦角稍上方凹陷处", category: "手足太阳、足阳明、阴阳跷脉交会穴", functions: ["清热明目", "通络止泪"], indications: ["目赤肿痛", "流泪", "目眩", "近视", "夜盲", "色盲", "目翳", "眼睑痉挛"], method: "嘱患者闭目，医者轻推眼球向外侧固定，沿眶缘缓慢刺入0.5-1寸", moxibustion: "不宜灸", caution: "不捻转，不提插" },
  { id: "BL2", name: "攒竹", pinyin: "cuán zhú", meridianId: "BL", meridianName: "足太阳膀胱经", location: "面部，眉头凹陷中，眶上切迹处", locationDesc: "眉毛内侧端，眉头凹陷处", category: "", functions: ["清热明目", "祛风通络"], indications: ["头痛", "目赤肿痛", "目眩", "眉棱骨痛", "眼睑瞤动", "眼睑下垂", "口眼㖞斜"], method: "平刺0.5-0.8寸，或点刺出血", moxibustion: "不宜灸", caution: "不宜灸" },
  { id: "BL3", name: "眉冲", pinyin: "méi chōng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，攒竹直上，入发际0.5寸，神庭与曲差连线之间", locationDesc: "眉头直上，入发际0.5寸", category: "", functions: ["祛风通络", "清热明目"], indications: ["头痛", "眩晕", "鼻塞", "鼻渊", "目视不明", "癫痫"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL4", name: "曲差", pinyin: "qū chā", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，前发际正中直上0.5寸，旁开1.5寸，即神庭与头维连线的内1/3与中1/3交点处", locationDesc: "神庭旁开1.5寸", category: "", functions: ["祛风通络", "清热明目"], indications: ["头痛", "眩晕", "目视不明", "鼻塞", "鼻衄", "鼻渊"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL5", name: "五处", pinyin: "wǔ chù", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，前发际正中直上1寸，旁开1.5寸", locationDesc: "曲差直上0.5寸", category: "", functions: ["祛风通络", "清热明目"], indications: ["头痛", "眩晕", "目视不明", "鼻塞", "癫痫", "小儿惊风"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL6", name: "承光", pinyin: "chéng guāng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，前发际正中直上2.5寸，旁开1.5寸", locationDesc: "五处直上1.5寸", category: "", functions: ["祛风通络", "清热明目"], indications: ["头痛", "眩晕", "目视不明", "鼻塞", "热病", "呕吐"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL7", name: "通天", pinyin: "tōng tiān", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，前发际正中直上4寸，旁开1.5寸", locationDesc: "承光直上1.5寸", category: "", functions: ["祛风通络", "通鼻开窍"], indications: ["头痛", "眩晕", "鼻塞", "鼻渊", "鼻衄", "口眼㖞斜"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL8", name: "络却", pinyin: "luò què", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，前发际正中直上5.5寸，旁开1.5寸", locationDesc: "通天直上1.5寸", category: "", functions: ["祛风通络", "清头明目"], indications: ["头痛", "眩晕", "耳鸣", "目视不明", "癫狂", "痫证", "鼻塞"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL9", name: "玉枕", pinyin: "yù zhěn", meridianId: "BL", meridianName: "足太阳膀胱经", location: "头部，后发际正中直上2.5寸，旁开1.3寸，枕外隆凸上缘外侧", locationDesc: "脑户旁开1.3寸，枕外隆凸上缘", category: "", functions: ["祛风通络", "清头明目"], indications: ["头项痛", "眩晕", "目痛", "鼻塞", "近视", "不能远视"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL10", name: "天柱", pinyin: "tiān zhù", meridianId: "BL", meridianName: "足太阳膀胱经", location: "颈后区，横平第2颈椎棘突上际，斜方肌外缘凹陷中", locationDesc: "后发际正中旁开1.3寸，斜方肌外缘", category: "", functions: ["祛风通络", "清头明目"], indications: ["头痛", "眩晕", "项强", "肩背痛", "鼻塞", "咽喉肿痛"], method: "直刺或斜刺0.5-0.8寸", moxibustion: "可灸", caution: "不可向内上方深刺" },
  { id: "BL11", name: "大杼", pinyin: "dà zhù", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第1胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第一胸椎棘突下，旁开1.5寸", category: "骨会；手足太阳经交会穴", functions: ["祛风清热", "强筋壮骨"], indications: ["咳嗽", "发热", "头痛", "项强", "肩背疼痛", "骨病", "颈椎病"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL12", name: "风门", pinyin: "fēng mén", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第2胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第二胸椎棘突下，旁开1.5寸", category: "督脉、足太阳经交会穴", functions: ["祛风解表", "宣肺止咳"], indications: ["感冒", "咳嗽", "发热", "头痛", "项强", "鼻塞", "胸背疼痛"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL13", name: "肺俞", pinyin: "fèi shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第3胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第三胸椎棘突下，旁开1.5寸", category: "肺背俞穴", functions: ["养阴清肺", "祛风止痒"], indications: ["咳嗽", "气喘", "咯血", "鼻塞", "咽喉肿痛", "潮热", "盗汗", "皮肤瘙痒", "荨麻疹"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL14", name: "厥阴俞", pinyin: "jué yīn shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第4胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第四胸椎棘突下，旁开1.5寸", category: "心包背俞穴", functions: ["宽胸理气", "宁心安神"], indications: ["心痛", "心悸", "胸闷", "咳嗽", "呕吐", "失眠", "胁痛"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL15", name: "心俞", pinyin: "xīn shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第5胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第五胸椎棘突下，旁开1.5寸", category: "心背俞穴", functions: ["养心安神", "宽胸理气"], indications: ["心痛", "心悸", "失眠", "健忘", "癫狂", "痫证", "咳嗽", "盗汗", "梦遗"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL16", name: "督俞", pinyin: "dū shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第6胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第六胸椎棘突下，旁开1.5寸", category: "", functions: ["理气宽胸", "降逆止痛"], indications: ["心痛", "胸闷", "呃逆", "胃痛", "腹胀", "腹痛", "咳嗽"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL17", name: "膈俞", pinyin: "gé shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第7胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第七胸椎棘突下，旁开1.5寸", category: "血会", functions: ["宽胸利膈", "活血止血"], indications: ["呕吐", "呃逆", "胃痛", "咳嗽", "气喘", "吐血", "便血", "贫血", "皮肤瘙痒", "荨麻疹"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL18", name: "肝俞", pinyin: "gān shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第9胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第九胸椎棘突下，旁开1.5寸", category: "肝背俞穴", functions: ["疏肝理气", "清热明目"], indications: ["胁痛", "黄疸", "目赤肿痛", "目眩", "夜盲", "癫狂", "痫证", "吐血", "鼻衄"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL19", name: "胆俞", pinyin: "dǎn shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第10胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第十胸椎棘突下，旁开1.5寸", category: "胆背俞穴", functions: ["疏肝利胆", "清热化湿"], indications: ["黄疸", "口苦", "胁痛", "呕吐", "胸胁胀痛", "潮热", "胆道蛔虫症"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL20", name: "脾俞", pinyin: "pí shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第11胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第十一胸椎棘突下，旁开1.5寸", category: "脾背俞穴", functions: ["健脾和胃", "祛湿止泻"], indications: ["腹胀", "腹泻", "呕吐", "便秘", "痢疾", "水肿", "黄疸", "月经不调", "带下", "乏力"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL21", name: "胃俞", pinyin: "wèi shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第12胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第十二胸椎棘突下，旁开1.5寸", category: "胃背俞穴", functions: ["和胃降逆", "健脾消食"], indications: ["胃痛", "呕吐", "腹胀", "腹泻", "肠鸣", "食欲不振", "小儿疳积"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL22", name: "三焦俞", pinyin: "sān jiāo shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第1腰椎棘突下，后正中线旁开1.5寸", locationDesc: "第一腰椎棘突下，旁开1.5寸", category: "三焦背俞穴", functions: ["调理三焦", "利水消肿"], indications: ["腹胀", "水肿", "小便不利", "腹泻", "痢疾", "腰背疼痛", "遗尿"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "BL23", name: "肾俞", pinyin: "shèn shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第2腰椎棘突下，后正中线旁开1.5寸", locationDesc: "第二腰椎棘突下，旁开1.5寸", category: "肾背俞穴", functions: ["补肾益精", "壮腰强骨"], indications: ["腰痛", "阳痿", "遗精", "早泄", "月经不调", "带下", "耳鸣耳聋", "水肿", "喘咳"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "BL24", name: "气海俞", pinyin: "qì hǎi shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第3腰椎棘突下，后正中线旁开1.5寸", locationDesc: "第三腰椎棘突下，旁开1.5寸", category: "", functions: ["补肾壮腰", "理气活血"], indications: ["腰痛", "月经不调", "痛经", "痔疮", "下肢痿痹", "腹胀"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "BL25", name: "大肠俞", pinyin: "dà cháng shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第4腰椎棘突下，后正中线旁开1.5寸", locationDesc: "第四腰椎棘突下，旁开1.5寸", category: "大肠背俞穴", functions: ["通调肠腑", "理气止痛"], indications: ["腰痛", "腹痛", "腹胀", "腹泻", "便秘", "痢疾", "下肢痿痹"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL26", name: "关元俞", pinyin: "guān yuán shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第5腰椎棘突下，后正中线旁开1.5寸", locationDesc: "第五腰椎棘突下，旁开1.5寸", category: "", functions: ["补肾培元", "调理下焦"], indications: ["腰痛", "腹胀", "腹泻", "小便不利", "月经不调", "痛经", "遗尿"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL27", name: "小肠俞", pinyin: "xiǎo cháng shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，骶正中嵴旁开1.5寸，平第1骶后孔", locationDesc: "第一骶后孔，旁开1.5寸", category: "小肠背俞穴", functions: ["清热利湿", "通调小肠"], indications: ["腹痛", "腹泻", "小便不利", "遗精", "白带", "小便赤涩", "腰痛"], method: "直刺或斜刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL28", name: "膀胱俞", pinyin: "páng guāng shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，骶正中嵴旁开1.5寸，平第2骶后孔", locationDesc: "第二骶后孔，旁开1.5寸", category: "膀胱背俞穴", functions: ["清热利湿", "通调膀胱"], indications: ["小便不利", "遗尿", "尿频", "尿急", "腹泻", "便秘", "腰骶疼痛", "遗精"], method: "直刺或斜刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL29", name: "中膂俞", pinyin: "zhōng lǚ shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，骶正中嵴旁开1.5寸，平第3骶后孔", locationDesc: "第三骶后孔，旁开1.5寸", category: "", functions: ["理气止痛", "清热利湿"], indications: ["腹泻", "痢疾", "疝气", "腰脊强痛", "腹痛", "消渴"], method: "直刺或斜刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL30", name: "白环俞", pinyin: "bái huán shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，骶正中嵴旁开1.5寸，平第4骶后孔", locationDesc: "第四骶后孔，旁开1.5寸", category: "", functions: ["补肾调经", "理气止痛"], indications: ["遗精", "月经不调", "带下", "疝气", "腰骶疼痛", "下肢痿痹"], method: "直刺或斜刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL31", name: "上髎", pinyin: "shàng liáo", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，正对第1骶后孔中", locationDesc: "第一骶后孔中", category: "足太阳、少阳经交会穴", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "带下", "遗精", "阳痿", "腰痛", "小便不利", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL32", name: "次髎", pinyin: "cì liáo", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，正对第2骶后孔中", locationDesc: "第二骶后孔中", category: "", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "痛经", "带下", "遗精", "阳痿", "腰痛", "小便不利", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL33", name: "中髎", pinyin: "zhōng liáo", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，正对第3骶后孔中", locationDesc: "第三骶后孔中", category: "足厥阴、少阳经交会穴", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "带下", "小便不利", "便秘", "腹泻", "腰痛", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL34", name: "下髎", pinyin: "xià liáo", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，正对第4骶后孔中", locationDesc: "第四骶后孔中", category: "", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "带下", "小便不利", "腹痛", "便秘", "腰痛", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL35", name: "会阳", pinyin: "huì yáng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "骶部，尾骨端旁开0.5寸", locationDesc: "尾骨尖旁开0.5寸", category: "", functions: ["清热利湿", "理气止痛"], indications: ["腹泻", "痢疾", "痔疮", "便血", "阳痿", "带下", "腰痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL36", name: "承扶", pinyin: "chéng fú", meridianId: "BL", meridianName: "足太阳膀胱经", location: "股后区，臀横纹的中点", locationDesc: "臀横纹中央", category: "", functions: ["通经活络", "消肿止痛"], indications: ["腰腿疼痛", "下肢痿痹", "痔疮", "便秘", "小便不利", "坐骨神经痛"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "BL37", name: "殷门", pinyin: "yīn mén", meridianId: "BL", meridianName: "足太阳膀胱经", location: "股后区，承扶下6寸，承扶与委中连线上", locationDesc: "大腿后面，承扶下6寸", category: "", functions: ["通经活络", "消肿止痛"], indications: ["腰腿疼痛", "下肢痿痹", "坐骨神经痛", "下肢麻木", "腰背痛"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "BL38", name: "浮郄", pinyin: "fú xì", meridianId: "BL", meridianName: "足太阳膀胱经", location: "膝后区，腘横纹外侧端，股二头肌腱内侧缘", locationDesc: "委阳内侧1寸，股二头肌腱内侧", category: "", functions: ["舒筋活络", "清热利湿"], indications: ["膝关节疼痛", "小腿转筋", "下肢痿痹", "便秘", "腹泻", "小便不利"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL39", name: "委阳", pinyin: "wěi yáng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "膝后区，腘横纹外侧端，股二头肌腱内侧缘", locationDesc: "委中外侧，股二头肌腱内侧", category: "三焦下合穴", functions: ["通调三焦", "理气止痛"], indications: ["小便不利", "水肿", "腰脊强痛", "下肢痿痹", "腹痛", "腹胀"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL40", name: "委中", pinyin: "wěi zhōng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "膝后区，腘横纹中点，股二头肌腱内侧", locationDesc: "腘窝横纹中央，屈膝取之", category: "合穴；膀胱下合穴", functions: ["清热凉血", "舒筋活络"], indications: ["腰背痛", "下肢痿痹", "腹痛", "吐泻", "丹毒", "皮肤瘙痒", "疔疮"], method: "直刺1-1.5寸，或点刺出血", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "BL41", name: "附分", pinyin: "fù fēn", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第2胸椎棘突下，后正中线旁开3寸", locationDesc: "第二胸椎棘突下，旁开3寸", category: "手足太阳经交会穴", functions: ["祛风散寒", "通经活络"], indications: ["颈项强痛", "肩背拘急", "肘臂麻木", "咳嗽", "气喘"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL42", name: "魄户", pinyin: "pò hù", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第3胸椎棘突下，后正中线旁开3寸", locationDesc: "第三胸椎棘突下，旁开3寸", category: "", functions: ["宣肺止咳", "理气平喘"], indications: ["咳嗽", "气喘", "肺痨", "项强", "肩背疼痛", "咯血"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL43", name: "膏肓", pinyin: "gāo huāng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第4胸椎棘突下，后正中线旁开3寸", locationDesc: "第四胸椎棘突下，旁开3寸", category: "", functions: ["补虚益损", "调理肺气"], indications: ["咳嗽", "气喘", "盗汗", "肺痨", "健忘", "遗精", "完谷不化", "虚劳羸瘦"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL44", name: "神堂", pinyin: "shén táng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第5胸椎棘突下，后正中线旁开3寸", locationDesc: "第五胸椎棘突下，旁开3寸", category: "", functions: ["宁心安神", "理气宽胸"], indications: ["心痛", "心悸", "失眠", "胸闷", "咳嗽", "气喘", "肩背疼痛"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL45", name: "譩譆", pinyin: "yì xǐ", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第6胸椎棘突下，后正中线旁开3寸", locationDesc: "第六胸椎棘突下，旁开3寸", category: "", functions: ["理气宽胸", "清热止咳"], indications: ["咳嗽", "气喘", "热病", "肩背疼痛", "胸闷", "目眩", "鼻衄"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL46", name: "膈关", pinyin: "gé guān", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第7胸椎棘突下，后正中线旁开3寸", locationDesc: "第七胸椎棘突下，旁开3寸", category: "", functions: ["宽胸利膈", "降逆止呕"], indications: ["呕吐", "呃逆", "嗳气", "胸闷", "脊背强痛", "食不下"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL47", name: "魂门", pinyin: "hún mén", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第9胸椎棘突下，后正中线旁开3寸", locationDesc: "第九胸椎棘突下，旁开3寸", category: "", functions: ["疏肝理气", "安神定志"], indications: ["胁痛", "呕吐", "腹泻", "胃痛", "失眠", "胸背痛", "黄疸"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL48", name: "阳纲", pinyin: "yáng gāng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第10胸椎棘突下，后正中线旁开3寸", locationDesc: "第十胸椎棘突下，旁开3寸", category: "", functions: ["疏肝利胆", "清热利湿"], indications: ["肠鸣", "腹痛", "腹泻", "黄疸", "消渴", "胁痛", "腹胀"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL49", name: "意舍", pinyin: "yì shě", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第11胸椎棘突下，后正中线旁开3寸", locationDesc: "第十一胸椎棘突下，旁开3寸", category: "", functions: ["健脾和胃", "理气止痛"], indications: ["腹胀", "腹泻", "肠鸣", "呕吐", "食欲不振", "消渴", "黄疸"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL50", name: "胃仓", pinyin: "wèi cāng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第12胸椎棘突下，后正中线旁开3寸", locationDesc: "第十二胸椎棘突下，旁开3寸", category: "", functions: ["和胃降逆", "理气止痛"], indications: ["胃痛", "腹胀", "呕吐", "食欲不振", "小儿疳积", "水肿", "便秘"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL51", name: "肓门", pinyin: "huāng mén", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第1腰椎棘突下，后正中线旁开3寸", locationDesc: "第一腰椎棘突下，旁开3寸", category: "", functions: ["理气止痛", "消积散结"], indications: ["腹痛", "便秘", "痞块", "乳疾", "腰背痛", "腹胀"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL52", name: "志室", pinyin: "zhì shì", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第2腰椎棘突下，后正中线旁开3寸", locationDesc: "第二腰椎棘突下，旁开3寸", category: "", functions: ["补肾益精", "壮腰强骨"], indications: ["遗精", "阳痿", "小便不利", "水肿", "腰痛", "月经不调", "带下"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL53", name: "胞肓", pinyin: "bāo huāng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "臀部，平第2骶后孔，骶正中嵴旁开3寸", locationDesc: "第二骶后孔，旁开3寸", category: "", functions: ["通调二便", "强腰健肾"], indications: ["小便不利", "便秘", "腰脊疼痛", "腹胀", "肠鸣", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL54", name: "秩边", pinyin: "zhì biān", meridianId: "BL", meridianName: "足太阳膀胱经", location: "臀部，平第4骶后孔，骶正中嵴旁开3寸", locationDesc: "第四骶后孔，旁开3寸", category: "", functions: ["通经活络", "清热利湿"], indications: ["腰骶疼痛", "下肢痿痹", "小便不利", "便秘", "痔疮", "坐骨神经痛", "阴痛"], method: "直刺1.5-2寸", moxibustion: "可灸" },
  { id: "BL55", name: "合阳", pinyin: "hé yáng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "小腿后区，腘横纹下2寸，腓肠肌内、外侧头之间", locationDesc: "委中下2寸，腓肠肌两头之间", category: "", functions: ["舒筋活络", "理气止痛"], indications: ["腰腿疼痛", "下肢痿痹", "疝气", "崩漏", "带下", "小腿转筋"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "BL56", name: "承筋", pinyin: "chéng jīn", meridianId: "BL", meridianName: "足太阳膀胱经", location: "小腿后区，腘横纹下5寸，腓肠肌两肌腹之间", locationDesc: "合阳与承山之间，腓肠肌中央", category: "", functions: ["舒筋活络", "清热利湿"], indications: ["腰腿拘急", "疼痛", "痔疾", "便秘", "小腿转筋", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL57", name: "承山", pinyin: "chéng shān", meridianId: "BL", meridianName: "足太阳膀胱经", location: "小腿后区，腓肠肌两肌腹与肌腱交角的凹陷处", locationDesc: "小腿后面，委中与昆仑之间，伸直足尖并足跟用力蹬地时呈人字纹处", category: "", functions: ["理气止痛", "舒筋活络"], indications: ["腰腿拘急", "疼痛", "痔疾", "便秘", "脚气"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "BL58", name: "飞扬", pinyin: "fēi yáng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "小腿后区，昆仑直上7寸，承山外侧，腓肠肌外下缘与跟腱移行处", locationDesc: "昆仑直上7寸，承山外侧", category: "络穴", functions: ["祛风清热", "通经活络"], indications: ["头痛", "眩晕", "鼻塞", "鼻衄", "腰腿疼痛", "痔疮", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "BL59", name: "跗阳", pinyin: "fū yáng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "小腿后区，昆仑直上3寸，腓骨与跟腱之间", locationDesc: "昆仑直上3寸", category: "阳跷脉郄穴", functions: ["祛风通络", "舒筋活络"], indications: ["头痛", "眩晕", "腰骶疼痛", "下肢痿痹", "外踝疼痛", "癫痫"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "BL60", name: "昆仑", pinyin: "kūn lún", meridianId: "BL", meridianName: "足太阳膀胱经", location: "踝区，外踝尖与跟腱之间的凹陷中", locationDesc: "外踝后方，外踝尖与跟腱之间凹陷中", category: "经穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "眩晕", "项强", "腰骶疼痛", "足跟肿痛", "癫痫", "鼻衄"], method: "直刺0.5-0.8寸", moxibustion: "可灸", caution: "孕妇慎用" },
  { id: "BL61", name: "仆参", pinyin: "pú cān", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足外侧，昆仑直下，跟骨外侧，赤白肉际处", locationDesc: "昆仑直下，跟骨外侧凹陷中", category: "足太阳、阳跷脉交会穴", functions: ["舒筋活络", "消肿止痛"], indications: ["足跟疼痛", "下肢痿痹", "癫痫", "腰痛", "足踝肿痛", "转筋"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "BL62", name: "申脉", pinyin: "shēn mài", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足外侧，外踝尖直下，外踝下缘与跟骨之间的凹陷中", locationDesc: "外踝尖直下凹陷中", category: "八脉交会穴（通阳跷脉）", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "失眠", "癫狂", "痫证", "腰腿酸痛", "足踝疼痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "BL63", name: "金门", pinyin: "jīn mén", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足外侧，外踝前缘直下，骰骨下缘凹陷中", locationDesc: "申脉前下方，骰骨外侧凹陷中", category: "郄穴", functions: ["祛风通络", "安神定志"], indications: ["头痛", "癫痫", "小儿惊风", "腰痛", "下肢痿痹", "足踝疼痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "BL64", name: "京骨", pinyin: "jīng gǔ", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足外侧，第5跖骨粗隆下方，赤白肉际处", locationDesc: "第五跖骨粗隆下方，赤白肉际处", category: "原穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "项强", "腰腿疼痛", "癫痫", "目眩", "鼻衄", "足跗疼痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "BL65", name: "束骨", pinyin: "shù gǔ", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足外侧，第5跖趾关节近端，赤白肉际处", locationDesc: "第五跖趾关节后方，赤白肉际处", category: "输穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "项强", "目眩", "癫狂", "腰腿疼痛", "足跗疼痛", "痔疮"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "BL66", name: "足通谷", pinyin: "zú tōng gǔ", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足外侧，第5跖趾关节前方，赤白肉际处", locationDesc: "第五跖趾关节前，赤白肉际处", category: "荥穴", functions: ["祛风清热", "通经活络"], indications: ["头痛", "项强", "目眩", "鼻衄", "癫狂", "足跗疼痛", "热病"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "BL67", name: "至阴", pinyin: "zhì yīn", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足趾，小趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足小趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["祛风清热", "调整胎位"], indications: ["头痛", "鼻塞", "鼻衄", "目痛", "胎位不正", "难产", "滞产"], method: "浅刺0.1寸，或艾灸", moxibustion: "胎位不正宜灸", caution: "孕妇禁针" },

  // ==================== 足少阴肾经 (27 points) ====================
  { id: "KI1", name: "涌泉", pinyin: "yǒng quán", meridianId: "KI", meridianName: "足少阴肾经", location: "足底，屈足卷趾时足心最凹陷处，约当足底第2、3趾蹼缘与足跟连线的前1/3与后2/3交点处", locationDesc: "足底前1/3凹陷处", category: "井穴", functions: ["苏厥开窍", "滋阴益肾"], indications: ["昏厥", "中暑", "癫狂", "小儿惊风", "头痛", "眩晕", "失眠", "便秘", "小便不利"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "KI2", name: "然谷", pinyin: "rán gǔ", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，足舟骨粗隆下方，赤白肉际凹陷处", locationDesc: "内踝前下方，舟骨粗隆下缘凹陷中", category: "荥穴", functions: ["滋阴清热", "利湿止带"], indications: ["月经不调", "带下", "遗精", "消渴", "咽喉肿痛", "足跗疼痛", "泄泻"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "KI3", name: "太溪", pinyin: "tài xī", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，内踝尖与跟腱之间的凹陷中", locationDesc: "内踝尖与跟腱之间凹陷中", category: "输穴；原穴", functions: ["滋阴益肾", "壮阳强腰"], indications: ["头痛", "眩晕", "耳鸣耳聋", "牙痛", "咽喉肿痛", "咳嗽", "气喘", "月经不调", "遗精", "阳痿", "腰脊疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "KI4", name: "大钟", pinyin: "dà zhōng", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，内踝后下方，跟腱附着部内侧前方凹陷中", locationDesc: "太溪下0.5寸稍后，跟腱内侧", category: "络穴", functions: ["益肾强腰", "安神定志"], indications: ["癃闭", "遗尿", "便秘", "咯血", "气喘", "痴呆", "足跟疼痛", "腰痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "KI5", name: "水泉", pinyin: "shuǐ quán", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，太溪直下1寸，跟骨结节内侧凹陷中", locationDesc: "太溪直下1寸，跟骨内侧", category: "郄穴", functions: ["调经止痛", "清热利尿"], indications: ["月经不调", "痛经", "闭经", "子宫脱垂", "小便不利", "目视不明", "足跟痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "KI6", name: "照海", pinyin: "zhào hǎi", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，内踝尖下1寸，内踝下方凹陷中", locationDesc: "内踝尖下方1寸凹陷中", category: "八脉交会穴（通阴跷脉）", functions: ["滋阴益肾", "清热利咽"], indications: ["咽喉肿痛", "失眠", "目赤肿痛", "月经不调", "带下", "小便频数", "足跗肿痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "KI7", name: "复溜", pinyin: "fù liū", meridianId: "KI", meridianName: "足少阴肾经", location: "小腿内侧，太溪直上2寸，跟腱前缘", locationDesc: "太溪直上2寸，跟腱前缘", category: "经穴", functions: ["补肾益阴", "清热利水"], indications: ["水肿", "腹胀", "腹泻", "盗汗", "热病无汗", "下肢痿痹", "腰脊强痛"], method: "直刺0.6-1寸", moxibustion: "可灸" },
  { id: "KI8", name: "交信", pinyin: "jiāo xìn", meridianId: "KI", meridianName: "足少阴肾经", location: "小腿内侧，复溜前0.5寸，胫骨内侧缘后方", locationDesc: "复溜前0.5寸，胫骨后缘", category: "阴跷脉郄穴", functions: ["调经止带", "清热利尿"], indications: ["月经不调", "崩漏", "子宫脱垂", "疝气", "腹泻", "便秘", "小腿内侧疼痛"], method: "直刺0.6-1.2寸", moxibustion: "可灸" },
  { id: "KI9", name: "筑宾", pinyin: "zhù bīn", meridianId: "KI", meridianName: "足少阴肾经", location: "小腿内侧，太溪直上5寸，腓肠肌肌腹内下方", locationDesc: "太溪直上5寸，比目鱼肌与腓肠肌之间", category: "阴维脉郄穴", functions: ["安神定志", "理气止痛"], indications: ["癫狂", "呕吐", "疝气", "小腿疼痛", "下肢痿痹", "肾炎"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI10", name: "阴谷", pinyin: "yīn gǔ", meridianId: "KI", meridianName: "足少阴肾经", location: "膝后内侧，腘横纹内侧端，半腱肌与半膜肌肌腱之间", locationDesc: "屈膝，腘横纹内侧端，两筋之间", category: "合穴", functions: ["补肾益精", "理气止痛"], indications: ["阳痿", "遗精", "月经不调", "崩漏", "小便不利", "膝股内侧疼痛", "癫狂"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI11", name: "横骨", pinyin: "héng gǔ", meridianId: "KI", meridianName: "足少阴肾经", location: "下腹部，脐中下5寸，前正中线旁开0.5寸", locationDesc: "脐下5寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["补肾调经", "清热利湿"], indications: ["小腹胀痛", "小便不利", "遗尿", "遗精", "阳痿", "疝气", "月经不调"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "KI12", name: "大赫", pinyin: "dà hè", meridianId: "KI", meridianName: "足少阴肾经", location: "下腹部，脐中下4寸，前正中线旁开0.5寸", locationDesc: "脐下4寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["补肾固精", "调经止带"], indications: ["遗精", "阳痿", "月经不调", "带下", "子宫脱垂", "不孕", "疝气"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "KI13", name: "气穴", pinyin: "qì xué", meridianId: "KI", meridianName: "足少阴肾经", location: "下腹部，脐中下3寸，前正中线旁开0.5寸", locationDesc: "脐下3寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["调经止带", "补肾固精"], indications: ["月经不调", "带下", "不孕", "遗精", "阳痿", "小便不利", "腹泻"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "KI14", name: "四满", pinyin: "sì mǎn", meridianId: "KI", meridianName: "足少阴肾经", location: "下腹部，脐中下2寸，前正中线旁开0.5寸", locationDesc: "脐下2寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["调经利水", "理气止痛"], indications: ["月经不调", "带下", "不孕", "遗精", "遗尿", "疝气", "便秘", "水肿"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI15", name: "中注", pinyin: "zhōng zhù", meridianId: "KI", meridianName: "足少阴肾经", location: "下腹部，脐中下1寸，前正中线旁开0.5寸", locationDesc: "脐下1寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["调经止痛", "理气通便"], indications: ["月经不调", "腹痛", "便秘", "腹泻", "疝气", "腰痛", "带下"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI16", name: "肓俞", pinyin: "huāng shū", meridianId: "KI", meridianName: "足少阴肾经", location: "腹部，脐中旁开0.5寸", locationDesc: "脐旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["理气止痛", "调理肠胃"], indications: ["腹痛", "腹胀", "呕吐", "便秘", "腹泻", "疝气", "月经不调"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI17", name: "商曲", pinyin: "shāng qū", meridianId: "KI", meridianName: "足少阴肾经", location: "上腹部，脐中上2寸，前正中线旁开0.5寸", locationDesc: "脐上2寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["理气和胃", "消食导滞"], indications: ["腹痛", "腹胀", "呕吐", "腹泻", "便秘", "食欲不振", "胃痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI18", name: "石关", pinyin: "shí guān", meridianId: "KI", meridianName: "足少阴肾经", location: "上腹部，脐中上3寸，前正中线旁开0.5寸", locationDesc: "脐上3寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["理气和胃", "降逆止呕"], indications: ["胃痛", "呕吐", "腹胀", "腹痛", "便秘", "不孕", "产后腹痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI19", name: "阴都", pinyin: "yīn dū", meridianId: "KI", meridianName: "足少阴肾经", location: "上腹部，脐中上4寸，前正中线旁开0.5寸", locationDesc: "脐上4寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["理气和胃", "降逆安神"], indications: ["胃痛", "腹胀", "呕吐", "便秘", "心悸", "失眠", "哮喘"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "KI20", name: "腹通谷", pinyin: "fù tōng gǔ", meridianId: "KI", meridianName: "足少阴肾经", location: "上腹部，脐中上5寸，前正中线旁开0.5寸", locationDesc: "脐上5寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["理气和胃", "降逆止呕"], indications: ["腹痛", "腹胀", "呕吐", "胃痛", "心悸", "胸痛", "暴喑"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI21", name: "幽门", pinyin: "yōu mén", meridianId: "KI", meridianName: "足少阴肾经", location: "上腹部，脐中上6寸，前正中线旁开0.5寸", locationDesc: "脐上6寸，旁开0.5寸", category: "冲脉、足少阴经交会穴", functions: ["理气和胃", "降逆止呕"], indications: ["腹痛", "呕吐", "腹胀", "腹泻", "消化不良", "胃痛", "胁痛"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI22", name: "步廊", pinyin: "bù láng", meridianId: "KI", meridianName: "足少阴肾经", location: "胸部，第5肋间隙，前正中线旁开2寸", locationDesc: "第五肋间隙，旁开2寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸痛", "咳嗽", "气喘", "呕吐", "食欲不振", "乳痈", "胸胁胀满"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI23", name: "神封", pinyin: "shén fēng", meridianId: "KI", meridianName: "足少阴肾经", location: "胸部，第4肋间隙，前正中线旁开2寸", locationDesc: "第四肋间隙，旁开2寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸痛", "咳嗽", "气喘", "呕吐", "乳痈", "心悸", "胸胁胀满"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI24", name: "灵墟", pinyin: "líng xū", meridianId: "KI", meridianName: "足少阴肾经", location: "胸部，第3肋间隙，前正中线旁开2寸", locationDesc: "第三肋间隙，旁开2寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸痛", "咳嗽", "气喘", "呕吐", "乳痈", "胸闷", "胁痛"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI25", name: "神藏", pinyin: "shén cáng", meridianId: "KI", meridianName: "足少阴肾经", location: "胸部，第2肋间隙，前正中线旁开2寸", locationDesc: "第二肋间隙，旁开2寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸痛", "咳嗽", "气喘", "呕吐", "心悸", "胸胁胀满", "食欲不振"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI26", name: "彧中", pinyin: "yù zhōng", meridianId: "KI", meridianName: "足少阴肾经", location: "胸部，第1肋间隙，前正中线旁开2寸", locationDesc: "第一肋间隙，旁开2寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸痛", "咳嗽", "气喘", "呕吐", "胸胁胀满", "痰多", "心悸"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "KI27", name: "俞府", pinyin: "shū fǔ", meridianId: "KI", meridianName: "足少阴肾经", location: "胸部，锁骨下缘，前正中线旁开2寸", locationDesc: "锁骨下缘，旁开2寸", category: "", functions: ["理气宽胸", "降逆止咳"], indications: ["胸痛", "咳嗽", "气喘", "呕吐", "食欲不振", "胸胁胀满", "呃逆"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },

  // ==================== 手厥阴心包经 (9 points) ====================
  { id: "PC1", name: "天池", pinyin: "tiān chí", meridianId: "PC", meridianName: "手厥阴心包经", location: "胸部，第4肋间隙，前正中线旁开5寸，乳头外1寸", locationDesc: "第四肋间隙，乳头外1寸", category: "手足厥阴、手足少阳经交会穴", functions: ["理气宽胸", "止咳平喘"], indications: ["胸闷", "胸痛", "咳嗽", "气喘", "乳痈", "腋下肿痛", "瘰疬"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "PC2", name: "天泉", pinyin: "tiān quán", meridianId: "PC", meridianName: "手厥阴心包经", location: "臂前内侧，腋前纹头下2寸，肱二头肌长、短头之间", locationDesc: "腋前纹头下2寸，肱二头肌两头之间", category: "", functions: ["宽胸理气", "活血通络"], indications: ["胸痛", "心痛", "心悸", "咳嗽", "上臂内侧疼痛", "胸胁胀满"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "PC3", name: "曲泽", pinyin: "qū zé", meridianId: "PC", meridianName: "手厥阴心包经", location: "肘前内侧，肘横纹中，肱二头肌腱尺侧凹陷中", locationDesc: "肘横纹中，肱二头肌腱尺侧", category: "合穴", functions: ["清心泻火", "降逆止呕"], indications: ["心痛", "心悸", "胃痛", "呕吐", "热病", "烦躁", "肘臂挛痛", "上肢颤动"], method: "直刺1-1.5寸，或点刺出血", moxibustion: "可灸" },
  { id: "PC4", name: "郄门", pinyin: "xì mén", meridianId: "PC", meridianName: "手厥阴心包经", location: "前臂前内侧，腕掌侧远端横纹上5寸，掌长肌腱与桡侧腕屈肌腱之间", locationDesc: "腕横纹上5寸，掌长肌腱与桡侧腕屈肌腱之间", category: "郄穴", functions: ["宁心安神", "理气止痛"], indications: ["心痛", "心悸", "胸闷", "心烦", "呕血", "咯血", "疔疮", "癫痫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "PC5", name: "间使", pinyin: "jiān shǐ", meridianId: "PC", meridianName: "手厥阴心包经", location: "前臂前内侧，腕掌侧远端横纹上3寸，掌长肌腱与桡侧腕屈肌腱之间", locationDesc: "腕横纹上3寸，掌长肌腱与桡侧腕屈肌腱之间", category: "经穴", functions: ["宁心安神", "理气止痛"], indications: ["心痛", "心悸", "胃痛", "呕吐", "热病", "疟疾", "癫狂", "痫证", "肘臂挛痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "PC6", name: "内关", pinyin: "nèi guān", meridianId: "PC", meridianName: "手厥阴心包经", location: "前臂前内侧，腕掌侧远端横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间", locationDesc: "腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间", category: "络穴；八脉交会穴（通阴维脉）", functions: ["宁心安神", "理气止痛"], indications: ["心痛", "心悸", "胸闷", "胃痛", "呕吐", "呃逆", "失眠", "癫狂", "痫证", "眩晕", "中风偏瘫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "PC7", name: "大陵", pinyin: "dà líng", meridianId: "PC", meridianName: "手厥阴心包经", location: "腕掌侧远端横纹中，掌长肌腱与桡侧腕屈肌腱之间凹陷中", locationDesc: "腕横纹中央，掌长肌腱与桡侧腕屈肌腱之间", category: "输穴；原穴", functions: ["宁心安神", "和胃宽胸"], indications: ["心痛", "心悸", "胃痛", "呕吐", "胸闷", "惊悸", "失眠", "癫狂"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "PC8", name: "劳宫", pinyin: "láo gōng", meridianId: "PC", meridianName: "手厥阴心包经", location: "掌区，横平第3掌指关节近端，第2、3掌骨之间偏于第3掌骨", locationDesc: "掌心，第二、三掌骨之间，握拳屈指时中指尖处", category: "荥穴", functions: ["清心泻火", "开窍醒神"], indications: ["中风昏迷", "中暑", "癫狂", "痫证", "心痛", "呕吐", "口疮", "口臭"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "PC9", name: "中冲", pinyin: "zhōng chōng", meridianId: "PC", meridianName: "手厥阴心包经", location: "手指，中指末节最高点", locationDesc: "中指尖端，指甲游离缘前端", category: "井穴", functions: ["开窍泻热", "醒神开窍"], indications: ["中风昏迷", "舌强不语", "中暑", "热病", "小儿惊风", "心烦"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },

  // ==================== 手少阳三焦经 (23 points) ====================
  { id: "TE1", name: "关冲", pinyin: "guān chōng", meridianId: "TE", meridianName: "手少阳三焦经", location: "手指无名指末节尺侧，指甲根角侧上方0.1寸", locationDesc: "无名指尺侧，指甲角旁开0.1寸", category: "井穴", functions: ["清热利咽", "开窍醒神"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "口干", "热病昏厥"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  { id: "TE2", name: "液门", pinyin: "yè mén", meridianId: "TE", meridianName: "手少阳三焦经", location: "手背，第4、5指间，指蹼缘后方赤白肉际处", locationDesc: "第四、五指间，指蹼缘后方", category: "荥穴", functions: ["清热泻火", "聪耳明目"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "手臂疼痛", "疟疾", "热病"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "TE3", name: "中渚", pinyin: "zhōng zhǔ", meridianId: "TE", meridianName: "手少阳三焦经", location: "手背，第4、5掌骨间，掌指关节后方凹陷中", locationDesc: "手背第四、五掌骨间，液门后1寸", category: "输穴", functions: ["清热通络", "聪耳明目"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "手指不能屈伸", "肘臂疼痛", "热病"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "TE4", name: "阳池", pinyin: "yáng chí", meridianId: "TE", meridianName: "手少阳三焦经", location: "腕后区，腕背侧远端横纹上，指伸肌腱与小指伸肌腱之间凹陷中", locationDesc: "腕背横纹中，指总伸肌腱尺侧缘凹陷中", category: "原穴", functions: ["清热通络", "调理三焦"], indications: ["手腕疼痛", "肩背疼痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "疟疾", "消渴"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "TE5", name: "外关", pinyin: "wài guān", meridianId: "TE", meridianName: "手少阳三焦经", location: "前臂后外侧，腕背侧远端横纹上2寸，尺骨与桡骨之间", locationDesc: "腕背横纹上2寸，尺骨与桡骨之间", category: "络穴；八脉交会穴（通阳维脉）", functions: ["清热解表", "通经活络"], indications: ["热病", "头痛", "目赤肿痛", "耳鸣耳聋", "胸胁疼痛", "上肢痿痹", "手指疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE6", name: "支沟", pinyin: "zhī gōu", meridianId: "TE", meridianName: "手少阳三焦经", location: "前臂后外侧，腕背侧远端横纹上3寸，尺骨与桡骨之间", locationDesc: "腕背横纹上3寸，尺桡骨之间", category: "经穴", functions: ["清热通便", "理气止痛"], indications: ["便秘", "胁痛", "耳鸣耳聋", "肩背疼痛", "呕吐", "热病", "上肢痿痹"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE7", name: "会宗", pinyin: "huì zōng", meridianId: "TE", meridianName: "手少阳三焦经", location: "前臂后外侧，腕背侧远端横纹上3寸，支沟尺侧，尺骨桡侧缘", locationDesc: "支沟尺侧一横指，尺骨桡侧", category: "郄穴", functions: ["清热通络", "聪耳开窍"], indications: ["耳鸣耳聋", "癫痫", "上肢疼痛", "胁痛", "头痛", "目赤"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE8", name: "三阳络", pinyin: "sān yáng luò", meridianId: "TE", meridianName: "手少阳三焦经", location: "前臂后外侧，腕背侧远端横纹上4寸，尺骨与桡骨之间", locationDesc: "腕背横纹上4寸，尺桡骨之间", category: "", functions: ["清热通络", "聪耳利咽"], indications: ["耳鸣耳聋", "暴喑", "牙痛", "上肢疼痛", "头痛", "热病", "胁痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE9", name: "四渎", pinyin: "sì dú", meridianId: "TE", meridianName: "手少阳三焦经", location: "前臂后外侧，肘尖下5寸，尺骨与桡骨之间", locationDesc: "肘尖下5寸，尺桡骨之间", category: "", functions: ["清热通络", "聪耳利咽"], indications: ["耳鸣耳聋", "牙痛", "咽喉肿痛", "上肢疼痛", "头痛", "暴喑", "前臂疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE10", name: "天井", pinyin: "tiān jǐng", meridianId: "TE", meridianName: "手少阳三焦经", location: "肘后区，肘尖上方1寸凹陷中", locationDesc: "屈肘，肘尖直上1寸凹陷中", category: "合穴", functions: ["清热化痰", "通络止痛"], indications: ["偏头痛", "耳聋", "瘰疬", "癫痫", "胸胁疼痛", "上肢痿痹"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE11", name: "清冷渊", pinyin: "qīng lěng yuān", meridianId: "TE", meridianName: "手少阳三焦经", location: "臂后侧，肘尖直上2寸，天井上1寸", locationDesc: "天井上1寸，肱骨后侧", category: "", functions: ["清热散风", "通经活络"], indications: ["头痛", "目黄", "上肢疼痛", "肩臂不举", "胁痛", "癫痫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE12", name: "消泺", pinyin: "xiāo luò", meridianId: "TE", meridianName: "手少阳三焦经", location: "臂后侧，肘尖直上5寸，清冷渊与臑会连线上", locationDesc: "天井上4寸，三角肌后缘", category: "", functions: ["清热散风", "通经活络"], indications: ["头痛", "颈项强痛", "上肢疼痛", "肩背疼痛", "癫痫", "牙痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE13", name: "臑会", pinyin: "nào huì", meridianId: "TE", meridianName: "手少阳三焦经", location: "臂后侧，肩峰角下3寸，三角肌后缘", locationDesc: "肩髎下3寸，三角肌后缘", category: "手少阳、阳维脉交会穴", functions: ["通经活络", "散结止痛"], indications: ["瘰疬", "瘿气", "肩臂疼痛", "上肢痿痹", "目疾", "颈项强痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE14", name: "肩髎", pinyin: "jiān liáo", meridianId: "TE", meridianName: "手少阳三焦经", location: "肩部，肩峰后下方，上臂外展时肩峰后下方凹陷中", locationDesc: "肩峰后下方凹陷中，肩髃后约1寸", category: "", functions: ["祛风除湿", "通经活络"], indications: ["肩臂疼痛", "上肢不遂", "肩周炎", "风疹", "半身不遂", "肩关节疼痛"], method: "直刺0.8-1.5寸", moxibustion: "可灸" },
  { id: "TE15", name: "天髎", pinyin: "tiān liáo", meridianId: "TE", meridianName: "手少阳三焦经", location: "肩胛区，肩胛骨上角，肩井与曲垣连线中点", locationDesc: "肩胛骨上角处，肩井后下方", category: "手足少阳、阳维脉交会穴", functions: ["通经活络", "祛风止痛"], indications: ["肩臂疼痛", "颈项强痛", "胸中烦满", "热病", "上肢不遂"], method: "直刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "TE16", name: "天牖", pinyin: "tiān yǒu", meridianId: "TE", meridianName: "手少阳三焦经", location: "颈部，横平下颌角，胸锁乳突肌后缘凹陷中", locationDesc: "乳突后下方，胸锁乳突肌后缘", category: "", functions: ["祛风通络", "聪耳明目"], indications: ["头痛", "眩晕", "耳鸣耳聋", "目痛", "颈项强痛", "瘰疬", "面肿"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "TE17", name: "翳风", pinyin: "yì fēng", meridianId: "TE", meridianName: "手少阳三焦经", location: "颈部，乳突前下方，平耳垂后下缘凹陷中", locationDesc: "耳垂后方，乳突前方，张口凹陷处", category: "手足少阳经交会穴", functions: ["祛风通络", "聪耳开窍"], indications: ["耳鸣耳聋", "口眼㖞斜", "牙关紧闭", "颊肿", "瘰疬", "面颊疼痛"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "TE18", name: "瘈脉", pinyin: "chì mài", meridianId: "TE", meridianName: "手少阳三焦经", location: "头部，乳突中央，角孙与翳风沿耳轮连线的下1/3折点处", locationDesc: "耳后，乳突中央", category: "", functions: ["清热祛风", "聪耳定惊"], indications: ["头痛", "耳鸣耳聋", "小儿惊风", "呕吐", "目视不明", "癫痫"], method: "平刺0.3-0.5寸，或点刺出血", moxibustion: "可灸" },
  { id: "TE19", name: "颅息", pinyin: "lú xī", meridianId: "TE", meridianName: "手少阳三焦经", location: "头部，角孙与翳风沿耳轮连线的上1/3折点处", locationDesc: "耳后，瘈脉上方", category: "", functions: ["清热祛风", "聪耳定惊"], indications: ["头痛", "耳鸣耳聋", "小儿惊风", "呕吐", "中耳炎", "癫痫"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "TE20", name: "角孙", pinyin: "jiǎo sūn", meridianId: "TE", meridianName: "手少阳三焦经", location: "头部，折耳廓向前，耳尖直上入发际处", locationDesc: "耳尖直上，发际处", category: "手足少阳、手阳明经交会穴", functions: ["清热散风", "消肿止痛"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "牙痛", "痄腮", "项强", "目翳"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "TE21", name: "耳门", pinyin: "ěr mén", meridianId: "TE", meridianName: "手少阳三焦经", location: "面部，耳屏上切迹前方，下颌骨髁突后缘，张口呈凹陷处", locationDesc: "耳屏上切迹前方，张口凹陷处", category: "", functions: ["开窍聪耳", "清热止痛"], indications: ["耳鸣耳聋", "中耳炎", "外耳道炎", "牙痛", "头痛", "颈颔肿痛"], method: "张口直刺0.5-1寸", moxibustion: "可灸", caution: "留针时需张口" },
  { id: "TE22", name: "耳和髎", pinyin: "ěr hé liáo", meridianId: "TE", meridianName: "手少阳三焦经", location: "头部，鬓发后缘，平耳廓根的前方，颞浅动脉后缘", locationDesc: "耳门前上方，颞浅动脉后缘", category: "手足少阳、手太阳经交会穴", functions: ["祛风通络", "消肿止痛"], indications: ["头痛", "耳鸣", "牙关紧闭", "口眼㖞斜", "面瘫", "颈颔肿痛"], method: "斜刺0.3-0.5寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "TE23", name: "丝竹空", pinyin: "sī zhú kōng", meridianId: "TE", meridianName: "手少阳三焦经", location: "面部，眉梢外侧端凹陷中", locationDesc: "眉梢外侧端凹陷中", category: "手足少阳经交会穴", functions: ["清热散风", "明目止眩"], indications: ["头痛", "眩晕", "目赤肿痛", "眼睑瞤动", "齿痛", "面痛", "癫痫"], method: "平刺0.3-0.5寸", moxibustion: "不宜灸" },

  // ==================== 足少阳胆经 (44 points) ====================
  { id: "GB1", name: "瞳子髎", pinyin: "tóng zǐ liáo", meridianId: "GB", meridianName: "足少阳胆经", location: "面部，目外眦外侧0.5寸凹陷中", locationDesc: "目外眦旁，眶骨外侧凹陷中", category: "手足少阳、手太阳经交会穴", functions: ["祛风明目", "清热止痛"], indications: ["头痛", "目赤肿痛", "目翳", "流泪", "口眼㖞斜"], method: "平刺0.3-0.5寸", moxibustion: "不宜灸" },
  { id: "GB2", name: "听会", pinyin: "tīng huì", meridianId: "GB", meridianName: "足少阳胆经", location: "面部，耳屏间切迹前方，下颌骨髁突后缘，张口呈凹陷处", locationDesc: "耳屏间切迹前方，张口凹陷处", category: "", functions: ["聪耳开窍", "祛风通络"], indications: ["耳鸣耳聋", "中耳炎", "牙痛", "口眼㖞斜", "头痛", "面痛", "下颌关节痛"], method: "张口直刺0.5-1寸", moxibustion: "可灸", caution: "留针时需张口" },
  { id: "GB3", name: "上关", pinyin: "shàng guān", meridianId: "GB", meridianName: "足少阳胆经", location: "面部，颧弓上缘中央凹陷中，下关直上", locationDesc: "颧弓上缘，下关直上凹陷处", category: "手足少阳、足阳明经交会穴", functions: ["祛风通络", "聪耳止痛"], indications: ["耳鸣耳聋", "偏头痛", "口眼㖞斜", "牙痛", "面痛", "惊痫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GB4", name: "颔厌", pinyin: "hàn yàn", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，头维与曲鬓弧形连线的上1/4与下3/4交点处", locationDesc: "额角发际后上部，头维下方", category: "手足少阳、足阳明经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["偏头痛", "眩晕", "耳鸣耳聋", "目外眦痛", "牙痛", "癫痫", "惊痫"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB5", name: "悬颅", pinyin: "xuán lú", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，头维与曲鬓弧形连线的中点", locationDesc: "头维与曲鬓之间中点", category: "", functions: ["祛风通络", "清热止痛"], indications: ["偏头痛", "目赤肿痛", "牙痛", "面肿", "鼻衄", "耳鸣", "眩晕"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB6", name: "悬厘", pinyin: "xuán lí", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，头维与曲鬓弧形连线的下1/4与上3/4交点处", locationDesc: "悬颅与曲鬓之间", category: "手足少阳、足阳明经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["偏头痛", "目赤肿痛", "耳鸣耳聋", "牙痛", "面痛", "眩晕", "热病"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB7", name: "曲鬓", pinyin: "qū bìn", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，耳前鬓角发际后缘，平耳尖水平线", locationDesc: "耳前鬓发后缘，角孙前一横指", category: "足少阳、足太阳经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["偏头痛", "牙关紧闭", "牙痛", "目赤肿痛", "项强", "呕吐", "小儿惊风"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB8", name: "率谷", pinyin: "shuài gǔ", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，耳尖直上，入发际1.5寸", locationDesc: "耳尖直上，入发际1.5寸", category: "足少阳、足太阳经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["偏头痛", "眩晕", "呕吐", "小儿惊风", "目赤肿痛", "耳鸣"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB9", name: "天冲", pinyin: "tiān chōng", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，耳根后缘直上，入发际2寸，率谷后0.5寸", locationDesc: "率谷后0.5寸，耳根后上方", category: "足少阳、足太阳经交会穴", functions: ["祛风定惊", "清热止痛"], indications: ["头痛", "癫痫", "牙龈肿痛", "眩晕", "耳鸣", "瘿气", "惊恐"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB10", name: "浮白", pinyin: "fú bái", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，耳后乳突后上方，天冲与完骨弧形连线的上1/3折点处", locationDesc: "天冲与完骨之间，耳后上方", category: "足少阳、足太阳经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "耳鸣耳聋", "颈项强痛", "瘰疬", "瘿气", "目痛", "胸胁痛"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB11", name: "头窍阴", pinyin: "tóu qiào yīn", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，耳后乳突后上方，天冲与完骨弧形连线的下1/3折点处", locationDesc: "浮白与完骨之间", category: "足少阳、足太阳经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "耳鸣耳聋", "颈项强痛", "眩晕", "胸胁痛", "口苦", "瘰疬"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB12", name: "完骨", pinyin: "wán gǔ", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，耳后乳突后下方凹陷中", locationDesc: "乳突后下方凹陷处", category: "足少阳、足太阳经交会穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "颈项强痛", "口眼㖞斜", "牙痛", "失眠", "癫痫", "疟疾"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB13", name: "本神", pinyin: "běn shén", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，前发际上0.5寸，神庭旁开3寸，神庭与头维连线的内2/3与外1/3交点处", locationDesc: "神庭旁开3寸，前发际上0.5寸", category: "足少阳、阳维脉交会穴", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "癫痫", "小儿惊风", "失眠", "目眩", "颈项强痛"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB14", name: "阳白", pinyin: "yáng bái", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，瞳孔直上，眉上1寸", locationDesc: "眉上一寸，瞳孔直上", category: "足少阳、阳维脉交会穴", functions: ["祛风明目", "清热止痛"], indications: ["头痛", "目眩", "目赤肿痛", "眼睑瞤动", "流泪", "口眼㖞斜", "近视"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB15", name: "头临泣", pinyin: "tóu lín qì", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，瞳孔直上，入前发际0.5寸，神庭与头维连线的中点处", locationDesc: "瞳孔直上，入发际0.5寸", category: "足少阳、太阳、阳维脉交会穴", functions: ["祛风明目", "清热止痛"], indications: ["头痛", "目眩", "流泪", "鼻塞", "鼻渊", "目赤肿痛", "小儿惊风"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB16", name: "目窗", pinyin: "mù chuāng", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，头临泣后1寸，头正中线旁开2.25寸", locationDesc: "头临泣后1寸", category: "足少阳、阳维脉交会穴", functions: ["祛风明目", "清热止痛"], indications: ["头痛", "目赤肿痛", "目眩", "近视", "面肿", "鼻塞", "癫痫"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB17", name: "正营", pinyin: "zhèng yíng", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，目窗后1寸，头正中线旁开2.25寸", locationDesc: "目窗后1寸", category: "足少阳、阳维脉交会穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "眩晕", "牙痛", "项强", "目眩", "呕吐", "唇吻急强"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB18", name: "承灵", pinyin: "chéng líng", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，正营后1.5寸，头正中线旁开2.25寸", locationDesc: "正营后1.5寸", category: "足少阳、阳维脉交会穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "眩晕", "目痛", "鼻塞", "鼻衄", "鼻渊", "咳嗽"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB19", name: "脑空", pinyin: "nǎo kōng", meridianId: "GB", meridianName: "足少阳胆经", location: "头部，枕外隆凸上缘外侧，头正中线旁开2.25寸，平脑户", locationDesc: "风池直上1.5寸，枕骨外上缘", category: "足少阳、阳维脉交会穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "眩晕", "颈项强痛", "目赤肿痛", "耳鸣耳聋", "癫痫", "热病"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB20", name: "风池", pinyin: "fēng chí", meridianId: "GB", meridianName: "足少阳胆经", location: "颈后区，枕骨之下，胸锁乳突肌上端与斜方肌上端之间的凹陷中", locationDesc: "项后，枕骨下，斜方肌与胸锁乳突肌之间凹陷中", category: "手足少阳、阳维脉交会穴", functions: ["祛风解表", "清头明目", "醒脑开窍"], indications: ["头痛", "眩晕", "失眠", "中风", "癫痫", "耳鸣耳聋", "鼻塞", "鼻渊", "感冒", "发热"], method: "针尖微下，向鼻尖方向斜刺0.8-1.2寸", moxibustion: "可灸", caution: "深部为延髓，慎刺" },
  { id: "GB21", name: "肩井", pinyin: "jiān jǐng", meridianId: "GB", meridianName: "足少阳胆经", location: "肩部，大椎与肩峰端连线的中点", locationDesc: "大椎与肩峰连线的中点", category: "手足少阳、足阳明、阳维脉交会穴", functions: ["祛风清热", "通经活络"], indications: ["颈项强痛", "肩背疼痛", "上肢不遂", "难产", "乳痈", "乳汁不下", "瘰疬", "中风"], method: "直刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺，孕妇禁针" },
  { id: "GB22", name: "渊腋", pinyin: "yuān yè", meridianId: "GB", meridianName: "足少阳胆经", location: "胸外侧区，腋中线上，腋下3寸，第4肋间隙中", locationDesc: "腋下3寸，第四肋间隙，腋中线上", category: "", functions: ["理气宽胸", "止痛消肿"], indications: ["胸胁疼痛", "咳嗽", "气喘", "腋下肿痛", "上肢痹痛", "胸满", "胁痛"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "GB23", name: "辄筋", pinyin: "zhé jīn", meridianId: "GB", meridianName: "足少阳胆经", location: "胸外侧区，渊腋前1寸，平乳头，第4肋间隙中", locationDesc: "渊腋前1寸，第四肋间隙", category: "足少阳、足太阳经交会穴", functions: ["理气宽胸", "降逆止呕"], indications: ["胸胁疼痛", "气喘", "呕吐", "吞酸", "腋下肿痛", "胁痛", "咳嗽"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "GB24", name: "日月", pinyin: "rì yuè", meridianId: "GB", meridianName: "足少阳胆经", location: "上腹部，第7肋间隙，前正中线旁开4寸", locationDesc: "乳头直下，第七肋间隙", category: "胆募穴；足少阳、足太阴、阳维脉交会穴", functions: ["疏肝利胆", "理气止痛"], indications: ["胁痛", "黄疸", "呕吐", "吞酸", "呃逆", "腹胀", "胆囊炎"], method: "斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "GB25", name: "京门", pinyin: "jīng mén", meridianId: "GB", meridianName: "足少阳胆经", location: "侧腹部，第12肋游离端下方", locationDesc: "第十二肋游离端下方", category: "肾募穴", functions: ["补肾壮腰", "理气止痛"], indications: ["腰痛", "胁痛", "腹胀", "腹泻", "水肿", "小便不利", "呕吐"], method: "斜刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "GB26", name: "带脉", pinyin: "dài mài", meridianId: "GB", meridianName: "足少阳胆经", location: "侧腹部，第11肋游离端直下，与脐相平处", locationDesc: "章门直下，与脐相平", category: "足少阳、带脉交会穴", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "带下", "腹痛", "疝气", "腰胁疼痛", "子宫脱垂", "腹胀"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "GB27", name: "五枢", pinyin: "wǔ shū", meridianId: "GB", meridianName: "足少阳胆经", location: "侧腹部，髂前上棘前方，横平脐下3寸", locationDesc: "髂前上棘前方，带脉下3寸", category: "足少阳、带脉交会穴", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "带下", "腹痛", "疝气", "便秘", "腰胯疼痛", "子宫脱垂"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "GB28", name: "维道", pinyin: "wéi dào", meridianId: "GB", meridianName: "足少阳胆经", location: "侧腹部，五枢前下0.5寸", locationDesc: "五枢前下方0.5寸", category: "足少阳、带脉交会穴", functions: ["调经止带", "理气止痛"], indications: ["月经不调", "带下", "腹痛", "疝气", "腰胯疼痛", "子宫脱垂", "水肿"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "GB29", name: "居髎", pinyin: "jū liáo", meridianId: "GB", meridianName: "足少阳胆经", location: "臀区，髂前上棘与股骨大转子最凸点连线的中点", locationDesc: "髂前上棘与大转子连线中点", category: "足少阳、阳跷脉交会穴", functions: ["通经活络", "祛风除湿"], indications: ["腰腿疼痛", "下肢痿痹", "疝气", "坐骨神经痛", "髋关节疼痛", "下肢不遂"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "GB30", name: "环跳", pinyin: "huán tiào", meridianId: "GB", meridianName: "足少阳胆经", location: "臀区，股骨大转子最凸点与骶管裂孔连线上的外1/3与内2/3交点处", locationDesc: "股骨大转子最高点与骶管裂孔连线的外1/3与内2/3交界处", category: "足少阳、太阳经交会穴", functions: ["祛风除湿", "通经活络"], indications: ["腰腿疼痛", "下肢痿痹", "半身不遂", "坐骨神经痛", "风疹", "湿疹"], method: "直刺2-3寸", moxibustion: "可灸", caution: "深刺时需注意" },
  { id: "GB31", name: "风市", pinyin: "fēng shì", meridianId: "GB", meridianName: "足少阳胆经", location: "股部，大腿外侧中线，腘横纹上7寸，直立垂手时中指尖所指处", locationDesc: "大腿外侧，腘横纹上7寸，直立垂手中指尖处", category: "", functions: ["祛风除湿", "通经活络"], indications: ["腰腿疼痛", "下肢痿痹", "脚气", "全身瘙痒", "风疹", "半身不遂", "坐骨神经痛"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "GB32", name: "中渎", pinyin: "zhōng dú", meridianId: "GB", meridianName: "足少阳胆经", location: "股部，风市下2寸，大腿外侧中线", locationDesc: "风市下2寸", category: "", functions: ["祛风除湿", "通经活络"], indications: ["下肢痿痹", "腰腿疼痛", "坐骨神经痛", "脚气", "半身不遂", "膝关节疼痛"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "GB33", name: "膝阳关", pinyin: "xī yáng guān", meridianId: "GB", meridianName: "足少阳胆经", location: "膝外侧，股骨外上髁上方凹陷中", locationDesc: "阳陵泉上3寸，股骨外上髁上方", category: "", functions: ["通经活络", "祛风除湿"], indications: ["膝关节疼痛", "小腿麻木", "下肢痿痹", "脚气", "膝肿痛", "屈伸不利"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "GB34", name: "阳陵泉", pinyin: "yáng líng quán", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，腓骨头前下方凹陷中", locationDesc: "小腿外侧，腓骨小头前下方凹陷中", category: "合穴；胆下合穴；筋会", functions: ["疏肝利胆", "舒筋活络"], indications: ["黄疸", "胁痛", "呕吐", "腹胀", "下肢痿痹", "膝关节疼痛", "小儿惊风", "破伤风"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "GB35", name: "阳交", pinyin: "yáng jiāo", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，外踝尖上7寸，腓骨后缘", locationDesc: "外踝尖上7寸，腓骨后缘", category: "阳维脉郄穴", functions: ["祛风通络", "安神定志"], indications: ["胸胁疼痛", "下肢痿痹", "癫狂", "面肿", "喉痹", "膝痛", "小腿麻木"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GB36", name: "外丘", pinyin: "wài qiū", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，外踝尖上7寸，腓骨前缘", locationDesc: "阳交前方，腓骨前缘", category: "郄穴", functions: ["祛风通络", "理气止痛"], indications: ["胸胁疼痛", "下肢痿痹", "癫狂", "颈项强痛", "头痛", "狂犬伤"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GB37", name: "光明", pinyin: "guāng míng", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，外踝尖上5寸，腓骨前缘", locationDesc: "外踝尖上5寸，腓骨前缘", category: "络穴", functions: ["祛风明目", "通经活络"], indications: ["目痛", "夜盲", "目视不明", "近视", "乳房胀痛", "下肢痿痹", "膝痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GB38", name: "阳辅", pinyin: "yáng fǔ", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，外踝尖上4寸，腓骨前缘", locationDesc: "外踝尖上4寸，腓骨前缘", category: "经穴", functions: ["祛风清热", "通经活络"], indications: ["偏头痛", "目外眦痛", "咽喉肿痛", "胸胁疼痛", "下肢痿痹", "瘰疬", "疟疾"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GB39", name: "悬钟", pinyin: "xuán zhōng", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，外踝尖上3寸，腓骨前缘", locationDesc: "外踝尖上3寸，腓骨前缘", category: "髓会", functions: ["祛风通络", "强筋壮骨"], indications: ["项强", "胸胁疼痛", "下肢痿痹", "半身不遂", "颈项强痛", "脚气", "痔疮"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GB40", name: "丘墟", pinyin: "qiū xū", meridianId: "GB", meridianName: "足少阳胆经", location: "踝区，外踝前下方，趾长伸肌腱外侧凹陷中", locationDesc: "外踝前下方凹陷中", category: "原穴", functions: ["疏肝利胆", "通经活络"], indications: ["胸胁疼痛", "下肢痿痹", "外踝肿痛", "疟疾", "目赤肿痛", "目翳", "颈项痛"], method: "直刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GB41", name: "足临泣", pinyin: "zú lín qì", meridianId: "GB", meridianName: "足少阳胆经", location: "足背，第4、5跖骨底结合部前方，小趾伸肌腱外侧凹陷中", locationDesc: "足背第四、五跖骨结合部前凹陷中", category: "输穴；八脉交会穴（通带脉）", functions: ["疏肝利胆", "清热止痛"], indications: ["偏头痛", "目赤肿痛", "胁痛", "乳痈", "月经不调", "足跗肿痛", "瘰疬", "疟疾"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "GB42", name: "地五会", pinyin: "dì wǔ huì", meridianId: "GB", meridianName: "足少阳胆经", location: "足背，第4、5跖骨之间，小趾伸肌腱内侧缘", locationDesc: "足背第四、五跖骨间，足临泣前0.5寸", category: "", functions: ["疏肝利胆", "清热止痛"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "胁痛", "乳痈", "足跗肿痛", "内伤吐血"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "GB43", name: "侠溪", pinyin: "xiá xī", meridianId: "GB", meridianName: "足少阳胆经", location: "足背，第4、5趾间，趾蹼缘后方赤白肉际处", locationDesc: "足背第四、五趾间，趾蹼缘后方", category: "荥穴", functions: ["清热泻火", "通经活络"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "胁痛", "热病", "乳痈", "足跗肿痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "GB44", name: "足窍阴", pinyin: "zú qiào yīn", meridianId: "GB", meridianName: "足少阳胆经", location: "足趾，第4趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足第四趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["清热泻火", "通络开窍"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "胸胁疼痛", "热病"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },

  // ==================== 足厥阴肝经 (14 points) ====================
  { id: "LR1", name: "大敦", pinyin: "dà dūn", meridianId: "LR", meridianName: "足厥阴肝经", location: "足大趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足大趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["理气调肝", "镇惊开窍"], indications: ["疝气", "遗尿", "癃闭", "月经不调", "崩漏", "癫痫", "惊风"], method: "浅刺0.1-0.2寸，或点刺出血", moxibustion: "可灸" },
  { id: "LR2", name: "行间", pinyin: "xíng jiān", meridianId: "LR", meridianName: "足厥阴肝经", location: "足背，第1、2趾间，趾蹼缘后方赤白肉际处", locationDesc: "足背第一、二趾间，趾蹼缘后方", category: "荥穴", functions: ["清肝泻火", "理气止痛"], indications: ["头痛", "眩晕", "目赤肿痛", "胁痛", "月经不调", "痛经", "遗尿", "疝气", "失眠", "癫痫"], method: "直刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "LR3", name: "太冲", pinyin: "tài chōng", meridianId: "LR", meridianName: "足厥阴肝经", location: "足背，第1、2跖骨间，跖骨底结合部前方凹陷中", locationDesc: "足背，第一、二跖骨结合部之前凹陷中", category: "输穴；原穴", functions: ["疏肝理气", "平肝潜阳"], indications: ["头痛", "眩晕", "目赤肿痛", "耳鸣耳聋", "胁痛", "腹胀", "呕吐", "黄疸", "月经不调", "痛经", "疝气", "癫痫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LR4", name: "中封", pinyin: "zhōng fēng", meridianId: "LR", meridianName: "足厥阴肝经", location: "踝区，内踝前，胫骨前肌腱与𧿹长伸肌腱之间凹陷中", locationDesc: "内踝前1寸，胫骨前肌腱内侧凹陷中", category: "经穴", functions: ["疏肝理气", "清热利湿"], indications: ["疝气", "遗精", "小便不利", "腹痛", "腰痛", "足踝疼痛", "黄疸"], method: "直刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "LR5", name: "蠡沟", pinyin: "lí gōu", meridianId: "LR", meridianName: "足厥阴肝经", location: "小腿内侧，内踝尖上5寸，胫骨内侧缘中央", locationDesc: "内踝尖上5寸，胫骨内侧面中央", category: "络穴", functions: ["疏肝理气", "调经止带"], indications: ["月经不调", "带下", "小便不利", "疝气", "睾丸肿痛", "小腿酸痛", "阴痒"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "LR6", name: "中都", pinyin: "zhōng dū", meridianId: "LR", meridianName: "足厥阴肝经", location: "小腿内侧，内踝尖上7寸，胫骨内侧缘中央", locationDesc: "内踝尖上7寸，蠡沟上2寸", category: "郄穴", functions: ["疏肝理气", "调经止痛"], indications: ["月经不调", "崩漏", "疝气", "腹痛", "胁痛", "下肢痿痹", "恶露不尽"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "LR7", name: "膝关", pinyin: "xī guān", meridianId: "LR", meridianName: "足厥阴肝经", location: "小腿内侧，阴陵泉后1寸，胫骨内侧髁后下方", locationDesc: "阴陵泉后1寸，腓肠肌内侧头上部", category: "", functions: ["祛风除湿", "通经活络"], indications: ["膝关节疼痛", "下肢痿痹", "咽喉肿痛", "痛风", "膝肿痛", "屈伸不利"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "LR8", name: "曲泉", pinyin: "qū quán", meridianId: "LR", meridianName: "足厥阴肝经", location: "膝内侧区，膝关节内侧面横纹内侧端，胫骨内侧髁后缘，半腱肌、半膜肌上端凹陷中", locationDesc: "屈膝，膝内侧横纹头上方凹陷中", category: "合穴", functions: ["疏肝理气", "清热利湿"], indications: ["小便不利", "腹痛", "腹泻", "月经不调", "痛经", "带下", "遗精", "阳痿", "膝关节疼痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "LR9", name: "阴包", pinyin: "yīn bāo", meridianId: "LR", meridianName: "足厥阴肝经", location: "股前内侧，髌底上4寸，股内肌与缝匠肌之间", locationDesc: "大腿内侧，膝盖上4寸，股内肌与缝匠肌之间", category: "", functions: ["疏肝理气", "调经止痛"], indications: ["月经不调", "遗尿", "小便不利", "腰骶疼痛", "腹痛", "下肢痿痹", "疝气"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "LR10", name: "足五里", pinyin: "zú wǔ lǐ", meridianId: "LR", meridianName: "足厥阴肝经", location: "股前内侧，气冲直下3寸，大腿根部，耻骨结节下方，长收肌外缘", locationDesc: "气冲下3寸，大腿内侧根部", category: "", functions: ["清热利湿", "疏肝理气"], indications: ["小便不利", "遗尿", "小腹胀痛", "阴囊湿疹", "睾丸肿痛", "带下", "阴痒"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "LR11", name: "阴廉", pinyin: "yīn lián", meridianId: "LR", meridianName: "足厥阴肝经", location: "股前内侧，气冲直下2寸，大腿根部，耻骨结节下方，长收肌外缘", locationDesc: "气冲下2寸，大腿内侧根部", category: "", functions: ["调经止带", "清热利湿"], indications: ["月经不调", "带下", "小腹胀痛", "不孕", "阴痒", "下肢痿痹", "疝气"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "LR12", name: "急脉", pinyin: "jí mài", meridianId: "LR", meridianName: "足厥阴肝经", location: "腹股沟区，耻骨联合下缘，前正中线旁开2.5寸，腹股沟动脉搏动处外侧", locationDesc: "耻骨联合下缘，旁开2.5寸，气冲外下方", category: "", functions: ["疏肝理气", "调理下焦"], indications: ["疝气", "睾丸肿痛", "子宫脱垂", "小腹痛", "阴挺", "下肢痿痹", "阴茎痛"], method: "直刺0.5-0.8寸", moxibustion: "可灸", caution: "避开动脉" },
  { id: "LR13", name: "章门", pinyin: "zhāng mén", meridianId: "LR", meridianName: "足厥阴肝经", location: "侧腹部，第11肋游离端下方", locationDesc: "侧腹部，第十一肋游离端下方", category: "脾募穴；脏会", functions: ["疏肝理气", "健脾和胃"], indications: ["胸胁疼痛", "腹胀", "腹泻", "呕吐", "黄疸", "痞块", "癥瘕"], method: "斜刺0.5-0.8寸", moxibustion: "可灸", caution: "右侧章门下方为肝脏，不可深刺" },
  { id: "LR14", name: "期门", pinyin: "qī mén", meridianId: "LR", meridianName: "足厥阴肝经", location: "胸部，第6肋间隙，前正中线旁开4寸", locationDesc: "胸部，乳头直下，第6肋间隙", category: "肝募穴；足太阴、足厥阴、阴维脉交会穴", functions: ["疏肝理气", "泻热宽胸"], indications: ["胸胁胀痛", "腹胀", "呕吐", "呃逆", "乳痈", "发热"], method: "斜刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺，避免伤及内脏" },

  // ==================== 督脉 (28 points) ====================
  { id: "GV1", name: "长强", pinyin: "cháng qiáng", meridianId: "GV", meridianName: "督脉", location: "会阴区，尾骨下方，尾骨端与肛门连线的中点", locationDesc: "尾骨尖下方，肛门与尾骨之间", category: "络穴", functions: ["通调督脉", "固脱止泻"], indications: ["腹泻", "痢疾", "便秘", "脱肛", "痔疮", "癫狂", "痫证", "腰背疼痛"], method: "斜刺，针尖向上与骶骨平行刺入0.8-1寸", moxibustion: "可灸", caution: "不宜直刺" },
  { id: "GV2", name: "腰俞", pinyin: "yāo shū", meridianId: "GV", meridianName: "督脉", location: "骶部，后正中线上，骶管裂孔中", locationDesc: "第四骶椎下，骶管裂孔中", category: "", functions: ["调经止带", "清热利湿"], indications: ["月经不调", "腰脊强痛", "痔疮", "下肢痿痹", "癫痫", "腹泻", "便秘"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV3", name: "腰阳关", pinyin: "yāo yáng guān", meridianId: "GV", meridianName: "督脉", location: "腰部，后正中线上，第4腰椎棘突下凹陷中", locationDesc: "第四腰椎棘突下凹陷中", category: "", functions: ["补肾壮腰", "祛寒除湿"], indications: ["腰骶疼痛", "下肢痿痹", "月经不调", "遗精", "阳痿", "带下", "腹泻"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV4", name: "命门", pinyin: "mìng mén", meridianId: "GV", meridianName: "督脉", location: "腰部，后正中线上，第2腰椎棘突下凹陷中", locationDesc: "第二腰椎棘突下凹陷中", category: "", functions: ["温肾壮阳", "强腰固本"], indications: ["腰脊疼痛", "下肢痿痹", "遗精", "阳痿", "月经不调", "痛经", "带下", "遗尿", "尿频", "泄泻", "耳鸣耳聋"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV5", name: "悬枢", pinyin: "xuán shū", meridianId: "GV", meridianName: "督脉", location: "腰部，后正中线上，第1腰椎棘突下凹陷中", locationDesc: "第一腰椎棘突下凹陷中", category: "", functions: ["补肾壮腰", "理气止痛"], indications: ["腰脊强痛", "腹胀", "腹痛", "腹泻", "消化不良", "痢疾", "脱肛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV6", name: "脊中", pinyin: "jǐ zhōng", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第11胸椎棘突下凹陷中", locationDesc: "第十一胸椎棘突下凹陷中", category: "", functions: ["健脾利湿", "理气止痛"], indications: ["腹泻", "黄疸", "痔疮", "癫痫", "小儿疳积", "脱肛", "腰脊强痛"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV7", name: "中枢", pinyin: "zhōng shū", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第10胸椎棘突下凹陷中", locationDesc: "第十胸椎棘突下凹陷中", category: "", functions: ["健脾利湿", "理气止痛"], indications: ["黄疸", "呕吐", "腹痛", "胃痛", "食欲不振", "腰脊疼痛", "目黄"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV8", name: "筋缩", pinyin: "jīn suō", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第9胸椎棘突下凹陷中", locationDesc: "第九胸椎棘突下凹陷中", category: "", functions: ["舒筋活络", "安神定志"], indications: ["癫痫", "抽搐", "脊背强痛", "胃痛", "黄疸", "小儿惊风", "目眩"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV9", name: "至阳", pinyin: "zhì yáng", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第7胸椎棘突下凹陷中", locationDesc: "第七胸椎棘突下凹陷中", category: "", functions: ["宽胸理气", "清热利湿"], indications: ["黄疸", "胸胁胀痛", "咳嗽", "气喘", "胃痛", "脊背强痛", "心绞痛"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV10", name: "灵台", pinyin: "líng tái", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第6胸椎棘突下凹陷中", locationDesc: "第六胸椎棘突下凹陷中", category: "", functions: ["清热止咳", "理气宽胸"], indications: ["咳嗽", "气喘", "脊背强痛", "疔疮", "胃痛", "项强", "疟疾"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV11", name: "神道", pinyin: "shén dào", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第5胸椎棘突下凹陷中", locationDesc: "第五胸椎棘突下凹陷中", category: "", functions: ["宁心安神", "理气宽胸"], indications: ["心悸", "失眠", "健忘", "咳嗽", "气喘", "脊背强痛", "癫痫", "小儿惊风"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV12", name: "身柱", pinyin: "shēn zhù", meridianId: "GV", meridianName: "督脉", location: "背部，后正中线上，第3胸椎棘突下凹陷中", locationDesc: "第三胸椎棘突下凹陷中", category: "", functions: ["清热止咳", "安神定志"], indications: ["咳嗽", "气喘", "发热", "癫痫", "小儿惊风", "腰脊强痛", "疔疮"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV13", name: "陶道", pinyin: "táo dào", meridianId: "GV", meridianName: "督脉", location: "项后区，后正中线上，第1胸椎棘突下凹陷中", locationDesc: "第一胸椎棘突下凹陷中", category: "督脉、足太阳经交会穴", functions: ["清热解表", "安神定志"], indications: ["热病", "疟疾", "头痛", "咳嗽", "气喘", "癫痫", "脊背强痛", "骨蒸潮热"], method: "向上斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV14", name: "大椎", pinyin: "dà zhuī", meridianId: "GV", meridianName: "督脉", location: "项后区，第7颈椎棘突下凹陷中，后正中线上", locationDesc: "第七颈椎棘突下凹陷中", category: "手足三阳、督脉交会穴", functions: ["清热解表", "祛风止痫"], indications: ["热病", "感冒", "发热", "咳嗽", "气喘", "头项强痛", "癫痫", "风疹", "中暑"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV15", name: "哑门", pinyin: "yǎ mén", meridianId: "GV", meridianName: "督脉", location: "项后区，后发际正中直上0.5寸，第1颈椎下", locationDesc: "后发际正中直上0.5寸凹陷中", category: "督脉、阳维脉交会穴", functions: ["开窍醒神", "利咽开音"], indications: ["舌强不语", "暴喑", "癫狂", "痫证", "头痛", "项强", "中风", "鼻衄"], method: "向下颌方向缓慢刺入0.5-1寸", moxibustion: "可灸", caution: "不可向上深刺，以免伤及延髓" },
  { id: "GV16", name: "风府", pinyin: "fēng fǔ", meridianId: "GV", meridianName: "督脉", location: "项后区，后发际正中直上1寸，枕外隆凸直下，两侧斜方肌之间凹陷中", locationDesc: "后发际正中直上1寸凹陷中", category: "督脉、阳维脉交会穴", functions: ["祛风清热", "醒脑开窍"], indications: ["头痛", "眩晕", "中风不语", "癫狂", "痫证", "咽喉肿痛", "目痛", "鼻衄"], method: "向下颌方向缓慢刺入0.5-1寸", moxibustion: "可灸", caution: "不可向上深刺，以免伤及延髓" },
  { id: "GV17", name: "脑户", pinyin: "nǎo hù", meridianId: "GV", meridianName: "督脉", location: "头部，后发际正中直上2.5寸，枕外隆凸上缘凹陷中", locationDesc: "风府直上1.5寸，枕外隆凸上缘", category: "督脉、足太阳经交会穴", functions: ["祛风清热", "醒脑开窍"], indications: ["头痛", "眩晕", "癫痫", "目痛", "项强", "失音", "目黄"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV18", name: "强间", pinyin: "qiáng jiān", meridianId: "GV", meridianName: "督脉", location: "头部，后发际正中直上4寸", locationDesc: "脑户直上1.5寸", category: "", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "癫痫", "失眠", "项强", "呕吐", "目眩"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV19", name: "后顶", pinyin: "hòu dǐng", meridianId: "GV", meridianName: "督脉", location: "头部，后发际正中直上5.5寸", locationDesc: "强间直上1.5寸", category: "", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "失眠", "癫痫", "项强", "目眩", "癫狂"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV20", name: "百会", pinyin: "bǎi huì", meridianId: "GV", meridianName: "督脉", location: "头部，前发际正中直上5寸，或两耳尖连线的中点", locationDesc: "头顶正中，两耳尖连线的中点", category: "手足三阳、督脉交会穴", functions: ["升阳举陷", "醒脑开窍"], indications: ["头痛", "眩晕", "失眠", "健忘", "癫狂", "痫证", "中风", "脱肛", "阴挺", "胃下垂"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV21", name: "前顶", pinyin: "qián dǐng", meridianId: "GV", meridianName: "督脉", location: "头部，前发际正中直上3.5寸，百会前1.5寸", locationDesc: "百会前1.5寸", category: "", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "癫痫", "鼻渊", "小儿惊风", "目眩", "项强"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV22", name: "顖会", pinyin: "xìn huì", meridianId: "GV", meridianName: "督脉", location: "头部，前发际正中直上2寸", locationDesc: "前发际正中上2寸", category: "", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "鼻塞", "鼻渊", "癫痫", "小儿惊风", "失眠"], method: "平刺0.5-0.8寸", moxibustion: "可灸", caution: "小儿囟门未闭者禁针" },
  { id: "GV23", name: "上星", pinyin: "shàng xīng", meridianId: "GV", meridianName: "督脉", location: "头部，前发际正中直上1寸", locationDesc: "前发际正中上1寸", category: "", functions: ["清热通窍", "安神定志"], indications: ["头痛", "眩晕", "鼻塞", "鼻渊", "鼻衄", "目赤肿痛", "癫痫", "热病"], method: "平刺0.5-0.8寸", moxibustion: "可灸", caution: "小儿囟门未闭者禁针" },
  { id: "GV24", name: "神庭", pinyin: "shén tíng", meridianId: "GV", meridianName: "督脉", location: "头部，前发际正中直上0.5寸", locationDesc: "前发际正中上0.5寸", category: "督脉、足太阳、足阳明经交会穴", functions: ["祛风通络", "安神定志"], indications: ["头痛", "眩晕", "失眠", "癫痫", "鼻塞", "鼻渊", "流泪", "目赤肿痛"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV25", name: "素髎", pinyin: "sù liáo", meridianId: "GV", meridianName: "督脉", location: "面部，鼻尖正中央", locationDesc: "鼻尖正中", category: "", functions: ["清热开窍", "通利鼻窍"], indications: ["鼻塞", "鼻渊", "鼻衄", "酒渣鼻", "昏厥", "新生儿窒息", "惊风"], method: "向上斜刺0.3-0.5寸，或点刺出血", moxibustion: "不宜灸" },
  { id: "GV26", name: "水沟", pinyin: "shuǐ gōu", meridianId: "GV", meridianName: "督脉", location: "面部，人中沟的上1/3与中1/3交点处", locationDesc: "鼻下，人中沟上1/3处", category: "手足阳明、督脉交会穴", functions: ["开窍醒神", "通调督脉"], indications: ["昏迷", "晕厥", "中风", "中暑", "癔病", "抽搐", "牙关紧闭", "口歪", "急性腰痛"], method: "向上斜刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "GV27", name: "兑端", pinyin: "duì duān", meridianId: "GV", meridianName: "督脉", location: "面部，上唇结节尖端，人中沟下端红唇与皮肤交界处", locationDesc: "上唇尖端，人中沟下端", category: "", functions: ["清热开窍", "消肿止痛"], indications: ["口歪", "齿龈肿痛", "鼻塞", "鼻衄", "癫痫", "昏厥", "消渴"], method: "向上斜刺0.3-0.5寸", moxibustion: "不宜灸" },
  { id: "GV28", name: "龈交", pinyin: "yín jiāo", meridianId: "GV", meridianName: "督脉", location: "口腔内，上唇系带与上牙龈交界处", locationDesc: "上唇系带与牙龈交界处", category: "督脉、任脉、足阳明经交会穴", functions: ["清热消肿", "开窍醒神"], indications: ["齿龈肿痛", "鼻渊", "鼻塞", "口歪", "癫痫", "腰痛", "痔疮"], method: "向上斜刺0.2-0.3寸，或点刺出血", moxibustion: "不宜灸" },

  // ==================== 任脉 (24 points) ====================
  { id: "CV1", name: "会阴", pinyin: "huì yīn", meridianId: "CV", meridianName: "任脉", location: "会阴部，男性在阴囊根部与肛门连线的中点，女性在大阴唇后联合与肛门连线的中点", locationDesc: "会阴部正中，肛门与生殖器之间", category: "任脉、督脉、冲脉交会穴", functions: ["调经固脱", "清热利湿"], indications: ["遗尿", "遗精", "月经不调", "子宫脱垂", "痔疮", "脱肛", "小便不利", "溺水窒息"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "孕妇慎用" },
  { id: "CV2", name: "曲骨", pinyin: "qū gǔ", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，耻骨联合上缘凹陷中", locationDesc: "耻骨联合上缘正中凹陷中", category: "任脉、足厥阴经交会穴", functions: ["补肾调经", "清热利湿"], indications: ["遗尿", "尿频", "遗精", "阳痿", "月经不调", "痛经", "带下", "小便不利"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "孕妇慎刺，针前排尿" },
  { id: "CV3", name: "中极", pinyin: "zhōng jí", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下4寸", locationDesc: "脐下4寸，耻骨联合上缘上方", category: "膀胱募穴", functions: ["补肾调经", "清热利湿"], indications: ["遗尿", "尿频", "尿急", "遗精", "阳痿", "月经不调", "痛经", "带下", "崩漏", "阴挺", "不孕"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "CV4", name: "关元", pinyin: "guān yuán", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下3寸", locationDesc: "脐下3寸", category: "小肠募穴", functions: ["培元固本", "温肾壮阳"], indications: ["遗尿", "尿频", "遗精", "阳痿", "月经不调", "痛经", "崩漏", "带下", "阴挺", "不孕", "虚劳羸瘦", "腹泻", "便秘"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "CV5", name: "石门", pinyin: "shí mén", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下2寸", locationDesc: "脐下2寸", category: "三焦募穴", functions: ["补肾调经", "理气止痛"], indications: ["腹痛", "腹胀", "腹泻", "水肿", "小便不利", "月经不调", "崩漏", "带下", "产后恶露不尽"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "CV6", name: "气海", pinyin: "qì hǎi", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下1.5寸", locationDesc: "脐下1.5寸", category: "肓之原", functions: ["补肾益气", "调理气机"], indications: ["腹痛", "腹泻", "便秘", "遗尿", "遗精", "阳痿", "月经不调", "痛经", "带下", "虚脱", "形体羸瘦"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV7", name: "阴交", pinyin: "yīn jiāo", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下1寸", locationDesc: "脐下1寸", category: "任脉、冲脉、足少阴经交会穴", functions: ["调经止带", "理气止痛"], indications: ["腹痛", "腹胀", "月经不调", "带下", "疝气", "水肿", "产后恶露不尽", "阴痒"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "CV8", name: "神阙", pinyin: "shén què", meridianId: "CV", meridianName: "任脉", location: "腹部，脐中央", locationDesc: "脐中央", category: "", functions: ["回阳固脱", "健脾和胃"], indications: ["腹痛", "腹泻", "脱肛", "水肿", "虚脱", "中风脱证", "四肢厥冷", "肠鸣"], method: "禁针，宜艾灸", moxibustion: "可灸（隔盐灸、隔姜灸）", caution: "禁针" },
  { id: "CV9", name: "水分", pinyin: "shuǐ fēn", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上1寸", locationDesc: "脐上1寸", category: "", functions: ["健脾利水", "理气止痛"], indications: ["腹痛", "腹胀", "腹泻", "水肿", "小便不利", "反胃", "呕吐", "肠鸣"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV10", name: "下脘", pinyin: "xià wǎn", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上2寸", locationDesc: "脐上2寸", category: "任脉、足太阴经交会穴", functions: ["健脾和胃", "消食导滞"], indications: ["腹痛", "腹胀", "呕吐", "食谷不化", "腹泻", "胃痛", "食欲不振", "痞块"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV11", name: "建里", pinyin: "jiàn lǐ", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上3寸", locationDesc: "脐上3寸", category: "", functions: ["健脾和胃", "消食导滞"], indications: ["胃痛", "呕吐", "腹胀", "食欲不振", "水肿", "肠鸣", "腹泻", "消化不良"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV12", name: "中脘", pinyin: "zhōng wǎn", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上4寸", locationDesc: "脐上4寸", category: "胃募穴；腑会", functions: ["和胃健脾", "降逆利水"], indications: ["胃痛", "腹胀", "呕吐", "呃逆", "吞酸", "纳呆", "食不化", "疳积", "便秘", "泄泻", "失眠"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV13", name: "上脘", pinyin: "shàng wǎn", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上5寸", locationDesc: "脐上5寸", category: "任脉、手太阳、足阳明经交会穴", functions: ["和胃降逆", "理气止痛"], indications: ["胃痛", "呕吐", "腹胀", "呃逆", "食欲不振", "癫痫", "黄疸", "腹痛"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "CV14", name: "巨阙", pinyin: "jù què", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上6寸", locationDesc: "脐上6寸", category: "心募穴", functions: ["宁心安神", "理气止痛"], indications: ["胸痛", "心痛", "心悸", "呕吐", "吞酸", "癫狂", "痫证", "腹胀", "黄疸"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺" },
  { id: "CV15", name: "鸠尾", pinyin: "jiū wěi", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，剑突下凹陷中，脐上7寸", locationDesc: "剑突下，脐上7寸", category: "络穴", functions: ["宽胸理气", "安神定志"], indications: ["胸痛", "心痛", "心悸", "咳嗽", "气喘", "癫狂", "痫证", "呕吐", "胃痛"], method: "向下斜刺0.5-1寸", moxibustion: "可灸", caution: "不可深刺，以免伤及肝脏" },
  { id: "CV16", name: "中庭", pinyin: "zhōng tíng", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，平第5肋间隙，胸剑结合处", locationDesc: "胸剑联合处，膻中下1.6寸", category: "", functions: ["理气宽胸", "降逆止呕"], indications: ["胸胁胀痛", "心痛", "呕吐", "小儿吐乳", "噎膈", "梅核气", "咳嗽"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV17", name: "膻中", pinyin: "dàn zhōng", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，横平第4肋间隙，约在两乳头连线的中点", locationDesc: "两乳头连线的中点", category: "心包募穴；气会；足太阴、足少阴、手太阳、手少阳、任脉交会穴", functions: ["理气宽胸", "止咳平喘"], indications: ["胸闷", "气短", "胸痛", "心悸", "咳嗽", "气喘", "呃逆", "乳少", "乳痈"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV18", name: "玉堂", pinyin: "yù táng", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，平第3肋间隙", locationDesc: "膻中上1.6寸，平第三肋间隙", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["胸痛", "咳嗽", "气喘", "胸闷", "呕吐", "咽喉肿痛", "胸胁胀满"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV19", name: "紫宫", pinyin: "zǐ gōng", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，平第2肋间隙", locationDesc: "玉堂上1.6寸，平第二肋间隙", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["胸痛", "咳嗽", "气喘", "胸闷", "呕吐", "咽喉肿痛", "胸胁胀满"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV20", name: "华盖", pinyin: "huá gài", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，平第1肋间隙", locationDesc: "紫宫上1.6寸，平第一肋间隙", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["胸痛", "咳嗽", "气喘", "咽喉肿痛", "胸闷", "胁痛", "胸胁胀满"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV21", name: "璇玑", pinyin: "xuán jī", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，胸骨上窝下1寸，天突下1寸", locationDesc: "天突下1寸，胸骨柄中央", category: "", functions: ["理气宽胸", "止咳平喘"], indications: ["胸痛", "咳嗽", "气喘", "咽喉肿痛", "胸闷", "胃中积滞", "胸胁胀满"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV22", name: "天突", pinyin: "tiān tū", meridianId: "CV", meridianName: "任脉", location: "颈部，前正中线上，胸骨上窝中央", locationDesc: "胸骨上窝中央", category: "足太阴、任脉交会穴", functions: ["理气化痰", "利咽开音"], indications: ["咳嗽", "气喘", "咽喉肿痛", "梅核气", "噎膈", "吞咽困难"], method: "先直刺0.2寸，然后将针尖转向下方，紧靠胸骨后方刺入1-1.5寸", moxibustion: "可灸", caution: "不宜深刺，避免伤及气管" },
  { id: "CV23", name: "廉泉", pinyin: "lián quán", meridianId: "CV", meridianName: "任脉", location: "颈部，前正中线上，喉结上方，舌骨上缘凹陷中", locationDesc: "喉结上方，舌骨上缘凹陷中", category: "任脉、阴维脉交会穴", functions: ["清热利咽", "开音通窍"], indications: ["舌强不语", "舌下肿痛", "吞咽困难", "暴喑", "咽喉肿痛", "口干", "流涎", "中风失语"], method: "向舌根方向斜刺0.5-1寸", moxibustion: "可灸" },
  { id: "CV24", name: "承浆", pinyin: "chéng jiāng", meridianId: "CV", meridianName: "任脉", location: "面部，颏唇沟的正中凹陷处", locationDesc: "颏唇沟正中凹陷处", category: "手足阳明、督脉、任脉交会穴", functions: ["祛风通络", "生津敛液"], indications: ["口歪", "齿龈肿痛", "流涎", "暴喑", "面瘫", "癫痫"], method: "斜刺0.3-0.5寸", moxibustion: "可灸" }
]
