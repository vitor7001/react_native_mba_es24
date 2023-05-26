import { sessionManager } from "../session.repository";

class UpdateUser{

    private readonly url = 'http://192.168.0.113:3000'

    public async updateUser(id: number, name: string, username: string, password: string){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                name,
                username,
                roles: [],
                password
            })
        })

        const userCreated = await res.json() 

        return userCreated
    }

}


export const updateUser = new UpdateUser();