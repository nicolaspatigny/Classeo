import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursPromotion } from '../../models/cours-promotion';

@Injectable({
  providedIn: 'root'
})
export class CoursPromotionService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/cours-promotions.json';

  getCoursPromotions(): Observable<CoursPromotion[]> {
    return this.http.get<CoursPromotion[]>(this.url);
  }
}
