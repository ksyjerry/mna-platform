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

export default function WhyPwCPage() {
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
            <span className="text-orange-600 font-medium">Why PwC</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          {/* 2열 그리드 레이아웃 */}
          <div className="space-y-16">
            {/* 1열: 제목 + 모든 콘텐츠 */}
            <div className="space-y-16">
              {/* Page Title */}
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-6">Why PwC</h1>
                <div className="w-24 h-1 bg-orange-500 mb-8"></div>
                <p className="text-2xl text-gray-700 font-light mb-4">삼일 PwC의 차별화된 M&A 서비스 포인트</p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  글로벌 네트워크와 전문성을 바탕으로 한국 최고의 M&A 서비스를 제공하는 삼일 PwC의 강점을 확인해보세요.
                </p>
              </div>

              {/* Service Points Section */}
              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-12">삼일 PwC의 차별화된 M&A 서비스 포인트</h2>

                {/* Main Content Grid - Left: Service Points, Right: Image */}
                <div className="grid lg:grid-cols-3 gap-12 mb-16">
                  {/* Left Side - 4 Service Points */}
                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* M&A 성사실적1위 */}
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-6 relative min-h-[220px] flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg
                              className="w-7 h-7 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">M&A 성사실적1위</h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            삼일 PwC는 2024년 M&A 재무자문 거래규모 및 거래건수 리그테이블 1위를 차지한 국내 M&A 서비스
                            부문을 리드하는 독보적인 M&A 자문사입니다.
                          </p>
                        </div>
                        <Link href="/ma-rankings">
                          <button className="mt-4 px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
                            자세히 보기
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </Link>
                      </div>

                      {/* 압도적인 M&A 정보 네트워크 */}
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-6 relative min-h-[220px] flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg
                              className="w-7 h-7 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            압도적인 <span className="underline decoration-orange-500">M&A</span> 정보 네트워크
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            삼일회계법인은 중소벤처기업부, 한국벤처캐피탈협회를 비롯한 다양한 협력사와의 파트너쉽을 맺어
                            압도적인 M&A 네트워크에 기반한 국내 최대 M&A 거래 정보망과 매물 리스트를 보유하고 있습니다.
                          </p>
                        </div>
                        <Link href="/ma-network">
                          <button className="mt-4 px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
                            자세히 보기
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </Link>
                      </div>

                      {/* M&A 원스톱 서비스 */}
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-6 relative min-h-[220px] flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg
                              className="w-7 h-7 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">M&A 원스톱 서비스</h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            M&A를 비롯한 다방면의 최고 전문가로 구성된 삼일회계법인은 M&A 준비 및 실행에서 부터 관련
                            세무 및 법률 서비스까지 M&A 와 관련된 서비스를 One-stop으로 제공합니다.
                          </p>
                        </div>
                        <Link href="/ma-onestop">
                          <button className="mt-4 px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
                            자세히 보기
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </Link>
                      </div>

                      {/* 보안 및 신뢰할 수 있는 M&A구조 */}
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-6 relative min-h-[220px] flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg
                              className="w-7 h-7 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            보안 및 신뢰할 수 있는 <span className="underline decoration-orange-500">M&A</span>구조
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            M&A 마케팅 과정에서 우려되는 비밀유지 및 보안과 관련하여 삼일회계법인 내 보안유지 정책를
                            토대로 최고 수준의 보안에 기반하여 신뢰할 수 있는 M&A 서비스를 제공합니다.
                          </p>
                        </div>
                        <Link href="/ma-structure">
                          <button className="mt-4 px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
                            자세히 보기
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Hero Image */}
                  <div className="lg:col-span-1">
                    <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                      <img src="/images/handshake.png" alt="M&A 파트너십" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-blue-900/50"></div>
                      <div className="absolute inset-0 flex items-end justify-center p-6">
                        <div className="text-center text-white">
                          <h3 className="text-2xl md:text-3xl font-light mb-4">신뢰할 수 있는 M&A 파트너</h3>
                          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                            글로벌 네트워크와 전문성을 바탕으로 성공적인 M&A를 위한 최적의 솔루션을 제공합니다
                          </p>
                          <div className="mt-6 pt-6 border-t border-gray-400">
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <div className="text-xl font-bold text-white">2년 연속</div>
                                <div className="text-xs text-gray-300">업계 1위</div>
                              </div>
                              <div>
                                <div className="text-xl font-bold text-white">260+</div>
                                <div className="text-xs text-gray-300">성공 거래</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Visual Element */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 border border-orange-200">
                  <div className="flex items-center justify-center gap-8 flex-wrap">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">2년 연속</div>
                      <div className="text-sm text-gray-600">업계 1위</div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-orange-300"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">300억+</div>
                      <div className="text-sm text-gray-600">누적 거래규모</div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-orange-300"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">260+</div>
                      <div className="text-sm text-gray-600">성공 거래건수</div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-orange-300"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
                      <div className="text-sm text-gray-600">고객 만족도</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact CTA Section */}
              <section>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">삼일 PwC와 함께하세요</h4>
                      <p className="text-orange-800 leading-relaxed mb-4">
                        삼일 PwC의 전문가와 상담을 통해 귀하의 M&A 목표를 달성해보세요. 글로벌 네트워크와 전문성을
                        바탕으로 최적의 솔루션을 제공해드립니다.
                      </p>
                      <Link
                        href="/consultation"
                        className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        전문가 상담 신청
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
