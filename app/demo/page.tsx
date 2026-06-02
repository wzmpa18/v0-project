'use client'

import { useState, useEffect } from 'react'
import { calculateBazi } from '@/lib/bazi-data'
import { calculateZiWeiPan, MAIN_STARS } from '@/lib/ziwei-data'
import { calculateQimenPan, JIE_QI_DUN } from '@/lib/qimen-data'
import { generateLiuYao, timeToGua } from '@/lib/liuyao-data'
import { timeQiGua, MeihuaResult } from '@/lib/meihua-data'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('bazi')
  const [baziResult, setBaziResult] = useState<any>(null)
  const [ziweiResult, setZiweiResult] = useState<any>(null)
  const [qimenResult, setQimenResult] = useState<any>(null)
  const [liuyaoResult, setLiuyaoResult] = useState<any>(null)
  const [meihuaResult, setMeihuaResult] = useState<MeihuaResult | null>(null)

  useEffect(() => {
    // 页面加载时自动生成演示数据
    runBaziDemo()
    runZiweiDemo()
    runQimenDemo()
    runLiuyaoDemo()
    runMeihuaDemo()
  }, [])

  // 八字演示
  const runBaziDemo = () => {
    const result = calculateBazi(2024, 1, 15, 10, '男')
    setBaziResult(result)
  }

  // 紫微斗数演示
  const runZiweiDemo = () => {
    const result = calculateZiWeiPan(2024, 1, 15, 10, '男')
    setZiweiResult(result)
  }

  // 奇门遁甲演示
  const runQimenDemo = () => {
    const result = calculateQimenPan('冬至', 0, '甲')
    setQimenResult(result)
  }

  // 六爻演示
  const runLiuyaoDemo = () => {
    const throws = timeToGua(2024, 1, 15, 10)
    const result = generateLiuYao(throws, '甲')
    setLiuyaoResult(result)
  }

  // 梅花易数演示
  const runMeihuaDemo = () => {
    const result = timeQiGua(2024, 1, 15, 10)
    setMeihuaResult(result)
  }

  const tabs = [
    { id: 'bazi', name: '八字命理' },
    { id: 'ziwei', name: '紫微斗数' },
    { id: 'qimen', name: '奇门遁甲' },
    { id: 'liuyao', name: '六爻纳甲' },
    { id: 'meihua', name: '梅花易数' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            国学易学演示系统
          </h1>
          <p className="text-amber-700">
            基于《渊海子平》《三命通会》《滴天髓》《紫微斗数全书》《梅花易数》等经典古籍构建
          </p>
        </div>

        {/* 标签导航 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-amber-800 hover:bg-amber-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="max-w-4xl mx-auto">
          {/* 八字命理 */}
          {activeTab === 'bazi' && baziResult && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">八字命理演示</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-sm text-amber-600">年柱</div>
                  <div className="text-3xl font-bold text-amber-900">
                    {baziResult.yearGan}{baziResult.yearZhi}
                  </div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-sm text-amber-600">月柱</div>
                  <div className="text-3xl font-bold text-amber-900">
                    {baziResult.monthGan}{baziResult.monthZhi}
                  </div>
                </div>
                <div className="text-center p-4 bg-amber-100 rounded-lg border-2 border-amber-500">
                  <div className="text-sm text-amber-600">日柱（日主）</div>
                  <div className="text-3xl font-bold text-amber-900">
                    {baziResult.dayGan}{baziResult.dayZhi}
                  </div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-sm text-amber-600">时柱</div>
                  <div className="text-3xl font-bold text-amber-900">
                    {baziResult.hourGan}{baziResult.hourZhi}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">基本信息</h3>
                  <p className="text-blue-700">日主：{baziResult.dayGan}（{baziResult.dayGanWuxing}）</p>
                  <p className="text-blue-700">性别：{baziResult.gender}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">五行统计</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(baziResult.wuxingCount || {}).map(([wuxing, count]) => (
                      <div key={wuxing} className="text-center">
                        <div className="font-bold">{wuxing}</div>
                        <div className="text-green-700">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 紫微斗数 */}
          {activeTab === 'ziwei' && ziweiResult && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">紫微斗数演示</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">命宫</div>
                  <div className="text-xl font-bold text-purple-900">{ziweiResult.mingGong}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">身宫</div>
                  <div className="text-xl font-bold text-purple-900">{ziweiResult.shenGong}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600">五行局</div>
                  <div className="text-xl font-bold text-purple-900">{ziweiResult.wuxingJu}</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">主星分布</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(ziweiResult.mainStarPositions || {}).slice(0, 8).map(([star, position]) => (
                    <div key={star} className="text-center p-2 bg-white rounded">
                      <div className="font-bold text-purple-900">{star}</div>
                      <div className="text-sm text-purple-600">宫位 {position}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 奇门遁甲 */}
          {activeTab === 'qimen' && qimenResult && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">奇门遁甲演示</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <div className="text-sm text-cyan-600">局数</div>
                  <div className="text-xl font-bold text-cyan-900">{qimenResult.ju}局</div>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <div className="text-sm text-cyan-600">遁局</div>
                  <div className="text-xl font-bold text-cyan-900">{qimenResult.dunType}</div>
                </div>
              </div>

              <div className="p-4 bg-cyan-50 rounded-lg">
                <h3 className="font-semibold text-cyan-800 mb-2">值符值使</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-cyan-600">值符</div>
                    <div className="font-bold text-cyan-900">{qimenResult.zhiFu}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-cyan-600">值使</div>
                    <div className="font-bold text-cyan-900">{qimenResult.zhiShi}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">九宫排布</h3>
                <div className="grid grid-cols-3 gap-2">
                  {qimenResult.palaces?.slice(0, 9).map((palace: any, idx: number) => (
                    <div key={idx} className="text-center p-2 bg-white rounded border">
                      <div className="text-sm text-gray-600">{palace.name}</div>
                      <div className="font-mono text-xs">
                        {palace.baShen}/{palace.jiuXing}/{palace.baMen}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 六爻纳甲 */}
          {activeTab === 'liuyao' && liuyaoResult && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">六爻纳甲演示</h2>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg mb-6">
                <div className="text-sm text-orange-600">本卦</div>
                <div className="text-2xl font-bold text-orange-900">{liuyaoResult.guaName}</div>
                <div className="text-orange-700 mt-2">{liuyaoResult.guaCi}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-600 mb-3">六爻列表（从下往上）</div>
                {liuyaoResult.yaoList?.map((yao: any, idx: number) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      yao.dong ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold w-8">{yao.position}爻</span>
                      <span className={`text-xl ${yao.yinYang === '阳' ? 'text-red-600' : 'text-blue-600'}`}>
                        {yao.yinYang === '阳' ? '━━━' : '━ ━'}
                      </span>
                      {yao.dong && <span className="text-yellow-600 font-bold">动</span>}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono">{yao.ganZhi}</span>
                      <span className="text-green-700">{yao.liuQin}</span>
                      <span className="text-purple-700">{yao.liuShou}</span>
                      {yao.shiYing && <span className="text-orange-600 font-bold">{yao.shiYing}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {liuyaoResult.bianGua && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600">变卦</div>
                  <div className="text-xl font-bold text-green-900">{liuyaoResult.bianGua}</div>
                </div>
              )}
            </div>
          )}

          {/* 梅花易数 */}
          {activeTab === 'meihua' && meihuaResult && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">梅花易数演示</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-sm text-teal-600">本卦</div>
                  <div className="text-xl font-bold text-teal-900">
                    {meihuaResult.benGua.shangGua}/{meihuaResult.benGua.xiaGua}
                  </div>
                  <div className="text-lg font-bold text-teal-800 mt-1">{meihuaResult.benGua.name}</div>
                </div>
                {meihuaResult.huGua && (
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <div className="text-sm text-teal-600">互卦</div>
                    <div className="text-xl font-bold text-teal-900">
                      {meihuaResult.huGua.shangGua}/{meihuaResult.huGua.xiaGua}
                    </div>
                    <div className="text-lg font-bold text-teal-800 mt-1">{meihuaResult.huGua.name}</div>
                  </div>
                )}
                {meihuaResult.bianGua && (
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <div className="text-sm text-teal-600">变卦</div>
                    <div className="text-xl font-bold text-teal-900">
                      {meihuaResult.bianGua.shangGua}/{meihuaResult.bianGua.xiaGua}
                    </div>
                    <div className="text-lg font-bold text-teal-800 mt-1">{meihuaResult.bianGua.name}</div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-teal-50 rounded-lg mb-6">
                <h3 className="font-semibold text-teal-800 mb-3">卦辞</h3>
                <p className="text-teal-700 italic mb-2">{meihuaResult.benGua.guaCi}</p>
                <p className="text-teal-600 text-sm">{meihuaResult.benGua.xiangCi}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">动爻</div>
                  <div className="text-xl font-bold text-blue-900">第 {meihuaResult.dongYao} 爻</div>
                </div>
                <div className={`p-4 rounded-lg ${
                  meihuaResult.jixiong.includes('吉') ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className={`text-sm mb-1 ${
                    meihuaResult.jixiong.includes('吉') ? 'text-green-600' : 'text-red-600'
                  }`}>吉凶</div>
                  <div className={`text-xl font-bold ${
                    meihuaResult.jixiong.includes('吉') ? 'text-green-900' : 'text-red-900'
                  }`}>{meihuaResult.jixiong}</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-3">体用生克</h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-sm text-amber-600">体卦（自己）</div>
                    <div className="text-lg font-bold text-amber-900">{meihuaResult.tiGua}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-amber-600">用卦（对方）</div>
                    <div className="text-lg font-bold text-amber-900">{meihuaResult.yongGua}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-amber-600 mb-1">关系</div>
                  <div className="text-lg font-bold text-amber-900">{meihuaResult.tiYongGuanxi}</div>
                  <p className="text-amber-700 mt-2">{meihuaResult.guanxiDesc}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
