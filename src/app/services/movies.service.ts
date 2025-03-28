import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey: string = '18e287c35d7035cccec6934cb40c0e39';
  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private collectionName = 'movies'; // Firestore collection for movies (favorites)
  authService: any;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  // Get popular movies from the API
  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movie/popular?api_key=${this.apiKey}`);
  }

  // Get movie details from the API
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movie/${movieId}?api_key=${this.apiKey}`);
  }

  // Get movie videos from the API
  getMovieVideos(movieId: number): Observable<{ results: any[] }> {
    return this.http.get<{ results: any[] }>(`${this.baseUrl}movie/${movieId}/videos?api_key=${this.apiKey}`);
  }

  // Add a movie to the user's favorites in Firestore
  addFavori(movieId: number, userId: string): Promise<void> {
    return this.firestore.collection(this.collectionName).add({
      cleAPI: movieId,  // Movie ID from the API
      idUser: userId    // User's ID
    }).then(() => {});
  }

  // Remove a movie from the user's favorites in Firestore
  removeFavori(movieId: number, userId: string): Promise<void> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('cleAPI', '==', movieId).where('idUser', '==', userId))
      .get()
      .toPromise()
      .then(querySnapshot => {
        querySnapshot?.forEach(doc => doc.ref.delete());
      });
  }

  // Check if a movie is in the user's favorites
  isFavori(movieId: number, userId: string): Observable<boolean> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('cleAPI', '==', movieId).where('idUser', '==', userId))
      .snapshotChanges()
      .pipe(map(changes => changes.length > 0));
  }

  // Get all favorite movies for a user
  getFavoris(userId: string): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, ref => ref.where('idUser', '==', userId))
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => {
        const data = c.payload.doc.data() as any;
        return { id: c.payload.doc.id, ...data };
      })));
  }

  toggleFavorite(movie: any): void {
    const userId = this.authService.getUserId(); // Récupérer l'utilisateur connecté
    if (!userId) return;

    const favMovieRef = this.firestore.collection('favorites', ref => 
      ref.where('movie_id', '==', movie.id).where('userId', '==', userId)
    );

    favMovieRef.get().subscribe(snapshot => {
      if (!snapshot.empty) {
        // Si le film est déjà en favori, on le supprime
        snapshot.forEach(doc => doc.ref.delete());
      } else {
        // Sinon, on l'ajoute aux favoris
        this.firestore.collection('favorites').add({
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          userId: userId,
          release_date: movie.release_date
        });
      }
    });
  }

  isFavorite(movieId: number): Observable<boolean> {
    const userId = this.authService.getUserId();
    if (!userId) return new Observable(subscriber => subscriber.next(false));

    return this.firestore.collection('favorites', ref =>
      ref.where('movie_id', '==', movieId).where('userId', '==', userId)
    ).valueChanges().pipe(map(favs => favs.length > 0));
  }
}
