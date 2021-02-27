import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = true;
  @Output() usersignin = new EventEmitter<User>();
  @Output() usersignup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();

  constructor() { }

  isUserLoggedIn(){
    this.isUserLogged = !!localStorage.getItem('token');
    console.log("isUserLoggedIn ", this.isUserLogged)
    return this.isUserLogged;
  }

  signIn(email:string, password: string):boolean{
    console.log("signIn: ", email+ " " + password);
    let user = new User();
    user.name = "test";
    user.email ="test@signin.it";
    this.usersignin.emit(user);
    localStorage.setItem('token', email);
    return this.isUserLogged;
  }

  signUp(name: string,email:string, password: string){
    console.log("signUp: ", name, " ",email, " ", password);
    localStorage.setItem('token', email);
    let user = new User();
    user.name = name;
    user.email = email;
    this.usersignup.emit(user);
    // if(!localStorage.getItem('token')){
    //   return false;
    // }
    return true;
  }

  logout(){
    this.userlogout.emit();
    localStorage.removeItem("token");
    this.isUserLogged = false;
  }

}
