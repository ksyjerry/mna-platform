import type React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AdminFloatingButton from "./components/AdminFloatingButton"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <AdminFloatingButton />
    </div>
  )
}
