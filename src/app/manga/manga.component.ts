import { Component, OnInit } from '@angular/core';
import { MangaService } from './manga.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {
  mangas: any[] = []; // Stocke la liste des mangas
  errorMessage: string = '';

  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    this.fetchMangas();
  }

  fetchMangas(): void {
    this.mangaService.getMangaList().subscribe({
      next: (response) => {
        this.mangas = response.data; // Stocke les mangas
        console.log(this.mangas); // Pour déboguer
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des mangas';
        console.error(error);
      }
    });
  }

  getCoverUrl(manga: any): string {
    const coverRelationship = manga.relationships.find(
      (rel: any) => rel.type === 'cover_art'
    );
    if (coverRelationship) {
      const coverFileName = coverRelationship.attributes?.fileName;
      return `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`;
    }
    return 'https://via.placeholder.com/150'; // Image par défaut si aucune couverture
  }
}