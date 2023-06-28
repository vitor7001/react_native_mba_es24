import { sessionManager } from "../session.repository";

class RegisterUser{

    private readonly url = 'http://192.168.0.114:3000'

    public async registerUser(name: string, username: string, roles: Array<String>, password: string){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                name,
                username,
                roles,
                password
            })
        })

        const userCreated = await res.json() 

        return userCreated
    }

}


export const registerUser = new RegisterUser();