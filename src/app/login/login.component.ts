import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {} 

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez entrer un email et un mot de passe.';
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Connexion réussie !', userCredential);
        this.errorMessage = ''; 
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Échec de la connexion : ' + error.message;
      });
  }
}
