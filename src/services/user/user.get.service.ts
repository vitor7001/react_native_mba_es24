import { sessionManager } from "../session.repository";

class GetUser{

    private readonly url = 'http://192.168.0.105:3000'

    public async getUser(id: any){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/users/' + id, {
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


export const getUser = new GetUser();