import type { Metadata } from "next"
import localFont from "next/font/local"

import GNB from "@/components/GNB/GNB"
import QueryProviders from "@/components/app/provider"

import "./globals.css"

const pretendard = localFont({
  src: [
    {
      path: "./font/Pretendard-Thin.subset.woff2",
      weight: "100",
      style: "thin",
    },
    {
      path: "./font/Pretendard-Light.subset.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "./font/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "./font/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./font/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "semiBold",
    },
    {
      path: "./font/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "bold",
    },
  ],
})

export const metadata: Metadata = {
  title: "Survive in EPL",
  description: "EPL에서 살아남기",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="bg-slate-100 pt-[60px]">
        <QueryProviders>
          <GNB />
          {children}
        </QueryProviders>
      </body>
    </html>
  )
}
