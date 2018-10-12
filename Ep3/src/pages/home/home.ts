import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name : string;
  surname : string;
  age : number;
  constructor(public navCtrl: NavController) {

  }

  private showDetails() {
    this.navCtrl.push(DetailsPage, {
      name : this.name, 
      surname: this.surname, 
      age: this.age
    });
  }

}
