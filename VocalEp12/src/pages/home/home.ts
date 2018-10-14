import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Native Components
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSpeechAvailable = false;
  matches: Array<string> = [];
  isListening = false;

  constructor(public navCtrl: NavController, 
    private platform : Platform, 
    private speechRecognition: SpeechRecognition,
    private changeDetectorRef : ChangeDetectorRef) {

      platform.ready().then(() => {
        this.speechRecognition.isRecognitionAvailable()
        .then((available: boolean) => this.isSpeechAvailable = available)
      })
  }

  public startListening() : void {
    this.isListening = true;
    this.matches = [];

    let options = {
      'language': 'fr-FR',
      matches: 5,
      'prompt': 'Je vous écoute ! :)',   // Android only
      'showPopup': true,                 // Android only
      'showPartial': false
    }

    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: Array<string>) => {
        this.isListening = false;
        this.matches = matches;
        this.changeDetectorRef.detectChanges();
      },
      (onerror) => {
        this.isListening = false;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

  public stopListening() : void {
    // Stop the recognition process (iOS only)
    this.speechRecognition.stopListening();
  }

  


}
