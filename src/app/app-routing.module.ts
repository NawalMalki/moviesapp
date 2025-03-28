import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MotdepasseoublieComponent } from './motdepasseoublie/motdepasseoublie.component';

import { AnimeComponent } from './anime/anime.component';
import { FilmDetailsComponent } from './anime-details/film-details/film-details.component';
import { FavorisComponent } from './favoris/favoris/favoris.component';
import { AllAlbumsComponent } from './all-albums/all-albums.component';
import { SongComponent } from './song/song.component';
import { MoviesComponent } from './movies/movies.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { AnimeListDetailsComponent } from './anime-list-details/anime-list-details.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { WallpapersGhibliComponent } from './wallpapers-ghibli/wallpapers-ghibli.component';
import { AuthGuard } from './guards/auth.guard';
 

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'motdepasseoublie', component: MotdepasseoublieComponent ,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  {path:'anime', component:AnimeComponent,canActivate: [AuthGuard]},
  { path: 'film/:id', component: FilmDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'favoris', component: FavorisComponent,canActivate: [AuthGuard] },
  {path:'song' , component:SongComponent,canActivate: [AuthGuard]},
  {path :'movies' , component:MoviesComponent,canActivate: [AuthGuard]},
  { path: 'wallpapers-ghibli', component: WallpapersGhibliComponent,canActivate: [AuthGuard] },
  {path:'manga',component: MangaListComponent,canActivate: [AuthGuard]},
  {path:'anime-actual',component: AnimeListComponent,canActivate: [AuthGuard]},
  { path: 'manga/:id', component: MangaDetailsComponent,canActivate: [AuthGuard] },
  { path: 'anime/:id', component: AnimeListDetailsComponent,canActivate: [AuthGuard]},
  { path: 'movies/:id', component: MovieDetailsComponent,canActivate: [AuthGuard]}, 
  { path: 'all-albums/:genre', component: AllAlbumsComponent ,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }