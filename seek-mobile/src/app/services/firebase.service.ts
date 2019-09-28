import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private snapshotChangesSubscription: any;

    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    }

    unsubscribeOnLogOut() {
        // remember to unsubscribe from the snapshotChanges
        this.snapshotChangesSubscription.unsubscribe();
    }

    // users
    getUsers() {
        return this.afs.collection('users').snapshotChanges();
    }
}
