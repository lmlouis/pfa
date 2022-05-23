import { Role } from "src/app/auth/model/role.model";
import { User } from "src/app/auth/model/user";


export class Profile implements User{

    uid!: string;
    email!: string;
    displayName!: string;
    photoURL!: string;
    emailVerified: boolean = false;
    role!: Role[];
}