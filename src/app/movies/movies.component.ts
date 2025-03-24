import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  
  movies: any[] = [];
  selectedMovie: any = null; // Stocke les détails du film sélectionné
  trailerUrl: string | null = null; // Stocke l'URL du trailer

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe(data => {
      this.movies = data.results;
    });
  }

  showMovieDetails(movieId: number): void {
    // Récupère les détails du film
    this.moviesService.getMovieDetails(movieId).subscribe(data => {
      this.selectedMovie = data;
    });

    // Récupère les vidéos du film et cherche le trailer
    this.moviesService.getMovieVideos(movieId).subscribe(videoData => {
      const trailer = videoData.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });
  }

  closeMovieDetails(): void {
    this.selectedMovie = null;
    this.trailerUrl = null;
  }
}
