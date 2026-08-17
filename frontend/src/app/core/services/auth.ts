import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthResponse } from '../../models/auth-response';
import { User } from '../../models/user';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly tokenKey = 'classeo_token';
  private readonly userKey = 'classeo_user';

  login(
    login: string,
    password: string,
    userType: User['role']
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${API_URL}/api/auth/login`,
        {
          login,
          password,
          userType
        }
      )
      .pipe(

        tap(response => {

          sessionStorage.setItem(
            this.tokenKey,
            response.token
          );

          sessionStorage.setItem(
            this.userKey,
            JSON.stringify(response.user)
          );

        })
      );
  }

  logout(): void {

    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {

    return sessionStorage.getItem(
      this.tokenKey
    ) !== null;
  }

  getToken(): string | null {

    return sessionStorage.getItem(
      this.tokenKey
    );
  }

  getCurrentUser(): User | null {

    const user = sessionStorage.getItem(
      this.userKey
    );

    if (!user) {
      return null;
    }

    return JSON.parse(user) as User;
  }

  hasRole(role: User['role']): boolean {

    const user = this.getCurrentUser();

    if (!user) {
      return false;
    }

    return user.role === role;
  }
}
