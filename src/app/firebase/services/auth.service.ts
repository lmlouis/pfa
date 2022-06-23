
import { ProfileService } from './../../profile/service/profile.service';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/profile/model/profile.model';
import { Roles } from 'src/app/profile/model/role.model';
import { User } from './../../auth/model/user';
import { getAuth } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  user$!: Observable<User>;

  profile: Profile = new Profile();
  user: any;
  role = Roles;

  Auth = getAuth();
  userCurrente = this.Auth.currentUser

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public profileService :ProfileService
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

    this.user = userData;
    this.updataProfile(this.user);

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
        this.profileService.createProfile(this.profile)
       
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
        console.log('Mot de pass réinitilisé, Verifier !');
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


  // // Sign in with Google
  // GoogleAuth(){
    
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any)=>{
  //     if(res){
  //       this.router.navigate(['dashboard'])
        
  //     }
  //   })
  // }
  // AuthLogin(provider: auth.GoogleAuthProvider) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((rseult)=>{
  //       this.ngZone.run(()=>{
  //         this.router.navigate(['dashboard'])
  //         this.SetUserData(rseult.user);
  //       });
        
        
  //     }).catch((error)=>{
  //       console.log(error);
  //     });

  // }

  rechercherProfileCourantByUserID(id : string): Profile{
    let rechercherProfileCourantByUserID = this.afs.collection("profile").ref.where("user.uid", "==", id)

    rechercherProfileCourantByUserID.get().then((p)=>{
      p.forEach((doc)=>{
        let data :Profile|any = doc
        this.profile.id = data.id 
        // @ts-ignore
        this.profile.user = data.data().user
        this.profile.role = data.data().role 
        

      })
    })
    return this.profile;
  }

  getProfileConected(currenteUser : User | null): Profile{
    if(currenteUser){
      this.profile = this.rechercherProfileCourantByUserID(currenteUser.uid)
    }
    return this.profile;

  }
  
  updataProfile(user : any ):void {

    this.profile.user.displayName = user.displayName;
    this.profile.user.email = user.email;
    this.profile.user.photoURL = user.photoURL;
    this.profile.user.uid = user.uid;
    this.profile.user.emailVerified = user.emailVerified;
    this.profile.setRole(this.role.adherent);
    
  }


  




}

