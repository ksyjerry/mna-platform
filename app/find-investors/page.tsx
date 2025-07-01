"use client"

import type React from "react"

import { useState } from "react"
import Header from "../components/Header"
import Link from "next/link"

export default function FindInvestorsPage() {
  const [formData, setFormData] = useState({
    majorIndustry: "",
    minorIndustry: "",
    detailIndustry: "",
    region: "",
    revenue: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // 표준산업분류 (대분류)
  const majorIndustries = [
    { value: "", label: "업종(대분류)을 선택해주세요" },
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

  // 표준산업분류 (소분류) - 대분류에 따라 달라짐
  const getMinorIndustries = (majorIndustry: string) => {
    const minorIndustriesMap: Record<string, { value: string; label: string }[]> = {
      manufacturing: [
        { value: "", label: "업종(소분류)을 선택해주세요" },
        { value: "food_manufacturing", label: "식료품 제조업" },
        { value: "textile_manufacturing", label: "섬유제품 제조업" },
        { value: "chemical_manufacturing", label: "화학물질 및 화학제품 제조업" },
        { value: "metal_manufacturing", label: "금속가공제품 제조업" },
        { value: "machinery_manufacturing", label: "기계 및 장비 제조업" },
        { value: "electronic_manufacturing", label: "전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업" },
        { value: "automotive_manufacturing", label: "자동차 및 트레일러 제조업" },
      ],
      information_communication: [
        { value: "", label: "업종(소분류)을 선택해주세요" },
        { value: "software_development", label: "소프트웨어 개발 및 공급업" },
        { value: "computer_programming", label: "컴퓨터 프로그래밍, 시스템 통합 및 관리업" },
        { value: "data_processing", label: "자료처리, 호스팅, 포털 및 기타 인터넷 정보매개 서비스업" },
        { value: "telecommunications", label: "통신업" },
        { value: "broadcasting", label: "방송업" },
      ],
      // 다른 대분류에 대한 소분류도 추가 가능
    }
    return minorIndustriesMap[majorIndustry] || [{ value: "", label: "업종(소분류)을 선택해주세요" }]
  }

  const regions = [
    { value: "", label: "지역을 선택해주세요" },
    { value: "metropolitan", label: "수도권 (서울/경기/인천)" },
    { value: "chungcheong", label: "충청권 (대전/세종/충남/충북)" },
    { value: "gangwon", label: "강원권 (강원도)" },
    { value: "gyeongsang", label: "경상권 (부산/대구/울산/경남/경북)" },
    { value: "jeolla", label: "전라권 (광주/전남/전북)" },
    { value: "jeju", label: "제주권 (제주도)" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // 대분류가 변경되면 소분류 초기화
    if (name === "majorIndustry") {
      setFormData((prev) => ({ ...prev, minorIndustry: "" }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.majorIndustry) newErrors.majorIndustry = "업종(대분류)을 선택해주세요"
    if (!formData.minorIndustry) newErrors.minorIndustry = "업종(소분류)을 선택해주세요"
    if (!formData.detailIndustry.trim()) newErrors.detailIndustry = "업종(상세)를 입력해주세요"
    if (!formData.region) newErrors.region = "지역을 선택해주세요"
    if (!formData.revenue) newErrors.revenue = "매출을 입력해주세요"

    // Validate numeric inputs
    if (formData.revenue && (isNaN(Number(formData.revenue)) || Number(formData.revenue) <= 0)) {
      newErrors.revenue = "올바른 매출 금액을 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const proceedToDetails = () => {
    if (!validateForm()) return

    // 폼 데이터를 localStorage에 저장하고 다음 페이지로 이동
    localStorage.setItem("findInvestorsFormData", JSON.stringify(formData))
    window.location.href = "/find-investors/details"
  }

  const resetForm = () => {
    setFormData({
      majorIndustry: "",
      minorIndustry: "",
      detailIndustry: "",
      region: "",
      revenue: "",
    })
    setErrors({})
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
            <span className="text-orange-600 font-medium">잠재 인수인 찾기</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          {/* 2열 그리드 레이아웃 */}
          <div className="grid lg:grid-cols-3 gap-16">
            {/* 1열: 제목 + 모든 콘텐츠 */}
            <div className="lg:col-span-2 space-y-16">
              {/* Page Title */}
              <div>
                <h1 className="text-5xl font-light text-gray-900 mb-6">잠재 인수인 찾기</h1>
                <div className="w-24 h-1 bg-orange-500 mb-8"></div>
                <p className="text-2xl text-gray-700 font-light mb-4">
                  적절한 인수자를 찾을 수 없어 M&A를 망설이시는 경영자님
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  삼일 PwC는 몇 가지 정보 입력만으로 귀사에 관심있는 잠재인수자를 찾아드리는 시뮬레이션 서비스를
                  제공합니다.
                </p>
              </div>

              {/* Process Flow Section */}
              <section>
                <h2 className="text-3xl font-light text-gray-900 mb-12">잠재 인수인 찾기 시뮬레이션 흐름</h2>

                {/* 3-Step Process */}
                <div className="mb-16">
                  <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 mb-12">
                    {/* Step 1 */}
                    <div className="flex-1 max-w-sm">
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-8 relative min-h-[280px] flex flex-col mb-4">
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
                      {/* Detail Box for Step 1 */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-700 font-medium">업종, 매출, 지역 정보 입력</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 max-w-sm">
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-8 relative min-h-[280px] flex flex-col mb-4">
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
                      {/* Detail Box for Step 2 */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-700 font-medium">삼일 DB 기반한 시뮬레이션</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center">
                      <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 max-w-sm">
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-8 relative min-h-[280px] flex flex-col mb-4">
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
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">잠재인수자 리스트</h3>
                          <p className="text-gray-600 leading-relaxed">5분 내 잠재인수자 리스트 확인</p>
                        </div>
                      </div>
                      {/* Detail Box for Step 3 */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-700 font-medium">지역, 매출을 비롯한 잠재인수자 정보확인</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AI Matching Technology Section */}
              <section className="bg-gradient-to-br from-orange-50 to-orange-100 -mx-6 px-6 py-16 rounded-2xl">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-3xl font-light text-gray-900 text-center mb-4">
                    AI 기반 매칭 기술로 최적의 인수인을 찾아드립니다.
                  </h3>
                  <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>

                  {/* 새로운 설명 텍스트 추가 */}
                  <div className="text-center mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed mb-2">
                      1,000건이 넘는 삼일 PwC 내 M&A 데이터베이스와 AI 매칭로직에 기반하여
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <span className="bg-orange-100 px-2 py-1 rounded font-semibold">「업종, 매출, 지역」</span> 만
                      입력하시면 귀사의 M&A에 가장 적절한 잠재인수자를 찾아드립니다.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Benefit 1 */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200">
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-3">업종 및 사업 영역 호환성 분석</h4>
                          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed">
                              <strong>
                                매각 기업의 업종과 잠재 인수인의 사업 영역 간 시너지 효과를 AI가 정밀 분석하여 최적의
                                매칭을 제공합니다.
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
                            투자 규모 및 기업 가치 적합성 검토
                          </h4>
                          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed">
                              <strong>
                                매출 규모와 기업 가치를 기반으로 인수 가능한 투자자들을 선별하여 실현 가능성 높은 매칭
                                결과를 제공합니다.
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
                            지역적 접근성 및 전략적 시너지 고려
                          </h4>
                          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed">
                              <strong>
                                지역적 특성과 전략적 시너지 가능성을 종합 분석하여 성공적인 M&A로 이어질 수 있는 최적의
                                파트너를 추천합니다.
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
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
                      <h4 className="font-semibold text-orange-900 mb-2">잠재인수자 관련 기타 문의사항</h4>
                      <p className="text-orange-800 leading-relaxed mb-4">
                        귀사의 잠재인수자 수, 규모 및 신뢰도를 비롯하여 구체적인 추가 문의사항이 있으신 경우 문의주시면
                        삼일 M&A 전문가가 직접 안내해드립니다
                      </p>
                      <a
                        href="/acquisition"
                        className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
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
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 2열: 매각대상기업 정보 입력 폼 */}
            <div className="">
              <div className="sticky top-20 bg-white border border-gray-200 p-6 shadow-lg rounded-lg mx-auto">
                <h3 className="text-2xl font-light text-gray-900 mb-6">매각대상기업 정보 입력</h3>

                <div className="space-y-4">
                  {/* Major Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      업종(대분류) <span className="text-orange-500">*</span>
                    </label>
                    <select
                      name="majorIndustry"
                      value={formData.majorIndustry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                        errors.majorIndustry ? "border-red-500" : ""
                      }`}
                    >
                      {majorIndustries.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                    {errors.majorIndustry && <p className="mt-1 text-sm text-red-500">{errors.majorIndustry}</p>}
                  </div>

                  {/* Minor Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      업종(소분류) <span className="text-orange-500">*</span>
                    </label>
                    <select
                      name="minorIndustry"
                      value={formData.minorIndustry}
                      onChange={handleInputChange}
                      disabled={!formData.majorIndustry}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.minorIndustry ? "border-red-500" : ""
                      }`}
                    >
                      {getMinorIndustries(formData.majorIndustry).map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                    {errors.minorIndustry && <p className="mt-1 text-sm text-red-500">{errors.minorIndustry}</p>}
                  </div>

                  {/* Detail Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      업종(상세) <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="detailIndustry"
                      value={formData.detailIndustry}
                      onChange={handleInputChange}
                      placeholder="구체적인 사업 분야를 입력해주세요"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors ${
                        errors.detailIndustry ? "border-red-500" : ""
                      }`}
                    />
                    {errors.detailIndustry && <p className="mt-1 text-sm text-red-500">{errors.detailIndustry}</p>}
                  </div>

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
                </div>

                {/* Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={proceedToDetails}
                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-600 transition-colors duration-200"
                  >
                    잠재 인수인 찾기
                  </button>

                  <button
                    onClick={resetForm}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    다시 입력하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
