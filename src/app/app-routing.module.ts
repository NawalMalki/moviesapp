import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MotdepasseoublieComponent } from './motdepasseoublie/motdepasseoublie.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import {MangaDetailsComponent} from './manga-details/manga-details.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'motdepasseoublie', component: MotdepasseoublieComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manga/:id', component: MangaDetailsComponent },
  { path: 'anime/:id', component: AnimeDetailsComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' } // Redirection vers /register par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
