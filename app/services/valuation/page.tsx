"use client"

import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function ValuationServicePage() {
  const serviceScope = [
    {
      title: "재무 실사 (Financial DD)",
      description: "기업의 재무 상태와 성과를 종합적으로 분석하여 투자 리스크를 평가합니다.",
      details: [
        "재무제표 분석 및 검증",
        "수익성 및 현금흐름 분석",
        "재무 예측 및 시나리오 분석",
        "회계 정책 및 내부통제 검토",
      ],
    },
    {
      title: "세무 실사 (Tax DD)",
      description: "세무 리스크를 사전에 파악하고 최적의 세무 구조를 제안합니다.",
      details: ["세무 신고 현황 검토", "잠재 세무 리스크 분석", "거래 구조별 세무 영향 분석", "세무 최적화 방안 제시"],
    },
    {
      title: "기업가치 평가",
      description: "국제 기준에 부합하는 다양한 방법론을 활용한 정확한 기업가치 평가를 제공합니다.",
      details: ["DCF(현금흐름할인법) 평가", "시장접근법 평가", "자산접근법 평가", "상대가치 평가"],
    },
    {
      title: "시장 및 상업적 실사",
      description: "시장 환경과 사업 모델을 분석하여 성장 가능성과 경쟁력을 평가합니다.",
      details: ["시장 규모 및 성장성 분석", "경쟁 환경 분석", "사업 모델 검토", "고객 및 공급업체 분석"],
    },
  ]

  const workflowSteps = [
    {
      phase: "Phase 1",
      title: "계획 수립 및 준비",
      duration: "1-2주",
      activities: ["실사 범위 및 일정 확정", "실사팀 구성", "자료 요청 리스트 작성", "킥오프 미팅"],
      deliverables: ["실사 계획서", "자료 요청서", "실사팀 구성안", "일정표"],
    },
    {
      phase: "Phase 2",
      title: "자료 수집 및 분석",
      duration: "3-4주",
      activities: ["재무 자료 수집 및 분석", "세무 자료 검토", "법무 자료 검토", "사업 자료 분석"],
      deliverables: ["자료 분석서", "이슈 리스트", "추가 질의서", "중간 보고서"],
    },
    {
      phase: "Phase 3",
      title: "심화 분석 및 평가",
      duration: "2-3주",
      activities: ["기업가치 평가", "리스크 분석", "시나리오 분석", "시장 분석"],
      deliverables: ["가치평가서", "리스크 분석서", "시나리오 분석서", "시장 분석서"],
    },
    {
      phase: "Phase 4",
      title: "보고서 작성 및 발표",
      duration: "1-2주",
      activities: ["최종 보고서 작성", "경영진 발표", "질의응답 세션", "후속 조치 논의"],
      deliverables: ["최종 실사 보고서", "발표 자료", "요약 보고서", "권고사항"],
    },
  ]

  const valuationMethods = [
    {
      method: "DCF 평가법",
      description: "미래 현금흐름을 현재가치로 할인하여 기업가치를 산정",
      advantages: ["미래 성장성 반영", "내재가치 산정", "시나리오 분석 가능"],
      applications: ["성장기업", "안정적 현금흐름", "장기 투자"],
    },
    {
      method: "시장접근법",
      description: "유사 기업의 거래 사례나 시장 배수를 활용한 상대가치 평가",
      advantages: ["시장 현실 반영", "신속한 평가", "객관적 기준"],
      applications: ["상장기업", "활발한 거래시장", "비교 가능한 기업"],
    },
    {
      method: "자산접근법",
      description: "기업이 보유한 자산의 공정가치에서 부채를 차감하여 산정",
      advantages: ["보수적 평가", "자산 중심", "청산가치 산정"],
      applications: ["자산집약적 기업", "부동산 보유기업", "청산 상황"],
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
            <span className="text-orange-600 font-medium">실사 및 밸류에이션</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-6">실사 및 밸류에이션</h1>
                <div className="w-24 h-1 bg-orange-500 mb-8"></div>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  정확하고 객관적인 기업가치 평가와 종합적인 실사 서비스를 제공합니다. 국제 기준에 부합하는 전문적인
                  분석으로 신뢰할 수 있는 결과를 제공합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/valuation"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg text-center"
                  >
                    가치평가 시뮬레이션
                  </Link>
                  <Link
                    href="/consultation"
                    className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 text-center"
                  >
                    실사 상담 신청
                  </Link>
                </div>
              </div>
              <div>
                <div
                  className="w-full h-96 bg-cover bg-center rounded-2xl shadow-xl"
                  style={{
                    backgroundImage: 'url("/placeholder.svg?height=400&width=600&text=Valuation+Due+Diligence+Hero")',
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
              실사 및 기업가치 평가의 전 영역에서 전문 서비스를 제공합니다
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

        {/* Valuation Methods Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">기업가치 평가 방법론</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                국제적으로 인정받는 다양한 평가 방법론을 활용하여 정확한 기업가치를 산정합니다
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {valuationMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{method.method}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">주요 장점</h4>
                    <ul className="space-y-2">
                      {method.advantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">적용 분야</h4>
                    <div className="flex flex-wrap gap-2">
                      {method.applications.map((application, idx) => (
                        <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                          {application}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">업무 프로세스</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              체계적이고 전문적인 4단계 프로세스로 정확한 실사와 평가를 진행합니다
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

        {/* Success Factors Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">성공 요인</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                삼일회계법인의 실사 및 밸류에이션 서비스가 신뢰받는 이유
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "국제 기준 준수",
                  description: "IFRS, US GAAP 등 국제 회계 기준과 평가 기준을 준수한 전문적인 분석",
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
                  title: "다학제적 접근",
                  description: "재무, 세무, 법무, 사업 전문가가 협업하는 종합적인 분석 체계",
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
                  title: "풍부한 경험",
                  description: "다양한 업종과 규모의 기업에 대한 500건 이상의 실사 및 평가 경험",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
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
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-6">실사 및 평가 전문가와 상담해보세요</h2>
            <p className="text-lg text-white/90 mb-8">
              정확하고 신뢰할 수 있는 기업가치 평가와 실사 서비스를 제공해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/valuation"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                가치평가 시뮬레이션
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
