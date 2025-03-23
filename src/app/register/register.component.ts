import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Pour l'authentification Firebase
import { Router } from '@angular/router'; // Pour naviguer après l'inscription
import { GoogleAuthProvider } from 'firebase/auth';  // Ajoute cette ligne


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

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register() {
    if (this.password !== this.confirmation) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = 'Veuillez entrer un email et un mot de passe.';
    }
  }


  // Méthode de connexion avec Google
  googleLogin() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log("Connexion Google réussie");
        this.errorMessage = '';  // Réinitialiser le message d'erreur
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error(error.message);
      });
  }
}
