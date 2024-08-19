import { getStandings } from "@/apis/getLeagueData"
import { useQuery } from "@tanstack/react-query"

const useStandings = () => {
  const query = useQuery({
    queryKey: ["standings"],
    queryFn: async () => {
      const res = await getStandings()
      return res.standings[0].table
    },
  })

  return { ...query }
}
export default useStandings
