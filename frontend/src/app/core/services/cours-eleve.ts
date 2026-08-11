import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursEleve } from '../../models/cours-eleve';

@Injectable({
  providedIn: 'root'
})
export class CoursEleveService {

  private readonly http = inject(HttpClient);

  private readonly url = 'assets/mock/cours-eleves.json';

  getCoursEleves(): Observable<CoursEleve[]> {
    return this.http.get<CoursEleve[]>(this.url);
  }
}
