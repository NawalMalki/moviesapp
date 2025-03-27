import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MotdepasseoublieComponent } from './motdepasseoublie/motdepasseoublie.component';

import { WallpapersGhibliComponent } from './wallpapers-ghibli/wallpapers-ghibli.component'; // I
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'wallpapers-ghibli', component: WallpapersGhibliComponent },
  { path: 'motdepasseoublie', component: MotdepasseoublieComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' } // Redirection vers /register par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
