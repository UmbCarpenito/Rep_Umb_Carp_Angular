import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.components';
import { UserService } from './service/user.service';

import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModuleModule } from './routing-module.module';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserDetailComponent,
    NavComponent,
    UserDataComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // da importare quando utilizzo la funzione ngModel
    HttpClientModule,
    RoutingModuleModule
  ],
  providers: [UserService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
