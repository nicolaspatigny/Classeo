import { Component, inject, signal } from '@angular/core';

import { NotesEleveService } from '../../../core/services/note-eleve';
import { NoteCours } from '../../../models/note-cours';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes {

  private readonly notesEleveService = inject(
    NotesEleveService
  );

  notesCours = signal<NoteCours[]>([]);

  constructor() {
    this.chargerNotes();
  }

  private chargerNotes(): void {

    const eleveId = 1;

    this.notesEleveService
      .getNotesEleve(eleveId)
      .subscribe(notesCours => {

        console.log('Notes reçues :', notesCours);

        this.notesCours.set(notesCours);

        console.log(
          'Notes après affectation :',
          this.notesCours()
        );
      });
  }
}
