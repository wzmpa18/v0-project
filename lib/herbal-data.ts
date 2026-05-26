"use client"

// 经方本草数据库 - 基于《伤寒论》《金匮要略》《神农本草经》公有领域古籍

// 经方数据结构
export interface JingFang {
  id: string
  name: string
  alias?: string[]
  source: string  // 出处
  composition: { herb: string; dosage: string }[]  // 组成
  preparation: string  // 煎服法
  indication: string  // 主治
  syndrome: string[]  // 辨证要点/关键词
  original: string  // 原文条文
}

// 30个核心经方（公有领域数据）
export const JING_FANG_DATA: JingFang[] = [
  {
    id: "guizhitang",
    name: "桂枝汤",
    alias: ["和剂之王"],
    source: "《伤寒论》",
    composition: [
      { herb: "桂枝", dosage: "三两" },
      { herb: "芍药", dosage: "三两" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "大枣", dosage: "十二枚擘" }
    ],
    preparation: "上五味，㕮咀三味，以水七升，微火煮取三升，去滓，适寒温，服一升。服已须臾，啜热稀粥一升余，以助药力。温覆令一时许，遍身漐漐微似有汗者益佳。",
    indication: "太阳中风，头痛发热，汗出恶风，鼻鸣干呕",
    syndrome: ["太阳中风", "汗出恶风", "脉浮缓", "发热头痛"],
    original: "太阳中风，阳浮而阴弱，阳浮者热自发，阴弱者汗自出，啬啬恶寒，淅淅恶风，翕翕发热，鼻鸣干呕者，桂枝汤主之。"
  },
  {
    id: "mahuangtang",
    name: "麻黄汤",
    source: "《伤寒论》",
    composition: [
      { herb: "麻黄", dosage: "三两去节" },
      { herb: "桂枝", dosage: "二两去皮" },
      { herb: "杏仁", dosage: "七十个去皮尖" },
      { herb: "甘草", dosage: "一两炙" }
    ],
    preparation: "上四味，以水九升，先煮麻黄减二升，去上沫，内诸药，煮取二升半，去滓，温服八合，覆取微似汗。",
    indication: "太阳伤寒，恶寒发热，头身疼痛，无汗而喘",
    syndrome: ["太阳伤寒", "无汗", "恶寒", "身疼", "脉浮紧"],
    original: "太阳病，头痛发热，身疼腰痛，骨节疼痛，恶风无汗而喘者，麻黄汤主之。"
  },
  {
    id: "xiaochaihu",
    name: "小柴胡汤",
    alias: ["少阳主方"],
    source: "《伤寒论》",
    composition: [
      { herb: "柴胡", dosage: "半斤" },
      { herb: "黄芩", dosage: "三两" },
      { herb: "人参", dosage: "三两" },
      { herb: "半夏", dosage: "半升洗" },
      { herb: "甘草", dosage: "三两炙" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "大枣", dosage: "十二枚擘" }
    ],
    preparation: "上七味，以水一斗二升，煮取六升，去滓，再煎取三升，温服一升，日三服。",
    indication: "少阳病，往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕",
    syndrome: ["少阳病", "往来寒热", "胸胁苦满", "口苦", "咽干", "目眩"],
    original: "伤寒五六日中风，往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕，或胸中烦而不呕，或渴，或腹中痛，或胁下痞硬，或心下悸、小便不利，或不渴、身有微热，或咳者，小柴胡汤主之。"
  },
  {
    id: "dachengqi",
    name: "大承气汤",
    source: "《伤寒论》",
    composition: [
      { herb: "大黄", dosage: "四两酒洗" },
      { herb: "厚朴", dosage: "半斤炙去皮" },
      { herb: "枳实", dosage: "五枚炙" },
      { herb: "芒硝", dosage: "三合" }
    ],
    preparation: "上四味，以水一斗，先煮二物，取五升，去滓，内大黄，更煮取二升，去滓，内芒硝，更上微火一两沸，分温再服。",
    indication: "阳明腑实，痞满燥实坚，大便不通，腹胀满痛",
    syndrome: ["阳明腑实", "痞满燥实", "不大便", "腹胀满", "潮热谵语"],
    original: "阳明病，脉迟，虽汗出不恶寒者，其身必重，短气腹满而喘，有潮热者，此外欲解，可攻里也，手足濈然汗出者，此大便已硬也，大承气汤主之。"
  },
  {
    id: "sini",
    name: "四逆汤",
    source: "《伤寒论》",
    composition: [
      { herb: "附子", dosage: "一枚生用去皮破八片" },
      { herb: "干姜", dosage: "一两半" },
      { herb: "甘草", dosage: "二两炙" }
    ],
    preparation: "上三味，以水三升，煮取一升二合，去滓，分温再服。强人可大附子一枚，干姜三两。",
    indication: "少阴病，四肢厥逆，恶寒蜷卧，下利清谷",
    syndrome: ["少阴病", "四肢厥逆", "下利清谷", "脉微欲绝", "恶寒蜷卧"],
    original: "少阴病，脉沉者，急温之，宜四逆汤。"
  },
  {
    id: "gegen",
    name: "葛根汤",
    source: "《伤寒论》",
    composition: [
      { herb: "葛根", dosage: "四两" },
      { herb: "麻黄", dosage: "三两去节" },
      { herb: "桂枝", dosage: "二两去皮" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "芍药", dosage: "二两" },
      { herb: "大枣", dosage: "十二枚擘" }
    ],
    preparation: "上七味，以水一斗，先煮麻黄葛根减二升，去白沫，内诸药，煮取三升，去滓，温服一升，覆取微似汗。",
    indication: "太阳病，项背强几几，无汗恶风",
    syndrome: ["太阳病", "项背强", "无汗", "恶风"],
    original: "太阳病，项背强几几，无汗恶风，葛根汤主之。"
  },
  {
    id: "baihu",
    name: "白虎汤",
    source: "《伤寒论》",
    composition: [
      { herb: "石膏", dosage: "一斤碎" },
      { herb: "知母", dosage: "六两" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "粳米", dosage: "六合" }
    ],
    preparation: "上四味，以水一斗，煮米熟汤成，去滓，温服一升，日三服。",
    indication: "阳明经热，大热大渴大汗出，脉洪大",
    syndrome: ["阳明经热", "大热", "大汗", "大渴", "脉洪大"],
    original: "伤寒脉浮滑，此以表有热，里有寒，白虎汤主之。"
  },
  {
    id: "lizhong",
    name: "理中汤",
    alias: ["理中丸"],
    source: "《伤寒论》",
    composition: [
      { herb: "人参", dosage: "三两" },
      { herb: "干姜", dosage: "三两" },
      { herb: "甘草", dosage: "三两炙" },
      { herb: "白术", dosage: "三两" }
    ],
    preparation: "上四味，捣筛，蜜和为丸，如鸡子黄许大，以沸汤数合和一丸，研碎，温服之。",
    indication: "脾胃虚寒，自利不渴，腹满时痛",
    syndrome: ["脾胃虚寒", "自利不渴", "腹满", "呕吐"],
    original: "霍乱，头痛发热，身疼痛，热多欲饮水者，五苓散主之；寒多不用水者，理中丸主之。"
  },
  {
    id: "wuling",
    name: "五苓散",
    source: "《伤寒论》",
    composition: [
      { herb: "猪苓", dosage: "十八铢去皮" },
      { herb: "泽泻", dosage: "一两六铢" },
      { herb: "白术", dosage: "十八铢" },
      { herb: "茯苓", dosage: "十八铢" },
      { herb: "桂枝", dosage: "半两去皮" }
    ],
    preparation: "上五味，捣为散，以白饮和服方寸匕，日三服，多饮暖水，汗出愈。",
    indication: "膀胱蓄水，小便不利，烦渴欲饮",
    syndrome: ["小便不利", "烦渴", "水逆", "水肿"],
    original: "太阳病，发汗后，大汗出，胃中干，烦躁不得眠，欲得饮水者，少少与饮之，令胃气和则愈。若脉浮，小便不利，微热消渴者，五苓散主之。"
  },
  {
    id: "banxiaxiexin",
    name: "半夏泻心汤",
    source: "《伤寒论》",
    composition: [
      { herb: "半夏", dosage: "半升洗" },
      { herb: "黄芩", dosage: "三两" },
      { herb: "干姜", dosage: "三两" },
      { herb: "人参", dosage: "三两" },
      { herb: "甘草", dosage: "三两炙" },
      { herb: "黄连", dosage: "一两" },
      { herb: "大枣", dosage: "十二枚擘" }
    ],
    preparation: "上七味，以水一斗，煮取六升，去滓，再煎取三升，温服一升，日三服。",
    indication: "寒热错杂，心下痞满，呕吐下利",
    syndrome: ["心下痞", "呕吐", "下利", "肠鸣"],
    original: "伤寒五六日，呕而发热者，柴胡汤证具，而以他药下之，柴胡证仍在者，复与柴胡汤。此虽已下之，不为逆，必蒸蒸而振，却发热汗出而解。若心下满而硬痛者，此为结胸也，大陷胸汤主之；但满而不痛者，此为痞，柴胡不中与之，宜半夏泻心汤。"
  },
  {
    id: "zhenwu",
    name: "真武汤",
    source: "《伤寒论》",
    composition: [
      { herb: "茯苓", dosage: "三两" },
      { herb: "芍药", dosage: "三两" },
      { herb: "白术", dosage: "二两" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "附子", dosage: "一枚炮去皮破八片" }
    ],
    preparation: "上五味，以水八升，煮取三升，去滓，温服七合，日三服。",
    indication: "脾肾阳虚，水气内停，小便不利，四肢沉重疼痛",
    syndrome: ["阳虚水泛", "小便不利", "四肢沉重", "心下悸"],
    original: "太阳病发汗，汗出不解，其人仍发热，心下悸，头眩，身瞤动，振振欲擗地者，真武汤主之。"
  },
  {
    id: "guizhifuzi",
    name: "桂枝附子汤",
    source: "《伤寒论》",
    composition: [
      { herb: "桂枝", dosage: "四两去皮" },
      { herb: "附子", dosage: "三枚炮去皮破" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "大枣", dosage: "十二枚擘" },
      { herb: "甘草", dosage: "二两炙" }
    ],
    preparation: "上五味，以水六升，煮取二升，去滓，分温三服。",
    indication: "风湿相搏，身体疼烦，不能自转侧",
    syndrome: ["风湿", "身体疼痛", "不能转侧"],
    original: "伤寒八九日，风湿相搏，身体疼烦，不能自转侧，不呕不渴，脉浮虚而涩者，桂枝附子汤主之。"
  },
  {
    id: "mahuangfuzi",
    name: "麻黄附子细辛汤",
    source: "《伤寒论》",
    composition: [
      { herb: "麻黄", dosage: "二两去节" },
      { herb: "细辛", dosage: "二两" },
      { herb: "附子", dosage: "一枚炮去皮破八片" }
    ],
    preparation: "上三味，以水一斗，先煮麻黄减二升，去上沫，内诸药，煮取三升，去滓，温服一升，日三服。",
    indication: "少阴病，始得之，反发热，脉沉者",
    syndrome: ["少阴病", "发热", "脉沉", "恶寒"],
    original: "少阴病，始得之，反发热，脉沉者，麻黄细辛附子汤主之。"
  },
  {
    id: "wumei",
    name: "乌梅丸",
    source: "《伤寒论》",
    composition: [
      { herb: "乌梅", dosage: "三百枚" },
      { herb: "细辛", dosage: "六两" },
      { herb: "干姜", dosage: "十两" },
      { herb: "黄连", dosage: "十六两" },
      { herb: "当归", dosage: "四两" },
      { herb: "附子", dosage: "六两炮去皮" },
      { herb: "蜀椒", dosage: "四两出汗" },
      { herb: "桂枝", dosage: "六两去皮" },
      { herb: "人参", dosage: "六两" },
      { herb: "黄柏", dosage: "六两" }
    ],
    preparation: "上十味，异捣筛，合治之，以苦酒渍乌梅一宿，去核，蒸之五斗米下，饭熟捣成泥，和药令相得，内臼中，与蜜杵二千下，丸如梧桐子大，先食饮服十丸，日三服，稍加至二十丸。",
    indication: "蛔厥，久利，厥阴病",
    syndrome: ["蛔厥", "久利", "厥阴病", "寒热错杂"],
    original: "蛔厥者，乌梅丸主之。又主久利。"
  },
  {
    id: "xiaojianzhong",
    name: "小建中汤",
    source: "《伤寒论》",
    composition: [
      { herb: "桂枝", dosage: "三两去皮" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "大枣", dosage: "十二枚擘" },
      { herb: "芍药", dosage: "六两" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "胶饴", dosage: "一升" }
    ],
    preparation: "上六味，以水七升，煮取三升，去滓，内饴，更上微火消解，温服一升，日三服。",
    indication: "虚劳里急，腹中时痛，心悸虚烦",
    syndrome: ["虚劳", "腹痛", "心悸", "虚烦"],
    original: "伤寒，阳脉涩，阴脉弦，法当腹中急痛，先与小建中汤。"
  },
  {
    id: "dahuanghuanglian",
    name: "大黄黄连泻心汤",
    source: "《伤寒论》",
    composition: [
      { herb: "大黄", dosage: "二两" },
      { herb: "黄连", dosage: "一两" }
    ],
    preparation: "上二味，以麻沸汤二升渍之，须臾绞去滓，分温再服。",
    indication: "心下痞，按之濡，其脉关上浮者",
    syndrome: ["心下痞", "按之濡", "心烦"],
    original: "心下痞，按之濡，其脉关上浮者，大黄黄连泻心汤主之。"
  },
  {
    id: "fuziganjiang",
    name: "四逆汤加人参",
    alias: ["四逆加人参汤"],
    source: "《伤寒论》",
    composition: [
      { herb: "附子", dosage: "一枚生用去皮破八片" },
      { herb: "干姜", dosage: "一两半" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "人参", dosage: "一两" }
    ],
    preparation: "上四味，以水三升，煮取一升二合，去滓，分温再服。",
    indication: "少阴病，恶寒脉微，利止亡血",
    syndrome: ["少阴病", "恶寒", "脉微", "利止"],
    original: "恶寒脉微而复利，利止亡血也，四逆加人参汤主之。"
  },
  {
    id: "dangguisini",
    name: "当归四逆汤",
    source: "《伤寒论》",
    composition: [
      { herb: "当归", dosage: "三两" },
      { herb: "桂枝", dosage: "三两去皮" },
      { herb: "芍药", dosage: "三两" },
      { herb: "细辛", dosage: "三两" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "通草", dosage: "二两" },
      { herb: "大枣", dosage: "二十五枚擘" }
    ],
    preparation: "上七味，以水八升，煮取三升，去滓，温服一升，日三服。",
    indication: "手足厥寒，脉细欲绝",
    syndrome: ["手足厥寒", "脉细欲绝", "血虚寒凝"],
    original: "手足厥寒，脉细欲绝者，当归四逆汤主之。"
  },
  {
    id: "zhigancao",
    name: "炙甘草汤",
    alias: ["复脉汤"],
    source: "《伤寒论》",
    composition: [
      { herb: "甘草", dosage: "四两炙" },
      { herb: "生姜", dosage: "三两切" },
      { herb: "人参", dosage: "二两" },
      { herb: "生地黄", dosage: "一斤" },
      { herb: "桂枝", dosage: "三两去皮" },
      { herb: "阿胶", dosage: "二两" },
      { herb: "麦门冬", dosage: "半升去心" },
      { herb: "麻仁", dosage: "半升" },
      { herb: "大枣", dosage: "三十枚擘" }
    ],
    preparation: "上九味，以清酒七升，水八升，先煮八味，取三升，去滓，内胶烊消尽，温服一升，日三服。",
    indication: "脉结代，心动悸",
    syndrome: ["脉结代", "心动悸", "气血两虚"],
    original: "伤寒脉结代，心动悸，炙甘草汤主之。"
  },
  {
    id: "dingxiangshidi",
    name: "橘皮竹茹汤",
    source: "《金匮要略》",
    composition: [
      { herb: "橘皮", dosage: "二升" },
      { herb: "竹茹", dosage: "二升" },
      { herb: "大枣", dosage: "三十枚" },
      { herb: "生姜", dosage: "半斤" },
      { herb: "甘草", dosage: "五两" },
      { herb: "人参", dosage: "一两" }
    ],
    preparation: "上六味，以水一斗，煮取三升，温服一升，日三服。",
    indication: "胃虚有热，呃逆不止",
    syndrome: ["呃逆", "胃虚", "虚热"],
    original: "哕逆者，橘皮竹茹汤主之。"
  },
  {
    id: "xiaochaihu",
    name: "柴胡桂枝汤",
    source: "《伤寒论》",
    composition: [
      { herb: "桂枝", dosage: "一两半去皮" },
      { herb: "芍药", dosage: "一两半" },
      { herb: "黄芩", dosage: "一两半" },
      { herb: "人参", dosage: "一两半" },
      { herb: "甘草", dosage: "一两炙" },
      { herb: "半夏", dosage: "二合半洗" },
      { herb: "大枣", dosage: "六枚擘" },
      { herb: "生姜", dosage: "一两半切" },
      { herb: "柴胡", dosage: "四两" }
    ],
    preparation: "上九味，以水七升，煮取三升，去滓，温服一升。",
    indication: "太阳少阳合病，发热微恶寒，支节烦疼",
    syndrome: ["太少合病", "发热", "恶寒", "肢节烦疼"],
    original: "伤寒六七日，发热微恶寒，支节烦疼，微呕，心下支结，外证未去者，柴胡桂枝汤主之。"
  },
  {
    id: "xiexin",
    name: "甘草泻心汤",
    source: "《伤寒论》",
    composition: [
      { herb: "甘草", dosage: "四两炙" },
      { herb: "黄芩", dosage: "三两" },
      { herb: "干姜", dosage: "三两" },
      { herb: "半夏", dosage: "半升洗" },
      { herb: "大枣", dosage: "十二枚擘" },
      { herb: "黄连", dosage: "一两" }
    ],
    preparation: "上六味，以水一斗，煮取六升，去滓，再煎取三升，温服一升，日三服。",
    indication: "胃气虚弱，心下痞硬，干呕心烦",
    syndrome: ["心下痞", "干呕", "心烦", "下利"],
    original: "伤寒中风，医反下之，其人下利日数十行，谷不化，腹中雷鸣，心下痞硬而满，干呕心烦不得安。医见心下痞，谓病不尽，复下之，其痞益甚，此非结热，但以胃中虚，客气上逆，故使硬也，甘草泻心汤主之。"
  },
  {
    id: "shengjiang",
    name: "生姜泻心汤",
    source: "《伤寒论》",
    composition: [
      { herb: "生姜", dosage: "四两切" },
      { herb: "甘草", dosage: "三两炙" },
      { herb: "人参", dosage: "三两" },
      { herb: "干姜", dosage: "一两" },
      { herb: "黄芩", dosage: "三两" },
      { herb: "半夏", dosage: "半升洗" },
      { herb: "黄连", dosage: "一两" },
      { herb: "大枣", dosage: "十二枚擘" }
    ],
    preparation: "上八味，以水一斗，煮取六升，去滓，再煎取三升，温服一升，日三服。",
    indication: "水热互结，心下痞硬，干噫食臭",
    syndrome: ["心下痞", "干噫食臭", "腹中雷鸣", "下利"],
    original: "伤寒汗出解之后，胃中不和，心下痞硬，干噫食臭，胁下有水气，腹中雷鸣，下利者，生姜泻心汤主之。"
  },
  {
    id: "fuling",
    name: "茯苓甘草汤",
    source: "《伤寒论》",
    composition: [
      { herb: "茯苓", dosage: "二两" },
      { herb: "桂枝", dosage: "二两去皮" },
      { herb: "甘草", dosage: "一两炙" },
      { herb: "生姜", dosage: "三两切" }
    ],
    preparation: "上四味，以水四升，煮取二升，去滓，分温三服。",
    indication: "心下悸，欲得按",
    syndrome: ["心下悸", "水停心下"],
    original: "伤寒汗出而渴者，五苓散主之；不渴者，茯苓甘草汤主之。"
  },
  {
    id: "lingguizhugan",
    name: "苓桂术甘汤",
    source: "《金匮要略》",
    composition: [
      { herb: "茯苓", dosage: "四两" },
      { herb: "桂枝", dosage: "三两去皮" },
      { herb: "白术", dosage: "三两" },
      { herb: "甘草", dosage: "二两炙" }
    ],
    preparation: "上四味，以水六升，煮取三升，去滓，分温三服。",
    indication: "心下逆满，气上冲胸，起则头眩",
    syndrome: ["心下逆满", "气上冲胸", "头眩", "脉沉紧"],
    original: "心下有痰饮，胸胁支满，目眩，苓桂术甘汤主之。"
  },
  {
    id: "guizhiganjiang",
    name: "桂枝甘草汤",
    source: "《伤寒论》",
    composition: [
      { herb: "桂枝", dosage: "四两去皮" },
      { herb: "甘草", dosage: "二两炙" }
    ],
    preparation: "上二味，以水三升，煮取一升，去滓，顿服。",
    indication: "发汗过多，其人叉手自冒心，心下悸欲得按",
    syndrome: ["心悸", "欲得按", "心阳不足"],
    original: "发汗过多，其人叉手自冒心，心下悸，欲得按者，桂枝甘草汤主之。"
  },
  {
    id: "wuzhuyu",
    name: "吴茱萸汤",
    source: "《伤寒论》",
    composition: [
      { herb: "吴茱萸", dosage: "一升洗" },
      { herb: "人参", dosage: "三两" },
      { herb: "生姜", dosage: "六两切" },
      { herb: "大枣", dosage: "十二枚擘" }
    ],
    preparation: "上四味，以水七升，煮取二升，去滓，温服七合，日三服。",
    indication: "食谷欲呕，属阳明也，吴茱萸汤主之",
    syndrome: ["呕吐", "头痛", "肝胃虚寒", "吐涎沫"],
    original: "食谷欲呕，属阳明也，吴茱萸汤主之。得汤反剧者，属上焦也。"
  },
  {
    id: "xiaoqinglong",
    name: "小青龙汤",
    source: "《伤寒论》",
    composition: [
      { herb: "麻黄", dosage: "三两去节" },
      { herb: "芍药", dosage: "三两" },
      { herb: "细辛", dosage: "三两" },
      { herb: "干姜", dosage: "三两" },
      { herb: "甘草", dosage: "三两炙" },
      { herb: "桂枝", dosage: "三两去皮" },
      { herb: "五味子", dosage: "半升" },
      { herb: "半夏", dosage: "半升洗" }
    ],
    preparation: "上八味，以水一斗，先煮麻黄减二升，去上沫，内诸药，煮取三升，去滓，温服一升。",
    indication: "伤寒表不解，心下有水气，干呕发热而咳",
    syndrome: ["外寒内饮", "咳嗽", "喘息", "痰多清稀"],
    original: "伤寒表不解，心下有水气，干呕，发热而咳，或渴，或利，或噎，或小便不利，少腹满，或喘者，小青龙汤主之。"
  },
  {
    id: "zhuye",
    name: "竹叶石膏汤",
    source: "《伤寒论》",
    composition: [
      { herb: "竹叶", dosage: "二把" },
      { herb: "石膏", dosage: "一斤" },
      { herb: "半夏", dosage: "半升洗" },
      { herb: "麦门冬", dosage: "一升去心" },
      { herb: "人参", dosage: "二两" },
      { herb: "甘草", dosage: "二两炙" },
      { herb: "粳米", dosage: "半升" }
    ],
    preparation: "上七味，以水一斗，煮取六升，去滓，内粳米，煮米熟，汤成，去米，温服一升，日三服。",
    indication: "伤寒解后，虚羸少气，气逆欲吐",
    syndrome: ["热病后期", "气阴两伤", "虚烦", "呕逆"],
    original: "伤寒解后，虚羸少气，气逆欲吐，竹叶石膏汤主之。"
  }
]

// 本草数据结构
export interface BenCao {
  id: string
  name: string
  alias?: string[]
  nature: string  // 性味
  meridian: string[]  // 归经
  effect: string  // 功效
  indication: string  // 主治
  dosage: string  // 用量
  caution?: string  // 禁忌
  original?: string  // 《本经》原文
}

// 30味核心本草（基于《神农本草经》公有领域）
export const BEN_CAO_DATA: BenCao[] = [
  {
    id: "fuzi",
    name: "附子",
    alias: ["乌头"],
    nature: "辛、甘，大热，有毒",
    meridian: ["心", "肾", "脾"],
    effect: "回阳救逆，补火助阳，散寒止痛",
    indication: "亡阳虚脱，肢冷脉微，阳痿宫冷，心腹冷痛，虚寒吐泻",
    dosage: "3-15g，先煎久煎",
    caution: "阴虚阳亢者忌用，孕妇禁用",
    original: "味辛温。主风寒咳逆邪气，温中，金疮，破症坚积聚，血瘕，寒湿痿躄，拘挛膝痛，不能行步。"
  },
  {
    id: "ganjiang",
    name: "干姜",
    nature: "辛，热",
    meridian: ["脾", "胃", "肾", "心", "肺"],
    effect: "温中散寒，回阳通脉，温肺化饮",
    indication: "脘腹冷痛，呕吐泄泻，亡阳厥逆，寒饮喘咳",
    dosage: "3-10g",
    original: "味辛温。主胸满咳逆上气，温中止血，出汗，逐风湿痹，肠澼下利。"
  },
  {
    id: "huanglian",
    name: "黄连",
    nature: "苦，寒",
    meridian: ["心", "脾", "胃", "肝", "胆", "大肠"],
    effect: "清热燥湿，泻火解毒",
    indication: "湿热痞满，呕吐吞酸，泻痢腹痛，高热神昏，心烦不寐，血热吐衄",
    dosage: "2-5g",
    original: "味苦寒。主热气目痛，眦伤泣出，明目，肠澼腹痛下利，妇人阴中肿痛。"
  },
  {
    id: "dahuang",
    name: "大黄",
    alias: ["将军"],
    nature: "苦，寒",
    meridian: ["脾", "胃", "大肠", "肝", "心包"],
    effect: "泻下攻积，清热泻火，凉血解毒，逐瘀通经",
    indication: "实热便秘，积滞腹痛，泻痢不爽，湿热黄疸，血热吐衄，目赤咽肿",
    dosage: "3-15g，后下",
    caution: "孕妇及月经期、哺乳期慎用",
    original: "味苦寒。主下瘀血，血闭寒热，破症瘕积聚，留饮宿食，荡涤肠胃，推陈致新，通利水谷，调中化食，安和五脏。"
  },
  {
    id: "renshen",
    name: "人参",
    alias: ["棒槌"],
    nature: "甘、微苦，微温",
    meridian: ["脾", "肺", "心", "肾"],
    effect: "大补元气，复脉固脱，补脾益肺，生津养血，安神益智",
    indication: "体虚欲脱，肢冷脉微，脾虚食少，肺虚喘咳，津伤口渴，内热消渴",
    dosage: "3-9g，另煎兑服",
    caution: "实证、热证忌用，不宜与藜芦同用",
    original: "味甘微寒。主补五脏，安精神，定魂魄，止惊悸，除邪气，明目，开心益智。"
  },
  {
    id: "guizhi",
    name: "桂枝",
    nature: "辛、甘，温",
    meridian: ["心", "肺", "膀胱"],
    effect: "发汗解肌，温通经脉，助阳化气，平冲降逆",
    indication: "风寒感冒，脘腹冷痛，血寒经闭，关节痹痛，痰饮水肿，心悸奔豚",
    dosage: "3-10g",
    original: "味辛温。主上气咳逆，结气喉痹吐吸，利关节，补中益气。"
  },
  {
    id: "mahuang",
    name: "麻黄",
    nature: "辛、微苦，温",
    meridian: ["肺", "膀胱"],
    effect: "发汗散寒，宣肺平喘，利水消肿",
    indication: "风寒感冒，胸闷喘咳，风水浮肿，风湿痹痛，阴疽痰核",
    dosage: "2-10g",
    caution: "体虚自汗、盗汗及虚喘者忌用",
    original: "味苦温。主中风伤寒头痛，温疟，发表出汗，去邪热气，止咳逆上气，除寒热，破症坚积聚。"
  },
  {
    id: "gancao",
    name: "甘草",
    alias: ["国老"],
    nature: "甘，平",
    meridian: ["心", "肺", "脾", "胃"],
    effect: "补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药",
    indication: "脾胃虚弱，倦怠乏力，心悸气短，咳嗽痰多，脘腹四肢挛急疼痛，痈肿疮毒",
    dosage: "2-10g",
    caution: "不宜与海藻、甘遂、大戟、芫花同用",
    original: "味甘平。主五脏六腑寒热邪气，坚筋骨，长肌肉，倍力，金疮肿，解毒。"
  },
  {
    id: "shengdi",
    name: "生地黄",
    nature: "甘、苦，寒",
    meridian: ["心", "肝", "肾"],
    effect: "清热凉血，养阴生津",
    indication: "热入营血，温毒发斑，吐血衄血，热病伤阴，舌绛烦渴，津伤便秘，阴虚发热",
    dosage: "10-15g",
    original: "味甘寒。主折跌绝筋，伤中，逐血痹，填骨髓，长肌肉，作汤除寒热积聚，除痹。"
  },
  {
    id: "huangqi",
    name: "黄芪",
    nature: "甘，微温",
    meridian: ["脾", "肺"],
    effect: "补气升阳，固表止汗，利水消肿，生津养血，行滞通痹，托毒排脓，敛疮生肌",
    indication: "气虚乏力，食少便溏，中气下陷，久泻脱肛，便血崩漏，表虚自汗，气虚水肿",
    dosage: "9-30g",
    original: "味甘微温。主痈疽久败疮，排脓止痛，大风癞疾，五痔鼠瘘，补虚，小儿百病。"
  },
  {
    id: "dangui",
    name: "当归",
    nature: "甘、辛，温",
    meridian: ["肝", "心", "脾"],
    effect: "补血活血，调经止痛，润肠通便",
    indication: "血虚萎黄，眩晕心悸，月经不调，经闭痛经，虚寒腹痛，肠燥便秘，风湿痹痛",
    dosage: "6-12g",
    original: "味甘温。主咳逆上气，温疟寒热洗洗在皮肤中，妇人漏下绝子，诸恶疮疡金疮，煮饮之。"
  },
  {
    id: "baishao",
    name: "白芍",
    alias: ["芍药"],
    nature: "苦、酸，微寒",
    meridian: ["肝", "脾"],
    effect: "养血调经，敛阴止汗，柔肝止痛，平抑肝阳",
    indication: "血虚萎黄，月经不调，自汗盗汗，胁痛腹痛，四肢挛痛，头痛眩晕",
    dosage: "6-15g",
    original: "味苦平。主邪气腹痛，除血痹，破坚积寒热，疝瘕，止痛，利小便，益气。"
  },
  {
    id: "chaihu",
    name: "柴胡",
    nature: "辛、苦，微寒",
    meridian: ["肝", "胆", "肺"],
    effect: "疏散退热，疏肝解郁，升举阳气",
    indication: "感冒发热，寒热往来，胸胁胀痛，月经不调，子宫脱垂，脱肛",
    dosage: "3-10g",
    original: "味苦平。主心腹，去肠胃中结气，饮食积聚，寒热邪气，推陈致新。"
  },
  {
    id: "huangqin",
    name: "黄芩",
    nature: "苦，寒",
    meridian: ["肺", "胆", "脾", "大肠", "小肠"],
    effect: "清热燥湿，泻火解毒，止血安胎",
    indication: "湿温暑湿，胸闷呕恶，湿热痞满，泻痢黄疸，肺热咳嗽，高热烦渴，血热吐衄",
    dosage: "3-10g",
    original: "味苦平。主诸热黄疸，肠澼泄利，逐水，下血闭，恶疮疽蚀，火疡。"
  },
  {
    id: "banxia",
    name: "半夏",
    nature: "辛，温，有毒",
    meridian: ["脾", "胃", "肺"],
    effect: "燥湿化痰，降逆止呕，消痞散结",
    indication: "湿痰寒痰，咳喘痰多，痰饮眩悸，风痰眩晕，痰厥头痛，呕吐反胃，胸脘痞闷，梅核气",
    dosage: "3-10g",
    caution: "阴虚燥咳、血证、热痰、燥痰禁用",
    original: "味辛平。主伤寒寒热，心下坚，下气，喉咽肿痛，头眩胸张，咳逆肠鸣，止汗。"
  },
  {
    id: "fuling",
    name: "茯苓",
    nature: "甘、淡，平",
    meridian: ["心", "肺", "脾", "肾"],
    effect: "利水渗湿，健脾宁心",
    indication: "水肿尿少，痰饮眩悸，脾虚食少，便溏泄泻，心神不安，惊悸失眠",
    dosage: "10-15g",
    original: "味甘平。主胸胁逆气，忧恚惊邪恐悸，心下结痛，寒热烦满咳逆，口焦舌干，利小便。"
  },
  {
    id: "baizhu",
    name: "白术",
    nature: "苦、甘，温",
    meridian: ["脾", "胃"],
    effect: "健脾益气，燥湿利水，止汗安胎",
    indication: "脾虚食少，腹胀泄泻，痰饮眩悸，水肿，自汗，胎动不安",
    dosage: "6-12g",
    original: "味苦温。主风寒湿痹，死肌，痉疸，止汗，除热，消食，作煎饵。"
  },
  {
    id: "zexie",
    name: "泽泻",
    nature: "甘，寒",
    meridian: ["肾", "膀胱"],
    effect: "利水渗湿，泄热，化浊降脂",
    indication: "小便不利，水肿胀满，泄泻尿少，痰饮眩晕，热淋涩痛，高脂血症",
    dosage: "6-10g",
    original: "味甘寒。主风寒湿痹，乳难，消水，养五脏，益气力，肥健。"
  },
  {
    id: "gegen",
    name: "葛根",
    nature: "甘、辛，凉",
    meridian: ["脾", "胃", "肺"],
    effect: "解肌退热，透疹，生津止渴，升阳止泻",
    indication: "表证发热，项背强痛，麻疹不透，热病口渴，阴虚消渴，热泻热痢，脾虚泄泻",
    dosage: "10-15g",
    original: "味甘平。主消渴，身大热，呕吐，诸痹，起阴气，解诸毒。"
  },
  {
    id: "shigao",
    name: "石膏",
    nature: "甘、辛，大寒",
    meridian: ["肺", "胃"],
    effect: "生用清热泻火，除烦止渴；煅用收敛生肌",
    indication: "外感热病，高热烦渴，肺热喘咳，胃火牙痛，头痛，煅后治疮疡不敛，湿疹瘙痒，水火烫伤",
    dosage: "15-60g，先煎",
    original: "味辛微寒。主中风寒热，心下逆气惊喘，口干苦焦，不能息，腹中坚痛，产乳，金疮。"
  },
  {
    id: "zhimu",
    name: "知母",
    nature: "苦、甘，寒",
    meridian: ["肺", "胃", "肾"],
    effect: "清热泻火，滋阴润燥",
    indication: "外感热病，高热烦渴，肺热燥咳，骨蒸潮热，内热消渴，肠燥便秘",
    dosage: "6-12g",
    original: "味苦寒。主消渴热中，除邪气肢体浮肿，下水，补不足，益气。"
  },
  {
    id: "xixin",
    name: "细辛",
    nature: "辛，温",
    meridian: ["心", "肺", "肾"],
    effect: "解表散寒，祛风止痛，通窍，温肺化饮",
    indication: "风寒感冒，头痛牙痛，鼻塞鼻渊，风湿痹痛，痰饮咳喘",
    dosage: "1-3g",
    caution: "气虚多汗、阴虚阳亢者忌用",
    original: "味辛温。主咳逆，头痛脑动，百节拘挛，风湿痹痛，死肌。"
  },
  {
    id: "wuweizi",
    name: "五味子",
    nature: "酸、甘，温",
    meridian: ["肺", "心", "肾"],
    effect: "收敛固涩，益气生津，补肾宁心",
    indication: "久嗽虚喘，梦遗滑精，遗尿尿频，久泻不止，自汗盗汗，津伤口渴，内热消渴，心悸失眠",
    dosage: "2-6g",
    original: "味酸温。主益气，咳逆上气，劳伤羸瘦，补不足，强阴，益男子精。"
  },
  {
    id: "wuzhuyu",
    name: "吴茱萸",
    nature: "辛、苦，热，有小毒",
    meridian: ["肝", "脾", "胃", "肾"],
    effect: "散寒止痛，降逆止呕，助阳止泻",
    indication: "厥阴头痛，寒疝腹痛，寒湿脚气，经行腹痛，脘腹胀痛，呕吐吞酸，五更泄泻",
    dosage: "2-5g",
    caution: "阴虚有热者忌用",
    original: "味辛温。主温中下气，止痛，咳逆寒热，除湿血痹，逐风邪，开腠理。"
  },
  {
    id: "chuanxiong",
    name: "川芎",
    nature: "辛，温",
    meridian: ["肝", "胆", "心包"],
    effect: "活血行气，祛风止痛",
    indication: "胸痹心痛，胸胁刺痛，跌扑肿痛，月经不调，经闭痛经，产后瘀痛，头痛，风湿痹痛",
    dosage: "3-10g",
    original: "味辛温。主中风入脑头痛，寒痹筋挛缓急，金疮，妇人血闭无子。"
  },
  {
    id: "huangbai",
    name: "黄柏",
    nature: "苦，寒",
    meridian: ["肾", "膀胱", "大肠"],
    effect: "清热燥湿，泻火除蒸，解毒疗疮",
    indication: "湿热泻痢，黄疸尿赤，带下阴痒，热淋涩痛，脚气痿蹙，骨蒸劳热，盗汗遗精，疮疡肿毒",
    dosage: "3-12g",
    original: "味苦寒。主五脏肠胃中结热，黄疸，肠痔，止泻利，女子漏下赤白，阴伤蚀疮。"
  },
  {
    id: "ejiao",
    name: "阿胶",
    nature: "甘，平",
    meridian: ["肺", "肝", "肾"],
    effect: "补血滋阴，润燥止血",
    indication: "血虚萎黄，眩晕心悸，肌痿无力，心烦不眠，虚风内动，肺燥咳嗽，劳嗽咯血，吐血尿血",
    dosage: "3-9g，烊化兑服",
    original: "味甘平。主心腹内崩，劳极洒洒如疟状，腰腹痛，四肢酸疼，女子下血，安胎。"
  },
  {
    id: "maidong",
    name: "麦门冬",
    alias: ["麦冬"],
    nature: "甘、微苦，微寒",
    meridian: ["心", "肺", "胃"],
    effect: "养阴生津，润肺清心",
    indication: "肺燥干咳，阴虚痨嗽，喉痹咽痛，津伤口渴，内热消渴，心烦失眠，肠燥便秘",
    dosage: "6-12g",
    original: "味甘平。主心腹结气，伤中伤饱，胃络脉绝，羸瘦短气。"
  },
  {
    id: "xingren",
    name: "杏仁",
    nature: "苦，微温，有小毒",
    meridian: ["肺", "大肠"],
    effect: "降气止咳平喘，润肠通便",
    indication: "咳嗽气喘，胸满痰多，血虚津枯，肠燥便秘",
    dosage: "5-10g，后下",
    caution: "阴虚咳嗽及大便溏泻者禁用",
    original: "味甘温。主咳逆上气雷鸣，喉痹下气，产乳金疮，寒心奔豚。"
  },
  {
    id: "dazao",
    name: "大枣",
    nature: "甘，温",
    meridian: ["脾", "胃", "心"],
    effect: "补中益气，养血安神，缓和药性",
    indication: "脾虚食少，乏力便溏，妇人脏躁",
    dosage: "6-15g",
    original: "味甘平。主心腹邪气，安中养脾，助十二经，平胃气，通九窍，补少气少津液，身中不足，大惊，四肢重，和百药。"
  }
]

// 搜索经方（支持方名、症状、辨证关键词）
export function searchJingFang(keyword: string): JingFang[] {
  const lowerKeyword = keyword.toLowerCase()
  return JING_FANG_DATA.filter(fang => {
    return (
      fang.name.includes(keyword) ||
      fang.indication.includes(keyword) ||
      fang.syndrome.some(s => s.includes(keyword)) ||
      fang.original.includes(keyword) ||
      (fang.alias && fang.alias.some(a => a.includes(keyword))) ||
      fang.composition.some(c => c.herb.includes(keyword))
    )
  })
}

// 搜索本草
export function searchBenCao(keyword: string): BenCao[] {
  return BEN_CAO_DATA.filter(herb => {
    return (
      herb.name.includes(keyword) ||
      herb.effect.includes(keyword) ||
      herb.indication.includes(keyword) ||
      (herb.alias && herb.alias.some(a => a.includes(keyword))) ||
      herb.meridian.some(m => m.includes(keyword))
    )
  })
}
