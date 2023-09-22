export class UserAuth{
    id: number;
    userName: string;
    password: string;
    roleRef: number;

    constructor(id:number, userName: string, password: string, roleRef: number){
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.roleRef = roleRef;
    }

    
}