import { View, Text, Image } from 'react-native'
import React from 'react'

const ChatComponent = () => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 15, marginTop: 10}}>
      {/* Image */}
      <Image
        style={{width: 60, height: 60, borderRadius: 50}}
        source={require('../../assets/images/chatProfile.png')}
      />
      <View style={{display: 'flex', flexDirection: 'column', width: '80%', height: 60}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          {/* Nombre */}
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Bill Gates</Text>
          {/* Hora */}
          <Text style={{fontSize: 16, color: '#1faa5f'}}>12:00 PM</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5}}>
          {/* Ultimo mensaje */}
          <Text style={{fontSize: 16, color: '#696969'}}>Hello, how are you?</Text>
          {/* Estado */}
          <View style={{width: 25,height: 25, backgroundColor: '#1faa5f', borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, color: 'white'}}>5</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ChatComponent