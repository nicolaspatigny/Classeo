import { Routes } from '@angular/router';

// Core
import { LoginComponent } from './features/auth/login/login';

// Test - To remove //
import { TestUsersComponent } from './features/test-users/test-users';


// -- PART ELEVE -- //
import {EleveLayout} from './features/eleve/layout/eleve-layout';
import {Dashboard} from './features/eleve/dashboard/dashboard';
import {Cours} from './features/eleve/cours/cours';
import {Notes} from './features/eleve/notes/notes';
import {Calendrier} from './features/eleve/calendrier/calendrier';

// ---------------- //

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
  },
  {
    path: 'eleve',
    component: EleveLayout,
    children: [
      {
        path: 'accueil',
        component: Dashboard
      },
      {
        path: 'cours',
        component: Cours
      },
      {
        path: 'notes',
        component: Notes
      },
      {
        path: 'calendrier',
        component: Calendrier
      },
      {
        path: 'accueil',
        component: Dashboard
      },
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }
    ]
  }
];
