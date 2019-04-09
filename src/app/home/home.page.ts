import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  songs: any;

  constructor(apiRestService: ApiRestService ) { 
    apiRestService.downloadSongs().then(
      res => {
        this.songs = res;
      }
    );
  }
  
}
