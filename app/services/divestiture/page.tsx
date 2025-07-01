"use client"

import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function DivestitureServicePage() {
  const serviceScope = [
    {
      title: "전략적 매각 계획 수립",
      description: "기업의 전략적 목표와 시장 상황을 분석하여 최적의 매각 전략을 수립합니다.",
      details: ["매각 목적 및 목표 설정", "시장 분석 및 타이밍 결정", "매각 구조 및 방식 결정", "예상 매각가격 산정"],
    },
    {
      title: "투자자 발굴 및 매칭",
      description: "광범위한 네트워크를 활용하여 최적의 투자자를 발굴하고 매칭합니다.",
      details: ["전략적 투자자 발굴", "재무적 투자자 매칭", "해외 투자자 연결", "투자자 사전 검증"],
    },
    {
      title: "기업가치 극대화",
      description: "매각가치를 극대화하기 위한 다양한 전략과 방법을 제시합니다.",
      details: ["사업 구조 최적화", "재무 구조 개선", "운영 효율성 제고", "성장 스토리 구축"],
    },
    {
      title: "협상 및 거래 구조화",
      description: "최적의 거래 조건을 확보하기 위한 전문적인 협상을 진행합니다.",
      details: ["가격 협상 전략 수립", "거래 조건 최적화", "리스크 분배 구조화", "계약 조건 협상"],
    },
  ]

  const workflowSteps = [
    {
      phase: "Phase 1",
      title: "사전 준비",
      duration: "2-4주",
      activities: ["매각 전략 수립", "기업가치 평가", "매각 자료 준비", "내부 승인 절차"],
      deliverables: ["매각 전략서", "기업가치 평가서", "정보각서(IM)", "프로세스 계획서"],
    },
    {
      phase: "Phase 2",
      title: "투자자 발굴",
      duration: "3-6주",
      activities: ["잠재 투자자 리스트 작성", "투자자 접촉 및 관심도 확인", "NDA 체결", "초기 정보 제공"],
      deliverables: ["투자자 리스트", "관심 표명서", "NDA", "1차 정보 패키지"],
    },
    {
      phase: "Phase 3",
      title: "입찰 및 협상",
      duration: "4-8주",
      activities: ["관리 프레젠테이션", "실사 진행", "입찰서 접수", "최종 협상"],
      deliverables: ["프레젠테이션 자료", "실사 자료실", "입찰서", "최종 계약서"],
    },
    {
      phase: "Phase 4",
      title: "거래 완료",
      duration: "2-4주",
      activities: ["최종 계약 체결", "조건 이행 확인", "자금 결제", "사후 관리"],
      deliverables: ["매매계약서", "이행 확인서", "결제 확인서", "사후관리 계획서"],
    },
  ]

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
            <Link href="/services" className="hover:text-orange-600 transition-colors">
              서비스
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-orange-600 font-medium">매각 및 투자유치 자문</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-6">매각 및 투자유치 자문</h1>
                <div className="w-24 h-1 bg-orange-500 mb-8"></div>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  기업의 성장 단계와 전략적 목표에 맞는 최적의 매각 및 투자유치 솔루션을 제공합니다. 삼일회계법인의
                  광범위한 네트워크와 전문성을 바탕으로 최고의 거래 조건을 확보해드립니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/consultation"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg text-center"
                  >
                    매각 상담 신청
                  </Link>
                  <Link
                    href="/valuation"
                    className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 text-center"
                  >
                    기업가치 평가
                  </Link>
                </div>
              </div>
              <div>
                <div
                  className="w-full h-96 bg-cover bg-center rounded-2xl shadow-xl"
                  style={{
                    backgroundImage: 'url("/placeholder.svg?height=400&width=600&text=Divestiture+Advisory+Hero")',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Scope Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">서비스 범위</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              매각 및 투자유치의 전 과정에서 필요한 모든 서비스를 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviceScope.map((scope, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{scope.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{scope.description}</p>
                <ul className="space-y-3">
                  {scope.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">업무 프로세스</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                체계적이고 전문적인 4단계 프로세스로 성공적인 매각을 지원합니다
              </p>
            </div>

            <div className="space-y-12">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-32 bg-orange-300 hidden lg:block"></div>
                  )}

                  <div className="grid lg:grid-cols-4 gap-8 items-start">
                    {/* Phase Header */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-orange-600 font-semibold text-sm">{step.phase}</div>
                          <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                          <div className="text-gray-500 text-sm">{step.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-4">주요 활동</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {step.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-gray-900 mb-4">주요 산출물</h4>
                      <div className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="bg-orange-50 text-orange-700 px-3 py-2 rounded text-sm">
                            {deliverable}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Factors Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">성공 요인</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">삼일회계법인의 매각 자문 서비스가 성공적인 이유</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "광범위한 투자자 네트워크",
                description: "국내외 전략적 투자자, 사모펀드, 벤처캐피털 등 다양한 투자자와의 네트워크",
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
                title: "업종별 전문 지식",
                description: "20개 이상 업종별 전문가 그룹의 깊이 있는 산업 지식과 시장 이해",
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
                title: "검증된 실행력",
                description: "500건 이상의 성공적인 M&A 거래 경험과 체계적인 프로세스",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((factor, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-6">
                  {factor.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{factor.title}</h3>
                <p className="text-gray-600 leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-6">매각 전문가와 상담해보세요</h2>
            <p className="text-lg text-white/90 mb-8">귀하의 기업 매각 목표 달성을 위한 최적의 전략을 제안해드립니다</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                매각 상담 신청
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200"
              >
                다른 서비스 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
