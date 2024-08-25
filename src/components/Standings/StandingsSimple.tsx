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
    <div className="max-w-[300px] rounded-xl bg-white max-md:w-1/2">
      {isLoading ? (
        <div className="px-28 py-80">
          <Spinner />
        </div>
      ) : (
        <div className="p-3 pb-1">
          <div className="flex justify-center rounded-md bg-epl_purple py-[10px] font-bold text-white">
            현재순위
          </div>
          {standings.map((team, idx) => {
            return (
              <div
                className={`flex py-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center ${getPositionBorder(idx + 1)}`}
                key={team.team.name}
              >
                <div className="w-[55px] pl-3 text-lg font-bold max-md:w-[45px] max-md:pl-1">
                  {team.position}&nbsp;&nbsp;・
                </div>
                <div className="flex w-[calc(100%-55px)] items-center gap-4 max-md:w-[calc(100%-45px)]">
                  <Image src={team.team.crest} alt={team.team.name} width={30} height={30} />
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap max-md:hidden">
                    {teamKorName[team.team.tla] || team.team.shortName}
                  </div>
                  <div className="hidden font-semibold max-md:block">{team.team.tla}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default Standings
