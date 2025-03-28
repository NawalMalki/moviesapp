import { Component, OnInit } from '@angular/core';
import { Film } from '../../models';
import { ApiService } from '../../api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  public ghibliFavorites: Film[] = [];
  public loading = true;
  public currentUser: any = null;

  constructor(
    private api: ApiService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadGhibliFavorites(user.uid);
      } else {
        this.loading = false;
      }
    });
  }

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

  getStars(score: string): string[] {
    const numericScore = parseInt(score, 10);
    const starsCount = Math.floor(numericScore / 20);
    return Array(starsCount).fill('★');
  }
}