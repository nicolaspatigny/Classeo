import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Promotion } from '../../../models/promotion';
import { Cursus } from '../../../models/cursus';

import { PromotionService } from '../../../core/services/promotion';
import { CursusService } from '../../../core/services/cursus';

interface PromotionView {
  promotion: Promotion;
  cursusNom: string;
}

@Component({
  selector: 'app-administrateur-promotions',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css'
})
export class PromotionsAdministrateur implements OnInit {

  private readonly promotionService =
    inject(PromotionService);

  private readonly cursusService =
    inject(CursusService);


  promotions =
    signal<PromotionView[]>([]);

  cursus =
    signal<Cursus[]>([]);


  modeFormulaire =
    signal<'ajout' | 'modification' | null>(null);

  promotionEnModification =
    signal<number | null>(null);


  promotionForm = new FormGroup({

    nom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    dateDebut: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    dateFin: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    cursusId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1)
      ]
    })

  });


  ngOnInit(): void {

    this.loadData();

  }


  /**
   * Charge les promotions et les cursus.
   */
  private loadData(): void {

    forkJoin({

      promotions:
        this.promotionService.getPromotions(),

      cursus:
        this.cursusService.getCursus()

    }).subscribe({

      next: ({ promotions, cursus }) => {

        this.cursus.set(cursus);

        const promotionViews =
          promotions.map(promotion => {

            const cursusItem =
              cursus.find(
                cursus =>
                  cursus.id === promotion.cursusId
              );

            return {

              promotion,

              cursusNom:
                cursusItem?.nom ?? 'Inconnu'

            };

          });

        this.promotions.set(
          promotionViews
        );

      },

      error: error => {

        console.error(
          'Erreur lors du chargement des promotions :',
          error
        );

      }

    });

  }


  /**
   * Retourne le nom d'un cursus.
   */
  getCursusNom(
    cursusId?: number
  ): string {

    if (cursusId === undefined) {

      return '—';

    }

    const cursusItem =
      this.cursus().find(
        cursus =>
          cursus.id === cursusId
      );

    return cursusItem?.nom ?? '—';

  }


  /**
   * Ouvre le formulaire en mode ajout.
   */
  ajouterPromotion(): void {

    this.modeFormulaire.set('ajout');

    this.promotionEnModification.set(null);

    this.promotionForm.reset({

      nom: '',

      dateDebut: '',

      dateFin: '',

      cursusId: 0

    });

  }


  /**
   * Ouvre le formulaire en mode modification.
   */
  modifierPromotion(
    item: PromotionView
  ): void {

    this.modeFormulaire.set(
      'modification'
    );

    this.promotionEnModification.set(
      item.promotion.id
    );

    this.promotionForm.setValue({

      nom:
      item.promotion.nom,

      dateDebut:
      item.promotion.dateDebut,

      dateFin:
      item.promotion.dateFin,

      cursusId:
      item.promotion.cursusId

    });

  }


  /**
   * Ferme le formulaire.
   */
  annulerFormulaire(): void {

    this.modeFormulaire.set(null);

    this.promotionEnModification.set(null);

    this.promotionForm.reset({

      nom: '',

      dateDebut: '',

      dateFin: '',

      cursusId: 0

    });

  }


  /**
   * Enregistre une promotion.
   *
   * POST ou PUT selon le mode.
   */
  enregistrerPromotion(): void {

    if (this.promotionForm.invalid) {

      this.promotionForm.markAllAsTouched();

      return;

    }

    const form =
      this.promotionForm.getRawValue();


    /*
     * ============================
     * AJOUT
     * ============================
     */

    if (
      this.modeFormulaire() === 'ajout'
    ) {

      const request = {

        nom: form.nom,

        cursusId:
        form.cursusId,

        dateDebut:
        form.dateDebut,

        dateFin:
        form.dateFin

      };


      console.log(
        'POST /api/promotions :',
        request
      );


      this.promotionService
        .createPromotion(request)
        .subscribe({

          next: promotion => {

            console.log(
              'Promotion créée :',
              promotion
            );


            const cursusItem =
              this.cursus().find(
                cursus =>
                  cursus.id ===
                  promotion.cursusId
              );


            const promotionView: PromotionView = {

              promotion,

              cursusNom:
                cursusItem?.nom ??
                'Inconnu'

            };


            /*
             * On ajoute la promotion
             * retournée par le backend.
             */
            this.promotions.update(
              promotions => [
                ...promotions,
                promotionView
              ]
            );


            this.annulerFormulaire();

          },

          error: error => {

            console.error(
              'Erreur lors de la création :',
              error
            );

          }

        });

      return;

    }


    /*
     * ============================
     * MODIFICATION
     * ============================
     */

    if (
      this.modeFormulaire() ===
      'modification'
    ) {

      const id =
        this.promotionEnModification();


      if (id === null) {

        return;

      }


      const request = {

        nom:
        form.nom,

        cursusId:
        form.cursusId,

        dateDebut:
        form.dateDebut,

        dateFin:
        form.dateFin

      };


      console.log(
        `PUT /api/promotions/${id} :`,
        request
      );


      this.promotionService
        .updatePromotion(
          id,
          request
        )
        .subscribe({

          next: promotion => {

            console.log(
              'Promotion modifiée :',
              promotion
            );


            const cursusItem =
              this.cursus().find(
                cursus =>
                  cursus.id ===
                  promotion.cursusId
              );


            const promotionView:
              PromotionView = {

              promotion,

              cursusNom:
                cursusItem?.nom ??
                'Inconnu'

            };


            /*
             * On remplace uniquement
             * la promotion modifiée.
             */
            this.promotions.update(
              promotions =>
                promotions.map(
                  item =>
                    item.promotion.id === id
                      ? promotionView
                      : item
                )
            );


            this.annulerFormulaire();

          },

          error: error => {

            console.error(
              'Erreur lors de la modification :',
              error
            );

          }

        });

    }

  }


  /**
   * Supprime une promotion.
   */
  supprimerPromotion(
    id: number
  ): void {

    const confirmation =
      confirm(
        'Voulez-vous vraiment supprimer cette promotion ?'
      );


    if (!confirmation) {

      return;

    }


    console.log(
      `DELETE /api/promotions/${id}`
    );


    this.promotionService
      .deletePromotion(id)
      .subscribe({

        next: () => {

          console.log(
            'Promotion supprimée :',
            id
          );


          /*
           * On retire la promotion
           * de l'affichage uniquement
           * après confirmation du backend.
           */
          this.promotions.update(
            promotions =>
              promotions.filter(
                item =>
                  item.promotion.id !== id
              )
          );

        },

        error: error => {

          console.error(
            'Erreur lors de la suppression :',
            error
          );

        }

      });

  }

}
