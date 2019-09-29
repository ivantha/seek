import {Skill} from './skill.model';
import * as firebase from 'firebase/app';

export class User {
    id: string;

    email: string;
    name: string;
    phone: string;
    gender: string;
    yob: number;

    addressLine1: string;
    addressLine2: string;
    addressCity: string;
    addressState: string;
    addressZip: string;

    lastKnownLocation: firebase.firestore.GeoPoint;

    skills: Skill[];
}
