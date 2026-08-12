import { Injectable, inject } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { NoteService } from './note';
import { CoursService } from './cours';

import { NoteCours } from '../../models/note-cours';

@Injectable({
  providedIn: 'root'
})
export class NotesEleveService {

  private readonly noteService = inject(NoteService);
  private readonly coursService = inject(CoursService);

  getNotesEleve(eleveId: number): Observable<NoteCours[]> {

    return forkJoin({
      notes: this.noteService.getNotes(),
      cours: this.coursService.getCours()
    }).pipe(

      map(data => {


        // On récupère uniquement les notes de cet élève
        const notesEleve = data.notes.filter(
          note => note.eleveId === eleveId
        );

        const result: NoteCours[] = [];

        // Pour chaque cours
        for (const cours of data.cours) {

          // On cherche les notes de cet élève pour ce cours
          const notes = notesEleve.filter(
            note => note.coursId === cours.id
          );

          // Aucun note pour ce cours
          if (notes.length === 0) {
            continue;
          }

          result.push({
            cours,
            notes
          });
        }

        return result;
      })
    );
  }
}
