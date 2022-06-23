import { AuthService } from 'src/app/firebase/services/auth.service';
import { AngularFireStorage, AngularFireStorageModule, GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { map } from 'rxjs';

import { Profile } from './../model/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from 'firebase/compat';





@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  // nom de la collection
  dbPath = '/profile';
  profileRef: AngularFirestoreCollection<Profile>;

  storage = getStorage();
  filePath: any;









  constructor(public db : AngularFirestore, public afStorage : AngularFireStorage) { 
    // création de la collection
    this.profileRef =  db.collection(this.dbPath);


    }


    public getAllProfile(): AngularFirestoreCollection<Profile>{
      return this.profileRef;
      
    }

    // recupérer le profile par son id 
     async getProfileById(id : string ){
      const data = await this.db.doc(this.dbPath+"/"+id).get().toPromise();
      return data?.data();
    }

    public createProfile(profile : Profile): any{
       // @ts-ignore
      return this.profileRef.add({...profile});
    }

    public updateProfile(id : string, data: Profile ): Promise<void>{

      return this.db.doc(this.dbPath+"/"+id).update({role : data.role, user: data.user});
    }

    public deletProfile(id : string): Promise<void>{
      return this.profileRef.doc(id).delete();
    }

    uploadFile(file: File) {

      this.afStorage.storage.ref().child

      return new Promise(
        (resolve, reject)=>{
          const almostUniqueFileName = Date.now().toString();
          const upload = this.afStorage.storage.ref()
            .child('avatar/'+ almostUniqueFileName+ file.name)
            .put(file); // @ts-ignore
            upload.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.pourcentage = progress
            },
            (error)=>{
              console.log('erreur ...'+ error);

              reject();
            },
            ()=>{let downloadURL 
              // @ts-ignor
              downloadURL = upload.snapshot.ref.getDownloadURL().then((url)=>{ return url})

              // @ts-ignore
              resolve(downloadURL);
              
              
            })

        }
      );

    
}


pourcentage : number = 0;

 



  }
