"use client"

import Header from "../components/Header"
import Link from "next/link"

// M&A 재무자문 순위 데이터
const financialAdvisoryRankings = [
  { rank: 1, company: "삼일PwC", amount: 83873, deals: 114 },
  { rank: 2, company: "삼정KPMG", amount: 65937, deals: 77 },
  { rank: 3, company: "모건스탠리", amount: 62129, deals: 5 },
  { rank: 4, company: "크레디트스위스", amount: 61769, deals: 13 },
  { rank: 5, company: "씨티글로벌마켓증권", amount: 51525, deals: 3 },
  { rank: 6, company: "JPMorgan", amount: 42730, deals: 8 },
  { rank: 7, company: "NH투자증권", amount: 34978, deals: 4 },
  { rank: 8, company: "도이치뱅크", amount: 32485, deals: 4 },
  { rank: 9, company: "BOA메릴린치", amount: 25935, deals: 3 },
  { rank: 10, company: "골드만삭스", amount: 23825, deals: 2 },
]

// 매각자문 순위 데이터
const divestitureAdvisoryRankings = [
  { rank: 1, company: "삼일PwC", amount: 214297, deals: 148 },
  { rank: 2, company: "JPMorgan", amount: 114596, deals: 10 },
  { rank: 3, company: "삼정KPMG", amount: 88462, deals: 71 },
  { rank: 4, company: "UBS", amount: 75797, deals: 11 },
  { rank: 5, company: "NH투자증권", amount: 47297, deals: 14 },
  { rank: 6, company: "삼성증권", amount: 43486, deals: 8 },
  { rank: 7, company: "모건스탠리", amount: 39546, deals: 4 },
  { rank: 8, company: "딜로이트안진", amount: 30809, deals: 15 },
  { rank: 9, company: "KBR증권", amount: 26631, deals: 5 },
  { rank: 10, company: "씨티글로벌마켓증권", amount: 21104, deals: 4 },
]

export default function MARankingsPage() {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              홈
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/why-pwc" className="hover:text-orange-600 transition-colors">
              Why PwC
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-orange-600 font-medium">M&A 성사실적</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-16">
            {/* Page Title */}
            <div className="text-center">
              <h1 className="text-5xl font-light text-gray-900 mb-6">M&A 성사실적 1위</h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
              <p className="text-2xl text-gray-700 font-light mb-4">국내 M&A 재무자문 부문 독보적 성과</p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                삼일 PwC는 2023~2024년 2년 연속 재무자문부문 건수 및 거래규모 1위를 달성하며 국내 M&A 시장에서 독보적인
                성과를 보이고 있습니다.
              </p>
            </div>

            {/* Achievement Highlights */}
            <section className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-4">2024년 주요 성과</h2>
                <p className="text-gray-600">삼일 PwC의 M&A 부문별 업계 1위 달성 현황</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">M&A 재무자문 부문</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">거래규모</span>
                      <span className="text-3xl font-bold text-orange-600">83,873억원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">거래건수</span>
                      <span className="text-3xl font-bold text-orange-600">114건</span>
                    </div>
                    <div className="pt-4 border-t border-orange-200">
                      <p className="text-sm text-gray-600">2024년 기준 업계 1위 달성</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">M&A 회계자문 부문</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">거래규모</span>
                      <span className="text-3xl font-bold text-orange-600">214,297억원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">거래건수</span>
                      <span className="text-3xl font-bold text-orange-600">148건</span>
                    </div>
                    <div className="pt-4 border-t border-orange-200">
                      <p className="text-sm text-gray-600">2024년 기준 업계 1위 달성</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Statistics */}
              <div className="mt-8 pt-8 border-t border-orange-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">2년 연속</div>
                    <div className="text-sm text-gray-600">업계 1위</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">298,170억원</div>
                    <div className="text-sm text-gray-600">총 거래규모</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">262건</div>
                    <div className="text-sm text-gray-600">총 거래건수</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">독보적</div>
                    <div className="text-sm text-gray-600">시장 점유율</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Rankings */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 mb-6">상세 순위표</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
                <p className="text-lg text-gray-600 leading-relaxed">2024년 국내 M&A 시장 주요 자문사별 성과 비교</p>
              </div>

              {/* Rankings Tables */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* M&A 재무자문 순위 */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                    <h3 className="text-xl font-semibold text-center">M&A 재무자문 순위</h3>
                    <p className="text-sm text-center text-orange-100 mt-2">(단위: 억원, 건)</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            순위
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            회사명
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            거래규모
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            건수
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {financialAdvisoryRankings.map((item, index) => (
                          <tr
                            key={item.rank}
                            className={`${item.rank === 1 ? "bg-orange-50 border-l-4 border-orange-500" : "hover:bg-gray-50"} transition-colors`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold ${
                                  item.rank === 1
                                    ? "bg-orange-500 text-white"
                                    : item.rank <= 3
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {item.rank}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${item.rank === 1 ? "text-orange-900" : "text-gray-900"}`}
                              >
                                {item.company}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div
                                className={`text-sm font-semibold ${item.rank === 1 ? "text-orange-600" : "text-gray-900"}`}
                              >
                                {formatAmount(item.amount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div
                                className={`text-sm ${item.rank === 1 ? "text-orange-600 font-semibold" : "text-gray-600"}`}
                              >
                                {item.deals}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 매각자문 순위 */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                    <h3 className="text-xl font-semibold text-center">매각자문 순위</h3>
                    <p className="text-sm text-center text-orange-100 mt-2">(단위: 억원, 건)</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            순위
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            회사명
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            거래규모
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            건수
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {divestitureAdvisoryRankings.map((item, index) => (
                          <tr
                            key={item.rank}
                            className={`${item.rank === 1 ? "bg-orange-50 border-l-4 border-orange-500" : "hover:bg-gray-50"} transition-colors`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold ${
                                  item.rank === 1
                                    ? "bg-orange-500 text-white"
                                    : item.rank <= 3
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {item.rank}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className={`text-sm font-medium ${item.rank === 1 ? "text-orange-900" : "text-gray-900"}`}
                              >
                                {item.company}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div
                                className={`text-sm font-semibold ${item.rank === 1 ? "text-orange-600" : "text-gray-900"}`}
                              >
                                {formatAmount(item.amount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div
                                className={`text-sm ${item.rank === 1 ? "text-orange-600 font-semibold" : "text-gray-600"}`}
                              >
                                {item.deals}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-500">출처: 딜사이트(Dealsite)</p>
              </div>
            </section>

            {/* Market Analysis */}

            {/* Contact CTA */}
            <section>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-orange-900 mb-4">M&A 전문가와 상담하세요</h3>
                  <p className="text-orange-800 leading-relaxed mb-6 max-w-2xl mx-auto">
                    업계 1위의 실적과 전문성을 바탕으로 귀하의 M&A 목표 달성을 위한 최적의 솔루션을 제공해드립니다.
                  </p>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    전문가 상담 신청
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
