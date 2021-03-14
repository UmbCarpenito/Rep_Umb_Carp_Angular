import { Injectable } from "@angular/core";
import { User } from "../classes/user";
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

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

    constructor(private httpClient: HttpClient, private auth: AuthService){
    }
   
    getAuthHeader(): HttpHeaders{
        let headers = new HttpHeaders(
            {
                Authorization : 'Bearer ' + this.auth.getToken()
            }
        );
        return headers;
    }

    getUsers(){
        //return this.users;

        // let value = localStorage.getItem('token');
        // const headerDict = {
        //     'Content-Type': 'application/json',
        //     'Accept': '*/*',
        //     'Access-Control-Allow-Headers':  'Content-Type',
        //     'Authorization':`Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('token'))!)}` //'Bearer \''+value+'\''
        //   }
        //   const requestOptions = {                                                                                                                                                                                 
        //     headers: new HttpHeaders(headerDict), 
        //   };

        console.log("user service getToken "+ localStorage.getItem('token'))
      //   return this.httpClient.get(this.API_URL_USERS,requestOptions)
         return this.httpClient.get(this.API_URL_USERS,{
            headers: this.getAuthHeader()
         })

         // return this.httpClient.get(this.API_URL_USERS)
    }

    deleteUser(user: User){
        // let index = this.users.indexOf(user);
        // if(index >= 0){
        //     this.users.splice(index,1);
        // }
        console.log("delete "+ user.id)
        return this.httpClient.delete<UserResponse>(this.API_URL_USERS + user.id,{
            headers: this.getAuthHeader()
         });
    }

    updateUser(user: User){
        // const idx = this.users.findIndex((v) => v.id === user.id); // verifico l'id che viene passata alla funzione con quello dell'utente... 
        // if(idx !== -1){
        //     this.users[idx]= user;
        // }
        // console.log(user);
        // console.log(this.API_URL_USERS + user.id)
        return this.httpClient.put(this.API_URL_USERS + user.id, user,{
            headers: this.getAuthHeader()
         });
    }

    createUser(user: User){
        // user.id = this.users.length +1;
        // this.users.splice(0,0,user);
        return this.httpClient.post(this.API_URL_USERS, user,{
            headers: this.getAuthHeader()
         });
    }

    getUser(id: number){
        //return this.users.find(user => user.id === index);
        return this.httpClient.get<UserResponse>(this.API_URL_USERS + id, {
            headers: this.getAuthHeader()
         });
    }
}