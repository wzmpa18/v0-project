"use client"

import { useState } from "react"
import { calculateBazi } from "@/lib/bazi-data"
import { calculateDayGanWangShuai } from "@/lib/bazi-wangshuai"
import { determineGeJu } from "@/lib/bazi-geju"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"
import { QIONG_TONG_BAO_JIAN } from "@/lib/bazi-guji-data"

export default function DemoPage() {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    // 页面加载时自动运行测试
    runTest()
  }, [])

  const runTest = () => {
    const now = new Date()
    const data = {
      name: "测试用户",
      gender: "male",
      calendarType: "solar",
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      birthPlace: "",
      timezone: "北京时间",
      saveToRecord: false,
    }

    const baziResult = calculateBazi(data)
    
    // 计算旺衰
    const wangShuai = calculateDayGanWangShuai(
      baziResult.siZhu.day.gan,
      baziResult.siZhu.year.gan,
      baziResult.siZhu.year.zhi,
      baziResult.siZhu.month.gan,
      baziResult.siZhu.month.zhi,
      baziResult.siZhu.day.zhi,
      baziResult.siZhu.hour.gan,
      baziResult.siZhu.hour.zhi
    )
    
    // 计算格局
    const geJu = determineGeJu(
      baziResult.siZhu.day.gan,
      baziResult.siZhu.year.gan,
      baziResult.siZhu.year.zhi,
      baziResult.siZhu.month.gan,
      baziResult.siZhu.month.zhi,
      baziResult.siZhu.day.zhi,
      baziResult.siZhu.hour.gan,
      baziResult.siZhu.hour.zhi,
      wangShuai.level
    )
    
    // 计算神煞
    const shenSha = checkShenShaByPosition(baziResult)
    
    // 获取穷通宝鉴
    const qtData = QIONG_TONG_BAO_JIAN[baziResult.siZhu.day.gan]?.[baziResult.siZhu.month.zhi]

    setResult({
      bazi: baziResult,
      wangShuai,
      geJu,
      shenSha,
      qiongTong: qtData,
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">八字命理演示页面</h1>
          <p className="text-gray-600 mb-4">这是一个简单的演示页面，点击按钮即可查看完整的八字排盘功能！</p>
          
          <button
            onClick={runTest}
            className="w-full py-4 bg-gradient-to-r from-[#4a9d5b] to-[#3d8a4e] text-white rounded-xl text-lg font-medium hover:opacity-90 transition-opacity"
          >
            🎯 点击测试完整功能
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            {/* 基本信息 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">📋 基本信息</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">姓名</p>
                  <p className="text-gray-800">{result.bazi.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">性别</p>
                  <p className="text-gray-800">{result.bazi.gender === "male" ? "男" : "女"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">阳历</p>
                  <p className="text-gray-800">{result.bazi.solarDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">农历</p>
                  <p className="text-gray-800">{result.bazi.lunarDate}</p>
                </div>
              </div>
            </div>

            {/* 八字排盘 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">🎯 八字排盘</h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(result.bazi.siZhu).map(([key, zhu]: [string, any]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-xs mb-2">
                      {key === "year" ? "年" : key === "month" ? "月" : key === "day" ? "日" : "时"}
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mb-1">
                      {zhu.gan}{zhu.zhi}
                    </p>
                    <p className="text-sm text-gray-600">{zhu.shiShen}</p>
                    <p className="text-xs text-gray-500 mt-1">{zhu.naYin}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 旺衰分析 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">📊 旺衰分析（滴天髓）</h2>
              <div className="space-y-2">
                <p className="text-gray-800">
                  <span className="font-medium">旺衰等级：</span>
                  {result.wangShuai.level}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">得分：</span>
                  {result.wangShuai.score}
                </p>
                <div className="mt-3">
                  <p className="text-gray-500 text-sm mb-2">分析详情：</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {result.wangShuai.details.map((detail: string, i: number) => (
                      <li key={i}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 格局判定 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">🏆 格局判定（子平真诠）</h2>
              <div className="space-y-2">
                <p className="text-gray-800">
                  <span className="font-medium">格局：</span>
                  {result.geJu.type}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">用神：</span>
                  {result.geJu.yongShen}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">喜神：</span>
                  {result.geJu.xiShen}
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">忌神：</span>
                  {result.geJu.jiShen}
                </p>
                <p className="text-gray-600 text-sm mt-3">{result.geJu.description}</p>
              </div>
            </div>

            {/* 神煞系统 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">⭐ 神煞系统（三命通会）</h2>
              <div className="space-y-3">
                {Object.entries(result.shenSha).map(([position, shaList]: [string, any]) => (
                  <div key={position}>
                    <p className="text-gray-500 text-sm mb-1">
                      {position === "nian" ? "年柱" : position === "yue" ? "月柱" : position === "ri" ? "日柱" : "时柱"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {shaList.map((sha: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {sha}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 穷通宝鉴 */}
            {result.qiongTong && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">📚 穷通宝鉴</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <p className="text-yellow-800 font-medium mb-2">原文</p>
                    <p className="text-yellow-700">{result.qiongTong.yuanwen}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-blue-800 font-medium mb-2">译文</p>
                    <p className="text-blue-700">{result.qiongTong.yiwen}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
