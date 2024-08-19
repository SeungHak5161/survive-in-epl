"use client"

import Spinner from "../Spinner/Spinner"

const PredictSimple = ({
  predictData,
  isLoading,
}: {
  predictData: IPredict[] | undefined
  isLoading: boolean
}) => {
  return (
    <div className="rounded-xl bg-white p-3 pb-1">
      {isLoading || !predictData ? (
        <div className="py-28">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-4 items-center rounded-xl bg-blue-50 py-2 [&_div]:flex [&_div]:justify-center [&_div]:font-semibold">
            <div>순위</div>
            <div className="col-span-2">이름</div>
            <div>유사도</div>
          </div>
          {predictData.map((obj, idx) => {
            return (
              <div
                key={idx}
                className={`grid grid-cols-4 items-center py-2 ${idx === predictData.length - 1 || "border-b-[1px] border-b-slate-200"}`}
              >
                <div className="flex items-center justify-center">
                  <div
                    className={`flex w-8 items-center justify-center rounded-md ${idx + 1 === 1 ? "bg-gradient-to-br from-blue-600 to-orange-500" : "bg-epl_purple"} py-1 font-bold text-white`}
                  >
                    {idx + 1}
                  </div>
                </div>
                <span className="col-span-2 font-semibold">{obj.name}</span>
                <span className="flex justify-center font-bold">{obj.accuracy.toFixed(1)}%</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default PredictSimple
