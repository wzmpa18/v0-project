"use client"

import { Hand } from "lucide-react"

export default function XiangshouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#1f1814] to-[#241c16] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-lime-700 flex items-center justify-center">
          <Hand className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-lime-400">手相学</h1>
          <p className="text-xs text-lime-200/60">掌纹解读 · 命运密码</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
        <h2 className="text-sm font-bold text-lime-300 mb-3">功能介绍</h2>
        <p className="text-xs text-lime-100/80 leading-relaxed">
          手相学通过观察手掌的纹路、形状和颜色来推断一个人的性格、健康和命运。
          主要包括生命线、智慧线、感情线三大主线的解读。
        </p>
      </div>

      <div className="mt-4 bg-gradient-to-br from-lime-900/40 to-lime-950/60 rounded-xl p-4 border border-lime-800/30">
        <h2 className="text-sm font-bold text-lime-300 mb-3">三大主线</h2>
        <div className="space-y-2">
          {[{ name: "生命线", desc: "代表生命力、健康状况、寿命长短" }, { name: "智慧线", desc: "代表智慧、思维能力、学业成就" }, { name: "感情线", desc: "代表感情生活、婚姻状况、人际关系" }].map((item) => (
            <div key={item.name} className="bg-lime-800/30 rounded-lg p-3">
              <div className="text-sm font-medium text-lime-300">{item.name}</div>
              <div className="text-xs text-lime-100/60">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-lime-400/50">
        功能开发中，敬请期待...
      </div>
    </div>
  )
}