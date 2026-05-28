// 足太阴脾经 (21穴)
import { Acupoint } from './types'

export const spleenMeridian: Acupoint[] = [
  { id: "SP1", name: "隐白", pinyin: "yinbai", code: "SP1", position: [0.08, -0.68, 0.12], meridian: "足太阴脾经", category: "正经", location: "足大趾末节内侧，距趾甲角0.1寸", effect: "调经统血，健脾回阳", method: "浅刺", depth: "0.1寸或点刺出血" },
  { id: "SP2", name: "大都", pinyin: "dadu", code: "SP2", position: [0.06, -0.62, 0.12], meridian: "足太阴脾经", category: "正经", location: "足内侧缘，第1跖趾关节前下方赤白肉际凹陷处", effect: "健脾和中，清热止痛", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SP3", name: "太白", pinyin: "taibai", code: "SP3", position: [0.05, -0.58, 0.10], meridian: "足太阴脾经", category: "正经", location: "足内侧缘，第1跖骨小头后下方凹陷处", effect: "健脾和胃，清热化湿", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SP4", name: "公孙", pinyin: "gongsun", code: "SP4", position: [0.04, -0.52, 0.08], meridian: "足太阴脾经", category: "正经", location: "足内侧缘，第1跖骨基底部前下方", effect: "健脾和胃，调冲任", method: "直刺", depth: "0.5-1寸" },
  { id: "SP5", name: "商丘", pinyin: "shangqiu", code: "SP5", position: [0.06, -0.48, 0.04], meridian: "足太阴脾经", category: "正经", location: "足内踝前下方凹陷中", effect: "健脾化湿，通调肠胃", method: "直刺", depth: "0.3-0.5寸" },
  { id: "SP6", name: "三阴交", pinyin: "sanyinjiao", code: "SP6", position: [0.10, -0.35, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，内踝尖上3寸，胫骨内侧缘后方", effect: "健脾益血，调肝补肾，安神助眠", method: "直刺", depth: "1-1.5寸", caution: "孕妇禁针" },
  { id: "SP7", name: "漏谷", pinyin: "lougu", code: "SP7", position: [0.10, -0.25, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，内踝尖上6寸", effect: "健脾渗湿，利尿消肿", method: "直刺", depth: "0.5-1寸" },
  { id: "SP8", name: "地机", pinyin: "diji", code: "SP8", position: [0.10, -0.15, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，阴陵泉下3寸", effect: "健脾渗湿，调经止带", method: "直刺", depth: "0.5-1寸" },
  { id: "SP9", name: "阴陵泉", pinyin: "yinlingquan", code: "SP9", position: [0.12, 0.05, 0.02], meridian: "足太阴脾经", category: "正经", location: "小腿内侧，胫骨内侧髁后下方凹陷中", effect: "健脾利湿，通利小便", method: "直刺", depth: "1-2寸" },
  { id: "SP10", name: "血海", pinyin: "xuehai", code: "SP10", position: [0.12, 0.20, 0.06], meridian: "足太阴脾经", category: "正经", location: "大腿内侧，髌底内侧端上2寸", effect: "调经统血，健脾化湿", method: "直刺", depth: "1-1.5寸" },
  { id: "SP11", name: "箕门", pinyin: "jimen", code: "SP11", position: [0.12, 0.35, 0.06], meridian: "足太阴脾经", category: "正经", location: "大腿内侧，血海上6寸", effect: "利尿通淋，健脾渗湿", method: "直刺", depth: "0.5-1寸" },
  { id: "SP12", name: "冲门", pinyin: "chongmen", code: "SP12", position: [0.08, 0.68, 0.12], meridian: "足太阴脾经", category: "正经", location: "腹股沟外侧，耻骨联合上缘中点旁开3.5寸", effect: "健脾化湿，理气解痉", method: "直刺", depth: "0.5-1寸", caution: "避开股动脉" },
  { id: "SP13", name: "府舍", pinyin: "fushe", code: "SP13", position: [0.06, 0.72, 0.14], meridian: "足太阴脾经", category: "正经", location: "下腹部，冲门上方0.7寸", effect: "健脾理气，调经止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "SP14", name: "腹结", pinyin: "fujie", code: "SP14", position: [0.06, 0.82, 0.14], meridian: "足太阴脾经", category: "正经", location: "下腹部，大横下1.3寸", effect: "健脾温中，行气止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "SP15", name: "大横", pinyin: "daheng", code: "SP15", position: [0.06, 0.92, 0.14], meridian: "足太阴脾经", category: "正经", location: "腹中部，脐中旁开4寸", effect: "温中散寒，调理肠胃", method: "直刺", depth: "0.5-1寸" },
  { id: "SP16", name: "腹哀", pinyin: "fuai", code: "SP16", position: [0.06, 1.02, 0.15], meridian: "足太阴脾经", category: "正经", location: "上腹部，脐中上3寸，前正中线旁开4寸", effect: "健脾和胃，理气消滞", method: "直刺", depth: "0.5-1寸" },
  { id: "SP17", name: "食窦", pinyin: "shidou", code: "SP17", position: [0.28, 1.28, 0.16], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第5肋间隙，前正中线旁开6寸", effect: "健脾理气，利水消肿", method: "斜刺或平刺", depth: "0.3-0.5寸", caution: "不可深刺" },
  { id: "SP18", name: "天溪", pinyin: "tianxi", code: "SP18", position: [0.28, 1.34, 0.16], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第4肋间隙，前正中线旁开6寸", effect: "宽胸理气，通乳消肿", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "SP19", name: "胸乡", pinyin: "xiongxiang", code: "SP19", position: [0.28, 1.40, 0.15], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第3肋间隙，前正中线旁开6寸", effect: "宽胸降气，舒肝理气", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "SP20", name: "周荣", pinyin: "zhourong", code: "SP20", position: [0.28, 1.46, 0.14], meridian: "足太阴脾经", category: "正经", location: "胸外侧部，第2肋间隙，前正中线旁开6寸", effect: "理气止咳，宽胸消肿", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "SP21", name: "大包", pinyin: "dabao", code: "SP21", position: [0.32, 1.30, 0.08], meridian: "足太阴脾经", category: "正经", location: "侧胸部，腋中线上，第6肋间隙处", effect: "统血通络，宽胸利胁", method: "斜刺或平刺", depth: "0.3-0.5寸" },
]
