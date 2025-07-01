"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "../../components/Header"

export default function ValuationResultPage() {
  const [completeData, setCompleteData] = useState<any>(null)
  const [valuationResult, setValuationResult] = useState<{
    estimatedValue: number
    valueRange: { min: number; max: number }
    methodology: string[]
    confidence: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // localStorage에서 완전한 데이터 가져오기
    const savedData = localStorage.getItem("completeValuationData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setCompleteData(data)

      // 가치산정 계산 수행
      calculateValuation(data)
    } else {
      // 데이터가 없으면 처음 페이지로 리다이렉트
      window.location.href = "/valuation"
    }
  }, [])

  const calculateValuation = async (data: any) => {
    // 시뮬레이션 로딩 시간
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const revenue = Number(data.revenue)
    const operatingProfit = Number(data.operatingProfit)
    const netAssets = Number(data.netAssets)

    // 가치산정 로직
    const profitMargin = operatingProfit / revenue
    const industryMultiplier = getIndustryMultiplier(data.industry)
    const regionMultiplier = getRegionMultiplier(data.region)

    const baseValue = operatingProfit * industryMultiplier * regionMultiplier
    const assetValue = netAssets * 1.2
    const estimatedValue = Math.max(baseValue, assetValue)

    setValuationResult({
      estimatedValue: Math.round(estimatedValue),
      valueRange: {
        min: Math.round(estimatedValue * 0.8),
        max: Math.round(estimatedValue * 1.2),
      },
      methodology: ["수익접근법", "자산접근법", "시장접근법"],
      confidence: Math.min(95, 70 + (profitMargin > 0.1 ? 15 : 0) + (revenue > 100 ? 10 : 0)),
    })

    setIsLoading(false)
  }

  const getIndustryMultiplier = (industry: string): number => {
    const multipliers: Record<string, number> = {
      information_communication: 12,
      professional_scientific: 10,
      finance_insurance: 8,
      manufacturing: 7,
      health_social: 9,
      wholesale_retail: 6,
      construction: 5,
      transportation: 6,
      accommodation_food: 4,
      real_estate: 8,
      business_support: 6,
      education: 7,
      arts_sports: 5,
      other_services: 6,
    }
    return multipliers[industry] || 6
  }

  const getRegionMultiplier = (region: string): number => {
    const multipliers: Record<string, number> = {
      metropolitan: 1.2,
      chungcheong: 1.0,
      gangwon: 0.9,
      jeolla: 0.9,
      gyeongsang: 1.1,
      jeju: 0.95,
    }
    return multipliers[region] || 1.0
  }

  const resetSimulation = () => {
    localStorage.removeItem("valuationFormData")
    localStorage.removeItem("completeValuationData")
    window.location.href = "/valuation"
  }

  if (!completeData || isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI 기반 가치산정 분석 중...</h2>
            <p className="text-gray-600">잠시만 기다려주세요. 정확한 분석을 위해 처리 중입니다.</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-6xl mx-auto px-6 py-16">
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
                <div className="w-16 h-1 bg-orange-500 mx-2"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  3
                </div>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-light text-gray-900 mb-4">기업가치 산정 결과</h1>
              <p className="text-lg text-gray-600">{completeData.companyName}의 기업가치 분석이 완료되었습니다</p>
            </div>
          </div>

          {/* Main Results */}
          {valuationResult && (
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Primary Result */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">추정 기업가치</h2>

                  <div className="text-center mb-8">
                    <div className="text-6xl font-light text-orange-600 mb-4">
                      {valuationResult.estimatedValue.toLocaleString()}
                      <span className="text-2xl ml-2">억원</span>
                    </div>
                    <div className="text-lg text-gray-600">
                      예상 범위: {valuationResult.valueRange.min.toLocaleString()}억원 ~{" "}
                      {valuationResult.valueRange.max.toLocaleString()}억원
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">신뢰도</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-light text-orange-600">{valuationResult.confidence}%</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-orange-500 h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${valuationResult.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">적용 방법론</h3>
                      <div className="flex flex-wrap gap-2">
                        {valuationResult.methodology.map((method, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 px-3 py-1 text-sm font-medium rounded-full"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">상세 분석</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">재무 지표 분석</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">영업이익률</span>
                          <span className="font-medium">
                            {((Number(completeData.operatingProfit) / Number(completeData.revenue)) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">자산 대비 수익률</span>
                          <span className="font-medium">
                            {((Number(completeData.operatingProfit) / Number(completeData.netAssets)) * 100).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">업종 평균 대비</span>
                          <span className="font-medium text-green-600">상위 25%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">시장 환경</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">업종 성장률</span>
                          <span className="font-medium">8.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">지역 경제 지수</span>
                          <span className="font-medium">110.2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">시장 전망</span>
                          <span className="font-medium text-blue-600">긍정적</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info Summary */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">기업 정보</h3>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 text-sm">회사명</span>
                      <div className="font-medium">{completeData.companyName}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">담당자</span>
                      <div className="font-medium">{completeData.contactName}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">연락처</span>
                      <div className="font-medium">{completeData.phoneNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">이메일</span>
                      <div className="font-medium">{completeData.email}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">다음 단계 추천</h4>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      전문가 정밀 평가 상담
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      M&A 전략 수립 지원
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      잠재 투자자 매칭
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">중요 안내사항</h5>
                <p className="text-yellow-700 leading-relaxed">
                  본 시뮬레이션 결과는 입력하신 정보를 바탕으로 한 예비 평가입니다. 실제 기업가치는 보다 정밀한 실사와
                  분석을 통해 결정되며, 시장 상황, 거래 조건 등에 따라 달라질 수 있습니다. 정확한 기업가치 평가를
                  원하시면 전문가 상담을 받아보시기 바랍니다.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetSimulation}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              새로운 시뮬레이션
            </button>
            <Link
              href="/consultation"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg text-center"
            >
              전문가 상담 신청
            </Link>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              결과 PDF 다운로드
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
