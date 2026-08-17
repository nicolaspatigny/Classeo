import { Injectable, inject } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { NoteService } from './note';
import { CoursService } from './cours';

import { NoteCours } from '../../models/note-cours';
import {API_URL} from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class NotesEleveService {

  private readonly noteService = inject(NoteService);
  private readonly coursService = inject(CoursService);
  private readonly http = inject(HttpClient);

  getNotesEleve(eleveId: number): Observable<NoteCours[]> {

    return forkJoin({
      notes: this.noteService.getNotesByEleveId(eleveId),
      cours: this.coursService.getCours()
    }).pipe(

      map(data => {

        const result: NoteCours[] = [];

        for (const cours of data.cours) {

          const notes = data.notes.filter(
            note => note.coursId === cours.id
          );

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

  createNote(request: {
    eleveId: number;
    coursId: number;
    note: number;
  }): Observable<NoteCours> {

    return this.http.post<NoteCours>(
      `${API_URL}/api/notes`,
      request
    );

  }
}
