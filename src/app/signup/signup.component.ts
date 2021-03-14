import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.usersignup.subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  signUp(form: NgForm){
    console.log("signUp form.value: ",form.value);
    this.auth.signUp(form.value.nome, form.value.email, form.value.password);
    // if(!result){
    //   return ;
    // }
    // setTimeout(() => {
    //   this.router.navigate(['']);
    // }, 300);
  }
}
