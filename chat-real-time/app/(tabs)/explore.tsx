// ChatScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import io, { Socket } from 'socket.io-client';

interface Message {
  text: string;
  room?: string;
}

const SOCKET_SERVER_URL = 'http://192.168.0.10:3000'; // Cambia esta URL según corresponda

const ChatScreen: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [mensajes, setMensajes] = useState<Message[]>([]);

  useEffect(() => {
    // Conecta al servidor de Socket.IO
    const newSocket: Socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    // Escucha el evento 'receiveMessage' para recibir mensajes
    newSocket.on('receiveMessage', (data: Message) => {
      setMensajes((prevMensajes) => [...prevMensajes, data]);
      console.log("Mensaje recibido: ", data);
    });

    // Desconecta al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const enviarMensaje = () => {
    if (socket && mensaje.trim() !== '') {
      const data: Message = { text: mensaje };
      // Emite el mensaje al servidor
      socket.emit('sendMessage', data);
      console.log("Mensaje enviado: ", data);
      setMensaje('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensajes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.messageText}>{item.text}</Text>
        )}
      />
      <TextInput
        value={mensaje}
        onChangeText={setMensaje}
        placeholder="Escribe tu mensaje..."
        style={styles.input}
      />
      <Button title="Enviar" onPress={enviarMensaje} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 250,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 8,
    borderRadius: 4,
  },
  messageText: {
    marginVertical: 4,
    fontSize: 16,
  },
});

export default ChatScreen;
