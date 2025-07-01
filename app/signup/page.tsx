"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signUp } from "../../lib/auth"
import { testSupabaseConnection } from "../../lib/supabase/client"

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    userType: "",
    name: "",
    company: "",
    industry: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
    interestedIndustries: "",
    newsletter: false,
    privacyAgreement: false,
    termsAgreement: false,
    marketingAgreement: false,
  })

  const industries = [
    "제조업",
    "정보통신업",
    "금융업",
    "부동산업",
    "건설업",
    "도매 및 소매업",
    "운수 및 창고업",
    "숙박 및 음식점업",
    "교육서비스업",
    "보건업 및 사회복지서비스업",
    "예술, 스포츠 및 여가관련 서비스업",
    "기타",
  ]

  // 컴포넌트 내부에 테스트 함수 추가
  const testConnection = async () => {
    console.log("Testing Supabase connection...")
    const result = await testSupabaseConnection()
    console.log("Connection test result:", result)
    if (result.success) {
      alert("Supabase 연결 성공!")
    } else {
      alert(`Supabase 연결 실패: ${result.error?.message || "Unknown error"}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log("Form submission started")

    // 유효성 검사
    if (!formData.userType) {
      setError("가입자 유형을 선택해주세요.")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      setLoading(false)
      return
    }

    if (!formData.privacyAgreement || !formData.termsAgreement) {
      setError("필수 약관에 동의해주세요.")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.")
      setLoading(false)
      return
    }

    try {
      console.log("Calling signUp function...")

      const { data, error } = await signUp({
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        name: formData.name,
        company: formData.company,
        industry: formData.industry,
        phone: formData.phone,
        position: formData.position,
        interestedIndustries: formData.interestedIndustries,
        newsletter: formData.newsletter,
        marketingAgreement: formData.marketingAgreement,
      })

      console.log("SignUp result:", { data, error })

      if (error) {
        console.error("SignUp error details:", error)
        throw error
      }

      console.log("Signup successful!")
      setSuccess(true)
      setTimeout(() => {
        router.push("/login?message=회원가입이 완료되었습니다. 로그인해주세요.")
      }, 2000)
    } catch (error: any) {
      console.error("Signup error:", error)

      let errorMessage = "회원가입 중 오류가 발생했습니다."

      if (error?.message) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else if (error?.error_description) {
        errorMessage = error.error_description
      } else if (error?.msg) {
        errorMessage = error.msg
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
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#fcfaf8]">
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center px-4">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1c150d] mb-2">회원가입 완료!</h2>
              <p className="text-[#9c7849] mb-4">잠시 후 로그인 페이지로 이동합니다.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8]">
      <Header />

      <div className="pt-20 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-16 w-16">
                  <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 text-center">
                  <CardTitle className="text-2xl font-bold text-[#1c150d]">회원가입</CardTitle>
                  <CardDescription className="text-[#9c7849] mt-1">
                    M&A 플랫폼에서 새로운 기회를 찾아보세요
                  </CardDescription>
                </div>
                <div className="h-12 w-12"></div>
              </div>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="mb-4">
                  <Alert className="mb-4 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                  <Button type="button" onClick={testConnection} variant="outline" className="w-full mb-4">
                    Supabase 연결 테스트
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 가입자 유형 */}
                <div className="space-y-3">
                  <Label className="text-[#1c150d] font-medium">
                    가입자 유형 <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={(value) => handleSelectChange("userType", value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller" className="text-[#1c150d]">
                        매도자
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="buyer" />
                      <Label htmlFor="buyer" className="text-[#1c150d]">
                        매수자
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1c150d] font-medium">
                      이름 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="이름을 입력하세요"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#1c150d] font-medium">
                      회사명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="회사명을 입력하세요"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-[#1c150d] font-medium">
                      회사업종 <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("industry", value)} required>
                      <SelectTrigger className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]">
                        <SelectValue placeholder="업종을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#1c150d] font-medium">
                      연락처 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="연락처를 입력하세요"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1c150d] font-medium">
                    이메일주소 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#1c150d] font-medium">
                      비밀번호 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="비밀번호를 입력하세요 (최소 6자)"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#1c150d] font-medium">
                      비밀번호 확인 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="비밀번호를 다시 입력하세요"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                    />
                  </div>
                </div>

                {/* 선택 입력사항 */}
                <div className="border-t border-[#f4eee7] pt-6">
                  <h3 className="text-lg font-semibold text-[#1c150d] mb-4">선택 입력사항</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-[#1c150d] font-medium">
                        직위
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        placeholder="직위를 입력하세요"
                        value={formData.position}
                        onChange={handleChange}
                        className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interestedIndustries" className="text-[#1c150d] font-medium">
                        관심업종
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("interestedIndustries", value)}>
                        <SelectTrigger className="border-[#f4eee7] focus:border-[#ff6600] focus:ring-[#ff6600]">
                          <SelectValue placeholder="관심업종을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
                      />
                      <Label htmlFor="newsletter" className="text-[#1c150d]">
                        뉴스레터 수신 동의
                      </Label>
                    </div>
                  </div>
                </div>

                {/* 개인정보보호 관련 동의 */}
                <div className="border-t border-[#f4eee7] pt-6">
                  <h3 className="text-lg font-semibold text-[#1c150d] mb-4">약관 동의</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="termsAgreement"
                        checked={formData.termsAgreement}
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAgreement: checked as boolean })}
                        required
                      />
                      <Label htmlFor="termsAgreement" className="text-[#1c150d]">
                        이용약관 동의 <span className="text-red-500">*</span>
                        <Link href="#" className="text-[#ff6600] hover:text-[#e55a00] ml-2 text-sm">
                          보기
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacyAgreement"
                        checked={formData.privacyAgreement}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, privacyAgreement: checked as boolean })
                        }
                        required
                      />
                      <Label htmlFor="privacyAgreement" className="text-[#1c150d]">
                        개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                        <Link href="#" className="text-[#ff6600] hover:text-[#e55a00] ml-2 text-sm">
                          보기
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketingAgreement"
                        checked={formData.marketingAgreement}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, marketingAgreement: checked as boolean })
                        }
                      />
                      <Label htmlFor="marketingAgreement" className="text-[#1c150d]">
                        마케팅 정보 수신 동의 (선택)
                        <Link href="#" className="text-[#ff6600] hover:text-[#e55a00] ml-2 text-sm">
                          보기
                        </Link>
                      </Label>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ff6600] hover:bg-[#e55a00] text-white font-bold py-3 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "회원가입 중..." : "회원가입"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-[#9c7849] text-sm">
                  이미 계정이 있으신가요?{" "}
                  <Link href="/login" className="text-[#ff6600] hover:text-[#e55a00] font-medium transition-colors">
                    로그인
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
