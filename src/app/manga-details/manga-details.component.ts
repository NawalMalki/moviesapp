import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from '../services/manga.service';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.css']
})
export class MangaDetailsComponent implements OnInit {
  manga: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mangaService.getMangaById(id).subscribe({
        next: res => {
          this.manga = res.data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  getStars(score: number): number[] {
    const stars = Math.round(score / 2);
    return Array(stars).fill(0);
  }

  goBack(): void {
    this.router.navigate(['/']); // ou vers '/home' si tu veux
  }
}
