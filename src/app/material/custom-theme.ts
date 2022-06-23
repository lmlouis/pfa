import {Component, HostBinding, OnInit} from "@angular/core";
import {FormControl, NgModel} from "@angular/forms";
@Component({
  selector: 'material-module',
  templateUrl: './mode-sombre-clair.html',
  styleUrls: ['./custom-theme.scss']
})
export class CustomTheme implements OnInit{
  /*  dark-theme*/
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  ngOnInit(): void {
    /*  dark-theme*/
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      document.body.className = darkMode ? 'darkMode': 'lightMode';
    });
  }

}
