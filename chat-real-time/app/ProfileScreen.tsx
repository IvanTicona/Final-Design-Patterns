import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Importamos useLocalSearchParams para obtener los parámetros locales de la ruta
import { useLocalSearchParams } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';

const ProfileScreen = () => {
  const { profileImage: initialImage, name: initialName } = useLocalSearchParams() as { profileImage: string; name: string };
  const { user, token } = useContext(AuthContext);
  const userId = user?._id;
  const [image, setImage] = useState(initialImage);
  const [nombre, setNombre] = useState(initialName);
  const [correo, setCorreo] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería para seleccionar la imagen');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Atención', 'Debes seleccionar una imagen primero');
      return;
    }

    // Preparar el archivo para el FormData
    let localUri = image;
    let filename = (typeof localUri === 'string' ? localUri : '').split('/').pop();
    let match = filename ? /\.(\w+)$/.exec(filename) : null;
    let type = match ? `image/${match[1]}` : `image/jpeg`;

    // Crear el objeto FormData y anexar la imagen y el userId
    let formData = new FormData();
    formData.append('profilePicture', {
      uri: localUri,
      name: filename,
      type,
    } as any);

    if (userId) {
      formData.append('userId', userId);
    } else {
      Alert.alert('Error', 'El userId no es válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/profile/upload-profile-picture', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Imagen de perfil actualizada correctamente');
        console.log('Respuesta del servidor:', data);
      } else {
        Alert.alert('Error', data.msg || 'Error al subir la imagen');
        console.error('Error del servidor:', data);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Ocurrió un error en la solicitud');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      
      {/* Contenedor de la imagen */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>No hay imagen</Text>
          </View>
        )}
      </View>

      <Button title="Seleccionar Imagen" onPress={pickImage} />

      {/* Campos de nombre y correo */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
      />

      <Button title="Actualizar Perfil" onPress={uploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  imageContainer: {
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
});

export default ProfileScreen;
