import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MicrophoneIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        fill="#848484"
        d="M23 14v3a7 7 0 01-14 0v-3H7v3a9 9 0 008 8.94V28h-4v2h10v-2h-4v-2.06A9 9 0 0025 17v-3z"
      />
      <Path
        fill="#848484"
        d="M16 22a5 5 0 005-5V7a5 5 0 00-10 0v10a5 5 0 005 5M13 7a3 3 0 016 0v10a3 3 0 01-6 0z"
      />
    </Svg>
  )
}

export default MicrophoneIcon
