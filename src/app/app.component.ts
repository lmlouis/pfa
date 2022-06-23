import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, User } from 'firebase/auth';
import { AuthService } from './firebase/services/auth.service';
import { Profile } from './profile/model/profile.model';
import { Roles } from './profile/model/role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Communauté PME';

  user: any;
  profile: Profile = new Profile();
  role = Roles ;
  userConnected!: User | any;
  u!: User;
  Auth = getAuth();
  userCurrente = this.Auth.currentUser
  



  constructor(public auth :  AuthService, public db : AngularFirestore ) { 
    if(this.userCurrente){
      console.log(this.userCurrente.email)
      auth.updataProfile(this.userCurrente)
      this.profile = auth.profile
      //console.log("profile connecté  : "+ this.userCurrente.email)
    }
      
    }

    
}
