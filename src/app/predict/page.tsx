"use client"

import { useEffect, useState } from "react"

import { getStandings } from "@/apis/getLeagueData"
import getDBData from "@/apis/getPredictData"
import PredictCard from "@/components/Predict/PredictCard"
import Spinner from "@/components/Spinner/Spinner"
import StandingsSimple from "@/components/Standings/StandingsSimple"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const predict = () => {
  const [predictData, setPredictData] = useState<IPredict[]>()
  const [standings, setStandings] = useState<IStandings[]>()
  const [teamData, setTeamData] = useState<any>()

  useEffect(() => {
    const getDB = async () => {
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

      setPredictData(predictData)
    }
    if (standings) getDB()
  }, [standings])

  useEffect(() => {
    const getRank = async () => {
      const res = await getStandings()
      setStandings(res.standings[0].table)

      const teamData = res.standings[0].table.map((team: any) => {
        return {
          team: team.team.tla,
          crest: team.team.crest,
          rank: team.position,
        }
      })
      setTeamData(teamData)
    }

    getRank()
  }, [])
  return (
    <div className="mx-auto flex max-w-[1200px] gap-2 p-3">
      <StandingsSimple standings={standings} />
      <div className="w-[calc(100%-300px)] max-md:w-1/2">
        {!predictData ? (
          <div className="rounded-xl bg-white py-80">
            <Spinner />
          </div>
        ) : (
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              900: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
            }}
          >
            <>
              {predictData.map((obj, idx) => {
                return (
                  <SwiperSlide className="w-full" key={idx}>
                    <PredictCard predictData={obj} />
                  </SwiperSlide>
                )
              })}
            </>
          </Swiper>
        )}
      </div>
    </div>
  )
}
export default predict
