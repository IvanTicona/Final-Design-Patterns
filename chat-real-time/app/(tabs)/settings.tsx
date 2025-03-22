import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '@/context/UserContext';

const SettingsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const { setUserId } = useContext(UserContext);

  const handleProfilePress = () => {
    router.push({
      pathname: '/ProfileScreen',  
      params: {
        name: "Bill Gates",
        profileImage: "https://th.bing.com/th/id/OIP.DoWWfcJ2K5Ei55sBF9xoUgHaHa?rs=1&pid=ImgDetMain", 
      },
    });
  };

  const handleLogout = async () => {
    try {
      // Eliminar userId y token del AsyncStorage
      await AsyncStorage.removeItem('token');
      router.navigate('/AuthScreen');
      
      Alert.alert('Éxito', 'Has cerrado sesión correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar en Ajustes"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <TouchableOpacity onPress={handleProfilePress}>
        <View style={styles.profileSection}>
            <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.Ijpxtc1N0bIpwZDTn0gw5gHaEK?rs=1&pid=ImgDetMain' }} // Aquí debes poner la URL de la foto de perfil
            style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Bill Gates</Text>
            </View>
        </View>
        </TouchableOpacity>

      {/* opciones */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="list" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Listas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="person" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="cloud" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Almacenamiento y Datos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="language" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Idioma</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <AntDesign name="questioncircleo" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <FontAwesome name="refresh" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#128C7E" />
          <Text style={styles.optionText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Sombra para cada opción
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
  },
});

export default SettingsScreen;
