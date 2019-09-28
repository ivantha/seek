import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {

  modalTitle:string;
  modelId:number;

  skillLevel: number = 3;

  maxDistance: number = 10;

  minAge: number = 16;
  maxAge: number = 60;
  currentMinAge: number;
  currentMaxAge: number;
  knobValues: any;

  gender: string = "any";

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.currentMaxAge = this.maxAge;
    this.currentMinAge = this.minAge;
  }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const data: object = {
      skillLevel: this.skillLevel,
      maxDistance: this.maxDistance,
      minAge: this.currentMinAge,
      maxAge: this.currentMaxAge,
      gender: this.gender
    };
    await this.modalController.dismiss(data);
  }

  changeAgeValues() {
    this.currentMinAge = this.knobValues.lower;
    this.currentMaxAge = this.knobValues.upper;
  }

  onGenderChange($ev) {
    this.gender = $ev.target.value;
  }

}
