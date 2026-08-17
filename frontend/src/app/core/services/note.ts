import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '../../models/note';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly http = inject(HttpClient);

  private readonly url = `${API_URL}/api/notes`;

  /**
   * Récupère toutes les notes.
   */
  getNotes(): Observable<Note[]> {

    return this.http.get<Note[]>(this.url);

  }

  /**
   * Récupère uniquement les notes d'un élève.
   */
  getNotesByEleveId(eleveId: number): Observable<Note[]> {

    return this.http.get<Note[]>(
      `${API_URL}/api/eleves/${eleveId}/notes`
    );

  }

}
