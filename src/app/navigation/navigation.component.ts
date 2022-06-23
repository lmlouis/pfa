import { ProfileService } from './../profile/service/profile.service';
import { AppComponent } from './../app.component';
import { User } from './../auth/model/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { Roles } from './../profile/model/role.model';
import { AuthService } from 'src/app/firebase/services/auth.service';
import { Profile } from './../profile/model/profile.model';
import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';

import { collection, doc, query, where } from "firebase/firestore";
import { rejects } from 'assert';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  profile: Profile = new Profile();
  Auth = getAuth();
  userCurrente = this.Auth.currentUser

  



  constructor(public auth :  AuthService) { 

    // @ts-ignore
    this.profile = auth.getProfileConected(this.userCurrente);
      
}




  ngOnInit(): void {
  }

}
