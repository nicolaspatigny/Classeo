import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cursus } from '../../models/cursus';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  private readonly http = inject(HttpClient);

  private readonly cursusUrl =
    `${API_URL}/api/cursus`;


  /**
   * Récupère tous les cursus.
   */
  getCursus(): Observable<Cursus[]> {

    return this.http.get<Cursus[]>(
      this.cursusUrl
    );

  }


  /**
   * Récupère un cursus grâce à son identifiant.
   */
  getCursusById(id: number): Observable<Cursus> {

    return this.http.get<Cursus>(
      `${this.cursusUrl}/${id}`
    );

  }


  /**
   * Crée un nouveau cursus.
   */
  createCursus(request: {
    nom: string;
    filiereId: number;
  }): Observable<Cursus> {

    return this.http.post<Cursus>(
      this.cursusUrl,
      request
    );

  }


  /**
   * Modifie un cursus existant.
   */
  updateCursus(
    id: number,
    request: {
      nom: string;
      filiereId: number;
    }
  ): Observable<Cursus> {

    return this.http.put<Cursus>(
      `${this.cursusUrl}/${id}`,
      request
    );

  }


  /**
   * Supprime un cursus.
   */
  deleteCursus(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.cursusUrl}/${id}`
    );

  }

}
