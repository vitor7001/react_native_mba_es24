import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { listUsers } from '../services/user/user.list.service';

export default function Home() {
  
  const navigation = useNavigation<any>();
  
  const [users, setUsers] = React.useState<any[]>([])

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title='Sair' onPress={() => navigation.goBack()}/>,
      headerRight: () => <Button title='Cadastrar' onPress={() => navigation.navigate('UserRegister')}/>
  
    })

    listUsers.listUser().then(data =>{
      if(data.errorMessage){
        Alert.alert('Erro ao listar usuários: ', data.errorMessage)
      }else{
        console.log("DATA")
        console.log(data)
        setUsers(data)
      }
    })
  }, [])


  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Listagem de usuários</Text>
      <FlatList 
      data={users}
      renderItem={({item}) =>{
        return (
          <View style={styles.itemView}>
          <Text >{item.id} - {item.name} - {item.username}</Text>
          </View>
        )
      }}
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemView:{
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
