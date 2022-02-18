import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  constructor( public fb:FormBuilder, public us:UserserviceService) { }

  addTaskForm:FormGroup

  addedtask:any=[]

  userName:any=''

 





  ngOnInit(): void {

    this.addTaskForm = this.fb.group({

      addtask:['',Validators.required],
      date:['', Validators.required],
      description:['', Validators.required]

    })
  }

  

  formSubmit(){

  

    this.us.getUserBehaviourSubject().subscribe({
      next:(res)=>{

         this.userName = res.username

        console.log(this.userName)
      },
      error:()=>{}
    })

   

    console.log(this.addedtask)

    this.addedtask.push(this.addTaskForm.value)

    
    

   
    this.us.addTask(this.addTaskForm.value).subscribe({
      next:(res)=>{
       console.log(res)
      },
      error:(err)=>{
        console.log(err.message)
      }
    })

  }
  get addtasks(){
    return this.addTaskForm.get('addtask')
  }
  get dates(){
    return this.addTaskForm.get('date')
  }
  get des(){
    return this.addTaskForm.get('description')
  }

}
