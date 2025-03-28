import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: firebase.User | null = null;
  userData: any = null; // Stocke les infos Firestore de l'utilisateur
  isProfileOpen = false; // Ã‰tat de la sidebar du profil

  constructor(
    private auth: AngularFireAuth, 
    private router: Router, 
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.fetchUserData(user.uid);
      }
    });
  }

  fetchUserData(uid: string) {
    this.db.collection('users').doc(uid).valueChanges().subscribe(data => {
      if (data) {
        this.userData = data;
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirige vers la page de connexion aprÃ¨s dÃ©connexion
    });
  }

  // Affichage du profil
  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
  // Naviguer vers le composant ModifierInfosUserComponent
  navigateToEditProfile() {
    this.router.navigate(['/modifier-infos']);
  }
}


