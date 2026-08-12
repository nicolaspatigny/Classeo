import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthUser } from '../../models/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private readonly http = inject(HttpClient);

  private readonly url =
    'assets/mock/auth_user.json';

  getAuthUsers(): Observable<AuthUser[]> {
    return this.http.get<AuthUser[]>(this.url);
  }
}
