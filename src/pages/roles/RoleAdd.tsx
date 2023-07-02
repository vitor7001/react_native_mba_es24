import { useNavigation, useRoute } from '@react-navigation/native';
import React from "react";
import { View, Button, Text, TextInput, StyleSheet, Dimensions, Alert } from "react-native";
import { registerRole } from '../../services/roles/role.create.service';
import { updateRole } from '../../services/roles/role.update.service';

type Props = { role: any }

export default function RoleAdd(props: Props) {

    const navigation = useNavigation();
    const route = useRoute()

    const [id, setId] = React.useState(null)
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('')

    const { role } = route.params || props;

    React.useEffect(() => {
        if (role) {
            setId(role.id)
            setName(role.name);
            setDescription(role.description);
        } else {
            console.log("PROPS VAZIA")
        }
        
    }, [role]);

    async function register() {

        if (!name || name.trim() === '') {

            Alert.alert("Aviso, preencha o campo: Nome")
            return
        } else if (!description || description.trim() === '') {

            Alert.alert("Aviso, preencha o campo: Descrição")
            return
        }

        if (id) {

            await updateRole.updateRole(id, name, description).then(data => {
                if (data.id) {
                    Alert.alert(`Role ${name} atualizado com sucesso!`)
                    navigation.goBack()
                } else {
                    Alert.alert(data.message)
                }
            })

        } else {

            await registerRole.registerRole(name, description).then(data => {
                if (data.id) {
                    Alert.alert(`Role ${name} cadastrada com sucesso!`)

                    navigation.goBack()
                } else {
                    Alert.alert(data.message)
                }
            }).catch(error => navigation.navigate('Login'))
        }


    }

    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>{id ? "Atualize uma role": "Cadastre uma role"}</Text>

            <Text style={styles.label}>Nome:</Text>
            <TextInput value={name} style={styles.input} onChangeText={setName} editable={!id}/>


            <Text style={styles.label}>Descrição:</Text>
            <TextInput value={description} style={styles.input} onChangeText={setDescription} />

           
            <View style={styles.botao}>
                <Button title={id ? "Atualizar" : "Registrar"} onPress={register}/>
            </View>


            <View style={styles.botao}>
                <Button title="Limpar" onPress={() => {
                    setName('')
                    setDescription('')
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
        padding: 5
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
    botao: {
        width: Dimensions.get('screen').width - 40,
        marginTop: 40
    }
})