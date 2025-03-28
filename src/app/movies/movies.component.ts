import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importe le Router pour naviguer
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  movies: any[] = [];
  favorites: any[] = [];

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe(data => {
      this.movies = data.results;
    });
  }

  // Fonction qui gère le clic sur la carte du film
  goToMovieDetails(movieId: number): void {
    // Redirige vers le détail du film sans utiliser 'routerLink' directement
    this.router.navigate(['/movies', movieId]);
  }

  isFavorite(anime: any): boolean {
    return this.favorites.some(f => f.mal_id === anime.mal_id);
  }

  getStars(score: number | string): string[] {
    const numericScore = typeof score === 'string' ? parseFloat(score) : score;
    if (isNaN(numericScore)) {
      return [];
    }
    const starsCount = Math.round(numericScore / 2);
    return Array(5).fill('☆').map((star, index) => index < starsCount ? '★' : '☆');
  }
}
