import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Extend the NodeJS.Global interface to include our supabase client
declare global {
  var supabase_client: SupabaseClient | undefined
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("🔧 Supabase 환경 변수 확인:", {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "❌ 없음",
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "❌ 없음",
  env: process.env.NODE_ENV,
})

const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

let supabase: SupabaseClient

if (!isSupabaseConfigured) {
  console.error("❌ Supabase 환경 변수가 설정되지 않았습니다.")
  console.error("필요한 환경 변수:")
  console.error("- NEXT_PUBLIC_SUPABASE_URL")
  console.error("- NEXT_PUBLIC_SUPABASE_ANON_KEY")

  // 더미 클라이언트 생성 (에러 방지용)
  supabase = createClient("https://placeholder.supabase.co", "placeholder-key", {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
} else {
  console.log("✅ Supabase 클라이언트 생성 중...")

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global.supabase_client) {
      global.supabase_client = createClient(supabaseUrl!, supabaseAnonKey!, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: "pkce",
        },
      })
    }
    supabase = global.supabase_client
  } else {
    // In production, always create a new client.
    supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  }

  console.log("✅ Supabase 클라이언트 생성 완료")
}

// 연결 테스트 함수
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase가 설정되지 않았습니다." }
  }

  try {
    console.log("🔍 Supabase 연결 테스트 시작...")
    const { data, error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })
    console.log("Supabase 연결 테스트 결과:", { data, error })
    return { success: !error, error }
  } catch (error) {
    console.error("❌ Supabase 연결 테스트 실패:", error)
    return { success: false, error }
  }
}

// 환경 변수 확인 함수
export function checkEnvironmentVariables() {
  const variables = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const missing = Object.entries(variables)
    .filter(([key, value]) => !value)
    .map(([key]) => key)

  console.log("🔧 환경 변수 확인:", {
    allSet: missing.length === 0,
    missing,
    hasUrl: !!variables.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!variables.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  return {
    allSet: missing.length === 0,
    missing,
    variables,
  }
}

export { supabase, isSupabaseConfigured }
