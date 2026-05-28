// 董氏奇穴 - 约200穴
import { Acupoint } from "./types"

// 一一部位 - 手指部位
export const dongshiFingerPoints: Acupoint[] = [
  // 大指部
  { id: "DS001", name: "大间", pinyin: "Dajian", meridian: "董氏奇穴", code: "DS", location: "大指第一节正中央偏内侧三分处", position: [0.34, -0.05, 0.01], indication: "心脏病、膝盖痛、小肠气、疝气", method: "针深二分至三分", category: "一一部位" },
  { id: "DS002", name: "小间", pinyin: "Xiaojian", meridian: "董氏奇穴", code: "DS", location: "大指第一节正中央偏内侧六分处", position: [0.34, -0.04, 0.02], indication: "心脏病、支气管炎、吐黄痰", method: "针深二分至三分", category: "一一部位" },
  { id: "DS003", name: "浮间", pinyin: "Fujian", meridian: "董氏奇穴", code: "DS", location: "大指第二节正中央偏内侧三分处", position: [0.33, -0.02, 0.01], indication: "疝气、尿道炎、小便出血、淋病", method: "针深二分至三分", category: "一一部位" },
  { id: "DS004", name: "外间", pinyin: "Waijian", meridian: "董氏奇穴", code: "DS", location: "大指第二节正中央偏内侧六分处", position: [0.33, -0.02, 0.02], indication: "疝气、尿道炎", method: "针深二分至三分", category: "一一部位" },
  { id: "DS005", name: "木穴", pinyin: "Muxue", meridian: "董氏奇穴", code: "DS", location: "大指第一节内侧中央二穴", position: [0.34, -0.05, 0.03], indication: "肝火旺、脾气暴躁、肝经之病", method: "针深二分", category: "一一部位" },
  { id: "DS006", name: "指三重", pinyin: "Zhisanchong", meridian: "董氏奇穴", code: "DS", location: "大指第一节外侧三穴", position: [0.34, -0.05, -0.01], indication: "扁桃腺炎、腮腺炎", method: "针深二分", category: "一一部位" },

  // 食指部
  { id: "DS007", name: "二角明", pinyin: "Erjiaoming", meridian: "董氏奇穴", code: "DS", location: "食指第一节正中央偏外侧三分处", position: [0.36, -0.06, 0], indication: "闪腰岔气、肾痛、眼角痛", method: "针深二分", category: "一一部位" },
  { id: "DS008", name: "木火穴", pinyin: "Muhuoxue", meridian: "董氏奇穴", code: "DS", location: "食指第一节H线上", position: [0.36, -0.05, 0.01], indication: "半身不遂", method: "针深三分", category: "一一部位" },
  { id: "DS009", name: "商阳附近", pinyin: "Shangyangfujin", meridian: "董氏奇穴", code: "DS", location: "食指末节桡侧", position: [0.38, -0.08, 0.01], indication: "齿痛、咽喉肿痛", method: "浅刺出血", category: "一一部位" },

  // 中指部
  { id: "DS010", name: "心膝穴", pinyin: "Xinxixue", meridian: "董氏奇穴", code: "DS", location: "中指第一节正中央两侧各二分处", position: [0.36, -0.06, -0.01], indication: "膝盖痛、心悸、头晕", method: "针深二分至三分", category: "一一部位" },
  { id: "DS011", name: "地宗穴", pinyin: "Dizongxue", meridian: "董氏奇穴", code: "DS", location: "中指第一节A线上", position: [0.36, -0.05, -0.02], indication: "气喘、肺炎、腰痛", method: "针深三分", category: "一一部位" },

  // 无名指部
  { id: "DS012", name: "木枝穴", pinyin: "Muzhixue", meridian: "董氏奇穴", code: "DS", location: "无名指第一节中央", position: [0.35, -0.06, -0.02], indication: "肝硬化、肝炎", method: "针深二分", category: "一一部位" },
  { id: "DS013", name: "肝门穴", pinyin: "Ganmenxue", meridian: "董氏奇穴", code: "DS", location: "无名指第一节正中央偏内侧三分处", position: [0.35, -0.05, -0.01], indication: "肝炎、肝肿大、肝硬化", method: "针深二分至三分", category: "一一部位" },

  // 小指部
  { id: "DS014", name: "还巢穴", pinyin: "Huanchaoxue", meridian: "董氏奇穴", code: "DS", location: "小指第一节正中央", position: [0.34, -0.06, -0.03], indication: "子宫痛、子宫炎、月经不调、赤白带、输卵管不通", method: "针深二分", category: "一一部位" },
  { id: "DS015", name: "妇科穴", pinyin: "Fukexue", meridian: "董氏奇穴", code: "DS", location: "小指第一节正中央偏内侧三分处", position: [0.34, -0.05, -0.02], indication: "妇科病、经痛、月经不调", method: "针深二分至三分", category: "一一部位" },
]

// 一二部位 - 手掌部位
export const dongshiPalmPoints: Acupoint[] = [
  { id: "DS016", name: "重子穴", pinyin: "Zhongzixue", meridian: "董氏奇穴", code: "DS", location: "大指第一节与手掌交界处偏内侧五分", position: [0.32, 0, 0.02], indication: "背痛、肺炎、感冒、咳嗽", method: "针深三分至五分", category: "一二部位" },
  { id: "DS017", name: "重仙穴", pinyin: "Zhongxianxue", meridian: "董氏奇穴", code: "DS", location: "大指第二节与手掌交界处偏内侧五分", position: [0.31, 0.02, 0.02], indication: "背痛、胸闷、肋骨痛", method: "针深三分至五分", category: "一二部位" },
  { id: "DS018", name: "大白穴", pinyin: "Dabaixue", meridian: "董氏奇穴", code: "DS", location: "手背，第一、二掌骨之间，食指掌骨之内侧中央", position: [0.32, 0.02, 0], indication: "头痛、偏头痛、坐骨神经痛、腰痛", method: "针深五分至一寸", category: "一二部位" },
  { id: "DS019", name: "灵骨穴", pinyin: "Lingguxue", meridian: "董氏奇穴", code: "DS", location: "手背，第一、二掌骨结合处", position: [0.3, 0.04, 0], indication: "坐骨神经痛、腰痛、脚痛、面神经麻痹、半身不遂、骨刺、头痛、经痛、经闭", method: "针深一寸至一寸五分", category: "一二部位" },
  { id: "DS020", name: "中白穴", pinyin: "Zhongbaixue", meridian: "董氏奇穴", code: "DS", location: "手背，第四、五掌骨之间", position: [0.3, 0.03, -0.02], indication: "肾亏、腰酸、背痛、头晕、眼花、坐骨神经痛、腿酸、腿痛", method: "针深五分", category: "一二部位" },
  { id: "DS021", name: "下白穴", pinyin: "Xiabaixue", meridian: "董氏奇穴", code: "DS", location: "中白穴下五分", position: [0.3, 0.02, -0.02], indication: "肝硬化腹水", method: "针深五分", category: "一二部位" },
  { id: "DS022", name: "腕顺一穴", pinyin: "Wanshunyi", meridian: "董氏奇穴", code: "DS", location: "手背小指掌骨外侧，距腕横纹一寸五分处", position: [0.28, 0.08, -0.03], indication: "肾亏、腰痛、眼痛、肾炎、四肢浮肿、两腿无力、背痛", method: "针深三分至五分", category: "一二部位" },
  { id: "DS023", name: "腕顺二穴", pinyin: "Wanshuner", meridian: "董氏奇穴", code: "DS", location: "腕顺一穴下一寸", position: [0.28, 0.06, -0.03], indication: "同腕顺一穴", method: "针深三分至五分", category: "一二部位" },
]

// 二二部位 - 前臂部位
export const dongshiForearmPoints: Acupoint[] = [
  { id: "DS024", name: "其门穴", pinyin: "Qimenxue", meridian: "董氏奇穴", code: "DS", location: "前臂背面，腕横纹上二寸，两筋之间", position: [0.28, 0.12, 0.01], indication: "妇科经痛", method: "针深三分至五分", category: "二二部位" },
  { id: "DS025", name: "其角穴", pinyin: "Qijiaoxue", meridian: "董氏奇穴", code: "DS", location: "其门穴上二寸", position: [0.27, 0.18, 0.01], indication: "妇科经痛", method: "针深三分至五分", category: "二二部位" },
  { id: "DS026", name: "其正穴", pinyin: "Qizhengxue", meridian: "董氏奇穴", code: "DS", location: "其角穴上二寸", position: [0.26, 0.24, 0.01], indication: "妇科经痛", method: "针深三分至五分", category: "二二部位" },
  { id: "DS027", name: "火串穴", pinyin: "Huochuanxue", meridian: "董氏奇穴", code: "DS", location: "前臂背面，腕横纹上三寸，两筋之间", position: [0.27, 0.16, 0], indication: "手脚麻痹、手颤抖、心悸、半身不遂、血管硬化", method: "针深三分至八分", category: "二二部位" },
  { id: "DS028", name: "火陵穴", pinyin: "Huolingxue", meridian: "董氏奇穴", code: "DS", location: "火串穴上一寸半", position: [0.26, 0.2, 0], indication: "同火串穴", method: "针深三分至八分", category: "二二部位" },
  { id: "DS029", name: "火山穴", pinyin: "Huoshanxue", meridian: "董氏奇穴", code: "DS", location: "火陵穴上一寸半", position: [0.25, 0.24, 0], indication: "同火串穴", method: "针深三分至八分", category: "二二部位" },
]

// 三三部位 - 上臂部位
export const dongshiUpperArmPoints: Acupoint[] = [
  { id: "DS030", name: "肩中穴", pinyin: "Jianzhongxue", meridian: "董氏奇穴", code: "DS", location: "上臂肱骨外侧，肩峰与肘尖连线中点", position: [-0.2, 0.48, 0.06], indication: "膝盖痛、皮肤病、小儿麻痹", method: "针深五分至一寸", category: "三三部位" },
  { id: "DS031", name: "云白穴", pinyin: "Yunbaixue", meridian: "董氏奇穴", code: "DS", location: "肩中穴上一寸", position: [-0.2, 0.52, 0.06], indication: "肺炎、脊椎骨痛、坐骨神经痛、腿痛", method: "针深五分至一寸", category: "三三部位" },
  { id: "DS032", name: "李白穴", pinyin: "Libaixue", meridian: "董氏奇穴", code: "DS", location: "云白穴上一寸", position: [-0.2, 0.56, 0.06], indication: "狐臭、多汗症、脊椎骨痛", method: "针深五分至一寸", category: "三三部位" },
]

// 四四部位 - 下肢部位
export const dongshiLegPoints: Acupoint[] = [
  { id: "DS033", name: "正筋穴", pinyin: "Zhengjinxue", meridian: "董氏奇穴", code: "DS", location: "足后跟筋中央，在足底黑白肉际上", position: [0, -0.96, -0.04], indication: "颈项筋痛、脊椎骨痛、脑骨胀大", method: "针深三分至五分", category: "四四部位" },
  { id: "DS034", name: "正宗穴", pinyin: "Zhengzongxue", meridian: "董氏奇穴", code: "DS", location: "正筋穴上二寸", position: [0, -0.9, -0.06], indication: "同正筋穴、肩背痛", method: "针深五分至一寸", category: "四四部位" },
  { id: "DS035", name: "正士穴", pinyin: "Zhengshixue", meridian: "董氏奇穴", code: "DS", location: "正宗穴上二寸", position: [0, -0.84, -0.06], indication: "同正筋穴、肩胛骨痛", method: "针深五分至一寸", category: "四四部位" },
  { id: "DS036", name: "博球穴", pinyin: "Boqiuxue", meridian: "董氏奇穴", code: "DS", location: "正士穴上二寸五分", position: [0, -0.78, -0.06], indication: "后脑骨痛、背痛", method: "针深五分至一寸", category: "四四部位" },
  { id: "DS037", name: "搏球穴", pinyin: "Boqiuxue2", meridian: "董氏奇穴", code: "DS", location: "博球穴上一寸五分", position: [0, -0.72, -0.06], indication: "鼻骨痛、前额痛", method: "针深五分至一寸", category: "四四部位" },

  // 通关、通山、通天
  { id: "DS038", name: "通关穴", pinyin: "Tongguanxue", meridian: "董氏奇穴", code: "DS", location: "大腿正面，膝盖骨上缘中央上五寸", position: [0.08, -0.38, 0.08], indication: "心脏病、心脏扩大、心跳过速、风湿性心脏病", method: "针深一寸至一寸五分", category: "四四部位" },
  { id: "DS039", name: "通山穴", pinyin: "Tongshanxue", meridian: "董氏奇穴", code: "DS", location: "通关穴上二寸", position: [0.08, -0.3, 0.08], indication: "心脏病、心脏扩大、心跳过速", method: "针深一寸至一寸五分", category: "四四部位" },
  { id: "DS040", name: "通天穴", pinyin: "Tongtianxue", meridian: "董氏奇穴", code: "DS", location: "通山穴上二寸", position: [0.08, -0.22, 0.08], indication: "心悸、胃病、鼻衄", method: "针深一寸至一寸五分", category: "四四部位" },

  // 三金穴
  { id: "DS041", name: "金前下穴", pinyin: "Jinqianxia", meridian: "董氏奇穴", code: "DS", location: "大腿内侧，膝盖骨内上角上三寸", position: [0.06, -0.42, 0.04], indication: "肝硬化、肝炎、骨刺", method: "针深一寸五分至二寸", category: "四四部位" },
  { id: "DS042", name: "金前中穴", pinyin: "Jinqianzhong", meridian: "董氏奇穴", code: "DS", location: "金前下穴上二寸", position: [0.06, -0.34, 0.05], indication: "同金前下穴", method: "针深一寸五分至二寸", category: "四四部位" },
  { id: "DS043", name: "金前上穴", pinyin: "Jinqianshang", meridian: "董氏奇穴", code: "DS", location: "金前中穴上二寸", position: [0.06, -0.26, 0.06], indication: "同金前下穴", method: "针深一寸五分至二寸", category: "四四部位" },
]

// 七七部位 - 足底部位
export const dongshiFootPoints: Acupoint[] = [
  { id: "DS044", name: "火包穴", pinyin: "Huobaoxue", meridian: "董氏奇穴", code: "DS", location: "足底第二、三趾趾缝间", position: [0.06, -0.97, 0.02], indication: "血压高、脑充血", method: "针深三分至五分", category: "七七部位" },
  { id: "DS045", name: "上瘤穴", pinyin: "Shangliuxue", meridian: "董氏奇穴", code: "DS", location: "足底，脚后跟前缘正中央", position: [0, -0.94, 0.02], indication: "各种瘤、脑瘤", method: "针深五分至一寸", category: "七七部位" },
  { id: "DS046", name: "海豹穴", pinyin: "Haibaoxue", meridian: "董氏奇穴", code: "DS", location: "足底，上瘤穴前一寸", position: [0, -0.92, 0.02], indication: "各种瘤", method: "针深五分至一寸", category: "七七部位" },
  { id: "DS047", name: "木妇穴", pinyin: "Mufuxue", meridian: "董氏奇穴", code: "DS", location: "足底，涌泉穴后五分偏内侧", position: [0.04, -0.93, 0.02], indication: "妇科病、子宫痛、子宫炎、子宫瘤", method: "针深五分至一寸", category: "七七部位" },
]

// 八八部位 - 足背部位
export const dongshiDorsumPoints: Acupoint[] = [
  { id: "DS048", name: "火连穴", pinyin: "Huolianxue", meridian: "董氏奇穴", code: "DS", location: "足背，第一、二趾趾缝间", position: [0.08, -0.96, 0.04], indication: "心脏痛、胃痛、高血压、前头痛", method: "针深三分", category: "八八部位" },
  { id: "DS049", name: "火菊穴", pinyin: "Huojuxue", meridian: "董氏奇穴", code: "DS", location: "足背，第二、三趾趾缝间", position: [0.06, -0.96, 0.04], indication: "眼睛痛、眼球疾病、肝病", method: "针深三分", category: "八八部位" },
  { id: "DS050", name: "火散穴", pinyin: "Huosanxue", meridian: "董氏奇穴", code: "DS", location: "足背，第三、四趾趾缝间", position: [0.04, -0.96, 0.03], indication: "胸闷、肋痛、肝病", method: "针深三分", category: "八八部位" },
  { id: "DS051", name: "门金穴", pinyin: "Menjinxue", meridian: "董氏奇穴", code: "DS", location: "足背，第一、二跖骨底接合处", position: [0.08, -0.92, 0.05], indication: "胃肠病、肠炎", method: "针深三分至五分", category: "八八部位" },
  { id: "DS052", name: "火主穴", pinyin: "Huozhuxue", meridian: "董氏奇穴", code: "DS", location: "门金穴上一寸", position: [0.08, -0.9, 0.05], indication: "心脏病、难产、骨刺", method: "针深三分至五分", category: "八八部位" },
  { id: "DS053", name: "火硬穴", pinyin: "Huoyingxue", meridian: "董氏奇穴", code: "DS", location: "火主穴上一寸", position: [0.08, -0.88, 0.05], indication: "坐骨神经痛", method: "针深三分至五分", category: "八八部位" },
]

// 九九部位 - 小腿部位
export const dongshiCalfPoints: Acupoint[] = [
  { id: "DS054", name: "天皇穴", pinyin: "Tianhuangxue", meridian: "董氏奇穴", code: "DS", location: "小腿内侧，内踝尖直上六寸", position: [0.08, -0.72, 0.03], indication: "糖尿病、胃病、牙痛", method: "针深一寸至一寸五分", category: "九九部位" },
  { id: "DS055", name: "肾关穴", pinyin: "Shenguanxue", meridian: "董氏奇穴", code: "DS", location: "天皇穴上二寸", position: [0.08, -0.66, 0.03], indication: "肾亏、腰酸、糖尿病、眼昏花", method: "针深一寸至一寸五分", category: "九九部位" },
  { id: "DS056", name: "地皇穴", pinyin: "Dihuangxue", meridian: "董氏奇穴", code: "DS", location: "肾关穴上三寸", position: [0.08, -0.58, 0.03], indication: "眼昏花、肝硬化、腹水", method: "针深一寸至一寸五分", category: "九九部位" },
  { id: "DS057", name: "人皇穴", pinyin: "Renhuangxue", meridian: "董氏奇穴", code: "DS", location: "地皇穴上三寸", position: [0.08, -0.5, 0.03], indication: "糖尿病、淋巴腺肿大", method: "针深一寸至一寸五分", category: "九九部位" },

  // 侧三里、侧下三里
  { id: "DS058", name: "侧三里穴", pinyin: "Cesanlixue", meridian: "董氏奇穴", code: "DS", location: "小腿外侧，阳陵泉下一寸五分", position: [-0.1, -0.58, 0.04], indication: "牙痛、面神经麻痹", method: "针深一寸至一寸五分", category: "九九部位" },
  { id: "DS059", name: "侧下三里穴", pinyin: "Cexiasanlixue", meridian: "董氏奇穴", code: "DS", location: "侧三里穴下二寸", position: [-0.1, -0.65, 0.04], indication: "耳鸣、腿痛、面神经麻痹", method: "针深一寸至一寸五分", category: "九九部位" },

  // 四花穴
  { id: "DS060", name: "四花上穴", pinyin: "Sihuashangxue", meridian: "董氏奇穴", code: "DS", location: "小腿外侧，外踝尖直上九寸", position: [-0.1, -0.62, 0.03], indication: "哮喘、眼球歪斜、心跳过快、肺炎", method: "针深八分至一寸", category: "九九部位" },
  { id: "DS061", name: "四花中穴", pinyin: "Sihuazhongxue", meridian: "董氏奇穴", code: "DS", location: "四花上穴下一寸五分", position: [-0.1, -0.68, 0.03], indication: "哮喘、牙痛、腰痛、肋痛", method: "针深八分至一寸", category: "九九部位" },
  { id: "DS062", name: "四花副穴", pinyin: "Sihuafuxue", meridian: "董氏奇穴", code: "DS", location: "四花中穴下一寸五分", position: [-0.1, -0.74, 0.03], indication: "哮喘、肺弱、感冒", method: "针深八分至一寸", category: "九九部位" },
  { id: "DS063", name: "四花下穴", pinyin: "Sihuaxiaxue", meridian: "董氏奇穴", code: "DS", location: "四花副穴下二寸五分", position: [-0.1, -0.82, 0.03], indication: "肝病、哮喘、心脏病", method: "针深八分至一寸", category: "九九部位" },
]

// 十十部位 - 头面部位
export const dongshiHeadPoints: Acupoint[] = [
  { id: "DS064", name: "正本穴", pinyin: "Zhengbenxue", meridian: "董氏奇穴", code: "DS", location: "头部，百会穴前一寸", position: [0, 0.97, 0.04], indication: "羊痫风、脑骨肿大", method: "针深二分至五分", category: "十十部位" },
  { id: "DS065", name: "前会穴", pinyin: "Qianhuixue", meridian: "董氏奇穴", code: "DS", location: "正本穴前一寸", position: [0, 0.96, 0.06], indication: "脑部疾病、眩晕", method: "针深二分至五分", category: "十十部位" },
  { id: "DS066", name: "上里穴", pinyin: "Shanglixue", meridian: "董氏奇穴", code: "DS", location: "前会穴前一寸", position: [0, 0.95, 0.08], indication: "脑贫血、脑膜炎", method: "针深二分至五分", category: "十十部位" },
  { id: "DS067", name: "四腑一穴", pinyin: "Sifuyixue", meridian: "董氏奇穴", code: "DS", location: "百会穴后一寸", position: [0, 0.97, -0.02], indication: "后头痛、脊椎骨痛", method: "针深二分至五分", category: "十十部位" },
  { id: "DS068", name: "四腑二穴", pinyin: "Sifuerxue", meridian: "董氏奇穴", code: "DS", location: "四腑一穴后一寸", position: [0, 0.96, -0.04], indication: "同四腑一穴", method: "针深二分至五分", category: "十十部位" },
  { id: "DS069", name: "镇静穴", pinyin: "Zhenjingxue", meridian: "董氏奇穴", code: "DS", location: "两眉头正中央向上五分", position: [0, 0.88, 0.14], indication: "神经衰弱、精神分裂、失眠、四肢发抖", method: "针深二分至五分", category: "十十部位" },
  { id: "DS070", name: "上溪穴", pinyin: "Shangxixue", meridian: "董氏奇穴", code: "DS", location: "耳尖直上入发际一寸五分", position: [-0.08, 0.92, 0.02], indication: "头痛、眼痛、皮肤痒", method: "针深二分至五分", category: "十十部位" },
  { id: "DS071", name: "中溪穴", pinyin: "Zhongxixue", meridian: "董氏奇穴", code: "DS", location: "上溪穴后一寸", position: [-0.08, 0.92, 0], indication: "同上溪穴、坐骨神经痛", method: "针深二分至五分", category: "十十部位" },
  { id: "DS072", name: "下溪穴", pinyin: "Xiaxixue", meridian: "董氏奇穴", code: "DS", location: "中溪穴后一寸", position: [-0.08, 0.92, -0.02], indication: "同上溪穴", method: "针深二分至五分", category: "十十部位" },
]

// 合并所有董氏奇穴
export const dongshiAcupoints: Acupoint[] = [
  ...dongshiFingerPoints,
  ...dongshiPalmPoints,
  ...dongshiForearmPoints,
  ...dongshiUpperArmPoints,
  ...dongshiLegPoints,
  ...dongshiFootPoints,
  ...dongshiDorsumPoints,
  ...dongshiCalfPoints,
  ...dongshiHeadPoints,
]
