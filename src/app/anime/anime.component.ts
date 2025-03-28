// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Film } from '../models';
// import { ApiService } from '../api.service';



// @Component({
//   selector: 'app-anime',
//   templateUrl: './anime.component.html',
//   styleUrl: './anime.component.css'
// })
// export class AnimeComponent implements OnInit {
//   public films: Film[] = []; 
//   public favoris: Film[]=[];

//   constructor(private api: ApiService,private router: Router) {}

//   ngOnInit(): void {
//     this.api.getFilms().subscribe({
//       next: (data: Film[]) => {
//         this.films = data; 
//         console.log('Films:', this.films);
//         this.chargerFavoris();
//       },
//       error: (err: any) => console.error('Erreur de chargement des films :', err),
//     });
//   }


// // viewFilmDetails(id: string): void {
// //   console.log('Navigating to film with ID:', id);
// //   this.router.navigate(['/film', id]);
// // }
// viewFilmDetails(id: string): void {
//   console.log('Navigating to film with ID:', id);
//   // Try this instead of the array syntax
//   this.router.navigateByUrl(/film/${id});
// }

// getStars(score: string): string[] {
//   const numericScore = parseInt(score, 10);
//   const starsCount = Math.floor(numericScore / 20);
//   return Array(starsCount).fill('★');
// }

// toggleFavori(film: Film): void {
//   const index = this.favoris.findIndex(f => f.id === film.id);
//   if (index !== -1) {
//     this.favoris.splice(index, 1);
//   } else {
//     this.favoris.push(film);
//   }
//   localStorage.setItem('favoris', JSON.stringify(this.favoris));
// }
// estFavori(film: Film): boolean {
//   return this.favoris.some(f => f.id === film.id);
// }

// chargerFavoris(): void {
//   const favorisStockes = localStorage.getItem('favoris');
//   if (favorisStockes) {
//     this.favoris = JSON.parse(favorisStockes);
//   }
// }

// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../models';
import { ApiService } from '../api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {
  public films: Film[] = []; 
  public favorisIds: string[] = [];
  public currentUser: any = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserFavorites(user.uid);
      }
    });

    this.api.getFilms().subscribe({
      next: (data: Film[]) => {
        this.films = data;
      },
      error: (err: any) => console.error('Erreur de chargement des films :', err),
    });
  }

  async toggleFavori(film: Film, event: Event) {
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('Veuillez vous connecter pour ajouter aux favoris');
      this.router.navigate(['/login']);
      return;
    }

    try {
      const isFavorite = this.favorisIds.includes(film.id);
      
      if (isFavorite) {
        // Supprimer le favori
        const query = await this.firestore.collection('filmsGhibli', ref => 
          ref.where('idUser', '==', this.currentUser.uid)
             .where('idFilm', '==', film.id)
        ).get().toPromise();
        
        query?.forEach(doc => {
          this.firestore.collection('filmsGhibli').doc(doc.id).delete();
        });
        
        this.favorisIds = this.favorisIds.filter(id => id !== film.id);
      } else {
        // Ajouter le favori
        await this.firestore.collection('filmsGhibli').add({
          idUser: this.currentUser.uid,
          idFilm: film.id,
         // dateAjout: new Date()
        });
        
        this.favorisIds.push(film.id);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des favoris:', error);
    }
  }

  estFavori(film: Film): boolean {
    return this.favorisIds.includes(film.id);
  }

  loadUserFavorites(userId: string): void {
    this.firestore.collection('filmsGhibli', ref => 
      ref.where('idUser', '==', userId)
    ).valueChanges().subscribe((favoris: any[]) => {
      this.favorisIds = favoris.map(f => f.idFilm);
    });
  }

  viewFilmDetails(id: string): void {
    console.log('Navigating to film with ID:', id);
    this.router.navigateByUrl(`/film/${id}`);
  }

  getStars(score: string): string[] {
    const numericScore = parseInt(score, 10);
    const starsCount = Math.floor(numericScore / 20);
    return Array(starsCount).fill('★');
  }
}