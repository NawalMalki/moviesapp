import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmation: string = '';
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private db: AngularFirestore
  ) {}


  navigateToLogin() {
    this.router.navigate(['login']);
  }
  async register() {
    if (this.password !== this.confirmation) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;

      if (user) {
        await this.db.collection('users').doc(user.uid).set({
          nom: this.nom,
          prenom: this.prenom,
          email: this.email
        });

        console.log("Utilisateur enregistrÃ© avec succÃ¨s !");
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error);
      this.errorMessage = error.message;
    }
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log("Connexion Google rÃ©ussie");
        this.errorMessage = '';  // RÃ©initialiser le message d'erreur
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error(error.message);
      });
  }
  
}
