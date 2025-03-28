import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-modifier-infos-user',
  templateUrl: './modifier-infos-user.component.html',
  styleUrls: ['./modifier-infos-user.component.css']
})
export class ModifierInfosUserComponent implements OnInit {

  user: firebase.User | null = null;
  userData: any = {};  // Store user data
  password: string = '';  // Store new password for update

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.fetchUserData(user.uid);
      } else {
        this.router.navigate(['/login']); // If not authenticated, redirect to login
      }
    });
  }

  // Fetch user data from Firestore
  fetchUserData(uid: string): void {
    this.db.collection('users').doc(uid).valueChanges().subscribe(data => {
      if (data) {
        this.userData = data;
      }
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.password) {
      this.updatePassword();
    }
    this.updateUserInfo();
  }

  // Update user information in Firestore
  updateUserInfo(): void {
    const userRef = this.db.collection('users').doc(this.user?.uid);

    userRef.update({
      prenom: this.userData.prenom,
      nom: this.userData.nom,
      email: this.userData.email
    }).then(() => {
      alert('Information successfully updated!');
      this.router.navigate(['/']);  // Redirect after update
    }).catch((error) => {
      console.error("Error updating information: ", error);
      alert('An error occurred while updating information.');
    });
  }

  // Update password in Firebase Auth if it's changed
  updatePassword(): void {
    if (this.password) {
      this.user?.updatePassword(this.password)
        .then(() => {
          alert('Password successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating password:', error);
          alert('Error updating password.');
        });
    }
  }
}
