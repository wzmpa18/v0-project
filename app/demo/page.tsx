"use client"

import { useState } from "react"

export default function DemoPage() {
  // 直接硬编码一个演示结果
  const result = {
    bazi: {
      name: "测试用户",
      gender: "male",
      solarDate: "2026年6月2日",
      lunarDate: "2026年6月2日",
      age: 25,
      siZhu: {
        year: { gan: "丙", zhi: "午", shiShen: "劫财", cangGan: ["丁", "己"], naYin: "天河水" },
        month: { gan: "癸", zhi: "巳", shiShen: "七杀", cangGan: ["丙", "庚", "戊"], naYin: "长流水" },
        day: { gan: "丁", zhi: "未", shiShen: "日主", cangGan: ["己", "丁", "乙"], naYin: "天河水" },
        hour: { gan: "甲", zhi: "辰", shiShen: "正印", cangGan: ["戊", "乙", "癸"], naYin: "覆灯火" }
      }
    },
    wangShuai: {
      level: "中和",
      score: 5,
      details: [
        "丁日主，火命，生于巳月",
        "月令得令，气势不弱",
        "天干得甲木助力，增力10分"
      ]
    },
    geJu: {
      type: "正官格",
      yongShen: "壬水",
      xiShen: "庚金",
      jiShen: "丙火",
      description: "此命丁火生于巳月，火旺得令，取壬水为用神，庚金为喜神"
    },
    shenSha: {
      year: ["将星", "金舆", "福星贵人"],
      month: ["天德合", "天医"],
      day: ["阴差阳错", "禄神", "羊刃"],
      hour: ["太极贵人", "文昌贵人", "天厨贵人"]
    },
    qiongTong: {
      yuanwen: "丁火生于巳月，火旺得令，取壬水为用，庚金为佐。",
      yiwen: "丁火生于巳月，火的气势旺盛，以壬水为用神，庚金为辅助。"
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">八字命理演示页面</h1>
          <p className="text-gray-600 mb-4">这是完整的八字排盘结果！</p>
        </div>

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
                <p className="text-gray-800">男</p>
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
                    {position === "year" ? "年柱" : position === "month" ? "月柱" : position === "day" ? "日柱" : "时柱"}
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
        </div>
      </div>
    </div>
  )
}
