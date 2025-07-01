"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Settings, AlertCircle, FileText, HelpCircle } from "lucide-react"

// 컴포넌트 imports
import AdminSidebar from "./components/AdminSidebar"
import AdminHeader from "./components/AdminHeader"
import AdminLogin from "./components/AdminLogin"
import Dashboard from "./components/Dashboard"
import UserManagement from "./components/UserManagement"
import MAListManagement from "./components/MAListManagement"
import ValuationRequestManagement from "./components/ValuationRequestManagement"

// Supabase 클라이언트 안전하게 import
let supabase: any = null
let isSupabaseConfigured = false

try {
  const supabaseModule = await import("../../lib/supabase/client")
  supabase = supabaseModule.supabase
  isSupabaseConfigured = supabaseModule.isSupabaseConfigured
} catch (error: any) {
  console.error("Supabase 클라이언트 로드 오류:", error)
}

interface UserProfile {
  id: string
  name: string
  email?: string
  company?: string
  industry?: string
  phone?: string
  position?: string
  user_type: string
  interested_industries?: string
  newsletter_consent: boolean
  marketing_consent: boolean
  created_at: string
  updated_at: string
}

interface MAListItem {
  id: string
  title: string
  company_name: string
  industry: string
  deal_type: string // English value like 'divestiture'
  deal_size: string
  location: string
  description: string
  status: string
  source: string
  deal_type_category: string // Korean value like '매각'
  region: string
  image_url: string
  created_at: string
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [users, setUsers] = useState<UserProfile[]>([])
  const [maList, setMAList] = useState<MAListItem[]>([])
  const [valuationRequests, setValuationRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<{ users?: string; maList?: string; valuationRequests?: string }>({})
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 현재 사용자 확인 및 관리자 권한 체크
  const checkUserAndAdmin = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      console.log("현재 사용자 확인:", { user: user?.email, error })

      if (error || !user) {
        setCurrentUser(null)
        setIsAdmin(false)
        return false
      }

      setCurrentUser(user)

      if (user.email === "admin@pwc.com") {
        setIsAdmin(true)
        console.log("관리자 권한 확인됨")
        return true
      } else {
        setIsAdmin(false)
        console.log("관리자 권한 없음:", user.email)
        return false
      }
    } catch (error) {
      console.error("사용자 확인 오류:", error)
      setCurrentUser(null)
      setIsAdmin(false)
      return false
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const isAdminUser = await checkUserAndAdmin()

      // 관리자인 경우에만 데이터 로드
      if (isAdminUser) {
        await Promise.all([fetchUsers(), fetchMAList(), fetchValuationRequests()])
      }

      setIsLoading(false)
    }
    loadData()
  }, [])

  // Supabase 설정 확인
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="h-12 w-12 mx-auto mb-4">
              <Settings className="h-full w-full text-orange-600" />
            </div>
            <CardTitle>Supabase 설정 필요</CardTitle>
            <CardDescription>데이터베이스 연결을 위해 Supabase 설정이 필요합니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>환경 변수 누락</AlertTitle>
              <AlertDescription>
                다음 환경 변수가 설정되지 않았습니다:
                <br />• NEXT_PUBLIC_SUPABASE_URL
                <br />• NEXT_PUBLIC_SUPABASE_ANON_KEY
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 관리자 로그인
  const handleAdminLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(`로그인 실패: ${error.message}`)
        return
      }

      if (data.user?.email === "admin@pwc.com") {
        setIsAdmin(true)
        setCurrentUser(data.user)
        alert("관리자로 로그인되었습니다.")

        // 로그인 후 데이터 다시 로드
        await Promise.all([fetchUsers(), fetchMAList(), fetchValuationRequests()])
      } else {
        alert("관리자 권한이 없습니다.")
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error("로그인 오류:", error)
      alert("로그인 중 오류가 발생했습니다.")
    }
  }

  // 로그아웃
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setCurrentUser(null)
      setIsAdmin(false)
      setUsers([])
      setMAList([])
      setValuationRequests([])
    } catch (error) {
      console.error("로그아웃 오류:", error)
    }
  }

  // 사용자 목록 조회 - 서버 사이드 관리자 클라이언트 사용
  const fetchUsers = async () => {
    try {
      console.log("사용자 목록 조회 시작...")

      // 먼저 클라이언트 사이드에서 시도
      const { data: clientData, error: clientError } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false })

      console.log("클라이언트 사이드 조회 결과:", {
        data: clientData?.length || 0,
        error: clientError?.message,
      })

      if (clientError) {
        console.error("클라이언트 사이드 조회 실패:", clientError)

        // 서버 사이드 API를 통해 조회 시도
        try {
          const response = await fetch("/api/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })

          if (response.ok) {
            const result = await response.json()
            if (result.success) {
              setUsers(result.data || [])
              setErrors((prev) => ({ ...prev, users: undefined }))
              console.log("서버 사이드 조회 성공:", result.data?.length || 0, "건")
              return
            }
          }
        } catch (apiError) {
          console.error("API 조회도 실패:", apiError)
        }

        setErrors((prev) => ({
          ...prev,
          users: `사용자 데이터 조회 오류: ${clientError.message}`,
        }))
        return
      }

      setUsers(clientData || [])
      setErrors((prev) => ({ ...prev, users: undefined }))
      console.log("사용자 목록 조회 성공:", clientData?.length || 0, "건")
    } catch (error: any) {
      console.error("사용자 목록 조회 예외:", error)
      setErrors((prev) => ({
        ...prev,
        users: `사용자 데이터를 불러오는 중 예상치 못한 오류가 발생했습니다: ${error.message}`,
      }))
    }
  }

  // M&A 목록 조회
  const fetchMAList = async () => {
    try {
      const { data, error } = await supabase.from("ma_list").select("*").order("created_at", { ascending: false })

      if (error) {
        if (error.message.includes("does not exist")) {
          setErrors((prev) => ({
            ...prev,
            maList: "M&A List 테이블이 존재하지 않습니다.",
          }))
        } else {
          setErrors((prev) => ({ ...prev, maList: `M&A 데이터 조회 오류: ${error.message}` }))
        }
        return
      }

      setMAList(data || [])
      setErrors((prev) => ({ ...prev, maList: undefined }))
    } catch (error) {
      setErrors((prev) => ({ ...prev, maList: "M&A 데이터를 불러오는 중 예상치 못한 오류가 발생했습니다." }))
    }
  }

  // 가치산정 요청 목록 조회 - 서버 사이드 API 사용
  const fetchValuationRequests = async () => {
    try {
      console.log("가치산정 요청 데이터 조회 시작...")

      const response = await fetch("/api/valuation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함
      })

      console.log("API 응답 상태:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API 오류 응답:", errorText)
        setErrors((prev) => ({
          ...prev,
          valuationRequests: `HTTP 오류 (${response.status}): ${errorText}`,
        }))
        return
      }

      const result = await response.json()
      console.log("API 응답 데이터:", result)

      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          valuationRequests: `가치산정 요청 데이터 조회 오류: ${result.error}`,
        }))
        return
      }

      setValuationRequests(result.data || [])
      setErrors((prev) => ({ ...prev, valuationRequests: undefined }))
      console.log("가치산정 요청 데이터 로드 완료:", result.data?.length || 0, "건")
    } catch (error: any) {
      console.error("가치산정 요청 조회 네트워크 오류:", error)
      setErrors((prev) => ({
        ...prev,
        valuationRequests: `네트워크 오류: ${error.message}`,
      }))
    }
  }

  // 가치산정 요청 상태 업데이트 - API 엔드포인트 사용
  const handleUpdateValuationStatus = async (id: string, status: string) => {
    if (!isAdmin) {
      alert("관리자 권한이 필요합니다.")
      return
    }

    try {
      const response = await fetch(`/api/valuation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      })

      const result = await response.json()

      if (!result.success) {
        alert(`상태 업데이트 중 오류가 발생했습니다: ${result.error}`)
        return
      }

      await fetchValuationRequests()
      alert("상태가 성공적으로 업데이트되었습니다.")
    } catch (error) {
      alert("상태 업데이트 중 예상치 못한 오류가 발생했습니다.")
    }
  }

  // 가치산정 요청 삭제 - API 엔드포인트 사용
  const handleDeleteValuationRequest = async (id: string) => {
    if (!isAdmin || !confirm("정말 삭제하시겠습니까?")) return

    try {
      const response = await fetch(`/api/valuation/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const result = await response.json()

      if (!result.success) {
        alert(`가치산정 요청 삭제 중 오류가 발생했습니다: ${result.error}`)
        return
      }

      await fetchValuationRequests()
      alert("가치산정 요청이 성공적으로 삭제되었습니다.")
    } catch (error) {
      alert("가치산정 요청 삭제 중 예상치 못한 오류가 발생했습니다.")
    }
  }

  // M&A 항목 추가
  const handleAddMAItem = async (newMAItem: any): Promise<boolean> => {
    if (!isAdmin || isSubmitting) return false

    setIsSubmitting(true)

    try {
      const {
        data: { user },
        error: sessionError,
      } = await supabase.auth.getUser()

      if (sessionError || !user) {
        console.error("Supabase 세션 오류:", sessionError)
        alert("사용자 세션을 확인하지 못했습니다. 다시 로그인해주세요.")
        setIsSubmitting(false)
        await handleLogout()
        return false
      }

      const requiredFields = {
        title: "제목",
        company_name: "회사명",
        industry: "업종",
        source: "주체",
        deal_type_category: "카테고리",
        region: "지역",
      }

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!newMAItem[field as keyof typeof newMAItem]) {
          alert(`${label}을(를) 입력해주세요.`)
          setIsSubmitting(false)
          return false
        }
      }

      // Map deal_type_category (Korean) to deal_type (English)
      let englishDealType = ""
      switch (newMAItem.deal_type_category) {
        case "매각":
          englishDealType = "divestiture"
          break
        case "투자유치":
          englishDealType = "investment"
          break
        case "인수":
          englishDealType = "acquisition"
          break
        default:
          alert(`알 수 없는 카테고리 값입니다: ${newMAItem.deal_type_category}. 'deal_type'을 설정할 수 없습니다.`)
          setIsSubmitting(false)
          return false
      }

      const itemToInsert = {
        title: newMAItem.title,
        company_name: newMAItem.company_name,
        industry: newMAItem.industry,
        deal_type: englishDealType, // Use the mapped English value
        deal_size: newMAItem.deal_size || null,
        description: newMAItem.description || null,
        status: newMAItem.status || "active",
        source: newMAItem.source,
        deal_type_category: newMAItem.deal_type_category, // This is the Korean value from the form
        region: newMAItem.region,
        image_url: newMAItem.image_url || null,
      }

      const { data, error } = await supabase.from("ma_list").insert([itemToInsert]).select()

      if (error) {
        console.error("M&A 항목 추가 Supabase 오류:", error)
        alert(
          `M&A 항목 추가 중 오류가 발생했습니다: ${error.message}\n\n(팁: RLS 정책 위반 또는 필수 컬럼 누락일 수 있습니다. 관리자 계정으로 로그인되어 있는지, 모든 필수값이 올바르게 입력되었는지 확인해주세요.)`,
        )
        setIsSubmitting(false)
        return false
      }

      alert("M&A 항목이 성공적으로 추가되었습니다.")
      await fetchMAList()
      setIsSubmitting(false)
      return true
    } catch (e: any) {
      console.error("M&A 항목 추가 중 예외 발생:", e)
      alert(`M&A 항목 추가 중 예상치 못한 시스템 오류가 발생했습니다: ${e.message}`)
      setIsSubmitting(false)
      return false
    }
  }

  // M&A 항목 삭제
  const handleDeleteMAItem = async (id: string) => {
    if (!isAdmin || !confirm("정말 삭제하시겠습니까?")) return

    try {
      const { error } = await supabase.from("ma_list").delete().eq("id", id)

      if (error) {
        alert(`M&A 항목 삭제 중 오류가 발생했습니다: ${error.message}`)
        return
      }

      fetchMAList()
      alert("M&A 항목이 성공적으로 삭제되었습니다.")
    } catch (error) {
      alert("M&A 항목 삭제 중 예상치 못한 오류가 발생했습니다.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 관리자가 아닌 경우 로그인 화면 표시
  if (!isAdmin) {
    return <AdminLogin handleAdminLogin={handleAdminLogin} currentUser={currentUser} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        <AdminHeader
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          handleLogout={handleLogout}
        />

        {/* 콘텐츠 영역 */}
        <main className="flex-1 p-8 overflow-auto">
          {/* 에러 알림 */}
          {(errors.users || errors.maList || errors.valuationRequests) && (
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">설정 필요</AlertTitle>
              <AlertDescription className="text-amber-700">
                {errors.users && (
                  <div className="mb-2">
                    <strong>회원 관리:</strong> {errors.users}
                  </div>
                )}
                {errors.maList && (
                  <div className="mb-2">
                    <strong>M&A 관리:</strong> {errors.maList}
                  </div>
                )}
                {errors.valuationRequests && (
                  <div>
                    <strong>가치산정 요청 관리:</strong> {errors.valuationRequests}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* 섹션별 컴포넌트 렌더링 */}
          {activeSection === "dashboard" && (
            <Dashboard
              users={users}
              maList={maList}
              valuationRequests={valuationRequests}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "users" && <UserManagement users={users} errors={errors} />}

          {activeSection === "ma-list" && (
            <MAListManagement
              maList={maList}
              errors={errors}
              handleAddMAItem={handleAddMAItem}
              handleDeleteMAItem={handleDeleteMAItem}
              isSubmitting={isSubmitting}
            />
          )}

          {activeSection === "valuation-requests" && (
            <ValuationRequestManagement
              valuationRequests={valuationRequests}
              errors={errors}
              handleDeleteValuationRequest={handleDeleteValuationRequest}
              handleUpdateStatus={handleUpdateValuationStatus}
              isSubmitting={isSubmitting}
            />
          )}

          {activeSection === "reports" && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">리포트 기능</h3>
              <p className="text-gray-600">리포트 기능이 곧 추가될 예정입니다.</p>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">설정</h3>
              <p className="text-gray-600">설정 기능이 곧 추가될 예정입니다.</p>
            </div>
          )}

          {activeSection === "help" && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">도움말</h3>
              <p className="text-gray-600">도움말 기능이 곧 추가될 예정입니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
