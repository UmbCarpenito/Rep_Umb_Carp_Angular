import { Injectable } from "@angular/core";
import { User } from "../classes/user";
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface UserResponse{
    data: User;
    message: string;
    success: boolean;
}

@Injectable() // indica ad Angular che questo servizio può avere delle dipendenze....è un decorator 

export class UserService{
    users: User[] = [];

    private API_URL_USERS = 'http://localhost:8080/users/';    

    // users: User[] = [
    //     {
    //         id: 1,
    //         name: 'Umberto1',
    //         lastname: 'Carpenito',
    //         email: 'email1@gmail.com',
    //         fiscalcode: 'CRPMRT93E15A489T',
    //         telephone: '01',
    //         province: 'AV',
    //         age: 22
    //     },
    //     {
    //         id: 2,
    //         name: 'Umberto2',
    //         lastname: 'Carpenito',
    //         email: 'email2@gmail.com',
    //         fiscalcode: 'CRPMRT93E15A489T',
    //         telephone: '01',
    //         province: 'AV',
    //         age: 23
    //     },
    //     {
    //         id: 3,
    //         name: 'Umberto3',
    //         lastname: 'Carpenito',
    //         email: 'email3@gmail.com',
    //         fiscalcode: 'CRPMRT93E15A489T',
    //         telephone: '01',
    //         province: 'AV',
    //         age: 24
    //     }
    // ];

    constructor(private httpClient: HttpClient){
    }
   
    getUsers(){
        //return this.users;
        console.log("prova user service ", this.API_URL_USERS)
        return this.httpClient.get(this.API_URL_USERS);
    }

    deleteUser(user: User){
        let index = this.users.indexOf(user);
        if(index >= 0){
            this.users.splice(index,1);
        }
        
    }

    updateUser(user: User){
        // const idx = this.users.findIndex((v) => v.id === user.id); // verifico l'id che viene passata alla funzione con quello dell'utente... 
        // if(idx !== -1){
        //     this.users[idx]= user;
        // }
        console.log(user);
        console.log(this.API_URL_USERS + '/' + user.id)
        return this.httpClient.put<UserResponse>(this.API_URL_USERS + '/' + user.id, user);
    }

    createUser(user: User){
        this.users.splice(0,0,user);
    }

    getUser(id: number){
        //return this.users.find(user => user.id === index);
        return this.httpClient.get(this.API_URL_USERS + '/' + id);
    }
}