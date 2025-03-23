import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-motdepasseoublie',
  templateUrl: './motdepasseoublie.component.html',
  styleUrl: './motdepasseoublie.component.css'
})
export class MotdepasseoublieComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  // Envoie un email de réinitialisation
  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.message = 'Un e-mail de réinitialisation du mot de passe a été envoyé.';
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
