import { Component, inject, signal } from '@angular/core';

import { NotesEleveService } from '../../../core/services/note-eleve';
import { NoteCours } from '../../../models/note-cours';
import { AuthService } from '../../../core/services/auth';

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

  private readonly authService = inject(
    AuthService
  );

  notesCours = signal<NoteCours[]>([]);

  ngOnInit(): void {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.notesEleveService
      .getNotesEleve(user.id)
      .subscribe(notesCours => {


        this.notesCours.set(notesCours);

      });
  }
}
