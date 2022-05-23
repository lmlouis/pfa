import { NavigationComponent } from './navigation/navigation.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { RouteModule } from './router/route.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CustomTheme } from './material/custom-theme';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { BarreLateralComponent } from './barre-lateral/barre-lateral.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomTheme, //Theme Custome
    FourOFourComponent, // Page 404
    HomeComponent, 
    AuthComponent, 
    LoginComponent, 
    RegisterComponent, 
    DashboardComponent, 
    VerifyEmailComponent, 
    ForgotPasswordComponent, 
    NavigationComponent,
    BarreLateralComponent,
    ProfileComponent
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, // Module Material
    FirebaseModule, // Module Firebase
    RouteModule, //Module Route



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
