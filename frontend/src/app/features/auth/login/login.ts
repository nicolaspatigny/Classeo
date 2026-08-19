import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AuthService } from '../../../core/services/auth';

type Portal = 'ELEVE' | 'ENSEIGNANT' | 'ADMINISTRATEUR';

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

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  selectedPortal: Portal = 'ELEVE';

  // État de l'interface
  errorMessage = signal('');
  loading = signal(false);


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

    ADMINISTRATEUR: {
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


  /**
   * Change le portail de connexion.
   */
  selectPortal(portal: Portal): void {

    this.selectedPortal = portal;

    this.closeError();

  }


  /**
   * Thème correspondant au portail sélectionné.
   */
  get currentTheme(): PortalTheme {

    return this.themes[this.selectedPortal];

  }


  /**
   * Envoie le formulaire de connexion.
   */
  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }


    // Réinitialisation de l'état
    this.closeError();

    this.loading.set(true);


    const login =
      this.loginForm.controls.username.value;

    const password =
      this.loginForm.controls.password.value;

    const userType =
      this.getUserType();


    this.authService
      .login(
        login,
        password,
        userType
      )
      .subscribe({

        next: response => {

          this.loading.set(false);


          switch (response.user.role) {

            case 'ELEVE':

              this.router.navigate(['/eleve']);

              break;


            case 'ENSEIGNANT':

              this.router.navigate(['/enseignant']);

              break;


            case 'ADMINISTRATEUR':

              this.router.navigate(['/administrateur']);

              break;


            default:

              this.errorMessage.set(
                'Rôle utilisateur inconnu.'
              );

          }

        },


        error: error => {

          console.error(
            'Erreur de connexion :',
            error
          );


          // Très important :
          // on arrête le chargement même en cas d'erreur
          this.loading.set(false);


          this.errorMessage.set(
            'Identifiant, mot de passe ou portail incorrect.'
          );

        }

      });

  }


  /**
   * Ferme le popup d'erreur.
   */
  closeError(): void {

    this.errorMessage.set('');

  }


  /**
   * Convertit le portail sélectionné
   * en type attendu par le backend.
   */
  private getUserType():
    'ELEVE' |
    'ENSEIGNANT' |
    'ADMINISTRATEUR' {

    switch (this.selectedPortal) {

      case 'ELEVE':
        return 'ELEVE';

      case 'ENSEIGNANT':
        return 'ENSEIGNANT';

      case 'ADMINISTRATEUR':
        return 'ADMINISTRATEUR';

    }

  }

}
