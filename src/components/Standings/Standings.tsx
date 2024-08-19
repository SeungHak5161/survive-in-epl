"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

import { getStandings } from "@/apis/getLeagueData"
import Spinner from "@/components/Spinner/Spinner"
import { teamKorName } from "@/constants/enum"

const Standings = () => {
  const [standings, setStandings] = useState<IStandings[]>()

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

  useEffect(() => {
    const init = async () => {
      const standingRes = await getStandings()
      setStandings(standingRes.standings[0].table)
    }
    init()
  }, [])
  return (
    <div className="rounded-xl bg-white p-3 pb-1">
      {!standings ? (
        <div className="py-80">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-2 grid grid-cols-9 rounded-xl bg-blue-50 py-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center [&_span]:font-semibold">
            <span>순위</span>
            <span className="col-span-3">팀</span>
            <span>경기</span>
            <span>승</span>
            <span>무</span>
            <span>패</span>
            <span>승점</span>
          </div>
          {standings.map((team, idx) => {
            return (
              <div
                className={`grid grid-cols-9 py-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center ${getPositionBorder(idx + 1)}`}
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
                <span>{team.won}</span>
                <span>{team.draw}</span>
                <span>{team.lost}</span>
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
