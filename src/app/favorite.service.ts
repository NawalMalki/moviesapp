import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Define an interface for the favorite document structure
interface FavoriteSong {
  userID: string;
  albumID: string;
  song_id: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Method to get current user ID
  private async getCurrentUserId(): Promise<string | null> {
    // Vérifier l'état de connexion
this.afAuth.authState.subscribe(user => {
  if (user) {
    console.log('Utilisateur connecté:', user.uid);
  } else {
    console.log('Aucun utilisateur connecté');
  }
});
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe(user => {
        resolve(user ? user.uid : null);
      });
    });
  }

  // Add an album to user's favorites
  async addToFavorites(albumId: string): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user logged in');
      }

      const favoriteEntry: FavoriteSong = {
        userID: userId,
        albumID: albumId,
        song_id: null
      };

      await this.firestore.collection<FavoriteSong>('favorites_song').add(favoriteEntry);
      console.log('ajout')
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  // Remove an album from user's favorites
  async removeFromFavorites(albumId: string): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user logged in');
      }

      const querySnapshot = await this.firestore.collection<FavoriteSong>('favorites_song', 
        ref => ref.where('userID', '==', userId).where('albumID', '==', albumId)
      ).get().toPromise();

      if (querySnapshot) {
        querySnapshot.forEach(async (doc) => {
          await doc.ref.delete();
        });
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  // Check if an album is in user's favorites
  async isFavorite(albumId: string): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return false;
      }

      const querySnapshot = await this.firestore.collection<FavoriteSong>('favorites_song', 
        ref => ref.where('userID', '==', userId).where('albumID', '==', albumId)
      ).get().toPromise();

      return querySnapshot ? !querySnapshot.empty : false;
    } catch (error) {
      console.error('Error checking favorites:', error);
      return false;
    }
  }

  // Get all favorites for the current user
  async getUserFavorites(): Promise<(FavoriteSong & { id: string })[]> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return [];
      }

      const querySnapshot = await this.firestore.collection<FavoriteSong>('favorites_song', 
        ref => ref.where('userID', '==', userId)
      ).get().toPromise();

      return querySnapshot 
        ? querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as FavoriteSong
          }))
        : [];
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      return [];
    }
  }
}