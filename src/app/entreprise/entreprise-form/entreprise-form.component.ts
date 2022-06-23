import { getAuth } from 'firebase/auth';
import { Entreprise, Region, SecteurActivicte, Domaine } from './../entreprise.model';
import { Router } from '@angular/router';
import { EntrepriseService } from './../entreprise.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})
export class EntrepriseFormComponent implements OnInit {
  // @ts-ignore
  entrepriseForm: FormGroup;

  region = Region
  secteur = SecteurActivicte
  domaine = Domaine

  fileUploading: boolean =false;
  fileURL: string = "";
  fileUploaded: boolean = false;
  // @ts-ignore
  entreprise : Entreprise

  auth = getAuth()
  userCureente = this.auth.currentUser

  constructor(
    public formBuilder:FormBuilder,
    public entrepriseService:EntrepriseService,
    public router:Router,

  ) { }

  ngOnInit(): void {
    this.initform()
  }

  initform() {
    this.entrepriseForm = this.formBuilder.group(
      {
        nom : ['', Validators.required],
        region : ['', Validators.required],
        telephone : ['', Validators.required],
        description : ['', Validators.nullValidator],
        secteurActivicte : ['', Validators.required],
        domaine : ['', Validators.required],
        //logo : ['', Validators.nullValidator],
        listProduit: this.formBuilder.array([])

      }
    )
  }

  onSaveEntreprise(){
    const nom   = this.entrepriseForm.get('nom')?.value
    const region = this.entrepriseForm.get('region')?.value
    const telephone = this.entrepriseForm.get('telephone')?.value
    const description = this.entrepriseForm.get('description')?.value
    const secteurActivicte = this.entrepriseForm.get('secteurActivicte')?.value
    const domaine = this.entrepriseForm.get('domaine')?.value
    //const logo = this.entrepriseForm.get('logo')?.value
    const listProduit = this.entrepriseForm.get('listProduit')?.value

    let URL 
    if(this.fileURL && this.fileURL !== ""){
      URL =this.fileURL;
    }else{
      URL = this.entreprise.logo
    }
    // relier le user à l'entreprise
  let id : string = ""
    if(this.userCureente){
      id = this.userCureente.uid} 

    const newEntreprise = new Entreprise(nom, region, telephone, description, secteurActivicte, domaine,URL, listProduit, id)
    this.entrepriseService.createNewEntreprise(newEntreprise)
    this.router.navigate(['entreprises'])

  }

  getlistProduit(){
    return this.entrepriseForm.get('listProduit') as FormArray;
  }

  ongetlistProduit(){
    const newlistProduitControl = this.formBuilder.control('', Validators.required);
    this.getlistProduit().push(newlistProduitControl);
  

}


detectFiles($event: Event){
  // @ts-ignores
  this.onUploadFile($event.target.files[0])

}
onUploadFile(file: File) {
  this.fileUploading = true
  this.entrepriseService.uploadFile(file).then(
        // @ts-ignores
    (url:string)=>{
      this.fileURL = url;
      this.fileUploading = false
      this.fileUploaded = true
    }
  )
  
}




}


