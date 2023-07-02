import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {deleteUser} from  '../services/user/user.delete.service'

type Props = {user: any}

export default function ItemView(props: Props){

    const {user} = props

    const navigation = useNavigation<any>();

    const deleteUsuario = () => {
      // Lógica para excluir o usuário aqui
      Alert.alert('Excluir', 'Tem certeza que deseja excluir este usuário?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => {
          deleteUser.deleteUser(user.id)
          navigation.goBack()
        } },
      ]);
    };

    return (
      <View style={styles.itemView} onTouchEnd={() => navigation.navigate('UserRegister',  {user: user} ) }>

      <Text>              <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteUsuario}
      >
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity> {user.id} - {user.name} - {user.username}</Text>
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