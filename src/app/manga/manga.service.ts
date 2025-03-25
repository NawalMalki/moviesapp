import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private baseUrl = 'https://api.mangadex.org';

  constructor(private http: HttpClient) {}

  // Récupère une liste de mangas
  getMangaList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/manga`, {
      params: {
        limit: '10', // Limite à 10 mangas pour l'exemple
        'contentRating[]': ['safe', 'suggestive'], // Filtre les contenus explicites
        'includes[]': ['cover_art'] // Inclut les couvertures
      }
    });
  }
}