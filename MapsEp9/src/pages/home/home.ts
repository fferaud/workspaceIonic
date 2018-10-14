import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    /*Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyA0-lRZhsxbtrXqNdSfd89MMt63iGvxkg4',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyA0-lRZhsxbtrXqNdSfd89MMt63iGvxkg4'
    });*/

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.602412,
           lng: 3.893414
         },
         zoom: 18,
         tilt: 0
       }
    };
    this.map = GoogleMaps.create('map',mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ma maison',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: 43.602412,
        lng: 3.893414
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('Oui c\'est ma maison !!!');
    });
  }

}
