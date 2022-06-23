import { ProfileService } from './../profile/service/profile.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

const FirebaseBackend = [
  /*initilisation firebase config*/
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule, // firestore
  AngularFireAuthModule, // auth
  AngularFireStorageModule,  // storage
]


@NgModule({
  imports: [FirebaseBackend],
  exports: [FirebaseBackend],
  providers: [AuthService, ProfileService]
})
export class FirebaseModule { }
