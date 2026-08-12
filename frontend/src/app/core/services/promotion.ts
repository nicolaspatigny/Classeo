import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Promotion } from '../../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly http = inject(HttpClient);

  private readonly promotionsUrl = 'assets/mock/promotions.json';

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.promotionsUrl);
  }

  getPromotionById(id: number): Observable<Promotion | undefined> {
    return this.getPromotions().pipe(
      map(promotions => promotions.find(promotion => promotion.id === id))
    );
  }
}
