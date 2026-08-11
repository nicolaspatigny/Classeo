import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Seance } from '../../models/seance';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/seances.json';

  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.url);
  }
}
