import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';


type Props = {role: any}

export default function ItemViewRoles(props: Props){

    const {role} = props

    const navigation = useNavigation<any>();

    return (
      <View style={styles.itemView} onTouchEnd={() => navigation.navigate('UserRegister',  {user: user} ) }>
      <Text>{role.id} - {role.name} - {role.description}</Text>
  </View>
    )

    
}


const styles = StyleSheet.create({
    itemView:{
      padding: 10,
      borderColor: 'gray',
      borderBottomWidth: 1,
      width: Dimensions.get('screen').width
    }
  });