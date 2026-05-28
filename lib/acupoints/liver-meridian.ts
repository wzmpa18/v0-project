// 足厥阴肝经 - 14穴
import { Acupoint } from "./types"

export const liverMeridian: Acupoint[] = [
  { id: "LR1", name: "大敦", pinyin: "Dadun", meridian: "足厥阴肝经", code: "LR", location: "足大趾末节外侧，趾甲根角旁0.1寸", position: [0.1, -0.97, 0.03], indication: "疝气、遗尿、癃闭、月经不调、崩漏、阴挺、癫痫", method: "浅刺0.1-0.2寸或点刺出血", category: "井穴" },
  { id: "LR2", name: "行间", pinyin: "Xingjian", meridian: "足厥阴肝经", code: "LR", location: "足背侧，第1、2趾间，趾蹼缘后方赤白肉际处", position: [0.1, -0.95, 0.04], indication: "头痛、目眩、目赤肿痛、青盲、口歪、胁痛、月经不调、痛经、带下、遗尿、癃闭、疝气、小儿惊风、失眠、癫狂、痫证", method: "直刺0.5-0.8寸", category: "荥穴" },
  { id: "LR3", name: "太冲", pinyin: "Taichong", meridian: "足厥阴肝经", code: "LR", location: "足背，第1、2跖骨间，跖骨底结合部前方凹陷处", position: [0.1, -0.92, 0.05], indication: "头痛、眩晕、目赤肿痛、口歪、胁痛、月经不调、崩漏、疝气、遗尿、癫狂、痫证、小儿惊风、下肢痿痹", method: "直刺0.5-1寸", category: "输穴、原穴" },
  { id: "LR4", name: "中封", pinyin: "Zhongfeng", meridian: "足厥阴肝经", code: "LR", location: "足背侧，内踝前，胫骨前肌腱内侧凹陷处", position: [0.1, -0.88, 0.06], indication: "疝气、遗精、小便不利、黄疸、胸腹胀满、腰痛、足冷、内踝肿痛", method: "直刺0.5-0.8寸", category: "经穴" },
  { id: "LR5", name: "蠡沟", pinyin: "Ligou", meridian: "足厥阴肝经", code: "LR", location: "小腿内侧，内踝尖上5寸，胫骨内侧面中央", position: [0.08, -0.75, 0.04], indication: "月经不调、赤白带下、阴挺、阴痒、疝气、小便不利、睾丸肿痛、小腿酸痛", method: "平刺0.5-0.8寸", category: "络穴" },
  { id: "LR6", name: "中都", pinyin: "Zhongdu", meridian: "足厥阴肝经", code: "LR", location: "小腿内侧，内踝尖上7寸，胫骨内侧面中央", position: [0.08, -0.68, 0.04], indication: "胁痛、腹胀、泄泻、疝气、崩漏、恶露不尽", method: "平刺0.5-0.8寸", category: "郄穴" },
  { id: "LR7", name: "膝关", pinyin: "Xiguan", meridian: "足厥阴肝经", code: "LR", location: "小腿内侧，内踝尖上7寸，胫骨内侧髁后下方凹陷处", position: [0.08, -0.55, 0.02], indication: "膝膑肿痛、下肢痿痹、咽喉痛", method: "直刺0.8-1寸", category: "" },
  { id: "LR8", name: "曲泉", pinyin: "Ququan", meridian: "足厥阴肝经", code: "LR", location: "膝内侧，屈膝时，膝关节内侧面横纹内侧端，半腱肌、半膜肌止端前缘凹陷处", position: [0.08, -0.52, 0.03], indication: "月经不调、痛经、带下、阴挺、阴痒、产后腹痛、遗精、阳痿、疝气、小便不利、头痛、目眩、膝膑肿痛、下肢痿痹", method: "直刺1-1.5寸", category: "合穴" },
  { id: "LR9", name: "阴包", pinyin: "Yinbao", meridian: "足厥阴肝经", code: "LR", location: "大腿内侧，股骨内上髁上4寸，股内肌与缝匠肌之间", position: [0.08, -0.4, 0.04], indication: "月经不调、遗尿、小便不利、腰骶引少腹痛", method: "直刺0.8-1寸", category: "" },
  { id: "LR10", name: "足五里", pinyin: "Zuwuli", meridian: "足厥阴肝经", code: "LR", location: "大腿内侧，气冲直下3寸，动脉搏动处", position: [0.08, -0.25, 0.08], indication: "少腹胀痛、小便不利、阴挺、睾丸肿痛、嗜卧、四肢倦怠", method: "直刺0.5-1寸", category: "" },
  { id: "LR11", name: "阴廉", pinyin: "Yinlian", meridian: "足厥阴肝经", code: "LR", location: "大腿内侧，气冲直下2寸", position: [0.08, -0.2, 0.1], indication: "月经不调、赤白带下、少腹疼痛、股内侧痛、下肢挛急", method: "直刺0.8-1寸", category: "" },
  { id: "LR12", name: "急脉", pinyin: "Jimai", meridian: "足厥阴肝经", code: "LR", location: "耻骨联合外侧，动脉搏动处", position: [0.06, -0.15, 0.12], indication: "疝气、阴挺、少腹痛", method: "避开动脉，直刺0.5-1寸", category: "" },
  { id: "LR13", name: "章门", pinyin: "Zhangmen", meridian: "足厥阴肝经", code: "LR", location: "侧腹部，第11肋游离端下方", position: [0.15, 0.18, 0], indication: "腹痛、腹胀、肠鸣、泄泻、呕吐、黄疸、痞块、腰脊痛、胁痛", method: "斜刺0.5-0.8寸", category: "脾募穴、脏会" },
  { id: "LR14", name: "期门", pinyin: "Qimen", meridian: "足厥阴肝经", code: "LR", location: "胸部，乳头直下，第6肋间隙", position: [0.1, 0.38, 0.1], indication: "胸胁胀满疼痛、呕吐、吞酸、呃逆、腹胀、泄泻、奔豚、胁下积聚、热病、疟疾", method: "斜刺或平刺0.5-0.8寸", category: "肝募穴" },
]
