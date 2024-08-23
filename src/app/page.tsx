"use client"

import Matches from "@/components/Matches/Matches"
import PredictSimple from "@/components/Predict/PredictSimple"
import LeedsStandings from "@/components/Standings/LeedsStandings"
import Standings from "@/components/Standings/Standings"
import useMatchess from "@/hooks/useMatches"
import usePredict from "@/hooks/usePredict"
import useStandings from "@/hooks/useStandings"
import useStandings2 from "@/hooks/useStandings2"

export default function Home() {
  const { data: standings, isLoading: isStandingsLoading } = useStandings()
  const { data: standings2, isLoading: isStanding2Loading } = useStandings2()
  const { data: matches, isLoading: isMatchesLoading } = useMatchess()
  const { data: predictData, isLoading: isPredictDataLoading } = usePredict()

  return (
    <div className="mx-auto max-w-[1200px] px-3 py-5 max-md:px-5">
      <div className="grid grid-cols-2 gap-3 max-md:flex max-md:flex-col">
        <div className="col-span-2">
          <Matches matches={matches} isLoading={isMatchesLoading} />
        </div>
        <div>
          <PredictSimple predictData={predictData} isLoading={isPredictDataLoading} />
        </div>
        <div className="row-span-3">
          <Standings standings={standings} isLoading={isStandingsLoading} />
        </div>
        <div>
          <LeedsStandings standings={standings2} isLoading={isStanding2Loading} />
        </div>
      </div>
    </div>
  )
}
