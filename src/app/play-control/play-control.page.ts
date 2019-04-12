import { Component, OnInit, Input } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-play-control',
  templateUrl: './play-control.page.html',
  styleUrls: ['./play-control.page.scss'],
})
export class PlayControlPage implements OnInit {

  @Input() song: any;

  constructor(private apiRestService: ApiRestService) { 
  }

  ngOnInit() {
    console.log(this.song);
  }

  async play(song) {    
    try {
      await this.apiRestService.play(song);    
    } catch(error) {
      console.log(error);
    }
  }

  async stop() {    
    try {
      await this.apiRestService.stop();    
    } catch(error) {
      console.log(error);
    }
  }
}
