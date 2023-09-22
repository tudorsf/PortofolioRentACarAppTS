export class UserAuth{
    userName: string;
    password: string;
    roleRef: number;

    constructor(userName: string, password: string, roleRef: number){
        this.userName = userName;
        this.password = password;
        this.roleRef = roleRef;
    }

    
}