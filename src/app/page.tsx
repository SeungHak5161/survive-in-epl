"use client"

import Matches from "@/components/Matches/Matches"
import Standings from "@/components/Standings/Standings"

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px] px-3 py-5 max-md:px-5">
      <div className="grid grid-cols-2 gap-3 max-md:flex max-md:flex-col">
        <div className="col-span-2">
          <Matches />
        </div>
        <div className="">예측 순위</div>
        <div className="row-span-2">
          <Standings />
        </div>
        <div className="">선수 스탯</div>
      </div>
    </div>
  )
}
