"use client"

import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function AcquisitionServicePage() {
  const serviceScope = [
    {
      title: "타겟 기업 발굴 및 선정",
      description: "전략적 목표에 부합하는 최적의 인수 타겟을 발굴하고 선정합니다.",
      details: ["시장 분석 및 타겟 스크리닝", "전략적 적합성 평가", "초기 접촉 및 관심도 확인", "우선순위 타겟 선정"],
    },
    {
      title: "인수 전략 수립",
      description: "기업의 전략적 목표와 시너지를 고려한 인수 전략을 수립합니다.",
      details: ["인수 목적 및 목표 설정", "시너지 분석 및 가치 창출 계획", "인수 구조 및 방식 결정", "통합 전략 수립"],
    },
    {
      title: "실사 및 리스크 분석",
      description: "종합적인 실사를 통해 투자 리스크를 사전에 파악하고 분석합니다.",
      details: ["재무 실사 (Financial DD)", "사업 실사 (Commercial DD)", "법무 실사 (Legal DD)", "세무 실사 (Tax DD)"],
    },
    {
      title: "협상 및 거래 실행",
      description: "최적의 거래 조건을 확보하기 위한 전문적인 협상과 거래 실행을 지원합니다.",
      details: ["가격 및 조건 협상", "계약서 검토 및 협상", "거래 구조 최적화", "클로징 지원"],
    },
  ]

  const workflowSteps = [
    {
      phase: "Phase 1",
      title: "전략 수립 및 타겟 발굴",
      duration: "4-6주",
      activities: ["인수 전략 수립", "타겟 스크리닝", "시장 분석", "초기 접촉"],
      deliverables: ["인수 전략서", "타겟 리스트", "시장 분석 보고서", "접촉 계획서"],
    },
    {
      phase: "Phase 2",
      title: "예비 실사 및 평가",
      duration: "6-8주",
      activities: ["예비 실사 진행", "기업가치 평가", "시너지 분석", "리스크 평가"],
      deliverables: ["예비 실사 보고서", "가치평가서", "시너지 분석서", "리스크 평가서"],
    },
    {
      phase: "Phase 3",
      title: "본격 실사 및 협상",
      duration: "8-12주",
      activities: ["종합 실사 진행", "가격 협상", "계약 조건 협상", "거래 구조 확정"],
      deliverables: ["종합 실사 보고서", "협상 전략서", "계약서 초안", "거래 구조서"],
    },
    {
      phase: "Phase 4",
      title: "거래 완료 및 통합",
      duration: "4-6주",
      activities: ["최종 계약 체결", "클로징 실행", "통합 계획 수립", "PMI 지원"],
      deliverables: ["최종 계약서", "클로징 문서", "통합 계획서", "PMI 가이드"],
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
            <span className="text-orange-600 font-medium">인수 자문</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-6">인수 자문</h1>
                <div className="w-24 h-1 bg-orange-500 mb-8"></div>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  전략적 인수를 통한 사업 확장과 시너지 창출을 지원합니다. 타겟 발굴부터 통합 후 관리까지 인수 전
                  과정에서 전문적인 자문을 제공합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/acquisition"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg text-center"
                  >
                    인수 상담 신청
                  </Link>
                  <Link
                    href="/find-investors"
                    className="bg-white border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 text-center"
                  >
                    잠재 인수인 찾기
                  </Link>
                </div>
              </div>
              <div>
                <div
                  className="w-full h-96 bg-cover bg-center rounded-2xl shadow-xl"
                  style={{
                    backgroundImage: 'url("/placeholder.svg?height=400&width=600&text=Acquisition+Advisory+Hero")',
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
              인수의 전 과정에서 필요한 모든 서비스를 제공합니다
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
                체계적이고 전문적인 4단계 프로세스로 성공적인 인수를 지원합니다
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">삼일회계법인의 인수 자문 서비스가 성공적인 이유</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "��계적인 타겟 발굴",
                description: "AI 기반 분석과 전문가 네트워크를 통한 최적의 인 타겟 발굴",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "종합적인 실사 역량",
                description: "재무, 세무, 법무, 사업 등 모든 영역의 전문가가 참여하는 종합 실사",
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
                title: "PMI 전문성",
                description: "인수 후 통합 관리(PMI) 전문가를 통한 시너지 실현 지원",
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
        <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-6">인수 전문가와 상담해보세요</h2>
            <p className="text-lg text-white/90 mb-8">
              귀하의 전략적 인수 목표 달성을 위한 최적의 솔루션을 제안해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/acquisition"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                인수 상담 신청
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
