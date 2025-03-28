import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from './spotifymodels';

@Injectable({
  providedIn: 'root'
})
export class GetFavoriteAlbumsService {
  private apiUrl = 'https://api.spotify.com/v1';
  private token = 'BQAfAF732p84T1h7TlVUv61ApopEFOlQcg0q0B-C_A74lC72_VpG9PCsTrhmMS_yGQKnVtWMQ6KV73Xmmr-ez9tZolcOXgd7aGNbye9Gu5iAEBUS8NbHn_529f6ReVBRtz_BADhgYJY'; 

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