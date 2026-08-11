import { Injectable, inject } from '@angular/core';
import {forkJoin, map, Observable, of, switchMap} from 'rxjs';

import { UserService } from './user';
import { PromotionService } from './promotion';
import { FiliereService } from './filiere';
import { CursusService } from './cursus';

import { EleveDashboard } from '../../models/eleve-dashboard';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private readonly userService = inject(UserService);
  private readonly promotionService = inject(PromotionService);
  private readonly filiereService = inject(FiliereService);
  private readonly cursusService = inject(CursusService);

  getDashboard(userId: number): Observable<EleveDashboard | undefined> {

    return this.userService.getUserById(userId).pipe(

      switchMap(user => {

        if (!user) {
          return of(undefined);
        }

        if (
          user.promotionId === undefined ||
          user.filiereId === undefined ||
          user.cursusId === undefined
        ) {
          return of({
            user
          });
        }

        return forkJoin({
          promotion: this.promotionService.getPromotionById(user.promotionId),
          filiere: this.filiereService.getFiliereById(user.filiereId),
          cursus: this.cursusService.getCursusById(user.cursusId)
        }).pipe(

          map(result => ({
            user,
            promotion: result.promotion,
            filiere: result.filiere,
            cursus: result.cursus
          }))

        );
      })
    );
  }
}
