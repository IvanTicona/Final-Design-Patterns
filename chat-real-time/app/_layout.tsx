import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useContext } from 'react';
import 'react-native-reanimated';

import { AuthProvider, AuthContext } from '@/context/AuthContext';
import AuthScreen from './AuthScreen';

SplashScreen.preventAutoHideAsync();

function AppNavigator() {
  const { token } = useContext(AuthContext);
  
  if (!token) {
    return <AuthScreen />;
  }
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="AuthScreen" options={{ headerShown: false }}/>
      <Stack.Screen name="ChatScreen" options={{ headerShown: false}}/>
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }}/>
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
