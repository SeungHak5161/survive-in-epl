import { getAllMatches } from "@/apis/getLeagueData"
import { useQuery } from "@tanstack/react-query"

const useMatchess = () => {
  const query = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await getAllMatches()
      return res.matches
    },
  })

  return { ...query }
}
export default useMatchess
