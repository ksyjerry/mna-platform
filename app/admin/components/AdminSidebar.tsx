"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Users, Building2, FileText, Settings, HelpCircle, Home } from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  const sidebarItems = [
    { id: "dashboard", label: "대시보드", icon: BarChart3 },
    { id: "users", label: "회원 관리", icon: Users },
    { id: "ma-list", label: "M&A 관리", icon: Building2 },
    { id: "valuation-requests", label: "가치산정 요청관리", icon: FileText },
    { id: "reports", label: "리포트", icon: FileText },
    { id: "settings", label: "설정", icon: Settings },
    { id: "help", label: "도움말", icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* 로고 및 제목 - 높이 조정 */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center h-[73px]">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex items-center justify-center flex-shrink-0">
            <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-10 w-10 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-lg text-orange-600 leading-tight">M&A Platform</h1>
            <p className="text-xs text-gray-500 mt-0.5">Admin Page</p>
          </div>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-orange-100 text-orange-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 하단 메뉴 */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={() => (window.location.href = "/")}
          className="w-full justify-start text-gray-600 hover:text-gray-900"
        >
          <Home className="h-5 w-5 mr-3" />
          메인 페이지로
        </Button>
      </div>
    </div>
  )
}
