import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Options = (props: any) => {
  return (

    <View style={{height: 25, width: 70, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{height: 30, width: 30, backgroundColor: '#f6f5f3', borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 56 56"
            {...props}
          >
            <Path
              fill="#0d0c0a"
              d="M7.809 50.348H48.19c4.875 0 7.36-2.438 7.36-7.266V18.543c0-4.828-2.485-7.242-7.36-7.242h-5.484c-1.828 0-2.39-.375-3.445-1.547l-1.899-2.11c-1.148-1.288-2.343-1.992-4.781-1.992h-9.328c-2.414 0-3.61.704-4.781 1.992l-1.899 2.11c-1.031 1.148-1.617 1.547-3.445 1.547h-5.32c-4.875 0-7.36 2.414-7.36 7.242v24.539c0 4.828 2.485 7.266 7.36 7.266m20.18-7.5c-7.079 0-12.774-5.696-12.774-12.82c0-7.126 5.695-12.82 12.773-12.82c7.125 0 12.797 5.694 12.797 12.82c0 7.124-5.695 12.82-12.797 12.82m16.851-18.54c-1.594 0-2.906-1.288-2.906-2.882a2.906 2.906 0 1 1 5.812 0c0 1.594-1.312 2.883-2.906 2.883m-16.85 14.977a9.247 9.247 0 0 0 9.258-9.258a9.247 9.247 0 0 0-9.258-9.257c-5.11 0-9.234 4.125-9.234 9.257c0 5.133 4.148 9.258 9.234 9.258"
            />
        </Svg>
      </View>
      <View style={{height: 30, width: 30, backgroundColor: '#1bab5f', borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          {...props}
        >
          <Path
            fill="#fcf9ff"
            d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
          />
        </Svg>
      </View>
    </View>
  )
}

export default Options