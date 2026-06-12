// 3D人体经络穴位坐标数据库 - 基于标准人体比例
// 坐标系：Y轴向上，X轴左右，Z轴前后
// 人体高度约1.8单位，中心在原点

export interface Acupoint3D {
  id: string
  name: string
  meridian: string
  position: [number, number, number]  // [x, y, z]
  depth: number  // 针刺深度（mm）
  caiXueMethod: string  // 采穴方法
  symptoms: string[]  // 主治症状
  technique: string  // 针刺手法
}

export interface MeridianPath3D {
  id: string
  name: string
  color: string
  points: [number, number, number][]  // 经络路径3D坐标
  acupoints: string[]  // 该经络上的穴位ID列表
}

// 人体关键3D坐标（用于构建3D模型）
export const BODY_LANDMARKS = {
  headTop: [0, 0.9, 0] as [number, number, number],
  forehead: [0, 0.78, 0.05] as [number, number, number],
  nose: [0, 0.7, 0.08] as [number, number, number],
  chin: [0, 0.58, 0.06] as [number, number, number],
  neck: [0, 0.5, 0] as [number, number, number],
  chest: [0, 0.35, 0.08] as [number, number, number],
  abdomen: [0, 0.15, 0.06] as [number, number, number],
  navel: [0, 0.05, 0.07] as [number, number, number],
  pubis: [0, -0.15, 0.05] as [number, number, number],
  // 肩部
  leftShoulder: [-0.22, 0.42, 0] as [number, number, number],
  rightShoulder: [0.22, 0.42, 0] as [number, number, number],
  // 肘部
  leftElbow: [-0.25, 0.15, 0.03] as [number, number, number],
  rightElbow: [0.25, 0.15, 0.03] as [number, number, number],
  // 手腕
  leftWrist: [-0.22, -0.15, 0.05] as [number, number, number],
  rightWrist: [0.22, -0.15, 0.05] as [number, number, number],
  // 手指
  leftHand: [-0.22, -0.28, 0.05] as [number, number, number],
  rightHand: [0.22, -0.28, 0.05] as [number, number, number],
  // 髋部
  leftHip: [-0.12, -0.18, 0.02] as [number, number, number],
  rightHip: [0.12, -0.18, 0.02] as [number, number, number],
  // 膝部
  leftKnee: [-0.13, -0.48, 0.05] as [number, number, number],
  rightKnee: [0.13, -0.48, 0.05] as [number, number, number],
  // 踝部
  leftAnkle: [-0.12, -0.78, 0.03] as [number, number, number],
  rightAnkle: [0.12, -0.78, 0.03] as [number, number, number],
  // 足部
  leftFoot: [-0.12, -0.9, 0.05] as [number, number, number],
  rightFoot: [0.12, -0.9, 0.05] as [number, number, number],
  // 背部
  upperBack: [0, 0.4, -0.1] as [number, number, number],
  midBack: [0, 0.2, -0.12] as [number, number, number],
  lowerBack: [0, 0, -0.1] as [number, number, number],
  sacrum: [0, -0.2, -0.08] as [number, number, number],
}

// 经络3D路径
export const MERIDIAN_PATHS_3D: MeridianPath3D[] = [
  // 手太阴肺经 - 手臂内侧前缘
  {
    id: "LU",
    name: "手太阴肺经",
    color: "#FFD700",
    points: [
      [0.08, 0.38, 0.08],   // 中府
      [-0.1, 0.4, 0.06],
      [-0.18, 0.35, 0.05],
      [-0.22, 0.25, 0.04],
      [-0.24, 0.15, 0.04],   // 尺泽
      [-0.23, 0.05, 0.04],
      [-0.22, -0.05, 0.04],  // 列缺
      [-0.22, -0.12, 0.04],  // 太渊
      [-0.22, -0.18, 0.04],  // 鱼际
      [-0.22, -0.25, 0.04],  // 少商
    ],
    acupoints: ["LU-zhongfu", "LU-chize", "LU-lieque", "LU-taiyuan", "LU-yuji", "LU-shaoshang"]
  },
  // 手阳明大肠经 - 手臂外侧前缘
  {
    id: "LI",
    name: "手阳明大肠经",
    color: "#FFA500",
    points: [
      [-0.22, -0.25, 0.02],  // 商阳
      [-0.23, -0.15, 0.01],
      [-0.25, -0.05, 0.01],  // 合谷
      [-0.26, 0.05, 0.01],
      [-0.25, 0.15, 0.01],   // 曲池
      [-0.22, 0.25, 0.01],
      [-0.18, 0.35, 0.01],
      [-0.1, 0.42, 0.01],    // 肩髃
      [-0.05, 0.5, 0.04],
      [0, 0.55, 0.06],
      [0.02, 0.65, 0.08],    // 迎香
    ],
    acupoints: ["LI-shangyang", "LI-hegu", "LI-quchi", "LI-jianyu", "LI-yingxiang"]
  },
  // 足阳明胃经 - 面、胸、腹、腿前侧
  {
    id: "ST",
    name: "足阳明胃经",
    color: "#FFD700",
    points: [
      [0.02, 0.72, 0.08],    // 承泣
      [0.03, 0.68, 0.07],    // 四白
      [0.04, 0.62, 0.06],    // 地仓
      [0.06, 0.55, 0.05],    // 颊车
      [0.02, 0.5, 0.04],     // 人迎
      [0.04, 0.38, 0.08],    // 缺盆
      [0.06, 0.3, 0.09],     // 乳中
      [0.06, 0.2, 0.08],
      [0.06, 0.1, 0.08],
      [0.06, 0.0, 0.08],     // 天枢
      [0.06, -0.1, 0.07],
      [0.08, -0.15, 0.06],
      [0.1, -0.25, 0.05],
      [0.12, -0.35, 0.05],   // 伏兔
      [0.12, -0.42, 0.05],   // 梁丘
      [0.13, -0.48, 0.05],   // 犊鼻
      [0.12, -0.55, 0.05],   // 足三里
      [0.12, -0.62, 0.04],
      [0.12, -0.7, 0.04],    // 解溪
      [0.12, -0.78, 0.04],
      [0.12, -0.85, 0.04],   // 内庭
      [0.12, -0.9, 0.04],    // 厉兑
    ],
    acupoints: ["ST-chengqi", "ST-sibai", "ST-dicang", "ST-jiache", "ST-tianshu", "ST-zusanli", "ST-jiexi", "ST-neiting", "ST-lidui"]
  },
  // 足太阴脾经 - 腿内侧前缘
  {
    id: "SP",
    name: "足太阴脾经",
    color: "#8B4513",
    points: [
      [-0.1, -0.9, 0.04],    // 隐白
      [-0.1, -0.82, 0.04],
      [-0.1, -0.75, 0.04],
      [-0.1, -0.68, 0.04],   // 三阴交
      [-0.1, -0.6, 0.04],
      [-0.1, -0.52, 0.04],   // 阴陵泉
      [-0.1, -0.42, 0.04],   // 血海
      [-0.09, -0.3, 0.04],
      [-0.08, -0.2, 0.05],
      [-0.06, -0.1, 0.06],
      [-0.04, 0.0, 0.06],    // 大横
      [-0.03, 0.1, 0.06],
      [-0.02, 0.2, 0.07],
      [0, 0.3, 0.08],        // 大包
    ],
    acupoints: ["SP-yinbai", "SP-sanyinjiao", "SP-yinlingquan", "SP-xuehai", "SP-daheng", "SP-dabao"]
  },
  // 手少阴心经 - 手臂内侧后缘
  {
    id: "HT",
    name: "手少阴心经",
    color: "#FF0000",
    points: [
      [0.04, 0.38, 0.06],    // 极泉
      [-0.15, 0.35, 0.04],
      [-0.2, 0.25, 0.04],
      [-0.24, 0.15, 0.03],   // 少海
      [-0.25, 0.05, 0.03],
      [-0.24, -0.05, 0.03],  // 神门
      [-0.23, -0.12, 0.03],
      [-0.23, -0.2, 0.03],   // 少冲
    ],
    acupoints: ["HT-jiquan", "HT-shaohai", "HT-shenmen", "HT-shaochong"]
  },
  // 手太阳小肠经 - 手臂外侧后缘
  {
    id: "SI",
    name: "手太阳小肠经",
    color: "#FF6347",
    points: [
      [-0.23, -0.2, 0.0],    // 少泽
      [-0.25, -0.12, 0.0],
      [-0.26, -0.02, 0.0],
      [-0.26, 0.08, 0.0],
      [-0.25, 0.18, 0.0],    // 小海
      [-0.22, 0.28, 0.0],
      [-0.18, 0.38, 0.0],
      [-0.1, 0.45, 0.0],     // 肩贞
      [-0.05, 0.5, -0.02],
      [0, 0.55, 0.0],
      [0.02, 0.6, 0.02],     // 听宫
    ],
    acupoints: ["SI-shaoze", "SI-xiaohai", "SI-jianzhen", "SI-tinggong"]
  },
  // 足太阳膀胱经 - 背部、腿后侧
  {
    id: "BL",
    name: "足太阳膀胱经",
    color: "#4169E1",
    points: [
      [0.02, 0.78, 0.06],    // 睛明
      [0, 0.75, 0.04],
      [0, 0.65, 0.0],
      [0, 0.55, -0.04],
      [0, 0.45, -0.08],      // 大杼
      [-0.04, 0.38, -0.1],   // 肺俞
      [-0.04, 0.3, -0.1],    // 心俞
      [-0.04, 0.22, -0.1],   // 膈俞
      [-0.04, 0.14, -0.1],   // 肝俞
      [-0.04, 0.06, -0.1],   // 脾俞
      [-0.04, -0.02, -0.1],  // 肾俞
      [-0.04, -0.1, -0.08],
      [-0.06, -0.18, -0.06], // 大肠俞
      [-0.08, -0.25, -0.04],
      [-0.1, -0.35, -0.02],
      [-0.12, -0.45, -0.02], // 委中
      [-0.12, -0.55, -0.02],
      [-0.12, -0.65, -0.02], // 承山
      [-0.12, -0.75, -0.02],
      [-0.12, -0.82, -0.02], // 至阴
    ],
    acupoints: ["BL-jingming", "BL-feishu", "BL-xinshu", "BL-geshu", "BL-ganshu", "BL-pishu", "BL-shenshu", "BL-weizhong", "BL-chengshan", "BL-zhiyin"]
  },
  // 足少阴肾经 - 腿内侧后缘
  {
    id: "KI",
    name: "足少阴肾经",
    color: "#000080",
    points: [
      [-0.08, -0.9, 0.04],   // 涌泉
      [-0.08, -0.82, 0.04],
      [-0.08, -0.75, 0.04],  // 太溪
      [-0.08, -0.65, 0.04],
      [-0.08, -0.55, 0.04],
      [-0.08, -0.45, 0.04],
      [-0.07, -0.35, 0.04],
      [-0.06, -0.25, 0.04],
      [-0.05, -0.15, 0.05],
      [-0.04, -0.05, 0.05],
      [-0.02, 0.05, 0.06],
      [0, 0.15, 0.06],
      [0, 0.25, 0.07],
      [0, 0.35, 0.07],       // 俞府
    ],
    acupoints: ["KI-yongquan", "KI-taixi", "KI-yufu"]
  },
  // 手厥阴心包经 - 手臂内侧中线
  {
    id: "PC",
    name: "手厥阴心包经",
    color: "#8B0000",
    points: [
      [0.06, 0.38, 0.06],    // 天池
      [-0.12, 0.35, 0.05],
      [-0.18, 0.28, 0.04],
      [-0.22, 0.2, 0.04],
      [-0.24, 0.12, 0.04],   // 曲泽
      [-0.24, 0.02, 0.04],   // 内关
      [-0.23, -0.08, 0.04],  // 大陵
      [-0.22, -0.15, 0.04],
      [-0.22, -0.2, 0.04],   // 中冲
    ],
    acupoints: ["PC-tianchi", "PC-quze", "PC-neiguan", "PC-daling", "PC-zhongchong"]
  },
  // 手少阳三焦经 - 手臂外侧中线
  {
    id: "TE",
    name: "手少阳三焦经",
    color: "#9370DB",
    points: [
      [-0.22, -0.2, -0.01],  // 关冲
      [-0.24, -0.1, -0.01],
      [-0.25, 0.0, -0.01],   // 外关
      [-0.25, 0.1, -0.01],
      [-0.24, 0.2, -0.01],
      [-0.2, 0.3, -0.01],
      [-0.15, 0.4, -0.01],
      [-0.08, 0.48, -0.01],  // 肩髎
      [-0.04, 0.52, 0.02],
      [0, 0.58, 0.04],
      [0.02, 0.65, 0.06],
      [0.02, 0.72, 0.06],    // 丝竹空
    ],
    acupoints: ["TE-guanchong", "TE-waiguan", "TE-jianliao", "TE-sizhukong"]
  },
  // 足少阳胆经
  {
    id: "GB",
    name: "足少阳胆经",
    color: "#228B22",
    points: [
      [0.02, 0.72, 0.06],    // 瞳子髎
      [0.06, 0.68, 0.04],
      [0.1, 0.62, 0.02],
      [0.14, 0.55, 0.0],     // 风池
      [0.16, 0.48, 0.0],     // 肩井
      [0.14, 0.38, 0.02],
      [0.12, 0.28, 0.04],
      [0.1, 0.18, 0.05],
      [0.12, 0.08, 0.05],
      [0.14, -0.02, 0.05],
      [0.16, -0.12, 0.05],
      [0.18, -0.2, 0.05],
      [0.18, -0.3, 0.05],
      [0.18, -0.4, 0.05],    // 风市
      [0.16, -0.48, 0.05],   // 阳陵泉
      [0.14, -0.58, 0.04],
      [0.14, -0.68, 0.04],
      [0.14, -0.78, 0.04],   // 丘墟
      [0.14, -0.85, 0.04],
      [0.14, -0.9, 0.04],    // 足窍阴
    ],
    acupoints: ["GB-tongziliao", "GB-fengchi", "GB-jianjing", "GB-fengshi", "GB-yanglingquan", "GB-qiuxu", "GB-zuqiaoyin"]
  },
  // 足厥阴肝经 - 腿内侧中线
  {
    id: "LR",
    name: "足厥阴肝经",
    color: "#006400",
    points: [
      [-0.08, -0.9, 0.04],   // 大敦
      [-0.08, -0.82, 0.04],
      [-0.08, -0.75, 0.04],  // 太冲
      [-0.08, -0.65, 0.04],
      [-0.08, -0.55, 0.04],
      [-0.08, -0.45, 0.04],
      [-0.07, -0.35, 0.04],
      [-0.06, -0.25, 0.04],
      [-0.05, -0.15, 0.05],
      [-0.04, -0.05, 0.05],
      [-0.02, 0.05, 0.06],
      [0, 0.15, 0.06],
      [0, 0.25, 0.07],
      [0.02, 0.35, 0.07],    // 期门
    ],
    acupoints: ["LR-dadun", "LR-taichong", "LR-qimen"]
  },
  // 任脉 - 前正中线
  {
    id: "CV",
    name: "任脉",
    color: "#FF69B4",
    points: [
      [0, -0.15, 0.05],      // 会阴
      [0, -0.08, 0.06],      // 关元
      [0, 0.0, 0.06],        // 气海
      [0, 0.05, 0.07],       // 神阙
      [0, 0.12, 0.07],       // 中脘
      [0, 0.22, 0.07],       // 巨阙
      [0, 0.3, 0.07],        // 膻中
      [0, 0.38, 0.06],
      [0, 0.45, 0.05],       // 天突
      [0, 0.55, 0.05],       // 廉泉
      [0, 0.6, 0.06],        // 承浆
    ],
    acupoints: ["CV-huiyin", "CV-guanyuan", "CV-qihai", "CV-shenque", "CV-zhongwan", "CV-juque", "CV-tanzhong", "CV-tiantu", "CV-lianquan", "CV-chengjiang"]
  },
  // 督脉 - 后正中线
  {
    id: "GV",
    name: "督脉",
    color: "#FF1493",
    points: [
      [0, -0.2, -0.08],      // 长强
      [0, -0.12, -0.1],      // 腰阳关
      [0, -0.04, -0.1],      // 命门
      [0, 0.04, -0.1],       // 脊中
      [0, 0.12, -0.1],       // 至阳
      [0, 0.2, -0.1],        // 身柱
      [0, 0.28, -0.08],      // 大椎
      [0, 0.35, -0.06],
      [0, 0.45, -0.04],      // 风府
      [0, 0.55, 0.0],
      [0, 0.65, 0.02],       // 百会
      [0, 0.72, 0.04],
      [0, 0.75, 0.06],       // 上星
      [0, 0.7, 0.08],        // 水沟
    ],
    acupoints: ["GV-changqiang", "GV-yaoyangguan", "GV-mingmen", "GV-jizhong", "GV-zhiyang", "GV-shenzhu", "GV-dazhui", "GV-fengfu", "GV-baihui", "GV-shangxing", "GV-shuigou"]
  },
]

// 穴位详细信息
export const ACUPOINTS_3D: Acupoint3D[] = [
  // 肺经穴位
  {
    id: "LU-zhongfu", name: "中府", meridian: "LU",
    position: [0.08, 0.38, 0.08], depth: 0.5,
    caiXueMethod: "在胸前壁外上方，云门穴下1寸，平第1肋间隙，距前正中线6寸",
    symptoms: ["咳嗽", "气喘", "胸痛", "肩背痛"],
    technique: "向外斜刺或平刺0.5-0.8寸，不可深刺伤肺脏"
  },
  {
    id: "LU-chize", name: "尺泽", meridian: "LU",
    position: [-0.24, 0.15, 0.04], depth: 1,
    caiXueMethod: "在肘横纹中，肱二头肌腱桡侧凹陷处",
    symptoms: ["咳嗽", "气喘", "咯血", "咽喉肿痛", "肘臂挛痛"],
    technique: "直刺0.8-1.2寸，或点刺出血"
  },
  {
    id: "LU-lieque", name: "列缺", meridian: "LU",
    position: [-0.22, -0.05, 0.04], depth: 0.5,
    caiXueMethod: "在前臂桡侧缘，桡骨茎突上方，腕横纹上1.5寸。两手虎口交叉，一手食指按在另一手桡骨茎突上，指尖下凹陷中",
    symptoms: ["咳嗽", "气喘", "咽喉肿痛", "头痛", "口眼歪斜"],
    technique: "向上斜刺0.3-0.5寸"
  },
  {
    id: "LU-taiyuan", name: "太渊", meridian: "LU",
    position: [-0.22, -0.12, 0.04], depth: 0.3,
    caiXueMethod: "在腕掌侧横纹桡侧，桡动脉搏动处",
    symptoms: ["咳嗽", "气喘", "咯血", "胸痛", "手腕痛"],
    technique: "避开桡动脉，直刺0.3-0.5寸"
  },
  {
    id: "LU-yuji", name: "鱼际", meridian: "LU",
    position: [-0.22, -0.18, 0.04], depth: 0.5,
    caiXueMethod: "在手拇指本节（第1掌指关节）后凹陷处，约当第1掌骨中点桡侧，赤白肉际处",
    symptoms: ["咳嗽", "咯血", "咽喉肿痛", "发热", "失音"],
    technique: "直刺0.5-0.8寸"
  },
  {
    id: "LU-shaoshang", name: "少商", meridian: "LU",
    position: [-0.22, -0.25, 0.04], depth: 0.1,
    caiXueMethod: "在手拇指末节桡侧，距指甲角0.1寸",
    symptoms: ["咽喉肿痛", "鼻衄", "高热", "昏迷", "癫狂"],
    technique: "浅刺0.1寸，或点刺出血"
  },
  // 大肠经穴位
  {
    id: "LI-hegu", name: "合谷", meridian: "LI",
    position: [-0.25, -0.05, 0.01], depth: 0.5,
    caiXueMethod: "在手背，第1、2掌骨之间，当第2掌骨桡侧的中点处。简便取穴：以一手拇指指骨关节横纹，放在另一手拇、食指之间的指蹼缘上，拇指尖下是穴",
    symptoms: ["头痛", "牙痛", "目赤肿痛", "咽喉肿痛", "口眼歪斜", "热病", "无汗", "多汗", "经闭", "滞产"],
    technique: "直刺0.5-1寸"
  },
  {
    id: "LI-quchi", name: "曲池", meridian: "LI",
    position: [-0.25, 0.15, 0.01], depth: 1,
    caiXueMethod: "在肘横纹外侧端，屈肘，当尺泽与肱骨外上髁连线中点",
    symptoms: ["热病", "咽喉肿痛", "牙痛", "目赤痛", "手臂肿痛", "腹痛", "高血压"],
    technique: "直刺1-1.5寸"
  },
  // 胃经穴位
  {
    id: "ST-zusanli", name: "足三里", meridian: "ST",
    position: [0.12, -0.55, 0.05], depth: 1,
    caiXueMethod: "在小腿前外侧，当犊鼻穴下3寸，距胫骨前缘一横指（中指）。简便取穴：外膝眼下四横指，胫骨旁开一横指",
    symptoms: ["胃痛", "呕吐", "腹胀", "泄泻", "便秘", "痢疾", "下肢痿痹", "虚劳羸瘦", "保健要穴"],
    technique: "直刺1-2寸"
  },
  {
    id: "ST-tianshu", name: "天枢", meridian: "ST",
    position: [0.06, 0.0, 0.08], depth: 1,
    caiXueMethod: "在腹中部，平脐中，距脐中2寸",
    symptoms: ["腹痛", "腹胀", "便秘", "泄泻", "痢疾", "月经不调"],
    technique: "直刺1-1.5寸"
  },
  // 脾经穴位
  {
    id: "SP-sanyinjiao", name: "三阴交", meridian: "SP",
    position: [-0.1, -0.68, 0.04], depth: 1,
    caiXueMethod: "在小腿内侧，当足内踝尖上3寸，胫骨内侧缘后方",
    symptoms: ["月经不调", "痛经", "崩漏", "带下", "不孕", "遗精", "阳痿", "遗尿", "失眠", "腹胀", "泄泻"],
    technique: "直刺1-1.5寸"
  },
  {
    id: "SP-xuehai", name: "血海", meridian: "SP",
    position: [-0.1, -0.42, 0.04], depth: 1,
    caiXueMethod: "在大腿内侧，屈膝，髌骨内上缘上2寸，当股四头肌内侧头的隆起处",
    symptoms: ["月经不调", "痛经", "崩漏", "经闭", "湿疹", "荨麻疹", "皮肤瘙痒"],
    technique: "直刺1-1.5寸"
  },
  // 心经穴位
  {
    id: "HT-shenmen", name: "神门", meridian: "HT",
    position: [-0.24, -0.05, 0.03], depth: 0.3,
    caiXueMethod: "在腕部，腕掌侧横纹尺侧端，尺侧腕屈肌腱的桡侧凹陷处",
    symptoms: ["失眠", "心悸", "心烦", "健忘", "癫狂", "胸痛"],
    technique: "直刺0.3-0.5寸"
  },
  // 小肠经
  {
    id: "SI-tinggong", name: "听宫", meridian: "SI",
    position: [0.02, 0.6, 0.02], depth: 0.5,
    caiXueMethod: "在面部，耳屏前，下颌骨髁状突的后方，张口时呈凹陷处",
    symptoms: ["耳鸣", "耳聋", "聤耳", "牙痛"],
    technique: "张口，直刺1-1.5寸"
  },
  // 膀胱经穴位
  {
    id: "BL-weizhong", name: "委中", meridian: "BL",
    position: [-0.12, -0.45, -0.02], depth: 1,
    caiXueMethod: "在腘横纹中点，当股二头肌腱与半腱肌腱的中间",
    symptoms: ["腰痛", "下肢痿痹", "腹痛", "吐泻", "小便不利", "遗尿"],
    technique: "直刺1-1.5寸，或用三棱针点刺腘静脉出血"
  },
  {
    id: "BL-shenshu", name: "肾俞", meridian: "BL",
    position: [-0.04, -0.02, -0.1], depth: 1,
    caiXueMethod: "在腰部，当第2腰椎棘突下，旁开1.5寸",
    symptoms: ["腰痛", "遗精", "遗尿", "阳痿", "月经不调", "耳鸣", "耳聋"],
    technique: "直刺0.5-1寸"
  },
  // 肾经穴位
  {
    id: "KI-yongquan", name: "涌泉", meridian: "KI",
    position: [-0.08, -0.9, 0.04], depth: 0.5,
    caiXueMethod: "在足底部，卷足时足心前部凹陷处，约当足底第2、3趾趾缝纹头端与足跟连线的前1/3与后2/3交点上",
    symptoms: ["头痛", "眩晕", "失眠", "咽喉肿痛", "小便不利", "便秘", "昏厥"],
    technique: "直刺0.5-0.8寸"
  },
  {
    id: "KI-taixi", name: "太溪", meridian: "KI",
    position: [-0.08, -0.75, 0.04], depth: 0.5,
    caiXueMethod: "在足内侧，内踝后方，当内踝尖与跟腱之间的凹陷处",
    symptoms: ["腰痛", "遗精", "遗尿", "月经不调", "咽痛", "耳鸣", "失眠"],
    technique: "直刺0.5-0.8寸"
  },
  // 心包经穴位
  {
    id: "PC-neiguan", name: "内关", meridian: "PC",
    position: [-0.24, 0.02, 0.04], depth: 0.5,
    caiXueMethod: "在前臂掌侧，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间",
    symptoms: ["心痛", "心悸", "胸闷", "胃痛", "呕吐", "失眠", "眩晕", "偏头痛"],
    technique: "直刺0.5-1寸"
  },
  // 胆经穴位
  {
    id: "GB-fengchi", name: "风池", meridian: "GB",
    position: [0.08, 0.55, 0.0], depth: 0.8,
    caiXueMethod: "在项部，当枕骨之下，与风府相平，胸锁乳突肌与斜方肌上端之间的凹陷处",
    symptoms: ["头痛", "眩晕", "感冒", "鼻塞", "耳鸣", "失眠", "目赤肿痛"],
    technique: "针尖微下，向鼻尖方向斜刺0.8-1.2寸，或平刺透风府穴"
  },
  {
    id: "GB-yanglingquan", name: "阳陵泉", meridian: "GB",
    position: [0.16, -0.48, 0.05], depth: 1,
    caiXueMethod: "在小腿外侧，当腓骨头前下方凹陷处",
    symptoms: ["胁痛", "口苦", "呕吐", "黄疸", "下肢痿痹", "膝肿痛"],
    technique: "直刺1-1.5寸"
  },
  // 肝经穴位
  {
    id: "LR-taichong", name: "太冲", meridian: "LR",
    position: [-0.08, -0.75, 0.04], depth: 0.5,
    caiXueMethod: "在足背侧，当第1、2跖骨结合部之前凹陷处",
    symptoms: ["头痛", "眩晕", "目赤肿痛", "胁痛", "月经不调", "痛经", "遗尿", "癫痫"],
    technique: "直刺0.5-0.8寸"
  },
  // 任脉穴位
  {
    id: "CV-guanyuan", name: "关元", meridian: "CV",
    position: [0, -0.08, 0.06], depth: 1,
    caiXueMethod: "在下腹部，前正中线上，当脐中下3寸",
    symptoms: ["遗精", "阳痿", "遗尿", "不孕", "月经不调", "崩漏", "腹痛", "泄泻", "保健要穴"],
    technique: "直刺1-1.5寸"
  },
  {
    id: "CV-qihai", name: "气海", meridian: "CV",
    position: [0, 0.0, 0.06], depth: 1,
    caiXueMethod: "在下腹部，前正中线上，当脐中下1.5寸",
    symptoms: ["腹痛", "腹胀", "泄泻", "便秘", "遗精", "阳痿", "月经不调", "虚劳羸瘦"],
    technique: "直刺1-1.5寸"
  },
  {
    id: "CV-zhongwan", name: "中脘", meridian: "CV",
    position: [0, 0.12, 0.07], depth: 1,
    caiXueMethod: "在上腹部，前正中线上，当脐中上4寸",
    symptoms: ["胃痛", "呕吐", "腹胀", "泄泻", "食欲不振", "黄疸"],
    technique: "直刺1-1.5寸"
  },
  // 督脉穴位
  {
    id: "GV-dazhui", name: "大椎", meridian: "GV",
    position: [0, 0.28, -0.08], depth: 0.5,
    caiXueMethod: "在后正中线上，第7颈椎棘突下凹陷中",
    symptoms: ["感冒", "发热", "咳嗽", "气喘", "头痛", "肩背痛", "癫痫"],
    technique: "向上斜刺0.5-1寸"
  },
  {
    id: "GV-baihui", name: "百会", meridian: "GV",
    position: [0, 0.65, 0.02], depth: 0.5,
    caiXueMethod: "在头顶部，当两耳尖连线的中点处",
    symptoms: ["头痛", "眩晕", "失眠", "健忘", "癫狂", "中风", "脱肛"],
    technique: "平刺0.5-0.8寸"
  },
  {
    id: "GV-mingmen", name: "命门", meridian: "GV",
    position: [0, -0.04, -0.1], depth: 0.5,
    caiXueMethod: "在腰部，当后正中线上，第2腰椎棘突下凹陷中",
    symptoms: ["腰痛", "遗精", "阳痿", "月经不调", "泄泻", "带下"],
    technique: "向上斜刺0.5-1寸"
  },
]

// 脏器3D位置
export interface Organ3D {
  id: string
  name: string
  position: [number, number, number]
  size: [number, number, number]  // width, height, depth
  color: string
  description: string
}

export const ORGANS_3D: Organ3D[] = [
  { id: "brain", name: "脑", position: [0, 0.7, 0], size: [0.14, 0.12, 0.16], color: "#FFB6C1", description: "元神之府" },
  { id: "heart", name: "心", position: [0.02, 0.32, 0.08], size: [0.1, 0.1, 0.08], color: "#FF0000", description: "君主之官" },
  { id: "lungs", name: "肺", position: [0, 0.34, 0.06], size: [0.16, 0.12, 0.1], color: "#FFB6C1", description: "相傅之官" },
  { id: "liver", name: "肝", position: [0.06, 0.26, 0.07], size: [0.08, 0.06, 0.05], color: "#8B0000", description: "将军之官" },
  { id: "spleen", name: "脾", position: [-0.05, 0.22, 0.07], size: [0.06, 0.05, 0.04], color: "#8B4513", description: "仓廪之官" },
  { id: "stomach", name: "胃", position: [0.02, 0.18, 0.07], size: [0.08, 0.1, 0.06], color: "#FFD700", description: "水谷之海" },
  { id: "kidneys", name: "肾", position: [0, -0.02, -0.08], size: [0.06, 0.07, 0.05], color: "#000080", description: "先天之本" },
  { id: "intestines", name: "肠", position: [0, 0.04, 0.06], size: [0.12, 0.15, 0.08], color: "#FFA500", description: "传导之官" },
  { id: "bladder", name: "膀胱", position: [0, -0.12, 0.05], size: [0.06, 0.05, 0.04], color: "#87CEEB", description: "州都之官" },
  { id: "gallbladder", name: "胆", position: [0.08, 0.24, 0.07], size: [0.04, 0.06, 0.04], color: "#228B22", description: "中正之官" },
]

// 骨骼关键点
export interface Bone3D {
  id: string
  name: string
  start: [number, number, number]
  end: [number, number, number]
  thickness: number
  color: string
}

export const BONES_3D: Bone3D[] = [
  { id: "skull", name: "头骨", start: [0, 0.65, 0], end: [0, 0.78, 0], thickness: 0.1, color: "#F5F5DC" },
  { id: "spine", name: "脊柱", start: [0, 0.5, -0.06], end: [0, -0.2, -0.08], thickness: 0.04, color: "#F5F5DC" },
  { id: "left-humerus", name: "左肱骨", start: [-0.22, 0.42, 0], end: [-0.25, 0.15, 0.03], thickness: 0.03, color: "#F5F5DC" },
  { id: "right-humerus", name: "右肱骨", start: [0.22, 0.42, 0], end: [0.25, 0.15, 0.03], thickness: 0.03, color: "#F5F5DC" },
  { id: "left-forearm", name: "左前臂骨", start: [-0.25, 0.15, 0.03], end: [-0.22, -0.15, 0.05], thickness: 0.025, color: "#F5F5DC" },
  { id: "right-forearm", name: "右前臂骨", start: [0.25, 0.15, 0.03], end: [0.22, -0.15, 0.05], thickness: 0.025, color: "#F5F5DC" },
  { id: "left-femur", name: "左股骨", start: [-0.12, -0.18, 0.02], end: [-0.13, -0.48, 0.05], thickness: 0.035, color: "#F5F5DC" },
  { id: "right-femur", name: "右股骨", start: [0.12, -0.18, 0.02], end: [0.13, -0.48, 0.05], thickness: 0.035, color: "#F5F5DC" },
  { id: "left-tibia", name: "左胫骨", start: [-0.13, -0.48, 0.05], end: [-0.12, -0.78, 0.03], thickness: 0.03, color: "#F5F5DC" },
  { id: "right-tibia", name: "右胫骨", start: [0.13, -0.48, 0.05], end: [0.12, -0.78, 0.03], thickness: 0.03, color: "#F5F5DC" },
  { id: "ribs", name: "肋骨", start: [0, 0.28, 0.06], end: [0, 0.22, 0.08], thickness: 0.06, color: "#F5F5DC" },
  { id: "pelvis", name: "骨盆", start: [0, -0.15, 0.02], end: [0, -0.2, 0.02], thickness: 0.08, color: "#F5F5DC" },
]

// 肌肉群
export interface Muscle3D {
  id: string
  name: string
  position: [number, number, number]
  size: [number, number, number]
  color: string
  meridian: string
}

export const MUSCLES_3D: Muscle3D[] = [
  { id: "pecs", name: "胸大肌", position: [0, 0.3, 0.08], size: [0.2, 0.12, 0.04], color: "#FF9999", meridian: "LU" },
  { id: "abs", name: "腹直肌", position: [0, 0.1, 0.07], size: [0.12, 0.2, 0.04], color: "#FF9999", meridian: "ST" },
  { id: "left-biceps", name: "左肱二头肌", position: [-0.24, 0.28, 0.04], size: [0.04, 0.12, 0.04], color: "#FF9999", meridian: "LU" },
  { id: "right-biceps", name: "右肱二头肌", position: [0.24, 0.28, 0.04], size: [0.04, 0.12, 0.04], color: "#FF9999", meridian: "LI" },
  { id: "left-quad", name: "左股四头肌", position: [-0.12, -0.35, 0.06], size: [0.05, 0.15, 0.06], color: "#FF9999", meridian: "ST" },
  { id: "right-quad", name: "右股四头肌", position: [0.12, -0.35, 0.06], size: [0.05, 0.15, 0.06], color: "#FF9999", meridian: "ST" },
  { id: "left-calf", name: "左腓肠肌", position: [-0.12, -0.6, 0.04], size: [0.04, 0.12, 0.05], color: "#FF9999", meridian: "BL" },
  { id: "right-calf", name: "右腓肠肌", position: [0.12, -0.6, 0.04], size: [0.04, 0.12, 0.05], color: "#FF9999", meridian: "BL" },
  { id: "trapezius", name: "斜方肌", position: [0, 0.45, -0.04], size: [0.18, 0.08, 0.04], color: "#FF9999", meridian: "BL" },
  { id: "lats", name: "背阔肌", position: [0, 0.25, -0.08], size: [0.16, 0.15, 0.04], color: "#FF9999", meridian: "BL" },
]