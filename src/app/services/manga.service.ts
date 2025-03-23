import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private apiUrl = 'https://api.jikan.moe/v4/manga'; // URL de l'API

  constructor(private http: HttpClient) {}

   // ✅ Cette méthode est utilisée dans le composant
   getTopManga(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=20&order_by=score&sort=desc`);
  }

  // Optionnel : chercher un manga par nom
  searchManga(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }

  getMangaList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getMangaById(id: string): Observable<any> {
    return this.http.get<any>(`https://api.jikan.moe/v4/manga/${id}`);
  }
  
}
