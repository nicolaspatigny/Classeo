import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cours } from '../../models/cours';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private readonly http = inject(HttpClient);

  private readonly url =
    `${API_URL}/api/cours`;


  /**
   * Récupère tous les cours.
   */
  getCours(): Observable<Cours[]> {

    return this.http.get<Cours[]>(
      this.url
    );

  }


  /**
   * Récupère un cours grâce à son identifiant.
   */
  getCoursById(
    id: number
  ): Observable<Cours> {

    return this.http.get<Cours>(
      `${this.url}/${id}`
    );

  }


  /**
   * Crée un nouveau cours.
   */
  createCours(request: {
    nom: string;
    promotionId: number;
  }): Observable<Cours> {

    return this.http.post<Cours>(
      this.url,
      request
    );

  }


  /**
   * Modifie un cours existant.
   */
  updateCours(
    id: number,
    request: {
      nom: string;
      promotionId: number;
    }
  ): Observable<Cours> {

    return this.http.put<Cours>(
      `${this.url}/${id}`,
      request
    );

  }


  /**
   * Supprime un cours.
   */
  deleteCours(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.url}/${id}`
    );

  }

}
