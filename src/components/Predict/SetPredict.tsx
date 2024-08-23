import Image from "next/image"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

import useTeamData from "@/hooks/useTeamData"

const SetPredict = ({ setState }: { setState: Dispatch<SetStateAction<string>> }) => {
  const { data: teamData } = useTeamData()
  const [teamList, setTeamList] = useState<any>(teamData)
  const [predictList, setPredictList] = useState<any>(
    Array.from({ length: 20 }, (_, idx) => {
      return { number: idx + 1, team: {} }
    }),
  )
  const [selectedIdx, setSelectedIdx] = useState<any>(undefined)

  const onClickItem = (idx: number) => {
    // 이미 팀이 선택되어 있으면 선택 해제 후 팀 리스트에 추가
    if (Object.entries(predictList[idx].team).length !== 0) {
      teamList.push(predictList[idx].team)
      setTeamList(teamList)

      const newPredictList = predictList.map((item: any, i: number) => {
        if (i === idx) {
          return { ...item, team: {} }
        } else {
          return { ...item }
        }
      })
      setPredictList(newPredictList)
    }
    // 선택 안되어 있으면 선택
    else {
      setSelectedIdx(idx)
    }
  }
  const onClickTeam = (team: any) => {
    if (selectedIdx === undefined) return
    predictList[selectedIdx].team = team
    setPredictList(predictList)

    setSelectedIdx(undefined)

    teamList.splice(teamList.indexOf(team), 1)
    setTeamList(teamList)
  }

  useEffect(() => {
    if (teamList?.length === 0) {
      let newState = ""
      predictList.forEach((item: any, idx: number) => {
        if (idx === 19) {
          newState += item.team.team
        } else newState += item.team.team + ","
      })
      setState(newState)
    }
  }, [selectedIdx, predictList, teamList])

  return (
    <div className="flex w-full justify-center gap-2">
      <div className="flex w-24 flex-col gap-2">
        {predictList.map((item: any, idx: number) => {
          return (
            <button
              key={idx}
              className={`box-content flex items-center justify-center rounded-md border-[1px] p-2 ${selectedIdx === idx ? "border-green-500 bg-green-100" : "border-gray-400"}`}
              onClick={() => onClickItem(idx)}
            >
              {Object.entries(item.team).length === 0 ? (
                <span className={`flex h-[30px] items-center text-gray-400 ${""}`}>
                  {item.number}
                </span>
              ) : (
                <div className="flex h-[30px] items-center gap-2">
                  <Image src={item.team.crest} alt={item.team.team} width={30} height={30} />
                  <span>{item.team.team}</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
      <div className="flex w-24 flex-col gap-2">
        {teamList?.map((team: any, idx: number) => {
          return (
            <button
              key={idx}
              onClick={() => onClickTeam(team)}
              className={`${""} gap-2 rounded-md border-[1px] border-gray-400 p-2`}
            >
              <div className="flex h-[30px] items-center gap-2">
                <Image src={team.crest} alt={team.team} width={30} height={30} />
                <span>{team.team}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default SetPredict
