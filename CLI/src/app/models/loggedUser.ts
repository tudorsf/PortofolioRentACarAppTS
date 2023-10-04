export class LoggedUser{
    id: number;
    userName: string;
    token: string;
    role: string;
    
    

    constructor(id: number, userName: string, token: string, role: string){
        this.id = id;
        this.userName = userName;
        this.token = token;
        this.role = role;
        
    }

    
}