"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
// import Footer from "../components/Footer" // Removed Footer import
import { MAListService } from "../../lib/services/ma-list-service"
import { type MAListItem, type MAListFilters, FILTER_OPTIONS } from "../../lib/types/ma-list"
import Link from "next/link"

export default function MAListPage() {
  const [listings, setListings] = useState<MAListItem[]>([])
  const [filteredListings, setFilteredListings] = useState<MAListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<MAListFilters>({
    subject: "all",
    category: "all",
    industry: "all",
    region: "all",
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // M&A 목록 조회
  const fetchMAList = async () => {
    try {
      setIsLoading(true)
      const data = await MAListService.getMAList(filters)
      setListings(data)

      // 검색어 필터링
      if (searchTerm) {
        const searchFiltered = data.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.industry.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredListings(searchFiltered)
      } else {
        setFilteredListings(data)
      }

      setError(null)
    } catch (error) {
      console.error("M&A 목록 조회 오류:", error)
      setError("데이터를 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMAList()
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 리셋
  }, [filters])

  useEffect(() => {
    // 검색어 변경 시 필터링
    if (searchTerm) {
      const searchFiltered = listings.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.industry.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredListings(searchFiltered)
    } else {
      setFilteredListings(listings)
    }
    setCurrentPage(1) // 검색어 변경 시 첫 페이지로 리셋
  }, [searchTerm, listings])

  // 필터 변경 핸들러
  const handleFilterChange = (filterType: keyof MAListFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      subject: "all",
      category: "all",
      industry: "all",
      region: "all",
    })
    setSearchTerm("")
  }

  // 거래 유형을 한국어로 변환
  const getDealTypeLabel = (dealType: string) => {
    switch (dealType) {
      case "acquisition":
        return "인수"
      case "merger":
        return "합병"
      case "divestiture":
        return "매각"
      case "investment":
        return "투자"
      default:
        return dealType
    }
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

  const totalListings = listings.length
  const publicListings = listings.filter((l) => l.status === "active").length

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">매물 정보를 불러오는 중...</p>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">데이터 로드 오류</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchMAList}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    )
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
            <span className="text-orange-600 font-medium">M&A 매물 리스트</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-light text-gray-900 mb-6">M&A 매물 리스트</h1>
            <div className="w-24 h-1 bg-orange-500 mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
              삼일회계법인이 엄선한 우수한 M&A 매물들을 확인해보세요. 각 매물은 철저한 검증을 거쳐 등록되었습니다.
            </p>

            {/* Statistics */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalListings}</div>
                    <div className="text-gray-600 text-sm">전체 수임 매물</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{publicListings}</div>
                    <div className="text-gray-600 text-sm">활성 매물</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
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
              <input
                type="text"
                placeholder="매물 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">필터</h3>

              <div className="grid md:grid-cols-4 gap-4">
                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">주체별</label>
                  <select
                    value={filters.subject}
                    onChange={(e) => handleFilterChange("subject", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {FILTER_OPTIONS.subject.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리별</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {FILTER_OPTIONS.category.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">업종별</label>
                  <select
                    value={filters.industry}
                    onChange={(e) => handleFilterChange("industry", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {FILTER_OPTIONS.industry.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">지역별</label>
                  <select
                    value={filters.region}
                    onChange={(e) => handleFilterChange("region", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {FILTER_OPTIONS.region.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reset Filters */}
              <div className="mt-4">
                <button onClick={resetFilters} className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  필터 초기화
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            {/* Pagination calculations */}
            {(() => {
              const totalPages = Math.ceil(filteredListings.length / itemsPerPage)
              const startIndex = (currentPage - 1) * itemsPerPage
              const endIndex = startIndex + itemsPerPage

              // Page change handler
              const handlePageChange = (page: number) => {
                setCurrentPage(page)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }

              const currentListings = filteredListings.slice(startIndex, endIndex)

              return (
                <>
                  <p className="text-gray-600">
                    총 <span className="font-semibold text-gray-900">{filteredListings.length}</span>개의 매물 중{" "}
                    <span className="font-semibold text-gray-900">
                      {startIndex + 1}-{Math.min(endIndex, filteredListings.length)}
                    </span>
                    개 표시
                    {totalPages > 1 && (
                      <span className="ml-2 text-sm">
                        (페이지 {currentPage} / {totalPages})
                      </span>
                    )}
                  </p>

                  {/* Listings Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentListings.map((listing, index) => (
                      <div
                        key={listing.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                            <h3 className="text-sm font-bold text-gray-800">
                              Project {String(startIndex + index + 1).padStart(2, "0")}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded">
                              삼일 PwC
                            </span>
                            <span className="bg-gray-600 text-white px-2 py-1 text-xs font-medium rounded">
                              No. {String(startIndex + index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Image */}
                        <div
                          className="h-48 bg-center bg-cover bg-gray-100"
                          style={{
                            backgroundImage: `url("${listing.image_url}")`,
                          }}
                        ></div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          {/* Target Overview Header */}
                          <div className="bg-amber-500 text-amber-900 px-3 py-1.5 text-xs font-semibold mb-3 rounded">
                            Target Overview
                          </div>

                          {/* Target Details */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-start">
                              <span className="w-16 text-xs font-medium text-gray-600 flex-shrink-0">업종</span>
                              <span className="text-xs text-gray-900 font-medium">• {listing.industry}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="w-16 text-xs font-medium text-gray-600 flex-shrink-0">지역</span>
                              <span className="text-xs text-gray-900">• {listing.location}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="w-16 text-xs font-medium text-gray-600 flex-shrink-0">Deal 구조</span>
                              <span className="text-xs text-gray-900">• {listing.deal_structure || "구주 매각"}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="w-16 text-xs font-medium text-gray-600 flex-shrink-0">Deal Size</span>
                              <span className="text-xs text-orange-600 font-semibold">• {listing.deal_size}</span>
                            </div>
                          </div>

                          {/* Investment Highlights Header */}
                          <div className="bg-amber-500 text-amber-900 px-3 py-1.5 text-xs font-semibold mb-3 rounded">
                            Investment Highlights
                          </div>

                          {/* Investment Highlights Content */}
                          <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-900 font-semibold line-clamp-2">{listing.title}</p>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{listing.description}</p>
                          </div>

                          {/* Status and Company Info */}
                          <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  listing.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {listing.status === "active" ? "활성" : "비활성"}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {getDealTypeLabel(listing.deal_type)}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-sm hover:shadow-md mt-auto">
                            상세보기
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {currentListings.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {listings.length === 0 ? "등록된 매물이 없습니다" : "검색 결과가 없습니다"}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {listings.length === 0
                          ? "관리자가 매물을 등록하면 여기에 표시됩니다."
                          : "다른 조건으로 검색해보시거나 필터를 초기화해보세요."}
                      </p>
                      {listings.length > 0 && (
                        <button
                          onClick={resetFilters}
                          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                        >
                          필터 초기화
                        </button>
                      )}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          이전
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg ${
                              currentPage === page
                                ? "bg-orange-500 text-white"
                                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>

          {/* Contact CTA */}
          <div className="mt-20 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">관심 있는 매물이 있으신가요?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              전문 상담사가 매물에 대한 자세한 정보를 제공해드리며, 투자 검토부터 협상까지 전 과정을 지원해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                전문가 상담 ��청
              </button>
              <button className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                매물 등록 문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
