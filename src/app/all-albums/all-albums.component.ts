import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Album, Track } from '../spotifymodels';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FavoritesService } from '../favorite.service';

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
  favorites: Set<string> = new Set(); // Pour garder les albums favoris

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.genre = this.route.snapshot.paramMap.get('genre')!;
    this.loadAlbums();
    this.loadFavorites(); 
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

  // Charger les albums favoris de manière plus efficace
  async loadFavorites(): Promise<void> {
    try {
      const userFavorites = await this.favoritesService.getUserFavorites();
      this.favorites = new Set(userFavorites.map(fav => fav.albumID));
    } catch (error) {
      console.error('Erreur lors du chargement des favoris', error);
    }
  }

  // Ajouter ou enlever un album des favoris
  async toggleFavorite(album: any): Promise<void> {
    try {
      if (this.favorites.has(album.id)) {
        await this.favoritesService.removeFromFavorites(album.id);
        this.favorites.delete(album.id);
      } else {
        await this.favoritesService.addToFavorites(album.id);
        this.favorites.add(album.id);
      }
    } catch (error) {
      console.error('Erreur lors de la modification des favoris', error);
    }
  }

  // Vérifier si un album est déjà un favori
  estFavori(album: any): boolean {
    return this.favorites.has(album.id);
  }
}