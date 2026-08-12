import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/notes.json';

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url);
  }
}
