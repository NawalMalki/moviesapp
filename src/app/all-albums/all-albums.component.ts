import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Album, Track } from '../spotifymodels';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.css'],
})
export class AllAlbumsComponent implements OnInit {
  genre: string = '';
  allAlbums: any[] = [];
  selectedAlbum: any = null;
  albumTracks: Track[] = [];
  currentTrack: Track | null = null;
  isPlaying: boolean = false;
  audio: HTMLAudioElement = new Audio();
  favorisTracks: Track[] = [];
 

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
     private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.genre = this.route.snapshot.paramMap.get('genre')!;
    this.loadAlbums();
  }

  loadAlbums() {
    if (this.genre === 'france') {
      this.spotifyService.getAlbumsFrance().subscribe((albums) => {
        this.allAlbums = albums;
      });
    } else if (this.genre === 'kpop') {
      this.spotifyService.getAlbumsKpop().subscribe((albums) => {
        this.allAlbums = albums;
      });
    } else if (this.genre === 'spain') {
      this.spotifyService.getAlbumsSpanish().subscribe((albums) => {
        this.allAlbums = albums;
      });
    }
  }

  showAlbumDetails(album: any) {
    this.selectedAlbum = album;
    this.spotifyService.getAlbumTracks(album.id).subscribe((tracks) => {
      console.log(tracks)
      this.albumTracks = tracks;
    });
  }

  closeAlbumDetails() {
    this.selectedAlbum = null;
  }

 

  openTrackOnSpotify(track: Track) {
    window.open(track.external_urls.spotify, '_blank');
  }


  selectedTrack: any = null;

  playVideo(track: any) {
    this.selectedTrack = track;
    this.isPlaying = true;
  }
  
  getSafeVideoUrl(url: string): SafeResourceUrl {
    // Si l'URL est une URL YouTube directe (comme https://www.youtube.com/watch?v=VIDEO_ID)
    // vous devez la convertir en format d'intégration
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      url = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be')) {
      // Si c'est un lien court YouTube (comme https://youtu.be/VIDEO_ID)
      const videoId = url.split('/').pop();
      url = `https://www.youtube.com/embed/${videoId}`;
    }
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }


  
toggleFavori(track: Track): void {
  const index = this.favorisTracks.findIndex(t => t.id === track.id);
  if (index !== -1) {
    this.favorisTracks.splice(index, 1);
  } else {
    this.favorisTracks.push(track);
  }
  localStorage.setItem('favorisTracks', JSON.stringify(this.favorisTracks));
}

estFavori(track: Track): boolean {
  return this.favorisTracks.some(t => t.id === track.id);
}
  
}