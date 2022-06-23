import { getAuth } from 'firebase/auth';
import { EntrepriseService } from './../entreprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from './../entreprise.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-entreprise',
  templateUrl: './single-entreprise.component.html',
  styleUrls: ['./single-entreprise.component.scss']
})
export class SingleEntrepriseComponent implements OnInit {

  entreprise!: Entreprise;
  listentreprises : Entreprise[] =[]

  auth = getAuth()
  currenteUser = this.auth.currentUser
  

  constructor(public route:ActivatedRoute,
              public entrepriseService:EntrepriseService,
              public router : Router ) { }

  ngOnInit(): void {
    this.entreprise = new Entreprise('', '', '', '', '', '', '');
    const id = this.route.snapshot.params['id']
    this.entrepriseService.getALLEntreprises()
    
    this.entrepriseService.getSingleEntrepiseByID(id).then(
      //@ts-ignore
      (entreprise : Entreprise )=>{
        console.log(entreprise)
        this.entreprise = entreprise
      }
    )
    // //@ts-ignore
    // this.entreprise = this.entrepriseService.getSingleEntrepiseByID(id)
  }

  onBack(){
    this.router.navigate(['entreprises'])
  }

}
