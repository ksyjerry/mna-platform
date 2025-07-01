"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "../../components/Header"

export default function FindInvestorsResultPage() {
  const [completeData, setCompleteData] = useState<any>(null)
  const [matchingResults, setMatchingResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // localStorage에서 완전한 데이터 가져오기
    const savedData = localStorage.getItem("completeFindInvestorsData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setCompleteData(data)

      // 매칭 분석 수행
      performMatching(data)
    } else {
      // 데이터가 없으면 처음 페이지로 리다이렉트
      window.location.href = "/find-investors"
    }
  }, [])

  const performMatching = async (data: any) => {
    // 시뮬레이션 로딩 시간
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 샘플 투자자 데이터
    const allInvestors = [
      {
        id: "INV-2024-001",
        type: "전략적 투자자",
        typeColor: "bg-orange-100 text-orange-800",
        name: "테크놀로지 그룹",
        industry: "정보통신업",
        focusAreas: ["AI/ML", "클라우드", "사이버보안"],
        investmentRange: "100억원 ~ 500억원",
        region: "서울/경기",
        description:
          "글로벌 IT 기업으로 AI, 클라우드, 사이버보안 분야의 혁신적인 기술을 보유한 스타트업과 중소기업에 투자하고 있습니다.",
        recentDeals: 3,
        established: "2018",
        portfolio: 25,
        matchScore: 95,
        image: "/placeholder.svg?height=200&width=300&text=Technology+Group+Investor",
      },
      {
        id: "INV-2024-002",
        type: "사모펀드",
        typeColor: "bg-yellow-100 text-yellow-800",
        name: "성장 파트너스",
        industry: "제조업",
        focusAreas: ["친환경 소재", "자동화", "스마트팩토리"],
        investmentRange: "200억원 ~ 1,000억원",
        region: "전국",
        description:
          "제조업 분야의 성장 기업에 특화된 사모펀드로, 친환경 기술과 자동화 솔루션을 보유한 기업에 집중 투자하고 있습니다.",
        recentDeals: 5,
        established: "2015",
        portfolio: 18,
        matchScore: 88,
        image: "/placeholder.svg?height=200&width=300&text=Growth+Partners+Fund",
      },
      {
        id: "INV-2024-003",
        type: "벤처캐피털",
        typeColor: "bg-orange-100 text-orange-800",
        name: "이노베이션 벤처스",
        industry: "바이오/헬스케어",
        focusAreas: ["의료기기", "디지털헬스", "바이오테크"],
        investmentRange: "50억원 ~ 300억원",
        region: "서울/경기",
        description:
          "바이오헬스케어 분야 전문 벤처캐��털로, 혁신적인 의료기술과 디지털헬스 솔루션을 개발하는 기업에 투자합니다.",
        recentDeals: 8,
        established: "2020",
        portfolio: 32,
        matchScore: 82,
        image: "/placeholder.svg?height=200&width=300&text=Innovation+Ventures",
      },
    ]

    // AI 매칭 로직 시뮬레이션
    const matchedInvestors = allInvestors
      .filter((investor) => {
        // 업종 매칭
        if (data.majorIndustry === "information_communication" && investor.industry === "정보통신업") return true
        if (data.majorIndustry === "manufacturing" && investor.industry === "제조업") return true
        // 기타 매칭 로직
        return Math.random() > 0.3 // 70% 확률로 매칭
      })
      .sort((a, b) => b.matchScore - a.matchScore)

    setMatchingResults(matchedInvestors)
    setIsLoading(false)
  }

  const resetSimulation = () => {
    localStorage.removeItem("findInvestorsFormData")
    localStorage.removeItem("completeFindInvestorsData")
    window.location.href = "/find-investors"
  }

  if (!completeData || isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI 기반 매칭 분석 중...</h2>
            <p className="text-gray-600">잠시만 기다려주세요. 최적의 잠재 인수인을 찾고 있습니다.</p>
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
              <h1 className="text-4xl font-light text-gray-900 mb-4">잠재 인수인 매칭 결과</h1>
              <p className="text-lg text-gray-600">{completeData.companyName}의 매칭 분석이 완료되었습니다</p>
            </div>
          </div>

          {/* Main Results */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Primary Result */}
            <div className="lg:col-span-2">
              {matchingResults.length > 0 ? (
                <div>
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        총 {matchingResults.length}명의 잠재 인수인이 매칭되었습니다
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      AI 분석 결과, 귀하의 기업과 높은 매칭도를 보이는 투자자들을 발견했습니다. 매칭 점수가 높은 순으로
                      정렬되어 있으며, 각 투자자의 상세 정보를 확인하실 수 있습니다.
                    </p>
                  </div>

                  {/* Matched Investors */}
                  <div className="space-y-6">
                    {matchingResults.map((investor) => (
                      <div
                        key={investor.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                      >
                        <div className="p-6">
                          {/* Header with Match Score */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${investor.typeColor}`}
                              >
                                {investor.type}
                              </span>
                              <span className="text-gray-500 text-sm font-mono">{investor.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">매칭 점수:</span>
                              <span
                                className={`text-lg font-bold ${
                                  investor.matchScore >= 90
                                    ? "text-green-600"
                                    : investor.matchScore >= 80
                                      ? "text-yellow-600"
                                      : "text-orange-600"
                                }`}
                              >
                                {investor.matchScore}점
                              </span>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-6">
                            {/* Left: Basic Info */}
                            <div className="md:col-span-2">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{investor.name}</h3>
                              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                  {investor.industry}
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  {investor.region}
                                </div>
                              </div>

                              <div className="mb-4">
                                <span className="text-lg font-bold text-orange-600">{investor.investmentRange}</span>
                                <span className="text-gray-500 text-sm ml-2">투자규모</span>
                              </div>

                              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{investor.description}</p>

                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">관심 분야</h4>
                                <div className="flex flex-wrap gap-2">
                                  {investor.focusAreas.map((area, index) => (
                                    <span
                                      key={index}
                                      className="bg-yellow-50 text-yellow-700 px-2 py-1 text-xs font-medium rounded"
                                    >
                                      {area}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right: Stats and Action */}
                            <div className="flex flex-col">
                              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                                <div>
                                  <div className="text-lg font-bold text-gray-900">{investor.recentDeals}</div>
                                  <div className="text-xs text-gray-500">최근 딜</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-gray-900">{investor.portfolio}</div>
                                  <div className="text-xs text-gray-500">포트폴리오</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-gray-900">{investor.established}</div>
                                  <div className="text-xs text-gray-500">설립년도</div>
                                </div>
                              </div>

                              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg mt-auto">
                                투자 문의하기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">매칭된 투자자가 없습니다</h3>
                  <p className="text-gray-600 mb-6">
                    입력하신 조건에 맞는 투자자를 찾지 못했습니다. 다른 조건으로 다시 검색해보시거나 전문가 상담을
                    받아보세요.
                  </p>
                  <Link
                    href="/acquisition"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    전문가 상담 신청
                  </Link>
                </div>
              )}
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
                    전문가 매칭 상담
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    M&A 전략 수립 지원
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    투자자 미팅 주선
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
                  본 매칭 결과는 입력하신 정보를 바탕으로 한 예비 분석입니다. 실제 투자 협상은 보다 정밀한 실사와 분석을
                  통해 진행되며, 시장 상황, 투자 조건 등에 따라 달라질 수 있습니다. 정확한 매칭을 원하시면 전문가 상담을
                  받아보시기 바랍니다.
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
              새로운 매칭 검색
            </button>
            <Link
              href="/acquisition"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg text-center"
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
