import { sessionManager } from "../session.repository";

class RegisterRole{

    private readonly url = 'http://192.168.0.105:3000'

    public async registerRole(name: string, description: string){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                name,
                description
            })
        })

        const roleCreated = await res.json() 

        return roleCreated
    }

}


export const registerRole = new RegisterRole();