"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "../components/Header"

export default function AcquisitionForm() {
  const [formData, setFormData] = useState({
    // 인수 니즈 관련
    desiredIndustry: "",
    desiredLocation: "",
    desiredInvestmentSize: "",
    acquisitionPurpose: "",
    acquisitionBudget: "",

    // 귀사 정보
    companyName: "",
    companyIndustry: "",
    companyRevenue: "",
    companyLocation: "",
    applicantName: "",
    phoneNumber: "",
    email: "",
    consultationContent: "",
    privacyConsent: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const locations = [
    { value: "", label: "지역을 선택해주세요" },
    { value: "metropolitan", label: "수도권 (서울/경기/인천)" },
    { value: "chungcheong", label: "충청권 (대전/세종/충남/충북)" },
    { value: "gangwon", label: "강원권 (강원도)" },
    { value: "jeolla", label: "전라권 (광주/전남/전북)" },
    { value: "gyeongsang", label: "경상권 (부산/대구/울산/경남/경북)" },
    { value: "jeju", label: "제주권 (제주도)" },
    { value: "other", label: "기타" },
  ]

  const investmentSizes = [
    { value: "", label: "투자 규모를 선택해주세요" },
    { value: "under_10b", label: "100억원 미만" },
    { value: "10b_50b", label: "100억원 ~ 500억원" },
    { value: "50b_100b", label: "500억원 ~ 1,000억원" },
    { value: "100b_500b", label: "1,000억원 ~ 5,000억원" },
    { value: "500b_1000b", label: "5,000억원 ~ 1조원" },
    { value: "over_1000b", label: "1조원 이상" },
  ]

  const revenueRanges = [
    { value: "", label: "매출 규모를 선택해주세요" },
    { value: "under_1b", label: "10억원 미만" },
    { value: "1b_5b", label: "10억원 ~ 50억원" },
    { value: "5b_10b", label: "50억원 ~ 100억원" },
    { value: "10b_50b", label: "100억원 ~ 500억원" },
    { value: "50b_100b", label: "500억원 ~ 1,000억원" },
    { value: "100b_500b", label: "1,000억원 ~ 5,000억원" },
    { value: "over_500b", label: "5,000억원 이상" },
  ]

  const acquisitionPurposes = [
    { value: "", label: "인수 목적을 선택해주세요" },
    { value: "strategic", label: "전략적 인수 (시너지 창출)" },
    { value: "expansion", label: "사업 확장" },
    { value: "diversification", label: "사업 다각화" },
    { value: "technology", label: "기술 확보" },
    { value: "market_entry", label: "신규 시장 진입" },
    { value: "vertical_integration", label: "수직 계열화" },
    { value: "financial", label: "재무적 투자" },
    { value: "other", label: "기타" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 인수 니즈 관련 필수 필드 검증
    if (!formData.desiredIndustry) newErrors.desiredIndustry = "희망 업종을 선택해주세요"
    if (!formData.desiredLocation) newErrors.desiredLocation = "희망 지역을 선택해주세요"
    if (!formData.desiredInvestmentSize) newErrors.desiredInvestmentSize = "희망 투자 규모를 선택해주세요"

    // 귀사 정보 필수 필드 검증
    if (!formData.companyName.trim()) newErrors.companyName = "회사명을 입력해주세요"
    if (!formData.companyIndustry) newErrors.companyIndustry = "업종을 선택해주세요"
    if (!formData.companyRevenue) newErrors.companyRevenue = "매출 규모를 선택해주세요"
    if (!formData.companyLocation) newErrors.companyLocation = "소재지를 선택해주세요"
    if (!formData.applicantName.trim()) newErrors.applicantName = "신청인 성함을 입력해주세요"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "핸드폰 번호를 입력해주세요"
    if (!formData.email.trim()) newErrors.email = "이메일 주소를 입력해주세요"
    if (!formData.consultationContent.trim()) newErrors.consultationContent = "상담 내용을 입력해주세요"
    if (!formData.privacyConsent) newErrors.privacyConsent = "개인정보 처리방침에 동의해주세요"

    // 이메일 형식 검증
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요"
    }

    // 핸드폰 번호 형식 검증
    if (formData.phoneNumber && !/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "올바른 핸드폰 번호 형식을 입력해주세요 (예: 010-1234-5678)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // 폼 제출 로직
      console.log("Form submitted:", formData)
      alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.")
      // 실제로는 API 호출 등의 로직이 들어갈 것입니다
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              홈
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-orange-600 font-medium">인수 관련 상담</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">인수 관련 상담 신청</h1>
            <p className="text-lg text-gray-600 mb-8">
              삼일회계법인의 M&A 전문가가 귀하의 기업 인수를 위한 최적의 솔루션을 제공해드립니다.
            </p>
            <div className="flex items-center justify-center gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 max-w-2xl mx-auto">
              <svg
                className="w-6 h-6 text-orange-600 flex-shrink-0"
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
              <p className="text-gray-700 text-sm">
                모든 정보는 철저한 보안 하에 관리되며, 전문 상담사가 24시간 이내에 연락드립니다.
              </p>
            </div>
          </div>

          {/* 폼 섹션 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 인수 니즈 관련 섹션 */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">인수 니즈 관련 정보</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 희망 업종 */}
                  <div>
                    <label htmlFor="desiredIndustry" className="block text-sm font-medium text-gray-700 mb-2">
                      희망 업종 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="desiredIndustry"
                      name="desiredIndustry"
                      value={formData.desiredIndustry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.desiredIndustry ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      {industries.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                    {errors.desiredIndustry && <p className="mt-1 text-sm text-red-500">{errors.desiredIndustry}</p>}
                  </div>

                  {/* 희망 지역 */}
                  <div>
                    <label htmlFor="desiredLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      희망 지역 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="desiredLocation"
                      name="desiredLocation"
                      value={formData.desiredLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.desiredLocation ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      {locations.map((location) => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                    {errors.desiredLocation && <p className="mt-1 text-sm text-red-500">{errors.desiredLocation}</p>}
                  </div>

                  {/* 희망 투자 규모 */}
                  <div>
                    <label htmlFor="desiredInvestmentSize" className="block text-sm font-medium text-gray-700 mb-2">
                      희망 투자 규모 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="desiredInvestmentSize"
                      name="desiredInvestmentSize"
                      value={formData.desiredInvestmentSize}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.desiredInvestmentSize ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      {investmentSizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                    {errors.desiredInvestmentSize && (
                      <p className="mt-1 text-sm text-red-500">{errors.desiredInvestmentSize}</p>
                    )}
                  </div>

                  {/* 인수 목적 */}
                  <div>
                    <label htmlFor="acquisitionPurpose" className="block text-sm font-medium text-gray-700 mb-2">
                      인수 목적 <span className="text-gray-400">(선택)</span>
                    </label>
                    <select
                      id="acquisitionPurpose"
                      name="acquisitionPurpose"
                      value={formData.acquisitionPurpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      {acquisitionPurposes.map((purpose) => (
                        <option key={purpose.value} value={purpose.value}>
                          {purpose.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 인수 예산 */}
                  <div className="md:col-span-2">
                    <label htmlFor="acquisitionBudget" className="block text-sm font-medium text-gray-700 mb-2">
                      인수 예산 <span className="text-gray-400">(선택)</span>
                    </label>
                    <input
                      type="text"
                      id="acquisitionBudget"
                      name="acquisitionBudget"
                      value={formData.acquisitionBudget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="예: 500억원, 협의 가능 등"
                    />
                  </div>
                </div>
              </div>

              {/* 귀사 정보 섹션 */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">귀사 정보</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 회사명 */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      회사명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.companyName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="회사명을 입력해주세요"
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                  </div>

                  {/* 업종 */}
                  <div>
                    <label htmlFor="companyIndustry" className="block text-sm font-medium text-gray-700 mb-2">
                      업종 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="companyIndustry"
                      name="companyIndustry"
                      value={formData.companyIndustry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.companyIndustry ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      {industries.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </select>
                    {errors.companyIndustry && <p className="mt-1 text-sm text-red-500">{errors.companyIndustry}</p>}
                  </div>

                  {/* 매출 규모 */}
                  <div>
                    <label htmlFor="companyRevenue" className="block text-sm font-medium text-gray-700 mb-2">
                      매출 규모 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="companyRevenue"
                      name="companyRevenue"
                      value={formData.companyRevenue}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.companyRevenue ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      {revenueRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    {errors.companyRevenue && <p className="mt-1 text-sm text-red-500">{errors.companyRevenue}</p>}
                  </div>

                  {/* 소재지 */}
                  <div>
                    <label htmlFor="companyLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      소재지 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="companyLocation"
                      name="companyLocation"
                      value={formData.companyLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.companyLocation ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      {locations.map((location) => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                    {errors.companyLocation && <p className="mt-1 text-sm text-red-500">{errors.companyLocation}</p>}
                  </div>

                  {/* 신청인 성함 */}
                  <div>
                    <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
                      신청인 성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="applicantName"
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.applicantName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="성함을 입력해주세요"
                    />
                    {errors.applicantName && <p className="mt-1 text-sm text-red-500">{errors.applicantName}</p>}
                  </div>

                  {/* 핸드폰 번호 */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      핸드폰 번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="010-1234-5678"
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>

                  {/* 이메일 주소 */}
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="example@company.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* 상담 내용 섹션 */}
              <div className="pb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">상담 내용</h2>

                <div>
                  <label htmlFor="consultationContent" className="block text-sm font-medium text-gray-700 mb-2">
                    상담 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="consultationContent"
                    name="consultationContent"
                    value={formData.consultationContent}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${
                      errors.consultationContent ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="인수와 관련하여 궁금한 사항이나 상담받고 싶은 내용을 자유롭게 작성해주세요.&#10;&#10;예시:&#10;- 타겟 기업 발굴 및 선정 문의&#10;- 인수 절차 및 일정 문의&#10;- 기업가치 평가 방법 문의&#10;- 인수 후 통합 관리(PMI) 문의&#10;- 기타 M&A 관련 문의"
                  />
                  {errors.consultationContent && (
                    <p className="mt-1 text-sm text-red-500">{errors.consultationContent}</p>
                  )}
                </div>
              </div>

              {/* 개인정보 동의 */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <label htmlFor="privacyConsent" className="text-sm font-medium text-gray-700">
                      개인정보 처리방침 동의 <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      상담 서비스 제공을 위해 개인정보 수집 및 이용에 동의합니다.
                      <Link href="#" className="text-orange-600 hover:text-orange-700 underline ml-1">
                        자세히 보기
                      </Link>
                    </p>
                    {errors.privacyConsent && <p className="mt-1 text-sm text-red-500">{errors.privacyConsent}</p>}
                  </div>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex gap-4 pt-6">
                <Link
                  href="/"
                  className="flex-1 bg-gray-100 text-gray-700 py-4 px-8 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors duration-200"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  상담 신청하기
                </button>
              </div>
            </form>
          </div>

          {/* 추가 정보 섹션 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">타겟 발굴</h3>
              <p className="text-gray-600 text-sm">광범위한 네트워크를 통한 최적의 인수 타겟 발굴</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">전문 자문</h3>
              <p className="text-gray-600 text-sm">업계 최고 수준의 M&A 전문가가 직접 자문해드립니다</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">빠른 실행</h3>
              <p className="text-gray-600 text-sm">체계적인 프로세스로 신속한 M&A 실행을 지원합니다</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
