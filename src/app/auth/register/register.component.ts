import { ProfileService } from './../../profile/service/profile.service';
import { Roles } from './../../profile/model/role.model';
import { Profile } from './../../profile/model/profile.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../firebase/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(public authService : AuthService) { 


  }

  ngOnInit(): void {
  }

}
