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
 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'motdepasseoublie', component: MotdepasseoublieComponent },
  { path: 'home', component: HomeComponent },
  {path:'anime', component:AnimeComponent},
  { path: 'film/:id', component: FilmDetailsComponent },
  { path: 'favoris', component: FavorisComponent },
  {path:'song' , component:SongComponent},
  { path: 'all-albums/:genre', component: AllAlbumsComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {path :'movies' , component:MoviesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }