"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "../components/Header"

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null)

  const services = [
    {
      id: "divestiture",
      title: "매각 및 투자유치 자문",
      subtitle: "Divestiture & Investment Advisory",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description:
        "기업의 성장 단계와 전략적 목표에 맞는 최적의 매각 및 투자유치 솔루션을 제공합니다. 삼일회계법인의 광범위한 네트워크와 전문성을 바탕으로 최고의 거래 조건을 확보해드립니다.",
      keyFeatures: [
        "전략적 매각 계획 수립",
        "투자자 발굴 및 매칭",
        "기업가치 극대화 전략",
        "협상 및 거래 구조화",
        "규제 및 법적 이슈 해결",
      ],
      benefits: ["최적의 매각가격 실현", "신속한 거래 진행", "리스크 최소화", "세무 효율성 극대화"],
      image: "/images/business.webp", // Corrected path
      link: "/services/divestiture",
    },
    {
      id: "acquisition",
      title: "인수 자문",
      subtitle: "Acquisition Advisory",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      description:
        "전략적 인수를 통한 사업 확장과 시너지 창출을 지원합니다. 타겟 발굴부터 통합 후 관리까지 인수 전 과정에서 전문적인 자문을 제공합니다.",
      keyFeatures: [
        "타겟 기업 발굴 및 선정",
        "인수 전략 수립",
        "실사 및 리스크 분석",
        "협상 및 거래 실행",
        "PMI(통합관리) 지원",
      ],
      benefits: ["전략적 시너지 실현", "리스크 사전 식별", "효율적 통합 프로세스", "투자 수익률 극대화"],
      image: "/images/handshake.png", // Corrected path
      link: "/services/acquisition",
    },
    {
      id: "valuation",
      title: "실사 및 밸류에이션",
      subtitle: "Due Diligence & Valuation",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      description:
        "정확하고 객관적인 기업가치 평가와 종합적인 실사 서비스를 제공합니다. 국 기준에 부합하는 전문적인 분석으로 신뢰할 수 있는 결과를 제공합니다.",
      keyFeatures: [
        "재무 실사 (Financial DD)",
        "세무 실사 (Tax DD)",
        "법무 실사 (Legal DD)",
        "기업가치 평가",
        "시장 및 상업적 실사",
      ],
      benefits: ["정확한 기업가치 산정", "리스크 요인 사전 파악", "투자 의사결정 지원", "협상력 강화"],
      image: "/images/discussion.png", // Corrected path
      link: "/services/valuation",
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Breadcrumb - moved inside hero section */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-orange-600 transition-colors">
                홈
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-orange-600 font-medium">서비스</span>
            </nav>

            <div className="text-center mb-16">
              <h1 className="text-5xl font-light text-gray-900 mb-6">M&A 전문 서비스</h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                삼일회계법인의 수십 년간 축적된 M&A 전문성과 글로벌 네트워크를 바탕으로
                <br />
                최고 수준의 M&A 자문 서비스를 제공합니다
              </p>
            </div>

            {/* Service Statistics */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">성공적인 M&A 거래</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">20+</div>
                <div className="text-gray-600 font-medium">업종별 전문가</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">157</div>
                <div className="text-gray-600 font-medium">글로벌 네트워크</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">1위</div>
                <div className="text-gray-600 font-medium">국내 M&A 자문 실적</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Services Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">주요 서비스</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              M&A 전 과정에서 필요한 모든 서비스를 원스톱으로 제공합니다
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-orange-600 font-medium">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">{service.description}</p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">주요 서비스</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">기대 효과</h4>
                    <div className="flex flex-wrap gap-3">
                      {service.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    서비스 상세보기
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative">
                    <div
                      className="w-full h-96 bg-cover bg-center rounded-2xl shadow-lg"
                      style={{ backgroundImage: `url("${service.image}")` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Overview Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">M&A 서비스 프로세스</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                체계적이고 전문적인 프로세스로 성공적인 M&A를 지원합니다
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              {[
                {
                  step: "01",
                  title: "초기 상담",
                  description: "고객 니즈 파악 및 전략 수립",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "실사 및 평가",
                  description: "종합적인 기업 분석 및 가치 평가",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "매칭 및 협상",
                  description: "최적 파트너 매칭 및 조건 협상",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                },
                {
                  step: "04",
                  title: "거래 실행",
                  description: "계약 체결 및 거래 완료",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  step: "05",
                  title: "사후 관리",
                  description: "통합 관리 및 시너지 실현",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white border-4 border-orange-500 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-4 shadow-lg">
                      {process.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose PwC Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">삼일회계법인을 선택하는 이유</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              업계 최고의 전문성과 글로벌 네트워크로 최상의 결과를 보장합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "검증된 전문성",
                description: "수십 년간 축적된 M&A 전문 노하우와 업계 최고 수준의 전문가 그룹",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                title: "글로벌 네트워크",
                description: "PwC 글로벌 네트워크를 통한 157개국 전문가 협업 및 해외 진출 지원",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "원스톱 서비스",
                description: "M&A 전 과정에서 필요한 모든 서비스를 통합적으로 제공",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
              },
              {
                title: "업종별 전문성",
                description: "20개 이상 업종별 전문가 그룹의 깊이 있는 산업 지식과 인사이트",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
              },
              {
                title: "신속한 실행력",
                description: "체계적인 프로세스와 풍부한 경험을 바탕으로 한 빠른 거래 실행",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "최고의 성과",
                description: "고객 만족도 95% 이상, 업계 최고 수준의 거래 성공률과 가치 실현",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3l1.09 3.26L16 8l-2.91 1.74L12 13l-1.09-3.26L8 8l2.91-1.74L12 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-light text-white mb-6">M&A 전문가와 상담해보세요</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              귀하의 M&A 목표 달성을 위한 최적의 솔루션을 제안해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                매각 상담 신청
              </Link>
              <Link
                href="/acquisition"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                인수 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
