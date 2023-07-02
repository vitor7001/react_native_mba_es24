import { sessionManager } from "../session.repository";

class ListRoles{

    private readonly url = 'http://192.168.0.105:3000'

    public async listRoles(){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/roles/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })


        if(res.status === 200){
            const roles = await res.json() 

            return roles 
        }

        const error = await res.json()
        return {errorMessage: error.message}
    }

}


export const listRoles = new ListRoles();