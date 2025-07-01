"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Mail, Building, Calendar, AlertCircle, RefreshCw, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

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

interface UserManagementProps {
  users: UserProfile[]
  errors: { users?: string }
}

export default function UserManagement({ users, errors }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  // 검색 및 필터링
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || user.user_type === filterType

    return matchesSearch && matchesFilter
  })

  // 사용자 타입별 통계
  const userStats = {
    total: users.length,
    buyer: users.filter((u) => u.user_type === "buyer").length,
    seller: users.filter((u) => u.user_type === "seller").length,
    withEmail: users.filter((u) => u.email).length,
    newsletterConsent: users.filter((u) => u.newsletter_consent).length,
  }

  // 사용자 타입 한글 변환
  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "buyer":
        return "매수자"
      case "seller":
        return "매도자"
      default:
        return type
    }
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // CSV 내보내기
  const exportToCSV = () => {
    const headers = ["이름", "이메일", "회사", "업종", "전화번호", "직책", "사용자타입", "가입일"]
    const csvData = [
      headers.join(","),
      ...filteredUsers.map((user) =>
        [
          user.name || "",
          user.email || "",
          user.company || "",
          user.industry || "",
          user.phone || "",
          user.position || "",
          getUserTypeLabel(user.user_type),
          formatDate(user.created_at),
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `회원목록_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">회원 관리</h2>
          <p className="text-gray-600">등록된 회원 정보를 관리합니다</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            새로고침
          </Button>
          <Button onClick={exportToCSV} className="flex items-center gap-2" disabled={filteredUsers.length === 0}>
            <Download className="h-4 w-4" />
            CSV 내보내기
          </Button>
        </div>
      </div>

      {/* 에러 표시 */}
      {errors.users && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{errors.users}</AlertDescription>
        </Alert>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">전체 회원</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">매수자</p>
                <p className="text-2xl font-bold text-green-600">{userStats.buyer}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">매도자</p>
                <p className="text-2xl font-bold text-orange-600">{userStats.seller}</p>
              </div>
              <Building className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">이메일 보유</p>
                <p className="text-2xl font-bold text-purple-600">{userStats.withEmail}</p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">뉴스레터 동의</p>
                <p className="text-2xl font-bold text-indigo-600">{userStats.newsletterConsent}</p>
              </div>
              <Mail className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="이름, 이메일, 회사명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                전체
              </Button>
              <Button
                variant={filterType === "buyer" ? "default" : "outline"}
                onClick={() => setFilterType("buyer")}
                size="sm"
              >
                매수자
              </Button>
              <Button
                variant={filterType === "seller" ? "default" : "outline"}
                onClick={() => setFilterType("seller")}
                size="sm"
              >
                매도자
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 회원 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            회원 목록 ({filteredUsers.length}명)
          </CardTitle>
          <CardDescription>
            {searchTerm && `"${searchTerm}" 검색 결과`}
            {filterType !== "all" && ` • ${getUserTypeLabel(filterType)} 필터 적용`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {users.length === 0 ? "등록된 회원이 없습니다" : "검색 결과가 없습니다"}
              </h3>
              <p className="text-gray-600">
                {users.length === 0 ? "아직 등록된 회원이 없습니다." : "다른 검색어나 필터를 시도해보세요."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">이름</th>
                    <th className="text-left p-3 font-medium text-gray-900">이메일</th>
                    <th className="text-left p-3 font-medium text-gray-900">회사</th>
                    <th className="text-left p-3 font-medium text-gray-900">업종</th>
                    <th className="text-left p-3 font-medium text-gray-900">타입</th>
                    <th className="text-left p-3 font-medium text-gray-900">가입일</th>
                    <th className="text-left p-3 font-medium text-gray-900">동의</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        {user.position && <div className="text-sm text-gray-500">{user.position}</div>}
                      </td>
                      <td className="p-3">
                        {user.email ? (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">이메일 없음</span>
                        )}
                      </td>
                      <td className="p-3">
                        {user.company ? (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{user.company}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="text-sm">{user.industry || "-"}</span>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={user.user_type === "buyer" ? "default" : "secondary"}
                          className={
                            user.user_type === "buyer" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                          }
                        >
                          {getUserTypeLabel(user.user_type)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatDate(user.created_at)}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          <Badge variant={user.newsletter_consent ? "default" : "outline"} className="text-xs">
                            뉴스레터 {user.newsletter_consent ? "동의" : "거부"}
                          </Badge>
                          <Badge variant={user.marketing_consent ? "default" : "outline"} className="text-xs">
                            마케팅 {user.marketing_consent ? "동의" : "거부"}
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
