import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  async downloadSongs() {
    try {
      return await this.http.get('https://192.168.111.127:8080/get_songs_list').toPromise();
    } catch (error) {
      console.log('Error en downloadSongs: ', error);
      throw error;
    } 
  }

  async play(song) {
    try {
      return await this.http.get('https://192.168.111.127:8080/play?song=' + song.name).toPromise();
    } catch (error) {
      console.log('Error en play: ', error);
      throw error;
    } 
  }

  async stop() {
    try {
      return await this.http.get('https://192.168.111.127:8080/stop').toPromise();
    } catch (error) {
      console.log('Error en stop: ', error);
      throw error;
    } 
  }
}
