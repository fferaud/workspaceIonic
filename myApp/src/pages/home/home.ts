import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    console.log("Hello World");
  }

  alertAction() : void {
    const alert = this.alertCtrl.create({
      title: 'Salut !',
      subTitle: 'Ionic c\'est la vie !',
      buttons: ['OK']
    });
    alert.present();
  }

}
