import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  private baseUrl = 'https://api.unsplash.com';
  private accessKey = 'i6YFjCZYvAe__adb1yzCSfI0ZwTfchMIHtsrQa6_01M'; // Remplace par ta clé API Unsplash

  constructor(private http: HttpClient) {}

  getWallpapers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/photos`, {
      params: {
        query: 'japonease-anime-manga',
        client_id: this.accessKey,
        per_page: '15' // Limite à 10 images pour l'exemple
      }
    });
  }
}