export class LoggedUser{
    id: number;
    userName: string;
    token: string;
    roleRef: number;

    constructor(id: number, userName: string, token: string, roleRef: number){
        this.id = id;
        this.userName = userName;
        this.token = token;
        this.roleRef = roleRef;
    }

    
}