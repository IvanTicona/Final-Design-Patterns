import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PhoneHangUp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        fill="#d51616"
        d="M15.897 9c.125.867.207 2.053-.182 2.507c-.643.751-4.714.751-4.714-.751c0-.756.67-1.252.027-2.003c-.632-.738-1.766-.75-3.027-.751s-2.394.012-3.027.751c-.643.751.027 1.247.027 2.003c0 1.501-4.071 1.501-4.714.751C-.102 11.053-.02 9.867.105 9c.096-.579.339-1.203 1.118-2c1.168-1.09 2.935-1.98 6.716-2h.126c3.781.019 5.548.91 6.716 2c.778.797 1.022 1.421 1.118 2z"
      />
    </Svg>
  )
}

export default PhoneHangUp