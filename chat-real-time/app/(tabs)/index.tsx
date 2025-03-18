import ArchivedSection from '@/components/chatComponents/ArchivedSection';
import FilterSection from '@/components/chatComponents/FilterSection';
import Divider from '@/components/chatComponents/Divider';
import MoreOptions from '@/components/chatComponents/MoreOptions';
import Options from '@/components/chatComponents/Options';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatComponent from '@/components/chatComponents/ChatComponent';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 15, backgroundColor: '#fff' }}>
      
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <MoreOptions />
        <Options />
      </View>

      <Text style={{fontSize: 35, fontWeight: 'bold', marginTop: 10}}>Chats</Text>
      
      <TextInput style={{height: 38, borderRadius: 15, padding: 10, marginTop: 10, backgroundColor: '#f6f5f3'}} placeholder="Search" />
      
      <FilterSection />

      <View style={{height: '100%', width: '100%', marginTop: 10}}>
        <ArchivedSection />
        <Divider />
        {/* CHATS */}

        <ChatComponent />
        <ChatComponent />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
