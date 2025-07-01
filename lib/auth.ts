import { supabase } from "./supabase/client"

export interface SignUpData {
  email: string
  password: string
  userType: string
  name: string
  company: string
  industry: string
  phone: string
  position?: string
  interestedIndustries?: string
  newsletter: boolean
  marketingAgreement: boolean
}

export async function signUp(data: SignUpData) {
  try {
    console.log("=== SIGNUP PROCESS START ===")
    console.log("Input data:", {
      email: data.email,
      userType: data.userType,
      name: data.name,
      company: data.company,
      industry: data.industry,
      phone: data.phone,
      position: data.position,
      interestedIndustries: data.interestedIndustries,
      newsletter: data.newsletter,
      marketingAgreement: data.marketingAgreement,
    })

    // 1. Supabase Auth로 사용자 생성
    console.log("Step 1: Creating auth user...")
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    console.log("Auth result:", {
      user: authData.user ? { id: authData.user.id, email: authData.user.email } : null,
      session: authData.session ? "exists" : "null",
      error: authError,
    })

    if (authError) {
      console.error("Auth error details:", authError)
      throw new Error(`인증 오류: ${authError.message}`)
    }

    if (!authData.user) {
      throw new Error("사용자 생성에 실패했습니다.")
    }

    console.log("Step 2: Saving user profile...")
    console.log("User ID:", authData.user.id)

    // 2. 사용자 프로필 정보 저장 (이메일 포함)
    const profileData = {
      id: authData.user.id,
      email: data.email, // 이메일 추가
      user_type: data.userType,
      name: data.name,
      company: data.company,
      industry: data.industry,
      phone: data.phone,
      position: data.position || null,
      interested_industries: data.interestedIndustries || null,
      newsletter_consent: data.newsletter,
      marketing_consent: data.marketingAgreement,
    }

    console.log("Profile data to insert:", profileData)

    // 테이블 존재 여부 먼저 확인
    console.log("Step 2.1: Checking if table exists...")
    const { data: tableCheck, error: tableError } = await supabase
      .from("user_profiles")
      .select("count", { count: "exact", head: true })

    console.log("Table check result:", { tableCheck, tableError })

    if (tableError) {
      console.error("Table check error:", tableError)
      throw new Error(`테이블 확인 오류: ${tableError.message}`)
    }

    // 프로필 데이터 삽입
    console.log("Step 2.2: Inserting profile data...")
    const { data: insertData, error: profileError } = await supabase.from("user_profiles").insert(profileData).select()

    console.log("Profile insert result:", { insertData, profileError })

    if (profileError) {
      console.error("Profile error details:", {
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
        code: profileError.code,
      })
      throw new Error(`프로필 저장 오류: ${profileError.message} (코드: ${profileError.code})`)
    }

    console.log("=== SIGNUP PROCESS SUCCESS ===")
    return { data: authData, error: null }
  } catch (error: any) {
    console.error("=== SIGNUP PROCESS FAILED ===")
    console.error("Final error:", error)
    return { data: null, error: error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("🔐 로그인 시작:", { email, timestamp: new Date().toISOString() })

    // 환경 변수 확인
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    console.log("🔧 환경 변수 상태:", { hasUrl, hasKey })

    if (!hasUrl || !hasKey) {
      throw new Error("Supabase 환경 변수가 설정되지 않았습니다.")
    }

    console.log("🔍 Supabase 로그인 요청 시작...")
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("🔍 로그인 응답:", {
      hasUser: !!data.user,
      hasSession: !!data.session,
      userId: data.user?.id,
      userEmail: data.user?.email,
      error: error ? { message: error.message, status: error.status } : null,
      timestamp: new Date().toISOString(),
    })

    if (error) {
      console.error("❌ 로그인 에러:", error)
      throw error
    }

    if (!data.user) {
      console.error("❌ 사용자 데이터가 없습니다.")
      throw new Error("로그인에 실패했습니다.")
    }

    console.log("✅ 로그인 성공:", { userId: data.user.id, email: data.user.email })
    return { data, error: null }
  } catch (error: any) {
    console.error("❌ 로그인 실패:", {
      message: error.message,
      status: error.status,
      timestamp: new Date().toISOString(),
    })
    return { data: null, error }
  }
}

export async function signOut() {
  try {
    console.log("🚪 로그아웃 시작...")
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("❌ 로그아웃 에러:", error)
      throw error
    }
    console.log("✅ 로그아웃 성공")
    return { error: null }
  } catch (error) {
    console.error("❌ 로그아웃 실패:", error)
    return { error }
  }
}

export async function getCurrentUser() {
  try {
    console.log("👤 현재 사용자 확인 시작...")
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    console.log("👤 현재 사용자 결과:", {
      hasUser: !!user,
      userId: user?.id,
      userEmail: user?.email,
      error: error ? error.message : null,
    })

    if (error) {
      console.error("❌ 사용자 확인 에러:", error)
      throw error
    }

    return { user, error: null }
  } catch (error) {
    console.error("❌ 사용자 확인 실패:", error)
    return { user: null, error }
  }
}
