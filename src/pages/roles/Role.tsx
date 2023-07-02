import React from 'react';

import { Button, FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ItemViewRoles from '../../components/ItemViewRoles';
import {listRoles} from '../../services/roles/roles.list.service'
import { useFocusEffect } from '@react-navigation/native';


export default function HomeRoles(){

    const navigation = useNavigation<any>();

    const [roles, setRoles] = React.useState<any[]>([])

    React.useEffect(() => {
        navigation.setOptions({
          headerLeft: () => <Button title='Voltar' onPress={() => navigation.goBack()}/>,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Button title='Adicionar Role' onPress={() => navigation.navigate('RolesAdd')}/>
            </View>
          )
        })


        listRoles.listRoles().then(data =>{
          if(data.errorMessage){
              Alert.alert('Erro ao listar roles: ', data.errorMessage)
          }else{
              setRoles(data)
          }
      })

      }, [])

    useFocusEffect(
      React.useCallback(() => {
        listRoles.listRoles().then(data =>{
          if(data.errorMessage){
              Alert.alert('Erro ao listar roles: ', data.errorMessage)
          }else{
              setRoles(data)
          }
      })
      
      }, [] )
    )

    return(
        <View>
            <StatusBar style='auto' />
            <Text>Listagem de roles</Text>
            
            {roles.length > 0 ? (
                <FlatList
                data={roles}
                renderItem={({item}) => {
                    return (
                        <ItemViewRoles role={item} />
                    )
                }}    />
            ) : (
                <Text>Não há roles para serem listadas</Text>
            )}

        </View>
    )
}

