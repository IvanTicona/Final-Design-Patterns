import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import ChatComponent from '@/components/chatComponents/ChatComponent';
import { AuthContext } from '../../context/AuthContext';
import { env } from '../../constants/environment';
import { useFocusEffect } from '@react-navigation/native';
import FilterSection from '../../components/chatComponents/FilterSection';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  const loadChats = async () => {
    try {
      const response = await axios.get(`${env.API_CONVERSATION}/${user._id}`);
      const savedChats = response.data.map((conv: any) => {
        const otherParticipant = conv.participants.find(
          (participant: any) => participant._id.toString() !== user?._id.toString()
        );
        return {
          conversationId: conv._id,
          participantId: otherParticipant._id,
          participant: otherParticipant.username,
          profileImage: otherParticipant.profilePicture
        };
      });
      setChats(savedChats);
    } catch (error) {
      console.error(error);
    }
  };

  // Usamos useFocusEffect para recargar los chats cada vez que la pantalla se enfoque
  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 15, backgroundColor: '#fff' }}>
      <Text style={styles.title}>Chats</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
      />
      <FilterSection />
      <View style={{ marginTop: 10 }}>
        <FlatList
          style={{ height: '100%' }}
          data={chats}
          keyExtractor={(item) => item.participantId}
          renderItem={({ item }) => (
            <ChatComponent
              conversationId={item.conversationId}
              profilePicture={item.profileImage}
              username={item.participant}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 0,
  },
  searchInput: {
    height: 38,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f6f5f3'
  },
});
