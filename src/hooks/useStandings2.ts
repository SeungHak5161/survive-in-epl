import { getStandings2 } from "@/apis/getLeagueData"
import { useQuery } from "@tanstack/react-query"

const useStandings2 = () => {
  const query = useQuery({
    queryKey: ["standings2"],
    queryFn: async () => {
      const res = await getStandings2()
      return res.standings[0].table
    },
  })

  return { ...query }
}
export default useStandings2
