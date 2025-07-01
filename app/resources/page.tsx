"use client"
import Link from "next/link"
import Header from "../components/Header"

export default function ResourcesPage() {
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
            <span className="text-orange-600 font-medium">자료실</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-5xl font-light text-gray-900 mb-6">M&A 자료실</h1>
            <div className="w-24 h-1 bg-orange-500 mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              최신 M&A 동향과 전문 지식을 제공하는 종합 자료실입니다
              <br />
              업계 최고의 인사이트와 세미나 정보를 확인하세요
            </p>
          </div>

          {/* Resource Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* 업계별 M&A 동향 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">업계별 M&A 동향</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                IT/AI, 헬스케어, 반도체 등 주요 업계별 최신 M&A 동향과 시장 분석 리포트를 제공합니다.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-orange-600">50+</span> 업계 리포트
                </div>
                <Link
                  href="/resources/trends"
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
                >
                  자세히 보기
                </Link>
              </div>
            </div>

            {/* M&A 세미나 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">M&A 세미나</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                M&A 전문가들이 진행하는 실무 중심의 세미나와 워크샵에 참여하여 전문 지식을 습득하세요.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-orange-600">24</span> 연간 세미나
                </div>
                <Link
                  href="/resources/seminars"
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">자료실 현황</h2>
              <p className="text-gray-600">삼일회계법인이 제공하는 M&A 전문 자료</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">업계 리포트</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">24</div>
                <div className="text-gray-600 font-medium">연간 세미나</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">1,000+</div>
                <div className="text-gray-600 font-medium">참여 기업</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-600 mb-2">15</div>
                <div className="text-gray-600 font-medium">전문 분야</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-light text-white mb-6">M&A 전문 지식을 확인하세요</h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                최신 시장 동향부터 실무 노하우까지, 성공적인 M&A를 위한 모든 정보를 제공합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/resources/trends"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                >
                  업계 동향 보기
                </Link>
                <Link
                  href="/resources/seminars"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                >
                  세미나 신청하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
