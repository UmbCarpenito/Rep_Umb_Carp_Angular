import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private API_URL_USERS = 'http://localhost:8080/users/';

  constructor(private auth:AuthService, private router:Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.auth.usersignin.subscribe(
      (user: User) => {
        this.router.navigate(['/']);
      }
    );
  }

  signIn(form: NgForm){
 
    if(!form.valid){
      return false;
    }
    let result = this.auth.signIn(form.value.email, form.value.password);   
    // setTimeout(() => {
    //   this.router.navigate(['']);
    // }, 11800);
    return true;
   }


}
