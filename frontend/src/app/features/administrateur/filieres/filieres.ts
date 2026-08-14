import { Component, inject, OnInit, signal } from '@angular/core';
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

  private readonly filiereService = inject(FiliereService);

  // Liste des filières
  filieres = signal<Filiere[]>([]);

  // Mode du formulaire
  modeFormulaire = signal<'ajout' | 'modification' | null>(null);

  // ID de la filière actuellement modifiée
  filiereEnModification = signal<number | null>(null);

  // Formulaire
  filiereForm = new FormGroup({
    nom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });


  ngOnInit(): void {
    this.loadFilieres();
  }


  /**
   * Charge les filières.
   */
  private loadFilieres(): void {

    this.filiereService.getFilieres().subscribe({

      next: filieres => {

        this.filieres.set(filieres);

        console.log('Filières :', this.filieres());
      },

      error: error => {
        console.error(
          'Erreur lors du chargement des filières :',
          error
        );
      }

    });
  }


  /**
   * Ouvre le formulaire en mode ajout.
   */
  ajouterFiliere(): void {

    this.modeFormulaire.set('ajout');
    this.filiereEnModification.set(null);

    this.filiereForm.reset({
      nom: ''
    });
  }


  /**
   * Ouvre le formulaire en mode modification.
   */
  modifierFiliere(filiere: Filiere): void {

    this.modeFormulaire.set('modification');
    this.filiereEnModification.set(filiere.id);

    this.filiereForm.setValue({
      nom: filiere.nom
    });
  }


  /**
   * Ferme le formulaire.
   */
  annulerFormulaire(): void {

    this.modeFormulaire.set(null);
    this.filiereEnModification.set(null);

    this.filiereForm.reset({
      nom: ''
    });
  }


  /**
   * Ajoute ou modifie une filière.
   */
  enregistrerFiliere(): void {

    if (this.filiereForm.invalid) {

      this.filiereForm.markAllAsTouched();

      return;
    }

    const formValue = this.filiereForm.getRawValue();


    // ─────────────────────────────────────
    // AJOUT
    // ─────────────────────────────────────

    if (this.modeFormulaire() === 'ajout') {

      const ids = this.filieres().map(
        filiere => filiere.id
      );

      const nouvelId =
        ids.length > 0
          ? Math.max(...ids) + 1
          : 1;

      const nouvelleFiliere: Filiere = {
        id: nouvelId,
        nom: formValue.nom
      };

      this.filieres.update(
        filieres => [
          ...filieres,
          nouvelleFiliere
        ]
      );

      console.log(
        'Filière ajoutée :',
        nouvelleFiliere
      );
    }


    // ─────────────────────────────────────
    // MODIFICATION
    // ─────────────────────────────────────

    if (this.modeFormulaire() === 'modification') {

      const id = this.filiereEnModification();

      if (id === null) {
        return;
      }

      const filiereModifiee: Filiere = {
        id,
        nom: formValue.nom
      };

      this.filieres.update(
        filieres =>
          filieres.map(filiere =>
            filiere.id === id
              ? filiereModifiee
              : filiere
          )
      );

      console.log(
        'Filière modifiée :',
        filiereModifiee
      );
    }

    this.annulerFormulaire();
  }


  /**
   * Supprime une filière.
   */
  supprimerFiliere(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer cette filière ?'
    );

    if (!confirmation) {
      return;
    }

    this.filieres.update(
      filieres =>
        filieres.filter(
          filiere => filiere.id !== id
        )
    );

    console.log(
      'Filière supprimée :',
      id
    );
  }
}
