declare module "*.svg" {
  import React from "react"

  const svg: React.FC<React.SVGProps<SVGSVGElement>>
  export default svg
  // named svg 파일을 React Component 형식으로 import 해오기 위함.
  // import { ReactComponent as SVGName } from '/src/SVGName.svg'의 형태로 사용.
  export const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>
}
