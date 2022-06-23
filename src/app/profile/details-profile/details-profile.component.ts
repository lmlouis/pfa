import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input,  OnInit, Output } from '@angular/core';
import { Profile } from 'src/app/profile/model/profile.model';
import { ProfileService } from './../service/profile.service';
import { getAuth, User } from 'firebase/auth';


@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrls: ['./details-profile.component.scss']
})
export class DetailsProfileComponent implements OnInit {

  @Input() profile?: Profile;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  message = "";


  
  // @ts-ignore
  currentProfile : Profile ;

  id: string ;

  Auth = getAuth();

  uid: string = "";
 




 getStatutAdmin(uid : any, id : any):boolean{
 
   if(uid !== "" && uid == id){
    return true 
   }else{
    return false
   }
    
 }

  constructor(public profileService :  ProfileService, public route : ActivatedRoute ) { 
    this.id  = ""

    this.currentProfile = new Profile();
    if(this.Auth.currentUser){
      // @ts-ignore
      this.uid = this.Auth.currentUser.uid
    }
    
    
  }

  ngOnInit(): void {
    
    this.message = "";
    this.id  =  this.route.snapshot.params['id'];
    
    // @ts-ignore
    this.profileService.getProfileById(this.id).then((Profile : Profile)=>{
      this.currentProfile = Profile
    });
    


      




  }

  ngOnChanges():void{
    this.message = "";
    // @ts-ignore
    this.currentProfile = {...this.profile}
    
  }



  updateProfile():void{
    const data = this.currentProfile;
    if(this.currentProfile.id){
      this.profileService.updateProfile(this.currentProfile.id, data)
      .then(()=>{
        this.message = 'Profile actualisé avec succès...'
      }).catch(err=> console.log(err));
    }
  }
  deleteProfile(): void{
    if(this.currentProfile.id){
      this.profileService.deletProfile(this.currentProfile.id)
      .then(()=>{
        this.refreshList.emit();
        this.message = "Profile actualisé avec succès...";
      }).catch(err=>console.log(err));
    }
  }


}
