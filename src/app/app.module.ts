import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"moviesapp-68fda","appId":"1:101108733560:web:1f8f517ece607fad063f8d","storageBucket":"moviesapp-68fda.firebasestorage.app","apiKey":"AIzaSyCWIa8Ndlb9eWYxS0O2Wr2Rvdc5whHbRvw","authDomain":"moviesapp-68fda.firebaseapp.com","messagingSenderId":"101108733560"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
