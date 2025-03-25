import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAnimeService {
  private apiUrl = 'https://api.jikan.moe/v4/anime';

  constructor(private http: HttpClient) {}
  
   //  Récupérer un anime par ID
   getAnimeById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
    //  Récupérer les meilleurs animes
    getTopAnimes(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}?limit=20&order_by=score&sort=desc`);
    }
  
    // Optionnel : chercher un anime par nom
    searchAnime(query: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}?q=${query}`);
    }
  getAnimes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}