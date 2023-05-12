import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { sessionManager } from '../services/session.repository';

export default function Home() {
  
  const navigation = useNavigation();
  
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title='Sair' onPress={() => navigation.goBack()}/>,
      headerRight: () => <Button title='Cadastrar' onPress={() => navigation.navigate('UserRegister')}/>
  
    })
  }, [])


  
  return (
    <View style={styles.container}>
      <Text>Showw</Text>
      <StatusBar style="auto" />
      <Text>{}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
