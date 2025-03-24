import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour décrire la réponse de la vidéo
interface Video {
  key: string;
  site: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey: string = '18e287c35d7035cccec6934cb40c0e39';
  private baseUrl: string = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) {}

  // Récupère les films populaires
  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movie/popular?api_key=${this.apiKey}`);
  }

  // Récupère les détails d'un film
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movie/${movieId}?api_key=${this.apiKey}`);
  }

  // Récupère les vidéos d'un film
  getMovieVideos(movieId: number): Observable<{ results: Video[] }> {
    return this.http.get<{ results: Video[] }>(`${this.baseUrl}movie/${movieId}/videos?api_key=${this.apiKey}`);
  }
}
