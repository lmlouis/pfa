import { Role } from './role.model';
import { User } from './user';
export class Membre implements User{
    uid!: string;
    email!: string;
    displayName!: string;
    photoURL!: string;
    emailVerified: boolean = false;
    role!: Role[];
}