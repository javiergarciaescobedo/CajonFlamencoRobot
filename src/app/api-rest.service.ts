import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  async downloadSongs() {
    try {
      return await this.http.get('http://192.168.111.88:8080/get_songs_list').toPromise();
    } catch (error) {
      console.log('Error en downloadSongs: ', error);
      throw error;
    } 
  }

  async play(song) {
    try {
      return await this.http.get('http://192.168.111.88:8080/play?song=' + song.name).toPromise();
    } catch (error) {
      console.log('Error en play: ', error);
      throw error;
    } 
  }
}
