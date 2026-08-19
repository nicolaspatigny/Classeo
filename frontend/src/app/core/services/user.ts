import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly usersUrl =
    `${API_URL}/api/users`;


  /**
   * Récupère tous les utilisateurs.
   */
  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(
      this.usersUrl
    );

  }


  /**
   * Récupère un utilisateur grâce à son identifiant.
   */
  getUserById(id: number): Observable<User> {

    return this.http.get<User>(
      `${this.usersUrl}/${id}`
    );

  }


  /**
   * Crée un utilisateur.
   */
  createUser(request: {
    nom: string;
    prenom: string;
    dateNaissance: string;
    role: 'ELEVE' | 'ENSEIGNANT';
    login: string;
    password: string;
    promotionId?: number | null;
  }): Observable<User> {

    return this.http.post<User>(
      this.usersUrl,
      request
    );

  }


  /**
   * Modifie un utilisateur.
   */
  updateUser(
    id: number,
    request: {
      nom: string;
      prenom: string;
      dateNaissance: string;
      role: 'ELEVE' | 'ENSEIGNANT';
      login: string;
      password: string;
      promotionId?: number | null;
    }
  ): Observable<User> {

    return this.http.put<User>(
      `${this.usersUrl}/${id}`,
      request
    );

  }


  /**
   * Supprime un utilisateur.
   */
  deleteUser(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.usersUrl}/${id}`
    );

  }

}
