import { sessionManager } from "../session.repository";

class UpdateRole{

    private readonly url = 'http://192.168.0.105:3000'

    public async updateRole(id: number, name: string, description: string){
        const user = await sessionManager.getLoggedUser()

        if(!user) throw new Error("Não há usuário no local storage para ser utilizado")

        const corpo = JSON.stringify({
            name,
            description
        })

        console.log("DADOS PRA ENVIAR NA API")
        console.log(corpo)
        const res = await fetch(this.url + '/roles/' + id, {
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


export const updateRole = new UpdateRole();