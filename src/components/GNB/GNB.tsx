"use client"

import Link from "next/link"

import EplLogo from "@public/icons/epl_logo.svg"

const GNB = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-[59px] w-full items-center justify-around whitespace-nowrap bg-epl_purple px-24 max-md:px-16 max-sm:px-4">
      <Link href="/">
        <button
          className="left-8 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white"
          aria-label="홈으로 이동"
        >
          <EplLogo className="h-[45px]" />
        </button>
      </Link>
      <div className="flex gap-8">
        <Link href="/standings">
          <button className="text-xl font-bold text-white">리그 순위</button>
        </Link>
        <Link href="/matches">
          <button className="text-xl font-bold text-white">경기 일정</button>
        </Link>
        <Link href="/predict">
          <button className="text-xl font-bold text-white">예측 현황</button>
        </Link>
      </div>
    </div>
  )
}
export default GNB
