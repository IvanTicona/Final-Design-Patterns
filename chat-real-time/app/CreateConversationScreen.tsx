import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { env } from '@/constants/environment';

const CreateConversationScreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Cargar todos los usuarios desde la API
    const loadUsers = async () => {
      try {
        console.log(env.API_USERS);
        const response = await axios.get(`${env.API_USERS}`);
        // Excluimos al usuario actual
        const filteredUsers = response.data.filter((u: any) => u._id !== user?._id);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error cargando usuarios:', error);
      }
    };

    loadUsers();
  }, [user]);

  const handleUserPress = async (selectedUser: any) => {
    try {
      // Llamamos al endpoint para crear o recuperar la conversación
      const response = await axios.post(`${env.API_CONVERSATION}`, {
        userId1: user?._id,
        userId2: selectedUser._id,
      });
      const conversation = response.data;
      // Navegamos al ChatScreen, pasando el id de la conversación y la info del otro participante
      router.push({
        pathname: '/ChatScreen',
        params: {
          name: selectedUser.username,
          profileImage: selectedUser.profilePicture,
          conversationId: conversation._id,
        },
      });
    } catch (error) {
      console.error('Error al crear la conversación:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.userId}>ID: {item._id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un usuario para chatear</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CreateConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  userItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userId: {
    fontSize: 12,
    color: '#888',
  },
});
