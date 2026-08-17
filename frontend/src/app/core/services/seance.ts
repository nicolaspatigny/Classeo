import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Seance } from '../../models/seance';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private readonly http = inject(HttpClient);

  private readonly url =
    `${API_URL}/api/seances`;


  /**
   * Récupère toutes les séances.
   */
  getSeances(): Observable<Seance[]> {

    return this.http.get<Seance[]>(
      this.url
    );

  }


  /**
   * Récupère une séance grâce à son identifiant.
   */
  getSeanceById(
    id: number
  ): Observable<Seance> {

    return this.http.get<Seance>(
      `${this.url}/${id}`
    );

  }


  /**
   * Récupère toutes les séances d'un cours.
   */
  getSeancesByCoursId(
    coursId: number
  ): Observable<Seance[]> {

    return this.http.get<Seance[]>(
      `${API_URL}/api/cours/${coursId}/seances`
    );

  }


  /**
   * Crée une nouvelle séance.
   */
  createSeance(request: {
    coursId: number;
    date: string;
    heureDebut: string;
    heureFin: string;
    salle: string;
  }): Observable<Seance> {

    return this.http.post<Seance>(
      this.url,
      request
    );

  }


  /**
   * Modifie une séance existante.
   */
  updateSeance(
    id: number,
    request: {
      coursId: number;
      date: string;
      heureDebut: string;
      heureFin: string;
      salle: string;
    }
  ): Observable<Seance> {

    return this.http.put<Seance>(
      `${this.url}/${id}`,
      request
    );

  }


  /**
   * Supprime une séance.
   */
  deleteSeance(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.url}/${id}`
    );

  }

}
