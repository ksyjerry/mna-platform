export interface MACaseItem {
  id: string
  project_name: string
  project_number: string
  target_company: string
  industry: string
  region: string
  deal_structure: string
  deal_size: string
  equity_percentage: string
  investment_highlights: string[]
  description: string
  completion_date: string
  advisor: string
  image_url?: string
  created_at: string
}

export interface MACaseFilters {
  industry?: string
  region?: string
  search?: string
}

export const MA_CASE_FILTER_OPTIONS = {
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
    { value: "금융", label: "금융" },
    { value: "부동산", label: "부동산" },
  ],
  region: [
    { value: "all", label: "전체 지역" },
    { value: "수도권", label: "수도권" },
    { value: "강원", label: "강원" },
    { value: "충청", label: "충청" },
    { value: "경상", label: "경상" },
    { value: "전라", label: "전라" },
    { value: "제주", label: "제주" },
  ],
} as const
