import { useState, useEffect, useContext } from 'react';
import ArchivedSection from '@/components/chatComponents/ArchivedSection';
import FilterSection from '@/components/chatComponents/FilterSection';
import Divider from '@/components/chatComponents/Divider';
import MoreOptions from '@/components/chatComponents/MoreOptions';
import Options from '@/components/chatComponents/Options';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatComponent from '@/components/chatComponents/ChatComponent';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function HomeScreen() {

  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {

    const loadChats = async () => {
      try{
        const response = await axios.get('http://192.168.1.201:3000/api/conversations/67df11d424b330e27b543841');
        const savedChats = response.data.map((conv: any) => {
          const otherParticipant = conv.participants.find(
            (participant: any) => participant._id.toString() !== user?._id.toString()
          );
          return {
            conversationId: otherParticipant._id,
            participant: otherParticipant.username,
            // lastMessage: otherParticipant.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null,
            // updatedAt: otherParticipant.updatedAt
            profileImage: otherParticipant.profilePicture
          };
        });

        setChats(savedChats);
      }catch(error){
        console.error(error);
      }
    };
    loadChats();
  },[]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 15, backgroundColor: '#fff' }}>
      
      <TextInput style={{height: 38, borderRadius: 15, padding: 10, marginTop: 10, backgroundColor: '#f6f5f3'}} placeholder="Search" />
      
      <FilterSection />

      <View style={{height: '100%', width: '100%', marginTop: 10}}>
        <ArchivedSection />
        <Divider />
        {
          chats.map((chat: any) => {
            return(
            <ChatComponent key={chat.conversationId} profilePicture={chat.profileImage} username={chat.participant} />
          )})
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
