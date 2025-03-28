import { Component, OnInit } from '@angular/core';
import { Film } from '../../models';
import { ApiService } from '../../api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FavoritesService } from '../../favorite.service';
import { Album } from '../../spotifymodels';
import { GetFavoriteAlbumsService } from '../../get-favorite-albums.service'; // Vérifie le chemin correct




@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  public ghibliFavorites: Film[] = [];
  public loading = true;
  public currentUser: any = null;
  favoritesMusic: Set<string> = new Set(); // Pour garder les albums favoris
  musicAlbums: Album[] = []; // To hold the fetched albums

  constructor(
    private api: ApiService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private favoritesService: FavoritesService,
    private GetFavoriteAlbumsService: GetFavoriteAlbumsService ,
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadGhibliFavorites(user.uid);
        this.loadMusicFavorites();  
      } else {
        this.loading = false;
      }
    });
  }

  // Charger les favoris de films Ghibli (partie qui ne doit pas être modifiée)
  loadGhibliFavorites(userId: string): void {
    this.firestore.collection('filmsGhibli', ref => 
      ref.where('idUser', '==', userId)
    ).valueChanges().subscribe(async (favoris: any[]) => {
      const filmIds = favoris.map(f => f.idFilm);
      
      this.api.getFilms().subscribe((films: Film[]) => {
        this.ghibliFavorites = films.filter(film => filmIds.includes(film.id));
        this.loading = false;
      });
    });
  }

  // Supprimer un favori (pour les films Ghibli)
  async removeFavorite(film: Film, event: Event) {
    event.stopPropagation();
    
    if (!this.currentUser) return;

    try {
      const query = await this.firestore.collection('filmsGhibli', ref => 
        ref.where('idUser', '==', this.currentUser.uid)
           .where('idFilm', '==', film.id)
      ).get().toPromise();
      
      query?.forEach(doc => {
        this.firestore.collection('filmsGhibli').doc(doc.id).delete();
      });
      
      this.ghibliFavorites = this.ghibliFavorites.filter(f => f.id !== film.id);
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error);
    }
  }

  // Fonction pour afficher les étoiles en fonction de la note (garder tel quel)
  getStars(score: string): string[] {
    const numericScore = parseInt(score, 10);
    const starsCount = Math.floor(numericScore / 20);
    return Array(starsCount).fill('★');
  }

// Load the favorite music albums
async loadMusicFavorites(): Promise<void> {
  try {
    const userFavorites = await this.favoritesService.getUserFavorites();  // Get the user's favorite IDs
    this.favoritesMusic =  new Set(userFavorites.map(fav => fav.albumID));  
    this.GetFavoriteAlbumsService.getFavoriteAlbumsByIds(Array.from(this.favoritesMusic)).subscribe((albums: Album[]) => {
      this.musicAlbums = albums; 
      this.loading = false;  
    });
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
}

// Ajouter ou enlever un album des favoris
async removeFavoriteMovie(album: any): Promise<void> {
  try {
    if (this.favoritesMusic.has(album.id)) {
      await this.favoritesService.removeFromFavorites(album.id);
      this.favoritesMusic.delete(album.id);
      this.loadMusicFavorites();  
    } 
  } catch (error) {
    console.error('Erreur lors de la modification des favoris', error);
  }
}


}
