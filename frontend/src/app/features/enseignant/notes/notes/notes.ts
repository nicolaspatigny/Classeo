import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { EleveService } from '../../../../core/services/eleve';
import { CoursService } from '../../../../core/services/cours';
import { CoursEnseignantService } from '../../../../core/services/cours-enseignant';
import { CoursPromotionService } from '../../../../core/services/cours-promotion';
import { AuthService } from '../../../../core/services/auth';

import { Cours } from '../../../../models/cours';
import { User } from '../../../../models/user';
import {NotesEleveService} from '../../../../core/services/note-eleve';

@Component({
  selector: 'app-notes-enseignant',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class NotesEnseignant {

  private readonly authService =
    inject(AuthService);

  private readonly coursService =
    inject(CoursService);

  private readonly coursEnseignantService =
    inject(CoursEnseignantService);

  private readonly coursPromotionService =
    inject(CoursPromotionService);

  private readonly eleveService =
    inject(EleveService);

  private readonly notesEleveService =
    inject(NotesEleveService);


  // ============================================================
  // DONNEES
  // ============================================================

  cours =
    signal<Cours[]>([]);

  eleves =
    signal<User[]>([]);


  // ============================================================
  // FORMULAIRE
  // ============================================================

  noteForm = new FormGroup({

    eleveId:
      new FormControl<number | null>(
        null,
        Validators.required
      ),

    coursId:
      new FormControl<number | null>(
        null,
        Validators.required
      ),

    note:
      new FormControl<number | null>(
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(20)
        ]
      )

  });


  constructor() {

    this.chargerCours();

  }


  // ============================================================
  // COURS DE L'ENSEIGNANT
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


            this.cours.set(
              coursEnseignant
            );

          });

      });

  }


  // ============================================================
  // CHARGEMENT DES ELEVES
  // ============================================================

  chargerEleves(): void {

    const coursId =
      this.noteForm.controls.coursId.value;

    if (coursId === null) {

      this.eleves.set([]);

      return;

    }


    this.coursPromotionService
      .getCoursPromotions()
      .subscribe(relations => {

        const promotionIds =
          relations
            .filter(
              relation =>
                relation.coursId === coursId
            )
            .map(
              relation =>
                relation.promotionId
            );


        if (promotionIds.length === 0) {

          this.eleves.set([]);

          return;

        }


        this.eleveService
          .getElevesByPromotion(
            promotionIds[0]
          )
          .subscribe(eleves => {

            this.eleves.set(
              eleves
            );

          });

      });

  }


  // ============================================================
  // CREATION NOTE
  // ============================================================

  creerNote(): void {

    if (this.noteForm.invalid) {

      this.noteForm.markAllAsTouched();

      return;

    }


    const eleveId =
      this.noteForm.controls.eleveId.value;

    const coursId =
      this.noteForm.controls.coursId.value;

    const note =
      this.noteForm.controls.note.value;


    if (
      eleveId === null ||
      coursId === null ||
      note === null
    ) {

      return;

    }


    const request = {

      eleveId,

      coursId,

      note

    };


    this.notesEleveService
      .createNote(request)
      .subscribe({

        next: note => {

          console.log(
            'Note créée :',
            note
          );

          this.noteForm.reset();

        },

        error: error => {

          console.error(
            'Erreur lors de la création de la note :',
            error
          );

        }

      });

    /*
    this.notesEleveService
      .createNote(request)
      .subscribe(...);
    */

  }


  // ============================================================
  // RESET ELEVE LORSQUE LE COURS CHANGE
  // ============================================================

  changementCours(): void {

    this.noteForm.controls.eleveId.setValue(
      null
    );

    this.chargerEleves();

  }

}
