import { Router } from '@angular/router';
import { Profile } from 'src/app/profile/model/profile.model';
import { ProfileService } from './../service/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/firebase/services/auth.service';

@Component({
  selector: 'app-editer-profile',
  templateUrl: './editer-profile.component.html',
  styleUrls: ['./editer-profile.component.scss']
})
export class EditerProfileComponent implements OnInit {

  // @ts-ignore
  profileForm : FormGroup ;
  fileUploading = false;
  

  fileURL : String = "";
  fileUploaded = false;


 profile: Profile = new Profile();
 Auth = getAuth();
 userCurrente = this.Auth.currentUser

  constructor(public formBuilder: FormBuilder,
              public profileService: ProfileService,
              public auth :  AuthService,
              public router : Router) { 

                    // @ts-ignore
               this.profile = this.auth.getProfileConected(this.userCurrente);
                  
            }

  ngOnInit(): void {

    this.initForm();
  }
  initForm() {
    this.profileForm = this.formBuilder.group({
      displayName : [this.profile.user.displayName, Validators.required],
      email : [this.profile.user.email, Validators.email],
      //photoURL : ['', ]
    })
  }


  onSaveProfile(){
    const displayName = this.profileForm.get('displayName')?.value
    const email = this.profileForm.get('email')?.value
    let photoURL 
    if(this.fileURL && this.fileURL !== ""){
      photoURL =this.fileURL;
    }else{
      photoURL = this.profile.user.photoURL
    }
    
    this.setChangesProfile(displayName, email, photoURL)
  
    // @ts-ignore
    this.profileService.updateProfile(this.profile.id, this.profile)
    this.router.navigate(['/details-profile/'+this.profile.id])

  }

  detectFiles($event: Event){
    // @ts-ignores
    this.onUploadFile($event.target.files[0])

  }
  onUploadFile(file: File) {
    this.fileUploading = true
    this.profileService.uploadFile(file).then(
          // @ts-ignores
      (url:string)=>{
        this.fileURL = url;
        this.fileUploading = false
        this.fileUploaded = true
      }
    )
    
  }

  setChangesProfile(displayName: any, email: any, photoURL: any) : void {
    this.profile.user.displayName = displayName;
    this.profile.user.email = email;
    this.profile.user.photoURL = photoURL;
    // @ts-ignores
    this.userCurrente?.displayName = displayName
    // @ts-ignores
    this.userCurrente?.email = email
    // @ts-ignores
    this.userCurrente?.photoURL = photoURL

    this.auth.SetUserData(this.userCurrente)




  }
  

}

