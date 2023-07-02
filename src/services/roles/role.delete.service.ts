import { sessionManager } from "../session.repository";

class DeleteRole{

    private readonly url = 'http://192.168.0.105:3000'

    public async deleteRole(id: number){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const res = await fetch(this.url + '/roles/'  + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const roleDeleted = await res.json() 

        return roleDeleted
    }

}


export const deleteRole = new DeleteRole();