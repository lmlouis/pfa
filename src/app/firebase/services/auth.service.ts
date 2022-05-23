import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Observable } from 'rxjs';
import { User } from './../../auth/model/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  user$!: Observable<User>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

    // Sauvegarder les données dans le local storage au moment du logout

    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

      }else{
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }


   /* Connnexion avec email & password */

   SignIn(email: string, password: string){
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    })
    .catch((error)=>{
      console.log(error.message);
    });

   }
  // mise à jour du user 
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User={
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
     
    };
    return userRef.set(userData, {merge: true});
  }

  // Deconnexion
  SignOut(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['connexion']);
    });
  }

  // Inscription avec email/password 
  SignUp(email: string, password: string){
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result)=>{
        /* appel du verification de Email */
        this.SendVerificationMail();
        this.SetUserData(result.user)
      })
    ;
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any)=> u.sendEmailVerification())
      .then(()=>{
        this.router.navigate(['verification-email'])
      });
  }

  // Mot de passe oublier 
  ForgortPassword(passwordResetEmail: string){
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(()=>{
        window.alert('Mot de pass réinitilisé, Verifier !')
      })
      .catch((error)=>{
        console.log(error);

      });
  }

  // isLoggin retuourn vrai si l'utilisateur s'est connecté, Guard
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user!== null && user.userVerified !== false ? true: false;
  }


  // Sign in with Google
  GoogleAuth(){
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any)=>{
      if(res){
        this.router.navigate(['dashboard'])
      }
    })
  }
  AuthLogin(provider: auth.GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((rseult)=>{
        this.ngZone.run(()=>{
          this.router.navigate(['dashboard'])
        });
        this.SetUserData(rseult.user);
      }).catch((error)=>{
        console.log(error);
      });

  }

  




}

