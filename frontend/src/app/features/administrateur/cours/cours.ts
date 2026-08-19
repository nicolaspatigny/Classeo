import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Cours } from '../../../models/cours';
import { Promotion } from '../../../models/promotion';

import { CoursService } from '../../../core/services/cours';
import { PromotionService } from '../../../core/services/promotion';


interface CoursView {
  cours: Cours;
  promotion: Promotion | null;
}


@Component({
  selector: 'app-administrateur-cours',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cours.html',
  styleUrl: './cours.css'
})
export class CoursAdministrateur implements OnInit {

  // ============================================================
  // SERVICES
  // ============================================================

  private readonly coursService =
    inject(CoursService);

  private readonly promotionService =
    inject(PromotionService);


  // ============================================================
  // DONNÉES
  // ============================================================

  /**
   * Liste des cours affichés.
   */
  cours =
    signal<CoursView[]>([]);


  /**
   * Liste des promotions disponibles
   * dans le formulaire.
   */
  promotions =
    signal<Promotion[]>([]);


  // ============================================================
  // FORMULAIRE
  // ============================================================

  /**
   * Mode actuel du formulaire.
   */
  modeFormulaire =
    signal<'ajout' | 'modification' | null>(null);


  /**
   * ID du cours actuellement modifié.
   */
  coursEnModification =
    signal<number | null>(null);


  /**
   * Formulaire de création / modification.
   */
  coursForm = new FormGroup({

    nom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    promotionId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1)
      ]
    })

  });


  // ============================================================
  // INITIALISATION
  // ============================================================

  ngOnInit(): void {

    this.loadData();

  }


  // ============================================================
  // CHARGEMENT DES DONNÉES
  // ============================================================

  /**
   * Charge les cours et les promotions.
   */
  private loadData(): void {

    forkJoin({

      cours:
        this.coursService.getCours(),

      promotions:
        this.promotionService.getPromotions()

    }).subscribe({

      next: ({
               cours,
               promotions
             }) => {

        this.promotions.set(
          promotions
        );


        /*
         * Associe chaque cours
         * à sa promotion.
         */
        const coursViews: CoursView[] =
          cours.map(coursItem => {

            const promotion =
              promotions.find(
                promotion =>
                  promotion.id ===
                  coursItem.promotionId
              ) ?? null;


            return {

              cours: coursItem,

              promotion

            };

          });


        this.cours.set(
          coursViews
        );


        console.log(
          'Cours :',
          this.cours()
        );

        console.log(
          'Promotions :',
          this.promotions()
        );

      },

      error: error => {

        console.error(
          'Erreur lors du chargement des cours :',
          error
        );

      }

    });

  }


  // ============================================================
  // AJOUT
  // ============================================================

  /**
   * Ouvre le formulaire pour ajouter un cours.
   */
  ajouterCours(): void {

    this.modeFormulaire.set(
      'ajout'
    );

    this.coursEnModification.set(
      null
    );


    this.coursForm.reset({

      nom: '',

      promotionId: 0

    });

  }


  // ============================================================
  // MODIFICATION
  // ============================================================

  /**
   * Ouvre le formulaire pour modifier
   * un cours existant.
   */
  modifierCours(
    item: CoursView
  ): void {

    this.modeFormulaire.set(
      'modification'
    );


    this.coursEnModification.set(
      item.cours.id
    );


    this.coursForm.setValue({

      nom:
      item.cours.nom,

      promotionId:
      item.cours.promotionId

    });

  }


  // ============================================================
  // ANNULATION
  // ============================================================

  /**
   * Ferme le formulaire et réinitialise
   * ses valeurs.
   */
  annulerFormulaire(): void {

    this.modeFormulaire.set(
      null
    );

    this.coursEnModification.set(
      null
    );


    this.coursForm.reset({

      nom: '',

      promotionId: 0

    });

  }


  // ============================================================
  // ENREGISTREMENT
  // ============================================================

  /**
   * Enregistre un cours.
   *
   * POST pour un ajout.
   * PUT pour une modification.
   */
  enregistrerCours(): void {

    console.log(
      '>>> enregistrerCours() appelé'
    );


    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (
      this.coursForm.invalid
    ) {

      console.log(
        '>>> Formulaire invalide :',
        this.coursForm.getRawValue()
      );


      this.coursForm.markAllAsTouched();

      return;

    }


    const formValue =
      this.coursForm.getRawValue();


    // ==========================================================
    // POST
    // ==========================================================

    if (
      this.modeFormulaire() ===
      'ajout'
    ) {

      const request = {

        nom:
        formValue.nom,

        promotionId:
        formValue.promotionId

      };


      console.log(
        'POST /api/cours :',
        request
      );


      this.coursService
        .createCours(
          request
        )
        .subscribe({

          next: cours => {

            console.log(
              'Cours créé :',
              cours
            );


            /*
             * Recherche la promotion
             * associée au cours créé.
             */
            const promotion =
              this.promotions().find(
                promotion =>
                  promotion.id ===
                  cours.promotionId
              ) ?? null;


            const nouveauCoursView:
              CoursView = {

              cours,

              promotion

            };


            /*
             * Ajoute le cours retourné
             * par le backend à l'affichage.
             */
            this.cours.update(
              coursList => [
                ...coursList,
                nouveauCoursView
              ]
            );


            this.annulerFormulaire();

          },

          error: error => {

            console.error(
              'Erreur lors de la création du cours :',
              error
            );

          }

        });


      /*
       * Empêche de continuer
       * vers le bloc PUT.
       */
      return;

    }


    // ==========================================================
    // PUT
    // ==========================================================

    if (
      this.modeFormulaire() ===
      'modification'
    ) {

      const id =
        this.coursEnModification();


      if (
        id === null
      ) {

        return;

      }


      const request = {

        nom:
        formValue.nom,

        promotionId:
        formValue.promotionId

      };


      console.log(
        `PUT /api/cours/${id} :`,
        request
      );


      this.coursService
        .updateCours(
          id,
          request
        )
        .subscribe({

          next: cours => {

            console.log(
              'Cours modifié :',
              cours
            );


            /*
             * Recherche la nouvelle promotion
             * associée au cours.
             */
            const promotion =
              this.promotions().find(
                promotion =>
                  promotion.id ===
                  cours.promotionId
              ) ?? null;


            const coursViewModifie:
              CoursView = {

              cours,

              promotion

            };


            /*
             * Remplace uniquement
             * le cours modifié.
             */
            this.cours.update(
              coursList =>
                coursList.map(
                  item =>
                    item.cours.id === id
                      ? coursViewModifie
                      : item
                )
            );


            this.annulerFormulaire();

          },

          error: error => {

            console.error(
              'Erreur lors de la modification du cours :',
              error
            );

          }

        });

    }

  }


  // ============================================================
  // SUPPRESSION
  // ============================================================

  /**
   * Supprime un cours.
   */
  supprimerCours(
    id: number
  ): void {

    const confirmation =
      confirm(
        'Voulez-vous vraiment supprimer ce cours ?'
      );


    if (
      !confirmation
    ) {

      return;

    }


    console.log(
      `DELETE /api/cours/${id}`
    );


    this.coursService
      .deleteCours(
        id
      )
      .subscribe({

        next: () => {

          /*
           * Retire le cours de l'affichage
           * uniquement après confirmation
           * du backend.
           */
          this.cours.update(
            coursList =>
              coursList.filter(
                item =>
                  item.cours.id !== id
              )
          );


          console.log(
            'Cours supprimé :',
            id
          );

        },

        error: error => {

          console.error(
            'Erreur lors de la suppression du cours :',
            error
          );

        }

      });

  }

}
