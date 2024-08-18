"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

import { getStandings } from "@/apis/getLeagueData"
import Spinner from "@/components/Spinner/Spinner"

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
    <>
      {!standings ? (
        <div className="py-80">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-2 grid grid-cols-9 rounded-xl bg-blue-50 py-2 [&_div]:font-semibold">
            <div className="flex justify-center">순위</div>
            <div className="col-span-3 flex justify-center">팀</div>
            <div className="flex justify-center">경기</div>
            <div className="flex justify-center">승</div>
            <div className="flex justify-center">무</div>
            <div className="flex justify-center">패</div>
            <div className="flex justify-center">승점</div>
          </div>
          {standings.map((team, idx) => {
            return (
              <div
                className={`grid grid-cols-9 py-2 ${getPositionBorder(idx + 1)}`}
                key={team.team.name}
              >
                <div className="flex justify-center">{team.position}</div>
                <div className="col-span-3 flex gap-4">
                  <Image src={team.team.crest} alt={team.team.name} width={30} height={30} />
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {team.team.shortName}
                  </div>
                </div>

                <div className="flex justify-center">{team.playedGames}</div>
                <div className="flex justify-center">{team.won}</div>
                <div className="flex justify-center">{team.draw}</div>
                <div className="flex justify-center">{team.lost}</div>
                <div className="flex justify-center">{team.points}</div>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}
export default Standings
