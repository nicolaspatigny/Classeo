import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Filiere } from '../../../models/filiere';
import { FiliereService } from '../../../core/services/filiere';

@Component({
  selector: 'app-administrateur-filieres',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filieres.html',
  styleUrl: './filieres.css'
})
export class FilieresAdministrateur implements OnInit {

  private readonly filiereService =
    inject(FiliereService);


  // =========================================================
  // DONNÉES
  // =========================================================

  filieres =
    signal<Filiere[]>([]);


  // =========================================================
  // FORMULAIRE
  // =========================================================

  modeFormulaire =
    signal<'ajout' | 'modification' | null>(null);


  filiereEnModification =
    signal<number | null>(null);


  filiereForm =
    new FormGroup({

      nom: new FormControl('', {

        nonNullable: true,

        validators: [
          Validators.required
        ]

      })

    });


  // =========================================================
  // INITIALISATION
  // =========================================================

  ngOnInit(): void {

    this.loadFilieres();

  }


  // =========================================================
  // CHARGEMENT
  // =========================================================

  /**
   * Charge les filières depuis le backend.
   */
  private loadFilieres(): void {

    this.filiereService
      .getFilieres()
      .subscribe({

        next: filieres => {

          this.filieres.set(
            filieres
          );

          console.log(
            'Filières :',
            this.filieres()
          );

        },

        error: error => {

          console.error(
            'Erreur lors du chargement des filières :',
            error
          );

        }

      });

  }


  // =========================================================
  // AJOUT
  // =========================================================

  /**
   * Ouvre le formulaire en mode ajout.
   */
  ajouterFiliere(): void {

    this.modeFormulaire.set(
      'ajout'
    );

    this.filiereEnModification.set(
      null
    );

    this.filiereForm.reset({

      nom: ''

    });

  }


  // =========================================================
  // MODIFICATION
  // =========================================================

  /**
   * Ouvre le formulaire en mode modification.
   */
  modifierFiliere(
    filiere: Filiere
  ): void {

    this.modeFormulaire.set(
      'modification'
    );

    this.filiereEnModification.set(
      filiere.id
    );

    this.filiereForm.setValue({

      nom:
      filiere.nom

    });

  }


  // =========================================================
  // ANNULATION
  // =========================================================

  /**
   * Ferme le formulaire.
   */
  annulerFormulaire(): void {

    this.modeFormulaire.set(
      null
    );

    this.filiereEnModification.set(
      null
    );

    this.filiereForm.reset({

      nom: ''

    });

  }


  // =========================================================
  // ENREGISTREMENT
  // =========================================================

  /**
   * Ajoute ou modifie une filière.
   *
   * POST /api/filieres
   * PUT  /api/filieres/{id}
   */
  enregistrerFiliere(): void {

    if (
      this.filiereForm.invalid
    ) {

      this.filiereForm.markAllAsTouched();

      return;

    }


    const form =
      this.filiereForm.getRawValue();


    // =====================================================
    // AJOUT
    // =====================================================

    if (
      this.modeFormulaire() ===
      'ajout'
    ) {

      const request = {

        nom:
        form.nom

      };


      console.log(
        'POST /api/filieres :',
        request
      );


      this.filiereService
        .createFiliere(request)
        .subscribe({

          next: filiere => {

            console.log(
              'Filière créée :',
              filiere
            );


            /*
             * On ajoute la filière
             * retournée par le backend.
             */
            this.filieres.update(
              filieres => [
                ...filieres,
                filiere
              ]
            );


            this.annulerFormulaire();

          },

          error: error => {

            console.error(
              'Erreur lors de la création de la filière :',
              error
            );

          }

        });


      return;

    }


    // =====================================================
    // MODIFICATION
    // =====================================================

    if (
      this.modeFormulaire() ===
      'modification'
    ) {

      const id =
        this.filiereEnModification();


      if (id === null) {

        return;

      }


      const request = {

        nom:
        form.nom

      };


      console.log(
        `PUT /api/filieres/${id} :`,
        request
      );


      this.filiereService
        .updateFiliere(
          id,
          request
        )
        .subscribe({

          next: filiere => {

            console.log(
              'Filière modifiée :',
              filiere
            );


            /*
             * Remplace la filière
             * uniquement après confirmation
             * du backend.
             */
            this.filieres.update(
              filieres =>
                filieres.map(
                  item =>
                    item.id === id
                      ? filiere
                      : item
                )
            );


            this.annulerFormulaire();

          },

          error: error => {

            console.error(
              'Erreur lors de la modification de la filière :',
              error
            );

          }

        });

    }

  }


  // =========================================================
  // SUPPRESSION
  // =========================================================

  /**
   * Supprime une filière.
   */
  supprimerFiliere(
    id: number
  ): void {

    const confirmation =
      confirm(
        'Voulez-vous vraiment supprimer cette filière ?'
      );


    if (!confirmation) {

      return;

    }


    console.log(
      `DELETE /api/filieres/${id}`
    );


    this.filiereService
      .deleteFiliere(id)
      .subscribe({

        next: () => {

          console.log(
            'Filière supprimée :',
            id
          );


          /*
           * On retire la filière de l'affichage
           * uniquement après confirmation
           * du backend.
           */
          this.filieres.update(
            filieres =>
              filieres.filter(
                filiere =>
                  filiere.id !== id
              )
          );

        },

        error: error => {

          console.error(
            'Erreur lors de la suppression de la filière :',
            error
          );

        }

      });

  }

}
