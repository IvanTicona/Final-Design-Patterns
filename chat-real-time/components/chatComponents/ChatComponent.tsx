import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const ChatComponent = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [messages, setMessages] = useState("");
  

  const handleChatPress = () => {
    router.push({
      pathname: '/ChatScreen',  
      params: {
        name: "Bill Gates",
        profileImage: "https://th.bing.com/th/id/OIP.DoWWfcJ2K5Ei55sBF9xoUgHaHa?rs=1&pid=ImgDetMain", 
      },
    });
  };
  
  return (
    <TouchableOpacity 
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 10 }}
      onPress={handleChatPress}
    >
      <Image
        style={{ width: 60, height: 60, borderRadius: 50 }}
        source={require('../../assets/images/chatProfile.png')}
      />
      <View style={{ display: 'flex', flexDirection: 'column', width: '80%', height: 60 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bill Gates</Text>
          <Text style={{ fontSize: 16, color: '#1faa5f' }}>12:00 PM</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
          
          <Text style={{ fontSize: 16, color: '#696969' }}>Hello, how are you?</Text>
          
          <View style={{ width: 25, height: 25, backgroundColor: '#1faa5f', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white' }}>5</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;
