"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"
import KoreaMap from "@/app/components/KoreaMap"
import MACaseCard from "@/app/components/MACaseCard"
import { type MACaseItem, type MACaseFilters, MA_CASE_FILTER_OPTIONS } from "@/lib/types/ma-cases"
import Header from "../components/Header"
import Link from "next/link"

// 샘플 데이터
const sampleCases: MACaseItem[] = [
  {
    id: "1",
    project_name: "Project Alpha",
    project_number: "01",
    target_company: "관련 이미지",
    industry: "IT/소프트웨어",
    region: "수도권", // 서울 -> 수도권
    deal_structure: "구주 매각",
    deal_size: "100% Equity 기준 2,000~2,500억",
    equity_percentage: "100%",
    investment_highlights: [
      "국내 최대 규모의 클라우드 서비스 제공업체",
      "연평균 30% 이상의 매출 성장률 기록",
      "글로벌 진출을 위한 전략적 파트너십 구축",
    ],
    description: "클라우드 서비스 분야의 선도기업 인수",
    completion_date: "2024-03-15",
    advisor: "삼일 PwC",
    created_at: "2024-03-15",
  },
  {
    id: "2",
    project_name: "Project Beta",
    project_number: "02",
    target_company: "바이오텍 솔루션",
    industry: "헬스케어",
    region: "수도권", // 경기 -> 수도권
    deal_structure: "신주 인수",
    deal_size: "60% Equity 기준 1,500억",
    equity_percentage: "60%",
    investment_highlights: [
      "혁신적인 바이오 기술 보유",
      "FDA 승인 완료된 신약 파이프라인",
      "아시아 시장 진출 기반 확보",
    ],
    description: "바이오 기술 기반 헬스케어 기업 투자",
    completion_date: "2024-02-20",
    advisor: "삼일 PwC",
    created_at: "2024-02-20",
  },
  {
    id: "3",
    project_name: "Project Gamma",
    project_number: "03",
    target_company: "그린에너지 코퍼레이션",
    industry: "환경/에너지",
    region: "경상", // 부산 -> 경상
    deal_structure: "자산 매각",
    deal_size: "전체 자산 기준 800억",
    equity_percentage: "100%",
    investment_highlights: [
      "재생에너지 발전 시설 운영",
      "정부 정책 지원으로 안정적 수익 구조",
      "ESG 투자 트렌드에 부합하는 사업 모델",
    ],
    description: "재생에너지 발전 사업 매각",
    completion_date: "2024-01-10",
    advisor: "파트너사",
    created_at: "2024-01-10",
  },
  {
    id: "4",
    project_name: "Project Delta",
    project_number: "04",
    target_company: "스마트 로지스틱스",
    industry: "물류/운송",
    region: "수도권", // 인천 -> 수도권
    deal_structure: "구주 매각",
    deal_size: "80% Equity 기준 1,200억",
    equity_percentage: "80%",
    investment_highlights: [
      "AI 기반 물류 최적화 시스템 보유",
      "전국 물류 네트워크 구축 완료",
      "이커머스 급성장에 따른 수혜 기대",
    ],
    description: "스마트 물류 솔루션 기업 인수",
    completion_date: "2024-04-05",
    advisor: "삼일 PwC",
    created_at: "2024-04-05",
  },
  {
    id: "5",
    project_name: "Project Echo",
    project_number: "05",
    target_company: "푸드테크 이노베이션",
    industry: "식품/음료",
    region: "경상", // 대구 -> 경상
    deal_structure: "신주 인수",
    deal_size: "40% Equity 기준 600억",
    equity_percentage: "40%",
    investment_highlights: ["대체육 기술 특허 보유", "글로벌 식품 트렌드 선도", "지속가능한 식품 생산 시스템"],
    description: "푸드테크 스타트업 투자",
    completion_date: "2024-05-12",
    advisor: "삼일 PwC",
    created_at: "2024-05-12",
  },
  {
    id: "6",
    project_name: "Project Foxtrot",
    project_number: "06",
    target_company: "디지털 헬스케어",
    industry: "헬스케어",
    region: "전라", // 광주 -> 전라
    deal_structure: "자산 매각",
    deal_size: "전체 자산 기준 900억",
    equity_percentage: "100%",
    investment_highlights: ["원격 의료 플랫폼 운영", "의료진 네트워크 전국 확산", "고령화 사회 대응 솔루션"],
    description: "디지털 헬스케어 플랫폼 매각",
    completion_date: "2024-06-20",
    advisor: "파트너사",
    created_at: "2024-06-20",
  },
]

export default function MACasesPage() {
  const [cases, setCases] = useState<MACaseItem[]>(sampleCases)
  const [filteredCases, setFilteredCases] = useState<MACaseItem[]>(sampleCases)
  const [filters, setFilters] = useState<MACaseFilters>({
    industry: "all",
    region: "all",
    search: "",
  })
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  useEffect(() => {
    let filtered = cases

    if (filters.industry && filters.industry !== "all") {
      filtered = filtered.filter((c) => c.industry === filters.industry)
    }

    if (filters.region && filters.region !== "all") {
      filtered = filtered.filter((c) => c.region === filters.region)
    }

    if (filters.search) {
      filtered = filtered.filter(
        (c) =>
          c.target_company.toLowerCase().includes(filters.search!.toLowerCase()) ||
          c.description.toLowerCase().includes(filters.search!.toLowerCase()),
      )
    }

    setFilteredCases(filtered)
  }, [filters, cases])

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region)
    setFilters((prev) => ({ ...prev, region: region === selectedRegion ? "all" : region }))
  }

  const handleFilterChange = (key: keyof MACaseFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    if (key === "region") {
      setSelectedRegion(value)
    }
  }

  const resetFilters = () => {
    setFilters({ industry: "all", region: "all", search: "" })
    setSelectedRegion("all")
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
            <span className="text-orange-600 font-medium">M&A Cases</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-5xl font-light text-gray-900 mb-6">M&A Cases</h1>
            <div className="w-24 h-1 bg-orange-500 mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              삼일회계법인의 다양한 M&A 성공 사례를 확인해보세요. 업종별, 지역별로 필터링하여 관심 있는 사례를 찾아보실
              수 있습니다.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Filter Controls */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">업종</label>
                    <Select
                      value={filters.industry || "all"}
                      onValueChange={(value) => handleFilterChange("industry", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-orange-500">
                        <SelectValue placeholder="업종 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {MA_CASE_FILTER_OPTIONS.industry.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">지역</label>
                    <Select
                      value={filters.region || "all"}
                      onValueChange={(value) => handleFilterChange("region", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-orange-500">
                        <SelectValue placeholder="지역 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {MA_CASE_FILTER_OPTIONS.region.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">검색</label>
                    <Input
                      placeholder="회사명 검색"
                      value={filters.search || ""}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                      className="border-gray-300 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    총 <span className="font-semibold text-orange-600">{filteredCases.length}</span>개의 사례
                  </p>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    size="sm"
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    초기화
                  </Button>
                </div>
              </div>

              {/* Korea Map */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">지역별 선택</label>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <KoreaMap selectedRegion={selectedRegion} onRegionClick={handleRegionClick} />
                </div>
              </div>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => <MACaseCard key={caseItem.id} case={caseItem} />)
            ) : (
              <div className="col-span-full">
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-6">
                    <Building2 className="w-20 h-20 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">검색 결과가 없습니다</h3>
                  <p className="text-gray-500 mb-6 text-lg">다른 조건으로 검색해보시거나 필터를 초기화해보세요</p>
                  <Button
                    onClick={resetFilters}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                  >
                    필터 초기화
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">M&A 전문가와 상담하세요</h2>
            <p className="text-xl mb-8 opacity-90">귀하의 M&A 목표에 맞는 맞춤형 솔루션을 제공해드립니다</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/acquisition"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                인수 상담 신청
              </a>
              <a
                href="/consultation"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200"
              >
                일반 상담 신청
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
