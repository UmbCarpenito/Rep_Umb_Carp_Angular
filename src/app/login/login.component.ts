import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';


interface UserJwt {
  token: string,
  email: string,
  username: string
}

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
    // this.auth.usersignin.subscribe(
    //   (user: User) => {
    //     this.router.navigate(['/']);
    //   }
    // );
  }

  signIn(form: NgForm){
 
    if(!form.valid){
      return false;
    }
    this.auth.signIn(form.value.email, form.value.password)
      .subscribe(
        (payload: UserJwt) => {
          console.log("Login component SignIn SUCCESSFULL")
          alert("Login Successfull");
          this.router.navigate(['/']);
        },
        (error) =>{
          console.log("loginComponent error ", error)
          switch(error.status){
            case 401:
              alert("Error 401\n"+ error.message);
              break;
            case 404:
              alert("Error 404\n"+ error.error.message);
              break;
             case 500:
              alert("Error 500 \n"+ error.message);
              break;
            default:
              alert("Error\n"+ error.message);
              break;
          }
        }
      )
    
    return true;
   }


}
