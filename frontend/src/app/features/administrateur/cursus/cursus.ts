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

  private readonly cursusService = inject(CursusService);
  private readonly filiereService = inject(FiliereService);

  // Liste des cursus affichés
  cursus = signal<CursusView[]>([]);

  // Liste des filières disponibles
  filieres = signal<Filiere[]>([]);

  // Mode du formulaire
  modeFormulaire = signal<'ajout' | 'modification' | null>(null);

  // ID du cursus actuellement modifié
  cursusEnModification = signal<number | null>(null);

  // Formulaire
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


  ngOnInit(): void {
    this.loadData();
  }


  /**
   * Charge les cursus et les filières.
   */
  private loadData(): void {

    forkJoin({
      cursus: this.cursusService.getCursus(),
      filieres: this.filiereService.getFilieres()
    }).subscribe({

      next: ({ cursus, filieres }) => {

        this.filieres.set(filieres);

        const cursusViews: CursusView[] =
          cursus.map(item => {

            const filiere = filieres.find(
              filiere => filiere.id === item.filiereId
            );

            return {
              cursus: item,
              filiereNom: filiere?.nom ?? 'Inconnue'
            };
          });

        this.cursus.set(cursusViews);

        console.log('Cursus :', this.cursus());
        console.log('Filières :', this.filieres());
      },

      error: error => {

        console.error(
          'Erreur lors du chargement des cursus :',
          error
        );

      }

    });
  }


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
  modifierCursus(item: CursusView): void {

    this.modeFormulaire.set('modification');

    this.cursusEnModification.set(
      item.cursus.id
    );

    this.cursusForm.setValue({
      nom: item.cursus.nom,
      filiereId: item.cursus.filiereId
    });
  }


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


  /**
   * Ajoute ou modifie un cursus.
   */
  enregistrerCursus(): void {

    if (this.cursusForm.invalid) {

      this.cursusForm.markAllAsTouched();

      return;
    }

    const formValue = this.cursusForm.getRawValue();


    // =========================================================
    // AJOUT
    // =========================================================

    if (this.modeFormulaire() === 'ajout') {

      const ids = this.cursus().map(
        item => item.cursus.id
      );

      const nouvelId =
        ids.length > 0
          ? Math.max(...ids) + 1
          : 1;

      const nouveauCursus: Cursus = {

        id: nouvelId,

        nom: formValue.nom,

        filiereId: formValue.filiereId

      };

      const filiere = this.filieres().find(
        filiere => filiere.id === nouveauCursus.filiereId
      );

      const nouveauCursusView: CursusView = {

        cursus: nouveauCursus,

        filiereNom: filiere?.nom ?? 'Inconnue'

      };

      this.cursus.update(
        cursus => [
          ...cursus,
          nouveauCursusView
        ]
      );

      console.log(
        'Cursus ajouté :',
        nouveauCursus
      );
    }


    // =========================================================
    // MODIFICATION
    // =========================================================

    if (this.modeFormulaire() === 'modification') {

      const id = this.cursusEnModification();

      if (id === null) {
        return;
      }

      const cursusModifie: Cursus = {

        id,

        nom: formValue.nom,

        filiereId: formValue.filiereId

      };

      const filiere = this.filieres().find(
        filiere => filiere.id === cursusModifie.filiereId
      );

      const cursusViewModifie: CursusView = {

        cursus: cursusModifie,

        filiereNom: filiere?.nom ?? 'Inconnue'

      };

      this.cursus.update(
        cursus =>
          cursus.map(item =>
            item.cursus.id === id
              ? cursusViewModifie
              : item
          )
      );

      console.log(
        'Cursus modifié :',
        cursusModifie
      );
    }

    this.annulerFormulaire();
  }


  /**
   * Supprime un cursus.
   */
  supprimerCursus(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce cursus ?'
    );

    if (!confirmation) {
      return;
    }

    this.cursus.update(
      cursus =>
        cursus.filter(
          item => item.cursus.id !== id
        )
    );

    console.log(
      'Cursus supprimé :',
      id
    );
  }
}
