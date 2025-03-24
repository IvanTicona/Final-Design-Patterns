import React, { useLayoutEffect, useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import chatMediator from '@/mediators/ChatMediator';
import IconButtons from '@/components/chatComponents/IconButtons';

const ChatScreen = () => {
  const { name, profileImage } = useLocalSearchParams() as { name: string; profileImage: string };
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const UserID = user?._id;

  // Define el ID de conversación (puede venir de params o ser fijo)
  const conversationId = "67df66fc8feaf861786757f3";

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  // Carga inicial de mensajes desde el backend con axios
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get(`http://192.168.1.215:3000/api/conversations/conversation/${conversationId}`);
        const messagesFromData = response.data.messages;
        setMessages(messagesFromData);
      } catch (error) {
        console.error(error);
      }
    };

    loadMessages();
  }, [conversationId]);

  // Configuración del header con useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: 'white' },
      headerTintColor: 'black',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: profileImage }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
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

  // Función para enviar mensaje con ID temporal
const sendMessage = () => {
  if (message.trim().length > 0) {
    const tempId = `temp-${Date.now()}`;
    const tempMessage = {
      conversationId,
      sender: UserID ?? '',
      content: message,
      type: 'text',
      _id: tempId,
      isTemp: true, // Flag temporal para identificar
    };
    // Actualización optimista
    setMessages(prevMessages => [...prevMessages, tempMessage]);
    chatMediator.sendMessage(conversationId, UserID ?? '', message);
    setMessage('');
  }
};

// Listener del mediator para manejar mensajes entrantes
useEffect(() => {
  chatMediator.joinConversation(conversationId);

  const mediatorListener = (data: any) => {
    // Asegurarse de trabajar con objeto plano
    const plainMessage = data._doc ? data._doc : data;
    if (plainMessage.conversationId === conversationId) {
      setMessages(prevMessages => {
        // Si existe un mensaje temporal con el mismo contenido o similar, lo reemplazamos.
        const tempIndex = prevMessages.findIndex(
          msg => msg.isTemp && msg.content === plainMessage.content && msg.sender === plainMessage.sender
        );
        if (tempIndex !== -1) {
          // Reemplazar el mensaje temporal por el definitivo
          const updatedMessages = [...prevMessages];
          updatedMessages[tempIndex] = plainMessage;
          return updatedMessages;
        }
        // Si no, agregar el mensaje
        // Evitar duplicados comprobando el _id
        if (prevMessages.some(msg => msg._id === plainMessage._id)) {
          return prevMessages;
        }
        return [...prevMessages, plainMessage];
      });
    }
  };

  chatMediator.subscribe(mediatorListener);
  return () => {
    chatMediator.unsubscribe(mediatorListener);
  };
}, [conversationId]);


  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === UserID ? styles.myMessage : styles.otherMessage]}>
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
