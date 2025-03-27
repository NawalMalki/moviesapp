import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AngularFireAuth, private router: Router) {} 

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez entrer un email et un mot de passe.';
      return;
    }

    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('Connexion réussie !', userCredential);
        this.errorMessage = ''; 
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Erreur de connexion :', error);
        this.errorMessage = 'Échec de la connexion ' ;
      });
  }

  forgotPassword() {
    this.auth.sendPasswordResetEmail(this.email)
      .then(() => {
        alert('Un e-mail de réinitialisation du mot de passe a été envoyé à ' + this.email);
      })
      .catch((error) => {
        this.errorMessage = 'Veuillez entrer un email et un mot de passe.';
      });
  }
}