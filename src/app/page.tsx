"use client"

import Matches from "@/components/Matches/Matches"
import PredictSimple from "@/components/Predict/PredictSimple"
import Standings from "@/components/Standings/Standings"
import useMatchess from "@/hooks/useMatches"
import usePredict from "@/hooks/usePredict"
import useStandings from "@/hooks/useStandings"

export default function Home() {
  const { data: standings, isLoading: isStandingsLoading } = useStandings()
  const { data: matches, isLoading: isMatchesLoading } = useMatchess()
  const { data: predictData, isLoading: isPredictDataLoading } = usePredict()

  return (
    <div className="mx-auto max-w-[1200px] px-3 py-5 max-md:px-5">
      <div className="grid grid-cols-2 gap-3 max-md:flex max-md:flex-col">
        <div className="col-span-2">
          <Matches matches={matches} isLoading={isMatchesLoading} />
        </div>
        <div className="">
          <PredictSimple predictData={predictData} isLoading={isPredictDataLoading} />
        </div>
        <div className="row-span-2">
          <Standings standings={standings} isLoading={isStandingsLoading} />
        </div>
        {/* <div className="">선수 스탯</div> */}
      </div>
    </div>
  )
}
