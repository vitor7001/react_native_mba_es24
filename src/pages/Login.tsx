import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, TextInput, StyleSheet, Text, View, Button, Alert } from "react-native";
import { sessionManager } from '../services/session.repository';


export default function LoginPage() {

    const navigation = useNavigation()

    const [username, setUsername] = React.useState('vitor');

    const [password, setPassword] = React.useState('123');

    function signIn() {
        if (username === 'vitor' && password === '123') {
            const user = {
                name: 'teste',
                username,
                password,
                token: '123'
            }
            
            sessionManager.setLoggedUser(user).then(() => {
                navigation.navigate('Home');
            });

        } else {
            Alert.alert("Login/Senha inválido(a)")
        }
    }

    return (
        <View style={styles.container}>
            <Text>Página de verificação de login</Text>

            <Text style={styles.label}>Login: {username}</Text>
            <TextInput value={username} style={styles.input} onChangeText={setUsername} />

            <Text style={styles.label}>Senha:</Text>
            <TextInput value={password} style={styles.input} onChangeText={setPassword} secureTextEntry />

            <View style={styles.botao}>
                <Button title="Entrar" onPress={signIn} />
            </View>

            <View style={styles.botao}>
                <Button title="Limpar" onPress={() => {
                    setUsername('')
                    setPassword('')
                }} />
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
        padding: 5
    },
    label: {
        marginTop: 20,
        marginBottom: 5,
        width: Dimensions.get('screen').width - 40,
        fontSize: 18
    },
    botao: {
        width: Dimensions.get('screen').width - 40,
        marginTop: 40
    }
})