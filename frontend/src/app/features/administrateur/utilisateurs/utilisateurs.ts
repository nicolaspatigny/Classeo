import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { UserService } from '../../../core/services/user';
import { PromotionService } from '../../../core/services/promotion';
import { CursusService } from '../../../core/services/cursus';

import { User } from '../../../models/user';
import { Promotion } from '../../../models/promotion';
import { Cursus } from '../../../models/cursus';

@Component({
  selector: 'app-utilisateurs-administrateur',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class UtilisateursAdministrateur {

  private readonly userService =
    inject(UserService);

  private readonly promotionService =
    inject(PromotionService);

  private readonly cursusService =
    inject(CursusService);


  utilisateurs =
    signal<User[]>([]);

  promotions =
    signal<Promotion[]>([]);

  cursus =
    signal<Cursus[]>([]);


  roleSelectionne =
    signal<'ELEVE' | 'ENSEIGNANT'>('ELEVE');


  formulaireOuvert =
    signal(false);


  utilisateurEnModification =
    signal<User | null>(null);


  utilisateurForm = new FormGroup({

    nom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    prenom: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    dateNaissance: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    role: new FormControl<
      'ELEVE' | 'ENSEIGNANT'
    >('ELEVE', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    promotionId:
      new FormControl<number | null>(
        null
      ),

    cursusId:
      new FormControl<number | null>(
        null
      )

  });


  constructor() {

    this.chargerUtilisateurs();
    this.chargerPromotions();
    this.chargerCursus();

  }


  private chargerUtilisateurs(): void {

    this.userService
      .getUsers()
      .subscribe(users => {

        this.utilisateurs.set(users);

      });

  }


  private chargerPromotions(): void {

    this.promotionService
      .getPromotions()
      .subscribe(promotions => {

        this.promotions.set(promotions);

      });

  }


  private chargerCursus(): void {

    this.cursusService
      .getCursus()
      .subscribe(cursus => {

        this.cursus.set(cursus);

      });

  }


  utilisateursFiltres(): User[] {

    return this.utilisateurs()
      .filter(
        user =>
          user.role === this.roleSelectionne()
      );

  }


  changerRole(
    role: 'ELEVE' | 'ENSEIGNANT'
  ): void {

    this.roleSelectionne.set(role);

  }


  getPromotionNom(
    promotionId?: number
  ): string {

    if (promotionId === undefined) {
      return '—';
    }

    const promotion =
      this.promotions()
        .find(
          promotion =>
            promotion.id === promotionId
        );

    return promotion?.nom ?? '—';

  }


  getCursusNom(
    cursusId?: number
  ): string {

    if (cursusId === undefined) {
      return '—';
    }

    const cursus =
      this.cursus()
        .find(
          cursus =>
            cursus.id === cursusId
        );

    return cursus?.nom ?? '—';

  }


  ajouterUtilisateur(): void {

    this.utilisateurEnModification.set(null);

    this.utilisateurForm.reset({
      nom: '',
      prenom: '',
      dateNaissance: '',
      role: this.roleSelectionne(),
      promotionId: null,
      cursusId: null
    });

    this.formulaireOuvert.set(true);

  }


  modifierUtilisateur(
    user: User
  ): void {

    this.utilisateurEnModification.set(user);

    this.utilisateurForm.patchValue({

      nom: user.nom,
      prenom: user.prenom,
      dateNaissance: user.dateNaissance,
      role: user.role === 'ADMIN'
        ? 'ELEVE'
        : user.role,
      promotionId:
        user.promotionId ?? null,
      cursusId:
        user.cursusId ?? null

    });

    this.formulaireOuvert.set(true);

  }


  fermerFormulaire(): void {

    this.formulaireOuvert.set(false);

    this.utilisateurEnModification.set(null);

  }


  enregistrerUtilisateur(): void {

    if (this.utilisateurForm.invalid) {

      this.utilisateurForm.markAllAsTouched();

      return;

    }


    const form =
      this.utilisateurForm.getRawValue();


    const request = {

      nom: form.nom,
      prenom: form.prenom,
      dateNaissance: form.dateNaissance,
      role: form.role,

      ...(form.role === 'ELEVE'
        ? {
          promotionId:
          form.promotionId,
          cursusId:
          form.cursusId
        }
        : {})

    };


    console.log(
      'Utilisateur à envoyer :',
      request
    );


    /*
     * POST / PUT à brancher lorsque
     * l'API sera disponible.
     */

  }


  supprimerUtilisateur(
    user: User
  ): void {

    console.log(
      'Suppression utilisateur :',
      user
    );

  }

}
