"use client"

import Header from "../components/Header"
import Link from "next/link"
import { useState } from "react"

export default function MAOneStopPage() {
  const [expandedCenter, setExpandedCenter] = useState<string | null>(null)

  const handleCenterExpand = (centerName: string) => {
    setExpandedCenter(expandedCenter === centerName ? null : centerName)
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
            <span className="text-orange-600 font-medium">M&A 원스톱 서비스</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-16">
            {/* Page Title */}
            <div className="text-center">
              <h1 className="text-5xl font-light text-gray-900 mb-6">M&A 원스톱 서비스</h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                삼일 PwC는 Deal 구조수립에서부터 매수·매도 후보자 물색, 실사(Due diligence), 가치평가 및 가격협상을 통한
                거래 종결까지 M&A 과정 전반에 걸친 종합적 자문을 통해 성공적인 거래 종결을 One-stop으로 지원합니다.
              </p>
            </div>

            {/* Detailed Services */}
            <section>
              <h2 className="text-3xl font-light text-gray-900 text-center mb-12">상세 서비스 내용</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Deal 구조 수립 */}
                <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Deal 구조 수립</h3>
                  <p className="text-gray-600 leading-relaxed">
                    고객의 전략적 목표에 맞는 최적의 거래 구조를 설계하고, 세무 효율성과 리스크를 종합적으로 고려한
                    구조화 방안을 제시합니다.
                  </p>
                </div>

                {/* 매수·매도 후보자 물색 */}
                <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">매수·매도 후보자 물색</h3>
                  <p className="text-gray-600 leading-relaxed">
                    광범위한 네트워크와 데이터베이스를 활용하여 최적의 매수·매도 후보자를 발굴하고, 전략적 적합성을
                    평가합니다.
                  </p>
                </div>

                {/* 실사 및 타당성 분석 */}
                <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">실사 및 타당성 분석</h3>
                  <p className="text-gray-600 leading-relaxed">
                    재무, 세무, 법무, 운영 등 다각도의 실사를 통해 리스크를 식별하고, 거래의 타당성을 종합적으로
                    분석합니다.
                  </p>
                </div>

                {/* 가치평가 및 가격협상 */}
                <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">가치평가 및 가격협상</h3>
                  <p className="text-gray-600 leading-relaxed">
                    다양한 평가 방법론을 활용한 정확한 기업가치 산정과 전략적 협상을 통해 최���의 거래 조건을 확보합니다.
                  </p>
                </div>

                {/* 자금조달 */}
                <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">자금조달</h3>
                  <p className="text-gray-600 leading-relaxed">
                    다양한 자금조달 옵션을 검토하고, 최적의 자본구조와 금융기관 연결을 통해 효율적인 자금조달을
                    지원합니다.
                  </p>
                </div>

                {/* PMI */}
                <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">PMI (Post-Merger Integration)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    인수 후 통합 과정에서 발생하는 다양한 이슈들을 체계적으로 관리하여 시너지 효과를 극대화합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* M&A Support Centers */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 mb-6">삼일PwC M&A 지원센터</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  삼일 PwC는 고객의 딜 프로세스 목적과 성격에 맞는 다수의 M&A 관련 지원센터를 운영하고 있습니다. 이를
                  토대로 고객의 목적과 딜의 성격에 맞는 M&A 서비스를 원스톱으로 제공합니다.
                </p>
              </div>

              <div className="space-y-8">
                {/* 유니콘 플랫폼 */}
                <div
                  className={`bg-white border border-orange-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-700 ease-in-out ${
                    expandedCenter === "unicorn"
                      ? "transform scale-105"
                      : expandedCenter && expandedCenter !== "unicorn"
                        ? "transform scale-95 opacity-75"
                        : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">유니콘 플랫폼</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      고성장 스타트업과 유니콘 기업을 위한 특화된 M&A 플랫폼입니다.
                    </p>
                    <button
                      onClick={() => handleCenterExpand("unicorn")}
                      className="flex items-center justify-between w-full cursor-pointer text-orange-600 font-medium hover:text-orange-700 transition-colors"
                    >
                      자세히 보기
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          expandedCenter === "unicorn" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        expandedCenter === "unicorn" ? "max-h-screen opacity-100 mt-6" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-200 space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">
                            삼일회계법인은 다수 유니콘·예비유니콘 기업의 창업에서부터 성장, 투자유치 및 M&A, 국내외 상장
                            및 Exit에 대한 지원경험을 바탕으로{" "}
                            <strong className="text-orange-600">Unicorn Platform</strong>을 발족하였습니다. 기업가치를
                            극대화하고 성장과 글로벌 경쟁력, 내실과 안정을 지원하는 최적의 솔루션 제공을 통해 귀사와
                            함께하는 최고의 비즈니스 파트너가 되겠습니다.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            Our Services
                          </h4>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* 자금조달 및 투자유치 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">자금조달 및 투자유치</h5>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• 최적 자본 구조 설계, 조달 및 상환 Plan수립</li>
                                    <li>• 재무적/전략적 투자자 탐색 및 Deal Process 실행</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* IR Package Service */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">IR Package Service</h5>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• 투자소개서 작성, Projection Modeling</li>
                                    <li>• 산업분석, 투자자 대응</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* M&A 자문 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">M&A(인수 및 매각 자문)</h5>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Target 탐색 및 인수합병, Deal Structure 수립</li>
                                    <li>• 인수 및 매도 협상 지원 및 PMI 실행</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* 실사 및 기업가치 평가 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">실사 및 기업가치 평가</h5>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• PPA/손상 검토, 기업가치평가</li>
                                    <li>• Financial Due Diligence, 실행 시 인수기업의 Risk 파악</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 유니콘 기업 지원 실적 */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">유니콘 기업 지원 실적</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600 mb-1">50+</div>
                              <div className="text-sm text-gray-600">유니콘·예비유니콘 기업 지원</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600 mb-1">₩10조+</div>
                              <div className="text-sm text-gray-600">누적 투자유치 금액</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600 mb-1">30+</div>
                              <div className="text-sm text-gray-600">성공적인 Exit 사례</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <Link
                            href="/consultation"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            유니콘 플랫폼 상담 신청
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 지방M&A센터 */}
                <div
                  className={`bg-white border border-orange-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-700 ease-in-out ${
                    expandedCenter === "regional"
                      ? "transform scale-105"
                      : expandedCenter && expandedCenter !== "regional"
                        ? "transform scale-95 opacity-75"
                        : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">지방M&A센터</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      지방 기업들의 M&A 활성화를 위한 전문 지원센터입니다.
                    </p>
                    <button
                      onClick={() => handleCenterExpand("regional")}
                      className="flex items-center justify-between w-full cursor-pointer text-orange-600 font-medium hover:text-orange-700 transition-colors"
                    >
                      자세히 보기
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          expandedCenter === "regional" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* 확장된 내용 */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        expandedCenter === "regional" ? "max-h-screen opacity-100 mt-6" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-200 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 서비스</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <svg
                                  className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                지방 중소기업 M&A 전문 컨설팅
                              </li>
                              <li className="flex items-start gap-2">
                                <svg
                                  className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                지역 특화 산업 분석 및 매칭
                              </li>
                              <li className="flex items-start gap-2">
                                <svg
                                  className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                지방 정부 정책 연계 지원
                              </li>
                              <li className="flex items-start gap-2">
                                <svg
                                  className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                지역 금융기관 네트워크 활용
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">지원 대상</h4>
                            <div className="space-y-3">
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-1">매도 기업</h5>
                                <p className="text-sm text-gray-600">
                                  승계 문제, 사업 전환 등으로 매각을 고려하는 지방 기업
                                </p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-1">매수 기업</h5>
                                <p className="text-sm text-gray-600">
                                  지방 진출, 사업 확장을 통한 성장을 추진하는 기업
                                </p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-1">지방 정부</h5>
                                <p className="text-sm text-gray-600">지역 경제 활성화를 위한 M&A 정책 수립 기관</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">지방 M&A 성공 사례</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-4 h-4 text-orange-600"
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
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">부산 소재 제조업체 M&A 성공</h5>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  지역 특화 기술력을 보유한 부산 소재 중소 제조업체와 대기업 간 성공적인 M&A를 통해 기술
                                  시너지 창출 및 지역 고용 유지를 동시에 달성한 사례입니다.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <Link
                            href="/consultation"
                            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
                          >
                            지방 M&A 상담 신청
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 기타 M&A 지원센터 */}
                <div
                  className={`bg-white border border-orange-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-700 ease-in-out ${
                    expandedCenter === "others"
                      ? "transform scale-105"
                      : expandedCenter && expandedCenter !== "others"
                        ? "transform scale-95 opacity-75"
                        : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">기타 M&A 지원센터</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      다양한 산업과 규모의 기업을 위한 맞춤형 M&A 지원센터입니다.
                    </p>
                    <button
                      onClick={() => handleCenterExpand("others")}
                      className="flex items-center justify-between w-full cursor-pointer text-orange-600 font-medium hover:text-orange-700 transition-colors"
                    >
                      자세히 보기
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          expandedCenter === "others" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        expandedCenter === "others" ? "max-h-screen opacity-100 mt-6" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-200 space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">
                            삼일 PwC는 다양한 산업과 규모의 기업을 위한{" "}
                            <strong className="text-orange-600">전문화된 M&A 지원센터</strong>를 운영하여, 각 기업의
                            특성과 요구사항에 맞는 맞춤형 솔루션을 제공합니다.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-orange-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            전문 지원센터
                          </h4>

                          <div className="grid md:grid-cols-3 gap-6">
                            {/* 중견기업 인수 지원 센터 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">중견기업 인수 지원 센터</h5>
                                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    삼일PwC는 중견기업의 인수전략 수립부터 Closing까지 성공적인 M&A를 위해 Buy-side
                                    Advisory뿐만 아니라 Valuation, FDD, TDD 및 Deal Structuring까지 M&A 단계별 total
                                    solution을 고객에게 제공합니다.
                                  </p>
                                  <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Buy-side Advisory 서비스</li>
                                    <li>• Valuation & Due Diligence (FDD, TDD)</li>
                                    <li>• Deal Structuring 및 협상 지원</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* MM PE Intelligence */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">MM PE Intelligence</h5>
                                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    Private equity market 내 Player들을 대상으로 Middle Market 관련 Deal sourcing 및
                                    인수자문 업무, Financial Due Diligence, Target Valuation, 투자포트폴리오의 매각 자문
                                    업무 등의 종합 Services를 제공합니다.
                                  </p>
                                  <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Deal Sourcing & 인수자문</li>
                                    <li>• Financial Due Diligence</li>
                                    <li>• Target Valuation & 포트폴리오 매각 자문</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* 상장기업지원센터 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-orange-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-2">상장기업지원센터</h5>
                                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    상장유지를 포함한 다양한 이슈가 있는 상장기업에게 One stop으로 통합적인 자문 제공을
                                    위해 조직되었으며 거래소 대응, 투자유치와 지배구조 개선 및 상장사 M&A 등에 대한
                                    전문가로 구성되어 최적의 솔루션을 제공합니다.
                                  </p>
                                  <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• 거래소 대응 및 상장 유지 지원</li>
                                    <li>• 투자유치 & 지배구조 개선</li>
                                    <li>• 상장사 M&A 전문 자문</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 지원 실적 */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">지원 실적</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600 mb-1">200+</div>
                              <div className="text-sm text-gray-600">중견기업 M&A 지원</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600 mb-1">₩5조+</div>
                              <div className="text-sm text-gray-600">PE 투자 거래 규모</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-orange-600 mb-1">150+</div>
                              <div className="text-sm text-gray-600">상장기업 자문 건수</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <Link
                            href="/consultation"
                            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
                          >
                            전문 지원센터 상담 신청
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <section>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">M&A 원스톱 서비스 상담</h3>
                <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                  복잡한 M&A 과정을 하나의 팀이 처음부터 끝까지 책임지고 관리합니다. 삼일 PwC의 원스톱 서비스로 성공적인
                  M&A를 경험해보세요.
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
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
