"use client"

import { useState } from "react"

import EnrollModal from "@/components/Modal/EnrollModal"
import PredictCard from "@/components/Predict/PredictCard"
import Spinner from "@/components/Spinner/Spinner"
import StandingsSimple from "@/components/Standings/StandingsSimple"
import usePredict from "@/hooks/usePredict"
import useStandings from "@/hooks/useStandings"
import dayjs from "dayjs"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const predict = () => {
  const [modalState, setModalState] = useState(false)
  const { data: standings, isLoading: isStandingsLoading } = useStandings()
  const { data: predictData, isLoading: isPredictDataLoading } = usePredict()

  const isPeriod = dayjs().isAfter(dayjs("2021-09-01"))

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-2 p-3">
      <div className="flex justify-center">
        <button
          onClick={() => setModalState(!modalState)}
          className={`w-full rounded-lg py-3 text-lg font-bold text-white ${!isPeriod || isStandingsLoading || isPredictDataLoading ? "cursor-not-allowed bg-gray-400" : "bg-red-500"}`}
          disabled={isPeriod || isStandingsLoading || isPredictDataLoading}
        >
          {isPeriod
            ? isStandingsLoading || isPredictDataLoading
              ? "로딩중"
              : "등록하기"
            : "등록 기간이 아닙니다"}
        </button>
      </div>
      <div className="flex gap-2">
        <StandingsSimple standings={standings} isLoading={isStandingsLoading} />
        <div className="w-[calc(100%-300px)] max-md:w-1/2">
          {isPredictDataLoading || !predictData ? (
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
              {predictData.map((obj, idx) => {
                return (
                  <SwiperSlide className="w-full" key={idx}>
                    <PredictCard predictData={obj} isLoading={isPredictDataLoading} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          )}
        </div>
      </div>
      {modalState && <EnrollModal setModalState={() => setModalState(false)} />}
    </div>
  )
}
export default predict
