import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Ajouté pour les requêtes HTTP

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
import { ProfileComponent } from './profile/profile.component';
import { MangaComponent } from './manga/manga.component';
import { WallpapersGhibliComponent } from './wallpapers-ghibli/wallpapers-ghibli.component';

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
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MotdepasseoublieComponent,
    ProfileComponent,
    MangaComponent,
    WallpapersGhibliComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Contient déjà toutes les routes
    FormsModule,
    HttpClientModule, // Ajouté pour les requêtes HTTP
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }