import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  @Input('user-data') user!: User;
  @Output('onDeleteUser') userDeleted = new EventEmitter();
  @Output('onSelectedUser') selectedUser = new EventEmitter();
  @Output('onInseredUser') inseredUser = new EventEmitter();

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  deleteUser( ){
    this.userDeleted.emit(this.user);
  }

  updateUser(){
    this.router.navigate(["users", this.user.id, "edit"]);
    const userCopy = Object.assign({},this.user); // definisco una copia dell'oggetto user cosi quando lo modifico del form, automaticamente questo non viene modificato nella tabella
    this.selectedUser.emit(userCopy);
  }

  infoUser(){
    this.router.navigate(["users", this.user.id, "showUser"]);
  }

}
