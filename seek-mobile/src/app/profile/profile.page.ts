import {Component, OnInit} from '@angular/core';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {NavController, ToastController} from '@ionic/angular';
import {FirebaseService} from '../services/firebase.service';
import {Crop} from '@ionic-native/crop/ngx';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    fullName: string;

    constructor(
        public navCtrl: NavController,
        public imagePicker: ImagePicker,
        public cropService: Crop,
        public toastCtrl: ToastController,
        public firebaseService: FirebaseService
    ) {
    }

    ngOnInit() {
    }

    handleFirstNameValue(event) {
        this.fullName = event.target.value;
    }

    openImagePicker() {
        this.imagePicker.hasReadPermission().then(
            (result) => {
                if (result === false) {
                    // no callbacks required as this opens a popup which returns async
                    this.imagePicker.requestReadPermission();
                } else if (result === true) {
                    this.imagePicker.getPictures({
                        maximumImagesCount: 1
                    }).then(
                        (results) => {
                            results.forEach((item, index) => {
                                this.uploadImageToFirebase(item);
                            });
                            // for (let i = 0; i < results.length; i++) {
                            //     this.uploadImageToFirebase(results[i]);
                            // }
                        }, (err) => console.log(err)
                    );
                }
            }, (err) => {
                console.log(err);
            });
    }

    uploadImageToFirebase(image) {
        // image = normalizeURL(image);

        // uploads img to firebase storage
        this.firebaseService.uploadImage(image)
            .then(async (photoURL) => {

                const toast = await this.toastCtrl.create({
                    message: 'Image was updated successfully',
                    duration: 3000
                });

                await toast.present();
            });
    }

}
