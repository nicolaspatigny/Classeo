import { Component, inject } from '@angular/core';

import { EmploiDuTempsService } from '../../../core/services/emploi-du-temps';
import { SeanceCalendrier } from '../../../models/seance-calendrier';

@Component({
  selector: 'app-calendrier',
  imports: [],
  templateUrl: './calendrier.html',
  styleUrl: './calendrier.css'
})
export class Calendrier {

  private readonly emploiDuTempsService = inject(EmploiDuTempsService);

  seances: SeanceCalendrier[] = [];

  semaineActuelle: Date = this.getMonday(new Date());

  jours: string[] = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi'
  ];

  heures: number[] = Array.from(
    { length: 11 },
    (_, index) => index + 8
  );

  constructor() {
    this.chargerSeances();
  }

  /**
   * Charge les séances de l'élève connecté.
   *
   * Pour l'instant, les informations de l'élève
   * sont encore mockées.
   */
  private chargerSeances(): void {

    const eleveId = 1;
    const promotionId = 2;

    this.emploiDuTempsService
      .getEmploiDuTemps(eleveId, promotionId)
      .subscribe(seances => {
        this.seances = seances;
      });
  }

  /**
   * Retourne le lundi de la semaine contenant la date donnée.
   */
  private getMonday(date: Date): Date {

    const result = new Date(date);

    const day = result.getDay();

    const difference = day === 0
      ? -6
      : 1 - day;

    result.setDate(result.getDate() + difference);
    result.setHours(0, 0, 0, 0);

    return result;
  }

  /**
   * Retourne la date correspondant au jour demandé.
   *
   * 0 = lundi
   * 1 = mardi
   * ...
   * 4 = vendredi
   */
  getDateForDay(index: number): Date {

    const date = new Date(this.semaineActuelle);

    date.setDate(
      date.getDate() + index
    );

    return date;
  }

  /**
   * Retourne les séances d'un jour donné.
   */
  getSeancesForDay(index: number): SeanceCalendrier[] {

    const date = this.getDateForDay(index);

    const dateString = this.formatDate(date);

    return this.seances.filter(
      item => item.seance.date === dateString
    );
  }

  /**
   * Semaine précédente.
   */
  previousWeek(): void {

    const date = new Date(this.semaineActuelle);

    date.setDate(
      date.getDate() - 7
    );

    this.semaineActuelle = date;
  }

  /**
   * Semaine suivante.
   */
  nextWeek(): void {

    const date = new Date(this.semaineActuelle);

    date.setDate(
      date.getDate() + 7
    );

    this.semaineActuelle = date;
  }

  /**
   * Retour à la semaine actuelle.
   */
  today(): void {

    this.semaineActuelle =
      this.getMonday(new Date());
  }

  /**
   * Formate une date au format YYYY-MM-DD.
   *
   * Ce format correspond à celui utilisé
   * dans seances.json.
   */
  private formatDate(date: Date): string {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      date.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * Format d'affichage du jour.
   *
   * Exemple : 14/09
   */
  formatDay(date: Date): string {

    return date.toLocaleDateString(
      'fr-FR',
      {
        day: '2-digit',
        month: '2-digit'
      }
    );
  }

  /**
   * Libellé de la semaine affichée.
   */
  getWeekLabel(): string {

    const debut = this.semaineActuelle;

    const fin = new Date(debut);

    fin.setDate(
      fin.getDate() + 4
    );

    const debutLabel = debut.toLocaleDateString(
      'fr-FR',
      {
        day: 'numeric',
        month: 'long'
      }
    );

    const finLabel = fin.toLocaleDateString(
      'fr-FR',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );

    return `${debutLabel} → ${finLabel}`;
  }

  /**
   * Calcule la position verticale d'une séance.
   *
   * Notre calendrier commence à 08:00
   * et chaque heure représente 80px.
   */
  getTop(heureDebut: string): number {

    const [hours, minutes] =
      heureDebut.split(':').map(Number);

    return (
      (hours - 8) * 80
      + (minutes / 60) * 80
    );
  }

  /**
   * Calcule la hauteur d'une séance.
   *
   * Exemple :
   * 14:00 → 16:00 = 160px
   */
  getHeight(
    heureDebut: string,
    heureFin: string
  ): number {

    const [startHour, startMinute] =
      heureDebut.split(':').map(Number);

    const [endHour, endMinute] =
      heureFin.split(':').map(Number);

    const start =
      startHour * 60 + startMinute;

    const end =
      endHour * 60 + endMinute;

    return (
      ((end - start) / 60) * 80
    );
  }
}
