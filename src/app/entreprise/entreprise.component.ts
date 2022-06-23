import { Router } from '@angular/router';
import { EntrepriseService } from './entreprise.service';
import { Entreprise } from './entreprise.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
  

  entreprises : Entreprise[] = [];

  currenteEntreprise: Entreprise = new Entreprise("","", "", "", "" , "", "");;
  currenteIndex: number = -1;

  constructor(public entrepriseService:EntrepriseService,
              public router : Router) { }

  ngOnInit(): void {
    this.retrieveEntreprise()
   
  }


    
    // rafraichir la liste des users 
    refreshList(): void {
      this.currenteEntreprise = new Entreprise("","", "", "", "" , "", "");
      this.currenteIndex = -1;
      this.retrieveEntreprise();
    }
  
    //récupérer un profile 
    retrieveEntreprise(): void {
      this.entrepriseService.getALLEntreprises().snapshotChanges().pipe(
        map((changes:any) =>
          changes.map((c:any) =>
    
            ({ id: c.payload.doc.id,  ...c.payload.doc.data() } )
    
          )
        )
      ).subscribe((data : Entreprise[]) => {
        
    
      this.entreprises = data;
      
      
      });
    
    }
  
    // rendre le profile active 
    setActiveProfile(entreprise: Entreprise, index: number): void {
      this.currenteEntreprise = entreprise;
      this.currenteIndex= index;
      
    }


}
