import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barre-lateral',
  templateUrl: './barre-lateral.component.html',
  styleUrls: ['./barre-lateral.component.scss']
})
export class BarreLateralComponent implements OnInit {
  ouvert = false;
  changeThemeStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

}
