import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userObj;

  constructor(private us:UserserviceService) { }



  ngOnInit(): void {

    this.userObj = this.us.getUserBehaviourSubject().getValue()

  }

}
