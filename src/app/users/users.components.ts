import { User } from '../classes/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.components.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{
    title = 'Table Users Umberto';
    users: any = [];

    @Output() updateUser= new EventEmitter<User>();

    //nel costruttore passo i dati del servizio per la Dependency Injection....
    //perche se la definiamo all'interno del costruttore, questo modulo dipenderà dai dati del servizio
    constructor (private userService: UserService){    
    }

    ngOnInit(){ // gli utenti sono inizializzati quando la direttiva è stata chiamata
        this.userService.getUsers().subscribe(
            res => {
                this.users = res;
            }
        )
    }
    onDeleteUser(user: User){
        alert("Stai eliminando "+ user.name);
        this.userService.deleteUser(user);
    }

    onSelectedUser(user: User){
        //alert("Detail user: "+user.name);
        this.updateUser.emit(user);
    }

}