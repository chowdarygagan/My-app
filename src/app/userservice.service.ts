import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable , BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(public clientObj:HttpClient,public router:Router) { }


userBehaviourSubject = new BehaviorSubject(null)
 userObservable = this.userBehaviourSubject.asObservable()
  

  registerUser(value):Observable<any>{

    return this.clientObj.post('http://localhost:5000/user/createuser', value)
  }
  loginUser(userObj):Observable<any>{
    return this.clientObj.post('http://localhost:5000/user/login', userObj)
  }

  getUserBehaviourSubject(){

    return this.userBehaviourSubject
  }

  userLogout(){

   localStorage.removeItem("token")

   this.getUserBehaviourSubject().next(null)
  

  }

  addTask(userObj):Observable<any>{
    return this.clientObj.post('http://localhost:5000/user/addtask', userObj)
  }
}
