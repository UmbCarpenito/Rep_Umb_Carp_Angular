import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  user: any = [];
  title="Info User";
 
  constructor(private route:ActivatedRoute, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.route.params.subscribe(p => {

      this.userService.getUser(+p.id).subscribe(
          (res) => {
            this.user = res ;
          },
          error => {
            console.log("error UserShow "+error.error.message);
            alert(error.error.message);
          }
      );

    });
  }

}
