import getDBData from "@/apis/getPredictData"
import { useQuery } from "@tanstack/react-query"

import useTeamData from "./useTeamData"

const usePredict = () => {
  const { data: teamData } = useTeamData()

  const query = useQuery({
    queryKey: ["predictData"],
    queryFn: async () => {
      const res = await getDBData()

      const predictData: IPredict[] = []
      // db 데이터에서 필요 데이터만 추출
      res.results.map((obj: any) => {
        const arr = obj.properties.predict.rich_text[0].plain_text.split(",")
        let diffSum = 0
        const predict = arr.map((el: string, idx: number) => {
          const team = teamData.find((team: any) => team.team === el)
          const diff = team.rank - (idx + 1)
          // 유사도 구하기용
          diff < 0 ? (diffSum += diff * -1) : (diffSum += diff)
          return {
            position: idx + 1,
            tla: el,
            crest: team.crest,
            diff: diff === 0 ? "✅" : diff > 0 ? `+${diff}` : diff,
          }
        })
        predictData.push({
          name: obj.properties.Name.title[0].plain_text,
          predict: predict,
          accuracy: ((20 - diffSum / 20) / 20) * 100,
        })
      })
      // 추출한 데이터 정확도 순으로 정렬
      predictData.sort((a, b) => b.accuracy - a.accuracy)

      return predictData
    },
    enabled: !!teamData,
  })

  return { ...query }
}
export default usePredict
