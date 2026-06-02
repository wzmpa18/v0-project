"use client"

import { useState, useRef, useEffect } from "react"
import {
  BookOpen,
  Brain,
  Trophy,
  Target,
  Clock,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Star,
  Filter,
  Search,
  Bookmark,
  History,
  Settings,
  HelpCircle,
  Lightbulb,
  Eye,
  EyeOff
} from "lucide-react"
import {
  QUESTION_CATEGORIES,
  QUESTIONS,
  getQuestionsByCategory,
  searchQuestions,
  getRandomQuestions,
  DIFFICULTY_LABELS,
  TYPE_LABELS,
  Question
} from "@/lib/tcm-exam-bank"

type QuizMode = "learn" | "exam" | "review" | "错题本"
type QuizState = "ready" | "doing" | "submitted"

interface QuizProgress {
  totalQuestions: number
  currentIndex: number
  answers: Record<string, string | string[]>
  correctCount: number
  wrongQuestions: string[]
  score: number
}

export function ExamBankSystem() {
  const [mode, setMode] = useState<QuizMode>("learn")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [quizState, setQuizState] = useState<QuizState>("ready")
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [progress, setProgress] = useState<QuizProgress>({
    totalQuestions: 0,
    currentIndex: 0,
    answers: {},
    correctCount: 0,
    wrongQuestions: [],
    score: 0
  })
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({})

  // 学习模式
  const startLearn = (category: string, subCategory?: string) => {
    const questions = subCategory
      ? getQuestionsByCategory(category, subCategory)
      : getQuestionsByCategory(category)
    setCurrentQuestions(questions)
    setProgress({
      totalQuestions: questions.length,
      currentIndex: 0,
      answers: {},
      correctCount: 0,
      wrongQuestions: [],
      score: 0
    })
    setQuizState("doing")
    setUserAnswers({})
    setShowExplanation(false)
  }

  // 考试模式
  const startExam = (count: number = 10) => {
    const questions = getRandomQuestions(count)
    setCurrentQuestions(questions)
    setProgress({
      totalQuestions: questions.length,
      currentIndex: 0,
      answers: {},
      correctCount: 0,
      wrongQuestions: [],
      score: 0
    })
    setQuizState("doing")
    setUserAnswers({})
    setShowExplanation(false)
  }

  // 提交答案
  const submitAnswer = () => {
    if (mode === "exam") {
      // 考试模式，批量评分
      let correct = 0
      const wrong: string[] = []
      const newAnswers: Record<string, string | string[]> = {}

      currentQuestions.forEach(q => {
        const userAnswer = userAnswers[q.id]
        const isCorrect = checkAnswer(q, userAnswer)
        if (isCorrect) {
          correct++
        } else {
          wrong.push(q.id)
        }
      })

      setProgress(prev => ({
        ...prev,
        answers: userAnswers,
        correctCount: correct,
        wrongQuestions: wrong,
        score: Math.round((correct / currentQuestions.length) * 100)
      }))
    } else {
      // 学习模式，单题显示解析
      setShowExplanation(true)
    }
    setQuizState("submitted")
  }

  // 检查答案是否正确
  const checkAnswer = (question: Question, userAnswer: string | string[] | undefined): boolean => {
    if (!userAnswer) return false
    if (Array.isArray(question.answer)) {
      if (!Array.isArray(userAnswer)) return false
      return question.answer.length === userAnswer.length &&
        question.answer.every(a => userAnswer.includes(a))
    }
    if (Array.isArray(userAnswer)) {
      return userAnswer.length === 1 && userAnswer[0] === question.answer
    }
    return userAnswer === question.answer
  }

  // 下一题
  const nextQuestion = () => {
    if (progress.currentIndex < progress.totalQuestions - 1) {
      setProgress(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }))
      setQuizState("doing")
      setShowExplanation(false)
    }
  }

  // 上一题
  const prevQuestion = () => {
    if (progress.currentIndex > 0) {
      setProgress(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }))
      setQuizState("doing")
      setShowExplanation(false)
    }
  }

  // 选择答案
  const selectAnswer = (questionId: string, answer: string) => {
    const question = currentQuestions.find(q => q.id === questionId)
    if (!question) return

    if (question.type === "multiple") {
      const current = (userAnswers[questionId] as string[]) || []
      if (current.includes(answer)) {
        setUserAnswers(prev => ({
          ...prev,
          [questionId]: current.filter(a => a !== answer)
        }))
      } else {
        setUserAnswers(prev => ({
          ...prev,
          [questionId]: [...current, answer]
        }))
      }
    } else {
      setUserAnswers(prev => ({ ...prev, [questionId]: answer }))
    }
  }

  // 重新开始
  const restart = () => {
    setQuizState("ready")
    setCurrentQuestions([])
    setUserAnswers({})
    setShowExplanation(false)
    setProgress({
      totalQuestions: 0,
      currentIndex: 0,
      answers: {},
      correctCount: 0,
      wrongQuestions: [],
      score: 0
    })
  }

  const currentQuestion = currentQuestions[progress.currentIndex]
  const userAnswer = userAnswers[currentQuestion?.id]
  const isCorrect = currentQuestion ? checkAnswer(currentQuestion, userAnswer) : false

  // 考试结果
  if (mode === "exam" && quizState === "submitted" && progress.totalQuestions > 0) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              progress.score >= 60 ? "bg-green-100" : "bg-red-100"
            }`}>
              {progress.score >= 60 ? (
                <Trophy className="w-12 h-12 text-green-600" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {progress.score >= 60 ? "恭喜通过！" : "继续努力！"}
            </h2>

            <div className="text-5xl font-bold text-[#0891b2] mb-4">
              {progress.score}分
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-3">
                <div className="text-green-600 font-medium">{progress.correctCount}</div>
                <div className="text-xs text-green-500">答对题数</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <div className="text-red-600 font-medium">{progress.totalQuestions - progress.correctCount}</div>
                <div className="text-xs text-red-500">答错题数</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                返回题库
              </button>
              <button
                onClick={() => startExam()}
                className="flex-1 py-3 bg-[#0891b2] text-white rounded-xl font-medium hover:bg-[#0e7490] transition-all"
              >
                再考一次
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 答题界面
  if (quizState === "doing" || quizState === "submitted") {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        {/* 顶部进度 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={restart}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                第 {progress.currentIndex + 1} / {progress.totalQuestions} 题
              </span>
            </div>
            <div className="flex items-center gap-2">
              {currentQuestion && (
                <span className={`px-2 py-1 rounded text-xs ${DIFFICULTY_LABELS[currentQuestion.difficulty].color}`}>
                  {DIFFICULTY_LABELS[currentQuestion.difficulty].label}
                </span>
              )}
            </div>
          </div>

          {/* 进度条 */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0891b2] transition-all duration-300"
              style={{ width: `${((progress.currentIndex + 1) / progress.totalQuestions) * 100}%` }}
            />
          </div>

          {/* 分类标签 */}
          {currentQuestion && (
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                {currentQuestion.category}
              </span>
              <span className="text-gray-400">/</span>
              <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">
                {currentQuestion.subCategory}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {TYPE_LABELS[currentQuestion.type].label}
              </span>
            </div>
          )}
        </div>

        {/* 题目内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentQuestion && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              {/* 题目 */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.type === "multiple" && (
                  <p className="text-sm text-[#0891b2] mt-2">（多选题）</p>
                )}
              </div>

              {/* 选项 */}
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = Array.isArray(userAnswer)
                    ? userAnswer.includes(option)
                    : userAnswer === option

                  let optionClass = "border-gray-200 hover:border-[#0891b2]"
                  if (quizState === "submitted") {
                    const isCorrectOption = Array.isArray(currentQuestion.answer)
                      ? currentQuestion.answer.includes(option)
                      : currentQuestion.answer === option

                    if (isCorrectOption) {
                      optionClass = "border-green-500 bg-green-50"
                    } else if (isSelected && !isCorrectOption) {
                      optionClass = "border-red-500 bg-red-50"
                    }
                  } else if (isSelected) {
                    optionClass = "border-[#0891b2] bg-[#0891b2]/5"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => quizState === "doing" && selectAnswer(currentQuestion.id, option)}
                      disabled={quizState === "submitted"}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          isSelected
                            ? "border-[#0891b2] bg-[#0891b2] text-white"
                            : "border-gray-300 text-gray-500"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-700">{option}</span>
                        {quizState === "submitted" && (
                          <>
                            {Array.isArray(currentQuestion.answer)
                              ? currentQuestion.answer.includes(option) && (
                                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                              )
                              : currentQuestion.answer === option && (
                                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                              )
                            }
                          </>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* 解析 */}
              {showExplanation && quizState === "submitted" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className={`p-3 rounded-xl mb-3 ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-700">回答正确</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-700">回答错误</span>
                        </>
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="text-sm text-green-700">
                        正确答案：{Array.isArray(currentQuestion.answer)
                          ? currentQuestion.answer.join("、")
                          : currentQuestion.answer}
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">解析</span>
                    </div>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                    {currentQuestion.tips && (
                      <p className="text-sm text-blue-600 mt-2 italic">
                        答题技巧：{currentQuestion.tips}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 底部操作 */}
        <div className="bg-white border-t border-gray-200 p-4">
          {quizState === "doing" ? (
            <div className="flex gap-3">
              <button
                onClick={prevQuestion}
                disabled={progress.currentIndex === 0}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                上一题
              </button>
              <button
                onClick={submitAnswer}
                disabled={!userAnswer}
                className="flex-1 py-3 bg-[#0891b2] text-white rounded-xl font-medium hover:bg-[#0e7490] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {mode === "exam" ? "提交答卷" : "确认答案"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={prevQuestion}
                disabled={progress.currentIndex === 0}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                上一题
              </button>
              {progress.currentIndex < progress.totalQuestions - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="flex-1 py-3 bg-[#0891b2] text-white rounded-xl font-medium hover:bg-[#0e7490] flex items-center justify-center gap-2"
                >
                  下一题
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setQuizState("submitted")}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  查看结果
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // 题库主界面
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0891b2]" />
            <h2 className="text-lg font-bold text-gray-800">中医题库</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("learn")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                mode === "learn" ? "bg-[#0891b2] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              学习
            </button>
            <button
              onClick={() => setMode("exam")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                mode === "exam" ? "bg-[#0891b2] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              考试
            </button>
          </div>
        </div>

        {/* 搜索 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索题目..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
          />
        </div>
      </div>

      {/* 题目列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {mode === "learn" ? (
          <>
            {/* 快速开始 */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">快速开始</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => startExam(10)}
                  className="p-4 bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white rounded-xl text-left"
                >
                  <div className="font-medium mb-1">随机练习</div>
                  <div className="text-xs opacity-80">随机10道题目</div>
                </button>
                <button
                  onClick={() => startExam(20)}
                  className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-left"
                >
                  <div className="font-medium mb-1">强化训练</div>
                  <div className="text-xs opacity-80">随机20道题目</div>
                </button>
              </div>
            </div>

            {/* 分类列表 */}
            <div className="text-sm font-medium text-gray-700 mb-2">题目分类</div>
            {Object.entries(QUESTION_CATEGORIES).map(([category, subCategories]) => (
              <div key={category} className="mb-3">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className="w-full p-3 flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800">{category}</span>
                    {selectedCategory === category ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {selectedCategory === category && (
                    <div className="p-3 pt-0 space-y-2">
                      {Object.entries(subCategories).map(([subCategory, topics]) => (
                        <div key={subCategory}>
                          <div className="text-xs text-[#0891b2] mb-1">{subCategory}</div>
                          <div className="flex flex-wrap gap-1">
                            {topics.map((topic) => (
                              <button
                                key={topic}
                                onClick={() => startLearn(category, topic)}
                                className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-600 hover:bg-[#0891b2] hover:text-white transition-all"
                              >
                                {topic}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* 考试模式 */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">选择题量</div>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20, 30, 50, 100].map(count => (
                  <button
                    key={count}
                    onClick={() => startExam(count)}
                    className="p-4 bg-white rounded-xl border border-gray-200 text-center hover:border-[#0891b2] transition-all"
                  >
                    <div className="text-2xl font-bold text-[#0891b2]">{count}</div>
                    <div className="text-xs text-gray-500">道题</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">考试说明</span>
              </div>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 考试时间为无限，直到提交答卷</li>
                <li>• 提交后将显示得分和正确答案</li>
                <li>• 60分及格，可多次练习</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// 题目卡片组件
function QuestionCard({
  question,
  onClick
}: {
  question: Question
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl p-4 text-left border border-gray-200 hover:border-[#0891b2] transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-0.5 rounded text-xs ${DIFFICULTY_LABELS[question.difficulty].color}`}>
          {DIFFICULTY_LABELS[question.difficulty].label}
        </span>
        <span className="text-xs text-gray-400">
          {TYPE_LABELS[question.type].label}
        </span>
      </div>
      <p className="text-sm text-gray-800 line-clamp-2">{question.question}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
          {question.category}
        </span>
        <span className="text-xs text-gray-400">{question.subCategory}</span>
      </div>
    </button>
  )
}
