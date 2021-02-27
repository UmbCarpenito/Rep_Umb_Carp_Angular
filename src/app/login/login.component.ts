import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  signIn(form: NgForm){
    // console.log(form.value)
    // console.log(form.valid)
    if(!form.valid){
      return false;
    }
    let result = this.auth.signIn(form.value.email, form.value.password);
    console.log(result)
    if(result){
      console.log("prova")
      this.router.navigate(["/"]);
      return true;
    }
    return false;
   }


}
