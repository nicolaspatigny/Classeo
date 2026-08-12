import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-enseignant-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './enseignant-layout.html',
  styleUrl: './enseignant-layout.css'
})
export class EnseignantLayout {

  private readonly authService = inject(AuthService);

  menuOpen = true;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
