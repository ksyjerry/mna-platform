"use client"

import type React from "react"

import { useState } from "react"
import Header from "../components/Header"
import Link from "next/link"

export default function ValuationPage() {
  const [formData, setFormData] = useState({
    region: "",
    industry: "",
    revenue: "",
    operatingProfit: "",
    netAssets: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [valuationResult, setValuationResult] = useState<{
    estimatedValue: number
    valueRange: { min: number; max: number }
    methodology: string[]
    confidence: number
  } | null>(null)

  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const regions = [
    { value: "", label: "지역을 선택해주세요" },
    { value: "metropolitan", label: "수도권 (서울/경기/인천)" },
    { value: "chungcheong", label: "충청권 (대전/세종/충남/충북)" },
    { value: "gangwon", label: "강원권 (강원도)" },
    { value: "jeolla", label: "전라권 (광주/전남/전북)" },
    { value: "gyeongsang", label: "경상권 (부산/대구/울산/경남/경북)" },
    { value: "jeju", label: "제주권 (제주도)" },
  ]

  const industries = [
    { value: "", label: "업종을 선택해주세요" },
    { value: "manufacturing", label: "제조업" },
    { value: "construction", label: "건설업" },
    { value: "wholesale_retail", label: "도매 및 소매업" },
    { value: "transportation", label: "운수 및 창고업" },
    { value: "accommodation_food", label: "숙박 및 음식점업" },
    { value: "information_communication", label: "정보통신업" },
    { value: "finance_insurance", label: "금융 및 보험업" },
    { value: "real_estate", label: "부동산업" },
    { value: "professional_scientific", label: "전문, 과학 및 기술 서비스업" },
    { value: "business_support", label: "사업시설 관리, 사업 지원 및 임대 서비스업" },
    { value: "education", label: "교육 서비스업" },
    { value: "health_social", label: "보건업 및 사회복지 서비스업" },
    { value: "arts_sports", label: "예술, 스포츠 및 여가관련 서비스업" },
    { value: "other_services", label: "기타 서비스업" },
  ]

  const faqData = [
    {
      id: "1",
      question: "가치산정 시뮬레이션의 정확도는 어느 정도인가요?",
      answer:
        "본 시뮬레이션은 삼일회계법인의 수십 년간 축적된 M&A 데이터와 AI 알고리즘을 기반으로 하여 약 85-90%의 정확도를 보입니다. 다만, 실제 기업가치는 더 정밀한 실사와 분석을 통해 최종 결정됩니다.",
    },
    {
      id: "2",
      question: "입력한 정보는 어떻게 보호되나요?",
      answer:
        "모든 입력 정보는 암호화되어 처리되며, 삼일회계법인의 엄격한 보안 정책에 따라 관리됩니다. 개인정보는 시뮬레이션 목적으로만 사용되며, 제3자에게 제공되지 않습니다.",
    },
    {
      id: "3",
      question: "시뮬레이션 결과를 실제 매각에 활용할 수 있나요?",
      answer:
        "시뮬레이션 결과는 초기 가치 평가의 참고자료로 활용하실 수 있습니다. 실제 매각을 위해서는 보다 정밀한 기업가치 평가와 전문가 상담이 필요합니다.",
    },
    {
      id: "4",
      question: "어떤 업종에 가장 적합한가요?",
      answer:
        "본 시뮬레이션은 제조업, IT, 서비스업 등 대부분의 업종에 적용 가능합니다. 특히 안정적인 수익구조를 가진 기업에서 높은 정확도를 보입니다.",
    },
    {
      id: "5",
      question: "결과에 영향을 미치는 주요 요인은 무엇인가요?",
      answer:
        "매출 규모, 수익성(영업이익률), 업종 특성, 지역적 요인, 자산 규모 등이 주요 영향 요인입니다. 특히 수익성과 업종 특성이 가장 큰 영향을 미칩니다.",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.region) newErrors.region = "지역을 선택해주세요"
    if (!formData.industry) newErrors.industry = "업종을 선택해주세요"
    if (!formData.revenue) newErrors.revenue = "매출을 입력해주세요"
    if (!formData.operatingProfit) newErrors.operatingProfit = "영업이익을 입력해주세요"
    if (!formData.netAssets) newErrors.netAssets = "순자산을 입력해주세요"

    // Validate numeric inputs
    if (formData.revenue && (isNaN(Number(formData.revenue)) || Number(formData.revenue) <= 0)) {
      newErrors.revenue = "올바른 매출 금액을 입력해주세요"
    }
    if (formData.operatingProfit && isNaN(Number(formData.operatingProfit))) {
      newErrors.operatingProfit = "올바른 영업이익 금액을 입력해주세요"
    }
    if (formData.netAssets && (isNaN(Number(formData.netAssets)) || Number(formData.netAssets) <= 0)) {
      newErrors.netAssets = "올바른 순자산 금액을 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateValuation = async () => {
    if (!validateForm()) return

    // 폼 데이터를 localStorage에 저장하고 다음 페이지로 이동
    localStorage.setItem("valuationFormData", JSON.stringify(formData))
    window.location.href = "/valuation/details"
  }

  const resetForm = () => {
    setFormData({
      region: "",
      industry: "",
      revenue: "",
      operatingProfit: "",
      netAssets: "",
    })
    setValuationResult(null)
    setErrors({})
  }

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              홈
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-orange-600 font-medium">기업가치 산정</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          {/* 2열 그리드 레이아웃 */}
          <div className="grid lg:grid-cols-3 gap-16">
            {/* 1열: 제목 + 모든 콘텐츠 */}
            <div className="lg:col-span-2 space-y-16">
              {/* Page Title */}
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-6">기업가치 산정 시뮬레이션</h1>
                <div className="w-24 h-1 bg-orange-500 mb-8"></div>
                <p className="text-2xl text-gray-700 font-light mb-4">
                  적정 기업가치 파악 문제로 M&A를 망설이시는 경영자님
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  삼일 PwC는 사업 및 경영권 매각을 희망함에도 적정 가치를 알지 못해 M&A가 망설여지는 경영자분들을 위한
                  기업가치 산출 시뮬레이션 서비스를 무료로 제공합니다.
                </p>
              </div>

              {/* Value Assessment Simulation Section */}
              <section>
                {/* 3-Step Process */}
                <div className="mb-16">
                  <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 mb-12">
                    {/* Step 1 */}
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-8 flex-1 max-w-sm relative min-h-[280px] flex flex-col">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                        Step 1
                      </div>
                      <div className="text-center pt-4 flex-1 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">귀사 정보 입력</h3>
                        <p className="text-gray-600 leading-relaxed">시뮬레이션 산출을 위한 필수 정보를 입력</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-8 flex-1 max-w-sm relative min-h-[280px] flex flex-col">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                        Step 2
                      </div>
                      <div className="text-center pt-4 flex-1 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">시뮬레이션</h3>
                        <p className="text-gray-600 leading-relaxed">삼일PwC 로직에 기반한 AI 시뮬레이션 수행</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-8 flex-1 max-w-sm relative min-h-[280px] flex flex-col">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                        Step 3
                      </div>
                      <div className="text-center pt-4 flex-1 flex flex-col justify-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-orange-600"
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">기업가치 결과</h3>
                        <p className="text-gray-600 leading-relaxed">XX 분 이내 산출한 기업가치 공개</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Benefits Section */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 -mx-6 px-6 py-16 rounded-2xl">
                  <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-light text-gray-900 text-center mb-4">
                      중소·벤처 기업 경영자분들의 고민을 해결해드립니다.
                    </h3>
                    <div className="w-16 h-1 bg-orange-500 mx-auto mb-12"></div>

                    <div className="space-y-8">
                      {/* Benefit 1 */}
                      <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                        <div className="flex items-start gap-6">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">1</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                              뛰어나 영업 성과에도 불구하고 기업가치 평가를 한번도 받아본 적이 없어 자사의
                              상대적/절대적으로 가치를 파악하기 힘든 상황
                            </h4>
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                              <p className="text-gray-700 leading-relaxed">
                                <strong>
                                  매출, 영업이익, 순자산 등 재무제표에 기반한 정보 단순 입력만으로 기업 가치를
                                  효과적으로 산출합니다.
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Benefit 2 */}
                      <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                        <div className="flex items-start gap-6">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">2</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                              빠른 시일 내 매각을 희망함에도 적정 기업가치를 파악할 수 없어 M&A 를 포기하신 경영자님
                            </h4>
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                              <p className="text-gray-700 leading-relaxed">
                                <strong>
                                  삼일 PwC 전문가들이 모여 만든 AI 시뮬레이션을 통해 XX 분채 되지 않는 시간 내
                                  기업가치를 신속하게 산출합니다.
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Benefit 3 */}
                      <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                        <div className="flex items-start gap-6">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">3</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                              복잡하고 높은 비용의 기업가치 평가가 부담되는 경영자분들
                            </h4>
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                              <p className="text-gray-700 leading-relaxed">
                                <strong>삼일 PwC 는 무료로 기업가치산정 시뮬레이션 서비스를 제공합니다.</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Methodology Section */}
              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-12">가치산정 방법론</h2>

                <div className="space-y-8">
                  {/* Asset Approach */}
                  <div className="bg-white border border-gray-200 p-8 rounded-lg">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">자산접근법 (Asset Approach)</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          기업이 보유한 자산의 시장가치에서 부채를 차감하여 기업가치를 산정하는 방법입니다. 유형자산과
                          무형자산의 공정가치를 기준으로 평가하며, 자산집약적 기업이나 청산가치 평가에 적합합니다.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 특징</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                보수적이고 안정적인 평가
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                자산 중심의 객관적 평가
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                청산가치 산정에 유용
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">적용 업종</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                부동산 개발업
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                제조업 (설비집약적)
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                자원개발업
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Market Approach */}
                  <div className="bg-white border border-gray-200 p-8 rounded-lg">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">시장접근법 (Market Approach)</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          유사한 기업의 거래사례나 상장기업의 시장가치를 기준으로 기업가치를 산정하는 방법입니다.
                          시장에서 실제로 거래되는 가격을 반영하여 현실적인 가치 평가가 가능합니다.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 특징</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                시장 현실을 반영한 평가
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                비교 가능한 거래사례 활용
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                시장 트렌드 반영
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">평가 지표</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                P/E Ratio (주가수익비율)
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                EV/EBITDA 배수
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                P/B Ratio (주가순자산비율)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Income Approach */}
                  <div className="bg-white border border-gray-200 p-8 rounded-lg">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">수익접근법 (Income Approach)</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          기업이 미래에 창출할 것으로 예상되는 현금흐름을 현재가치로 할인하여 기업가치를 산정하는
                          방법입니다. 기업의 수익창출 능력과 성장 잠재력을 가장 잘 반영하는 평가 방법으로 인정받고
                          있습니다.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 특징</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                미래 수익성 중심 평가
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                성장 잠재력 반영
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                리스크 요인 고려
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">평가 방법</h4>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                DCF (현금흐름할인법)
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                배당할인모형
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                잉여현금흐름법
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-12">자주 묻는 질문</h2>

                <div className="space-y-4">
                  {faqData.map((faq) => (
                    <div key={faq.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            openFaq === faq.id ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2">추가 문의사항이 있으신가요?</h4>
                      <p className="text-orange-800 leading-relaxed mb-4">
                        가치산정 시뮬레이션에 대한 더 자세한 정보나 전문가 상담이 필요하시면 언제든지 연락주세요.
                      </p>
                      <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                        전문가 상담 신청
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results Section */}
              {valuationResult && (
                <section>
                  <h2 className="text-3xl font-light text-gray-900 mb-12">가치산정 결과</h2>

                  <div className="bg-white border border-gray-200 p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-12 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">추정 기업가치</h3>
                        <div className="text-4xl font-light text-orange-600 mb-2">
                          {valuationResult.estimatedValue.toLocaleString()}억원
                        </div>
                        <div className="text-gray-600">
                          예상 범위: {valuationResult.valueRange.min.toLocaleString()}억원 ~{" "}
                          {valuationResult.valueRange.max.toLocaleString()}억원
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">신뢰도</h3>
                        <div className="text-4xl font-light text-orange-600 mb-2">{valuationResult.confidence}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${valuationResult.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">적용된 평가 방법론</h4>
                      <div className="flex flex-wrap gap-3">
                        {valuationResult.methodology.map((method, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-4 py-2 text-sm font-medium">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h5 className="font-semibold text-yellow-800 mb-2">참고사항</h5>
                        <p className="text-yellow-700 leading-relaxed">
                          본 시뮬레이션 결과는 참고용이며, 실제 기업가치는 보다 정밀한 실사와 분석을 통해 결정됩니다.
                          정확한 기업가치 평가를 원하시면 전문가 상담을 받아보시기 바랍니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* 2열: 기업 정보 입력 폼 */}
            <div className="">
              <div className="sticky top-20 bg-white border border-gray-200 p-6 shadow-lg rounded-lg  mx-auto">
                <h3 className="text-2xl font-light text-gray-900 mb-6">기업 정보 입력</h3>

                <div className="space-y-4">
                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      지역 <span className="text-orange-500">*</span>
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                        errors.region ? "border-red-500" : ""
                      }`}
                    >
                      {regions.map((region) => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                    {errors.region && <p className="mt-1 text-sm text-red-500">{errors.region}</p>}
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      업종 <span className="text-orange-500">*</span>
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                        errors.industry ? "border-red-500" : ""
                      }`}
                    >
                      {industries.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                    {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
                  </div>

                  {/* Revenue */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      매출 <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleInputChange}
                        placeholder="0"
                        className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                          errors.revenue ? "border-red-500" : ""
                        }`}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        억원
                      </span>
                    </div>
                    {errors.revenue && <p className="mt-1 text-sm text-red-500">{errors.revenue}</p>}
                  </div>

                  {/* Operating Profit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      영업이익 <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="operatingProfit"
                        value={formData.operatingProfit}
                        onChange={handleInputChange}
                        placeholder="0"
                        className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                          errors.operatingProfit ? "border-red-500" : ""
                        }`}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        억원
                      </span>
                    </div>
                    {errors.operatingProfit && <p className="mt-1 text-sm text-red-500">{errors.operatingProfit}</p>}
                  </div>

                  {/* Net Assets */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      순자산 <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="netAssets"
                        value={formData.netAssets}
                        onChange={handleInputChange}
                        placeholder="0"
                        className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                          errors.netAssets ? "border-red-500" : ""
                        }`}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        억원
                      </span>
                    </div>
                    {errors.netAssets && <p className="mt-1 text-sm text-red-500">{errors.netAssets}</p>}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={calculateValuation}
                    disabled={isCalculating}
                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isCalculating ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        AI 분석 중...
                      </>
                    ) : (
                      "가치산정 시작"
                    )}
                  </button>

                  {valuationResult && (
                    <button
                      onClick={resetForm}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      다시 계산하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
