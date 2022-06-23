import { ProfileService } from './../profile/service/profile.service';
import { doc } from 'firebase/firestore';
import { rejects } from 'assert';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Entreprise } from './entreprise.model';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { identifierName } from '@angular/compiler';
import { DataSource } from '@angular/cdk/collections';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {


  auth = getAuth()
  userCureente = this.auth.currentUser





  entreprises : Entreprise[] = []
  //@ts-ignore
  currenteEntreprise : Entreprise;

  constructor(public firestore: AngularFirestore, public afStorage : AngularFireStorage, public profileService:ProfileService) { }



  saveALLEntreprise(){ // Enregistrer les livres 
   this.firestore.collection("/entreprises").add({...this.entreprises})


  }




    getALLEntreprises(){ // recupéré toutes les entreprises
    //return 
    return this.firestore.collection("/entreprises")

  }

  async getSingleEntrepiseByID(id : string){// une entrprise

      const data = await this.firestore.doc("entreprises/"+id).get().toPromise();
      return data?.data();
  }

  updateEntreprise(id : string, data : Entreprise){
    this.firestore.collection("entreprises/").doc(id).update(data)
  }

  createNewEntreprise(entreprise : Entreprise){
    this.firestore.collection("/entreprises").add({...entreprise}) // créer une nouvelle entreprise
    this.saveALLEntreprise() // enregistrer la nouvelle entreprise

  }

  removeEntreprise(id : string ){
    this.firestore.doc("entreprises/"+id).delete()
    this.saveALLEntreprise()// saugarger les données 


  }



  uploadFile(file: File) {

    this.afStorage.storage.ref().child

    return new Promise(
      (resolve, reject)=>{
        const almostUniqueFileName = Date.now().toString();
        const upload = this.afStorage.storage.ref()
          .child('logo/'+ almostUniqueFileName+ file.name)
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


// AdhererEntreprise(id : string, Enterprise : Entreprise){
//   if(this.userCureente){
//     this.firestore.collection("entreprises/").ref.where("nom", "==", Enterprise.nom).get().then(
//       (p)=>{
//         console.log("recherche = "+p.docs.values())
//       }
//     )


//   }
// }



}
