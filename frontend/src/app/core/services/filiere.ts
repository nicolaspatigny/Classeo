import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Filiere } from '../../models/filiere';
import { API_URL } from '../config/api.config';
import {Promotion} from '../../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  private readonly http = inject(HttpClient);

  private readonly url = `${API_URL}/api/filieres`;


  /**
   * Récupère toutes les filières.
   */
  getFilieres(): Observable<Filiere[]> {

    return this.http.get<Filiere[]>(
      this.url
    );

  }


  /**
   * Récupère une filière grâce à son identifiant.
   */
  getFiliereById(id: number): Observable<Filiere> {

    if (id == null) {
      return this.http.get<Filiere>(
        `${this.url}/1`
      );
    }
    return this.http.get<Filiere>(
      `${this.url}/${id}`
    );

  }


  /**
   * Crée une nouvelle filière.
   */
  createFiliere(request: {
    nom: string;
  }): Observable<Filiere> {

    return this.http.post<Filiere>(
      this.url,
      request
    );

  }


  /**
   * Modifie une filière existante.
   */
  updateFiliere(
    id: number,
    request: {
      nom: string;
    }
  ): Observable<Filiere> {

    return this.http.put<Filiere>(
      `${this.url}/${id}`,
      request
    );

  }


  /**
   * Supprime une filière.
   */
  deleteFiliere(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.url}/${id}`
    );

  }

}
