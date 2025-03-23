import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  public filmData: Film | undefined; 
  
  constructor(private api: ApiService,private router: Router,private route: ActivatedRoute) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getFilmById(id).subscribe({
        next: (data: Film) => {
          this.filmData = data;
          console.log('Film data:', this.filmData);
        },
        error: (err: any) => console.error('Erreur de chargement du film :', err),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/anime']);
  }

  getStars(score: string): string[] {
    const numericScore = parseInt(score, 10);
    const starsCount = Math.floor(numericScore / 20);
    return Array(starsCount).fill('★');
  }
}