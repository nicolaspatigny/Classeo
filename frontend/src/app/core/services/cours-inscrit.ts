import { Injectable, inject } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { CoursService } from './cours';
import { CoursEleveService } from './cours-eleve';
import { CoursPromotionService } from './cours-promotion';
import { CoursEnseignantService } from './cours-enseignant';
import { UserService } from './user';

import { CoursEleveDetail } from '../../models/cours-eleve-detail';

@Injectable({
  providedIn: 'root'
})
export class CoursInscritService {

  private readonly coursService = inject(CoursService);
  private readonly coursEleveService = inject(CoursEleveService);
  private readonly coursPromotionService = inject(CoursPromotionService);
  private readonly coursEnseignantService = inject(CoursEnseignantService);
  private readonly userService = inject(UserService);

  getCoursEleve(
    eleveId: number,
    promotionId: number
  ): Observable<CoursEleveDetail[]> {

    return forkJoin({
      cours: this.coursService.getCours(),
      coursEleves: this.coursEleveService.getCoursEleves(),
      coursPromotions: this.coursPromotionService.getCoursPromotions(),
      coursEnseignants: this.coursEnseignantService.getCoursEnseignants(),
      utilisateurs: this.userService.getUsers()
    }).pipe(

      map(data => {

        /*
         * Cours attribués directement à l'élève
         */
        const coursIndividuels = data.coursEleves
          .filter(
            relation => relation.eleveId === eleveId
          )
          .map(
            relation => relation.coursId
          );


        /*
         * Cours attribués à sa promotion
         */
        const coursPromotion = data.coursPromotions
          .filter(
            relation => relation.promotionId === promotionId
          )
          .map(
            relation => relation.coursId
          );


        /*
         * Fusion des deux listes.
         *
         * Le Set évite les doublons.
         */
        const coursIds = new Set([
          ...coursIndividuels,
          ...coursPromotion
        ]);


        /*
         * Construction de la liste finale.
         */
        const result: CoursEleveDetail[] = [];

        for (const cours of data.cours) {

          if (!coursIds.has(cours.id)) {
            continue;
          }


          /*
           * Récupération des enseignants du cours.
           */
          const enseignants = data.coursEnseignants
            .filter(
              relation => relation.coursId === cours.id
            )
            .map(
              relation =>
                data.utilisateurs.find(
                  utilisateur =>
                    utilisateur.id === relation.enseignantId
                )
            )
            .filter(
              enseignant => enseignant !== undefined
            );


          result.push({
            cours,
            enseignants
          });
        }

        return result;
      })
    );
  }
}
