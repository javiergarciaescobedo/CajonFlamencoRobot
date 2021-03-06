import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { AlertController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PlayControlPage } from '../play-control/play-control.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  songs: any;

  constructor(private apiRestService: ApiRestService, 
    private alertController: AlertController,
    private modalController: ModalController,
    private platform: Platform ) { 
  }

  ionViewDidEnter() {
    this.downloadSongs();
    // To prevent interference with ionic's own backbutton handling
    // subscribe with a low priority instead
    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });
  }

  async downloadSongs() {
    try {
      this.songs = await this.apiRestService.downloadSongs();    
    } catch(error) {
      console.log(error);
      this.showError('Error: ' + error.message);
    }
  }

  async showError(message: string) {  
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async openPlayControl(song) {
    console.log('Abriendo PlayControl');
    const modal = await this.modalController.create({
      component: PlayControlPage,
      componentProps: {
        'song': song
      }
    });
    return await modal.present();
  }
}
