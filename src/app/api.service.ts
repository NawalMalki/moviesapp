import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from './models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://ghibli-api.vercel.app/api';

  constructor(private http: HttpClient) {}

  public getFilms(): Observable<Film[]> {
    return this.http.get<{ data: Film[] }>(`${this.baseUrl}/films`).pipe(
      map((response) => response.data) // Extraire uniquement le tableau `data`
    );
  }
  public getFilmById(id: string): Observable<Film> {
    return this.http.get<{ data: Film }>(`${this.baseUrl}/films/${id}`).pipe(
      map(response => response.data) // Extraire la propriété `data`
    );
  }
   // Récupérer les détails d'une personne par son URL
   public getPersonByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
