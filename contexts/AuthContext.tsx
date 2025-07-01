"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "../lib/supabase/client"

interface UserProfile {
  id: string
  name: string
  email: string
  user_type: string
  company: string
  industry: string
  phone: string
  position?: string
  interested_industries?: string
  newsletter_consent: boolean
  marketing_consent: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("👤 사용자 프로필 조회 시작:", userId)

      // 먼저 배열로 조회 (single() 사용 안함)
      const { data: profiles, error } = await supabase.from("user_profiles").select("*").eq("id", userId)

      console.log("👤 프로필 조회 결과:", {
        profilesCount: profiles?.length || 0,
        error: error?.message,
        profiles: profiles,
      })

      if (error) {
        console.error("❌ 프로필 조회 에러:", error)
        return null
      }

      // 프로필이 없는 경우
      if (!profiles || profiles.length === 0) {
        console.log("🔧 프로필이 없어서 기본 프로필 생성 시도...")
        return await createDefaultProfile(userId)
      }

      // 중복 프로필이 있는 경우 첫 번째만 사용하고 나머지 삭제
      if (profiles.length > 1) {
        console.warn("⚠️ 중복 프로�� 발견:", profiles.length, "개")
        await cleanupDuplicateProfiles(userId, profiles)
      }

      const profile = profiles[0] as UserProfile
      console.log("✅ 프로필 조회 성공:", {
        name: profile.name,
        email: profile.email,
        isAdmin: profile.is_admin,
      })

      return profile
    } catch (error) {
      console.error("❌ 프로필 조회 실패:", error)
      return null
    }
  }

  const createDefaultProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("🆕 기본 프로필 생성:", userId)

      const { data: userData } = await supabase.auth.getUser()
      const email = userData.user?.email || ""

      const defaultProfile = {
        id: userId,
        user_type: "buyer",
        name: email.split("@")[0] || "사용자",
        company: "미등록",
        industry: "기타",
        phone: "미등록",
        email: email,
        newsletter_consent: false,
        marketing_consent: false,
        is_admin: email === "admin@pwc.com",
      }

      const { data: insertedProfiles, error } = await supabase.from("user_profiles").insert(defaultProfile).select("*")

      if (error) {
        console.error("❌ 기본 프로필 생성 실패:", error)
        return null
      }

      if (!insertedProfiles || insertedProfiles.length === 0) {
        console.error("❌ 프로필 생성 후 데이터 없음")
        return null
      }

      const createdProfile = insertedProfiles[0] as UserProfile
      console.log("✅ 기본 프로필 생성 완료:", {
        name: createdProfile.name,
        email: createdProfile.email,
        isAdmin: createdProfile.is_admin,
      })

      return createdProfile
    } catch (error) {
      console.error("❌ 기본 프로필 생성 중 오류:", error)
      return null
    }
  }

  const cleanupDuplicateProfiles = async (userId: string, profiles: any[]) => {
    try {
      console.log("🧹 중복 프로필 정리 시작:", userId)

      // 가장 최근 프로필을 제외하고 나머지 삭제
      const sortedProfiles = profiles.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )

      const profilesToDelete = sortedProfiles.slice(1)

      if (profilesToDelete.length > 0) {
        console.log("🗑️ 중복 프로필 삭제:", profilesToDelete.length, "개")

        // 각각 개별적으로 삭제 (batch delete 대신)
        for (const profile of profilesToDelete) {
          await supabase.from("user_profiles").delete().eq("id", profile.id).eq("created_at", profile.created_at)
        }
      }
    } catch (error) {
      console.error("❌ 중복 프로필 정리 실패:", error)
    }
  }

  useEffect(() => {
    console.log("🔄 AuthContext 초기화 시작...")

    const getInitialSession = async () => {
      try {
        console.log("🔍 초기 세션 확인...")

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        console.log("🔍 초기 세션 결과:", {
          hasSession: !!session,
          hasUser: !!session?.user,
          userId: session?.user?.id,
          userEmail: session?.user?.email,
          error: error?.message,
        })

        if (error) {
          console.error("❌ 세션 확인 에러:", error)
          setLoading(false)
          return
        }

        if (session?.user) {
          console.log("✅ 기존 세션 발견, 사용자 설정...")
          setUser(session.user)

          const profile = await fetchUserProfile(session.user.id)
          if (profile) {
            setUserProfile(profile)
            console.log("✅ 사용자 프로필 로드 완료:", {
              name: profile.name,
              email: profile.email,
              isAdmin: profile.is_admin,
            })
          } else {
            console.log("⚠️ 프로필 로드 실패, 사용자는 유지")
          }
        } else {
          console.log("ℹ️ 기존 세션 없음")
        }
      } catch (error) {
        console.error("❌ 초기 세션 확인 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 인증 상태 변경:", {
        event,
        hasSession: !!session,
        hasUser: !!session?.user,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
      })

      if (event === "SIGNED_IN" && session?.user) {
        console.log("✅ 로그인 이벤트 감지")
        setUser(session.user)

        const profile = await fetchUserProfile(session.user.id)
        if (profile) {
          setUserProfile(profile)
          console.log("✅ 프로필 로드 완료:", {
            name: profile.name,
            email: profile.email,
            isAdmin: profile.is_admin,
          })
        } else {
          console.log("⚠️ 프로필 로드 실패, 사용자는 유지")
        }
        setLoading(false)
      } else if (event === "SIGNED_OUT") {
        console.log("🚪 로그아웃 이벤트 감지")
        setUser(null)
        setUserProfile(null)
        setLoading(false)
      } else if (event === "TOKEN_REFRESHED") {
        console.log("🔄 토큰 갱신됨")
      }
    })

    return () => {
      console.log("🧹 AuthContext 정리...")
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    try {
      console.log("🚪 로그아웃 처리 시작...")
      setLoading(true)

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("❌ 로그아웃 에러:", error)
        throw error
      }

      console.log("✅ 로그아웃 완료")
      setUser(null)
      setUserProfile(null)
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signOut: handleSignOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
