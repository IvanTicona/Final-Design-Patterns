import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { View, SafeAreaView } from 'react-native';

const MoreOptions = (props: any) => {
  return (
    <SafeAreaView style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'flex-start', padding: 12 }}> 
      <View style={{height: 30, width: 30, backgroundColor: '#f6f5f3', borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          {...props}
        >
          <Path
            fill="#0a0907"
            stroke="#0a0907"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 6a2 2 0 1 1 0 4a2 2 0 1 1 0-4zm0 6a2 2 0 1 1 0 4a2 2 0 1 1 0-4zm0 6a2 2 0 1 1 0 4a2 2 0 1 1 0-4"
          />
        </Svg>
      </View>
    </SafeAreaView>
  )
}

export default MoreOptions