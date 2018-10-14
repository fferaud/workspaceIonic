import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// Natives Components
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private speechRecognition: SpeechRecognition) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(platform.isPlatformMatch("android")) {
        statusBar.styleLightContent();
      }
      else {
        statusBar.styleDefault();
      }
      splashScreen.hide();

      // Check permission
      this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        console.log('Droit d\'utiliser la reconnaissance vocale ? : '+hasPermission);

        if(!hasPermission) {
          this.requestSpeechRecognitionPermission();
        }
      })

    });
  }

  private requestSpeechRecognitionPermission():void {
    // Request permissions
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )
  }
}

