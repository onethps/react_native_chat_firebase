import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ChatRowItem from '../components/ChatRowItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppNavigation } from '../types';

const Home = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder={'Search...'} />
      </View>
      <ScrollView style={styles.chatRows}>
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
        <ChatRowItem />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#EBEDF0',
  },
  chatRows: {
    marginTop: 20,
  },
});

export default Home;
