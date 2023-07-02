import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Importe o componente Checkbox do React Native Paper

type Props = { role: any };

export default function ItemRoles(props: Props) {
  const { role } = props;
  const navigation = useNavigation<any>();
  const [isActive, setIsActive] = useState(false); // Estado para controlar se a role está ativa ou não

  const handleCheckboxToggle = () => {
    setIsActive(!isActive); // Inverte o valor do estado quando o checkbox é clicado
  };

  return (
    <TouchableOpacity style={styles.itemView} onPress={() => navigation.navigate('UserRegister', { user: user })}>
      <View style={styles.checkboxContainer}>
        <Checkbox.Android
          status={isActive ? 'checked' : 'unchecked'} // Define o status do Checkbox baseado no estado isActive
          onPress={handleCheckboxToggle} // Chama a função de toggle quando o Checkbox é clicado
        />
        <Text>{role.id} - {role.name} - {role.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemView: {
    padding: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    width: Dimensions.get('screen').width,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
