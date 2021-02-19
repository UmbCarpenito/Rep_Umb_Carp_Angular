import { User } from '../classes/user';
import { Component, Input, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  //private usercopy ;
  private __user: User | any;
  private usercopy: User | any;

  @Input() set user (user: User){
    this.__user = user;
    this.usercopy = Object.assign({}, user);
  }
  
  get user() {
    return this.__user;
  }
  
  constructor(private userService: UserService, private route:ActivatedRoute,
    private router: Router) {
   }

  ngOnInit(): void {
    this.user = new User();
    this.route.params.subscribe(params => {
        if(!params.id){
          return;
        }
        this.userService.getUser(+params.id).subscribe(
          (res: any)  => {
            this.user = res;
          }
          );
      });
  }

  saveUser(){
    if(this.user.id > 0){
      this.userService.updateUser(this.user).subscribe(
        res => {
          if(res.success){
            alert("Utente salvato "+res.message);
            this.router.navigate(['users']);
          } else{
            alert(res.message);
          }
        }
      );
    }else{
      this.userService.createUser(this.user);
    }
   
  }

  resetForm(){
    if(this.user.id === 0){
      this.user = new User();
    } else{
      this.user = new User();
    }
  }

  
  backUser(){
    this.router.navigate(["users"]);
  }
}
