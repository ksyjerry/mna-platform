"use client"

import Link from "next/link"
import { Home, Settings } from "lucide-react"

export default function AdminFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-3">
        {/* Admin 페이지 버튼 */}
        <div className="relative group">
          <Link
            href="/admin"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group-hover:from-orange-600 group-hover:to-orange-700"
          >
            <Settings className="w-6 h-6" />
          </Link>

          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            관리자
          </div>
        </div>

        {/* 홈 페이지 버튼 */}
        <div className="relative group">
          <Link
            href="/"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group-hover:from-green-600 group-hover:to-green-700"
          >
            <Home className="w-6 h-6" />
          </Link>

          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            홈으로
          </div>
        </div>
      </div>
    </div>
  )
}
