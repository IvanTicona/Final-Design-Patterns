import React, { useLayoutEffect, useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

import axios from 'axios';
import { getSocket } from "../utils/socket";

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ProfileImage, UserName } from '@/components/chatComponents/ChatHeader';
import { AuthContext } from '@/context/AuthContext';
import IconButtons from '@/components/chatComponents/IconButtons';
import { env } from '@/constants/environment';

const ChatScreen = () => {
    
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { name, profileImage, conversationId } = useLocalSearchParams() as { name: string; profileImage: string, conversationId: string };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const socketRef = useRef<any>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${env.API_CONVERSATION}/conversation/${conversationId}`);
        const messagesFromData = response.data.messages;
        setMessages(messagesFromData);
      } catch (error) {
        console.error(error);
      }
    };

    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    socket.emit("joinConversation", conversationId);

    socket.on("receiveMessage", (data: any) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  const sendMessage = () => {
    if (message.trim().length > 0 && socketRef.current) {
      const messagePayload = {
        conversationId,
        sender: user?._id,
        content: message,
        type: "text"
      };
      socketRef.current.emit("sendMessage", messagePayload);
      setMessage('');
    }
  };  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: 'white' },
      headerTintColor: 'black',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ProfileImage uri={profileImage} style={{ width: 40, height: 40, borderRadius: 20 }} />
          <UserName name={name} style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }} />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => <IconButtons />,
    });
  }, [navigation, name, profileImage]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === user?._id ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <FontAwesome name="smile-o" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="attach" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity>
          <Ionicons name="camera" size={24} color="gray" />
        </TouchableOpacity>
        {message.trim().length > 0 ? (
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#25D366" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome name="microphone" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 12,
    marginVertical: 5,
    borderRadius: 15,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d0fdd7',
    marginRight: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: '#f6f6f6',
  },
});

export default ChatScreen;
