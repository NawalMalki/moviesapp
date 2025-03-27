import { Component, OnInit } from '@angular/core';
import { MangaService } from '../services/manga.service';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.css']
})
export class MangaListComponent implements OnInit {
  mangas: any[] = [];
  favorites: any[] = [];
  loading = true;

  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    this.mangaService.getTopManga().subscribe({
      next: (response) => {
        this.mangas = response.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStars(score: number): number[] {
    const stars = Math.round(score / 2); // score /10 → 5 étoiles
    return Array(stars).fill(0);
  }

  toggleFavorite(manga: any): void {
    const index = this.favorites.findIndex(f => f.mal_id === manga.mal_id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(manga);
    }
  }

  isFavorite(manga: any): boolean {
    return this.favorites.some(f => f.mal_id === manga.mal_id);
  }
}