import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursEnseignant } from '../../models/cours-enseignant';

@Injectable({
  providedIn: 'root'
})
export class CoursEnseignantService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/cours-enseignant.json';

  getCoursEnseignants(): Observable<CoursEnseignant[]> {
    return this.http.get<CoursEnseignant[]>(this.url);
  }
}
