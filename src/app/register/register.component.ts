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
  //colonnes de la table users --------------------------
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  //-----------------------------------------------------
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

  getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'This email is already in use.',
      'auth/invalid-email': 'Invalid email address format.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/missing-password': 'Password is required.',
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password. Try again.',
      'auth/network-request-failed': 'Network error. Please check your connection.'
    };
    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  }

  async register() {
    if (this.password !== this.confirmation) {
      this.errorMessage = "Passwords do not match.";
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

        console.log("User successfully registered!");
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      this.errorMessage = this.getErrorMessage(error.code);
    }
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
      .then(async (result) => {
        if (result.user) {
          // Sauvegarde l'utilisateur dans Firestore s'il est nouveau
          const userRef = this.db.collection('users').doc(result.user.uid);
          const userSnapshot = await userRef.get().toPromise();
  
          if (!userSnapshot?.exists) {
            await userRef.set({
              nom: result.user.displayName?.split(' ')[1] || '',
              prenom: result.user.displayName?.split(' ')[0] || '',
              email: result.user.email
            });
          }
  
          console.log("Google login successful, redirecting...");
          this.router.navigate(['/home']); // Assure-toi que '/home' est défini dans ton `app-routing.module.ts`
        }
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        this.errorMessage = this.getErrorMessage(error.code);
      });
  }
}
