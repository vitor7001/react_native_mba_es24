import React from 'react';

import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ItemViewRoles from '../../components/ItemViewRoles';

export default function HomeRoles(){

    const navigation = useNavigation<any>();

    const [roles, setRoles] = React.useState<any[]>([])

    React.useEffect(() => {
        navigation.setOptions({
          headerLeft: () => <Button title='Sair' onPress={() => navigation.goBack()}/>,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Button title='Adicionar Role' onPress={() => navigation.navigate('RolesAdd')}/>
            </View>
          )
        })

      }, [])

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

