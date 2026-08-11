import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Portal = 'ELEVE' | 'ENSEIGNANT' | 'ADMIN';

interface PortalTheme {
  name: string;
  primary: string;
  dark: string;
  logo: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  selectedPortal: Portal = 'ELEVE';

  themes: Record<Portal, PortalTheme> = {
    ELEVE: {
      name: 'Élève',
      primary: '#06B6D4',
      dark: '#1E3A8A',
      logo: 'assets/images/classeo-portail-eleve.png'
    },

    ENSEIGNANT: {
      name: 'Enseignant',
      primary: '#E11D48',
      dark: '#881337',
      logo: 'assets/images/classeo-portail-enseignant.png'
    },

    ADMIN: {
      name: 'Administrateur',
      primary: '#334155',
      dark: '#0F172A',
      logo: 'assets/images/classeo-portail-administrateur.png'
    }
  };

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  selectPortal(portal: Portal): void {
    this.selectedPortal = portal;
  }

  get currentTheme(): PortalTheme {
    return this.themes[this.selectedPortal];
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.value);
    console.log('Portail :', this.selectedPortal);
  }
}
