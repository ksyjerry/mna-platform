"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Building2, BarChart3, User, FileText, ChevronRight } from "lucide-react"

interface DashboardProps {
  users: any[]
  maList: any[]
  valuationRequests: any[]
  setActiveSection: (section: string) => void
}

export default function Dashboard({ users, maList, valuationRequests, setActiveSection }: DashboardProps) {
  // 대시보드 카드 컴포넌트
  const DashboardCard = ({ title, description, icon: Icon, action, color = "orange" }: any) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-${color}-100`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        <Button
          variant="ghost"
          className="p-0 h-auto font-medium text-gray-700 hover:text-orange-600 group-hover:translate-x-1 transition-transform"
          onClick={action}
        >
          시작하기 <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 회원수</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">M&A 항목</p>
                <p className="text-3xl font-bold text-gray-900">{maList.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 거래</p>
                <p className="text-3xl font-bold text-gray-900">
                  {maList.filter((item) => item.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">매도자</p>
                <p className="text-3xl font-bold text-gray-900">
                  {users.filter((user) => user.user_type === "seller").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">가치산정 요청</p>
                <p className="text-3xl font-bold text-gray-900">{valuationRequests.length}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 주요 기능 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="회원 관리"
          description="등록된 회원들의 정보를 확인하고 관리합니다."
          icon={Users}
          action={() => setActiveSection("users")}
          color="blue"
        />
        <DashboardCard
          title="M&A 목록 관리"
          description="M&A 거래 목록을 추가, 수정, 삭제할 수 있습니다."
          icon={Building2}
          action={() => setActiveSection("ma-list")}
          color="green"
        />
        <DashboardCard
          title="리포트 생성"
          description="다양한 통계와 리포트를 생성하고 확인합니다."
          icon={FileText}
          action={() => setActiveSection("reports")}
          color="purple"
        />
        <DashboardCard
          title="가치산정 요청관리"
          description="기업 가치산정 요청을 확인하고 관리합니다."
          icon={FileText}
          action={() => setActiveSection("valuation-requests")}
          color="indigo"
        />
      </div>
    </div>
  )
}
