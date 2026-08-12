import { Component, inject, signal } from '@angular/core';

import { CoursInscritService } from '../../../core/services/cours-inscrit';
import { CoursEleveDetail } from '../../../models/cours-eleve-detail';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-cours',
  imports: [],
  templateUrl: './cours.html',
  styleUrl: './cours.css'
})
export class Cours {

  private readonly coursInscritService = inject(
    CoursInscritService
  );

  private readonly authService = inject(
    AuthService
  );

  cours = signal<CoursEleveDetail[]>([]);

  ngOnInit(): void {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }
    if (user.promotionId === undefined) {
      console.error(
        "L\'élève ne possède aucune promotion."
      );
      return;
    }

    this.coursInscritService
      .getCoursEleve(
        user.id,
        user.promotionId
      )
      .subscribe(cours => {

        console.log('Cours reçus :', cours);

        this.cours.set(cours);

        console.log(
          'Cours après affectation :',
          this.cours()
        );
      });
  }
}
