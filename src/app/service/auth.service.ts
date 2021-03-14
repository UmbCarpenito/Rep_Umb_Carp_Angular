import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import {tap} from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface UserJwt {
    token: string,
    email: string,
    username: string
}
interface UserResponseRegister {
  email: string,
  username: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = true;
  @Output() usersignin = new EventEmitter<User>();
  @Output() usersignup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();
  private API_URL_LOGIN = environment.API_URL+'login';
  private API_URL_REGISTER = environment.API_URL+'register';

  constructor(private httpClient: HttpClient) {
   }

  isUserLoggedIn(){
    this.isUserLogged = !!localStorage.getItem('token');
    console.log("isUserLoggedIn ", this.isUserLogged)
    return this.isUserLogged;
  }

  //metodo di login
  signIn(email:string, password: string){
    console.log("signIn: ", email+ " password: " + password);
    return this.httpClient.post<UserJwt>(this.API_URL_LOGIN,
      {
        email: email,
        password: password
      }).pipe(
        tap(
    //  subscribe(
        (payload: UserJwt) => {
          console.log("auth service signIn payload.token "+ payload.token)
          localStorage.setItem('token', payload.token);
          localStorage.setItem('user_email', payload.email);
          localStorage.setItem('username', payload.username);
          console.log("auth service token ",payload.token);
          console.log("auth service username ",payload.username);
          console.log("auth service email ",payload.email);
          let user = new User();
          //user.name = "Test Auth";
          user.name =payload.username;
          
          this.usersignin.emit(user);
          return true;
        }
        // ,
        // (httpErrorResponse: HttpErrorResponse) => {
        //  console.log("AuthService error auth.service ", httpErrorResponse)
        //   alert("ERROR\n"+ httpErrorResponse.error.message)
        //   return false;
        // },
      ))

  }

  //metodo di registrazione
  signUp(username: string,email:string, password: string){
    console.log("AuthService signUp username", username, " email ",email, " password ", password);
    let user = new User();
    return this.httpClient.post<UserResponseRegister>(this.API_URL_REGISTER,
      {
        username: username,
        email: email,
        password: password
      }).pipe(tap(
      //subscribe(
        (payload: UserResponseRegister) => {
          localStorage.setItem('user_email', payload.email);
          localStorage.setItem('username', payload.username);
          console.log("auth service signUp username ",payload.username);
          console.log("auth service signUp email ",payload.email);
         
          user.name =payload.username;
          
          this.usersignup.emit(user);
        },
        // (httpErrorResponse: HttpErrorResponse) => {
        //  console.log("AuthService error auth.service ", httpErrorResponse)
        //   alert("ERROR\n"+ httpErrorResponse.error.message)
        //   return false;
        // },
      )
      )
    //let val = this.httpClient.post<Jwt>
    // localStorage.setItem('token', email);
    // let user = new User();
    // console.log("NOME ", name);
    // user.name = name;
    // user.email = email;
    // this.usersignup.emit(user);
    // if(!localStorage.getItem('token')){
    //   return false;
    // }
   // return true;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_email");
    this.userlogout.emit();
    this.isUserLogged = false;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUser(): User {
    var token = []
    console.log("localStorage.getItem('user') "+localStorage.getItem('user'));
    const username = localStorage.getItem('username');
     let user = new User();
     if(username){
       user.name = username;
     }
    return user;
  }


}
