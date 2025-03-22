import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, View, Text, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Settings from '@/components/ui/Settings';
import Chats from '@/components/ui/Chats';
import MoreOptions from '@/components/chatComponents/MoreOptions';
import Options from '@/components/chatComponents/Options';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true, // Mantener el encabezado visible
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => Chats({ color }),
          headerStyle: {
            backgroundColor: 'white',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          },
          headerTintColor: 'black',
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green', padding: 12 }}>
              WhatsApp
            </Text>
          ),
          headerLeft: () => <MoreOptions />,
          headerRight: () => <Options />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => Settings({ color }),
          headerShown: true, 
          header: () => (
            <SafeAreaView style={styles.headerContainer}>
              <View style={styles.headerContent}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', padding: 10 }}>
                Ajustes
              </Text>
              </View>
            </SafeAreaView>
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
