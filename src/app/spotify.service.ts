import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Album, Track,  } from './spotifymodels';
import { YouTubeService } from './youtube.service';  // Importation du service YouTube

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private token = 'BQApU-0g_RyPm5jEHv9H56JlLyJ6ostyF1xqwXdZLg1DZrqykmDm6WLEX46qC_Zabfto95Qhfg71hMQNb_lKlLB0Cft8czkzjfY1MiPWZx7AOJOXKGsfusyjiYYqtAHWD-vBPCQHGoQ'; 

  constructor(private http: HttpClient,private youtubeService: YouTubeService) {}

  // Récupérer plusieurs albums en utilisant les IDs pour la France
  getAlbumsFrance(): Observable<Album[]> {
    const ids = '0s4v36LmZVmcutSEXwt3uD,3jI55EoABEJ0qbxHJ7OvQ6,1ZDeD4gGI757lBlOAkmJ2i,76RWA8RdhYOHnqDTgRptOl,7hMSLnBcnkrfOs0Uluksc5,30M4RbTzpc2lH3OdSwJTgu,2gN39EbfqN5KLxoqPv6M3V,0c57PH26xtTFt4LPN7ZLWm,673iiuWKaEWX6MqvvN0Cw6,5IA4BoY6B9rGNTNMAJnXZj,23WVBS3u2p0IjFK1apyDtL,6yaH6kaMMfohSkXlCp7wp8,4ujvMhSP81fvCHa0IeKqgt,0BM9zS8PhkYIxG3vqlINUp,4nTcQn4uBbE00aJMgBmoWC,05xpzYcfsrfR5asnH24pw5,0PUmXgFRh9hyIIG9cuBxPA,6XRgeirorxvr1SNfZGcnVI,2WyJi4lJpRrSSyB0iW9lBQ,3kOhzA5Vb2pp8nPf1BR1iA,'; // IDs pour albums français
    return this.http.get<{ albums: Album[] }>(`${this.apiUrl}/albums?ids=${ids}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).pipe(
      map(response => response.albums) 
    );
  }

  
  getAlbumsKpop(): Observable<Album[]> {
    const ids = '3PNxZ3BELbUXJ1XLktXiHz,7bnqo1fdJU9nSfXQd3bSMe,71O60S5gIJSIAhdnrDIh3N,66OYt73mqan1hWa78BhfPd,0FOOodYRlj7gzh7q7IjmNZ,5BQcoDfcZ8aBcikYX9B7Ob,0wOiWrujRbxlKEGWRQpKYc,2Fna4Tb7fme5aHsNMJtVtp,7jaSNQUBJbvfbZHLNFrV7P,1vhNGBTFoaSTLbHjPGFIlF,5r35iS0uSSoQBKzQj0IeI3,2qSQ92cTZbI3bYgdArFk7F,1hmW4opQGq4hIYTbEWsyqW,6al2VdKbb6FIz9d7lU7WRB,4Oz7K9DRwwGMN49i4NbVDT,3r5m8utqRZYJnpep7xxVyq,4SboBpuYojDm02qS4iFeJC,7ikmjsvRzDRzxHN0KXSQdv,1XMYvsHRt52sMi6wittWqI,3wMlxC4t3dN70e1OF8wUfz';

    return this.http.get<{ albums: Album[] }>(`${this.apiUrl}/albums?ids=${ids}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).pipe(
      map(response => response.albums) 
    );
  }

  getAlbumsSpanish(): Observable<Album[]> {
    const ids = '4iyoO6tOGnEaR2CYrUmukL,0Wf0E2diHQJRdkPR12BcXs,0ePoAsHC4vvO8tZzPKtYC3,67dHBx9SPvbc0fiz8KzgPv,1lCpCUkyehHRqVv3q7elLm,5tp3ALCbxJuAJFUHv5XmeN,6x58KbazwOTgq3kvqCkfU8,2Fy0cyNtT6mpTVWtAAyfh4,5z4aZJ5U7LqwRc2tXk98cc,6ByOad22iRlD1jd5kedqXT,3lnk9plFdJaX9w7a2LG1wh,1gxCDt7C0JI9tucRc6IZL2,1MM793zvDaFYCPltgO9Cl3,0HKQNrezcj0dyQC4vuvUYm,5N7FjUYrrAXgUUTjlqcBpN,5N7FjUYrrAXgUUTjlqcBpN,4IabA7t6hEqyzNiy00gDid,5E7f4DCo6MdAti2L3DL3E9,22AX5n4lUirG6L2rIl98I7,69RDPyF9WUlvxeUnwcWP9E';
    return this.http.get<{ albums: Album[] }>(`${this.apiUrl}/albums?ids=${ids}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).pipe(
      map(response => response.albums)
    );
  }
  
// Fonction pour récupérer la prévisualisation de la chanson en utilisant YouTube Music
getTrackPreview(songName: string, artistName: string): Observable<string> {
  return this.youtubeService.searchSongOnYouTube(songName, artistName);
}

getAlbumTracks(albumId: string): Observable<Track[]> {
  return this.http.get<{ items: Track[] }>(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  }).pipe(
    switchMap(response => {
     
      const tracks = response.items;
      console.log(tracks)

     
      const trackPreviews = tracks.map(track =>
        this.getTrackPreview(track.name, track.artists[0]?.name).pipe(

          map(previewUrl => {
           
            track.preview_url = previewUrl;
            return this.mapTrack(track); 
          })
        )
      );

     
      return forkJoin(trackPreviews);
    })
  );
}

mapTrack(item: Track): Track {
  return {
    id: item.id,
    name: item.name,
    artists: item.artists,
    disc_number: item.disc_number,
    duration_ms: item.duration_ms,
    explicit: item.explicit,
    external_urls: item.external_urls,
    href: item.href,
    is_playable: item.is_playable,
    preview_url: item.preview_url ,
    track_number: item.track_number,
    type: item.type,
    uri: item.uri,
    is_local: item.is_local,
  };
}


  
}