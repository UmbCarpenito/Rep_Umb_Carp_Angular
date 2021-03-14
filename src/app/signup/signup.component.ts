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
   
  }

  async signUp(form: NgForm){
    console.log("signUp form.value: ",form.value);
    
    try{
      const resp = await this.auth.signUp(form.value.nome, form.value.email, form.value.password).
        toPromise();
        alert("Utente " + resp.username + " registrato");
        this.router.navigate(['login']);
    }
    catch(e){
      console.log("Error signup component ",e)
      switch(e.status){
        case 401:
          alert("Error 401\n"+ e.message);
          break;
        case 404:
          alert("Error 404\n"+ e.message);
          break;
         case 500:
          alert("Error 500 \n"+ e.message);
          break;
        default:
          alert("Error\n"+ e.message);
          break;
      }
    }
    // if(!result){
    //   return ;
    // }
    // setTimeout(() => {
    //   this.router.navigate(['']);
    // }, 300);
  }
}
