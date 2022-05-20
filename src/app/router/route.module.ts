import { RegisterComponent } from './../auth/register/register.component';
import { LoginComponent } from './../auth/login/login.component';
import { FourOFourComponent } from './../four-o-four/four-o-four.component';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';



// Le routing de navigation
const appRoutes: Routes = [
  {path: 'inscription', component: RegisterComponent},
  {path: 'connexion', component: LoginComponent},
  {path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  {path: 'acceuil',  component:  HomeComponent},
  {path: 'not-found', component: FourOFourComponent},
  {path: '**', redirectTo:'/not-found'}

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class RouteModule { }
