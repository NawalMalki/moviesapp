import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MotdepasseoublieComponent } from './motdepasseoublie/motdepasseoublie.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import {MangaDetailsComponent} from './manga-details/manga-details.component';
import { AnimeListDetailsComponent } from './anime-list-details/anime-list-details.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'motdepasseoublie', component: MotdepasseoublieComponent },
  { path: 'home', component: HomeComponent },
  {path:'manga',component: MangaListComponent},
  {path:'anime',component: AnimeListComponent},
  { path: 'manga/:id', component: MangaDetailsComponent },
  { path: 'anime/:id', component: AnimeListDetailsComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' } // Redirection vers /register par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
