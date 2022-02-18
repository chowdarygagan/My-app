import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(public fb:FormBuilder, public us:UserserviceService, public router:Router) { }

  loginForm:FormGroup

  registeerError={
    error:false,
    errormessage:" "
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(5)]],
    })
  }
  
  formSubmit(){

    this.us.loginUser(this.loginForm.value).subscribe({
      next:(res)=>{
        if(res.message !=='login success'){
          this.registeerError.error=true,
          this.registeerError.errormessage=res.message
        }
        else{

         

          localStorage.setItem("token", res.token)

          // this.router.navigateByUrl("/userprofile")

          this.us.getUserBehaviourSubject().next(res.person)

          // go to user profile

          this.router.navigateByUrl(`/userprofile/${res.person.username}`)


          
        }
      },
      error:(err)=>{
        console.log(err)
        alert("something went wrong")
      }
    })

  }



  get usernames(){
    return this.loginForm.get('username')
  }
  get passwords(){
    return this.loginForm.get('password')
  }

}
