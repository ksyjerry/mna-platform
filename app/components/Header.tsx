"use client"

import { useAuth } from "../../contexts/AuthContext"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const { user, userProfile, loading, signOut } = useAuth()
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      console.log("🚪 헤더에서 로그아웃 시작...")
      await signOut()
      console.log("✅ 헤더 로그아웃 완료, 페이지 이동...")
      window.location.href = "/"
    } catch (error) {
      console.error("❌ 헤더 로그아웃 실패:", error)
    }
  }

  const handleLinkClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4eee7] px-10 py-0 bg-[#fcfaf8]">
      <Link
        href="/"
        className="flex items-center gap-4 text-[#1c150d] hover:opacity-80 transition-opacity duration-200"
      >
        <div className="h-20 w-20">
          <img src="/pwc_logo_light.png" alt="PwC Logo" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[#1c150d] text-lg font-bold leading-tight tracking-[-0.015em]">M&A Platform</h2>
          <span className="text-[#9c7849] text-xs my-px text-orange-600 font-medium">삼일회계법인</span>
        </div>
      </Link>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link
            href="/why-pwc"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname === "/why-pwc"
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            Why PwC
          </Link>
          <Link
            href="/services"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname.startsWith("/services")
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            서비스 소개
          </Link>
          <Link
            href="/valuation"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname.startsWith("/valuation")
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            Valuation
          </Link>
          <Link
            href="/find-investors"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname.startsWith("/find-investors")
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            Find Investors
          </Link>
          <Link
            href="/ma-list"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname.startsWith("/ma-list")
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            M&A List
          </Link>
          <Link
            href="/ma-cases"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname.startsWith("/ma-cases")
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            M&A Cases
          </Link>
          <Link
            href="/resources"
            onClick={handleLinkClick}
            className={`text-sm font-medium leading-normal transition-all duration-300 ease-in-out ${
              pathname.startsWith("/resources")
                ? "text-[#ff6600] font-bold border-b-2 border-[#ff6600]"
                : "text-[#1c150d] hover:text-[#ff6600]"
            }`}
          >
            자료실
          </Link>
        </div>
        <div className="flex gap-2">
          {loading ? (
            <div className="flex gap-2">
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-xl"></div>
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-xl"></div>
            </div>
          ) : (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-[#1c150d] text-sm font-medium">
                    {userProfile?.name || user.email?.split("@")[0] || "사용자"}님
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 px-4 bg-[#ff6600] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e55a00] hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <span className="truncate">로그아웃</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 px-4 bg-[#ff6600] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e55a00] hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <span className="truncate">로그인</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={handleLinkClick}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 px-4 bg-[#f4eee7] text-[#1c150d] text-sm font-bold leading-normal tracking-[0.015em] border border-gray-300 hover:bg-[#ff6600] hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <span className="truncate">회원가입</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
