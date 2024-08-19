import { useQuery } from "@tanstack/react-query"

import useStandings from "./useStandings"

const useTeamData = () => {
  const { data: standings } = useStandings()

  const query = useQuery({
    queryKey: ["teamData"],
    queryFn: () => {
      if (!standings) return []
      const teamData = standings.map((team: any) => {
        return {
          team: team.team.tla,
          crest: team.team.crest,
          rank: team.position,
        }
      })
      return teamData
    },
    enabled: !!standings,
  })

  return { ...query }
}
export default useTeamData
