import { Injectable, inject } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { CoursService } from './cours';
import { CoursEleveService } from './cours-eleve';
import { CoursPromotionService } from './cours-promotion';
import { CoursEnseignantService } from './cours-enseignant';
import { SeanceService } from './seance';
import { UserService } from './user';

import { SeanceCalendrier } from '../../models/seance-calendrier';

@Injectable({
  providedIn: 'root'
})
export class EmploiDuTempsService {

  private readonly coursService = inject(CoursService);
  private readonly coursEleveService = inject(CoursEleveService);
  private readonly coursPromotionService = inject(CoursPromotionService);
  private readonly coursEnseignantService = inject(CoursEnseignantService);
  private readonly seanceService = inject(SeanceService);
  private readonly userService = inject(UserService);

  getEmploiDuTemps(
    eleveId: number,
    promotionId: number
  ): Observable<SeanceCalendrier[]> {

    return forkJoin({
      cours: this.coursService.getCours(),
      coursEleves: this.coursEleveService.getCoursEleves(),
      coursPromotions: this.coursPromotionService.getCoursPromotions(),
      coursEnseignants: this.coursEnseignantService.getCoursEnseignants(),
      utilisateurs: this.userService.getUsers(),
      seances: this.seanceService.getSeances()
    }).pipe(
      map(data => {

        const coursIds = new Set<number>();

        // Cours attribués directement à l'élève
        data.coursEleves
          .filter(relation => relation.eleveId === eleveId)
          .forEach(relation => {
            coursIds.add(relation.coursId);
          });

        // Cours attribués à sa promotion
        data.coursPromotions
          .filter(relation => relation.promotionId === promotionId)
          .forEach(relation => {
            coursIds.add(relation.coursId);
          });

        const result: SeanceCalendrier[] = [];

        for (const seance of data.seances) {

          // La séance concerne-t-elle un cours de l'élève ?
          if (!coursIds.has(seance.coursId)) {
            continue;
          }

          const cours = data.cours.find(
            cours => cours.id === seance.coursId
          );

          if (!cours) {
            continue;
          }

          const enseignants = data.coursEnseignants
            .filter(
              relation => relation.coursId === seance.coursId
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
            seance,
            cours,
            enseignants
          });
        }

        return result;
      })
    );
  }

  getEmploiDuTempsEnseignant(
    enseignantId: number
  ): Observable<SeanceCalendrier[]> {

    return forkJoin({
      cours: this.coursService.getCours(),
      coursEnseignants:
        this.coursEnseignantService.getCoursEnseignants(),
      seances: this.seanceService.getSeances()
    }).pipe(

      map(data => {

        const coursIds = data.coursEnseignants
          .filter(
            relation =>
              relation.enseignantId === enseignantId
          )
          .map(
            relation => relation.coursId
          );

        const coursEnseignant = data.cours
          .filter(
            cours =>
              coursIds.includes(cours.id)
          );

        return data.seances
          .filter(
            seance =>
              coursIds.includes(seance.coursId)
          )
          .map(seance => {

            const cours =
              coursEnseignant.find(
                cours =>
                  cours.id === seance.coursId
              );

            if (!cours) {
              return undefined;
            }

            return {
              seance,
              cours
            };
          })
          .filter(
            (
              item
            ): item is SeanceCalendrier =>
              item !== undefined
          );
      })
    );
  }
}
