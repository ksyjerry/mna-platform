"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { signIn } from "../../lib/auth"
import { checkEnvironmentVariables, testSupabaseConnection } from "../../lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  useEffect(() => {
    const messageParam = searchParams.get("message")
    if (messageParam) {
      setMessage(messageParam)
    }

    // 환경 변수 및 연결 상태 확인
    const checkConnection = async () => {
      const envCheck = checkEnvironmentVariables()
      const connectionTest = await testSupabaseConnection()

      setDebugInfo({
        environment: envCheck,
        connection: connectionTest,
        timestamp: new Date().toISOString(),
      })

      console.log("🔧 디버그 정보:", {
        environment: envCheck,
        connection: connectionTest,
      })
    }

    checkConnection()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    console.log("🚀 로그인 폼 제출 시작:", {
      email: formData.email,
      hasPassword: !!formData.password,
      timestamp: new Date().toISOString(),
    })

    // 클라이언트 사이드 검증
    if (!formData.email.trim()) {
      setError("이메일을 입력해주세요.")
      setLoading(false)
      return
    }

    if (!formData.password.trim()) {
      setError("비밀번호를 입력해주세요.")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.")
      setLoading(false)
      return
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.")
      setLoading(false)
      return
    }

    try {
      console.log("🔐 signIn 함수 호출...")
      const { data, error } = await signIn(formData.email, formData.password)

      console.log("🔐 signIn 결과:", {
        hasData: !!data,
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error: error ? error.message : null,
      })

      if (error) {
        console.error("❌ 로그인 에러:", error)
        throw error
      }

      if (data.user) {
        console.log("✅ 로그인 성공, 리다이렉트 시작...")
        // 로그인 성공 메시지
        setSuccess("로그인에 성공했습니다. 메인 페이지로 이동합니다...")

        // 짧은 지연 후 리다이렉트
        setTimeout(() => {
          console.log("🔄 페이지 리다이렉트 실행...")
          router.push("/")
          router.refresh()
        }, 1000)

        // 추가 보장을 위한 window.location 사용
        setTimeout(() => {
          console.log("🔄 강제 리다이렉트 실행...")
          window.location.href = "/"
        }, 2000)
      } else {
        console.error("❌ 사용자 데이터가 없습니다.")
        setError("로그인에 실패했습니다. 다시 시도해주세요.")
      }
    } catch (error: any) {
      console.error("❌ 로그인 처리 중 에러:", error)
      let errorMessage = "로그인 중 오류가 발생했습니다."

      // Supabase 에러 메시지에 따른 세분화된 처리
      if (error.message === "Invalid login credentials") {
        errorMessage = "입력하신 이메일 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요."
      } else if (error.message === "Email not confirmed") {
        errorMessage = "이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요."
      } else if (error.message === "Too many requests") {
        errorMessage = "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요."
      } else if (error.message === "User not found") {
        errorMessage = "등록되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요."
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        errorMessage = "네트워크 연결을 확인하고 다시 시도해주세요."
      } else if (error.message.includes("rate limit")) {
        errorMessage = "로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요."
      } else if (error.message.includes("환경 변수")) {
        errorMessage = "서버 설정 오류입니다. 관리자에게 문의해주세요."
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // 입력 시 에러 메시지 제거
    if (error) {
      setError(null)
    }
    if (success) {
      setSuccess(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8]">
      <Header />

      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 flex-shrink-0">
                  <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold text-[#1c150d] text-left">로그인</CardTitle>
                </div>
              </div>
              <CardDescription className="text-[#9c7849] text-left">M&A 플랫폼에 오신 것을 환영합니다</CardDescription>
            </CardHeader>

            <CardContent>
              {/* 디버그 정보 (개발 환경에서만 표시) */}
              {process.env.NODE_ENV === "development" && debugInfo && (
                <Alert className="mb-4 border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-blue-800 text-xs">
                    <details>
                      <summary>디버그 정보 (개발용)</summary>
                      <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
                    </details>
                  </AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1c150d] font-medium">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600] ${
                      error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1c150d] font-medium">
                    비밀번호
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600] ${
                      error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-[#9c7849]">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="rounded border-[#f4eee7]"
                    />
                    <span>로그인 상태 유지</span>
                  </label>
                  <Link href="#" className="text-[#ff6600] hover:text-[#e55a00] transition-colors">
                    비밀번호 찾기
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ff6600] hover:bg-[#e55a00] text-white font-bold py-2.5 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "로그인 중..." : "로그인"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[#9c7849] text-sm">
                  아직 계정이 없으신가요?{" "}
                  <Link href="/signup" className="text-[#ff6600] hover:text-[#e55a00] font-medium transition-colors">
                    회원가입
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#f4eee7]">
                <div className="text-center text-xs text-[#9c7849] space-y-1">
                  <p>© 2024 삼일회계법인. All rights reserved.</p>
                  <div className="flex justify-center space-x-4">
                    <Link href="#" className="hover:text-[#ff6600] transition-colors">
                      이용약관
                    </Link>
                    <Link href="#" className="hover:text-[#ff6600] transition-colors">
                      개인정보처리방침
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
