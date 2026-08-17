import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Promotion } from '../../models/promotion';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly http = inject(HttpClient);

  private readonly url = `${API_URL}/api/promotions`;


  /**
   * Récupère toutes les promotions.
   */
  getPromotions(): Observable<Promotion[]> {

    return this.http.get<Promotion[]>(
      this.url
    );

  }


  /**
   * Récupère une promotion grâce à son identifiant.
   */
  getPromotionById(
    id: number
  ): Observable<Promotion> {

    return this.http.get<Promotion>(
      `${this.url}/${id}`
    );

  }


  /**
   * Récupère les élèves d'une promotion.
   */
  getElevesByPromotion(
    promotionId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.url}/${promotionId}/eleves`
    );

  }


  /**
   * Récupère les cours d'une promotion.
   */
  getCoursByPromotion(
    promotionId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.url}/${promotionId}/cours`
    );

  }


  /**
   * Crée une nouvelle promotion.
   */
  createPromotion(request: {
    nom: string;
    cursusId: number;
    dateDebut: string;
    dateFin: string;
  }): Observable<Promotion> {

    return this.http.post<Promotion>(
      this.url,
      request
    );

  }


  /**
   * Modifie une promotion existante.
   */
  updatePromotion(
    id: number,
    request: {
      nom: string;
      cursusId: number;
      dateDebut: string;
      dateFin: string;
    }
  ): Observable<Promotion> {

    return this.http.put<Promotion>(
      `${this.url}/${id}`,
      request
    );

  }


  /**
   * Supprime une promotion.
   */
  deletePromotion(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.url}/${id}`
    );

  }

}
