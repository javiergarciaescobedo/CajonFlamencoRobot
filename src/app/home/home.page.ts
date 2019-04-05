import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  songs: any;

  constructor(private http: HttpClient) { 
    this.downloadSongs()
    .then(data => {
      this.songs = data;
    });
  }

  play(song) {
    console.log("Reproducir: ", song);
    this.http.get('http://192.168.111.88:8080/play?song=' + song.name).subscribe((response) => {
      console.log(response);
    }, err => {
      console.log(err);
    });  
  }

  downloadSongs() {
    return new Promise(resolve => {
      this.http.get('http://192.168.111.88:8080/get_songs_list').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
