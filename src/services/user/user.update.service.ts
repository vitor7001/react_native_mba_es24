import { sessionManager } from "../session.repository";

class UpdateUser{

    private readonly url = 'http://192.168.0.114:3000'

    public async updateUser(id: number, name: string, username: string, roles: [],password: string){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const corpo = JSON.stringify({
            name,
            username,
            roles: [],
            password
        })

        console.log("DADOS PRA ENVIAR NA API")
        console.log(corpo)
        const res = await fetch(this.url + '/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: corpo
        })


        const userCreated = await res.json() 
        console.log("RESULT API")
        console.log(userCreated)
        return userCreated
    }

}


export const updateUser = new UpdateUser();