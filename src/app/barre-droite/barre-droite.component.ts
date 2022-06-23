import { getAuth } from 'firebase/auth';
import { AuthService } from './../firebase/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barre-droite',
  templateUrl: './barre-droite.component.html',
  styleUrls: ['./barre-droite.component.scss']
})
export class BarreDroiteComponent implements OnInit {
  auth = getAuth()
  user = this.auth.currentUser

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}
