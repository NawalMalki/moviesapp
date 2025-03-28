import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  
  selectedMovie: any = null;
  trailerUrl: string | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id'); // Retrieve the movie ID from the URL
    if (movieId) {
      this.fetchMovieDetails(+movieId);  // Fetch movie details by ID
    } else {
      this.errorMessage = 'Movie ID is missing or invalid.';
      this.loading = false;
    }
  }

  private fetchMovieDetails(movieId: number): void {
    this.moviesService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.selectedMovie = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load movie details. Please try again later.';
        this.loading = false;
      }
    );

    this.moviesService.getMovieVideos(movieId).subscribe(
      (videoData) => {
        const trailer = videoData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load movie trailers. Please try again later.';
      }
    );
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
