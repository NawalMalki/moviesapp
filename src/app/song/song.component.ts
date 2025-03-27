import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Album, Track } from '../spotifymodels';
import { Router } from '@angular/router'; // Assurez-vous d'importer Router

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  albumsFrance: Album[] = [];
  albumsKpop: Album[] = [];
  albumsSpanish: Album[] = [];
  tracks: Track[] = [];
  selectedAlbum: Album | null | undefined = null;


  constructor(private spotifyService: SpotifyService,private router: Router) {}

  ngOnInit() {
    // Charger les albums français
    this.spotifyService.getAlbumsFrance().subscribe((albums) => {
      this.albumsFrance = albums;
      console.log('Albums français récupérés:', this.albumsFrance); // Afficher les albums français dans la console
  
    });

    // Charger les albums K-pop
    this.spotifyService.getAlbumsKpop().subscribe((albums) => {
      this.albumsKpop = albums;
      console.log('Albums spanish récupérés:', this.albumsKpop); // Afficher les albums français dans la console
    });
  

    // Charger les albums spanish
    this.spotifyService.getAlbumsSpanish().subscribe((albums) => {
      this.albumsSpanish = albums;
      console.log('Albums kpop récupérés:', this.albumsSpanish); // Afficher les albums spanish dans la console
    });
  }

  

  // Lorsque l'utilisateur clique sur un album, récupérer les tracks
  onAlbumClick(albumId: string) {
    this.spotifyService.getAlbumTracks(albumId).subscribe((tracks) => {
      this.tracks = tracks;
      this.selectedAlbum = this.albumsFrance.find((album) => album.id === albumId) || this.albumsKpop.find((album) => album.id === albumId);
    });
  }


  getArtistNames(track: Track): string {
    // Si plusieurs artistes existent, on les affiche séparés par des virgules
    return track.artists.map(artist => artist.name).join(', ');
  }

   // Méthode pour rediriger vers la page des albums en fonction du genre/pays
   showAllAlbums(genre: string) {
    this.router.navigate(['/all-albums', genre]);  // Naviguer vers la page avec l'argument genre
  }
  
}