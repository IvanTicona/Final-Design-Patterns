import { View, Text } from 'react-native'
import React from 'react'
import ArchivedIcon from './ArchivedIcon'

const ArchivedSection = () => {
  return (
    <View style={{height: 25, width: '100%', paddingHorizontal: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{height: 25, width: 125, display: 'flex', marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <ArchivedIcon />
        <Text style={{fontSize: 16 ,fontWeight: '600'}}>Archivado</Text>
      </View>
      <Text style={{color: '#14af5f'}}>114</Text>
    </View>
  )
}
``
export default ArchivedSection