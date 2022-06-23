import { Roles } from './../model/role.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/services/auth.service';
import { ProfileService } from '../service/profile.service';
import { Profile } from './../model/profile.model';
import { ProfileComponent } from './../profile.component';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  // @ts-ignore
  profileForm : FormGroup;
  fileURL : string = "";
  fileUplaoding: boolean = false;

  profile : Profile = new Profile();
  submited = false ;
  user: any;
  role = Roles;
  

  constructor(public profileService : ProfileService, 
              public formBuilder : FormBuilder,
              public router :  Router,
              public auth : AuthService) {  
              
              }
              

              
  
  saveProfile() : void{// recuperer les informations du profile 
    this.profileService.createProfile(this.profile).then(()=>{
      console.log('nouveau profile créer');
      this.submited = true;
    });
  }
  

  newProfile():void{
    this.submited = false;
    this.profile = new Profile();
  }
  ngOnInit(): void { //créer un formulaire 
    this.initForm();
  }
  initForm() {
    this.profileForm = this.formBuilder.group({
      displayName : ['', Validators.required],
      email : ['', Validators.required],
      photoURL : ['', Validators.required],
      uid : ['', Validators.required],
      emailVerified : ['', Validators.required],
      role: ['', Validators.required]
    })
  }

}


