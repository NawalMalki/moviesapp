import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';
// <<<<<<< HEAD
//   private apiKey = 'AIzaSyByjdKMX9g9QxwxyI_tOiqdpwpRxdl7DZY'; 

  private apiKey = 'AIzaSyDe4uzauU4x0UvgeX1wAj6VbaN6btS1xfk'; 

  constructor(private http: HttpClient) {}

  searchSongOnYouTube(songName: string, artistName: string): Observable<string> {
    // Créer une requête plus précise avec le nom de l'artiste et de la chanson
    const query = encodeURIComponent(`${artistName} ${songName} official`);
    
    return this.http.get<any>(`${this.apiUrl}?part=snippet&q=${query}&maxResults=1&type=video&key=${this.apiKey}`).pipe(
      map(response => {
        if (response.items && response.items.length > 0) {
          // Retourne l'URL de la vidéo YouTube
          const videoId = response.items[0].id.videoId;
          return `https://www.youtube.com/watch?v=${videoId}`;
        } else {
          throw new Error('Aucune vidéo trouvée pour cette chanson');
        }
      })
    );
  }

}


