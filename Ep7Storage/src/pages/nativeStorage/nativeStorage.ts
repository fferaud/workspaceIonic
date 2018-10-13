import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Native Component
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-nativeStorage',
  templateUrl: 'nativeStorage.html'
})
export class NativeStoragePage {

  name : string;
  surname : string;
  years: number;

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {

  }

  public storeIdentity() : void {
    this.nativeStorage.setItem('myIdentityCard', {
      name: this.name, 
      surname: this.surname,
      years: this.years
    })
    .then(
      () => console.log('Stored identityCard!'),
      error => console.error('Error storing identityCard', error)
    );
  }

  public getMyName() : void {
    this.nativeStorage.getItem('myIdentityCard')
    .then(
      data => {
        this.name = data.name;
        this.surname = data.surname;
        this.years = data.years;
      },
      error => console.error(error)
    );
  }
  

}
