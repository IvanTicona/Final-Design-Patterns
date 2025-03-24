import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { env } from '../constants/environment';
import Config from 'react-native-config';

const AuthScreen: React.FC = () => {

  const { setToken, setUser } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleAuth = async () => {
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const response = await axios.post(`${env.API_AUTH}/${endpoint}`, {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);
      
    } catch (error) {
      Alert.alert('Error', 'Ha ocurrido un error en la autenticación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Registro' : 'Iniciar Sesión'}</Text>
      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isRegister ? 'Registrarse' : 'Iniciar Sesión'} onPress={handleAuth} />
      <Button
        title={isRegister ? 'Ya tengo una cuenta' : 'Quiero registrarme'}
        onPress={() => setIsRegister(!isRegister)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
});

export default AuthScreen;