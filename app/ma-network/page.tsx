"use client"

import Header from "../components/Header"
import Link from "next/link"

export default function MANetworkPage() {
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
            <span className="text-orange-600 font-medium">M&A 정보 네트워크</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-16">
            {/* Page Title */}
            <div className="text-center">
              <h1 className="text-5xl font-light text-gray-900 mb-6">압도적인 M&A 정보 네트워크</h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
              <p className="text-2xl text-gray-700 font-light mb-4">삼일 PwC만의 차별화된 M&A 정보 네트워크</p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                중소벤처기업부, 한국벤처투자협회를 비롯한 다양한 협력사와의 파트너쉽을 바탕으로 국내 최대 규모의 M&A
                거래 정보망과 매물 리스트를 보유하고 있습니다.
              </p>
            </div>

            {/* Network Overview */}
            <section className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-12">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-light text-gray-900 text-center mb-12">네트워크 개요</h2>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">정부기관 협력</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      중소벤처기업부와의 공식 파트너쉽을 통한 정책 지원 및 정보 공유
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">업계 협회 네트워크</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      한국벤처캐피탈협회 등 주요 업계 협회와의 긴밀한 협력 관계
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">글로벌 연결망</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      PwC 글로벌 네트워크를 통한 국제적 M&A 기회 발굴
                    </p>
                  </div>
                </div>

                {/* Key Statistics */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                  <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">네트워크 현황</h3>
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div className="bg-orange-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-orange-600 mb-2">XX건</div>
                      <div className="text-sm text-gray-600">월평균 신규물건</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                      <div className="text-sm text-gray-600">협력 파트너</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-orange-600 mb-2">전국</div>
                      <div className="text-sm text-gray-600">네트워크 커버리지</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                      <div className="text-sm text-gray-600">정보 업데이트</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Partners Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 mb-6">주요 협력사</h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
                <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  삼일 PwC는 정부기관, 업계 협회, 금융기관 등 다양한 분야의 파트너와 협력하여 종합적인 M&A 정보 서비스를
                  제공합니다.
                </p>
              </div>

              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">삼일 PwC와 함께하는 협력사</h3>

                <div className="flex items-center justify-center gap-16 flex-wrap mb-12">
                  {/* Ministry of SMEs and Startups */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <img
                        src="/images/ministry-smes.png"
                        alt="중소벤처기업부"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-medium text-gray-700 block">중소벤처기업부</span>
                      <span className="text-sm text-gray-500">Ministry of SMEs and Startups</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-20 bg-gray-300"></div>

                  {/* KVCA */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <img
                        src="/images/kvca-logo.png"
                        alt="한국벤처캐피탈협회"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-medium text-gray-700 block">한국벤처캐피탈협회</span>
                      <span className="text-sm text-gray-500">Korea Venture Capital Association</span>
                    </div>
                  </div>
                </div>

                {/* Partnership Benefits */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">정부기관 협력 혜택</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>정책 지원 프로그램 우선 안내</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>중소기업 M&A 지원사업 연계</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>규제 및 법률 정보 실시간 업데이트</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">업계 협회 네트워크</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>벤처캐피탈 투자 정보 공유</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>업계 동향 및 시장 분석 자료</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>전문가 네트워킹 기회 제공</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact CTA Section */}
            <section>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-8 h-8 text-orange-600 mt-1 flex-shrink-0"
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
                    <h4 className="text-xl font-semibold text-orange-900 mb-3">M&A 정보 네트워크를 활용해보세요</h4>
                    <p className="text-orange-800 leading-relaxed mb-6 text-lg">
                      삼일 PwC의 광범위한 네트워크를 통해 최적의 M&A 기회를 발견하고 성공적인 거래를 성사시켜보세요.
                      전문가와의 상담을 통해 귀하의 비즈니스에 맞는 맞춤형 솔루션을 제공해드립니다.
                    </p>
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 text-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </>
  )
}
