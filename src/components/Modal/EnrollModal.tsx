"use client"

import { useEffect, useRef, useState } from "react"

import useEnrollPredict from "@/hooks/useEnrollPredict"
import { allowScroll, preventScroll } from "@/util/modal"
import CloseSVG from "@public/icons/close.svg"
import { useQueryClient } from "@tanstack/react-query"

import SetPredict from "../Predict/SetPredict"

const EnrollModal = ({ setModalState }: { setModalState: () => void }) => {
  const [name, setName] = useState("")
  const [predict, setPredict] = useState("")
  const modalSelectRef = useRef<HTMLSelectElement>(null)

  const queryClient = useQueryClient()
  const { mutate: enrollPredict } = useEnrollPredict()

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      setName(e.target.value)
    } else {
      setPredict(e.target.value)
    }
  }

  const onSubmit = () => {
    if (!name) {
      alert("이름을 입력해주세요.")
      return
    }
    if (name.length > 6) {
      alert("이름은 6자 이내로 입력해주세요.")
    }
    if (!predict) {
      alert("모든 순위를 채워주세요")
      return
    }
    const params = {
      name: name,
      predict: predict,
    }
    enrollPredict(params, {
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["predictData"] })
        setModalState()
      },
    })
  }

  useEffect(() => {
    const prevScrollY = preventScroll()
    modalSelectRef.current?.focus()

    return () => {
      allowScroll(prevScrollY)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-55 py-7">
      <div className="flex max-h-[90%] max-w-[95%] flex-col overflow-hidden rounded-xl bg-white p-5">
        <div className="flex justify-end">
          <button onClick={() => setModalState()}>
            <CloseSVG className="h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll">
          <label htmlFor="name" className="font-semibold">
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="최대 6자"
            onChange={onChangeInput}
            className="rounded-md border-2 border-gray-500 px-2 py-[2px] outline-none focus:border-blue-600"
          />
          <label htmlFor="predict" className="font-semibold">
            예측
          </label>
          <div className="overflow-y-scroll px-3">
            <SetPredict setState={setPredict} />
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <button
            onClick={onSubmit}
            className="w-full rounded-lg bg-red-500 py-3 text-lg font-bold text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
export default EnrollModal
