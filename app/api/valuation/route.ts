import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    console.log("가치산정 요청 API 호출됨")

    // 서버 사이드에서 관리자 클라이언트를 사용하여 직접 조회
    const { data, error } = await supabaseAdmin
      .from("valuation_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase 조회 오류:", error)
      return NextResponse.json(
        {
          success: false,
          error: `데이터베이스 조회 오류: ${error.message}`,
        },
        { status: 500 },
      )
    }

    console.log("가치산정 요청 데이터 조회 성공:", data?.length || 0, "건")

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    console.error("API 처리 오류:", error)
    return NextResponse.json(
      {
        success: false,
        error: `서버 내부 오류: ${error.message}`,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 필수 필드 검증
    const requiredFields = [
      "company_name",
      "industry",
      "region",
      "revenue",
      "operating_profit",
      "net_assets",
      "contact_person",
      "contact_email",
      "contact_phone",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `${field} 필드가 필요합니다`,
          },
          { status: 400 },
        )
      }
    }

    const { data, error } = await supabaseAdmin
      .from("valuation_requests")
      .insert([
        {
          company_name: body.company_name,
          industry: body.industry,
          region: body.region,
          revenue: body.revenue,
          operating_profit: body.operating_profit,
          net_assets: body.net_assets,
          contact_person: body.contact_person,
          contact_email: body.contact_email,
          contact_phone: body.contact_phone,
          company_description: body.company_description || null,
          business_model: body.business_model || null,
          competitive_advantage: body.competitive_advantage || null,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase 삽입 오류:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "가치산정 요청이 성공적으로 제출되었습니다",
      data: data[0],
    })
  } catch (error: any) {
    console.error("API 처리 오류:", error)
    return NextResponse.json(
      {
        success: false,
        error: `서버 내부 오류: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
