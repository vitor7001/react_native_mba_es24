import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

type Props = { role: any, selectedRoles: any[], onRoleToggle: (role: any) => void, userRoles: any[]; };

export default function ItemRoles(props: Props) {

  const navigation = useNavigation<any>();

  const { role, selectedRoles, onRoleToggle, userRoles } = props;

  let isActive
  if (selectedRoles) {
    isActive = selectedRoles.includes(role)
  }

  if (userRoles) {

    isActive = userRoles.includes(role.id);
  }

  const handleCheckboxToggle = () => {
    onRoleToggle(role);
  };

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox.Android
        status={isActive ? 'checked' : 'unchecked'}
        onPress={handleCheckboxToggle}
      />

      <Text>{role.id} - {role.name} - {role.description}</Text>
    </View>
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

