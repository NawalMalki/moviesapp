import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  user: firebase.User | null = null;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
    });
  }
}