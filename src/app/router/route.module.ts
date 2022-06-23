import { EntrepriseComponent } from './../entreprise/entreprise.component';
import { SingleEntrepriseComponent } from './../entreprise/single-entreprise/single-entreprise.component';
import { EntrepriseFormComponent } from './../entreprise/entreprise-form/entreprise-form.component';
import { EditerProfileComponent } from './../profile/editer-profile/editer-profile.component';
import { DetailsProfileComponent } from './../profile/details-profile/details-profile.component';
import { AddProfileComponent } from './../profile/add-profile/add-profile.component';
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
  {path: 'voir-entreprise/:id', canActivate: [AuthGuard], component: SingleEntrepriseComponent},
  {path: 'entreprises', canActivate: [AuthGuard], component: EntrepriseComponent},
  {path: 'creer-entreprise', canActivate: [AuthGuard], component: EntrepriseFormComponent},
  {path: 'details-profile/:id', canActivate: [AuthGuard], component: DetailsProfileComponent},

  {path: 'editer-profile', canActivate: [AuthGuard], component: EditerProfileComponent},
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
