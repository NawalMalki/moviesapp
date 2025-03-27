import { Component, OnInit } from '@angular/core';
import { MangaService } from '../services/manga.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.css']
})
export class MangaListComponent implements OnInit {
  mangas: any[] = [];
  favorites: any[] = [];
  loading = true;

  constructor(private mangaService: MangaService,private router: Router) {}

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

  
  getStarsArray(score: number): { full: number, half: boolean } {
    const scaled = score / 2; // Score /10 → note sur 5
    const full = Math.floor(scaled);
    const half = scaled - full >= 0.25 && scaled - full < 0.75;
    return { full, half };
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

  viewMangaDetails(id: number): void {
    this.router.navigate(['/manga', id]);
  }

}