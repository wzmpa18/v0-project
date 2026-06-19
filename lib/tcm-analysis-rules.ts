export interface TcmAnalysisRule {
  id: string
  title: string
  content: string
  sourceRefs: string[]
}

export const TCM_ANALYSIS_RULES: Record<string, TcmAnalysisRule> = {
  "ai-tongue": {
    id: "ai-tongue",
    title: "舌诊分析结果",
    content:
      "【舌诊分析结果】\n\n舌质：淡红\n舌苔：薄白\n舌形：正常\n\n【辨证提示】\n此舌象提示气血调和，脏腑功能正常。若有不适，建议结合其他四诊综合判断。\n\n【调理建议】\n1. 饮食清淡，避免辛辣油腻\n2. 作息规律，避免熬夜\n3. 适当运动，增强体质\n\n【古籍参考】\n《伤寒论》：\"舌上白滑苔者，里寒也。\"\n《温病条辨》：\"舌绛而干，当滋阴清热。\"",
    sourceRefs: ["《伤寒论》", "《温病条辨》"],
  },
  "ai-constitution": {
    id: "ai-constitution",
    title: "体质检测结果",
    content:
      "【体质检测结果】\n\n主要体质：气虚质（65%）\n兼夹体质：阳虚质（20%）、痰湿质（15%）\n\n【体质特征】\n- 容易疲劳，气短懒言\n- 容易感冒，抵抗力较弱\n- 舌淡红，边有齿痕\n\n【调理方案】\n1. 食疗：山药、黄芪、党参炖鸡\n2. 运动：八段锦、太极拳\n3. 穴位：足三里、气海、关元\n\n【推荐方剂】\n四君子汤加减：人参、白术、茯苓、甘草",
    sourceRefs: ["《中医体质分类与判定》"],
  },
  "ai-face": {
    id: "ai-face",
    title: "面诊分析结果",
    content:
      "【面诊分析结果】\n\n面色：偏白\n眼周：略有青黑\n唇色：淡红\n\n【脏腑提示】\n- 面白无华提示气血不足\n- 眼周青黑提示肾气不足或睡眠不佳\n- 唇色淡提示脾胃虚弱\n\n【调理建议】\n1. 补益气血：当归、黄芪、枸杞泡茶\n2. 改善睡眠：酸枣仁、远志、茯神\n3. 健脾养胃：四神汤（山药、芡实、莲子、茯苓）\n\n【穴位推荐】\n三阴交、血海、足三里",
    sourceRefs: ["《黄帝内经》"],
  },
  "ai-pulse": {
    id: "ai-pulse",
    title: "脉象分析结果",
    content:
      "【脉象分析结果】\n\n脉位：中取\n脉率：正常（约72次/分）\n脉象特征：弦细\n\n【辨证分析】\n弦脉主肝胆病、痛证、痰饮\n细脉主气血两虚、湿证\n\n【可能证型】\n肝郁气滞兼气血不足\n\n【建议方剂】\n逍遥散加减：柴胡、当归、白芍、白术、茯苓、甘草、薄荷、生姜\n\n【古籍参考】\n《濒湖脉学》：\"弦脉端直以长，如按琴弦。\"",
    sourceRefs: ["《濒湖脉学》"],
  },
}
