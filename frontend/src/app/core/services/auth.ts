import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';

import { AuthUserService } from './auth-user';
import { UserService } from './user';

import { AuthUser } from '../../models/auth-user';
import { AuthResponse } from '../../models/auth-response';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authUserService = inject(AuthUserService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  private readonly tokenKey = 'classeo_token';
  private readonly userKey = 'classeo_user';

  login(
    login: string,
    password: string,
    userType: AuthUser['userType']
  ): Observable<AuthResponse> {

    return this.authUserService.getAuthUsers().pipe(

      map(authUsers => {

        const authUser = authUsers.find(
          user =>
            user.login === login &&
            user.password === password &&
            user.userType === userType
        );

        if (!authUser) {
          throw new Error('Identifiants incorrects');
        }

        return authUser;
      }),

      switchMap(authUser =>
        this.userService.getUsers().pipe(

          map(users => {

            const user = users.find(
              user => user.id === authUser.userId
            );

            if (!user) {
              throw new Error(
                'Utilisateur introuvable'
              );
            }

            return {
              token: `mock-jwt-${authUser.userId}-${Date.now()}`,
              user
            };

            //return this.http.post<AuthResponse>(
            //   '/api/auth/login',
            //   { login, password }
            // );
          })
        )
      ),

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
