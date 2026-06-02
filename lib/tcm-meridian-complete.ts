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
  // 手太阴肺经
  { id: "LU1", name: "中府", pinyin: "zhōng fǔ", meridianId: "LU", meridianName: "手太阴肺经", location: "胸部，锁骨下窝外侧，云门下1寸，平第1肋间隙", locationDesc: "锁骨外侧端下方，云门下1寸", category: "募穴", functions: ["止咳平喘", "清肺泄热", "宣肺理气"], indications: ["咳嗽", "气喘", "胸满", "肩背痛", "肺胀满"], method: "向外斜刺或平刺0.5-0.8寸", moxibustion: "可灸", caution: "不可向内深刺" },
  { id: "LU5", name: "尺泽", pinyin: "chǐ zé", meridianId: "LU", meridianName: "手太阴肺经", location: "肘横纹中，肱二头肌腱桡侧凹陷处", locationDesc: "肘窝横纹上，肱二头肌腱外侧", category: "合穴", functions: ["清热化痰", "降逆止咳", "宣肺利气"], indications: ["咳嗽", "气喘", "咯血", "咽喉肿痛", "肘臂挛痛"], method: "直刺0.8-1.2寸，或点刺出血", moxibustion: "可灸", caution: "不宜疤痕灸" },
  { id: "LU7", name: "列缺", pinyin: "liè quē", meridianId: "LU", meridianName: "手太阴肺经", location: "前臂，腕掌侧远端横纹上1.5寸，拇短伸肌腱与拇长展肌腱之间", locationDesc: "腕横纹上1.5寸，桡骨茎突上方", category: "络穴；八脉交会穴（通任脉）", functions: ["宣肺解表", "祛风通络", "利咽止痛"], indications: ["咳嗽", "气喘", "咽喉肿痛", "偏正头痛", "齿痛", "项强", "手腕疼痛"], method: "向上斜刺0.5-0.8寸", moxibustion: "可灸", caution: "孕妇禁针" },
  { id: "LU9", name: "太渊", pinyin: "tài yuān", meridianId: "LU", meridianName: "手太阴肺经", location: "腕掌侧横纹桡侧，桡骨茎突与舟状骨之间，拇长展肌腱凹陷中", locationDesc: "腕横纹桡侧端", category: "输穴；原穴；脉会", functions: ["宣肺止咳", "益气通脉", "理血止痛"], indications: ["咳嗽", "气喘", "咯血", "胸闷", "手腕疼痛", "无脉症"], method: "直刺0.2-0.3寸", moxibustion: "可灸", caution: "避开桡动脉" },
  { id: "LU11", name: "少商", pinyin: "shào shāng", meridianId: "LU", meridianName: "手太阴肺经", location: "手指拇指末节桡侧，指甲根角侧上方0.1寸", locationDesc: "拇指桡侧指甲角旁开0.1寸", category: "井穴", functions: ["清肺利咽", "泻热开窍"], indications: ["咽喉肿痛", "鼻衄", "高热", "昏迷", "癫狂", "指腕挛急"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸", caution: "孕妇慎刺" },
  // 手阳明大肠经
  { id: "LI1", name: "商阳", pinyin: "shāng yáng", meridianId: "LI", meridianName: "手阳明大肠经", location: "手指食指末节桡侧，指甲根角侧上方0.1寸", locationDesc: "食指桡侧指甲角旁开0.1寸", category: "井穴", functions: ["清热泻火", "消肿开窍"], indications: ["齿痛", "咽喉肿痛", "手指麻木", "热病昏迷", "耳鸣耳聋"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "LI4", name: "合谷", pinyin: "hé gǔ", meridianId: "LI", meridianName: "手阳明大肠经", location: "手背，第1、2掌骨间，第2掌骨桡侧中点处", locationDesc: "手背，第一、二掌骨之间，约平第二掌骨中点处", category: "原穴", functions: ["疏风解表", "通经活络", "清热泻火", "镇静止痛"], indications: ["头痛", "目赤肿痛", "鼻衄", "齿痛", "牙关紧闭", "口眼㖞斜", "耳聋", "痄腮", "咽喉肿痛", "热病无汗", "腹痛", "便秘", "经闭", "滞产"], method: "直刺0.5-1寸", moxibustion: "可灸", caution: "孕妇禁针" },
  { id: "LI11", name: "曲池", pinyin: "qū chí", meridianId: "LI", meridianName: "手阳明大肠经", location: "肘横纹外侧端，屈肘，肱骨外上髁与肘横纹尽头连线中点", locationDesc: "肘横纹外侧端，肱骨外上髁内下方", category: "合穴", functions: ["清热解表", "祛风除湿", "调和气血"], indications: ["热病", "咽喉肿痛", "手臂肿痛", "上肢不遂", "高血压", "癫狂", "腹痛吐泻", "月经不调"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "深刺需注意避开神经" },
  { id: "LI20", name: "迎香", pinyin: "yíng xiāng", meridianId: "LI", meridianName: "手阳明大肠经", location: "面部，鼻翼外缘中点旁，鼻唇沟中", locationDesc: "鼻翼旁开0.5寸，鼻唇沟中", category: "手、足阳明经交会穴", functions: ["祛风通窍", "理气止痛"], indications: ["鼻塞", "鼻衄", "鼻渊", "鼻息肉", "面痒", "面肿", "口㖞", "胆道蛔虫症"], method: "平刺或斜刺0.3-0.5寸", moxibustion: "不宜灸", caution: "不宜艾灸" },
  // 足阳明胃经
  { id: "ST1", name: "承泣", pinyin: "chéng qì", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，眼球与眶下缘之间，瞳孔直下", locationDesc: "目正视，瞳孔直下，眼球与眶下缘之间", category: "足阳明、阳跷、任脉交会穴", functions: ["散风清热", "明目止泪"], indications: ["目赤肿痛", "流泪", "夜盲", "口眼㖞斜", "眼睑瞤动"], method: "轻推眼球向上，沿眶下缘缓慢直刺0.3-0.5寸", moxibustion: "不宜灸", caution: "不宜大幅度捻转" },
  { id: "ST4", name: "地仓", pinyin: "dì cāng", meridianId: "ST", meridianName: "足阳明胃经", location: "面部，口角旁开0.4寸，上直瞳孔", locationDesc: "口角旁开0.4寸处", category: "手足阳明、阳跷脉交会穴", functions: ["散风通络", "祛风止痛"], indications: ["口角㖞斜", "流涎", "牙痛", "颊肿", "眼睑瞤动"], method: "平刺或斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "ST6", name: "颊车", pinyin: "jiá chē", meridianId: "ST", meridianName: "足阳明胃经", location: "面颊部，下颌角前上方约一横指，咀嚼时咬肌隆起处", locationDesc: "下颌角前上方一横指，咬肌隆起处", category: "", functions: ["散风通络", "祛风止痛"], indications: ["口角㖞斜", "牙痛", "颊肿", "牙关紧闭", "面颊肿胀"], method: "直刺0.3-0.5寸，或平刺0.5-1寸", moxibustion: "可灸" },
  { id: "ST25", name: "天枢", pinyin: "tiān shū", meridianId: "ST", meridianName: "足阳明胃经", location: "腹部，脐中旁开2寸", locationDesc: "脐旁开2寸处", category: "大肠募穴", functions: ["理气止痛", "调中和胃", "通调肠腑"], indications: ["腹胀肠鸣", "绕脐腹痛", "便秘", "腹泻", "痢疾", "月经不调", "癥瘕"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST36", name: "足三里", pinyin: "zú sān lǐ", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，犊鼻穴下3寸，胫骨前缘旁开一横指", locationDesc: "外膝眼下3寸，胫骨前缘旁开一横指", category: "合穴；胃下合穴", functions: ["健脾和胃", "补益气血", "扶正培元", "通经活络"], indications: ["胃痛", "呕吐", "腹胀", "腹泻", "便秘", "痢疾", "乳痈", "肠痈", "下肢痿痹", "虚劳羸瘦", "高血压", "癫狂"], method: "直刺1-2寸", moxibustion: "可灸", caution: "强身保健可灸" },
  { id: "ST40", name: "丰隆", pinyin: "fēng lóng", meridianId: "ST", meridianName: "足阳明胃经", location: "小腿前外侧，外踝尖上8寸，胫骨前肌外缘，条口外一横指", locationDesc: "外踝尖上8寸，胫骨前缘旁开二横指", category: "络穴", functions: ["化痰祛湿", "和胃降逆"], indications: ["咳嗽痰多", "气喘", "眩晕", "癫狂", "呕吐", "便秘", "下肢痿痹"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "ST44", name: "内庭", pinyin: "nèi tíng", meridianId: "ST", meridianName: "足阳明胃经", location: "足背，第2、3趾间，趾蹼缘后方赤白肉际处", locationDesc: "足背第二、三趾间，趾蹼缘后方", category: "荥穴", functions: ["清胃泻火", "理气止痛"], indications: ["齿痛", "咽喉肿痛", "鼻衄", "胃痛", "腹胀", "腹泻", "便秘", "热病"], method: "直刺或斜刺0.3-0.5寸", moxibustion: "可灸" },
  // 足太阴脾经
  { id: "SP1", name: "隐白", pinyin: "yǐn bái", meridianId: "SP", meridianName: "足太阴脾经", location: "足大趾末节内侧，趾甲根角侧后方0.1寸", locationDesc: "足大趾内侧，趾甲角旁开0.1寸", category: "井穴", functions: ["健脾摄血", "开窍醒神"], indications: ["月经过多", "崩漏", "便血", "尿血", "吐血", "鼻衄", "失眠", "多梦", "惊风", "癫狂"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  { id: "SP3", name: "太白", pinyin: "tài bái", meridianId: "SP", meridianName: "足太阴脾经", location: "足内侧，第1跖趾关节后下方，赤白肉际凹陷处", locationDesc: "足内侧，第一跖趾关节后下方", category: "输穴；原穴", functions: ["健脾和胃", "理气止痛"], indications: ["胃痛", "腹胀", "便秘", "腹泻", "痢疾", "体重节痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "SP4", name: "公孙", pinyin: "gōng sūn", meridianId: "SP", meridianName: "足太阴脾经", location: "足内侧，第1跖骨底的前下方，赤白肉际处", locationDesc: "足内侧，第一跖骨基底前下方", category: "络穴；八脉交会穴（通冲脉）", functions: ["健脾和胃", "理气止痛"], indications: ["胃痛", "呕吐", "腹胀", "腹泻", "痢疾", "心烦失眠"], method: "直刺0.6-1.2寸", moxibustion: "可灸" },
  { id: "SP6", name: "三阴交", pinyin: "sān yīn jiāo", meridianId: "SP", meridianName: "足太阴脾经", location: "小腿内侧，内踝尖上3寸，胫骨内侧缘后方", locationDesc: "内踝尖上3寸，胫骨内侧缘后缘", category: "足太阴、少阴、厥阴经交会穴", functions: ["健脾和胃", "调补肝肾", "滋阴降火"], indications: ["脾胃虚弱", "腹胀腹泻", "月经不调", "痛经", "带下", "不孕", "遗精", "阳痿", "遗尿", "失眠", "心悸"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇禁针" },
  { id: "SP10", name: "血海", pinyin: "xuè hǎi", meridianId: "SP", meridianName: "足太阴脾经", location: "股前区，髌底内侧端上2寸，股内侧肌隆起处", locationDesc: "髌骨内侧端上2寸，屈膝取之", category: "", functions: ["调经统血", "祛风除湿"], indications: ["月经不调", "痛经", "崩漏", "湿疹", "丹毒", "皮肤瘙痒", "贫血"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  // 手少阴心经
  { id: "HT1", name: "极泉", pinyin: "jí quán", meridianId: "HT", meridianName: "手少阴心经", location: "腋窝正中，腋动脉搏动处", locationDesc: "腋窝正中，腋动脉搏动处", category: "", functions: ["宽胸理气", "活血通络"], indications: ["心痛", "心悸", "胸闷", "胁肋疼痛", "瘰疬", "肩臂疼痛"], method: "避开动脉，直刺或斜刺0.3-0.5寸", moxibustion: "可灸", caution: "避开腋动脉" },
  { id: "HT5", name: "通里", pinyin: "tōng lǐ", meridianId: "HT", meridianName: "手少阴心经", location: "前臂前内侧，腕掌侧远端横纹上1寸，尺侧腕屈肌腱桡侧缘", locationDesc: "腕横纹上1寸，尺侧腕屈肌腱桡侧", category: "络穴", functions: ["清心安神", "开音利咽"], indications: ["心悸", "失眠", "健忘", "舌强不语", "咽喉肿痛", "暴喑", "腕臂疼痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT7", name: "神门", pinyin: "shén mén", meridianId: "HT", meridianName: "手少阴心经", location: "腕掌侧远端横纹尺侧端，尺侧腕屈肌腱桡侧缘凹陷中", locationDesc: "腕横纹尺侧端，尺侧腕屈肌腱桡侧", category: "输穴；原穴", functions: ["宁心安神", "清心泻火"], indications: ["心痛", "心烦", "失眠", "健忘", "癫狂", "痫证", "心悸", "怔忡", "胸胁痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "HT9", name: "少冲", pinyin: "shào chōng", meridianId: "HT", meridianName: "手少阴心经", location: "手指小指末节桡侧，指甲根角侧上方0.1寸", locationDesc: "小指桡侧，指甲角旁开0.1寸", category: "井穴", functions: ["开窍泻热", "醒神开窍"], indications: ["心悸", "心痛", "癫狂", "热病昏迷", "胸胁痛"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  // 手太阳小肠经
  { id: "SI1", name: "少泽", pinyin: "shào zé", meridianId: "SI", meridianName: "手太阳小肠经", location: "手指小指末节尺侧，指甲根角侧上方0.1寸", locationDesc: "小指尺侧，指甲角旁开0.1寸", category: "井穴", functions: ["清热利咽", "通乳开窍"], indications: ["头痛", "咽喉肿痛", "耳鸣耳聋", "乳少", "乳痈", "热病昏迷"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  { id: "SI3", name: "后溪", pinyin: "hòu xī", meridianId: "SI", meridianName: "手太阳小肠经", location: "手内侧，第5掌指关节尺侧远端，赤白肉际凹陷处", locationDesc: "微握拳，第五掌指关节后，掌横纹头赤白肉际", category: "输穴；八脉交会穴（通督脉）", functions: ["清心安神", "通督活络"], indications: ["头项强痛", "腰背痛", "手指及肘臂挛痛", "耳鸣耳聋", "癫狂", "热病", "盗汗"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "SI6", name: "养老", pinyin: "yǎng lǎo", meridianId: "SI", meridianName: "手太阳小肠经", location: "前臂后内侧，腕背横纹上1寸，尺骨小头近端桡侧凹陷中", locationDesc: "掌心向下，尺骨小头最高点桡侧凹陷中", category: "郄穴", functions: ["清头明目", "舒筋活络"], indications: ["目视不明", "肩、背、肘、臂酸痛", "头痛", "面痛"], method: "直刺或斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "SI19", name: "听宫", pinyin: "tīng gōng", meridianId: "SI", meridianName: "手太阳小肠经", location: "面部，耳屏正中与下颌骨髁突之间的凹陷中", locationDesc: "耳屏前，下颌骨髁状突后方，张口呈凹陷处", category: "手足少阳、手太阳经交会穴", functions: ["开窍聪耳"], indications: ["耳鸣耳聋", "中耳炎", "外耳道炎", "牙痛", "癫狂"], method: "张口直刺1-1.5寸", moxibustion: "可灸", caution: "留针时需张口" },
  // 足太阳膀胱经
  { id: "BL1", name: "睛明", pinyin: "jīng míng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "面部，目内眦内上方眶内侧壁凹陷中", locationDesc: "目内眦角稍上方凹陷处", category: "手足太阳、足阳明、阴阳跷脉交会穴", functions: ["清热明目", "通络止泪"], indications: ["目赤肿痛", "流泪", "目眩", "近视", "夜盲", "色盲", "目翳", "眼睑痉挛"], method: "嘱患者闭目，医者轻推眼球向外侧固定，沿眶缘缓慢刺入0.5-1寸", moxibustion: "不宜灸", caution: "不捻转，不提插" },
  { id: "BL10", name: "天柱", pinyin: "tiān zhù", meridianId: "BL", meridianName: "足太阳膀胱经", location: "颈后区，横平第2颈椎棘突上际，斜方肌外缘凹陷中", locationDesc: "后发际正中旁开1.3寸，斜方肌外缘", category: "", functions: ["祛风通络", "清头明目"], indications: ["头痛", "眩晕", "项强", "肩背痛", "鼻塞", "咽喉肿痛"], method: "直刺或斜刺0.5-0.8寸", moxibustion: "可灸", caution: "不可向内上方深刺" },
  { id: "BL13", name: "肺俞", pinyin: "fèi shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第3胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第三胸椎棘突下，旁开1.5寸", category: "肺背俞穴", functions: ["养阴清肺", "祛风止痒"], indications: ["咳嗽", "气喘", "咯血", "鼻塞", "咽喉肿痛", "潮热", "盗汗", "皮肤瘙痒", "荨麻疹"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL17", name: "膈俞", pinyin: "gé shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第7胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第七胸椎棘突下，旁开1.5寸", category: "血会", functions: ["宽胸利膈", "活血止血"], indications: ["呕吐", "呃逆", "胃痛", "咳嗽", "气喘", "吐血", "便血", "贫血", "皮肤瘙痒", "荨麻疹"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL20", name: "脾俞", pinyin: "pí shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "背部，第11胸椎棘突下，后正中线旁开1.5寸", locationDesc: "第十一胸椎棘突下，旁开1.5寸", category: "脾背俞穴", functions: ["健脾和胃", "祛湿止泻"], indications: ["腹胀", "腹泻", "呕吐", "便秘", "痢疾", "水肿", "黄疸", "月经不调", "带下", "乏力"], method: "斜刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "BL23", name: "肾俞", pinyin: "shèn shū", meridianId: "BL", meridianName: "足太阳膀胱经", location: "腰部，第2腰椎棘突下，后正中线旁开1.5寸", locationDesc: "第二腰椎棘突下，旁开1.5寸", category: "肾背俞穴", functions: ["补肾益精", "壮腰强骨"], indications: ["腰痛", "阳痿", "遗精", "早泄", "月经不调", "带下", "耳鸣耳聋", "水肿", "喘咳"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "BL40", name: "委中", pinyin: "wěi zhōng", meridianId: "BL", meridianName: "足太阳膀胱经", location: "膝后区，腘横纹中点，股二头肌腱内侧", locationDesc: "腘窝横纹中央，屈膝取之", category: "合穴；膀胱下合穴", functions: ["清热凉血", "舒筋活络"], indications: ["腰背痛", "下肢痿痹", "腹痛", "吐泻", "丹毒", "皮肤瘙痒", "疔疮"], method: "直刺1-1.5寸，或点刺出血", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "BL57", name: "承山", pinyin: "chéng shān", meridianId: "BL", meridianName: "足太阳膀胱经", location: "小腿后区，腓肠肌两肌腹与肌腱交角的凹陷处", locationDesc: "小腿后面，委中与昆仑之间，伸直足尖并足跟用力蹬地时呈人字纹处", category: "", functions: ["理气止痛", "舒筋活络"], indications: ["腰腿拘急", "疼痛", "痔疾", "便秘", "脚气"], method: "直刺1-2寸", moxibustion: "可灸" },
  { id: "BL60", name: "昆仑", pinyin: "kūn lún", meridianId: "BL", meridianName: "足太阳膀胱经", location: "踝区，外踝尖与跟腱之间的凹陷中", locationDesc: "外踝后方，外踝尖与跟腱之间凹陷中", category: "经穴", functions: ["祛风通络", "清热止痛"], indications: ["头痛", "眩晕", "项强", "腰骶疼痛", "足跟肿痛", "癫痫", "鼻衄"], method: "直刺0.5-0.8寸", moxibustion: "可灸", caution: "孕妇慎用" },
  { id: "BL67", name: "至阴", pinyin: "zhì yīn", meridianId: "BL", meridianName: "足太阳膀胱经", location: "足趾，小趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足小趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["祛风清热", "调整胎位"], indications: ["头痛", "鼻塞", "鼻衄", "目痛", "胎位不正", "难产", "滞产"], method: "浅刺0.1寸，或艾灸", moxibustion: "胎位不正宜灸", caution: "孕妇禁针" },
  // 足少阴肾经
  { id: "KI1", name: "涌泉", pinyin: "yǒng quán", meridianId: "KI", meridianName: "足少阴肾经", location: "足底，屈足卷趾时足心最凹陷处，约当足底第2、3趾蹼缘与足跟连线的前1/3与后2/3交点处", locationDesc: "足底前1/3凹陷处", category: "井穴", functions: ["苏厥开窍", "滋阴益肾"], indications: ["昏厥", "中暑", "癫狂", "小儿惊风", "头痛", "眩晕", "失眠", "便秘", "小便不利"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "KI3", name: "太溪", pinyin: "tài xī", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，内踝尖与跟腱之间的凹陷中", locationDesc: "内踝尖与跟腱之间凹陷中", category: "输穴；原穴", functions: ["滋阴益肾", "壮阳强腰"], indications: ["头痛", "眩晕", "耳鸣耳聋", "牙痛", "咽喉肿痛", "咳嗽", "气喘", "月经不调", "遗精", "阳痿", "腰脊疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "KI6", name: "照海", pinyin: "zhào hǎi", meridianId: "KI", meridianName: "足少阴肾经", location: "足内侧，内踝尖下1寸，内踝下方凹陷中", locationDesc: "内踝尖下方1寸凹陷中", category: "八脉交会穴（通阴跷脉）", functions: ["滋阴益肾", "清热利咽"], indications: ["咽喉肿痛", "失眠", "目赤肿痛", "月经不调", "带下", "小便频数", "足跗肿痛"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  // 手厥阴心包经
  { id: "PC4", name: "郄门", pinyin: "xì mén", meridianId: "PC", meridianName: "手厥阴心包经", location: "前臂前内侧，腕掌侧远端横纹上5寸，掌长肌腱与桡侧腕屈肌腱之间", locationDesc: "腕横纹上5寸，掌长肌腱与桡侧腕屈肌腱之间", category: "郄穴", functions: ["宁心安神", "理气止痛"], indications: ["心痛", "心悸", "胸闷", "心烦", "呕血", "咯血", "疔疮", "癫痫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "PC6", name: "内关", pinyin: "nèi guān", meridianId: "PC", meridianName: "手厥阴心包经", location: "前臂前内侧，腕掌侧远端横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间", locationDesc: "腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间", category: "络穴；八脉交会穴（通阴维脉）", functions: ["宁心安神", "理气止痛"], indications: ["心痛", "心悸", "胸闷", "胃痛", "呕吐", "呃逆", "失眠", "癫狂", "痫证", "眩晕", "中风偏瘫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "PC7", name: "大陵", pinyin: "dà líng", meridianId: "PC", meridianName: "手厥阴心包经", location: "腕掌侧远端横纹中，掌长肌腱与桡侧腕屈肌腱之间凹陷中", locationDesc: "腕横纹中央，掌长肌腱与桡侧腕屈肌腱之间", category: "输穴；原穴", functions: ["宁心安神", "和胃宽胸"], indications: ["心痛", "心悸", "胃痛", "呕吐", "胸闷", "惊悸", "失眠", "癫狂"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "PC8", name: "劳宫", pinyin: "láo gōng", meridianId: "PC", meridianName: "手厥阴心包经", location: "掌区，横平第3掌指关节近端，第2、3掌骨之间偏于第3掌骨", locationDesc: "掌心，第二、三掌骨之间，握拳屈指时中指尖处", category: "荥穴", functions: ["清心泻火", "开窍醒神"], indications: ["中风昏迷", "中暑", "癫狂", "痫证", "心痛", "呕吐", "口疮", "口臭"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "PC9", name: "中冲", pinyin: "zhōng chōng", meridianId: "PC", meridianName: "手厥阴心包经", location: "手指，中指末节最高点", locationDesc: "中指尖端，指甲游离缘前端", category: "井穴", functions: ["开窍泻热", "醒神开窍"], indications: ["中风昏迷", "舌强不语", "中暑", "热病", "小儿惊风", "心烦"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  // 手少阳三焦经
  { id: "TE1", name: "关冲", pinyin: "guān chōng", meridianId: "TE", meridianName: "手少阳三焦经", location: "手指无名指末节尺侧，指甲根角侧上方0.1寸", locationDesc: "无名指尺侧，指甲角旁开0.1寸", category: "井穴", functions: ["清热利咽", "开窍醒神"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "口干", "热病昏厥"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  { id: "TE4", name: "阳池", pinyin: "yáng chí", meridianId: "TE", meridianName: "手少阳三焦经", location: "腕后区，腕背侧远端横纹上，指伸肌腱与小指伸肌腱之间凹陷中", locationDesc: "腕背横纹中，指总伸肌腱尺侧缘凹陷中", category: "原穴", functions: ["清热通络", "调理三焦"], indications: ["手腕疼痛", "肩背疼痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "疟疾", "消渴"], method: "直刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "TE5", name: "外关", pinyin: "wài guān", meridianId: "TE", meridianName: "手少阳三焦经", location: "前臂后外侧，腕背侧远端横纹上2寸，尺骨与桡骨之间", locationDesc: "腕背横纹上2寸，尺骨与桡骨之间", category: "络穴；八脉交会穴（通阳维脉）", functions: ["清热解表", "通经活络"], indications: ["热病", "头痛", "目赤肿痛", "耳鸣耳聋", "胸胁疼痛", "上肢痿痹", "手指疼痛"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE10", name: "天井", pinyin: "tiān jǐng", meridianId: "TE", meridianName: "手少阳三焦经", location: "肘后区，肘尖上方1寸凹陷中", locationDesc: "屈肘，肘尖直上1寸凹陷中", category: "合穴", functions: ["清热化痰", "通络止痛"], indications: ["偏头痛", "耳聋", "瘰疬", "癫痫", "胸胁疼痛", "上肢痿痹"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "TE17", name: "翳风", pinyin: "yì fēng", meridianId: "TE", meridianName: "手少阳三焦经", location: "颈部，乳突前下方，平耳垂后下缘凹陷中", locationDesc: "耳垂后方，乳突前方，张口凹陷处", category: "手足少阳经交会穴", functions: ["祛风通络", "聪耳开窍"], indications: ["耳鸣耳聋", "口眼㖞斜", "牙关紧闭", "颊肿", "瘰疬", "面颊疼痛"], method: "直刺0.8-1.2寸", moxibustion: "可灸" },
  { id: "TE23", name: "丝竹空", pinyin: "sī zhú kōng", meridianId: "TE", meridianName: "手少阳三焦经", location: "面部，眉梢外侧端凹陷中", locationDesc: "眉梢外侧端凹陷中", category: "手足少阳经交会穴", functions: ["清热散风", "明目止眩"], indications: ["头痛", "眩晕", "目赤肿痛", "眼睑瞤动", "齿痛", "面痛", "癫痫"], method: "平刺0.3-0.5寸", moxibustion: "不宜灸" },
  // 足少阳胆经
  { id: "GB1", name: "瞳子髎", pinyin: "tóng zǐ liáo", meridianId: "GB", meridianName: "足少阳胆经", location: "面部，目外眦外侧0.5寸凹陷中", locationDesc: "目外眦旁，眶骨外侧凹陷中", category: "手足少阳、手太阳经交会穴", functions: ["祛风明目", "清热止痛"], indications: ["头痛", "目赤肿痛", "目翳", "流泪", "口眼㖞斜"], method: "平刺0.3-0.5寸", moxibustion: "不宜灸" },
  { id: "GB20", name: "风池", pinyin: "fēng chí", meridianId: "GB", meridianName: "足少阳胆经", location: "颈后区，枕骨之下，胸锁乳突肌上端与斜方肌上端之间的凹陷中", locationDesc: "项后，枕骨下，斜方肌与胸锁乳突肌之间凹陷中", category: "手足少阳、阳维脉交会穴", functions: ["祛风解表", "清头明目", "醒脑开窍"], indications: ["头痛", "眩晕", "失眠", "中风", "癫痫", "耳鸣耳聋", "鼻塞", "鼻渊", "感冒", "发热"], method: "针尖微下，向鼻尖方向斜刺0.8-1.2寸", moxibustion: "可灸", caution: "深部为延髓，慎刺" },
  { id: "GB30", name: "环跳", pinyin: "huán tiào", meridianId: "GB", meridianName: "足少阳胆经", location: "臀区，股骨大转子最凸点与骶管裂孔连线上的外1/3与内2/3交点处", locationDesc: "股骨大转子最高点与骶管裂孔连线的外1/3与内2/3交界处", category: "足少阳、太阳经交会穴", functions: ["祛风除湿", "通经活络"], indications: ["腰腿疼痛", "下肢痿痹", "半身不遂", "坐骨神经痛", "风疹", "湿疹"], method: "直刺2-3寸", moxibustion: "可灸", caution: "深刺时需注意" },
  { id: "GB34", name: "阳陵泉", pinyin: "yáng líng quán", meridianId: "GB", meridianName: "足少阳胆经", location: "小腿外侧，腓骨头前下方凹陷中", locationDesc: "小腿外侧，腓骨小头前下方凹陷中", category: "合穴；胆下合穴；筋会", functions: ["疏肝利胆", "舒筋活络"], indications: ["黄疸", "胁痛", "呕吐", "腹胀", "下肢痿痹", "膝关节疼痛", "小儿惊风", "破伤风"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "GB44", name: "足窍阴", pinyin: "zú qiào yīn", meridianId: "GB", meridianName: "足少阳胆经", location: "足趾，第4趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足第四趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["清热泻火", "通络开窍"], indications: ["头痛", "目赤肿痛", "耳鸣耳聋", "咽喉肿痛", "胸胁疼痛", "热病"], method: "浅刺0.1寸，或点刺出血", moxibustion: "可灸" },
  // 足厥阴肝经
  { id: "LR1", name: "大敦", pinyin: "dà dūn", meridianId: "LR", meridianName: "足厥阴肝经", location: "足大趾末节外侧，趾甲根角侧后方0.1寸", locationDesc: "足大趾外侧，趾甲角旁开0.1寸", category: "井穴", functions: ["理气调肝", "镇惊开窍"], indications: ["疝气", "遗尿", "癃闭", "月经不调", "崩漏", "癫痫", "惊风"], method: "浅刺0.1-0.2寸，或点刺出血", moxibustion: "可灸" },
  { id: "LR3", name: "太冲", pinyin: "tài chōng", meridianId: "LR", meridianName: "足厥阴肝经", location: "足背，第1、2跖骨间，跖骨底结合部前方凹陷中", locationDesc: "足背，第一、二跖骨结合部之前凹陷中", category: "输穴；原穴", functions: ["疏肝理气", "平肝潜阳"], indications: ["头痛", "眩晕", "目赤肿痛", "耳鸣耳聋", "胁痛", "腹胀", "呕吐", "黄疸", "月经不调", "痛经", "疝气", "癫痫"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "LR8", name: "曲泉", pinyin: "qū quán", meridianId: "LR", meridianName: "足厥阴肝经", location: "膝内侧区，膝关节内侧面横纹内侧端，胫骨内侧髁后缘，半腱肌、半膜肌上端凹陷中", locationDesc: "屈膝，膝内侧横纹头上方凹陷中", category: "合穴", functions: ["疏肝理气", "清热利湿"], indications: ["小便不利", "腹痛", "腹泻", "月经不调", "痛经", "带下", "遗精", "阳痿", "膝关节疼痛"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "LR13", name: "章门", pinyin: "zhāng mén", meridianId: "LR", meridianName: "足厥阴肝经", location: "侧腹部，第11肋游离端下方", locationDesc: "侧腹部，第十一肋游离端下方", category: "脾募穴；脏会", functions: ["疏肝理气", "健脾和胃"], indications: ["胸胁疼痛", "腹胀", "腹泻", "呕吐", "黄疸", "痞块", "癥瘕"], method: "斜刺0.5-0.8寸", moxibustion: "可灸", caution: "右侧章门下方为肝脏，不可深刺" },
  { id: "LR14", name: "期门", pinyin: "qī mén", meridianId: "LR", meridianName: "足厥阴肝经", location: "胸部，第6肋间隙，前正中线旁开4寸", locationDesc: "胸部，乳头直下，第6肋间隙", category: "肝募穴；足太阴、足厥阴、阴维脉交会穴", functions: ["疏肝理气", "泻热宽胸"], indications: ["胸胁胀痛", "腹胀", "呕吐", "呃逆", "乳痈", "发热"], method: "斜刺0.5-0.8寸", moxibustion: "可灸", caution: "不可深刺，避免伤及内脏" },
  // 督脉
  { id: "GV1", name: "长强", pinyin: "cháng qiáng", meridianId: "GV", meridianName: "督脉", location: "会阴区，尾骨下方，尾骨端与肛门连线的中点", locationDesc: "尾骨尖下方，肛门与尾骨之间", category: "络穴", functions: ["通调督脉", "固脱止泻"], indications: ["腹泻", "痢疾", "便秘", "脱肛", "痔疮", "癫狂", "痫证", "腰背疼痛"], method: "斜刺，针尖向上与骶骨平行刺入0.8-1寸", moxibustion: "可灸", caution: "不宜直刺" },
  { id: "GV4", name: "命门", pinyin: "mìng mén", meridianId: "GV", meridianName: "督脉", location: "腰部，后正中线上，第2腰椎棘突下凹陷中", locationDesc: "第二腰椎棘突下凹陷中", category: "", functions: ["温肾壮阳", "强腰固本"], indications: ["腰脊疼痛", "下肢痿痹", "遗精", "阳痿", "月经不调", "痛经", "带下", "遗尿", "尿频", "泄泻", "耳鸣耳聋"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV14", name: "大椎", pinyin: "dà zhuī", meridianId: "GV", meridianName: "督脉", location: "项后区，第7颈椎棘突下凹陷中，后正中线上", locationDesc: "第七颈椎棘突下凹陷中", category: "手足三阳、督脉交会穴", functions: ["清热解表", "祛风止痫"], indications: ["热病", "感冒", "发热", "咳嗽", "气喘", "头项强痛", "癫痫", "风疹", "中暑"], method: "直刺0.5-1寸", moxibustion: "可灸" },
  { id: "GV20", name: "百会", pinyin: "bǎi huì", meridianId: "GV", meridianName: "督脉", location: "头部，前发际正中直上5寸，或两耳尖连线的中点", locationDesc: "头顶正中，两耳尖连线的中点", category: "手足三阳、督脉交会穴", functions: ["升阳举陷", "醒脑开窍"], indications: ["头痛", "眩晕", "失眠", "健忘", "癫狂", "痫证", "中风", "脱肛", "阴挺", "胃下垂"], method: "平刺0.5-0.8寸", moxibustion: "可灸" },
  { id: "GV26", name: "水沟", pinyin: "shuǐ gōu", meridianId: "GV", meridianName: "督脉", location: "面部，人中沟的上1/3与中1/3交点处", locationDesc: "鼻下，人中沟上1/3处", category: "手足阳明、督脉交会穴", functions: ["开窍醒神", "通调督脉"], indications: ["昏迷", "晕厥", "中风", "中暑", "癔病", "抽搐", "牙关紧闭", "口歪", "急性腰痛"], method: "向上斜刺0.3-0.5寸", moxibustion: "可灸" },
  // 任脉
  { id: "CV3", name: "中极", pinyin: "zhōng jí", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下4寸", locationDesc: "脐下4寸，耻骨联合上缘上方", category: "膀胱募穴", functions: ["补肾调经", "清热利湿"], indications: ["遗尿", "尿频", "尿急", "遗精", "阳痿", "月经不调", "痛经", "带下", "崩漏", "阴挺", "不孕"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "CV4", name: "关元", pinyin: "guān yuán", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下3寸", locationDesc: "脐下3寸", category: "小肠募穴", functions: ["培元固本", "温肾壮阳"], indications: ["遗尿", "尿频", "遗精", "阳痿", "月经不调", "痛经", "崩漏", "带下", "阴挺", "不孕", "虚劳羸瘦", "腹泻", "便秘"], method: "直刺1-1.5寸", moxibustion: "可灸", caution: "孕妇慎刺" },
  { id: "CV6", name: "气海", pinyin: "qì hǎi", meridianId: "CV", meridianName: "任脉", location: "下腹部，前正中线上，脐中下1.5寸", locationDesc: "脐下1.5寸", category: "肓之原", functions: ["补肾益气", "调理气机"], indications: ["腹痛", "腹泻", "便秘", "遗尿", "遗精", "阳痿", "月经不调", "痛经", "带下", "虚脱", "形体羸瘦"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV12", name: "中脘", pinyin: "zhōng wǎn", meridianId: "CV", meridianName: "任脉", location: "上腹部，前正中线上，脐中上4寸", locationDesc: "脐上4寸", category: "胃募穴；腑会", functions: ["和胃健脾", "降逆利水"], indications: ["胃痛", "腹胀", "呕吐", "呃逆", "吞酸", "纳呆", "食不化", "疳积", "便秘", "泄泻", "失眠"], method: "直刺1-1.5寸", moxibustion: "可灸" },
  { id: "CV17", name: "膻中", pinyin: "dàn zhōng", meridianId: "CV", meridianName: "任脉", location: "胸部，前正中线上，横平第4肋间隙，约在两乳头连线的中点", locationDesc: "两乳头连线的中点", category: "心包募穴；气会；足太阴、足少阴、手太阳、手少阳、任脉交会穴", functions: ["理气宽胸", "止咳平喘"], indications: ["胸闷", "气短", "胸痛", "心悸", "咳嗽", "气喘", "呃逆", "乳少", "乳痈"], method: "平刺0.3-0.5寸", moxibustion: "可灸" },
  { id: "CV22", name: "天突", pinyin: "tiān tū", meridianId: "CV", meridianName: "任脉", location: "颈部，前正中线上，胸骨上窝中央", locationDesc: "胸骨上窝中央", category: "足太阴、任脉交会穴", functions: ["理气化痰", "利咽开音"], indications: ["咳嗽", "气喘", "咽喉肿痛", "梅核气", "噎膈", "吞咽困难"], method: "先直刺0.2寸，然后将针尖转向下方，紧靠胸骨后方刺入1-1.5寸", moxibustion: "可灸", caution: "不宜深刺，避免伤及气管" },
  { id: "CV24", name: "承浆", pinyin: "chéng jiāng", meridianId: "CV", meridianName: "任脉", location: "面部，颏唇沟的正中凹陷处", locationDesc: "颏唇沟正中凹陷处", category: "手足阳明、督脉、任脉交会穴", functions: ["祛风通络", "生津敛液"], indications: ["口歪", "齿龈肿痛", "流涎", "暴喑", "面瘫", "癫痫"], method: "斜刺0.3-0.5寸", moxibustion: "可灸" }
]
