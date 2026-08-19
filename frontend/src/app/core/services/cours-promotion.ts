import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursPromotion } from '../../models/cours-promotion';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CoursPromotionService {

  private readonly http = inject(HttpClient);

  private readonly url =
    `${API_URL}/api/cours-promotions`;

  /**
   * Récupère toutes les associations cours / promotion.
   */
  getCoursPromotions(): Observable<CoursPromotion[]> {

    return this.http.get<CoursPromotion[]>(
      this.url
    );

  }

}
