import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AuthService } from '../../../../core/services/auth';
import { CoursService } from '../../../../core/services/cours';
import { CoursEnseignantService } from '../../../../core/services/cours-enseignant';
import { CoursPromotionService } from '../../../../core/services/cours-promotion';
import { PromotionService } from '../../../../core/services/promotion';
import { SeanceService } from '../../../../core/services/seance';

import { Cours } from '../../../../models/cours';
import { Promotion } from '../../../../models/promotion';

interface CoursAvecPromotions {
  cours: Cours;
  promotions: Promotion[];
}

@Component({
  selector: 'app-cours-enseignant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cours.html',
  styleUrl: './cours.css'
})
export class CoursEnseignants {

  private readonly authService =
    inject(AuthService);

  private readonly coursService =
    inject(CoursService);

  private readonly coursEnseignantService =
    inject(CoursEnseignantService);

  private readonly coursPromotionService =
    inject(CoursPromotionService);

  private readonly promotionService =
    inject(PromotionService);

  private readonly seanceService =
    inject(SeanceService);

  erreurSeance = signal('');


  // ============================================================
  // COURS
  // ============================================================

  cours =
    signal<CoursAvecPromotions[]>([]);

  promotions =
    signal<Promotion[]>([]);

  formulaireOuvert =
    signal(false);


  coursForm = new FormGroup({

    nom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    promotionId: new FormControl<number | null>(
      null,
      Validators.required
    )

  });


  // ============================================================
  // SEANCES
  // ============================================================

  formulaireSeanceOuvert =
    signal(false);

  coursSelectionneId =
    signal<number | null>(null);


  seanceForm = new FormGroup({

    date: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    heureDebut: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    heureFin: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    salle: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })

  });


  // ============================================================
  // INITIALISATION
  // ============================================================

  constructor() {

    this.chargerCours();
    this.chargerPromotions();

  }


  // ============================================================
  // PROMOTIONS
  // ============================================================

  private chargerPromotions(): void {

    this.promotionService
      .getPromotions()
      .subscribe(promotions => {

        this.promotions.set(
          promotions
        );

      });

  }


  // ============================================================
  // COURS
  // ============================================================

  private chargerCours(): void {

    const user =
      this.authService.getCurrentUser();

    if (!user) {
      return;
    }


    this.coursEnseignantService
      .getCoursEnseignants()
      .subscribe(relations => {

        const coursIds =
          relations
            .filter(
              relation =>
                relation.enseignantId === user.id
            )
            .map(
              relation =>
                relation.coursId
            );


        this.coursService
          .getCours()
          .subscribe(cours => {

            const coursEnseignant =
              cours.filter(
                cours =>
                  coursIds.includes(cours.id)
              );


            this.coursPromotionService
              .getCoursPromotions()
              .subscribe(coursPromotions => {

                this.promotionService
                  .getPromotions()
                  .subscribe(promotions => {

                    const resultat =
                      coursEnseignant.map(cours => {

                        const promotionIds =
                          coursPromotions
                            .filter(
                              relation =>
                                relation.coursId === cours.id
                            )
                            .map(
                              relation =>
                                relation.promotionId
                            );


                        return {

                          cours,

                          promotions:
                            promotions.filter(
                              promotion =>
                                promotionIds.includes(
                                  promotion.id
                                )
                            )

                        };

                      });


                    this.cours.set(
                      resultat
                    );

                  });

              });

          });

      });

  }


  // ============================================================
  // FORMULAIRE CREATION COURS
  // ============================================================

  ouvrirFormulaire(): void {

    this.coursForm.reset();

    this.formulaireOuvert.set(
      true
    );

  }


  fermerFormulaire(): void {

    this.formulaireOuvert.set(
      false
    );

  }


  creerCours(): void {

    if (this.coursForm.invalid) {

      this.coursForm.markAllAsTouched();

      return;

    }


    const nom =
      this.coursForm.controls.nom.value;

    const promotionId =
      this.coursForm.controls.promotionId.value;


    if (promotionId === null) {
      return;
    }


    const request = {

      nom,

      promotionId

    };


    this.coursService
      .createCours(request)
      .subscribe({

        next: cours => {

          console.log(
            'Cours créé :',
            cours
          );

          this.fermerFormulaire();

          this.chargerCours();

        },

        error: error => {

          console.error(
            'Erreur lors de la création du cours :',
            error
          );

        }

      });

  }


  // ============================================================
  // FORMULAIRE CREATION SEANCE
  // ============================================================

  ouvrirFormulaireSeance(
    coursId: number
  ): void {

    this.seanceForm.reset();

    this.coursSelectionneId.set(
      coursId
    );

    this.erreurSeance.set('');

    this.formulaireSeanceOuvert.set(
      true
    );

  }


  fermerFormulaireSeance(): void {

    this.formulaireSeanceOuvert.set(
      false
    );

    this.coursSelectionneId.set(
      null
    );

  }


  creerSeance(): void {

    if (this.seanceForm.invalid) {

      this.seanceForm.markAllAsTouched();

      return;

    }


    const coursId =
      this.coursSelectionneId();


    if (coursId === null) {
      return;
    }


    const date =
      this.seanceForm.controls.date.value;

    const heureDebut =
      this.seanceForm.controls.heureDebut.value;

    const heureFin =
      this.seanceForm.controls.heureFin.value;

    const salle =
      this.seanceForm.controls.salle.value;

    // Vérification de l'ordre des horaires
    if (heureFin <= heureDebut) {

      this.erreurSeance.set(
        'L’heure de fin doit être après l’heure de début.'
      );

      return;
    }

    const request = {

      coursId,

      date,

      heureDebut,

      heureFin,

      salle

    };


    this.seanceService
      .createSeance(request)
      .subscribe({

        next: seance => {

          console.log(
            'Séance créée :',
            seance
          );

          this.fermerFormulaireSeance();

        },

        error: error => {

          console.error(
            'Erreur lors de la création de la séance :',
            error
          );

        }

      });

  }

}
