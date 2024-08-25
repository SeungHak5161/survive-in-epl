"use client"

import Image from "next/image"

import { teamKorName, teamStadium } from "@/constants/enum"
import dayjs from "dayjs"

import Spinner from "../Spinner/Spinner"

const Matches = ({ matches, isLoading }: { matches: IMatch[]; isLoading: boolean }) => {
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
  return (
    <div className="flex flex-col rounded-xl bg-white px-5">
      {isLoading ? (
        <div className="py-96">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col content-between py-3">
          {matches.map((match: any, idx) => {
            return (
              <div
                key={match.id}
                className={`flex flex-col items-start gap-3 ${(idx + 1) % 5 !== 0 && "border-b-[1px] border-b-slate-200"} py-2`}
              >
                <div className="flex w-full justify-between">
                  <span
                    className={`font-bold text-epl_purple ${dayjs(match.utcDate).isSame(dayjs(), "days") && "text-red-500"}`}
                  >
                    {dayjs(match.utcDate).format("YY/MM/DD")}
                  </span>

                  <div className="flex max-w-[calc(100%-80px)] justify-center font-light max-lg:text-sm max-md:text-xs">
                    <span
                      className={`${match.referees.length !== 0 && "max-w-[45%]"} overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light`}
                    >
                      {teamStadium[match.homeTeam.tla]}
                    </span>
                    {match.referees.map((referee: any) => {
                      return (
                        <span
                          key={referee.id}
                          className="max-w-[55%] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light"
                        >
                          &nbsp;/&nbsp;
                          {referee.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="flex h-6 w-9 items-center justify-center rounded-md bg-epl_purple font-semibold text-white">
                    {match.matchday}R
                  </div>
                  <div className="flex w-[calc((100%-122px)/2)] flex-grow-0 items-center justify-end gap-2 whitespace-nowrap">
                    <span className="inline-block overflow-hidden text-ellipsis">
                      {teamKorName[match.homeTeam.tla] || match.homeTeam.shortName}
                    </span>
                    <Image
                      className="inline-block"
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.shortName}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div
                    className={`flex w-14 items-center justify-center rounded-md ${classifyMatchStatus(match.status) === "before" && "border-[1px] border-gray-400"} ${classifyMatchStatus(match.status) === "inplay" && "bg-gradient-to-r from-green-500 to-blue-700"} ${classifyMatchStatus(match.status) === "finished" && "bg-gray-500"} `}
                  >
                    {classifyMatchStatus(match.status) === "before" && (
                      <span className="font-semibold">{dayjs(match.utcDate).format("HH:mm")}</span>
                    )}
                    {(classifyMatchStatus(match.status) === "inplay" ||
                      classifyMatchStatus(match.status) === "finished") && (
                      <span className="font-bold text-white">
                        {match.score.fullTime.home} : {match.score.fullTime.away}
                      </span>
                    )}
                  </div>
                  <div className="flex w-[calc((100%-122px)/2)] flex-grow-0 items-center gap-2 whitespace-nowrap">
                    <Image
                      className="inline-block"
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.shortName}
                      width={40}
                      height={40}
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
