// 手阳明大肠经 (20穴)
import { Acupoint } from './types'

export const LARGE_INTESTINE_MERIDIAN: Acupoint[] = [
  { id: "LI1", name: "商阳", pinyin: "shangyang", code: "LI1", position: [0.63, 0.53, 0.05], meridian: "手阳明大肠经", category: "正经", location: "食指末节桡侧，距指甲角0.1寸", effect: "清热解表，醒脑开窍", method: "浅刺", depth: "0.1寸或点刺出血" },
  { id: "LI2", name: "二间", pinyin: "erjian", code: "LI2", position: [0.61, 0.55, 0.04], meridian: "手阳明大肠经", category: "正经", location: "食指本节前，桡侧凹陷处", effect: "清热解表，利咽消肿", method: "直刺", depth: "0.2-0.3寸" },
  { id: "LI3", name: "三间", pinyin: "sanjian", code: "LI3", position: [0.59, 0.57, 0.03], meridian: "手阳明大肠经", category: "正经", location: "食指本节后，桡侧凹陷处", effect: "清热解表，消肿止痛", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI4", name: "合谷", pinyin: "hegu", code: "LI4", position: [0.58, 0.60, 0.03], meridian: "手阳明大肠经", category: "正经", location: "手背，第1、2掌骨间，第2掌骨桡侧中点处", effect: "镇静止痛，通经活络，清热解表", method: "直刺", depth: "0.5-1寸", caution: "孕妇禁针" },
  { id: "LI5", name: "阳溪", pinyin: "yangxi", code: "LI5", position: [0.54, 0.68, 0.02], meridian: "手阳明大肠经", category: "正经", location: "腕背横纹桡侧，拇短伸肌腱与拇长伸肌腱之间凹陷处", effect: "清热散风，通利关节", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI6", name: "偏历", pinyin: "pianli", code: "LI6", position: [0.52, 0.78, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，腕横纹上3寸", effect: "清热利水，通经活络", method: "直刺或斜刺", depth: "0.3-0.5寸" },
  { id: "LI7", name: "温溜", pinyin: "wenliu", code: "LI7", position: [0.51, 0.88, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，腕横纹上5寸", effect: "清热解毒，消肿止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "LI8", name: "下廉", pinyin: "xialian", code: "LI8", position: [0.50, 0.95, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，曲池下4寸", effect: "调理肠胃，通经活络", method: "直刺", depth: "0.5-1寸" },
  { id: "LI9", name: "上廉", pinyin: "shanglian", code: "LI9", position: [0.50, 1.02, 0.02], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，曲池下3寸", effect: "调理肠胃，通经活络", method: "直刺", depth: "0.5-1寸" },
  { id: "LI10", name: "手三里", pinyin: "shousanli", code: "LI10", position: [0.50, 1.08, 0.03], meridian: "手阳明大肠经", category: "正经", location: "前臂背面桡侧，阳溪与曲池连线上，曲池下2寸", effect: "通经活络，清热明目，调理肠胃", method: "直刺", depth: "0.8-1.2寸" },
  { id: "LI11", name: "曲池", pinyin: "quchi", code: "LI11", position: [0.52, 1.18, 0.03], meridian: "手阳明大肠经", category: "正经", location: "肘横纹外侧端，屈肘时肘横纹尽处与肱骨外上髁连线中点", effect: "清热解表，疏经通络，调和气血", method: "直刺", depth: "1-1.5寸" },
  { id: "LI12", name: "肘髎", pinyin: "zhouliao", code: "LI12", position: [0.50, 1.22, 0.02], meridian: "手阳明大肠经", category: "正经", location: "臂外侧，曲池上1寸，肱骨边缘处", effect: "舒筋活络，消肿止痛", method: "直刺", depth: "0.5-1寸" },
  { id: "LI13", name: "手五里", pinyin: "shouwuli", code: "LI13", position: [0.48, 1.30, 0.02], meridian: "手阳明大肠经", category: "正经", location: "臂外侧，曲池与肩髃连线上，曲池上3寸", effect: "理气散结，通经活络", method: "直刺", depth: "0.5-1寸" },
  { id: "LI14", name: "臂臑", pinyin: "binao", code: "LI14", position: [0.45, 1.42, 0.02], meridian: "手阳明大肠经", category: "正经", location: "臂外侧，三角肌下端，曲池与肩髃连线上，曲池上7寸", effect: "理气通络，清热明目", method: "直刺或斜刺", depth: "0.5-1.5寸" },
  { id: "LI15", name: "肩髃", pinyin: "jianyu", code: "LI15", position: [0.40, 1.60, 0.02], meridian: "手阳明大肠经", category: "正经", location: "肩峰端下缘，三角肌上部中央，上臂外展时呈现凹陷处", effect: "疏经利节，祛风通络", method: "直刺或斜刺", depth: "0.8-1.5寸" },
  { id: "LI16", name: "巨骨", pinyin: "jugu", code: "LI16", position: [0.35, 1.65, -0.02], meridian: "手阳明大肠经", category: "正经", location: "肩上部，锁骨肩峰端与肩胛冈之间凹陷处", effect: "通经活络，消肿止痛", method: "直刺", depth: "0.5-1寸", caution: "不可深刺" },
  { id: "LI17", name: "天鼎", pinyin: "tianding", code: "LI17", position: [0.18, 1.78, 0.08], meridian: "手阳明大肠经", category: "正经", location: "颈外侧部，胸锁乳突肌后缘，扶突穴下1寸", effect: "清利咽喉，理气化痰", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI18", name: "扶突", pinyin: "futu", code: "LI18", position: [0.18, 1.82, 0.10], meridian: "手阳明大肠经", category: "正经", location: "颈外侧部，喉结旁开3寸，胸锁乳突肌前后缘之间", effect: "理气化痰，清热利咽", method: "直刺", depth: "0.3-0.5寸" },
  { id: "LI19", name: "口禾髎", pinyin: "kouheliao", code: "LI19", position: [0.12, 1.95, 0.40], meridian: "手阳明大肠经", category: "正经", location: "上唇部，鼻孔外缘直下，平水沟穴", effect: "清热散风，通鼻窍", method: "斜刺或平刺", depth: "0.3-0.5寸" },
  { id: "LI20", name: "迎香", pinyin: "yingxiang", code: "LI20", position: [0.15, 1.98, 0.38], meridian: "手阳明大肠经", category: "正经", location: "鼻翼外缘中点旁，鼻唇沟中", effect: "散风清热，通利鼻窍", method: "斜刺或平刺", depth: "0.3-0.5寸" },
]
