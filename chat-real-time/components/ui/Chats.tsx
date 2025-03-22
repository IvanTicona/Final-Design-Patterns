import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Chats(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M13.584 7a5.001 5.001 0 1 0-8.809 4.675L4 14l2.325-.775q.322.204.675.359" />
        <Path
          fill="currentColor"
          d="M15 20a5 5 0 1 1 4.225-2.325L20 20l-2.325-.775A5 5 0 0 1 15 20"
        />
      </G>
    </Svg>
  )
}

export default Chats
