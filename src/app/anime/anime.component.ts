import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../models';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})
export class AnimeComponent implements OnInit {
  public films: Film[] = []; 
  public favoris: Film[]=[];

  constructor(private api: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.api.getFilms().subscribe({
      next: (data: Film[]) => {
        this.films = data; 
        console.log('Films:', this.films);
        this.chargerFavoris();
      },
      error: (err: any) => console.error('Erreur de chargement des films :', err),
    });
  }


// viewFilmDetails(id: string): void {
//   console.log('Navigating to film with ID:', id);
//   this.router.navigate(['/film', id]);
// }
viewFilmDetails(id: string): void {
  console.log('Navigating to film with ID:', id);
  // Try this instead of the array syntax
  this.router.navigateByUrl(`/film/${id}`);
}

getStars(score: string): string[] {
  const numericScore = parseInt(score, 10);
  const starsCount = Math.floor(numericScore / 20);
  return Array(starsCount).fill('★');
}

toggleFavori(film: Film): void {
  const index = this.favoris.findIndex(f => f.id === film.id);
  if (index !== -1) {
    this.favoris.splice(index, 1);
  } else {
    this.favoris.push(film);
  }
  localStorage.setItem('favoris', JSON.stringify(this.favoris));
}
estFavori(film: Film): boolean {
  return this.favoris.some(f => f.id === film.id);
}

chargerFavoris(): void {
  const favorisStockes = localStorage.getItem('favoris');
  if (favorisStockes) {
    this.favoris = JSON.parse(favorisStockes);
  }
}

}


