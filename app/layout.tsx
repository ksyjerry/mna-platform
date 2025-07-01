import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./client-root-layout" // Import the new client component
import "./globals.css" // Ensure globals.css is imported here if not in ClientRootLayout

export const metadata: Metadata = {
  title: "M&A Platform", // Updated title for better context
  description: "M&A Data, User Profile, and Valuation Request Management", // Updated description
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}
