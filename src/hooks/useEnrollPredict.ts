import createDBItem from "@/apis/createPredictData"
import { useMutation } from "@tanstack/react-query"

const useEnrollPredict = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      return await createDBItem(params)
    },
    onSuccess: (data) => {
      !data && alert("예측 데이터 등록에 실패했습니다.")
      return data
    },
  })
}
export default useEnrollPredict
