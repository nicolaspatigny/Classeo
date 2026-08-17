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

    return this.http.get<Note[]>(
      this.url
    );

  }


  /**
   * Récupère les notes d'un élève.
   */
  getNotesByEleveId(
    eleveId: number
  ): Observable<Note[]> {

    return this.http.get<Note[]>(
      `${API_URL}/api/eleves/${eleveId}/notes`
    );

  }


  /**
   * Récupère les notes d'un cours.
   */
  getNotesByCoursId(
    coursId: number
  ): Observable<Note[]> {

    return this.http.get<Note[]>(
      `${API_URL}/api/cours/${coursId}/notes`
    );

  }


  /**
   * Crée une nouvelle note.
   */
  createNote(request: {
    eleveId: number;
    coursId: number;
    note: number;
  }): Observable<Note> {

    return this.http.post<Note>(
      this.url,
      request
    );

  }


  /**
   * Modifie une note existante.
   */
  updateNote(
    id: number,
    request: {
      eleveId: number;
      coursId: number;
      note: number;
    }
  ): Observable<Note> {

    return this.http.put<Note>(
      `${this.url}/${id}`,
      request
    );

  }


  /**
   * Supprime une note.
   */
  deleteNote(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.url}/${id}`
    );

  }

}
