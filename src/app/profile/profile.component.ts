import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, Observable } from 'rxjs';
import { ProfileService } from './service/profile.service';
import { Profile } from './model/profile.model';
import { AuthService } from 'src/app/firebase/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from './model/role.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


profiles?:Profile[] ;
currentProfile?: Profile ;
currentIndex = -1;




  public constructor(public profileservice : ProfileService)  { 
     
    }

  

  
    ngOnInit(): void {
      this.retrieveProfile();
    }
  
    // rafraichir la liste des users 
    refreshList(): void {
      this.currentProfile = undefined;
      this.currentIndex = -1;
      this.retrieveProfile();
    }
  
    //récupérer un profile 
    retrieveProfile(): void {
      this.profileservice.getAllProfile().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id,  ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        // @ts-ignore
      // this.profiles = data;
      this.profiles = data;
      
      });
    }
  
    // rendre le profile active 
    setActiveProfile(profile: Profile, index: number): void {
      this.currentProfile = profile;
      this.currentIndex = index;
      
    }

    



  

}
