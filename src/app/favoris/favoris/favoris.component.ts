import { Component, OnInit } from '@angular/core';
import { Film } from '../../models';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent implements OnInit {
  public favoris: Film[] = [];

  ngOnInit(): void {
    this.chargerFavoris();
  }

  chargerFavoris(): void {
    const favorisStockes = localStorage.getItem('favoris');
    if (favorisStockes) {
      this.favoris = JSON.parse(favorisStockes);
    }
  }

  supprimerFavori(film: Film): void {
    this.favoris = this.favoris.filter(f => f.id !== film.id);
    localStorage.setItem('favoris', JSON.stringify(this.favoris));
  }
}

