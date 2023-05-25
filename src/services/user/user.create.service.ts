import { sessionManager } from "../session.repository";

class RegisterUser{

    public async registerUser(username: string, login: string, roles: Array<String>, password: string){
        const user = await sessionManager.getLoggedUser()

        console.log("USER SESSION")
        console.log(user)
    }

}


export const registerUser = new RegisterUser();