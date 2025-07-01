"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../contexts/AuthContext"
import ClientLayout from "./ClientLayout" // Assuming this is the correct path from the new file
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          {isAdminPage ? (
            // 관리자 페이지는 독립적인 레이아웃 사용
            <div className="min-h-screen">{children}</div>
          ) : (
            // 일반 페이지는 기존 ClientLayout 사용
            <ClientLayout>{children}</ClientLayout>
          )}
        </AuthProvider>
      </body>
    </html>
  )
}
