import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { API_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl = `${API_URL}/api/users`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les utilisateurs.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  /**
   * Récupère un utilisateur grâce à son identifiant.
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.usersUrl}/${id}`
    );
  }

}
