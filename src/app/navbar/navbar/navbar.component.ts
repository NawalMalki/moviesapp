import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation(); // Empêche la propagation pour éviter la fermeture immédiate
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar-container')) {
      this.isMenuOpen = false; // Ferme la navbar si on clique en dehors
    }
  }
}
