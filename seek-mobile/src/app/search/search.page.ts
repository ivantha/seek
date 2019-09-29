import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ModalController, ToastController} from '@ionic/angular';
import {FilterModalPage} from '../filter-modal/filter-modal.page';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    eQuatorialEarthRadius = 6378.1370;
    d2r: number = (Math.PI / 180.0);
    myLat = 40.111;
    myLong = 2.111;

    users: User[];

    searchBarValue = '';
    items: any[] = [];

    dataReceived: any;
    skillLevel: number;
    minAge: number;
    maxAge: number;
    maxDistance: number;
    gender: string;
    reviews: [];

    constructor(public modalController: ModalController, public toastController: ToastController, private fireStore: FirebaseService,
                private authService: AuthService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(data => {
            this.users = data.map(e => {
                return {id: e.payload.doc.id, ...e.payload.doc.data()} as User;
            });
        });
    }

    initializeItems() {
        this.items = [];
    }

    onTyping(ev: any) {
        this.searchBarValue = ev.target.value;

        if (this.searchBarValue.trim() === '') {
            this.clearItems();
        }
    }

    getItems() {
        this.initializeItems();

        const keyword = this.searchBarValue;

        // const userEmail = this.authService.afAuth.auth.currentUser.email;
        // const userId = this.users.filter(user => user['email'] === userEmail)[0]['id'];
        // this.users = this.users.filter(user => user['id'] != userId);

        if (keyword && keyword.trim() !== '') {
            this.users.forEach(user => {
                const skills = user.skills;
                const lastKnownLocation = user.lastKnownLocation;
                const lat = lastKnownLocation.latitude;
                const long = lastKnownLocation.longitude;
                const dist = this.haversineInKM(this.myLat, this.myLong, lat, long);

                skills.forEach(skill => {
                    if (this.gender !== 'any') {
                        if (skill.name === keyword
                            && user.age >= this.minAge
                            && user.age <= this.maxAge
                            && user.gender === this.gender
                            && skill.level >= this.skillLevel
                            && dist <= this.maxDistance
                        ) {
                            this.items.push({
                                id: user.id,
                                name: user.name,
                                age: user.age,
                                gender: user.gender,
                                skill: skill.level,
                                distance: dist,
                                reviews: skill.reviews
                            });
                        }
                    } else {
                        if (skill.name === keyword
                            && user.age >= this.minAge
                            && user.age <= this.maxAge
                            && skill.level >= this.skillLevel
                            && dist <= this.maxDistance
                        ) {
                            this.items.push({
                                id: user.id,
                                name: user.name,
                                age: user.age,
                                gender: user.gender,
                                skill: skill.level,
                                distance: dist,
                                reviews: skill.reviews
                            });
                        }
                    }

                });
            });
        } else {
            this.items = [];
        }
    }

    clearItems() {
        this.items = [];
    }

    async openFilterModal() {
        const modal = await this.modalController.create({
            component: FilterModalPage,
            componentProps: {
                paramID: 123,
                paramTitle: 'Set Filters'
            }
        });

        modal.onDidDismiss().then((payload) => {
            if (payload !== null) {
                this.dataReceived = payload.data;
                this.skillLevel = payload.data.skillLevel;
                this.gender = payload.data.gender;
                this.maxAge = payload.data.maxAge;
                this.minAge = payload.data.minAge;
                this.maxDistance = payload.data.maxDistance;
            }
        });

        return await modal.present();
    }

    async presentReviewsToast(id: string) {
        const reviews: [] = this.items.filter(item => item.id === id)[0].reviews;
        const reviewsString = reviews.join('\n');
        const toast = await this.toastController.create({
            header: 'Reviews',
            message: reviewsString,
            position: 'middle',
            showCloseButton: true,
        });
        toast.present();
    }

    async presentRequestToast(itemId: string) {
        const selectedItem = this.items.filter(item => item.id === itemId)[0];
        const requesterEmail = this.authService.afAuth.auth.currentUser.email;
        const teacherObject = this.users.filter(user => user.id === selectedItem.id)[0];
        const studentObject = this.users.filter(user => user.email === requesterEmail)[0];
        const requesterId = studentObject.id;

        teacherObject.sessions.push({
            skill: this.searchBarValue,
            requester: requesterId,
            isAccepted: false
        });

        studentObject.sessions.push({
            skill: this.searchBarValue,
            requester: requesterId,
            isAccepted: false
        });

        this.userService.updateUser(teacherObject);
        this.userService.updateUser(studentObject);

        const toast = await this.toastController.create({
            header: 'Request for a session',
            message: 'Your request was sent to ' + selectedItem.name,
            position: 'top',
            buttons: [
                {
                    text: 'Done',
                    role: 'cancel'
                }]
        });

        toast.present();
    }

    haversineInKM(lat1, long1, lat2, long2) {
        const dlong = (long2 - long1) * this.d2r;
        const dlat = (lat2 - lat1) * this.d2r;
        // tslint:disable-next-line:max-line-length
        const a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * this.d2r) * Math.cos(lat2 * this.d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
        const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
        const d = this.eQuatorialEarthRadius * c;

        return d;
    }
}
