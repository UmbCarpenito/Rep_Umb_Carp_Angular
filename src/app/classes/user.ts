import { UserInterface } from '../interfaces/user';

export class User implements UserInterface{
    id: number ;
    name: string;
    lastname: string;
    email: string;
    fiscalcode: string;
    telephone: string;
    province: string;
    age: number;

    constructor(){
        this.id = 0;
        this.name= '';
        this.lastname= '';
        this.email= '';
        this.fiscalcode= '';
        this.telephone= '';
        this.province= '';
        this.age= 18;
    }
}