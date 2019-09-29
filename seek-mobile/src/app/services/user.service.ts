import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private afs: AngularFirestore) {
    }

    public getUsers() {
        return this.afs.collection('users').snapshotChanges();
    }

    public createUser(user: User) {
        return this.afs.collection('users').add(user);
    }

    public updateUser(user: User) {
        const tempId = user.id;
        delete user.id;
        this.afs.doc('users/' + tempId).update(user);
    }

    public deleteUser(id: string) {
        this.afs.doc('users/' + id).delete();
    }

}
