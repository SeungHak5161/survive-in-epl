"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

import { teamKorName } from "@/constants/enum"
import dayjs from "dayjs"

import Spinner from "../Spinner/Spinner"

const Matches = ({ matches, isLoading }: { matches: IMatch[]; isLoading: boolean }) => {
  const [matchData, setMatchData] = useState<IMatch[]>()

  const classifyMatchStatus = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "before"
      case "TIMED":
        return "before"
      case "IN_PLAY":
        return "inplay"
      case "PAUSED":
        return "inplay"
      case "EXTRA_TIME":
        return "inplay"
      case "PENALTY_SHOOTOUT":
        return "inplay"
      case "FINISHED":
        return "finished"
      case "SUSPENDED":
        return "finished"
      case "POSTPONED":
        return "cancled"
      case "CANCELLED":
        return "cancled"
      case "AWARDED":
        return "finished"
    }
  }
  useEffect(() => {
    const init = async () => {
      const notFinished = matches.filter((match: any) => {
        return match.status !== "FINISHED"
      })
      const furtherMatch = notFinished.slice(0, 10)
      setMatchData(furtherMatch)
    }
    if (matches) init()
  }, [matches])
  return (
    <div className="flex flex-col rounded-xl bg-white px-5">
      {isLoading ? (
        <div className="py-28">
          <Spinner />
        </div>
      ) : (
        <div className="flex max-h-[260px] flex-col flex-wrap content-between py-3 max-md:max-h-none">
          {matchData &&
            matchData.map((match: any, idx) => {
              return (
                <div
                  key={match.id}
                  className={`flex w-[calc(100%/2-16px)] items-center justify-between gap-3 ${(idx + 1) % 5 !== 0 && "border-b-[1px] border-b-slate-200"} py-2 max-md:w-full max-md:flex-col max-md:items-start`}
                >
                  <span
                    className={`font-bold text-epl_purple ${dayjs(match.utcDate).isSame(dayjs(), "days") && "text-red-500"}`}
                  >
                    {dayjs(match.utcDate).format("YY/MM/DD")}
                  </span>
                  <div className="flex w-full justify-center gap-2">
                    <div className="flex w-[calc((100%-80px)/2)] flex-grow-0 items-center justify-end gap-2 whitespace-nowrap">
                      <span className="inline-block overflow-hidden text-ellipsis">
                        {teamKorName[match.homeTeam.tla] || match.homeTeam.shortName}
                      </span>
                      <Image
                        className="inline-block"
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.shortName}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div
                      className={`flex w-14 items-center justify-center rounded-md ${classifyMatchStatus(match.status) === "before" && "border-[1px] border-gray-300"} ${classifyMatchStatus(match.status) === "inplay" && "bg-gradient-to-r from-green-500 to-blue-700"}`}
                    >
                      {classifyMatchStatus(match.status) === "before" && (
                        <span className="font-semibold">
                          {dayjs(match.utcDate).format("HH:mm")}
                        </span>
                      )}
                      {classifyMatchStatus(match.status) === "inplay" && (
                        <span className="font-bold text-white">
                          {match.score.fullTime.home} : {match.score.fullTime.away}
                        </span>
                      )}
                    </div>
                    <div className="flex w-[calc((100%-64px)/2)] flex-grow-0 items-center gap-2 whitespace-nowrap">
                      <Image
                        className="inline-block"
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.shortName}
                        width={30}
                        height={30}
                      />
                      <span className="inline-block overflow-hidden text-ellipsis">
                        {teamKorName[match.awayTeam.tla] || match.awayTeam.shortName}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
export default Matches
