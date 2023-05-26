import { sessionManager } from "../session.repository";

class ListUsers{

    private readonly url = 'http://192.168.0.113:3000'

    public async listUser(){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })


        if(res.status === 200){
            const userCreated = await res.json() 

            return userCreated 
        }

        const error = await res.json()
        return {errorMessage: error.message}
    }

}


export const listUsers = new ListUsers();