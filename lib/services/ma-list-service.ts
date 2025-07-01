import { supabase } from "../supabase/client"
import type { MAListItem, MAListFilters } from "../types/ma-list"

export class MAListService {
  static async getMAList(filters: MAListFilters = {}): Promise<MAListItem[]> {
    try {
      let query = supabase.from("ma_list").select("*").eq("status", "active").order("created_at", { ascending: false })

      // 주체별 필터
      if (filters.subject && filters.subject !== "all") {
        query = query.eq("source", filters.subject)
      }

      // 카테고리별 필터
      if (filters.category && filters.category !== "all") {
        query = query.eq("deal_type_category", filters.category)
      }

      // 업종별 필터
      if (filters.industry && filters.industry !== "all") {
        query = query.eq("industry", filters.industry)
      }

      // 지역별 필터
      if (filters.region && filters.region !== "all") {
        query = query.eq("region", filters.region)
      }

      // 검색 필터
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
        )
      }

      const { data, error } = await query

      if (error) {
        console.error("M&A 목록 조회 오류:", error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error("M&A 목록 서비스 오류:", error)
      throw error
    }
  }

  static async getMAListStats() {
    try {
      const { data, error } = await supabase
        .from("ma_list")
        .select("source, deal_type_category, industry, region")
        .eq("status", "active")

      if (error) {
        console.error("M&A 통계 조회 오류:", error)
        throw error
      }

      const stats = {
        total: data?.length || 0,
        bySource: this.groupBy(data || [], "source"),
        byCategory: this.groupBy(data || [], "deal_type_category"),
        byIndustry: this.groupBy(data || [], "industry"),
        byRegion: this.groupBy(data || [], "region"),
      }

      return stats
    } catch (error) {
      console.error("M&A 통계 서비스 오류:", error)
      throw error
    }
  }

  private static groupBy(array: any[], key: string) {
    return array.reduce((result, item) => {
      const group = item[key] || "Unknown"
      result[group] = (result[group] || 0) + 1
      return result
    }, {})
  }
}
