import { Component, OnInit } from '@angular/core';
import { MyAnimeService } from '../services/my-anime.service';


@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: any[] = [];
  favorites: any[] = [];
  loading = true;

  constructor(private animeService: MyAnimeService) {}

  ngOnInit(): void {
    this.animeService.getTopAnimes().subscribe({
      next: (response) => {
        this.animes = response.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStars(score: number): number[] {
    const stars = Math.round(score / 2);
    return Array(stars).fill(0);
  }

  toggleFavorite(anime: any): void {
    const index = this.favorites.findIndex(f => f.mal_id === anime.mal_id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(anime);
    }
  }

  isFavorite(anime: any): boolean {
    return this.favorites.some(f => f.mal_id === anime.mal_id);
  }
}
