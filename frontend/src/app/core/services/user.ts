import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl = 'assets/mock/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.id === id))
    );
  }

}
