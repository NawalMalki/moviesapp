import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//ce que j ajoute 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimeComponent } from './anime/anime.component';
import { FilmDetailsComponent } from './anime-details/film-details/film-details.component';


// Firebase - Compat API
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MotdepasseoublieComponent } from './motdepasseoublie/motdepasseoublie.component';
import { FavorisComponent } from './favoris/favoris/favoris.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AllAlbumsComponent } from './all-albums/all-albums.component';
import { SongComponent } from './song/song.component';
import { MoviesComponent } from './movies/movies.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeListDetailsComponent } from './anime-list-details/anime-list-details.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';




// Define routes directly in this file
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  //chaima
  { path: 'anime', component:AnimeComponent },
  { path: 'film/:id', component: FilmDetailsComponent },

];

// Firebase config
const firebaseConfig = {
  projectId: "moviesapp-68fda",
  appId: "1:101108733560:web:1f8f517ece607fad063f8d",
  storageBucket: "moviesapp-68fda.firebasestorage.app",
  apiKey: "AIzaSyCWIa8Ndlb9eWYxS0O2Wr2Rvdc5whHbRvw",
  authDomain: "moviesapp-68fda.firebaseapp.com",
  messagingSenderId: "101108733560"
};

@NgModule({
  declarations: [
    //Nawal
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MotdepasseoublieComponent,
    MoviesComponent,
    SafeUrlPipe,
    //chaima
    AnimeComponent,
    FilmDetailsComponent,
    FavorisComponent,
    NavbarComponent,
    AllAlbumsComponent,
    SongComponent,
    //Safa
    AllAlbumsComponent,
    SongComponent,
    MoviesComponent,
    SafeUrlPipe,
    AnimeListComponent,
    AnimeListDetailsComponent,
    MangaListComponent,
    MangaDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }