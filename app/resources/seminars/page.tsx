"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "../../components/Header"

export default function SeminarsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const categories = [
    { id: "all", name: "전체" },
    { id: "valuation", name: "기업가치평가" },
    { id: "due-diligence", name: "실사" },
    { id: "ma-strategy", name: "M&A 전략" },
    { id: "tax-advisory", name: "세무자문" },
    { id: "global-ma", name: "글로벌 M&A" },
    { id: "investment", name: "투자유치" },
  ]

  const statuses = [
    { id: "all", name: "전체" },
    { id: "upcoming", name: "예정" },
    { id: "ongoing", name: "진행중" },
    { id: "completed", name: "완료" },
  ]

  const seminars = [
    {
      id: 1,
      title: "2024 기업가치평가 실무 세미나",
      subtitle: "DCF 모델링과 Comparable Analysis 심화과정",
      category: "valuation",
      status: "upcoming",
      date: "2024.02.15",
      time: "14:00 - 17:00",
      location: "삼일회계법인 본사",
      instructor: "김영수 파트너",
      participants: 45,
      maxParticipants: 50,
      image: "/images/seminar-valuation.png",
      description:
        "기업가치평가의 핵심 방법론인 DCF 모델링과 Comparable Analysis에 대한 실무 중심의 심화 교육을 제공합니다.",
      agenda: [
        "DCF 모델링 기초와 고급 기법",
        "Comparable Analysis 실무 적용",
        "밸류에이션 리포트 작성법",
        "Q&A 및 실습",
      ],
    },
    {
      id: 2,
      title: "M&A 실사 프로세스 워크샵",
      subtitle: "Financial DD와 Tax DD 실무 가이드",
      category: "due-diligence",
      status: "ongoing",
      date: "2024.02.08",
      time: "09:00 - 18:00",
      location: "온라인 (Zoom)",
      instructor: "박민정 파트너",
      participants: 32,
      maxParticipants: 40,
      image: "/images/seminar-due-diligence.png",
      description: "M&A 거래에서 핵심적인 실사 프로세스에 대한 종합적인 이해와 실무 노하우를 제공합니다.",
      agenda: ["실사의 목적과 범위 설정", "Financial DD 체크리스트", "Tax DD 주요 이슈", "실사 보고서 작성 실습"],
    },
    {
      id: 3,
      title: "글로벌 M&A 트렌드 세미나",
      subtitle: "2024년 해외 M&A 시장 전망과 기회",
      category: "global-ma",
      status: "upcoming",
      date: "2024.02.22",
      time: "15:00 - 17:30",
      location: "삼일회계법인 본사",
      instructor: "이준호 파트너",
      participants: 28,
      maxParticipants: 60,
      image: "/images/seminar-global-ma.png",
      description: "글로벌 M&A 시장의 최신 동향과 한국 기업의 해외 진출 전략에 대해 논의합니다.",
      agenda: [
        "2024년 글로벌 M&A 시장 전망",
        "지역별 M&A 동향 분석",
        "한국 기업의 해외 M&A 사례",
        "Cross-border M&A 실무 이슈",
      ],
    },
    {
      id: 4,
      title: "M&A 전략 수립 마스터클래스",
      subtitle: "전략적 인수합병을 위한 의사결정 프레임워크",
      category: "ma-strategy",
      status: "completed",
      date: "2024.01.25",
      time: "13:00 - 18:00",
      location: "삼일회계법인 본사",
      instructor: "최성민 파트너",
      participants: 55,
      maxParticipants: 55,
      image: "/images/seminar-ma-strategy.png",
      description: "성공적인 M&A를 위한 전략 수립부터 실행까지의 전 과정을 다루는 마스터클래스입니다.",
      agenda: [
        "M&A 전략 수립 프레임워크",
        "타겟 발굴과 선정 기준",
        "협상 전략과 딜 구조화",
        "PMI(Post-Merger Integration) 계획",
      ],
    },
    {
      id: 5,
      title: "투자유치 실무 가이드",
      subtitle: "스타트업과 성장기업을 위한 투자유치 전략",
      category: "investment",
      status: "upcoming",
      date: "2024.03.05",
      time: "14:00 - 17:00",
      location: "온라인 (Zoom)",
      instructor: "정수연 파트너",
      participants: 18,
      maxParticipants: 35,
      image: "/images/seminar-investment.png",
      description: "스타트업과 성장기업이 성공적으로 투자를 유치하기 위한 실무 가이드를 제공합니다.",
      agenda: ["투자유치 프로세스 이해", "투자자별 특성과 접근법", "기업가치 산정과 협상", "투자계약서 주요 조항"],
    },
    {
      id: 6,
      title: "M&A 세무자문 심화과정",
      subtitle: "M&A 거래의 세무 최적화 전략",
      category: "tax-advisory",
      status: "upcoming",
      date: "2024.03.12",
      time: "10:00 - 16:00",
      location: "삼일회계법인 본사",
      instructor: "한지영 파트너",
      participants: 22,
      maxParticipants: 30,
      image: "/images/seminar-tax-advisory.png",
      description: "M&A 거래에서 발생하는 다양한 세무 이슈와 최적화 방안에 대해 심도 있게 다룹니다.",
      agenda: [
        "M&A 거래구조별 세무 영향",
        "기업분할과 합병의 세무 처리",
        "국제거래 세무 이슈",
        "세무 리스크 관리 방안",
      ],
    },
  ]

  const filteredSeminars = seminars.filter((seminar) => {
    const categoryMatch = selectedCategory === "all" || seminar.category === selectedCategory
    const statusMatch = selectedStatus === "all" || seminar.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">예정</span>
      case "ongoing":
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">진행중</span>
      case "completed":
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">완료</span>
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        {/* Title Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600 transition-colors">
                홈
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/resources" className="hover:text-orange-600 transition-colors">
                자료실
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-orange-600 font-medium">세미나</span>
            </nav>
          </div>

          <h1 className="text-5xl font-light text-gray-900 mb-4">M&A 세미나</h1>
          <div className="w-24 h-1 bg-orange-500 mb-6"></div>

          <div className="max-w-3xl">
            <p className="text-xl text-gray-600 leading-relaxed mb-2">
              M&A 전문가들이 진행하는 실무 중심의 세미나와 워크샵
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">최신 트렌드와 실무 노하우를 직접 경험해보세요</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">24</div>
                <div className="text-gray-600 font-medium">연간 세미나</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">1,200+</div>
                <div className="text-gray-600 font-medium">참여자</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">15+</div>
                <div className="text-gray-600 font-medium">전문 강사</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">만족도</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">분야별</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">상태별</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setSelectedStatus(status.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedStatus === status.id
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seminars Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredSeminars.map((seminar) => (
              <div
                key={seminar.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-yellow-100">
                  <img
                    src={seminar.image || "/placeholder.svg"}
                    alt={seminar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">{getStatusBadge(seminar.status)}</div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find((c) => c.id === seminar.category)?.name}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{seminar.title}</h3>
                  <p className="text-orange-600 font-medium mb-4">{seminar.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{seminar.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {seminar.date} {seminar.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
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
                      <span>{seminar.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{seminar.instructor}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>
                        {seminar.participants}/{seminar.maxParticipants}명
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">주요 내용</h4>
                    <ul className="space-y-1">
                      {seminar.agenda.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    {seminar.status === "upcoming" && (
                      <button className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
                        신청하기
                      </button>
                    )}
                    {seminar.status === "ongoing" && (
                      <button className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200">
                        참여하기
                      </button>
                    )}
                    {seminar.status === "completed" && (
                      <button className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg font-semibold cursor-not-allowed">
                        종료됨
                      </button>
                    )}
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                      상세보기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSeminars.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 조건으로 검색해보세요.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-light text-white mb-6">M&A 전문성을 키워보세요</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              삼일회계법인의 M&A 세미나로 실무 역량을 강화하고 네트워킹 기회를 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                세미나 문의하기
              </Link>
              <Link
                href="/resources"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                자료실 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
