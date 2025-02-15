import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    provideFirebaseApp(() => initializeApp({"projectId":"moviesapp-68fda","appId":"1:101108733560:web:1f8f517ece607fad063f8d","storageBucket":"moviesapp-68fda.firebasestorage.app","apiKey":"AIzaSyCWIa8Ndlb9eWYxS0O2Wr2Rvdc5whHbRvw","authDomain":"moviesapp-68fda.firebaseapp.com","messagingSenderId":"101108733560"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
