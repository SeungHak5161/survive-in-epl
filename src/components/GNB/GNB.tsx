"use client"

import EplLogo from "@public/icons/epl_logo.svg"

const GNB = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-[59px] w-full items-center justify-around whitespace-nowrap bg-epl_purple px-24 max-md:px-16 max-sm:px-4">
      <button
        className="left-8 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white"
        aria-label="홈으로 이동"
      >
        <EplLogo className="h-[45px]" />
      </button>
      <div className="flex gap-8">
        <button className="text-xl font-bold text-white">리그 순위</button>
        <button className="text-xl font-bold text-white">경기 일정</button>
        <button className="text-xl font-bold text-white">예측 현황</button>
      </div>
    </div>
  )
}
export default GNB
