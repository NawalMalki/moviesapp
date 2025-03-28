import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WallpaperService } from './wallpaper.service';

@Component({
  selector: 'app-wallpapers-ghibli',
  templateUrl: './wallpapers-ghibli.component.html',
  styleUrls: ['./wallpapers-ghibli.component.css']
})
export class WallpapersGhibliComponent implements OnInit {
  wallpapers: any[] = [];
  favoris: any[] = [];
  errorMessage: string = '';

  constructor(private wallpaperService: WallpaperService, private router: Router) {}

  ngOnInit(): void {
    this.fetchWallpapers();
    this.chargerFavoris();
  }

  fetchWallpapers(): void {
    this.wallpaperService.getWallpapers().subscribe({
      next: (response) => {
        this.wallpapers = response.results.map((photo: any) => ({
          id: photo.id, // Ajout de l'ID pour les favoris et navigation
          title: photo.alt_description || 'Wallpaper Ghibli',
          imageUrl: photo.urls.regular,
          description: photo.description || 'Un magnifique fond d\'écran inspiré de Studio Ghibli.',
          rt_score: '80' // Valeur par défaut pour les étoiles, ajustable si nécessaire
        }));
        console.log('Wallpapers:', this.wallpapers);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des wallpapers';
        console.error(error);
      }
    });
  }

  viewFilmDetails(id: string): void {
    console.log('Navigating to wallpaper with ID:', id);
    this.router.navigateByUrl(`/wallpapers-ghibli/${id}`); // Ajustez le chemin selon votre routing
  }

  getStars(score: string): string[] {
    const numericScore = parseInt(score, 10);
    const starsCount = Math.floor(numericScore / 20);
    return Array(starsCount).fill('★');
  }

  toggleFavori(wallpaper: any): void {
    const index = this.favoris.findIndex(f => f.id === wallpaper.id);
    if (index !== -1) {
      this.favoris.splice(index, 1);
    } else {
      this.favoris.push(wallpaper);
    }
    localStorage.setItem('favoris', JSON.stringify(this.favoris));
  }

  estFavori(wallpaper: any): boolean {
    return this.favoris.some(f => f.id === wallpaper.id);
  }

  chargerFavoris(): void {
    const favorisStockes = localStorage.getItem('favoris');
    if (favorisStockes) {
      this.favoris = JSON.parse(favorisStockes);
    }
  }
}