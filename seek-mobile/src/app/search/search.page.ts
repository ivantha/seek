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
            if (data) this.users = data.map(e => e.payload.doc.data());
            else console.log('error getting user details');
        });
    }

    getItems() {
        this.initializeItems();

        const keyword = 'physics'; //this.searchBarValue;

        if (keyword && keyword.trim() != '') {
            this.users.forEach(user => {
                const skills = user['skills'];
                skills.forEach(skill => {
                    if (this.gender != 'any') {
                        if (skill['name'] === keyword
                            && user['age'] >= this.minAge
                            && user['age'] <= this.maxAge
                            && user['gender'] === this.gender
                            && skill['level'] >= this.skillLevel
                        ) {
                            this.items.push({
                                name: user['name'],
                                age: user['age'],
                                gender: user['gender'],
                                skill: skill['level'],
                                distance: 5
                            });
                        }
                    } else {
                        if (skill['name'] === keyword
                            && user['age'] >= this.minAge
                            && user['age'] <= this.maxAge
                            && skill['level'] >= this.skillLevel
                        ) {
                            this.items.push({
                                name: user['name'],
                                age: user['age'],
                                gender: user['gender'],
                                skill: skill['level'],
                                distance: 5
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


    arrayOne(n: number): any[] {
        return Array(n);
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
}
