import React from 'react';

import {Dimensions ,TextInput,StyleSheet, Text, View, Button, Alert } from "react-native";

export default function LoginPage(){

    const [username, setUsername] = React.useState('');

    const [password, setPassword] = React.useState('');

    function signIn(){
        if (username === 'vitor' && password === '123')  {
            Alert.alert("Usuário logado com sucesso")
        }else{
            Alert.alert("Login/Senha inválido(a)")
        }
    }

    return(
        <View style={styles.container}>
            <Text>Página de acesso</Text>
            
            <Text style={styles.label}>Login: {username}</Text>
            <TextInput value={username} style={styles.input} onChangeText={setUsername}/>
            
            <Text style={styles.label}>Senha:</Text>
            <TextInput value={password} style={styles.input} onChangeText={setPassword} secureTextEntry/>
            <View style={styles.botao}>
                <Button title="Entrar" onPress={signIn}/>
            </View>

            <View style={styles.botao}>
                <Button title="Limpar" onPress={() => {
                    setUsername('')
                    setPassword('')
                }}/>
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        width: Dimensions.get('screen').width - 40,
        height: 30,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 4,
        padding:5
    },
    label: {
        marginTop: 20,
        marginBottom: 5,
        width: Dimensions.get('screen').width - 40,
        fontSize: 18
    },
    botao:{
        width: Dimensions.get('screen').width - 40,
        marginTop: 40
    }
})