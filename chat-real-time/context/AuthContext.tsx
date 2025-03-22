import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextProps, AuthProviderProps } from '@/interfaces/Auth';
import { User } from '@/interfaces/User';

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try{
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        if(!storedToken || !storedUser) return;
        setToken(storedToken!);
        setUser(JSON.parse(storedUser!));
      } catch (error) {
        console.error('Error al cargar el token:', error);
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
