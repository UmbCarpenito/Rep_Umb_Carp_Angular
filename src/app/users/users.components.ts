import { User } from '../classes/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

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
    constructor (private userService: UserService,  private router: Router){    
    }

    ngOnInit(){ // gli utenti sono inizializzati quando la direttiva è stata chiamata
        this.userService.getUsers().subscribe(
            res => {
                this.users = res;
            }
        )
    }
    onDeleteUser(user: User){
       // alert("Stai eliminando "+ user.name);
        this.userService.deleteUser(user).subscribe(
            res => {
                if(res.success){
                    console.log("res: "+ res.success);
                    alert("Utente eliminato");
                   this.userService.getUsers().subscribe(res=>{this.users = res});
                   // this.router.navigate(['users']);
                }
            },
            (err:any) => {
                console.log("err.message onDeleteUser",err.message);
            }
        );
    }

    onSelectedUser(user: User){
        //alert("Detail user: "+user.name);
        this.updateUser.emit(user);
    }

}