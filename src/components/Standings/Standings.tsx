"use client"

import Image from "next/image"

import Spinner from "@/components/Spinner/Spinner"
import { teamKorName } from "@/constants/enum"

const Standings = ({ standings, isLoading }: { standings: IStandings[]; isLoading: boolean }) => {
  const getPositionBorder = (position: number) => {
    switch (position) {
      case 1:
        return "border-b-[1px] border-b-yellow-500"
      case 4:
        return "border-b-[1px] border-b-blue-700"
      case 5:
        return "border-b-[1px] border-b-green-500"
      case 17:
        return "border-b-[1px] border-b-red-500"
      case 20:
        return ""
      default:
        return "border-b-[1px] border-b-slate-200"
    }
  }
  return (
    <div className="rounded-xl bg-white p-3 pb-1">
      {isLoading ? (
        <div className="py-80">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-2 grid grid-cols-6 rounded-xl bg-blue-50 py-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center [&_span]:font-semibold">
            <span>순위</span>
            <span className="col-span-3">팀</span>
            <span>경기</span>
            <span>승점</span>
          </div>
          {standings.map((team, idx) => {
            return (
              <div
                className={`grid grid-cols-6 py-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center ${getPositionBorder(idx + 1)}`}
                key={team.team.name}
              >
                <span>{team.position}</span>
                <div className="col-span-3 flex items-center gap-4">
                  <Image src={team.team.crest} alt={team.team.name} width={30} height={30} />
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {teamKorName[team.team.tla] || team.team.shortName}
                  </div>
                </div>

                <span>{team.playedGames}</span>
                <span className="font-semibold">{team.points}</span>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
export default Standings
