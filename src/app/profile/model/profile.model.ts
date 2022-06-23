
import { User } from '../../auth/model/user';
import { Roles } from "./role.model";


export class Profile {
  id ? : string;
    user : User;
    role: {
        adherent : boolean,
        entreprise : boolean,
        communaute : boolean,
        admin: boolean,  

    };

constructor(){
  
    this.user = Object();
    this.role = 
    {
        adherent : true,
        entreprise : false,
        communaute : false,
        admin: false,  

    };
    
  }

  public setRole(role : string) : void{
      const testRole = Roles;
      if(role == testRole.adherent){
          this.role = {
            adherent : true,
            entreprise : false,
            communaute : false,
            admin: false,
          }
      }

      else if (role == testRole.entreprise){
        this.role = {
          adherent : true,
          entreprise : true,
          communaute : false,
          admin: false,
        }
    }
    else if(role == testRole.communaute){
            this.role = {
              adherent : true,
              entreprise : true,
              communaute : true,
              admin: false,
            }
    }

    else if (role == testRole.admin){
        this.role = {
          adherent : true,
          entreprise : true,
          communaute : true,
          admin: true,
        }
    }

    else{
        return window.alert('le role inexistant');
    }



 
  

}


}


