import { Component, OnInit, TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 signupForm:FormGroup;

 registeerError={
   error:false,
   errormessage:" "
 }

  constructor(private fb:FormBuilder, public us:UserserviceService, public router:Router, public modalservice:BsModalService) { }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      username:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(5)]],
      email:['', Validators.required],
      city:['', Validators.required],
      
    })

  }


  filename:string
  file:File
  imageUrl:string | ArrayBuffer="https://bulma.io/images/placeholders/480x480.png"


  onFileSelected(file:File){
   
    this.file = file
    this.filename = file.name

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload=()=>{
      this.imageUrl = reader.result

    }

  }

  formSubmit(template:TemplateRef<any>){
    console.log(this.signupForm.value)

    let formdata =new FormData()

    let userObj = this.signupForm.value

    formdata.append("userObj",JSON.stringify(userObj))
    formdata.append("photo",this.file)

    console.log(formdata)

    this.us.registerUser(formdata).subscribe({
      next:(res)=>{
        if(res.message ==='user already exist'){
          this.registeerError.error=true,
          this.registeerError.errormessage=res.message
        }
        else{
          this.openModal(template)
        }
      },
      error:(err)=>{
        console.log(err)
        alert("something went wrong")
      }
    })

  }

  

  get usernames(){
    return this.signupForm.get('username')
  }
  get passwords(){
    return this.signupForm.get('password')
  }
  get emails(){
  return this.signupForm.get('email')
  }
  get cities(){
    return this.signupForm.get('city')
  }
  modalRef?:BsModalRef;



  openModal(template:TemplateRef<any>){
  
  this.modalRef=this.modalservice.show(template,{class:'modal-sm'});
  
  }
  
  
  
  confirm():void{
  
  this.router.navigateByUrl("/login")
  
  this.modalRef?.hide();
  }
  
  
  
  decline():void{
  
  this.router.navigateByUrl("/home")
  
  this.modalRef?.hide();
  
  
  
  }

}
