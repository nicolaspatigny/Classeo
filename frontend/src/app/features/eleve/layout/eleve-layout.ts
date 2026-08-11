import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eleve-layout',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './eleve-layout.html',
  styleUrl: './eleve-layout.css'
})
export class EleveLayout {

  menuOpen = true;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
