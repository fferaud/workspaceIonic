import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

   name : string;
   surname : string;
   age : number;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.name = navParams.get('name');
    this.surname = navParams.get('surname');
    this.age = navParams.get('age');

    console.log(this.name);
    console.log(this.surname);
    console.log(this.age);
  }

}
