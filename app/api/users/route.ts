import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// 서버 사이드에서 관리자 권한으로 Supabase 클라이언트 생성
const supabaseAdmin = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function GET(request: NextRequest) {
  try {
    console.log("사용자 목록 API 호출됨")

    // 관리자 클라이언트로 모든 사용자 프로필 조회
    const { data, error } = await supabaseAdmin
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("사용자 목록 조회 오류:", error)
      return NextResponse.json(
        {
          success: false,
          error: `사용자 목록 조회 실패: ${error.message}`,
        },
        { status: 500 },
      )
    }

    console.log("사용자 목록 조회 성공:", data?.length || 0, "건")

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    console.error("사용자 목록 API 예외:", error)
    return NextResponse.json(
      {
        success: false,
        error: `서버 오류: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
