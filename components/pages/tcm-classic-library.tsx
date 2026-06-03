
"use client";

import React, { useState, useRef } from "react";
import {
  BookOpen,
  User,
  Award,
  Search,
  ChevronRight,
  ChevronDown,
  Scroll,
  Brain,
  Heart,
  FileText,
  Star,
  PlayCircle,
  Pencil,
  ArrowLeft,
  Home,
  Bookmark
} from "lucide-react";
import {
  NI_HAIXIA_APPROVED_PHYSICIANS,
  getAllPhysicians,
  searchPhysicians
} from "@/lib/tcm-physicians-complete";
import {
  NI_HAI_XIA_FOUR_CLASSICS,
  getAllClassics
} from "@/lib/tcm-classics-complete";
import {
  getAllFormulas,
  searchFormulas
} from "@/lib/tcm-classic-formulas-full";

type ViewMode = "physicians" | "classics" | "formulas" | "ni-notes";

export default function TCMClassicLibrary() {
  const [viewMode, setViewMode] = useState<ViewMode>("physicians");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [expandedSchool, setExpandedSchool] = useState<string | null>("ancient");
  
  // 过滤后的列表
  const physicians = searchQuery 
    ? searchPhysicians(searchQuery)
    : getAllPhysicians();
    
  const classics = getAllClassics();
  const formulas = searchQuery
    ? searchFormulas(searchQuery)
    : getAllFormulas().slice(0, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-purple-50">
      {/* 头部 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0e7490] flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">倪海厦经方传承数据库</h1>
              <p className="text-sm text-gray-500">收录完整中医经典、经方家、259方及课程笔记</p>
            </div>
          </div>
          
          {/* 导航标签 */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            <button
              onClick={() => { setViewMode("physicians"); setSelectedItem(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                viewMode === "physicians" ? "bg-[#0891b2] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <User className="w-4 h-4" />
              <span>经方名家</span>
            </button>
            <button
              onClick={() => { setViewMode("classics"); setSelectedItem(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                viewMode === "classics" ? "bg-[#0891b2] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Scroll className="w-4 h-4" />
              <span>经典古籍</span>
            </button>
            <button
              onClick={() => { setViewMode("formulas"); setSelectedItem(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                viewMode === "formulas" ? "bg-[#0891b2] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>经典方剂</span>
            </button>
            <button
              onClick={() => { setViewMode("ni-notes"); setSelectedItem(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                viewMode === "ni-notes" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>倪海厦笔记</span>
            </button>
          </div>
          
          {/* 搜索栏 */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索医家、著作、方剂..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent"
            />
          </div>
        </div>
      </header>
      
      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {!selectedItem ? (
          <>
            {/* 经方名家视图 */}
            {viewMode === "physicians" && (
              <div className="space-y-6">
                {/* 统计卡片 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-[#0891b2]">
                      {Object.keys(NI_HAIXIA_APPROVED_PHYSICIANS.ancient).length}
                    </div>
                    <div className="text-sm text-gray-600">历代经方家</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-purple-600">
                      {Object.keys(NI_HAIXIA_APPROVED_PHYSICIANS.modern).length}
                    </div>
                    <div className="text-sm text-gray-600">近代传承</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-amber-600">
                      {Object.keys(NI_HAIXIA_APPROVED_PHYSICIANS.contemporary).length}
                    </div>
                    <div className="text-sm text-gray-600">当代名家</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-red-600">
                      {Object.keys(NI_HAIXIA_APPROVED_PHYSICIANS.japanese).length}
                    </div>
                    <div className="text-sm text-gray-600">日本汉方</div>
                  </div>
                </div>
                
                {/* 医家分类 */}
                <div className="space-y-4">
                  {Object.entries(NI_HAIXIA_APPROVED_PHYSICIANS).map(([key, school]: [string, any]) => {
                    let schoolName = "";
                    switch(key) {
                      case "ancient": schoolName = "一、中国历代经方家"; break;
                      case "modern": schoolName = "二、近代经方家（倪海厦传承相关）"; break;
                      case "contemporary": schoolName = "三、倪海厦公开认可的当代经方家"; break;
                      case "japanese": schoolName = "四、日本经方家（倪海厦推荐著作）"; break;
                    }
                    return (
                      <div key={key} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <button
                          onClick={() => setExpandedSchool(expandedSchool === key ? null : key)}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            {key === "ancient" && <User className="w-5 h-5 text-[#0891b2]" />}
                            {key === "modern" && <Brain className="w-5 h-5 text-purple-600" />}
                            {key === "contemporary" && <Award className="w-5 h-5 text-amber-600" />}
                            {key === "japanese" && <Scroll className="w-5 h-5 text-red-600" />}
                            <span className="font-bold text-gray-800">{schoolName}</span>
                            <span className="text-xs text-gray-400">{school.length}人</span>
                          </div>
                          {expandedSchool === key ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                        </button>
                        {expandedSchool === key && (
                          <div className="border-t border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {school.map((physician: any) => (
                              <button
                                key={physician.id}
                                onClick={() => setSelectedItem({ type: "physician", data: physician })}
                                className="p-4 rounded-xl border border-gray-100 hover:border-[#0891b2] hover:shadow-md transition-all text-left bg-gradient-to-r from-white to-gray-50"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0891b2]/20 to-[#0e7490]/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-[#0891b2]" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-800">{physician.name}</div>
                                    {physician.alias && <div className="text-xs text-gray-500">别号：{physician.alias}</div>}
                                    <div className="text-xs text-gray-500">{physician.title} · {physician.dynasty}</div>
                                  </div>
                                </div>
                                {physician.works && physician.works.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {physician.works.slice(0, 3).map((work: string, i: number) => (
                                      <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                                        {work}
                                      </span>
                                    ))}
                                    {physician.works.length > 3 && (
                                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-400">+{physician.works.length - 3}</span>
                                    )}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* 经典古籍视图 */}
            {viewMode === "classics" && (
              <div className="space-y-6">
                {/* 倪海厦四件套特展 */}
                <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-6 h-6 text-amber-600" />
                    <h2 className="text-xl font-bold text-amber-900">倪海厦推荐四件套</h2>
                  </div>
                  <p className="text-sm text-amber-800 mb-4">
                    倪海厦先生反复强调，这四部经典是学习中医必读的：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(NI_HAI_XIA_FOUR_CLASSICS).map(([key, classic]: [string, any]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedItem({ type: "classic", data: classic })}
                        className="p-4 bg-white rounded-xl shadow-sm border border-amber-200 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{classic.name}</div>
                            <div className="text-xs text-gray-500">{classic.dynasty}</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{classic.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 其他经典 */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">其他中医经典</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(classics).filter(([k]: [string, any]) => !NI_HAI_XIA_FOUR_CLASSICS[k as keyof typeof NI_HAI_XIA_FOUR_CLASSICS]).map(([key, classic]: [string, any]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedItem({ type: "classic", data: classic })}
                        className="p-4 flex items-start gap-4 rounded-xl border border-gray-100 hover:border-[#0891b2] hover:bg-[#0891b2]/5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                          <Scroll className="w-5 h-5 text-[#0891b2]" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-gray-800">{classic.name}</div>
                          <div className="text-xs text-gray-500">{classic.author} · {classic.dynasty}</div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{classic.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* 经典方剂视图 */}
            {viewMode === "formulas" && (
              <div className="space-y-6">
                {/* 统计 */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#0891b2] to-[#0e7490] rounded-2xl p-5 text-white">
                    <div className="text-4xl font-bold">113</div>
                    <div className="text-sm opacity-80">伤寒论方</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white">
                    <div className="text-4xl font-bold">262</div>
                    <div className="text-sm opacity-80">金匮要略方</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-5 text-white">
                    <div className="text-4xl font-bold">259</div>
                    <div className="text-sm opacity-80">倪海厦汇总</div>
                  </div>
                </div>
                
                {/* 方剂分类 */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">方剂列表</h3>
                    <p className="text-xs text-gray-500">点击查看详情</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 max-h-[500px] overflow-y-auto">
                    {formulas.map((formula: any, i: number) => (
                      <button
                        key={formula.id}
                        onClick={() => setSelectedItem({ type: "formula", data: formula })}
                        className="p-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 border border-gray-100 hover:border-[#0891b2] transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center text-xs font-bold text-red-600">
                          {i + 1}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-800">{formula.name}</div>
                          <div className="text-xs text-gray-500">{formula.source}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* 倪海厦笔记视图 */}
            {viewMode === "ni-notes" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                  <div className="flex items-center gap-2 mb-4">
                    <PlayCircle className="w-6 h-6 text-amber-600" />
                    <h2 className="text-xl font-bold text-amber-900">倪海厦课程核心笔记</h2>
                  </div>
                  <p className="text-sm text-amber-800">
                    以下是根据倪海厦先生课程整理的核心笔记，供学习参考：
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "伤寒论笔记", count: "113方详解", color: "blue" },
                    { title: "金匮要略笔记", count: "262方详解", color: "purple" },
                    { title: "针灸笔记", count: "十四经络、董氏奇穴", color: "red" },
                    { title: "神农本草经笔记", count: "365味药详解", color: "green" },
                    { title: "黄帝内经笔记", count: "基础理论、诊断", color: "orange" },
                  ].map((note, i) => (
                    <div key={i} className={`bg-white rounded-2xl p-5 border-l-4 border-${note.color}-500 shadow-sm`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">{note.title}</h3>
                          <p className="text-sm text-gray-500">{note.count}</p>
                        </div>
                        <div className="text-2xl">📚</div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 line-clamp-2">
                        根据倪海厦先生人纪班课程整理，包含原文、译文、注解、临床应用等内容。
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-[#0891b2]" />
                    <span>核心学术观点</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      "阳常有余，阴常不足 — 扶阳思想",
                      "六经辨证贯穿百病",
                      "经方是经典之方，不可随便加减",
                      "针药并用，效果倍增",
                      "有是证用是方",
                      "腹诊、脉诊、舌诊合参",
                    ].map((quote, i) => (
                      <div key={i} className="p-4 bg-[#0891b2]/5 rounded-xl border-l-4 border-[#0891b2]">
                        <p className="text-gray-700">“{quote}”</p>
                        <p className="text-xs text-gray-500 mt-2">— 倪海厦</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* 详情视图 */
          <div className="space-y-6">
            <button
              onClick={() => setSelectedItem(null)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回</span>
            </button>
            
            {/* 医家详情 */}
            {selectedItem.type === "physician" && (
              <PhysicianDetail physician={selectedItem.data} />
            )}
            
            {/* 经典详情 */}
            {selectedItem.type === "classic" && (
              <ClassicDetail classic={selectedItem.data} />
            )}
            
            {/* 方剂详情 */}
            {selectedItem.type === "formula" && (
              <FormulaDetail formula={selectedItem.data} />
            )}
          </div>
        )}
      </main>
      
      {/* 底部统计 */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#0891b2]">
                {getAllPhysicians().length}
              </div>
              <div className="text-xs text-gray-500">收录医家</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                20+
              </div>
              <div className="text-xs text-gray-500">收录古籍</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">
                259
              </div>
              <div className="text-xs text-gray-500">收录方剂</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                4+
              </div>
              <div className="text-xs text-gray-500">倪海厦必读</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 医家详情
function PhysicianDetail({ physician }: { physician: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#0891b2]/10 to-[#0e7490]/10">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0891b2] to-[#0e7490] flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{physician.name}</h2>
            {physician.alias && <p className="text-sm text-gray-500">别号：{physician.alias}</p>}
            <p className="text-sm text-[#0891b2] font-medium">{physician.title}</p>
            <p className="text-sm text-gray-600">{physician.dynasty} · {physician.birthDeath}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* 简介 */}
        {physician.description && (
          <section>
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#0891b2]" />
              <span>简介</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">{physician.description}</p>
          </section>
        )}
        
        {/* 贡献 */}
        {physician.contribution && (
          <section>
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>学术贡献</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">{physician.contribution}</p>
          </section>
        )}
        
        {/* 著作 */}
        {physician.works && physician.works.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>代表著作</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {physician.works.map((work: string, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-gray-700 text-sm">{work}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 名言 */}
        {physician.quotes && physician.quotes.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span>名言警句</span>
            </h3>
            <div className="space-y-3">
              {physician.quotes.map((quote: string, i: number) => (
                <div key={i} className="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                  <p className="text-gray-700 italic">“{quote}”</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 倪海厦点评 */}
        {physician.niNotes && physician.niNotes.length > 0 && (
          <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>倪海厦点评</span>
            </h3>
            <div className="space-y-2">
              {physician.niNotes.map((note: string, i: number) => (
                <p key={i} className="text-amber-800 text-sm leading-relaxed">
                  • {note}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// 经典详情
function ClassicDetail({ classic }: { classic: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-start gap-4">
          <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{classic.name}</h2>
            <p className="text-gray-600">{classic.author}</p>
            <p className="text-sm text-gray-500">{classic.dynasty}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* 简介 */}
        {classic.description && (
          <section>
            <h3 className="font-bold text-gray-800 mb-2">简介</h3>
            <p className="text-gray-600 leading-relaxed">{classic.description}</p>
          </section>
        )}
        
        {/* 核心理论 */}
        {classic.coreTheory && classic.coreTheory.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3">核心理论</h3>
            <div className="flex flex-wrap gap-2">
              {classic.coreTheory.map((theory: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {theory}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {/* 重要概念 */}
        {classic.keyConcepts && classic.keyConcepts.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3">重要论述</h3>
            <div className="space-y-2">
              {classic.keyConcepts.map((concept: string, i: number) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#0891b2]">
                  <p className="text-gray-700">{concept}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 内容篇章 */}
        {classic.content && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3">主要内容</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(classic.content).slice(0, 10).map(([key, value]: [string, any], i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="font-medium text-gray-800 text-sm">{key}</div>
                  {Array.isArray(value) && (
                    <div className="text-xs text-gray-500 mt-1">
                      {value.slice(0, 3).join(" · ")}
                      {value.length > 3 && " · …"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// 方剂详情
function FormulaDetail({ formula }: { formula: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{formula.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{formula.pinyin}</p>
            <p className="text-sm text-[#0891b2] font-medium">{formula.source}</p>
            {formula.chapter && <p className="text-xs text-gray-500">{formula.chapter}</p>}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* 组成 */}
        {formula.composition && formula.composition.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3">药物组成</h3>
            <div className="flex flex-wrap gap-2">
              {formula.composition.map((herb: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-red-50 text-red-700 rounded-full border border-red-100">
                  {herb}
                </span>
              ))}
            </div>
            {formula.modernDosage && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">现代常用量</p>
                <p className="text-sm text-gray-700">{formula.modernDosage.join("，")}</p>
              </div>
            )}
          </section>
        )}
        
        {/* 功效 */}
        {formula.functions && formula.functions.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-2">功效</h3>
            <div className="flex flex-wrap gap-2">
              {formula.functions.map((f: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-green-50 text-green-700 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {/* 主治 */}
        {formula.indications && formula.indications.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3">主治</h3>
            <div className="space-y-2">
              {formula.indications.map((ind: string, i: number) => (
                <div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-gray-700">
                  {ind}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 方解 */}
        {formula.analysis && formula.analysis.length > 0 && (
          <section>
            <h3 className="font-bold text-gray-800 mb-3">方解</h3>
            <div className="space-y-2">
              {formula.analysis.map((a: string, i: number) => (
                <p key={i} className="text-sm text-gray-600 pl-4 border-l-2 border-purple-300">
                  {a}
                </p>
              ))}
            </div>
          </section>
        )}
        
        {/* 倪海厦笔记 */}
        {formula.niNotes && formula.niNotes.length > 0 && (
          <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>倪海厦笔记</span>
            </h3>
            <div className="space-y-2">
              {formula.niNotes.map((note: string, i: number) => (
                <p key={i} className="text-amber-800 text-sm leading-relaxed">
                  • {note}
                </p>
              ))}
            </div>
          </section>
        )}
        
        {/* 舌脉 */}
        {(formula.tongue || formula.pulse) && (
          <section className="grid grid-cols-2 gap-4">
            {formula.tongue && (
              <div className="p-4 bg-orange-50 rounded-xl">
                <h4 className="font-medium text-orange-900 mb-1">舌象</h4>
                <p className="text-sm text-orange-700">{formula.tongue}</p>
              </div>
            )}
            {formula.pulse && (
              <div className="p-4 bg-pink-50 rounded-xl">
                <h4 className="font-medium text-pink-900 mb-1">脉象</h4>
                <p className="text-sm text-pink-700">{formula.pulse}</p>
              </div>
            )}
          </section>
        )}
        
        {/* 禁忌 */}
        {formula.contraindications && formula.contraindications.length > 0 && (
          <section className="bg-red-50 rounded-2xl p-5 border border-red-200">
            <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>禁忌</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {formula.contraindications.map((ci: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  {ci}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
