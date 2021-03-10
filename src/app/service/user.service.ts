import { Injectable } from "@angular/core";
import { User } from "../classes/user";
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';

interface UserResponse{
    data: User;
    message: string;
    success: boolean;
}

@Injectable() // indica ad Angular che questo servizio può avere delle dipendenze....è un decorator 

export class UserService{
    [x: string]: any;
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
        let value = localStorage.getItem('token');
        //const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Headers':  'Content-Type',
            'Authorization':`Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('token'))!)}` //'Bearer \''+value+'\''
          }
          
          const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
          };

        console.log("user service getToken "+ localStorage.getItem('token'))
         return this.httpClient.get(this.API_URL_USERS,requestOptions)
             //{//JSON.parse(localStorage.getItem('token')!
          //        headers:  new HttpRequest().('Authorization', `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('token'))!)}`)
        //    headers: new HttpHeaders().set('Authorization', `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('token'))!)}`)
        //    });
         // return this.httpClient.get(this.API_URL_USERS)
    }

    deleteUser(user: User){
        // let index = this.users.indexOf(user);
        // if(index >= 0){
        //     this.users.splice(index,1);
        // }
        console.log("delete "+ user.id)
        return this.httpClient.delete<UserResponse>(this.API_URL_USERS + user.id);
    }

    updateUser(user: User){
        // const idx = this.users.findIndex((v) => v.id === user.id); // verifico l'id che viene passata alla funzione con quello dell'utente... 
        // if(idx !== -1){
        //     this.users[idx]= user;
        // }
        // console.log(user);
        // console.log(this.API_URL_USERS + user.id)
        return this.httpClient.put(this.API_URL_USERS + user.id, user);
    }

    createUser(user: User){
        // user.id = this.users.length +1;
        // this.users.splice(0,0,user);
        return this.httpClient.post(this.API_URL_USERS, user);
    }

    getUser(id: number){
        //return this.users.find(user => user.id === index);
        return this.httpClient.get<UserResponse>(this.API_URL_USERS + id);
    }
}