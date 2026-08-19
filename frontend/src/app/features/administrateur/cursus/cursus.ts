import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Cursus } from '../../../models/cursus';
import { Filiere } from '../../../models/filiere';

import { CursusService } from '../../../core/services/cursus';
import { FiliereService } from '../../../core/services/filiere';

interface CursusView {
  cursus: Cursus;
  filiereNom: string;
}

@Component({
  selector: 'app-administrateur-cursus',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cursus.html',
  styleUrl: './cursus.css'
})
export class CursusAdministrateur implements OnInit {

  private readonly cursusService =
    inject(CursusService);

  private readonly filiereService =
    inject(FiliereService);


  // =========================================================
  // DONNÉES
  // =========================================================

  cursus =
    signal<CursusView[]>([]);

  filieres =
    signal<Filiere[]>([]);


  // =========================================================
  // FORMULAIRE
  // =========================================================

  modeFormulaire =
    signal<'ajout' | 'modification' | null>(null);

  cursusEnModification =
    signal<number | null>(null);


  cursusForm = new FormGroup({

    nom: new FormControl('', {
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


  // =========================================================
  // INITIALISATION
  // =========================================================

  ngOnInit(): void {

    this.loadData();

  }


  // =========================================================
  // CHARGEMENT DES DONNÉES
  // =========================================================

  /**
   * Charge les cursus et les filières.
   */
  private loadData(): void {

    forkJoin({

      cursus:
        this.cursusService.getCursus(),

      filieres:
        this.filiereService.getFilieres()

    }).subscribe({

      next: ({ cursus, filieres }) => {

        this.filieres.set(filieres);


        const cursusViews: CursusView[] =
          cursus.map(item => {

            const filiere =
              filieres.find(
                filiere =>
                  filiere.id === item.filiereId
              );

            return {

              cursus: item,

              filiereNom:
                filiere?.nom ?? 'Inconnue'

            };

          });


        this.cursus.set(cursusViews);


        console.log(
          'Cursus chargés :',
          this.cursus()
        );

      },


      error: error => {

        console.error(
          'Erreur lors du chargement des cursus :',
          error
        );

      }

    });

  }


  // =========================================================
  // OUVERTURE DU FORMULAIRE
  // =========================================================

  /**
   * Ouvre le formulaire en mode ajout.
   */
  ajouterCursus(): void {

    this.modeFormulaire.set('ajout');

    this.cursusEnModification.set(null);


    this.cursusForm.reset({

      nom: '',

      filiereId: 0

    });

  }


  /**
   * Ouvre le formulaire en mode modification.
   */
  modifierCursus(
    item: CursusView
  ): void {

    this.modeFormulaire.set(
      'modification'
    );


    this.cursusEnModification.set(
      item.cursus.id
    );


    this.cursusForm.setValue({

      nom:
      item.cursus.nom,

      filiereId:
      item.cursus.filiereId

    });

  }


  // =========================================================
  // FERMETURE DU FORMULAIRE
  // =========================================================

  /**
   * Ferme le formulaire.
   */
  annulerFormulaire(): void {

    this.modeFormulaire.set(null);

    this.cursusEnModification.set(null);


    this.cursusForm.reset({

      nom: '',

      filiereId: 0

    });

  }


  // =========================================================
  // ENREGISTREMENT
  // =========================================================

  /**
   * Crée ou modifie un cursus.
   *
   * POST /api/cursus
   *
   * PUT /api/cursus/{id}
   */
  enregistrerCursus(): void {

    if (this.cursusForm.invalid) {

      this.cursusForm.markAllAsTouched();

      return;

    }


    const formValue =
      this.cursusForm.getRawValue();


    // =======================================================
    // AJOUT
    // =======================================================

    if (
      this.modeFormulaire() === 'ajout'
    ) {

      const request = {

        nom:
        formValue.nom,

        filiereId:
        formValue.filiereId

      };


      console.log(
        'POST /api/cursus :',
        request
      );


      this.cursusService
        .createCursus(request)
        .subscribe({

          next: nouveauCursus => {

            console.log(
              'Cursus créé :',
              nouveauCursus
            );


            const filiere =
              this.filieres().find(
                filiere =>
                  filiere.id ===
                  nouveauCursus.filiereId
              );


            const nouveauCursusView:
              CursusView = {

              cursus:
              nouveauCursus,

              filiereNom:
                filiere?.nom ??
                'Inconnue'

            };


            /*
             * On ajoute le cursus retourné
             * par le backend.
             */
            this.cursus.update(
              cursus => [
                ...cursus,
                nouveauCursusView
              ]
            );


            this.annulerFormulaire();

          },


          error: error => {

            console.error(
              'Erreur lors de la création du cursus :',
              error
            );

          }

        });


      return;

    }


    // =======================================================
    // MODIFICATION
    // =======================================================

    if (
      this.modeFormulaire() ===
      'modification'
    ) {

      const id =
        this.cursusEnModification();


      if (id === null) {

        return;

      }


      const request = {

        nom:
        formValue.nom,

        filiereId:
        formValue.filiereId

      };


      console.log(
        `PUT /api/cursus/${id} :`,
        request
      );


      this.cursusService
        .updateCursus(
          id,
          request
        )
        .subscribe({

          next: cursusModifie => {

            console.log(
              'Cursus modifié :',
              cursusModifie
            );


            const filiere =
              this.filieres().find(
                filiere =>
                  filiere.id ===
                  cursusModifie.filiereId
              );


            const cursusViewModifie:
              CursusView = {

              cursus:
              cursusModifie,

              filiereNom:
                filiere?.nom ??
                'Inconnue'

            };


            /*
             * Remplace uniquement
             * le cursus modifié.
             */
            this.cursus.update(
              cursus =>
                cursus.map(item =>
                  item.cursus.id === id
                    ? cursusViewModifie
                    : item
                )
            );


            this.annulerFormulaire();

          },


          error: error => {

            console.error(
              'Erreur lors de la modification du cursus :',
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
   * Supprime un cursus.
   *
   * DELETE /api/cursus/{id}
   */
  supprimerCursus(
    id: number
  ): void {

    const confirmation =
      confirm(
        'Voulez-vous vraiment supprimer ce cursus ?'
      );


    if (!confirmation) {

      return;

    }


    console.log(
      `DELETE /api/cursus/${id}`
    );


    this.cursusService
      .deleteCursus(id)
      .subscribe({

        next: () => {

          console.log(
            'Cursus supprimé :',
            id
          );


          /*
           * On retire le cursus de l'affichage
           * uniquement après confirmation du backend.
           */
          this.cursus.update(
            cursus =>
              cursus.filter(
                item =>
                  item.cursus.id !== id
              )
          );

        },


        error: error => {

          console.error(
            'Erreur lors de la suppression du cursus :',
            error
          );

        }

      });

  }

}
