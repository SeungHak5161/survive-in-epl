"use client"

import Image from "next/image"

import Spinner from "@/components/Spinner/Spinner"
import { teamKorName } from "@/constants/enum"

const StandingsFull = ({
  standings,
  isLoading,
}: {
  standings: IStandings[]
  isLoading: boolean
}) => {
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
        <div className="py-96">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-2 grid grid-cols-12 rounded-xl bg-blue-50 py-2 max-sm:grid-cols-10 [&_span]:flex [&_span]:items-center [&_span]:justify-center [&_span]:font-semibold">
            <span>순위</span>
            <span className="col-span-3 max-sm:col-span-1">팀</span>
            <span>경기</span>
            <span>승</span>
            <span>무</span>
            <span>패</span>
            <span>득점</span>
            <span>실점</span>
            <span>득실</span>
            <span>승점</span>
          </div>
          {standings.map((team, idx) => {
            return (
              <div
                className={`grid grid-cols-12 py-2 max-sm:grid-cols-10 [&_span]:flex [&_span]:items-center [&_span]:justify-center ${getPositionBorder(idx + 1)}`}
                key={team.team.name}
              >
                <span>{team.position}</span>
                <div className="col-span-3 flex items-center gap-4 max-sm:col-span-1 max-sm:justify-center">
                  <Image src={team.team.crest} alt={team.team.name} width={30} height={30} />
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap max-sm:hidden">
                    {teamKorName[team.team.tla] || team.team.shortName}
                  </div>
                </div>

                <span className="font-semibold">{team.playedGames}</span>
                <span className="font-semibold text-blue-500">{team.won}</span>
                <span className="font-semibold text-yellow-500">{team.draw}</span>
                <span className="font-semibold text-red-500">{team.lost}</span>
                <span>{team.goalsFor}</span>
                <span>{team.goalsAgainst}</span>
                <span>{team.goalDifference}</span>
                <span className="font-semibold">{team.points}</span>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
export default StandingsFull
