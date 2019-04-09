import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  songs: any;

  constructor(private apiRestService: ApiRestService, private alertController: AlertController ) { 
  }

  ionViewDidEnter() {
    this.downloadSongs();
  }

  async downloadSongs() {
    try {
      this.songs = await this.apiRestService.downloadSongs();    
    } catch(error) {
      this.showError();
    }
  }

  async showError() {  
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se ha encontrado el servidor',
      buttons: ['OK']
    });
    return await alert.present();
  }

  async play(song) {    
    try {
      this.songs = await this.apiRestService.play(song);    
    } catch(error) {
      this.showError();
    }
  }

}
