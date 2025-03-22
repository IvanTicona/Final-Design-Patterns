import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { name, profileImage } = useLocalSearchParams();
  console.log(name, profileImage);

  // Estado de carga inicial
  const [isLoading, setIsLoading] = useState(true);

  // Estados de usuario
  const [nameState, setName] = useState('');
  const [email, setEmail] = useState('correo@ejemplo.com');
  const [profileImageState, setProfileImage] = useState('');

  // Se ejecuta cuando los parámetros cambian
  useEffect(() => {
    if (nameState && profileImageState) {
      setName(Array.isArray(nameState) ? nameState[0] : nameState);
      setProfileImage(Array.isArray(profileImageState) ? profileImageState[0] : profileImageState);
    } else {
      setName('Usuario');
      setProfileImage('https://via.placeholder.com/120');
    }
    setIsLoading(false); // Marcamos como cargado
  }, [nameState, profileImageState]);

  // Función para seleccionar imagen desde la galería
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  // Subir imagen al backend con Multer
  const uploadImage = async (imageUri: string) => {
    let formData = new FormData();
    formData.append('profilePicture', {
      uri: imageUri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch('http://localhost:3000/upload-profile-picture', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Imagen de perfil actualizada.');
      } else {
        Alert.alert('Error', 'No se pudo actualizar la imagen.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con la subida de la imagen.');
    }
  };

  // 🔥 Si está cargando, mostramos un indicador de carga
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Imagen de perfil */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: Array.isArray(profileImage) ? profileImage[0] : profileImage }} style={styles.profileImage} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Campos de edición */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          data-value={name}
          onChangeText={setName}
          placeholder="Tu nombre"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          data-value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Cambios guardados')}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'gray',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
