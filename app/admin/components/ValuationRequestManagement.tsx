"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, Eye, Trash2, RefreshCw, Building, MapPin, Phone, DollarSign } from "lucide-react"

interface ValuationRequest {
  id: string
  company_name: string
  industry: string
  region: string
  revenue: number
  operating_profit: number
  net_assets: number
  contact_person: string
  contact_email: string
  contact_phone: string
  company_description?: string
  business_model?: string
  competitive_advantage?: string
  status: string
  created_at: string
}

interface ValuationRequestManagementProps {
  valuationRequests: ValuationRequest[]
  errors: { valuationRequests?: string }
  handleDeleteValuationRequest: (id: string) => Promise<void>
  handleUpdateStatus: (id: string, status: string) => Promise<void>
  isSubmitting: boolean
}

export default function ValuationRequestManagement({
  valuationRequests,
  errors,
  handleDeleteValuationRequest,
  handleUpdateStatus,
  isSubmitting,
}: ValuationRequestManagementProps) {
  const [selectedRequest, setSelectedRequest] = useState<ValuationRequest | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // 상태별 색상 매핑
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            대기중
          </Badge>
        )
      case "in_review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            검토중
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            완료
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            거절
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`
    } else {
      return `${amount.toLocaleString()}원`
    }
  }

  // 필터링된 요청 목록
  const filteredRequests = valuationRequests.filter((request) => {
    if (statusFilter === "all") return true
    return request.status === statusFilter
  })

  // 상태별 통계
  const statusCounts = {
    total: valuationRequests.length,
    pending: valuationRequests.filter((r) => r.status === "pending").length,
    in_review: valuationRequests.filter((r) => r.status === "in_review").length,
    completed: valuationRequests.filter((r) => r.status === "completed").length,
    rejected: valuationRequests.filter((r) => r.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">가치산정 요청 관리</h2>
          <p className="text-gray-600 mt-1">기업 가치산정 요청을 관리하고 처리합니다</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline" disabled={isSubmitting}>
          <RefreshCw className="h-4 w-4 mr-2" />
          새로고침
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
            <div className="text-sm text-gray-600">전체 요청</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-sm text-gray-600">대기중</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.in_review}</div>
            <div className="text-sm text-gray-600">검토중</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
            <div className="text-sm text-gray-600">완료</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
            <div className="text-sm text-gray-600">거절</div>
          </CardContent>
        </Card>
      </div>

      {/* 에러 표시 */}
      {errors.valuationRequests && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{errors.valuationRequests}</AlertDescription>
        </Alert>
      )}

      {/* 필터 */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">상태 필터:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
              <SelectItem value="in_review">검토중</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
              <SelectItem value="rejected">거절</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 가치산정 요청 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>가치산정 요청 목록 ({filteredRequests.length}건)</CardTitle>
          <CardDescription>기업에서 요청한 가치산정 신청서를 확인하고 관리할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {statusFilter === "all" ? "가치산정 요청이 없습니다" : `${statusFilter} 상태의 요청이 없습니다`}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>회사명</TableHead>
                    <TableHead>업종</TableHead>
                    <TableHead>지역</TableHead>
                    <TableHead>매출액</TableHead>
                    <TableHead>담당자</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>신청일</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.company_name}</TableCell>
                      <TableCell>{request.industry}</TableCell>
                      <TableCell>{request.region}</TableCell>
                      <TableCell>{formatCurrency(request.revenue)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.contact_person}</div>
                          <div className="text-sm text-gray-500">{request.contact_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleDateString("ko-KR")}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>가치산정 요청 상세</DialogTitle>
                                <DialogDescription>
                                  {selectedRequest?.company_name}의 가치산정 요청 정보
                                </DialogDescription>
                              </DialogHeader>
                              {selectedRequest && (
                                <div className="space-y-6">
                                  {/* 기본 정보 */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">회사명</span>
                                      </div>
                                      <p className="text-sm">{selectedRequest.company_name}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">업종 / 지역</span>
                                      </div>
                                      <p className="text-sm">
                                        {selectedRequest.industry} / {selectedRequest.region}
                                      </p>
                                    </div>
                                  </div>

                                  {/* 재무 정보 */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <DollarSign className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">재무 정보</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">매출액:</span>
                                        <p className="font-medium">{formatCurrency(selectedRequest.revenue)}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">영업이익:</span>
                                        <p className="font-medium">
                                          {formatCurrency(selectedRequest.operating_profit)}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">순자산:</span>
                                        <p className="font-medium">{formatCurrency(selectedRequest.net_assets)}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* 담당자 정보 */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">담당자 정보</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">이름:</span>
                                        <p className="font-medium">{selectedRequest.contact_person}</p>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">연락처:</span>
                                        <p className="font-medium">{selectedRequest.contact_phone}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-gray-600">이메일:</span>
                                        <p className="font-medium">{selectedRequest.contact_email}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* 추가 정보 */}
                                  {(selectedRequest.company_description ||
                                    selectedRequest.business_model ||
                                    selectedRequest.competitive_advantage) && (
                                    <div className="space-y-4">
                                      {selectedRequest.company_description && (
                                        <div>
                                          <span className="font-medium">회사 설명:</span>
                                          <p className="text-sm mt-1 text-gray-700">
                                            {selectedRequest.company_description}
                                          </p>
                                        </div>
                                      )}
                                      {selectedRequest.business_model && (
                                        <div>
                                          <span className="font-medium">비즈니스 모델:</span>
                                          <p className="text-sm mt-1 text-gray-700">{selectedRequest.business_model}</p>
                                        </div>
                                      )}
                                      {selectedRequest.competitive_advantage && (
                                        <div>
                                          <span className="font-medium">경쟁 우위:</span>
                                          <p className="text-sm mt-1 text-gray-700">
                                            {selectedRequest.competitive_advantage}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* 상태 변경 */}
                                  <div className="flex items-center gap-4 pt-4 border-t">
                                    <span className="font-medium">상태 변경:</span>
                                    <Select
                                      value={selectedRequest.status}
                                      onValueChange={(value) => handleUpdateStatus(selectedRequest.id, value)}
                                    >
                                      <SelectTrigger className="w-32">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">대기중</SelectItem>
                                        <SelectItem value="in_review">검토중</SelectItem>
                                        <SelectItem value="completed">완료</SelectItem>
                                        <SelectItem value="rejected">거절</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteValuationRequest(request.id)}
                            disabled={isSubmitting}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
