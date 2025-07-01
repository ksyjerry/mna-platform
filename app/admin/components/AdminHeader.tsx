"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface AdminHeaderProps {
  currentUser: any
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  handleLogout: () => void
}

export default function AdminHeader({ currentUser, isDarkMode, setIsDarkMode, handleLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 h-[73px] flex items-center">
      <div className="flex items-center justify-end w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className="p-2">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">{currentUser?.email}</span>
          </div>
          <Button variant="outline" onClick={handleLogout} size="sm">
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  )
}
