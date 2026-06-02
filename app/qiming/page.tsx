"use client"

export default function QiMingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 to-gray-900 text-white pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-cyan-400">起名工具</h1>
          <p className="text-gray-400 text-sm mt-1">基于姓名学与八字</p>
        </div>
        
        <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
          <p className="text-gray-300">起名工具开发中...</p>
          <p className="text-amber-400 text-sm mt-2">基于《姓名学》《渊海子平》</p>
        </div>
      </div>
    </div>
  )
}
