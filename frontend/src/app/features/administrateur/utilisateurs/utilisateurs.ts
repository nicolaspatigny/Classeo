import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { UserService } from '../../../core/services/user';
import { PromotionService } from '../../../core/services/promotion';

import { User } from '../../../models/user';
import { Promotion } from '../../../models/promotion';

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


  /*
   * Liste des utilisateurs.
   */
  utilisateurs =
    signal<User[]>([]);


  /*
   * Liste des promotions.
   */
  promotions =
    signal<Promotion[]>([]);


  /*
   * Onglet actuellement sélectionné.
   */
  roleSelectionne =
    signal<'ELEVE' | 'ENSEIGNANT'>('ELEVE');


  /*
   * Affichage du formulaire.
   */
  formulaireOuvert =
    signal(false);


  /*
   * Utilisateur actuellement modifié.
   *
   * null = création
   */
  utilisateurEnModification =
    signal<User | null>(null);


  /*
   * Indique si une requête POST/PUT/DELETE
   * est actuellement en cours.
   */
  loading =
    signal(false);


  /*
   * Message d'erreur.
   */
  errorMessage =
    signal('');


  /*
   * Message de succès.
   */
  successMessage =
    signal('');


  /*
   * Formulaire utilisateur.
   */
  utilisateurForm =
    new FormGroup({

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

      login: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }),

      promotionId:
        new FormControl<number | null>(
          null
        )

    });


  constructor() {

    this.chargerUtilisateurs();

    this.chargerPromotions();

  }


  /**
   * Récupère les utilisateurs depuis l'API.
   */
  private chargerUtilisateurs(): void {

    this.userService
      .getUsers()
      .subscribe({

        next: users => {

          this.utilisateurs.set(users);

        },

        error: error => {

          console.error(
            'Erreur lors du chargement des utilisateurs :',
            error
          );

          this.errorMessage.set(
            'Impossible de charger les utilisateurs.'
          );

        }

      });

  }


  /**
   * Récupère les promotions depuis l'API.
   */
  private chargerPromotions(): void {

    this.promotionService
      .getPromotions()
      .subscribe({

        next: promotions => {

          this.promotions.set(promotions);

        },

        error: error => {

          console.error(
            'Erreur lors du chargement des promotions :',
            error
          );

        }

      });

  }


  /**
   * Retourne les utilisateurs correspondant
   * au rôle actuellement sélectionné.
   */
  utilisateursFiltres(): User[] {

    return this.utilisateurs()
      .filter(
        user =>
          user.role === this.roleSelectionne()
      );

  }


  /**
   * Change l'onglet Élèves / Enseignants.
   */
  changerRole(
    role: 'ELEVE' | 'ENSEIGNANT'
  ): void {

    this.roleSelectionne.set(role);

  }


  /**
   * Retourne le nom d'une promotion.
   */
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


  /**
   * Ouvre le formulaire pour créer
   * un nouvel utilisateur.
   */
  ajouterUtilisateur(): void {

    this.utilisateurEnModification.set(null);

    this.errorMessage.set('');

    this.successMessage.set('');

    this.utilisateurForm.reset({

      nom: '',
      prenom: '',
      dateNaissance: '',
      role: this.roleSelectionne(),
      login: '',
      password: '',
      promotionId: null

    });

    /*
     * Le mot de passe est obligatoire
     * pour une création.
     */
    this.utilisateurForm.controls.password
      .setValidators([
        Validators.required
      ]);

    this.utilisateurForm.controls.password
      .updateValueAndValidity();

    this.formulaireOuvert.set(true);

  }


  /**
   * Ouvre le formulaire pour modifier
   * un utilisateur existant.
   */
  modifierUtilisateur(
    user: User
  ): void {

    this.utilisateurEnModification.set(user);

    this.errorMessage.set('');

    this.successMessage.set('');

    /*
     * Le mot de passe reste obligatoire
     * car le contrat actuel du PUT
     * demande une string.
     */
    this.utilisateurForm.controls.password
      .setValidators([
        Validators.required
      ]);

    this.utilisateurForm.controls.password
      .updateValueAndValidity();

    this.utilisateurForm.patchValue({

      nom:
      user.nom,

      prenom:
      user.prenom,

      dateNaissance:
      user.dateNaissance,

      role:
        user.role === 'ADMINISTRATEUR'
          ? 'ELEVE'
          : user.role,

      login:
        user.login ?? '',

      password:
        '',

      promotionId:
        user.promotionId ?? null

    });

    this.formulaireOuvert.set(true);

  }


  /**
   * Ferme le formulaire.
   */
  fermerFormulaire(): void {

    this.formulaireOuvert.set(false);

    this.utilisateurEnModification.set(null);

    this.errorMessage.set('');

    this.successMessage.set('');

  }


  /**
   * Enregistre un utilisateur.
   *
   * POST pour une création.
   * PUT pour une modification.
   */
  enregistrerUtilisateur(): void {

    if (this.utilisateurForm.invalid) {

      this.utilisateurForm.markAllAsTouched();

      return;

    }


    this.loading.set(true);

    this.errorMessage.set('');

    this.successMessage.set('');


    const form =
      this.utilisateurForm.getRawValue();


    /*
     * Contrat commun POST / PUT.
     */
    const request: {
      nom: string;
      prenom: string;
      dateNaissance: string;
      role: 'ELEVE' | 'ENSEIGNANT';
      login: string;
      password: string;
      promotionId?: number | null;
    } = {

      nom:
      form.nom,

      prenom:
      form.prenom,

      dateNaissance:
      form.dateNaissance,

      role:
      form.role,

      login:
      form.login,

      password:
      form.password

    };


    /*
     * Une promotion est envoyée uniquement
     * pour un élève.
     */
    if (form.role === 'ELEVE') {

      request.promotionId =
        form.promotionId;

    }


    const utilisateur =
      this.utilisateurEnModification();


    /*
     * ============================
     * MODIFICATION
     * ============================
     */
    if (utilisateur) {

      this.userService
        .updateUser(
          utilisateur.id,
          request
        )
        .subscribe({

          next: user => {

            this.loading.set(false);

            /*
             * Remplace l'utilisateur modifié
             * dans la liste locale.
             */
            this.utilisateurs.update(
              utilisateurs =>
                utilisateurs.map(
                  element =>
                    element.id === user.id
                      ? user
                      : element
                )
            );

            this.successMessage.set(
              'Utilisateur modifié avec succès.'
            );

            this.formulaireOuvert.set(false);

            this.utilisateurEnModification
              .set(null);

          },

          error: error => {

            console.error(
              'Erreur lors de la modification :',
              error
            );

            this.loading.set(false);

            this.errorMessage.set(
              'Impossible de modifier l’utilisateur.'
            );

          }

        });

      return;
    }


    /*
     * ============================
     * CRÉATION
     * ============================
     */
    this.userService
      .createUser(request)
      .subscribe({

        next: user => {

          this.loading.set(false);

          /*
           * Ajoute directement le nouvel utilisateur
           * dans la liste.
           */
          this.chargerUtilisateurs();

          this.successMessage.set(
            'Utilisateur créé avec succès.'
          );

          this.formulaireOuvert.set(false);

        },

        error: error => {

          console.error(
            'Erreur lors de la création :',
            error
          );

          this.loading.set(false);

          this.errorMessage.set(
            'Impossible de créer l’utilisateur.'
          );

        }

      });

  }


  /**
   * Supprime un utilisateur.
   */
  supprimerUtilisateur(
    user: User
  ): void {

    const confirmation =
      confirm(
        `Voulez-vous vraiment supprimer ${user.prenom} ${user.nom} ?`
      );

    if (!confirmation) {
      return;
    }


    this.loading.set(true);

    this.errorMessage.set('');

    this.successMessage.set('');


    this.userService
      .deleteUser(user.id)
      .subscribe({

        next: () => {

          this.loading.set(false);

          /*
           * Retire l'utilisateur supprimé
           * de la liste locale.
           */
          this.utilisateurs.update(
            utilisateurs =>
              utilisateurs.filter(
                element =>
                  element.id !== user.id
              )
          );

          this.successMessage.set(
            'Utilisateur supprimé avec succès.'
          );

        },

        error: error => {

          console.error(
            'Erreur lors de la suppression :',
            error
          );

          this.loading.set(false);

          this.errorMessage.set(
            'Impossible de supprimer l’utilisateur.'
          );

        }

      });

  }

}
