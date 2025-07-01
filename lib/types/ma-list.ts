// lib/types/ma-list.ts
// M&A 리스트에서 사용되는 데이터 타입 정의

export interface MAListItem {
  id: string
  title: string
  company_name: string
  industry: string
  deal_type: string
  deal_size: string
  location: string
  description: string
  status: string
  source: string
  deal_type_category: string
  region: string
  image_url: string
  created_at: string
  updated_at: string
  // NEW: 거래 구조 (예: 구주 매각, 신주 인수 등)
  deal_structure?: string
}

export interface MAListFilters {
  subject?: string // 주체별: 'pwc' | 'partner' | 'all'
  category?: string // 카테고리별: '매각' | '투자유치' | '인수' | 'all'
  industry?: string // 업종별
  region?: string // 지역별
  search?: string
}

export const FILTER_OPTIONS = {
  subject: [
    { value: "all", label: "전체" },
    { value: "삼일 PwC", label: "삼일 PwC" },
    { value: "파트너사", label: "파트너사" },
  ],
  category: [
    { value: "all", label: "전체" },
    { value: "매각", label: "매각" },
    { value: "투자유치", label: "투자유치" },
    { value: "인수", label: "인수" },
  ],
  industry: [
    { value: "all", label: "전체 업종" },
    { value: "IT/소프트웨어", label: "IT/소프트웨어" },
    { value: "제조업", label: "제조업" },
    { value: "헬스케어", label: "헬스케어" },
    { value: "F&B", label: "F&B" },
    { value: "뷰티", label: "뷰티" },
    { value: "환경/에너지", label: "환경/에너지" },
    { value: "물류/운송", label: "물류/운송" },
    { value: "농업/식품", label: "농업/식품" },
  ],
  region: [
    { value: "all", label: "전체 지역" },
    { value: "수도권", label: "수도권" },
    { value: "영남권", label: "영남권" },
    { value: "충청권", label: "충청권" },
    { value: "호남권", label: "호남권" },
    { value: "강원권", label: "강원권" },
  ],
} as const
