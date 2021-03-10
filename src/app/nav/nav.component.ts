import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, Routes } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isUserLoggedIn = false;
  username:string ="default";

  constructor(private auth:AuthService, private router:Router) {
    auth.usersignin.subscribe(
      (user:User) => {
        this.username = user.name;
        this.isUserLoggedIn = true;
      }
    );
    auth.userlogout.subscribe(
      () => {
        this.username = "";
        this.isUserLoggedIn = false;
      }
    );
    auth.usersignup.subscribe(
      (user:User) => {
        this.username = user.name;
        this.isUserLoggedIn = true;
      }
    );
   }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
    if(this.isUserLoggedIn){
      const user = this.auth.getUser();
      this.username = user.name;
    }
  }

  addUser(){ 
  }

  //metodo per fare il login
  signIn(e: any){
    e.preventDefault();
    this.router.navigate(['login']);
  }

  //metodo per fare la registry
  signUp(e: any){
    console.log("isUserLoggedIn ", this.isUserLoggedIn)
    e.preventDefault();
    this.router.navigate(['register']);
  }

  logout(e: any){
    e.preventDefault();
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
