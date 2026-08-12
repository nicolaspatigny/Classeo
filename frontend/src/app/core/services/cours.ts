import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cours } from '../../models/cours';
import {API_URL} from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/cours.json';

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.url);
  }

  createCours(request: {
    nom: string;
    promotionId: number;
  }): Observable<Cours> {

    return this.http.post<Cours>(
      `${API_URL}/api/cours`,
      request
    );

  }

}
