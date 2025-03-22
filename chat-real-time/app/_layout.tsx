import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useContext } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import AuthScreen from './AuthScreen';
import Options from '@/components/chatComponents/Options';
import MoreOptions from '@/components/chatComponents/MoreOptions';
import { UserProvider } from '@/context/UserContext';

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
  const colorScheme = useColorScheme();
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
