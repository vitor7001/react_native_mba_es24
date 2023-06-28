import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { listUsers } from '../services/user/user.list.service';
import ItemView from '../components/ItemView';

import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  
  const navigation = useNavigation<any>();
  
  const [users, setUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title='Sair' onPress={() => navigation.goBack()}/>,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Button title='Usuário' onPress={() => navigation.navigate('UserRegister')}/>
          <View style={{ width: 10 }} />
          <Button title='Role' onPress={() => navigation.navigate('RolesList')}/>
        </View>
      )
    })

    listUsers.listUser().then(data =>{
      if(data.errorMessage){
        Alert.alert('Erro ao listar usuários: ', data.errorMessage)
      }else{
        setUsers(data)
      }
    })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      listUsers.listUser()
    
    }, [] )
  )

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Listagem de usuários</Text>
      <FlatList 
      data={users}
      renderItem={({item}) =>{
        return (
          <ItemView user={item} />
        )
      }}
      
      />
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
