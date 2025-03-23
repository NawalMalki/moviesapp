import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {
  anime: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animeService.getAnimeById(id).subscribe({
        next: res => {
          this.anime = res.data;
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
    this.router.navigate(['/']);
  }
}
