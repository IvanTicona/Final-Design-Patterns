import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function CameraOff(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <G fill="currentColor">
        <Path
          fillRule="evenodd"
          d="M11.5 4h-7a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-8 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1z"
          clipRule="evenodd"
        />
        <Path
          fillRule="evenodd"
          d="m16.934 5.176l-3.468 2.381a1 1 0 0 0-.434.815L13 11.587a1 1 0 0 0 .434.834l3.5 2.403A1 1 0 0 0 18.5 14V6a1 1 0 0 0-1.566-.824M16.5 12.1l-1.495-1.026l.022-2.163L16.5 7.9z"
          clipRule="evenodd"
        />
        <Path d="M1.293 2.707a1 1 0 0 1 1.414-1.414l16 16a1 1 0 0 1-1.414 1.414z" />
      </G>
    </Svg>
  )
}

export default CameraOff
