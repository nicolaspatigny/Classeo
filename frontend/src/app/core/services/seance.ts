import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Seance } from '../../models/seance';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private readonly http = inject(HttpClient);

  private readonly url =
    'assets/mock/seances.json';


  getSeances(): Observable<Seance[]> {

    return this.http.get<Seance[]>(
      this.url
    );

  }


  createSeance(request: {
    coursId: number;
    date: string;
    heureDebut: string;
    heureFin: string;
    salle: string;
  }): Observable<Seance> {

    return this.http.post<Seance>(
      `${API_URL}/api/seances`,
      request
    );

  }

}
