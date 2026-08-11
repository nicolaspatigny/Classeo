import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { TestUsersComponent } from './features/test-users/test-users';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'test-users',
    component: TestUsersComponent
  }
];
