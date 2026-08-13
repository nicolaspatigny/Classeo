import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Seance } from '../../../models/seance';
import { Cours } from '../../../models/cours';
import { Promotion } from '../../../models/promotion';

import { SeanceService } from '../../../core/services/seance';
import { CoursService } from '../../../core/services/cours';
import { CoursPromotionService } from '../../../core/services/cours-promotion';
import { PromotionService } from '../../../core/services/promotion';

interface SeanceView {
  seance: Seance;
  cours: Cours | undefined;
  promotions: Promotion[];
}

@Component({
  selector: 'app-administrateur-seances',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './seances.html',
  styleUrl: './seances.css'
})
export class SeancesAdministrateur implements OnInit {

  private readonly seanceService = inject(SeanceService);
  private readonly coursService = inject(CoursService);
  private readonly coursPromotionService =
    inject(CoursPromotionService);
  private readonly promotionService =
    inject(PromotionService);


  // ============================================================
  // DONNÉES
  // ============================================================

  seances = signal<SeanceView[]>([]);

  cours = signal<Cours[]>([]);

  promotions = signal<Promotion[]>([]);


  // ============================================================
  // FORMULAIRE
  // ============================================================

  modeFormulaire =
    signal<'ajout' | 'modification' | null>(null);

  seanceEnModification =
    signal<number | null>(null);

  seanceForm = new FormGroup({

    coursId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1)
      ]
    }),

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

  ngOnInit(): void {
    this.loadData();
  }


  // ============================================================
  // CHARGEMENT
  // ============================================================

  private loadData(): void {

    forkJoin({

      seances:
        this.seanceService.getSeances(),

      cours:
        this.coursService.getCours(),

      coursPromotions:
        this.coursPromotionService.getCoursPromotions(),

      promotions:
        this.promotionService.getPromotions()

    }).subscribe({

      next: ({
               seances,
               cours,
               coursPromotions,
               promotions
             }) => {

        this.cours.set(cours);

        this.promotions.set(promotions);


        const seancesViews: SeanceView[] =
          seances.map(seance => {

            const coursAssocie =
              cours.find(
                coursItem =>
                  coursItem.id === seance.coursId
              );


            /*
             * Récupération des promotions
             * associées au cours.
             */
            const promotionIds =
              coursPromotions
                .filter(
                  relation =>
                    relation.coursId ===
                    seance.coursId
                )
                .map(
                  relation =>
                    relation.promotionId
                );


            const promotionsAssociees =
              promotions.filter(
                promotion =>
                  promotionIds.includes(
                    promotion.id
                  )
              );


            return {

              seance,

              cours: coursAssocie,

              promotions:
              promotionsAssociees

            };

          });


        this.seances.set(seancesViews);


        console.log(
          'Séances :',
          this.seances()
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
          'Erreur lors du chargement des séances :',
          error
        );

      }

    });
  }


  // ============================================================
  // AJOUT
  // ============================================================

  ajouterSeance(): void {

    this.modeFormulaire.set('ajout');

    this.seanceEnModification.set(null);

    this.seanceForm.reset({

      coursId: 0,

      date: '',

      heureDebut: '',

      heureFin: '',

      salle: ''

    });
  }


  // ============================================================
  // MODIFICATION
  // ============================================================

  modifierSeance(item: SeanceView): void {

    this.modeFormulaire.set('modification');

    this.seanceEnModification.set(
      item.seance.id
    );


    this.seanceForm.setValue({

      coursId:
      item.seance.coursId,

      date:
      item.seance.date,

      heureDebut:
      item.seance.heureDebut,

      heureFin:
      item.seance.heureFin,

      salle:
      item.seance.salle

    });
  }


  // ============================================================
  // ANNULATION
  // ============================================================

  annulerFormulaire(): void {

    this.modeFormulaire.set(null);

    this.seanceEnModification.set(null);

    this.seanceForm.reset({

      coursId: 0,

      date: '',

      heureDebut: '',

      heureFin: '',

      salle: ''

    });
  }


  // ============================================================
  // PROMOTIONS DU COURS
  // ============================================================

  getPromotionsDuCours(
    coursId: number
  ): Promotion[] {

    const seance =
      this.seances().find(
        item =>
          item.seance.coursId === coursId
      );

    return seance?.promotions ?? [];
  }


  // ============================================================
  // ENREGISTREMENT
  // ============================================================

  enregistrerSeance(): void {

    if (this.seanceForm.invalid) {

      this.seanceForm.markAllAsTouched();

      return;
    }


    const formValue =
      this.seanceForm.getRawValue();


    // ==========================================================
    // AJOUT
    // ==========================================================

    if (
      this.modeFormulaire() ===
      'ajout'
    ) {

      const ids =
        this.seances().map(
          item =>
            item.seance.id
        );


      const nouvelId =
        ids.length > 0
          ? Math.max(...ids) + 1
          : 1;


      const nouvelleSeance: Seance = {

        id: nouvelId,

        coursId:
        formValue.coursId,

        date:
        formValue.date,

        heureDebut:
        formValue.heureDebut,

        heureFin:
        formValue.heureFin,

        salle:
        formValue.salle

      };


      const coursAssocie =
        this.cours().find(
          cours =>
            cours.id ===
            nouvelleSeance.coursId
        );


      /*
       * Les promotions sont déterminées
       * par les relations du cours.
       *
       * Pour l'instant, on récupère les
       * promotions déjà chargées depuis
       * la vue correspondante.
       */

      const seanceViewExistante =
        this.seances().find(
          item =>
            item.seance.coursId ===
            nouvelleSeance.coursId
        );


      const promotionsAssociees =
        seanceViewExistante?.promotions
        ?? [];


      const nouvelleSeanceView: SeanceView = {

        seance:
        nouvelleSeance,

        cours:
        coursAssocie,

        promotions:
        promotionsAssociees

      };


      this.seances.update(
        seances => [
          ...seances,
          nouvelleSeanceView
        ]
      );


      console.log(
        'Séance ajoutée :',
        nouvelleSeance
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
        this.seanceEnModification();


      if (id === null) {
        return;
      }


      const seanceModifiee: Seance = {

        id,

        coursId:
        formValue.coursId,

        date:
        formValue.date,

        heureDebut:
        formValue.heureDebut,

        heureFin:
        formValue.heureFin,

        salle:
        formValue.salle

      };


      const coursAssocie =
        this.cours().find(
          cours =>
            cours.id ===
            seanceModifiee.coursId
        );


      /*
       * Si le cours n'a pas changé,
       * on conserve ses promotions.
       *
       * Si le cours change, on cherche
       * une séance existante de ce cours
       * pour récupérer ses promotions.
       */

      const seanceViewExistante =
        this.seances().find(
          item =>
            item.seance.coursId ===
            seanceModifiee.coursId
        );


      const promotionsAssociees =
        seanceViewExistante?.promotions
        ?? [];


      const seanceViewModifiee: SeanceView = {

        seance:
        seanceModifiee,

        cours:
        coursAssocie,

        promotions:
        promotionsAssociees

      };


      this.seances.update(
        seances =>
          seances.map(item =>
            item.seance.id === id
              ? seanceViewModifiee
              : item
          )
      );


      console.log(
        'Séance modifiée :',
        seanceModifiee
      );
    }


    this.annulerFormulaire();
  }


  // ============================================================
  // SUPPRESSION
  // ============================================================

  supprimerSeance(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer cette séance ?'
    );


    if (!confirmation) {
      return;
    }


    this.seances.update(
      seances =>
        seances.filter(
          item =>
            item.seance.id !== id
        )
    );


    console.log(
      'Séance supprimée :',
      id
    );
  }

}
