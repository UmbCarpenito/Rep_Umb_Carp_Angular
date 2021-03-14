import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './user-data/user-data.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.components';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from './route-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routers: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/newUser',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id/edit',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/:id/showUser',
    component: UserDataComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: SignupComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routers)
  ],
  exports: [
    RouterModule
  ],
  providers: [RouteGuardService]
})
export class RoutingModuleModule { }
