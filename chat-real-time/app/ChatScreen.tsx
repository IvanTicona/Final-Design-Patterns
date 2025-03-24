import React, { useLayoutEffect, useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ImageBackground
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import { ProfileImage, UserName } from '@/components/chatComponents/ChatHeader';
import { AuthContext } from '@/context/AuthContext';
import { env } from '@/constants/environment';
import backgroundImage from '@/assets/images/whatsAppBackground.png';
import ChatMediator from '@/mediators/ChatMediator'; // <-- Usamos el mediador

const ChatScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  // Datos recibidos de la ruta
  const { name, profileImage, conversationId } = useLocalSearchParams() as { 
    name: string; 
    profileImage: string; 
    conversationId: string 
  };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  // 1) Cargar mensajes al montar
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${env.API_CONVERSATION}/conversation/${conversationId}`);
        // Invertimos para que el más reciente quede primero si usamos inverted
        setMessages(response.data.messages.reverse());
      } catch (error) {
        console.error('Error cargando mensajes:', error);
      }
    };
    loadMessages();
  }, [conversationId]);

  // 2) Suscribirse a ChatMediator (Observer) y unirse a la conversación
  useEffect(() => {
    const handleNewMessage = (data: any) => {
      // Agregamos el nuevo mensaje al inicio
      setMessages(prev => [data, ...prev]);
    };

    // Suscribir
    ChatMediator.subscribe(handleNewMessage);
    // Unir
    ChatMediator.joinConversation(conversationId);

    return () => {
      // Desuscribir
      ChatMediator.unsubscribe(handleNewMessage);
      // Salir
      ChatMediator.leaveConversation(conversationId);
    };
  }, [conversationId]);

  // 3) Enviar mensaje usando ChatMediator
  const sendMessage = () => {
    if (message.trim().length === 0) return;
    ChatMediator.sendMessage(conversationId, user?._id, message);
    setMessage('');
  };

  // 4) Configurar el header (al montar)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: 'white', margin: 0, padding: 0 },
      headerTintColor: 'black',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 250 }}>
          <ProfileImage uri={profileImage} style={{ width: 40, height: 40, borderRadius: 20 }} />
          <UserName name={name} style={{ marginLeft: 10, fontSize: 18, fontWeight: '500' }} />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, name, profileImage]);

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }} resizeMode="cover">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.container}>
          {/* 5) FlatList con inverted para estilo WhatsApp */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            inverted
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.sender === user?._id ? styles.myMessage : styles.otherMessage
                ]}
              >
                <Text style={styles.messageText}>{item.content}</Text>
              </View>
            )}
          />

          {/* 6) Input para enviar mensaje */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 5 }}>
              <Ionicons name="send" size={24} color="#25D366" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    maxHeight: 30,
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
