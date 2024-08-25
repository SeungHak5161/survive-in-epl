"use client"

import Image from "next/image"

import Spinner from "@/components/Spinner/Spinner"
import { teamKorName } from "@/constants/enum"

const PredictCard = ({ predictData, isLoading }: { predictData: IPredict; isLoading: boolean }) => {
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
    <div className="h-full max-w-[300px] rounded-xl bg-white p-3 pb-1 max-md:w-full">
      {isLoading ? (
        <div className="py-80">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex flex-grow items-center justify-center whitespace-nowrap rounded-md bg-epl_purple px-2 font-bold text-white">
              {predictData.name}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs">유사도:</span>
              <span className="text-lg font-semibold">{predictData.accuracy.toFixed(1)}%</span>
            </div>
          </div>
          {predictData.predict.map((team, idx) => {
            return (
              <div
                className={`flex py-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center ${getPositionBorder(idx + 1)}`}
                key={team.tla}
              >
                <div className="w-[55px] pl-3 text-lg font-bold max-md:w-[45px] max-md:pl-1">
                  {team.position}&nbsp;&nbsp;・
                </div>
                <div className="flex w-[calc(100%-55px)] items-center gap-4 max-md:w-[calc(100%-45px)]">
                  <Image src={team.crest} alt={team.tla} width={30} height={30} />
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap max-md:hidden">
                    {teamKorName[team.tla] || team.tla}
                  </div>
                  <div className="hidden font-semibold max-md:block">{team.tla}</div>
                </div>
                <span
                  className={`text-sm font-light ${team.diff === "✅" ? "text-gray-700" : String(team.diff).startsWith("+") ? "text-blue-700" : "text-red-600"}`}
                >
                  {team.diff}
                </span>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
export default PredictCard
