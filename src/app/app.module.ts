import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AuthorisationService } from './authorisation.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    UserprofileComponent,
    AddtaskComponent,
    ViewtaskComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
{
  provide:HTTP_INTERCEPTORS,
  useClass:AuthorisationService,
  multi:true

}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
