import { useNavigation, useRoute } from '@react-navigation/native';
import React from "react";
import { View, Button, Text,TextInput, StyleSheet, Dimensions, Alert, FlatList } from "react-native";
import { registerUser } from '../../services/user/user.create.service';
import {updateUser} from '../../services/user/user.update.service';

import ItemRoles from '../../components/ItemRoles';
import {listRoles} from '../../services/roles/roles.list.service'

import {getUser} from '../../services/user/user.get.service'

type Props = {user: any}

export default function UserRegister(props: Props){

    const navigation = useNavigation();
    const route = useRoute()

    const [id, setId] = React.useState(null)
    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');    

    const [roles, setRoles] = React.useState<any[]>([])

    const [userRoles, setUserRoles] = React.useState<any[]>([])

    const [selectedRoles, setSelectedRoles] = React.useState<any[]>([]);
    
    const { user } = route.params || props; 

 
    React.useEffect(() => {
    if (user){

        getUser.getUser(user.id).then(data => {
            setId(data.id)
            setName(data.name);
            setLogin(data.username);
            setPassword(data.password);
            setUserRoles(data.roles)
        }) 

    }else{
        console.log("PROPS VAZIA")
    }


    listRoles.listRoles().then(data =>{
        if(data.errorMessage){
            Alert.alert('Erro ao listar roles: ', data.errorMessage)
        }else{

            setRoles(data)
        }
    })
}, [user]);

    async function  register(){
        
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

        const idsRoles = selectedRoles.map((item) => item.id)
        

        if(id){

            await updateUser.updateUser(id,name, login, idsRoles, password).then(data =>{
                if(data.id){
                    Alert.alert(`Usuário ${name} atualizado com sucesso!`)
                    navigation.goBack()
                }else{
                    Alert.alert(data.message)
                }
            })

        }else {

            await registerUser.registerUser(name,login,idsRoles, password).then(data =>{
                if(data.id){
                    Alert.alert(`Usuário ${name} cadastrado com sucesso!`)
    
                    navigation.goBack()
                }else{
                    Alert.alert(data.message)
                }
            }).catch(error => navigation.navigate('Login'))
        }


    }

    return(

        <View style={styles.container}>
            <Text style={styles.titulo}>{id ? "Atualize os dados do Usuário" : "Cadastre um Usuário"}</Text>
       
       
            <Text style={styles.label}>Nome:</Text>
            <TextInput value={name} style={styles.input} onChangeText={setName}/>
            
            <Text style={styles.label}>Login:</Text>
            <TextInput value={login} style={styles.input} onChangeText={setLogin}/>

            <Text style={styles.label}>Senha:</Text>
            <TextInput value={password} style={styles.input} onChangeText={setPassword} secureTextEntry/>

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput value={confirmPassword} style={styles.input} onChangeText={setConfirmPassword} secureTextEntry/>


            <FlatList
            data={roles}
            renderItem={({ item }) => {
                return (
                <ItemRoles role={item} userRoles={userRoles} selectedRoles={selectedRoles} onRoleToggle={role => setSelectedRoles(prevRoles => {
                    if (prevRoles.includes(role)) {
                    return prevRoles.filter(prevRole => prevRole !== role);
                    } else {
                    return [...prevRoles, role];
                    }
                })} />
                );
            }}
            />

            <View style={styles.botao}>
                <Button title={id ? "Atualizar" : "Registrar"} onPress={register}/>
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

