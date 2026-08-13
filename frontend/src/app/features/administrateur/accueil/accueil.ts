import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

import { UserService } from '../../../core/services/user';
import { FiliereService } from '../../../core/services/filiere';
import { CursusService } from '../../../core/services/cursus';
import { PromotionService } from '../../../core/services/promotion';
import { CoursService } from '../../../core/services/cours';
import { SeanceService } from '../../../core/services/seance';

@Component({
  selector: 'app-administrateur-accueil',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class AccueilAdministrateur implements OnInit {

  private readonly userService =
    inject(UserService);

  private readonly filiereService =
    inject(FiliereService);

  private readonly cursusService =
    inject(CursusService);

  private readonly promotionService =
    inject(PromotionService);

  private readonly coursService =
    inject(CoursService);

  private readonly seanceService =
    inject(SeanceService);


  // ============================================================
  // COMPTEURS
  // ============================================================

  nombreUtilisateurs = signal(0);

  nombreEleves = signal(0);

  nombreEnseignants = signal(0);

  nombreFilieres = signal(0);

  nombreCursus = signal(0);

  nombrePromotions = signal(0);

  nombreCours = signal(0);

  nombreSeances = signal(0);


  // ============================================================
  // INITIALISATION
  // ============================================================

  ngOnInit(): void {
    this.loadDashboard();
  }


  // ============================================================
  // CHARGEMENT
  // ============================================================

  private loadDashboard(): void {

    forkJoin({

      utilisateurs:
        this.userService.getUsers(),

      filieres:
        this.filiereService.getFilieres(),

      cursus:
        this.cursusService.getCursus(),

      promotions:
        this.promotionService.getPromotions(),

      cours:
        this.coursService.getCours(),

      seances:
        this.seanceService.getSeances()

    }).subscribe({

      next: data => {

        this.nombreUtilisateurs.set(
          data.utilisateurs.length
        );

        this.nombreEleves.set(
          data.utilisateurs.filter(
            user => user.role === 'ELEVE'
          ).length
        );

        this.nombreEnseignants.set(
          data.utilisateurs.filter(
            user => user.role === 'ENSEIGNANT'
          ).length
        );

        this.nombreFilieres.set(
          data.filieres.length
        );

        this.nombreCursus.set(
          data.cursus.length
        );

        this.nombrePromotions.set(
          data.promotions.length
        );

        this.nombreCours.set(
          data.cours.length
        );

        this.nombreSeances.set(
          data.seances.length
        );

      },

      error: error => {

        console.error(
          'Erreur lors du chargement du tableau de bord :',
          error
        );

      }

    });
  }

}
