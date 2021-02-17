import { Component } from '@angular/core';
import { User } from './classes/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'Prova Title app.component';
  
  showForm = false; //il form deve essere mostrato soltanto quando premo un utente...quindi ngIf viene basata su questa variabile
  userSelected: User = new User();

  updateUser(user: User){
    this.showForm= true;
    this.userSelected = user;
  }

  newUser(){
    this.userSelected = new User();
    this.showForm= true;
  }

}
