import { Component, OnInit } from '@angular/core';
import { MyAnimeService } from '../services/my-anime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: any[] = [];
  favorites: any[] = [];
  loading = true;

  constructor(private animeService: MyAnimeService,  private router: Router) {}
  
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

  getStars(score: number): string[] {
    const starsCount = Math.floor(score / 20);
    return Array(starsCount).fill('★');
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

  viewAnimeDetails(id: number): void {
    this.router.navigate(['/anime', id]);
  }

}

