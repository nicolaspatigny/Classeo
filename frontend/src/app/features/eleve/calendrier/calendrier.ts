import { Component, inject, signal } from '@angular/core';

import { EmploiDuTempsService } from '../../../core/services/emploi-du-temps';
import { SeanceCalendrier } from '../../../models/seance-calendrier';

@Component({
  selector: 'app-calendrier',
  imports: [],
  templateUrl: './calendrier.html',
  styleUrl: './calendrier.css'
})
export class Calendrier {

  private readonly emploiDuTempsService = inject(
    EmploiDuTempsService
  );

  seances = signal<SeanceCalendrier[]>([]);

  semaineActuelle: Date = new Date('2026-08-10');

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

  private chargerSeances(): void {

    const eleveId = 1;
    const promotionId = 2;

    this.emploiDuTempsService
      .getEmploiDuTemps(eleveId, promotionId)
      .subscribe(seances => {

        console.log('Séances reçues :', seances);

        this.seances.set(seances);

        console.log(
          'Séances après affectation :',
          this.seances()
        );
      });
  }

  private getMonday(date: Date): Date {

    const result = new Date(date);

    const day = result.getDay();

    const difference = day === 0
      ? -6
      : 1 - day;

    result.setDate(
      result.getDate() + difference
    );

    result.setHours(0, 0, 0, 0);

    return result;
  }

  getDateForDay(index: number): Date {

    const date = new Date(this.semaineActuelle);

    date.setDate(
      date.getDate() + index
    );

    return date;
  }

  getSeancesForDay(index: number): SeanceCalendrier[] {

    const date = this.getDateForDay(index);

    const dateString = this.formatDate(date);

    return this.seances().filter(
      item => item.seance.date === dateString
    );
  }

  previousWeek(): void {

    const date = new Date(this.semaineActuelle);

    date.setDate(
      date.getDate() - 7
    );

    this.semaineActuelle = date;
  }

  nextWeek(): void {

    const date = new Date(this.semaineActuelle);

    date.setDate(
      date.getDate() + 7
    );

    this.semaineActuelle = date;
  }

  today(): void {

    this.semaineActuelle =
      this.getMonday(new Date());
  }

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

  formatDay(date: Date): string {

    return date.toLocaleDateString(
      'fr-FR',
      {
        day: '2-digit',
        month: '2-digit'
      }
    );
  }

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

  getTop(heureDebut: string): number {

    const [hours, minutes] =
      heureDebut.split(':').map(Number);

    return (
      (hours - 8) * 80
      + (minutes / 60) * 80
    );
  }

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
