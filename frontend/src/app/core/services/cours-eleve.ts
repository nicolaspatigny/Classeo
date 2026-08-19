import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursEleve } from '../../models/cours-eleve';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CoursEleveService {

  private readonly http = inject(HttpClient);

  private readonly url =
    `${API_URL}/api/cours-eleves`;

  /**
   * Récupère toutes les associations cours / élève.
   */
  getCoursEleves(): Observable<CoursEleve[]> {

    return this.http.get<CoursEleve[]>(
      this.url
    );

  }

}
