import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const FilterSection = () => {
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, gap: 10 }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', backgroundColor: '#d8fdd2', color: '#165d3a', padding: 10, borderRadius: 30 }}>
        Todos
      </Text>
      <TouchableOpacity onPress={() => router.push('/CreateConversationScreen')}>
        <Text style={{ textAlign: 'center', height: 35, fontSize: 15, fontWeight: 'bold', backgroundColor: '#f6f5f3', color: '#8f8f8f', padding: 10, borderRadius: 30 }}>
          Crear nuevo chat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterSection;
