import { Component, OnInit } from '@angular/core';
import { WallpaperService } from '../wallpaper.service';

@Component({
  selector: 'app-wallpapers-ghibli',
  templateUrl: './wallpapers-ghibli.component.html',
  styleUrls: ['./wallpapers-ghibli.component.css']
})
export class WallpapersGhibliComponent implements OnInit {
  wallpapers: any[] = [];
  errorMessage: string = '';

  constructor(private wallpaperService: WallpaperService) {}

  ngOnInit(): void {
    this.fetchWallpapers();
  }

  fetchWallpapers(): void {
    this.wallpaperService.getWallpapers().subscribe({
      next: (response) => {
        this.wallpapers = response.results.map((photo: any) => ({
          title: photo.alt_description || 'Wallpaper Ghibli',
          imageUrl: photo.urls.regular, 
          description: photo.description || 'Un magnifique fond d\'écran inspiré de Studio Ghibli.'
        }));
        console.log(this.wallpapers); 
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des wallpapers';
        console.error(error);
      }
    });
  }
}