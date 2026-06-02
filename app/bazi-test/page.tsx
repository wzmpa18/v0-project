"use client"

import { useState, useEffect } from "react"
import { calculateBazi } from "@/lib/bazi-data"
import { calculateWangShuai } from "@/lib/bazi-wangshuai"
import { determineGeJuSimple as determineGeJu } from "@/lib/bazi-geju"
import { getGuJiContent, getDuanYu } from "@/lib/bazi-guji-data"
import { checkShenShaByPosition } from "@/lib/bazi-shenshe"

export default function BaziTestPage() {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const baziData = calculateBazi({
      year: 1990,
      month: 1,
      day: 15,
      hour: 12,
      minute: 0
    })

    const wangShuai = calculateWangShuai({
      yearGan: baziData.siZhu.year.gan,
      yearZhi: baziData.siZhu.year.zhi,
      monthGan: baziData.siZhu.month.gan,
      monthZhi: baziData.siZhu.month.zhi,
      dayGan: baziData.siZhu.day.gan,
      dayZhi: baziData.siZhu.day.zhi,
      hourGan: baziData.siZhu.hour.gan,
      hourZhi: baziData.siZhu.hour.zhi
    })

    const geJu = determineGeJu({
      yearGan: baziData.siZhu.year.gan,
      yearZhi: baziData.siZhu.year.zhi,
      monthGan: baziData.siZhu.month.gan,
      monthZhi: baziData.siZhu.month.zhi,
      dayGan: baziData.siZhu.day.gan,
      dayZhi: baziData.siZhu.day.zhi,
      hourGan: baziData.siZhu.hour.gan,
      hourZhi: baziData.siZhu.hour.zhi
    })

    const guJi = getGuJiContent(baziData.siZhu.day.gan, baziData.siZhu.month.zhi)
    const duanYu = getDuanYu(baziData.siZhu.day.gan, baziData.siZhu.month.zhi, geJu.name)
    const shenSha = checkShenShaByPosition({
      yearGan: baziData.siZhu.year.gan,
      yearZhi: baziData.siZhu.year.zhi,
      monthGan: baziData.siZhu.month.gan,
      monthZhi: baziData.siZhu.month.zhi,
      dayGan: baziData.siZhu.day.gan,
      dayZhi: baziData.siZhu.day.zhi,
      hourGan: baziData.siZhu.hour.gan,
      hourZhi: baziData.siZhu.hour.zhi
    })

    setResult({
      bazi: baziData,
      wangShuai,
      geJu,
      guJi,
      duanYu,
      shenSha
    })
  }, [])

  if (!result) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">八字排盘测试页面</h1>
      
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">基本信息</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result.bazi, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">旺衰分析</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result.wangShuai, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">格局判定</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result.geJu, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">古籍内容</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result.guJi, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">断语</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result.duanYu, null, 2)}
        </pre>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">神煞</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result.shenSha, null, 2)}
        </pre>
      </div>
    </div>
  )
}
