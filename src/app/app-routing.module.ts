import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"userprofile/:username", component:UserprofileComponent, children:[
    {path:"addtask",component:AddtaskComponent},
    {path:"viewtask",component:ViewtaskComponent}
  ]},
  {path:'', redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
