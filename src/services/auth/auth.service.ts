import { sessionManager } from "../session.repository";

class AuthService{
    private readonly url = 'http://192.168.0.113:3000'

    public async login(username: string, password: string ){


        const response = await fetch(this.url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username, password 
            })
        })

        const logged = await response.json()

        if(logged && logged.token){
            await sessionManager.setLoggedUser(logged)
            return true
        }
        return false
    }

}

export const authService = new AuthService();