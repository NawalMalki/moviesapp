import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from './spotifymodels';

@Injectable({
  providedIn: 'root'
})
export class GetFavoriteAlbumsService {
  private apiUrl = 'https://api.spotify.com/v1'; // Your Spotify API endpoint
  private token = 'BQApU-0g_RyPm5jEHv9H56JlLyJ6ostyF1xqwXdZLg1DZrqykmDm6WLEX46qC_Zabfto95Qhfg71hMQNb_lKlLB0Cft8czkzjfY1MiPWZx7AOJOXKGsfusyjiYYqtAHWD-vBPCQHGoQ';  // Your Spotify API Token

  constructor(private http: HttpClient) {}

  // Fetch albums based on a list of IDs
  getFavoriteAlbumsByIds(albumIds: string[]): Observable<Album[]> {
    const ids = albumIds.join(','); // Convert array to comma-separated string
    return this.http.get<{ albums: Album[] }>(`${this.apiUrl}/albums?ids=${ids}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).pipe(
      map(response => response.albums) // Return the album data
    );
  }
}
