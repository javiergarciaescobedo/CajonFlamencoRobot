import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  downloadSongs() {
    return new Promise(resolve => {
      this.http.get('http://192.168.111.88:8080/get_songs_list').subscribe(
        res => {
          resolve(res);
        }, err => {
          console.log(err);
        })
    });
  }

  play(song) {
    console.log("Reproducir: ", song);
    this.http.get('http://192.168.111.88:8080/play?song=' + song.name).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    );  
  }
}
