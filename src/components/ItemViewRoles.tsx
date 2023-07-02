import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Alert } from 'react-native';
import {deleteRole} from  '../services/roles/role.delete.service'

import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {role: any}

export default function ItemViewRoles(props: Props){

    const {role} = props

    const navigation = useNavigation<any>();


    const deleteRoles = () => {
      // Lógica para excluir o usuário aqui
      Alert.alert('Excluir', 'Tem certeza que deseja excluir este usuário?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => {
          deleteRole.deleteRole(role.id)
          navigation.goBack()
        } },
      ]);
    };



    return (
      <View style={styles.itemView} onTouchEnd={() => navigation.navigate('RolesAdd',  {role: role} ) }>
      <Text> 
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteRoles}
      >
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity> 
      {role.id} - {role.name} - {role.description}</Text>
  </View>
    )

    
}


const styles = StyleSheet.create({
    itemView:{
      padding: 10,
      borderColor: 'gray',
      borderBottomWidth: 1,
      width: Dimensions.get('screen').width
    },
    deleteButton: {
      marginRight: 10,
    },
  });