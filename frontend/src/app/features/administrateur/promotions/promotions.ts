import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Promotion } from '../../../models/promotion';
import { Filiere } from '../../../models/filiere';

import { PromotionService } from '../../../core/services/promotion';
import { FiliereService } from '../../../core/services/filiere';

interface PromotionView {
  promotion: Promotion;
  filiereNom: string;
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

  private readonly promotionService = inject(PromotionService);
  private readonly filiereService = inject(FiliereService);

  // Données affichées
  promotions = signal<PromotionView[]>([]);

  // Filières disponibles dans le formulaire
  filieres = signal<Filiere[]>([]);

  // Mode du formulaire
  modeFormulaire = signal<'ajout' | 'modification' | null>(null);

  // ID de la promotion actuellement modifiée
  promotionEnModification = signal<number | null>(null);

  // Formulaire
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

    filiereId: new FormControl<number>(0, {
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
   * Charge les promotions et les filières.
   */
  private loadData(): void {

    forkJoin({
      promotions: this.promotionService.getPromotions(),
      filieres: this.filiereService.getFilieres()
    }).subscribe({

      next: ({ promotions, filieres }) => {

        this.filieres.set(filieres);

        const promotionViews: PromotionView[] =
          promotions.map(promotion => {

            const filiere = filieres.find(
              filiere => filiere.id === promotion.filiereId
            );

            return {
              promotion,
              filiereNom: filiere?.nom ?? 'Inconnue'
            };
          });

        this.promotions.set(promotionViews);

        console.log('Promotions :', this.promotions());
        console.log('Filières :', this.filieres());
      },

      error: error => {
        console.error(
          'Erreur lors du chargement des données :',
          error
        );
      }
    });
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
      filiereId: 0
    });
  }


  /**
   * Ouvre le formulaire en mode modification.
   */
  modifierPromotion(item: PromotionView): void {

    this.modeFormulaire.set('modification');
    this.promotionEnModification.set(item.promotion.id);

    this.promotionForm.setValue({
      nom: item.promotion.nom,
      dateDebut: item.promotion.dateDebut,
      dateFin: item.promotion.dateFin,
      filiereId: item.promotion.filiereId
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
      filiereId: 0
    });
  }


  /**
   * Enregistre une nouvelle promotion
   * ou les modifications d'une promotion existante.
   */
  enregistrerPromotion(): void {

    if (this.promotionForm.invalid) {

      this.promotionForm.markAllAsTouched();

      return;
    }

    const formValue = this.promotionForm.getRawValue();

    // ─────────────────────────────────────
    // AJOUT
    // ─────────────────────────────────────

    if (this.modeFormulaire() === 'ajout') {

      const nouveauxIds = this.promotions().map(
        item => item.promotion.id
      );

      const nouvelId =
        nouveauxIds.length > 0
          ? Math.max(...nouveauxIds) + 1
          : 1;

      const nouvellePromotion: Promotion = {
        id: nouvelId,
        nom: formValue.nom,
        dateDebut: formValue.dateDebut,
        dateFin: formValue.dateFin,
        filiereId: formValue.filiereId
      };

      const filiere = this.filieres().find(
        filiere => filiere.id === nouvellePromotion.filiereId
      );

      const nouvellePromotionView: PromotionView = {
        promotion: nouvellePromotion,
        filiereNom: filiere?.nom ?? 'Inconnue'
      };

      this.promotions.update(
        promotions => [
          ...promotions,
          nouvellePromotionView
        ]
      );

      console.log(
        'Promotion ajoutée :',
        nouvellePromotion
      );
    }


    // ─────────────────────────────────────
    // MODIFICATION
    // ─────────────────────────────────────

    if (this.modeFormulaire() === 'modification') {

      const id = this.promotionEnModification();

      if (id === null) {
        return;
      }

      const promotionModifiee: Promotion = {
        id,
        nom: formValue.nom,
        dateDebut: formValue.dateDebut,
        dateFin: formValue.dateFin,
        filiereId: formValue.filiereId
      };

      const filiere = this.filieres().find(
        filiere => filiere.id === promotionModifiee.filiereId
      );

      const promotionViewModifiee: PromotionView = {
        promotion: promotionModifiee,
        filiereNom: filiere?.nom ?? 'Inconnue'
      };

      this.promotions.update(
        promotions =>
          promotions.map(item =>
            item.promotion.id === id
              ? promotionViewModifiee
              : item
          )
      );

      console.log(
        'Promotion modifiée :',
        promotionModifiee
      );
    }

    this.annulerFormulaire();
  }


  /**
   * Supprime une promotion.
   */
  supprimerPromotion(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer cette promotion ?'
    );

    if (!confirmation) {
      return;
    }

    this.promotions.update(
      promotions =>
        promotions.filter(
          item => item.promotion.id !== id
        )
    );

    console.log(
      'Promotion supprimée :',
      id
    );
  }
}
