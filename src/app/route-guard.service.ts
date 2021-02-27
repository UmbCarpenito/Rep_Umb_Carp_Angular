import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private router: Router, private auth:AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any{
    if(this.auth.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login']);
    }
    
  }
  
}
