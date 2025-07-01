"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react"
import { FILTER_OPTIONS } from "../../../lib/types/ma-list"

interface MAListManagementProps {
  maList: any[]
  errors: { maList?: string }
  handleAddMAItem: (item: any) => Promise<void>
  handleDeleteMAItem: (id: string) => Promise<void>
  isSubmitting: boolean
}

export default function MAListManagement({
  maList,
  errors,
  handleAddMAItem,
  handleDeleteMAItem,
  isSubmitting,
}: MAListManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMAItem, setNewMAItem] = useState({
    title: "",
    company_name: "",
    industry: "",
    deal_type: "",
    deal_size: "",
    location: "",
    description: "",
    status: "active",
    source: "삼일 PwC",
    deal_type_category: "매각",
    region: "수도권",
    image_url: "",
  })

  const handleSubmit = async () => {
    const success = await handleAddMAItem(newMAItem)
    if (success) {
      setNewMAItem({
        title: "",
        company_name: "",
        industry: "",
        deal_type: "",
        deal_size: "",
        location: "", // This was in initial state, keep for consistency if used elsewhere, though DB uses region
        description: "",
        status: "active",
        source: "삼일 PwC", // Default or from selection
        deal_type_category: "매각", // Default or from selection
        region: "수도권", // Default or from selection
        image_url: "",
      })
      setIsDialogOpen(false)
    }
    // If not successful, handleAddMAItem would have shown an alert,
    // and the dialog remains open for correction or re-submission.
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>M&A List 관리</CardTitle>
          <CardDescription>M&A 거래 목록을 관리할 수 있습니다.</CardDescription>
        </div>
        {!errors.maList && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />새 항목 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>새 M&A 항목 추가</DialogTitle>
                <DialogDescription>새로운 M&A 거래 정보를 입력해주세요.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">제목 *</Label>
                    <Input
                      id="title"
                      value={newMAItem.title}
                      onChange={(e) => setNewMAItem({ ...newMAItem, title: e.target.value })}
                      placeholder="거래 제목"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_name">회사명 *</Label>
                    <Input
                      id="company_name"
                      value={newMAItem.company_name}
                      onChange={(e) => setNewMAItem({ ...newMAItem, company_name: e.target.value })}
                      placeholder="회사명"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="source">주체 *</Label>
                    <Select
                      value={newMAItem.source}
                      onValueChange={(value) => setNewMAItem({ ...newMAItem, source: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="주체 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTER_OPTIONS.subject
                          .filter((option) => option.value !== "all")
                          .map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deal_type_category">카테고리 *</Label>
                    <Select
                      value={newMAItem.deal_type_category}
                      onValueChange={(value) => setNewMAItem({ ...newMAItem, deal_type_category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTER_OPTIONS.category
                          .filter((option) => option.value !== "all")
                          .map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="region">지역 *</Label>
                    <Select
                      value={newMAItem.region}
                      onValueChange={(value) => setNewMAItem({ ...newMAItem, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="지역 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTER_OPTIONS.region
                          .filter((option) => option.value !== "all")
                          .map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">업종 *</Label>
                    <Select
                      value={newMAItem.industry}
                      onValueChange={(value) => setNewMAItem({ ...newMAItem, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="업종 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILTER_OPTIONS.industry
                          .filter((option) => option.value !== "all")
                          .map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deal_size">거래 규모</Label>
                    <Input
                      id="deal_size"
                      value={newMAItem.deal_size}
                      onChange={(e) => setNewMAItem({ ...newMAItem, deal_size: e.target.value })}
                      placeholder="예: 100억원"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    value={newMAItem.description}
                    onChange={(e) => setNewMAItem({ ...newMAItem, description: e.target.value })}
                    placeholder="거래에 대한 상세 설명"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  취소
                </Button>
                <Button onClick={handleSubmit} className="bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                  {isSubmitting ? "추가 중..." : "추가"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {errors.maList ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>테이블 설정 필요</AlertTitle>
            <AlertDescription>{errors.maList}</AlertDescription>
          </Alert>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">제목</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">회사명</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">주체</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">카테고리</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">업종</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">상태</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {maList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-medium">{item.title}</td>
                    <td className="py-4 px-6 text-gray-600">{item.company_name}</td>
                    <td className="py-4 px-6">
                      <Badge
                        variant="outline"
                        className={
                          item.source === "삼일 PwC"
                            ? "border-orange-500 text-orange-700"
                            : "border-blue-500 text-blue-700"
                        }
                      >
                        {item.source}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{item.deal_type_category}</Badge>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.industry}</td>
                    <td className="py-4 px-6">
                      <Badge variant={item.status === "active" ? "default" : "secondary"}>
                        {item.status === "active" ? "활성" : "비활성"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteMAItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {maList.length === 0 && <div className="text-center py-12 text-gray-500">M&A 항목이 없습니다.</div>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
