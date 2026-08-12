import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../../core/services/auth';
import { CoursEnseignantService } from '../../../../core/services/cours-enseignant';
import { CoursService } from '../../../../core/services/cours';

@Component({
  selector: 'app-enseignant-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class EnseignantDashboard {

  private readonly authService = inject(AuthService);
  private readonly coursEnseignantService = inject(
    CoursEnseignantService
  );
  private readonly coursService = inject(CoursService);

  nomEnseignant = signal('');
  nombreCours = signal(0);

  constructor() {
    this.chargerDashboard();
  }

  private chargerDashboard(): void {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.nomEnseignant.set(
      `${user.prenom} ${user.nom}`
    );

    this.coursEnseignantService
      .getCoursEnseignants()
      .subscribe(relations => {

        const coursIds = relations
          .filter(
            relation => relation.enseignantId === user.id
          )
          .map(
            relation => relation.coursId
          );

        this.coursService
          .getCours()
          .subscribe(cours => {

            const coursEnseignant = cours.filter(
              cours => coursIds.includes(cours.id)
            );

            this.nombreCours.set(
              coursEnseignant.length
            );
          });
      });
  }
}
