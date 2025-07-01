"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "../../components/Header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, TrendingUp, BarChart3, FileText } from "lucide-react"

interface SubSector {
  id: string
  name: string
  description: string
  dealCount: number
  avgDealSize: string
}

interface IndustryCategory {
  id: string
  name: string
  image: string
  description: string
  totalDeals: number
  marketSize: string
  subSectors: SubSector[]
}

const industryData: IndustryCategory[] = [
  {
    id: "semiconductor",
    name: "반도체/2차전지",
    image: "/images/semiconductor-chip.png",
    description: "반도체 및 배터리 기술 분야의 M&A 동향",
    totalDeals: 156,
    marketSize: "2.8조원",
    subSectors: [
      {
        id: "semiconductor-manufacturing",
        name: "반도체 제조 및 설계",
        description: "반도체 칩 설계 및 제조 기업",
        dealCount: 28,
        avgDealSize: "1,200억원",
      },
      {
        id: "semiconductor-equipment",
        name: "반도체 장비 및 재료",
        description: "반도체 생산 장비 및 소재 기업",
        dealCount: 22,
        avgDealSize: "800억원",
      },
      {
        id: "semiconductor-testing",
        name: "반도체 테스트 및 패키징",
        description: "반도체 검사 및 패키징 서비스",
        dealCount: 18,
        avgDealSize: "600억원",
      },
      {
        id: "lithium-battery",
        name: "리튬 이온 배터리 제조",
        description: "전기차 및 ESS용 배터리 제조",
        dealCount: 35,
        avgDealSize: "1,500억원",
      },
      {
        id: "battery-materials",
        name: "배터리 소재 및 부품 제조",
        description: "배터리 핵심 소재 및 부품",
        dealCount: 31,
        avgDealSize: "900억원",
      },
      {
        id: "battery-recycling",
        name: "배터리 재활용 및 관리",
        description: "배터리 재활용 및 폐기물 관리",
        dealCount: 22,
        avgDealSize: "400억원",
      },
    ],
  },
  {
    id: "beauty",
    name: "뷰티",
    image: "/images/beauty-cosmetics.png",
    description: "뷰티 및 화장품 산업의 M&A 동향",
    totalDeals: 89,
    marketSize: "1.2조원",
    subSectors: [
      {
        id: "skincare",
        name: "스킨케어 제품",
        description: "기초화장품 및 스킨케어 브랜드",
        dealCount: 25,
        avgDealSize: "300억원",
      },
      {
        id: "makeup",
        name: "메이크업 및 색조화장품",
        description: "색조화장품 및 메이크업 브랜드",
        dealCount: 18,
        avgDealSize: "250억원",
      },
      {
        id: "haircare",
        name: "헤어케어 및 스타일링 제품",
        description: "헤어케어 제품 및 스타일링 도구",
        dealCount: 12,
        avgDealSize: "180억원",
      },
      {
        id: "fragrance",
        name: "향수 및 에센셜 오일",
        description: "향수 및 아로마 제품",
        dealCount: 8,
        avgDealSize: "150억원",
      },
      {
        id: "beauty-device",
        name: "뷰티 디바이스",
        description: "뷰티 기기 및 디바이스",
        dealCount: 15,
        avgDealSize: "200억원",
      },
      {
        id: "beauty-service",
        name: "미용 서비스 및 케어",
        description: "미용실 및 뷰티 서비스",
        dealCount: 11,
        avgDealSize: "120억원",
      },
    ],
  },
  {
    id: "power",
    name: "전력인프라",
    image: "/images/power-infrastructure.png",
    description: "전력 및 에너지 인프라 분야의 M&A 동향",
    totalDeals: 124,
    marketSize: "3.5조원",
    subSectors: [
      {
        id: "power-generation",
        name: "전력 생산(화력, 수력, 원자력, 신재생에너지)",
        description: "발전소 및 신재생에너지 시설",
        dealCount: 32,
        avgDealSize: "2,000억원",
      },
      {
        id: "power-transmission",
        name: "전력 전송 및 배전",
        description: "송배전 시설 및 네트워크",
        dealCount: 28,
        avgDealSize: "1,500억원",
      },
      {
        id: "energy-storage",
        name: "전력 저장 및 배터리 시스템",
        description: "ESS 및 에너지 저장 시스템",
        dealCount: 22,
        avgDealSize: "800억원",
      },
      {
        id: "smart-grid",
        name: "스마트 그리드 기술",
        description: "지능형 전력망 기술",
        dealCount: 18,
        avgDealSize: "600억원",
      },
      {
        id: "power-construction",
        name: "전력 인프라 설계 및 건설",
        description: "전력 시설 설계 및 시공",
        dealCount: 24,
        avgDealSize: "1,200억원",
      },
    ],
  },
  {
    id: "fnb",
    name: "F&B (Food & Beverage)",
    image: "/images/food-beverage.png",
    description: "식품 및 음료 산업의 M&A 동향",
    totalDeals: 98,
    marketSize: "1.8조원",
    subSectors: [
      {
        id: "processed-food",
        name: "가공식품 및 스낵",
        description: "가공식품 및 스낵 제조업체",
        dealCount: 22,
        avgDealSize: "400억원",
      },
      {
        id: "beverage",
        name: "음료 및 주류",
        description: "음료 및 주류 제조업체",
        dealCount: 18,
        avgDealSize: "600억원",
      },
      {
        id: "health-food",
        name: "건강식품 및 기능성 식품",
        description: "건강기능식품 및 영양제",
        dealCount: 16,
        avgDealSize: "300억원",
      },
      {
        id: "food-retail",
        name: "식품 유통 및 소매",
        description: "식품 유통업체 및 소매점",
        dealCount: 20,
        avgDealSize: "500억원",
      },
      {
        id: "restaurant",
        name: "외식 및 레스토랑 서비스",
        description: "레스토랑 체인 및 외식업체",
        dealCount: 14,
        avgDealSize: "250억원",
      },
      {
        id: "food-tech",
        name: "식품 기술 및 혁신",
        description: "푸드테크 및 식품 기술 기업",
        dealCount: 8,
        avgDealSize: "200억원",
      },
    ],
  },
  {
    id: "it-ai",
    name: "IT/AI",
    image: "/images/it-ai-tech.png",
    description: "IT 및 인공지능 기술 분야의 M&A 동향",
    totalDeals: 187,
    marketSize: "4.2조원",
    subSectors: [
      {
        id: "software-development",
        name: "소프트웨어 개발 및 서비스",
        description: "소프트웨어 개발 및 IT 서비스 기업",
        dealCount: 45,
        avgDealSize: "800억원",
      },
      {
        id: "hardware-manufacturing",
        name: "하드웨어 제조 및 디자인",
        description: "IT 하드웨어 제조 및 설계",
        dealCount: 28,
        avgDealSize: "1,200억원",
      },
      {
        id: "cloud-computing",
        name: "클라우드 컴퓨팅 및 데이터 관리",
        description: "클라우드 서비스 및 데이터 솔루션",
        dealCount: 35,
        avgDealSize: "1,500억원",
      },
      {
        id: "ai-ml",
        name: "인공지능 및 머신러닝 솔루션",
        description: "AI/ML 기술 및 솔루션 개발",
        dealCount: 42,
        avgDealSize: "1,800억원",
      },
      {
        id: "cybersecurity",
        name: "사이버 보안 및 정보 보호",
        description: "보안 솔루션 및 정보보호 서비스",
        dealCount: 22,
        avgDealSize: "600억원",
      },
      {
        id: "digital-platform",
        name: "디지털 플랫폼 및 서비스",
        description: "디지털 플랫폼 및 온라인 서비스",
        dealCount: 15,
        avgDealSize: "900억원",
      },
    ],
  },
  {
    id: "healthcare",
    name: "헬스케어",
    image: "/images/healthcare-medical.png",
    description: "헬스케어 및 의료 산업의 M&A 동향",
    totalDeals: 142,
    marketSize: "2.9조원",
    subSectors: [
      {
        id: "pharmaceutical",
        name: "제약 및 생명공학",
        description: "제약회사 및 바이오테크 기업",
        dealCount: 38,
        avgDealSize: "2,200억원",
      },
      {
        id: "medical-device",
        name: "의료기기 및 장비",
        description: "의료기기 제조 및 의료장비",
        dealCount: 32,
        avgDealSize: "1,100억원",
      },
      {
        id: "hospital-service",
        name: "병원 및 의료 서비스",
        description: "병원 운영 및 의료 서비스",
        dealCount: 25,
        avgDealSize: "800억원",
      },
      {
        id: "telemedicine",
        name: "원격 의료 및 헬스케어 IT",
        description: "원격의료 및 의료 IT 솔루션",
        dealCount: 18,
        avgDealSize: "500억원",
      },
      {
        id: "health-supplement",
        name: "건강 보조식품 및 웰니스",
        description: "건강기능식품 및 웰니스 제품",
        dealCount: 21,
        avgDealSize: "300억원",
      },
      {
        id: "healthcare-research",
        name: "헬스케어 리서치 및 컨설팅",
        description: "의료 연구 및 헬스케어 컨설팅",
        dealCount: 8,
        avgDealSize: "200억원",
      },
    ],
  },
  {
    id: "environment",
    name: "환경",
    image: "/images/environment-green.png",
    description: "환경 및 지속가능성 분야의 M&A 동향",
    totalDeals: 76,
    marketSize: "1.5조원",
    subSectors: [
      {
        id: "environmental-tech",
        name: "환경 기술 및 솔루션",
        description: "환경 기술 및 친환경 솔루션",
        dealCount: 18,
        avgDealSize: "400억원",
      },
      {
        id: "renewable-energy",
        name: "재생 에너지 및 친환경 에너지",
        description: "태양광, 풍력 등 재생에너지",
        dealCount: 22,
        avgDealSize: "1,200억원",
      },
      {
        id: "waste-management",
        name: "폐기물 관리 및 리사이클링",
        description: "폐기물 처리 및 재활용 사업",
        dealCount: 15,
        avgDealSize: "300억원",
      },
      {
        id: "pollution-control",
        name: "수질 및 대기 오염 제어",
        description: "오염 방지 및 환경 정화 기술",
        dealCount: 12,
        avgDealSize: "500억원",
      },
      {
        id: "sustainability-consulting",
        name: "지속 가능성 및 CSR 컨설팅",
        description: "ESG 및 지속가능성 컨설팅",
        dealCount: 6,
        avgDealSize: "150억원",
      },
      {
        id: "green-construction",
        name: "친환경 건축 및 개발",
        description: "그린빌딩 및 친환경 건설",
        dealCount: 3,
        avgDealSize: "800억원",
      },
    ],
  },
  {
    id: "others",
    name: "기타",
    image: "/images/other-industries.png",
    description: "기타 다양한 산업 분야의 M&A 동향",
    totalDeals: 203,
    marketSize: "3.1조원",
    subSectors: [
      {
        id: "infrastructure",
        name: "인프라 및 건설",
        description: "사회간접자본 및 건설업",
        dealCount: 45,
        avgDealSize: "1,500억원",
      },
      {
        id: "logistics",
        name: "물류 및 운송",
        description: "물류 서비스 및 운송업",
        dealCount: 38,
        avgDealSize: "700억원",
      },
      {
        id: "education",
        name: "교육 및 콘텐츠 개발",
        description: "교육 서비스 및 콘텐츠 제작",
        dealCount: 32,
        avgDealSize: "400억원",
      },
      {
        id: "fintech",
        name: "금융 서비스 및 핀테크",
        description: "금융 서비스 및 핀테크 기업",
        dealCount: 42,
        avgDealSize: "900억원",
      },
      {
        id: "agriculture",
        name: "농업 및 농업 기술",
        description: "농업 및 농업기술 혁신",
        dealCount: 28,
        avgDealSize: "300억원",
      },
      {
        id: "consumer-lifestyle",
        name: "소비자 제품 및 라이프스타일",
        description: "소비재 및 라이프스타일 브랜드",
        dealCount: 18,
        avgDealSize: "500억원",
      },
    ],
  },
]

export default function TrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState<IndustryCategory>(industryData[0])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600 transition-colors">
                홈
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/resources" className="hover:text-orange-600 transition-colors">
                자료실
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-600 font-medium">업계별 M&A 동향</span>
            </nav>
          </div>

          {/* Title Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-light text-gray-900 mb-4">업계별 M&A 동향</h1>
            <div className="w-24 h-1 bg-orange-500 mb-6"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              주요 산업별 M&A 시장 동향과 거래 현황을 분석한 전문 리포트
              <br />
              업계별 세부 섹터 정보와 투자 인사이트를 확인하세요
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Industry Categories */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">산업 분야</h2>
              <div className="space-y-4">
                {industryData.map((category) => (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedCategory.id === category.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="secondary" className="text-xs">
                              {category.totalDeals}건
                            </Badge>
                            <span className="text-orange-600 font-medium">{category.marketSize}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Content - Selected Category Details */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedCategory.image || "/placeholder.svg"}
                    alt={selectedCategory.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-3xl font-semibold text-gray-900">{selectedCategory.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedCategory.description}</p>
                  </div>
                </div>

                {/* Category Stats */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-600">총 거래건수</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{selectedCategory.totalDeals}건</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">시장 규모</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{selectedCategory.marketSize}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">세부 섹터</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{selectedCategory.subSectors.length}개</div>
                  </div>
                </div>
              </div>

              {/* Sub Sectors Grid */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">세부 섹터 분류</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategory.subSectors.map((subSector) => (
                    <Card key={subSector.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-2 leading-tight">{subSector.name}</h4>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{subSector.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">거래건수</span>
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              {subSector.dealCount}건
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">평균 거래규모</span>
                            <span className="text-sm font-medium text-gray-900">{subSector.avgDealSize}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 py-16 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-light text-white mb-6">업계별 M&A 전문 상담</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              각 산업 분야의 M&A 전문가들이 귀하의 비즈니스에 최적화된 전략을 제공합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                업계별 전문 상담
              </Link>
              <Link
                href="/ma-cases"
                className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-orange-600 transition-colors duration-200"
              >
                M&A 사례 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
