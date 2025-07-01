"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LogIn, AlertCircle } from "lucide-react"

interface AdminLoginProps {
  handleAdminLogin: (email: string, password: string) => Promise<void>
  currentUser: any
}

export default function AdminLogin({ handleAdminLogin, currentUser }: AdminLoginProps) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async () => {
    await handleAdminLogin(loginForm.email, loginForm.password)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="h-16 w-16 mx-auto mb-6 bg-orange-100 rounded-2xl flex items-center justify-center">
            <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-16 w-16 object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">관리자 로그인</CardTitle>
          <CardDescription className="text-gray-600">M&A 플랫폼 관리자 권한이 필요합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              placeholder="admin@pwc.com"
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              placeholder=""
              className="h-12"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium"
          >
            <LogIn className="w-5 h-5 mr-2" />
            관리자 로그인
          </Button>
          {currentUser && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">권한 없음</AlertTitle>
              <AlertDescription className="text-amber-700">
                현재 로그인된 계정({currentUser.email})은 관리자 권한이 없습니다.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
