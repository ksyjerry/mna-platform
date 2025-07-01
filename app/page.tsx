"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "./components/Header"
import { MAListService } from "../lib/services/ma-list-service"
import { type MAListItem, FILTER_OPTIONS } from "../lib/types/ma-list"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("general")
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [activeServiceTab, setActiveServiceTab] = useState("seller")
  const [activeClassificationTab, setActiveClassificationTab] = useState("subject")
  const [maOpportunities, setMAOpportunities] = useState<MAListItem[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<MAListItem[]>([])
  const [activeFilters, setActiveFilters] = useState({
    subject: "all",
    category: "all",
    industry: "all",
    region: "all",
  })
  const [isLoading, setIsLoading] = useState(true)

  const faqCategories = {
    general: {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "일반 문의",
      faqs: [
        {
          question: "비밀유지 절차는 어떻게 되나요?",
          answer:
            "모든 정보는 철저한 비밀유지 계약(NDA) 하에 공유됩니다. 매물 정보는 검증된 투자자에게만 제한적으로 공개되며, 모든 접근 기록이 관리됩니다. 삼일회계법인의 보안 시스템을 통해 정보 유출 위험을 최소화합니다.",
        },
        {
          question: "검증 기준은 어떤 방식인가요?",
          answer:
            "매도자와 투자자 모두 삼일회계법인의 엄격한 검증 절차를 거칩니다. 기업의 재무 상태, 법적 리스크, 시장 경쟁력 등을 종합적으로 평가하며, 투자자의 경우 자금력과 투자 이력, 신용도 등을 검증합니다.",
        },
      ],
    },
    platform: {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "플랫폼 이용",
      faqs: [
        {
          question: "AI 매칭 기능은 어떻게 작동하나요?",
          answer:
            "AI 매칭 시스템은 산업 분야, 기업 규모, 재무 상태, 투자 조건 등 다양한 요소를 분석하여 최적의 매물과 투자자를 연결합니다. 딜 성공 확률이 높은 매칭을 우선적으로 추천하며, 지속적인 학습을 통해 매칭 정확도를 높여갑니다.",
        },
        {
          question: "플랫폼 이용 비용은 어떻게 되나요?",
          answer:
            "기본 회원 가입 및 정보 등록은 무료입니다. 실제 딜이 성사될 경우에만 성공 수수료가 발생하며, 거래 규모와 복잡성에 따라 차등 적용됩니다. 자세한 수수료 구조는 상담 시 안내해 드립니다.",
        },
      ],
    },
    seller: {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "매도자 정보",
      faqs: [
        {
          question: "매물 등록 후 얼마나 빨리 투자자를 만날 수 있나요?",
          answer:
            "매물 정보 검증 후 평균 2주 이내에 첫 투자자 매칭이 이루어집니다. 산업 특성과 매물 상태에 따라 차이가 있을 수 있으며, 프리미엄 서비스 이용 시 더 빠른 매칭이 가능합니다.",
        },
        {
          question: "매물 정보는 어디까지 공개되나요?",
          answer:
            "초기에는 기업명, 위치 등 식별 정보 없이 산업군, 매출 규모, 수익성 등 기본 정보만 공개됩니다. 관심 투자자가 NDA 체결 후에만 상세 정보가 단계적으로 공개되며, 모든 과정은 매도자의 승인 하에 진행됩니다.",
        },
      ],
    },
    investor: {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      title: "투자자 정보",
      faqs: [
        {
          question: "투자자 검증 절차는 어떻게 되나요?",
          answer:
            "투자자는 신원 확인, 자금력 증명, 투자 이력 검토의 3단계 검증을 거칩니다. 기관 투자자의 경우 추가적인 법적 검토가 진행될 수 있으며, 모든 검증은 일반적으로 5영업일 이내에 완료됩니다.",
        },
        {
          question: "해외 매물도 확인할 수 있나요?",
          answer:
            "네, PwC의 글로벌 네트워크를 통해 해외 매물도 확인 가능합니다. 157개국 PwC 네트워크를 활용하여 관심 지역의 검증된 매물 정보를 제공받을 수 있으며, 국가별 전문가의 자문도 함께 받으실 수 있습니다.",
        },
      ],
    },
    support: {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: "고객 지원",
      faqs: [
        {
          question: "전문가 상담은 어떻게 받을 수 있나요?",
          answer:
            "플랫폼 내 '전문가 상담 신청' 메뉴를 통해 언제든지 상담 예약이 가능합니다. 업종별 전문 파트너가 배정되며, 24시간 이내에 상담 일정이 확정됩니다. 긴급한 경우 핫라인을 통한 즉시 상담도 가능합니다.",
        },
        {
          question: "딜 진행 중 문제가 발생하면 어떻게 해결하나요?",
          answer:
            "각 딜에는 전담 매니저가 배정되어 전 과정을 모니터링합니다. 문제 발생 시 즉시 개입하여 해결책을 제시하며, 필요한 경우 법률, 세무, 회계 등 전문가 팀이 즉시 투입됩니다. 24/7 긴급 지원 시스템을 운영하고 있습니다.",
        },
      ],
    },
    payment: {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "수수료 및 결제",
      faqs: [
        {
          question: "수수료 체계는 어떻게 되나요?",
          answer:
            "기본 플랫폼 이용은 무료이며, 딜 성사 시에만 성공 수수료가 발생합니다. 수수료율은 거래 규모에 따라 0.5~3% 범위에서 차등 적용되며, 특수한 딜 구조나 추가 서비스 이용 시 별도 협의가 필요할 수 있습니다.",
        },
        {
          question: "부가 서비스 비용은 어떻게 되나요?",
          answer:
            "기업 가치 평가, 실사, 세무 자문 등 부가 서비스는 별도 비용이 발생합니다. 서비스 범위와 복잡성에 따라 비용이 결정되며, 사전에 명확한 견적을 제공해 드립니다. 패키지 이용 시 할인 혜택이 적용됩니다.",
        },
      ],
    },
  }

  const filteredFaqs = Object.entries(faqCategories).reduce(
    (acc, [key, category]) => {
      const filteredCategoryFaqs = category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      if (filteredCategoryFaqs.length > 0) {
        acc[key] = { ...category, faqs: filteredCategoryFaqs }
      }
      return acc
    },
    {} as typeof faqCategories,
  )

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  // M&A 기회 데이터 로드
  useEffect(() => {
    const loadMAOpportunities = async () => {
      try {
        setIsLoading(true)
        const data = await MAListService.getMAList()
        setMAOpportunities(data)
        setFilteredOpportunities(data.slice(0, 6)) // 홈페이지에서는 6개만 표시
      } catch (error) {
        console.error("M&A 기회 로드 오류:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMAOpportunities()
  }, [])

  // 필터링 적용
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filters = {
          subject: activeFilters.subject,
          category: activeFilters.category,
          industry: activeFilters.industry,
          region: activeFilters.region,
        }

        const filteredData = await MAListService.getMAList(filters)
        setFilteredOpportunities(filteredData.slice(0, 6)) // 홈페이지에서는 6개만 표시
      } catch (error) {
        console.error("필터링 오류:", error)
      }
    }

    applyFilters()
  }, [activeFilters, activeClassificationTab])

  // 필터 변경 핸들러
  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // 분류 탭 변경 시 필터 초기화
  const handleClassificationTabChange = (tab: string) => {
    setActiveClassificationTab(tab)
    setActiveFilters({
      subject: "all",
      category: "all",
      industry: "all",
      region: "all",
    })
  }

  // 카테고리 배지 색상 결정
  const getCategoryBadgeColor = (industry: string) => {
    switch (industry) {
      case "IT/소프트웨어":
        return "bg-blue-100 text-blue-800"
      case "제조업":
        return "bg-green-100 text-green-800"
      case "헬스케어":
        return "bg-purple-100 text-purple-800"
      case "F&B":
        return "bg-yellow-100 text-yellow-800"
      case "뷰티":
        return "bg-pink-100 text-pink-800"
      case "환경/에너지":
        return "bg-emerald-100 text-emerald-800"
      case "물류/운송":
        return "bg-indigo-100 text-indigo-800"
      case "농업/식품":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 justify-center py-5 pt-16">
        <div className="layout-content-container flex flex-col w-full flex-1">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-start justify-start px-4 pt-16 pb-10 @[480px]:px-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("/pwc_background.png")',
                }}
              >
                <div className="flex flex-col gap-2 text-left max-w-4xl ml-16">
                  <h1 className="text-gray-800 text-3xl font-bold px-10 leading-tight tracking-[-0.02em] @[480px]:text-4xl @[480px]:font-bold @[480px]:leading-tight @[480px]:tracking-[-0.02em]">
                    국내 M&A 실적 No.1
                    <br />
                    삼일 PwC 중소형 온라인 M&A 플랫폼
                  </h1>

                  <p className="text-gray-650 text-base px-12 leading-relaxed @[480px]:text-base @[480px]: @[480px]:leading-relaxed">
                    삼일 PwC는 중소·벤처 맞춤형 M&A 서비스를 One-stop으로 제공합니다.
                  </p>

                  <div className="relative grid grid-cols-2 gap-2 w-full px-10 max-w-[450px] mt-4">
                    <Link
                      href="/consultation"
                      className="flex min-h-[56px] cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 py-3 bg-[#FF5722] text-white text-sm font-semibold leading-normal hover:bg-[#E64A19] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="text-center">매각 문의</span>
                    </Link>
                    <Link
                      href="/acquisition"
                      className="flex min-h-[56px] cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 py-3 bg-[#FF5722] text-white text-sm font-semibold leading-normal hover:bg-[#E64A19] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="text-center">인수 문의</span>
                    </Link>
                    <Link
                      href="/valuation"
                      className="flex min-h-[56px] cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 py-3 bg-white/90 text-[#1c150d] text-sm font-semibold leading-normal hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="text-center">가치산정 시뮬레이션</span>
                    </Link>
                    <Link
                      href="/ma-list"
                      className="flex min-h-[56px] cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 py-3 bg-white/90 text-[#1c150d] text-sm font-semibold leading-normal hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="text-center">매물리스트</span>
                    </Link>

                    {/* 중앙 동그라미 객체 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-4 border-white/80 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="text-white text-xs font-bold leading-tight">
                            M&A
                            <br />
                            서비스
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 매각 관심 사용자를 위한 기능 강조 섹션 */}
          <div className="bg-gray-100 py-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">매각을 희망하는 경영자님</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  삼일 PwC가 제공하는 시뮬레이션 서비스를 통해 지금 당장 귀사의 적정 가치와 잠재인수자 리스트를
                  확인해보세요
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* 가치산정 시뮬레이션 카드 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-yellow-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">가치산정 시뮬레이션</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    AI 기반 알고리즘으로 귀하의 기업 가치를 정확하게 산정하고, 시장 동향을 반영한 예상 매각가를
                    확인해보세요.
                  </p>
                  <ul className="text-sm text-gray-500 mb-8 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      실시간 시장 데이터 반영
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      업종별 맞춤 분석
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      무료 초기 진단
                    </li>
                  </ul>
                  <Link
                    href="/valuation"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    가치산정 시작하기
                  </Link>
                </div>

                {/* 잠재 인수인 찾기 카드 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-orange-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">잠재 인수인 찾기 시뮬레이션</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    삼일회계법인의 광범위한 네트워크를 통해 귀하의 기업에 최적화된 잠재 인수인을 매칭해드립니다.
                  </p>
                  <ul className="text-sm text-gray-500 mb-8 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      전략적 투자자 매칭
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      글로벌 네트워크 활용
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      기밀 유지 보장
                    </li>
                  </ul>
                  <Link
                    href="/find-investors"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    인수인 매칭 신청
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 투자 관심 사용자를 위한 M&A 기회 섹션 */}
          <div className="max-w-[1200px] mx-auto w-full mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">M&A 리스트</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                올 한해 삼일 PwC 플랫폼에서 성사된 M&A 건수 및 거래규모는 총 XX건 , XX 억원입니다.
              </p>
            </div>

            {/* 분류 메뉴 탭 */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto">
                <button
                  onClick={() => handleClassificationTabChange("subject")}
                  className={`px-6 py-3 rounded-md font-semibold shadow-sm whitespace-nowrap transition-all duration-200 ${
                    activeClassificationTab === "subject"
                      ? "bg-white text-gray-800 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  주체별 분류
                </button>
                <button
                  onClick={() => handleClassificationTabChange("category")}
                  className={`px-6 py-3 rounded-md font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeClassificationTab === "category"
                      ? "bg-white text-gray-800 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  카테고리별 분류
                </button>
                <button
                  onClick={() => handleClassificationTabChange("industry")}
                  className={`px-6 py-3 rounded-md font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeClassificationTab === "industry"
                      ? "bg-white text-gray-800 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  업종별 분류
                </button>
                <button
                  onClick={() => handleClassificationTabChange("region")}
                  className={`px-6 py-3 rounded-md font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeClassificationTab === "region"
                      ? "bg-white text-gray-800 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  지역별 분류
                </button>
              </div>
            </div>

            {/* 필터 태그 */}
            <div className="flex gap-3 p-3 flex-wrap justify-center mb-8">
              {activeClassificationTab === "subject" &&
                FILTER_OPTIONS.subject.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("subject", option.value)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 cursor-pointer transition-colors ${
                      activeFilters.subject === option.value
                        ? "bg-orange-500 text-white"
                        : "bg-[#f4eee7] text-[#1c150d] hover:bg-orange-100"
                    }`}
                  >
                    <p className="text-sm font-medium leading-normal">{option.label}</p>
                  </button>
                ))}

              {activeClassificationTab === "category" &&
                FILTER_OPTIONS.category.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("category", option.value)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 cursor-pointer transition-colors ${
                      activeFilters.category === option.value
                        ? "bg-orange-500 text-white"
                        : "bg-[#f4eee7] text-[#1c150d] hover:bg-orange-100"
                    }`}
                  >
                    <p className="text-sm font-medium leading-normal">{option.label}</p>
                  </button>
                ))}

              {activeClassificationTab === "industry" &&
                FILTER_OPTIONS.industry.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("industry", option.value)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 cursor-pointer transition-colors ${
                      activeFilters.industry === option.value
                        ? "bg-orange-500 text-white"
                        : "bg-[#f4eee7] text-[#1c150d] hover:bg-orange-100"
                    }`}
                  >
                    <p className="text-sm font-medium leading-normal">{option.label}</p>
                  </button>
                ))}

              {activeClassificationTab === "region" &&
                FILTER_OPTIONS.region.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("region", option.value)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 cursor-pointer transition-colors ${
                      activeFilters.region === option.value
                        ? "bg-orange-500 text-white"
                        : "bg-[#f4eee7] text-[#1c150d] hover:bg-orange-100"
                    }`}
                  >
                    <p className="text-sm font-medium leading-normal">{option.label}</p>
                  </button>
                ))}
            </div>

            {/* M&A 기회 리스트 */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {filteredOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div
                      className="w-full h-48 bg-center bg-cover"
                      style={{
                        backgroundImage: `url("${opportunity.image_url}")`,
                      }}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getCategoryBadgeColor(opportunity.industry)}`}
                        >
                          {opportunity.industry}
                        </span>
                        <span className="text-orange-600 font-bold text-lg">{opportunity.deal_size}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{opportunity.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{opportunity.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <span className="text-gray-500 text-sm">{opportunity.location}</span>
                        </div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                          상세보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 더보기 버튼 */}
            <div className="text-center mt-8 mb-16">
              <Link
                href="/ma-list"
                className="bg-white border-2 border-orange-500 text-orange-500 font-semibold py-3 px-8 rounded-full hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                더 많은 M&A 기회 보기
              </Link>
            </div>
          </div>

          {/* 나머지 섹션들은 동일하게 유지... */}
          {/* 삼일회계법인의 차별화 포인트 섹션 */}
          <div className="bg-gray-50 py-20 mt-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-16">
                {/* 왼쪽: PwC 로고 이미지 + 텍스트 오버레이 */}
                <div className="space-y-8 flex flex-col h-full">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">삼일회계법인의 차별화 포인트</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      M&A 시장을 선도하는 삼일회계법인만의 독보적인 경쟁력을 확인하세요
                    </p>
                  </div>

                  {/* PwC 로고 이미지 - 텍스트 오버레이 추가 */}
                  <div className="relative">
                    <div
                      className="rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        backgroundImage: 'url("/pwc-logo-new.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "400px",
                      }}
                    >
                      {/* 텍스트 오버레이 추가 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-2xl font-bold mb-2 leading-tight">최고의 M&A전문가와</h3>
                        <h3 className="text-2xl font-bold mb-2 leading-tight">최대규모의 국내 및 글로벌 네트워크</h3>
                      </div>
                    </div>
                  </div>

                  {/* M&A 플랫폼팀 코멘트를 왼쪽으로 이동 */}
                  <div className="bg-white rounded-2xl p-8 border-l-4 border-orange-500 shadow-lg flex-1 flex flex-col justify-end">
                    <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                      "삼일회계법인의 M&A 플랫폼은 단순한 매칭을 넘어 거래의 전 과정을 함께하는 파트너입니다. 우리의
                      전문성과 글로벌 네트워크가 여러분의 성공적인 딜을 보장합니다."
                    </blockquote>
                    <cite className="text-gray-800 font-semibold text-base">- 삼일회계법인 M&A 플랫폼팀</cite>
                  </div>
                </div>

                {/* 오른쪽: 강점 카드들 */}
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-8">
                    {/* M&A 성사실적 1위 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-3">
                            <h3 className="text-xl font-bold text-gray-800">M&A 성사실적 1위</h3>
                            <span className="text-orange-600 font-semibold">500+ 성공적인 M&A 거래</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            삼일 PwC는 2024년 M&A 재무자문 거래규모 및 거래건수 리그테이블 1위를 차지한 국내 M&A 서비스
                            부문을 리드하는 독보적인 M&A 자문사입니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 압도적인 M&A 정보 네트워크 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-3">
                            <h3 className="text-xl font-bold text-gray-800">압도적인 M&A 정보 네트워크</h3>
                            <span className="text-orange-600 font-semibold">글로벌 네트워크 연결</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            삼일회계법인은 다양한 협력사와의 파트너쉽을 맺어 압도적인 M&A 네트워크에 기반한 국내 ���대
                            M&A 거래 정보망과 매물 리스트를 보유하고 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* M&A 원스톱 서비스 */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-3">
                            <h3 className="text-xl font-bold text-gray-800">M&A 원스톱 서비스</h3>
                            <span className="text-orange-600 font-semibold">100% 통합 서비스 제공</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            M&A를 비롯한 다방면의 최고 전문가로 구성된 삼일회계법인은 M&A 준비 및 실행에서 부터 관련
                            세무 및 법률 서비스까지 M&A 와 관련된 서비스를 One-stop으로 제공합니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 보안 및 신뢰할 수 있는 M&A 구조 - 하단 정렬을 위해 별도 배치 */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-800">보안 및 신뢰할 수 있는 M&A 구조</h3>
                          <span className="text-orange-600 font-semibold">20+ 산업 분야 전문성</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          M&A 마케팅 과정에서 우려되는 비밀유지 및 보안과 관련하여 삼일회계법인 내 보안유지 정책를
                          토대로 최고 수준의 보안에 기반하여 신뢰할 수 있는 M&A 서비스를 제공합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 서비스 기능 요약 섹션 */}
          <div className="bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">서비스 기능 요약</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  삼일 PwC는 M&A 전 과정에서 필요한 모든 서비스를 원스톱으로 제공합니다.
                </p>
              </div>

              {/* 4개 서비스 카드 그리드 - PwC 브랜드 컬러로 통일 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* 매각 지원 서비스 */}
                <div className="flex flex-col h-full bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-200">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    📌 매각 지원 서비스
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>매각 전략 수립</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>마케팅 및 프로세스 지원</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>협상 및 클로징 지원</span>
                    </li>
                  </ul>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Link
                      href="/consultation"
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    >
                      서비스 바로가기
                    </Link>
                  </div>
                </div>

                {/* 인수 지원 서비스 */}
                <div className="flex flex-col h-full bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-200">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    📌 인수 지원 서비스
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>매도 회사 탐색 및 인수 전략</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>수립자금 연계 및 인수 후 통합</span>
                    </li>
                  </ul>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Link
                      href="/acquisition"
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    >
                      서비스 바로가기
                    </Link>
                  </div>
                </div>

                {/* 투자 유치 지원 서비스 */}
                <div className="flex flex-col h-full bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-200">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    📌 투자 유치 지원 서비스
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>VC, PE 등 투자자 연계</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>IR지원 및 투자유치 전략 수립</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>프로세스 지원 및 계약조건 검토</span>
                    </li>
                  </ul>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Link
                      href="/find-investors"
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    >
                      서비스 바로가기
                    </Link>
                  </div>
                </div>

                {/* 실사 및 밸류에이션 */}
                <div className="flex flex-col h-full bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-200">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    📌 실사 및 밸류에이션
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>인수 과정 M&A 실사 및 가치 평가</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>재무보고 목적의 기업가치 평가</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>법규에 따른 기업가치 평가</span>
                    </li>
                  </ul>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Link
                      href="/valuation"
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    >
                      서비스 바로가기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 업종별 특화 M&A 서비스 섹션 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
            <div className="max-w-[1200px] mx-auto px-6">
              {/* 상단: 제목과 이미지 */}
              <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                {/* 왼쪽: 제목 + 설명 */}
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    업종별로 특화된
                    <br />
                    <span className="text-orange-600">M&A 서비스</span>를 제공합니다
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    삼일PwC는 다양한 산업과 자문 분야에서 쌓아온 풍부한 경험과 깊이 있는 전문성을 바탕으로, 고객이
                    직면한 복잡한 과제에 대한 맞춤형 해법을 제시합니다. 이를 통해 고객의 비즈니스 가치를 극대화하고,
                    지속 가능한 성장을 위한 최적의 자문 서비스를 제공합니다.
                  </p>
                </div>

                {/* 오른쪽: 이미지 */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/industry-module.jpg"
                      alt="업종별 특화된 M&A 서비스"
                      className="w-full h-auto object-cover"
                    />
                    {/* 오버레이 그라데이션 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent"></div>
                  </div>

                  {/* 플로팅 카드 */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-orange-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">20+</div>
                        <div className="text-sm text-gray-600">전문 업종 커버</div>
                      </div>
                    </div>
                  </div>

                  {/* 플로팅 카드 2 */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-xl border border-orange-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">500+</div>
                        <div className="text-sm text-gray-600">성공 딜 경험</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단: 업종 리스트 - 4/2 그리드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    name: "반도체/2차전지",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "IT/AI",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "뷰티",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "헬스케어",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "전력인프라",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "환경",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "F&B",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v15.75"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "기타",
                    icon: (
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    ),
                  },
                ].map((industry) => (
                  <div
                    key={industry.name}
                    className="bg-white rounded-xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-300 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                        {industry.icon}
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">{industry.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA 버튼 */}
              <div className="text-center">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  업종별 서비스 자세히 보기
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* M&A 세미나 섹션 */}
          <div className="bg-white py-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  삼일 PwC에서 개최하는 M&A 세미나 참여를 신청하세요
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  M&A 전문가들이 직접 전하는 실무 노하우와 최신 트렌드를 만나보세요
                </p>
              </div>

              {/* 세미나 카드 그리드 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* 세미나 카드 1 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{
                      backgroundImage: 'url("/images/seminar-ma-strategy.png")',
                    }}
                  ></div>
                  <div className="p-6">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                      접수중
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">중소기업 M&A 성공전략</h3>
                    <p className="text-gray-600 text-sm mb-4">중소기업 경영자를 ���한 M&A 기초부터 실전까지</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 2024.02.15</span>
                      <span>🕐 14:00-17:00</span>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>

                {/* 세미나 카드 2 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{
                      backgroundImage: 'url("/images/seminar-valuation.png")',
                    }}
                  ></div>
                  <div className="p-6">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                      접수중
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">기업가치 평가의 이해</h3>
                    <p className="text-gray-600 text-sm mb-4">정확한 기업가치 산정을 위한 핵심 방법론</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 2024.02.22</span>
                      <span>🕐 14:00-17:00</span>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>

                {/* 세미나 카드 3 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{
                      backgroundImage: 'url("/images/seminar-due-diligence.png")',
                    }}
                  ></div>
                  <div className="p-6">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                      접수중
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">M&A 실사의 핵심포인트</h3>
                    <p className="text-gray-600 text-sm mb-4">성공적인 M&A를 위한 실사 체크리스트</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 2024.03.05</span>
                      <span>🕐 14:00-17:00</span>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>

                {/* 세미나 카드 4 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{
                      backgroundImage: 'url("/images/seminar-investment.png")',
                    }}
                  ></div>
                  <div className="p-6">
                    <div className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                      지원완료
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">투자유치 전략세미나</h3>
                    <p className="text-gray-600 text-sm mb-4">스타트업을 위한 효과적인 투자유치 방법</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 2024.03.12</span>
                      <span>🕐 14:00-17:00</span>
                    </div>
                    <button className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed">
                      지원완료
                    </button>
                  </div>
                </div>

                {/* 세미나 카드 5 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{
                      backgroundImage: 'url("/images/seminar-global-ma.png")',
                    }}
                  ></div>
                  <div className="p-6">
                    <div className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                      지원완료
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">해외진출 M&A 전략</h3>
                    <p className="text-gray-600 text-sm mb-4">글로벌 시장 진출을 위한 M&A 활용법</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 2024.03.19</span>
                      <span>🕐 14:00-17:00</span>
                    </div>
                    <button className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed">
                      지원완료
                    </button>
                  </div>
                </div>

                {/* 세미나 카드 6 */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{
                      backgroundImage: 'url("/images/seminar-tax-advisory.png")',
                    }}
                  ></div>
                  <div className="p-6">
                    <div className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                      지원완료
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">M&A 세무 실무</h3>
                    <p className="text-gray-600 text-sm mb-4">M&A 과정에서 알아야 할 세무 이슈들</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>📅 2024.03.26</span>
                      <span>🕐 14:00-17:00</span>
                    </div>
                    <button className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed">
                      지원완료
                    </button>
                  </div>
                </div>
              </div>

              {/* 전체 세미나 목록 버튼 */}
              <div className="text-center">
                <button className="bg-white border-2 border-orange-500 text-orange-500 font-semibold py-3 px-8 rounded-full hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow-md">
                  전체 세미나 목록
                </button>
              </div>
            </div>
          </div>

          {/* FAQ 섹션 */}
          <div className="bg-gray-50 py-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">자주 묻는 질문</h2>
                <p className="text-xl text-gray-600 mb-8">삼일회계법인 M&A 플랫폼에 대해 궁금한 점을 확인해보세요</p>

                {/* 검색 바 */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="궁금한 내용을 검색해보세요..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 탭 네비게이션 */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeTab === key
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    {category.icon}
                    {category.title}
                  </button>
                ))}
              </div>

              {/* FAQ 아코디언 */}
              <div className="space-y-4">
                {(searchQuery ? Object.entries(filteredFaqs) : [[activeTab, faqCategories[activeTab]]]).map(
                  ([categoryKey, category]) => (
                    <div key={categoryKey}>
                      {searchQuery && (
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          {category.icon}
                          {category.title}
                        </h3>
                      )}
                      {category.faqs.map((faq, index) => {
                        const accordionId = `${categoryKey}-${index}`
                        return (
                          <div
                            key={accordionId}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                          >
                            <button
                              onClick={() => toggleAccordion(accordionId)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                            >
                              <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                              <svg
                                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                                  openAccordion === accordionId ? "transform rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {openAccordion === accordionId && (
                              <div className="px-6 pb-4">
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ),
                )}
              </div>

              {/* 추가 지원 섹션 */}
              <div className="mt-16 bg-white rounded-2xl p-8 border border-orange-100">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">더 궁금한 점이 있으신가요?</h3>
                  <p className="text-gray-600 mb-6">전문 상담사가 직접 답변해드립니다. 언제든지 문의해주세요.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      전화 상담 신청
                    </button>
                    <button className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      온라인 문의
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
