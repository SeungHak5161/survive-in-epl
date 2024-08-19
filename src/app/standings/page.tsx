"use client"

import StandingsFull from "@/components/Standings/StandingsFull"
import useStandings from "@/hooks/useStandings"

const standings = () => {
  const { data: standings, isLoading: isStandingsLoading } = useStandings()

  return (
    <div className="mx-auto max-w-[1200px] p-3">
      <StandingsFull standings={standings} isLoading={isStandingsLoading} />
    </div>
  )
}
export default standings
