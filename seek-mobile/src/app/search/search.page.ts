import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FilterModalPage} from '../filter-modal/filter-modal.page';
import {FirebaseService} from '../services/firebase.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    _eQuatorialEarthRadius: number = 6378.1370;
    _d2r: number = (Math.PI / 180.0);
    myLat: number = 40.111;
    myLong: number = 2.111;

    users: {}[];

    searchBarValue: string = '';
    items: {}[];

    dataReceived: any;
    skillLevel: number;
    minAge: number;
    maxAge: number;
    maxDistance: number;
    gender: string;

    constructor(public modalController: ModalController, private fireStore: FirebaseService) {
    }

    ngOnInit(): void {
        this.loadUsers();
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

    loadUsers() {
        this.fireStore.getUsers().subscribe(data => {
            if (data) {
                this.users = data.map(e => e.payload.doc.data());
            } else {
                console.log('error getting user details');
            }
        });
    }

    getItems() {
        this.initializeItems();

        const keyword = this.searchBarValue;

        if (keyword && keyword.trim() != '') {
            this.users.forEach(user => {
                const skills = user['skills'];
                const lastKnownLocation = user['lastKnownLocation'];
                const lat = lastKnownLocation['_lat'];
                const long = lastKnownLocation['_long'];
                const dist = this.haversineInKM(this.myLat, this.myLong, lat, long); console.log(dist);

                skills.forEach(skill => {
                    if (this.gender != 'any') {
                        if (skill['name'] === keyword
                            && user['age'] >= this.minAge
                            && user['age'] <= this.maxAge
                            && user['gender'] === this.gender
                            && skill['level'] >= this.skillLevel
                            && dist <= this.maxDistance
                        ) {
                            this.items.push({
                                name: user['name'],
                                age: user['age'],
                                gender: user['gender'],
                                skill: skill['level'],
                                distance: dist
                            });
                        }
                    } else {
                        if (skill['name'] === keyword
                            && user['age'] >= this.minAge
                            && user['age'] <= this.maxAge
                            && skill['level'] >= this.skillLevel
                            && dist <= this.maxDistance
                        ) {
                            this.items.push({
                                name: user['name'],
                                age: user['age'],
                                gender: user['gender'],
                                skill: skill['level'],
                                distance: dist
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

    async openModal() {
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

    haversineInM(lat1, long1, lat2, long2) {
        return (1000.0 * this.haversineInKM(lat1, long1, lat2, long2));
    }

    haversineInKM(lat1, long1, lat2, long2) {
        let dlong = (long2 - long1) * this._d2r;
        let dlat = (lat2 - lat1) * this._d2r;
        let a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * this._d2r) * Math.cos(lat2 * this._d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
        let c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
        let d = this._eQuatorialEarthRadius * c;

        return d;
    }
}
