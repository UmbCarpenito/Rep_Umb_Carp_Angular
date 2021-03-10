import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';

interface Jwt {
    token: string,
    email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = true;
  @Output() usersignin = new EventEmitter<User>();
  @Output() usersignup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();
  private API_URL_LOGIN = 'http://localhost:8080/login';

  constructor(private httpClient: HttpClient) { }

  isUserLoggedIn(){
    this.isUserLogged = !!localStorage.getItem('token');
    console.log("isUserLoggedIn ", this.isUserLogged)
    return this.isUserLogged;
  }

  //metodo di login
  signIn(email:string, password: string){
    console.log("signIn: ", email+ " password: " + password);
    let val = this.httpClient.post<Jwt>(this.API_URL_LOGIN,
      {
        email: email,
        password: password
      }).subscribe(
        (payload: Jwt) => {
          console.log("auth service signIn payload.token "+ payload.token)
          localStorage.setItem('token', payload.token);
          localStorage.setItem('user', payload.email);
          console.log("auth service token ",payload.token);
          console.log("auth service email ",payload.email);
          let user = new User();
          //user.name = "Test Auth";
          user.email =payload.email;
          
          this.usersignin.emit(user);
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.log("error auth.service ", httpErrorResponse)
          alert("ERROR\n"+ httpErrorResponse.error.message)
          return false;
        },
      )
      console.log("val "+val);
      
      return val;
    // let user = new User();
    // user.name = "Test Auth";
    // user.email ="test@signin.it";
    // this.usersignin.emit(user);
    // localStorage.setItem('token', email);
  }

  signUp(name: string,email:string, password: string){
    console.log("signUp: ", name, " ",email, " ", password);
    localStorage.setItem('token', email);
    let user = new User();
    console.log("NOME ", name);
    user.name = name;
    user.email = email;
    this.usersignup.emit(user);
    // if(!localStorage.getItem('token')){
    //   return false;
    // }
    return true;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.userlogout.emit();
    this.isUserLogged = false;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUser(): User {
    var token = []
    console.log("localStorage.getItem('user') "+localStorage.getItem('user'));
   const data= localStorage.getItem('user');
     let user = new User();
     if(data){
       user.name = data;
     }
    return user;
  }


}
