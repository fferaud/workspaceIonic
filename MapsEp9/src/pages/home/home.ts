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
  Environment,
  LatLng,
  GoogleMapsAnimation,
  ILatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

// Mocks
import * as TreeMapping from '../../models/tree.mapping';

const MARKER_SIZE=30;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  private trees: TreeMapping.TreeMap[];

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    // Data
    this.trees = TreeMapping.TreeMappingMock;
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

    // Based method
    /*
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 45.538937,
           lng: 5.920804
         },
         zoom: 10,
         tilt: 0
       }
    };
    this.map = GoogleMaps.create('map',mapOptions);
    */

   this.map = GoogleMaps.create('map');

   this.geolocation.getCurrentPosition().then((resp) => {
     let userPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
     let position: CameraPosition<ILatLng> = {
      target: userPosition ,
      zoom: 12,
      tilt: 0
    };

    this.map.moveCamera(position);

   }).catch((error) => {
     console.log('Error getting location', error.message);
     alert("Sorry an error occured \n"+error.message);
   });

    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
        for(var tree of this.trees){
          this.addMarkerOnMap(tree);
        }
      }
    );

    // Façon de base pour le marker
    /* 
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ma maison',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: 43.602412,
        lng: 3.893414
      }
    });

    marker.showInfoWindow();

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('Oui c\'est ma maison !!!');
    });
    */
  }

  private addMarkerOnMap(tree: TreeMapping.TreeMap) {
    let markerPosition: LatLng = new LatLng(tree.lat, tree.lng);

    let markerIcon = {
      'url': tree.globalImage,
      'size': {
        width: Math.round(MARKER_SIZE),
        height: Math.round(MARKER_SIZE)
      }
    }

    let markerOptions : MarkerOptions = {
      position:markerPosition,
      title: tree.name,
      snippet: 'Touchez moi pour plus d\'info !',
      //animation: GoogleMapsAnimation.BOUNCE,
      icon:markerIcon

    }

    let marker: Marker = this.map.addMarkerSync(markerOptions);

    marker.showInfoWindow();

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      /*console.log('Famille -->'+tree.famille);
      console.log('Scientific name -->'+tree.scientificName);
      console.log('Size -->'+tree.size);*/
    });

    marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
      console.log('Famille -->'+tree.famille);
      console.log('Scientific name -->'+tree.scientificName);
      console.log('Size -->'+tree.size);
    });

  }

}
