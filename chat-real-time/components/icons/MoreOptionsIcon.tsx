import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MoreOptionsIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        fill="none"
        stroke="#848484"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 2v28M2 16h28"
      />
    </Svg>
  )
}

export default MoreOptionsIcon
