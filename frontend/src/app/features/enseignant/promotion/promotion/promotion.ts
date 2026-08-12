import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../../core/services/auth';
import { PromotionService } from '../../../../core/services/promotion';
import { CoursService } from '../../../../core/services/cours';
import { CoursEnseignantService } from '../../../../core/services/cours-enseignant';
import { CoursPromotionService } from '../../../../core/services/cours-promotion';
import { UserService } from '../../../../core/services/user';

import { Promotion } from '../../../../models/promotion';
import { User } from '../../../../models/user';

interface PromotionAvecEleves extends Promotion {
  eleves: User[];
}

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [],
  templateUrl: './promotion.html',
  styleUrl: './promotion.css'
})
export class Promotions {

  private readonly authService =
    inject(AuthService);

  private readonly promotionService =
    inject(PromotionService);

  private readonly coursService =
    inject(CoursService);

  private readonly coursEnseignantService =
    inject(CoursEnseignantService);

  private readonly coursPromotionService =
    inject(CoursPromotionService);

  private readonly userService =
    inject(UserService);

  promotions =
    signal<PromotionAvecEleves[]>([]);

  promotionOuverte =
    signal<number | null>(null);


  constructor() {
    this.chargerPromotions();
  }


  private chargerPromotions(): void {

    const user =
      this.authService.getCurrentUser();

    if (!user) {
      return;
    }


    // 1. Récupérer les cours associés
    //    à l'enseignant connecté
    this.coursEnseignantService
      .getCoursEnseignants()
      .subscribe(relations => {

        const coursIds =
          relations
            .filter(
              relation =>
                relation.enseignantId === user.id
            )
            .map(
              relation =>
                relation.coursId
            );


        // 2. Récupérer les cours
        this.coursService
          .getCours()
          .subscribe(cours => {

            const coursEnseignant =
              cours.filter(
                cours =>
                  coursIds.includes(cours.id)
              );


            // 3. Récupérer les relations
            //    cours → promotion
            this.coursPromotionService
              .getCoursPromotions()
              .subscribe(coursPromotions => {

                const promotionIds = [
                  ...new Set(

                    coursPromotions
                      .filter(
                        relation =>
                          coursEnseignant.some(
                            cours =>
                              cours.id ===
                              relation.coursId
                          )
                      )
                      .map(
                        relation =>
                          relation.promotionId
                      )

                  )
                ];


                // 4. Récupérer les promotions
                this.promotionService
                  .getPromotions()
                  .subscribe(promotions => {

                    const promotionsEnseignant =
                      promotions.filter(
                        promotion =>
                          promotionIds.includes(
                            promotion.id
                          )
                      );


                    // 5. Récupérer les élèves
                    this.userService
                      .getUsers()
                      .subscribe(users => {

                        const resultat =
                          promotionsEnseignant.map(
                            promotion => ({

                              ...promotion,

                              eleves:
                                users.filter(
                                  eleve =>
                                    eleve.role === 'ELEVE' &&
                                    eleve.promotionId ===
                                    promotion.id
                                )

                            })
                          );


                        // 6. Mise à jour du signal
                        this.promotions.set(
                          resultat
                        );

                      });

                  });

              });

          });

      });

  }


  togglePromotion(
    promotionId: number
  ): void {

    if (
      this.promotionOuverte() ===
      promotionId
    ) {

      this.promotionOuverte.set(null);

      return;
    }

    this.promotionOuverte.set(
      promotionId
    );

  }

}
