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
import { CoursPromotion } from '../../../models/cours-promotion';

import { CoursService } from '../../../core/services/cours';
import { PromotionService } from '../../../core/services/promotion';
import { CoursPromotionService } from '../../../core/services/cours-promotion';

interface CoursView {
  cours: Cours;
  promotions: Promotion[];
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

  private readonly coursService = inject(CoursService);
  private readonly promotionService = inject(PromotionService);
  private readonly coursPromotionService =
    inject(CoursPromotionService);

  // ============================================================
  // DONNÉES
  // ============================================================

  cours = signal<CoursView[]>([]);

  promotions = signal<Promotion[]>([]);

  // ============================================================
  // FORMULAIRE
  // ============================================================

  modeFormulaire =
    signal<'ajout' | 'modification' | null>(null);

  coursEnModification =
    signal<number | null>(null);

  coursForm = new FormGroup({

    nom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    promotionsIds: new FormControl<number[]>([], {
      nonNullable: true
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

  private loadData(): void {

    forkJoin({
      cours: this.coursService.getCours(),
      promotions: this.promotionService.getPromotions(),
      coursPromotions:
        this.coursPromotionService.getCoursPromotions()

    }).subscribe({

      next: ({
               cours,
               promotions,
               coursPromotions
             }) => {

        this.promotions.set(promotions);

        const coursViews: CoursView[] =
          cours.map(coursItem => {

            const relations =
              coursPromotions.filter(
                relation =>
                  relation.coursId === coursItem.id
              );

            const promotionsAssociees =
              relations
                .map(
                  relation =>
                    promotions.find(
                      promotion =>
                        promotion.id ===
                        relation.promotionId
                    )
                )
                .filter(
                  promotion =>
                    promotion !== undefined
                ) as Promotion[];

            return {
              cours: coursItem,
              promotions: promotionsAssociees
            };
          });

        this.cours.set(coursViews);

        console.log(
          'Cours :',
          this.cours()
        );

        console.log(
          'Promotions :',
          this.promotions()
        );

        console.log(
          'Cours / Promotions :',
          coursPromotions
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

  ajouterCours(): void {

    this.modeFormulaire.set('ajout');

    this.coursEnModification.set(null);

    this.coursForm.reset({
      nom: '',
      promotionsIds: []
    });
  }


  // ============================================================
  // MODIFICATION
  // ============================================================

  modifierCours(item: CoursView): void {

    this.modeFormulaire.set('modification');

    this.coursEnModification.set(
      item.cours.id
    );

    this.coursForm.setValue({
      nom: item.cours.nom,

      promotionsIds:
        item.promotions.map(
          promotion => promotion.id
        )
    });
  }


  // ============================================================
  // ANNULATION
  // ============================================================

  annulerFormulaire(): void {

    this.modeFormulaire.set(null);

    this.coursEnModification.set(null);

    this.coursForm.reset({
      nom: '',
      promotionsIds: []
    });
  }


  // ============================================================
  // GESTION DES PROMOTIONS
  // ============================================================

  togglePromotion(
    promotionId: number,
    event: Event
  ): void {

    const checkbox =
      event.target as HTMLInputElement;

    const promotionsActuelles =
      this.coursForm.controls.promotionsIds.value;

    if (checkbox.checked) {

      if (
        !promotionsActuelles.includes(
          promotionId
        )
      ) {

        this.coursForm.controls.promotionsIds.setValue([
          ...promotionsActuelles,
          promotionId
        ]);
      }

    } else {

      this.coursForm.controls.promotionsIds.setValue(
        promotionsActuelles.filter(
          id => id !== promotionId
        )
      );
    }
  }


  // ============================================================
  // VÉRIFICATION PROMOTION
  // ============================================================

  promotionSelectionnee(
    promotionId: number
  ): boolean {

    return this.coursForm.controls.promotionsIds.value
      .includes(promotionId);
  }


  // ============================================================
  // ENREGISTREMENT
  // ============================================================

  enregistrerCours(): void {

    if (this.coursForm.invalid) {

      this.coursForm.markAllAsTouched();

      return;
    }

    const formValue =
      this.coursForm.getRawValue();


    // ==========================================================
    // AJOUT
    // ==========================================================

    if (this.modeFormulaire() === 'ajout') {

      const ids = this.cours().map(
        item => item.cours.id
      );

      const nouvelId =
        ids.length > 0
          ? Math.max(...ids) + 1
          : 1;

      const nouveauCours: Cours = {

        id: nouvelId,

        nom: formValue.nom

      };

      const promotionsAssociees =
        this.promotions().filter(
          promotion =>
            formValue.promotionsIds.includes(
              promotion.id
            )
        );

      const nouveauCoursView: CoursView = {

        cours: nouveauCours,

        promotions: promotionsAssociees

      };

      this.cours.update(
        cours => [
          ...cours,
          nouveauCoursView
        ]
      );

      console.log(
        'Cours ajouté :',
        nouveauCours
      );

      console.log(
        'Promotions associées :',
        promotionsAssociees
      );
    }


    // ==========================================================
    // MODIFICATION
    // ==========================================================

    if (
      this.modeFormulaire() ===
      'modification'
    ) {

      const id =
        this.coursEnModification();

      if (id === null) {
        return;
      }

      const coursModifie: Cours = {

        id,

        nom: formValue.nom

      };

      const promotionsAssociees =
        this.promotions().filter(
          promotion =>
            formValue.promotionsIds.includes(
              promotion.id
            )
        );

      const coursViewModifie: CoursView = {

        cours: coursModifie,

        promotions: promotionsAssociees

      };

      this.cours.update(
        cours =>
          cours.map(item =>
            item.cours.id === id
              ? coursViewModifie
              : item
          )
      );

      console.log(
        'Cours modifié :',
        coursModifie
      );

      console.log(
        'Nouvelles promotions associées :',
        promotionsAssociees
      );
    }

    this.annulerFormulaire();
  }


  // ============================================================
  // SUPPRESSION
  // ============================================================

  supprimerCours(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce cours ?'
    );

    if (!confirmation) {
      return;
    }

    this.cours.update(
      cours =>
        cours.filter(
          item => item.cours.id !== id
        )
    );

    console.log(
      'Cours supprimé :',
      id
    );
  }

}
