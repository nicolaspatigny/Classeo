import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cours } from '../../models/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/cours.json';

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.url);
  }
}
