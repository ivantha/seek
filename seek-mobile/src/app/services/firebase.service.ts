import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    }

    unsubscribeOnLogOut() {
        // remember to unsubscribe from the snapshotChanges
    }

    encodeImageUri(imageUri, callback) {
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        const img = new Image();
        img.onload = function() {
            const aux: any = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = c.toDataURL('image/jpeg');
            callback(dataURL);
        };
        img.src = imageUri;
    }

    uploadImage(imageURI) {
        return new Promise<any>((resolve, reject) => {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child('image').child('imageName');
            this.encodeImageUri(imageURI, image64 => {
                imageRef.putString(image64, 'data_url')
                    .then(snapshot => {
                        resolve(snapshot.downloadURL);
                    }, err => {
                        reject(err);
                    });
            });
        });
    }

    // users
    getUsers() {
        return this.afs.collection('users').snapshotChanges();
    }

    // update with session request
    sendSessionRequest(receiverId, item) {
        this.afs.doc('users/' + receiverId).update(item);
    }
}
