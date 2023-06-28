import { sessionManager } from "../session.repository";

class DeleteUser{

    private readonly url = 'http://192.168.0.114:3000'

    public async deleteUser(id: number){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/users/'  + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const userCreated = await res.json() 

        return userCreated
    }

}


export const deleteUser = new DeleteUser();