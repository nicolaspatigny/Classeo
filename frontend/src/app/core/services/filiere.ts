import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Filiere } from '../../models/filiere';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  private readonly http = inject(HttpClient);

  private readonly filieresUrl = 'assets/mock/filieres.json';

  getFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.filieresUrl);
  }

  getFiliereById(id: number): Observable<Filiere | undefined> {
    return this.getFilieres().pipe(
      map(filieres => filieres.find(filiere => filiere.id === id))
    );
  }
}
