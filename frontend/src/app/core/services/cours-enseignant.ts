import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursEnseignant } from '../../models/cours-enseignant';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CoursEnseignantService {

  private readonly http = inject(HttpClient);

  private readonly url =
    `${API_URL}/api/cours-enseignants`;

  /**
   * Récupère toutes les associations cours / enseignant.
   */
  getCoursEnseignants(): Observable<CoursEnseignant[]> {

    return this.http.get<CoursEnseignant[]>(
      this.url
    );

  }

}
