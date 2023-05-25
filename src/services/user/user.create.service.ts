import { sessionManager } from "../session.repository";

class RegisterUser{

    private readonly url = 'http://192.168.0.113:3000'

    public async registerUser(name: string, username: string, roles: Array<String>, password: string){
        const user = await sessionManager.getLoggedUser()

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

        if(userCreated && userCreated.message)
            return {create: false, message: userCreated.message }
        
        return {create: true, message: false}
    }

}


export const registerUser = new RegisterUser();