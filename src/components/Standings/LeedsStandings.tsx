"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

import Spinner from "@/components/Spinner/Spinner"

const LeedsStandings = ({
  standings,
  isLoading,
}: {
  standings: IStandings[]
  isLoading: boolean
}) => {
  const [leeds, setLeeds] = useState<IStandings>()

  const onClickEaster = () => {
    const easterEgg = document.createElement("div")
    easterEgg.style.position = "fixed"
    easterEgg.style.top = "0"
    easterEgg.style.left = "0"
    easterEgg.style.width = "100%"
    easterEgg.style.height = "100%"
    easterEgg.style.display = "flex"
    easterEgg.style.justifyContent = "center"
    easterEgg.style.alignItems = "center"

    const image = document.createElement("img")

    image.style.width = "50%"
    if (document.body.clientWidth < 768) {
      image.style.width = "80%"
    }
    image.src = "/images/gray.webp"
    easterEgg.appendChild(image)
    document.body.appendChild(easterEgg)

    setTimeout(() => {
      document.body.removeChild(easterEgg)
    }, 2000)
  }

  useEffect(() => {
    if (isLoading || !standings) return
    const leeds = standings.find((team) => team.team.tla === "LEE")
    setLeeds(leeds)
  }, [standings, isLoading])

  return (
    <div className="rounded-xl bg-white p-3">
      {isLoading || !leeds ? (
        <div className="py-8">
          <Spinner />
        </div>
      ) : (
        <div
          className="flex items-center justify-center gap-3 max-md:gap-1"
          onClick={onClickEaster}
        >
          <Image src={leeds.team.crest} alt={leeds.team.name} width={50} height={50} />
          <div className="flex flex-col items-end justify-center whitespace-nowrap text-lg max-md:text-base">
            <div className="flex items-center">
              현재&nbsp;잉글랜드&nbsp;
              <span className="font-semibold">2부리그</span>&nbsp;소속의&nbsp;
              <span className="font-bold">리즈 유나이티드</span>는&nbsp;
            </div>
            <div className="flex items-center">
              <span className="font-semibold">{leeds.playedGames}전</span>&nbsp;
              <span className="font-semibold text-blue-700">{leeds.won}</span>승&nbsp;
              <span className="font-semibold text-yellow-500">{leeds.draw}</span>무&nbsp;
              <span className="font-semibold text-red-600">{leeds.lost}</span>패로&nbsp; 승점&nbsp;
              <span className="font-semibold">{leeds.points}점</span>이며&nbsp;
              <div className="flex items-center justify-center">
                <div
                  className={`flex aspect-square w-8 items-center justify-center rounded-md bg-epl_purple font-bold text-white ${leeds.position <= 2 && "bg-gradient-to-tr from-blue-600 to-green-500"} ${leeds.position >= 3 && leeds.position <= 6 && "bg-gradient-to-tr from-blue-800 to-green-700"}`}
                >
                  {leeds.position}
                </div>
              </div>
              <span className="font-semibold">위</span>&nbsp;입니다.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeedsStandings
