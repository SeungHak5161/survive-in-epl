"use client"

import MatchesFull from "@/components/Matches/MatchesFull"
import useMatchess from "@/hooks/useMatches"

const matches = () => {
  const { data: matches, isLoading: isMatchesLoading } = useMatchess()
  return (
    <div className="mx-auto max-w-[1200px] p-3">
      <MatchesFull matches={matches} isLoading={isMatchesLoading} />
    </div>
  )
}
export default matches
