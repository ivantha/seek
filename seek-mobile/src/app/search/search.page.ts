import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    constructor() {
    }

    isItemAvailable: boolean = false;
    items: string[] = [];

	initializeItems(){ 
	    this.items = ["Physics","Chemistry", "Economics"]; 
	}

	getItems(ev: any) {
	    // Reset items back to all of the items
	    this.initializeItems();

	    // set val to the value of the searchbar
	    const val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.isItemAvailable = true;
	      this.items = this.items.filter((item) => {
	        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    } else {
	    	this.items = [];
	    }
	}

	clearItems(ev: any) {
		this.items = [];
	}
}
