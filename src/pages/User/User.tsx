import { useNavigation } from '@react-navigation/native';
import React from "react";
import { View, Button, Text,TextInput, StyleSheet, Dimensions, Alert } from "react-native";
import { registerUser } from '../../services/user/user.create.service';

export default function UserRegister(){

    const navigation = useNavigation();

    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');    

    async function  register(){
        await registerUser.registerUser(name,login,[], password)
        /*
        if(!name || name.trim() === '') {

            Alert.alert("Aviso, preencha o campo: Nome")
            return
        }else if(!login || login.trim() === '') {
            
            Alert.alert("Aviso, preencha o campo: Login")
            return
        }else if(!password || password.trim() === ''){
        
            Alert.alert("Aviso, preencha o campo: Senha")
            return
        }else if(!confirmPassword || confirmPassword.trim() === ''){
            
            Alert.alert("Aviso, preencha o campo: Confirmar Senha")
            return
        }else if(password !== confirmPassword) {
            Alert.alert("A senha e a confirmação da senha não possuem os mesmos valores:")
            setPassword('')
            setConfirmPassword('')
            return
        }

        Alert.alert(`Usuário ${name} cadastrado com sucesso!`)

        navigation.navigate('Home')
        */
    }

    return(

        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastre um Usuário</Text>
       
       
            <Text style={styles.label}>Nome:</Text>
            <TextInput value={name} style={styles.input} onChangeText={setName}/>
            
            <Text style={styles.label}>Login:</Text>
            <TextInput value={login} style={styles.input} onChangeText={setLogin}/>

            <Text style={styles.label}>Senha:</Text>
            <TextInput value={password} style={styles.input} onChangeText={setPassword} secureTextEntry/>

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput value={confirmPassword} style={styles.input} onChangeText={setConfirmPassword} secureTextEntry/>

            
            <View style={styles.botao}>
                <Button title="Entrar" onPress={register}/>
            </View>

            <View style={styles.botao}>
                <Button title="Limpar" onPress={() => {
                    setName('')
                    setLogin('')
                    setPassword('')
                    setConfirmPassword('')
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
    titulo: {
        marginTop: 40,
        marginBottom: 5,
        width: Dimensions.get('screen').width - 40,
        fontSize: 24
    },
    botao:{
        width: Dimensions.get('screen').width - 40,
        marginTop: 40
    }
})