import { View, Text } from 'react-native'
import React from 'react'

const FilterSection = () => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
      <Text style={{fontSize: 15, fontWeight: 'bold', backgroundColor: '#d8fdd2', color: '#165d3a', padding: 10, borderRadius: 30}}>Todos</Text>
      <Text style={{fontSize: 15, fontWeight: 'bold', backgroundColor: '#f6f5f3', color: '#8f8f8f', padding: 10, borderRadius: 30}}>Sin leer</Text>
      <Text style={{fontSize: 15, fontWeight: 'bold', backgroundColor: '#f6f5f3', color: '#8f8f8f', padding: 10, borderRadius: 30}}>Favoritos</Text>
      <Text style={{fontSize: 15, fontWeight: 'bold', backgroundColor: '#f6f5f3', color: '#8f8f8f', padding: 10, borderRadius: 30}}>Grupos</Text>
      <Text style={{textAlign: 'center',height: 35, width: 35, fontSize: 15, fontWeight: 'bold', backgroundColor: '#f6f5f3', color: '#8f8f8f', padding: 10, borderRadius: 30}}>+</Text>
    </View>
  )
}

export default FilterSection