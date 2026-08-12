import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../core/services/user';
import {User} from '../../models/user';

@Component({
  selector: 'app-test-users',
  imports: [],
  templateUrl: './test-users.html',
  styleUrl: './test-users.css'
})
export class TestUsersComponent {

  private readonly userService = inject(UserService);

  users = signal<User[]>([]);

  constructor() {
    this.userService.getUsers().subscribe(users => {

      this.users.set(users);

    });
  }
}
