import { ProfileComponent } from './../profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { ForgotPasswordComponent } from './../auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './../auth/verify-email/verify-email.component';
import { RegisterComponent } from './../auth/register/register.component';
import { LoginComponent } from './../auth/login/login.component';
import { FourOFourComponent } from './../four-o-four/four-o-four.component';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';




// Le routing de navigation
const appRoutes: Routes = [
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  {path: 'oublier-mot-passe', component: ForgotPasswordComponent},
  {path: 'verification-email', component: VerifyEmailComponent},
  {path: 'inscription', component: RegisterComponent},
  {path: 'connexion', component: LoginComponent},
  {path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  {path: 'acceuil',  component:  HomeComponent},
  {path: 'not-found', component: FourOFourComponent},
  {path: '**', redirectTo:'/not-found'}

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RouteModule { }
