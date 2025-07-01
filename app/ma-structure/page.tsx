"use client"

import Header from "../components/Header"
import Link from "next/link"

export default function MAStructurePage() {
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
            <span className="text-orange-600 font-medium">보안 및 신뢰할 수 있는 M&A 구조</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-5xl font-light text-gray-900 mb-6">보안 및 신뢰할 수 있는 M&A 구조</h1>
            <div className="w-24 h-1 bg-orange-500 mb-8"></div>
            <p className="text-2xl text-gray-700 font-light mb-6">
              삼일 PwC는 비밀유지, 매각금액 극대화, 절차의 효율성 및 유연성을 고려한 최적의 M&A 프로세스를 제공합니다
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              삼일 PwC는 1) 비밀유지 2) 매각금액 극대화 및 3) 절차의 효율성 및 유연성 확보를 고려하여 Private deal(또는
              제한적 경쟁입찰)을 원칙으로 하되, 귀사와 협의하여 최적의 M&A 프로세스를 안내해드립니다.
            </p>
          </div>

          {/* M&A Process Comparison Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-8">M&A 프로세스 비교</h2>

            {/* Process Details */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* 공개 경쟁입찰 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">공개 경쟁입찰</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">많은 투자자들의 참여로 회사의 기밀정보 유출 가능성이 존재함</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">복잡한 절차로 인한 시간 소요</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">높은 거래 비용 발생</p>
                  </div>
                </div>
              </div>

              {/* 제한적 경쟁입찰 */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">제한적 경쟁입찰</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      비교적 정보공개가 제한됨. 언론 등을 통한 매각사실의 Market 공개 가능성 존재 (비밀유지가 중요)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">적정 수준의 경쟁을 통한 가격 최적화</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">효율적인 절차 진행</p>
                  </div>
                </div>
              </div>

              {/* Private Deal */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Private Deal</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">
                      매각여부 및 진행사항이 공개적으로 알려지지 않으므로 Target의 영업에 미치는 영향을 최소화 할 수
                      있음
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">최고 수준의 비밀유지 보장</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">신속하고 유연한 거래 진행</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Trust Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-12">보안 및 신뢰성 확보 방안</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 비밀유지 */}
              <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">비밀유지</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  엄격한 NDA 체결 및 정보 접근 제한을 통한 완벽한 기밀 보장
                </p>
              </div>

              {/* 매각금액 극대화 */}
              <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">매각금액 극대화</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  전략적 바이어 발굴 및 최적의 협상 전략을 통한 가치 극대화
                </p>
              </div>

              {/* 절차 효율성 */}
              <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">절차 효율성</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  체계적인 프로세스 관리를 통한 신속하고 효율��인 거래 진행
                </p>
              </div>

              {/* 유연성 확보 */}
              <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">유연성 확보</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  고객 맞춤형 솔루션 제공 및 상황 변화에 따른 유연한 대응
                </p>
              </div>
            </div>
          </section>

          {/* Success Statistics */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-8 border border-orange-200">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">삼일 PwC M&A 보안 구조 성과</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">기밀유지 성공률</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">고객 만족도</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
                  <div className="text-sm text-gray-600">평균 절차 단축</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">260+</div>
                  <div className="text-sm text-gray-600">성공 거래 건수</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">보안 M&A 구조 전문가 상담</h3>
                <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                  삼일 PwC의 보안 및 신뢰할 수 있는 M&A 구조에 대해 더 자세히 알아보고 싶으시거나, 귀하의 M&A 계획에
                  대한 전문가 상담을 원하신다면 언제든지 연락해 주세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  <Link
                    href="/why-pwc"
                    className="inline-flex items-center gap-2 bg-white text-orange-600 border border-orange-600 px-8 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Why PwC로 돌아가기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
