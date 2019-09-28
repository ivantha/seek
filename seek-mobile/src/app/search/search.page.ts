import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FilterModalPage} from '../filter-modal/filter-modal.page';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    ngOnInit(): void {
    }

    constructor(
        public modalController: ModalController
    ) {}

    searchBarValue: string = "";
    isItemAvailable = false;
    items: string[] = [];

    dataReceived: any;
    skillLevel: number;
    minAge: number;
    maxAge: number;
    maxDistance: number;
    gender: string;

    initializeItems() {
        this.items = ['Physics', 'Chemistry', 'Economics'];
    }

    onTyping(ev: any) {
        this.searchBarValue = ev.target.value;

        if (this.searchBarValue.trim() === '') this.clearItems()
    }

    getItems() {
        this.initializeItems();

        const val = this.searchBarValue;

        if (val && val.trim() != '') {
            this.isItemAvailable = true;
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
}
