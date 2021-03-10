import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

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
  }

  signIn(form: NgForm){
    // console.log(form.value)
    // console.log(form.valid)
    if(!form.valid){
      return false;
    }
    let result = this.auth.signIn(form.value.email, form.value.password);
    console.log("result ", result)
    // if(result){
    //   setTimeout(() => {
    //     console.log("login component");
    //     this.httpClient.get(this.API_URL_USERS);
        
    //   }, 800);
    //   this.router.navigate(['']);
    // }
    setTimeout(() => {
      this.router.navigate(['']);
    }, 11800);
    return true;
   }


}
