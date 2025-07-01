"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function FindInvestorsDetailsPage() {
  const [basicFormData, setBasicFormData] = useState<any>(null)
  const [detailsFormData, setDetailsFormData] = useState({
    companyName: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    termsConsent: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // localStorage에서 기본 폼 데이터 가져오기
    const savedData = localStorage.getItem("findInvestorsFormData")
    if (savedData) {
      setBasicFormData(JSON.parse(savedData))
    } else {
      // 데이터가 없으면 이전 페이지로 리다이렉트
      window.location.href = "/find-investors"
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setDetailsFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setDetailsFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!detailsFormData.companyName.trim()) newErrors.companyName = "회사명을 입력해주세요"
    if (!detailsFormData.contactName.trim()) newErrors.contactName = "담당자 성명을 입력해주세요"
    if (!detailsFormData.phoneNumber.trim()) newErrors.phoneNumber = "연락처를 입력해주세요"
    if (!detailsFormData.email.trim()) newErrors.email = "이메일 주소를 입력해주세요"
    if (!detailsFormData.termsConsent) newErrors.termsConsent = "당사 이용 약관에 동의해주세요"

    // 이메일 형식 검증
    if (detailsFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detailsFormData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요"
    }

    // 연락처 형식 검증
    if (
      detailsFormData.phoneNumber &&
      !/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(detailsFormData.phoneNumber.replace(/\s/g, ""))
    ) {
      newErrors.phoneNumber = "올바른 연락처 형식을 입력해주세요 (예: 010-1234-5678)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // 모든 데이터를 localStorage에 저장
    const completeData = {
      ...basicFormData,
      ...detailsFormData,
    }
    localStorage.setItem("completeFindInvestorsData", JSON.stringify(completeData))

    // 시뮬레이션 처리 시간 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 결과 페이지로 이동
    window.location.href = "/find-investors/result"
  }

  const getIndustryLabel = (value: string) => {
    const industries = {
      manufacturing: "제조업",
      construction: "건설업",
      wholesale_retail: "도매 및 소매업",
      transportation: "운수 및 창고업",
      accommodation_food: "숙박 및 음식점업",
      information_communication: "정보통신업",
      finance_insurance: "금융 및 보험업",
      real_estate: "부동산업",
      professional_scientific: "전문, 과학 및 기술 서비스업",
      business_support: "사업시설 관리, 사업 지원 및 임대 서비스업",
      education: "교육 서비스업",
      health_social: "보건업 및 사회복지 서비스업",
      arts_sports: "예술, 스포츠 및 여가관련 서비스업",
      other_services: "기타 서비스업",
    }
    return industries[value as keyof typeof industries] || value
  }

  const getMinorIndustryLabel = (majorValue: string, minorValue: string) => {
    const minorIndustriesMap: Record<string, Record<string, string>> = {
      manufacturing: {
        food_manufacturing: "식료품 제조업",
        textile_manufacturing: "섬유제품 제조업",
        chemical_manufacturing: "화학물질 및 화학제품 제조업",
        metal_manufacturing: "금속가공제품 제조업",
        machinery_manufacturing: "기계 및 장비 제조업",
        electronic_manufacturing: "전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업",
        automotive_manufacturing: "자동차 및 트레일러 제조업",
      },
      information_communication: {
        software_development: "소프트웨어 개발 및 공급업",
        computer_programming: "컴퓨터 프로그래밍, 시스템 통합 ������� 관리업",
        data_processing: "자료처리, 호스팅, 포털 및 기타 인터넷 정보매개 서비스업",
        telecommunications: "통신업",
        broadcasting: "방송업",
      },
    }
    return minorIndustriesMap[majorValue]?.[minorValue] || minorValue
  }

  const getRegionLabel = (value: string) => {
    const regions = {
      metropolitan: "수도권 (서울/경기/인천)",
      chungcheong: "충청권 (대전/세종/충남/충북)",
      gangwon: "강원권 (강원도)",
      gyeongsang: "경상권 (부산/대구/울산/경남/경북)",
      jeolla: "전라권 (광주/전남/전북)",
      jeju: "제주권 (제주도)",
    }
    return regions[value as keyof typeof regions] || value
  }

  if (!basicFormData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <div className="w-16 h-1 bg-orange-500 mx-2"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  2
                </div>
                <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  3
                </div>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-light text-gray-900 mb-4">매각 희망 고객 정보 입력</h1>
              <p className="text-lg text-gray-600">정확한 매칭을 위해 추가 정보를 입력해주세요</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Summary */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">입력하신 기업 정보</h2>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">업종(대분류)</span>
                  <span className="text-gray-900">{getIndustryLabel(basicFormData.majorIndustry)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">업종(소분류)</span>
                  <span className="text-gray-900">
                    {getMinorIndustryLabel(basicFormData.majorIndustry, basicFormData.minorIndustry)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">업종(상세)</span>
                  <span className="text-gray-900">{basicFormData.detailIndustry}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">지역</span>
                  <span className="text-gray-900">{getRegionLabel(basicFormData.region)}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">매출</span>
                  <span className="text-gray-900">{Number(basicFormData.revenue).toLocaleString()}억원</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-2">정보 보안</h4>
                    <p className="text-orange-800 leading-relaxed">
                      입력하신 모든 정보는 암호화되어 안전하게 보호되며, 매칭 목적으로만 사용됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Additional Info Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">매각 희망 고객 필수 입력 정보</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
                    귀사명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={detailsFormData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="회사명을 입력해주세요"
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                </div>

                {/* Contact Name */}
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-900 mb-2">
                    성명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={detailsFormData.contactName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.contactName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="담당자 성명을 입력해주세요"
                  />
                  {errors.contactName && <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={detailsFormData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="010-1234-5678"
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    이메일 주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={detailsFormData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="example@company.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Terms Consent */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsConsent"
                      name="termsConsent"
                      checked={detailsFormData.termsConsent}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <div className="flex-1">
                      <label htmlFor="termsConsent" className="text-sm font-medium text-gray-900">
                        당사 이용 약관 동의 <span className="text-red-500">*</span>
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        잠재 인수인 매칭 서비스 제공을 위해 개인정보 수집 및 이용에 동의합니다.
                        <Link
                          href="/terms"
                          className="text-orange-600 hover:text-orange-700 underline ml-1"
                          target="_blank"
                        >
                          이용 약관 보기
                        </Link>
                      </p>
                      {errors.termsConsent && <p className="mt-1 text-sm text-red-500">{errors.termsConsent}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-8 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
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
                        매칭 분석 중...
                      </>
                    ) : (
                      "시뮬레이션 결과 확인"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">정확한 매칭</h3>
              <p className="text-gray-600 text-sm">AI 기반 알고리즘과 전문가 노하우를 결합한 정밀한 투자자 매칭</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">보안 보장</h3>
              <p className="text-gray-600 text-sm">철저한 보안 시스템으로 고객 정보를 안전하게 보호</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">신속한 결과</h3>
              <p className="text-gray-600 text-sm">복잡한 매칭 과정을 간소화하여 빠른 결과 제공</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
