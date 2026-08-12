import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Cursus } from '../../models/cursus';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  private readonly http = inject(HttpClient);

  private readonly cursusUrl = 'assets/mock/cursus.json';

  getCursus(): Observable<Cursus[]> {
    return this.http.get<Cursus[]>(this.cursusUrl);
  }

  getCursusById(id: number): Observable<Cursus | undefined> {
    return this.getCursus().pipe(
      map(cursus => cursus.find(item => item.id === id))
    );
  }
}
