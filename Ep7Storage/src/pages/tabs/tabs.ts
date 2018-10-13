import { Component } from '@angular/core';

import { NativeStoragePage } from '../nativeStorage/nativeStorage';
import { SqlitePage } from '../sqlite/sqlite';

// Native Components

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NativeStoragePage;
  tab2Root = SqlitePage;

  constructor() {

  }

  /*
  showListener() {
    console.log('keyboard visible');
    document.body.classList.add('keyboard-is-open');
  }
  hideListener() {
    console.log('keyboard hides');
    document.body.classList.remove('keyboard-is-open');
  }


  ionViewDidEnter() {
    window.addEventListener('keyboardWillShow', this.showListener);
    window.addEventListener('keyboardDidHide', this.hideListener);
  }

  ionViewWillLeave() {
    window.removeEventListener('keyboardWillShow', this.showListener);
    window.removeEventListener('keyboardDidHide', this.hideListener);
  }
  */
}
