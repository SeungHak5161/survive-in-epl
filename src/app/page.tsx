"use client"

import Standings from "@/components/Standings/Standings"

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px] py-[20px] max-md:px-[20px]">
      <div className="grid grid-cols-2 gap-3 max-md:flex max-md:flex-col">
        <div className="col-span-2">일정</div>
        <div className="">예측 순위</div>
        <div className="row-span-2 rounded-xl bg-white p-6">
          <Standings />
        </div>
        <div className="">선수 스탯</div>
      </div>
    </div>
  )
}
