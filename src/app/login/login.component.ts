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
      this.errorMessage = 'Please enter an email and a password.';
      return;
    }

    this.auth.signInWithEmailAndPassword(this.email, this.password)
  .then((userCredential) => {
    console.log('Login successful!', userCredential);
    this.errorMessage = ''; 

    // ✅ Ici, c'est parfait :
    this.router.navigate(['/home']);
  })
  }

  forgotPassword() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email to reset your password.';
      return;
    }

    this.auth.sendPasswordResetEmail(this.email)
      .then(() => {
        alert('A password reset email has been sent to ' + this.email);
      })
      .catch((error) => {
        console.error('Password reset error:', error);
        this.errorMessage = 'An error occurred while sending the reset email. Please try again.';
      });
  }
}
