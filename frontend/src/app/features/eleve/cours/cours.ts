import { Component, inject, signal } from '@angular/core';

import { CoursInscritService } from '../../../core/services/cours-inscrit';
import { CoursEleveDetail } from '../../../models/cours-eleve-detail';

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

  cours = signal<CoursEleveDetail[]>([]);

  constructor() {
    this.chargerCours();
  }

  private chargerCours(): void {

    const eleveId = 1;
    const promotionId = 2;

    this.coursInscritService
      .getCoursEleve(eleveId, promotionId)
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
