import { Component } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']); // Redirige vers la page de connexion après déconnexion
    });
  }

}


