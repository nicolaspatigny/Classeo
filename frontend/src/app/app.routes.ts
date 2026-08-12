import { Routes } from '@angular/router';

// Core
import { LoginComponent } from './features/auth/login/login';

// Guard
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { guestGuard } from './core/guards/guest.guard';

// -- PART ELEVE -- //
import { EleveLayout } from './features/eleve/layout/eleve-layout';
import { Dashboard } from './features/eleve/dashboard/dashboard';
import { Cours } from './features/eleve/cours/cours';
import { Notes } from './features/eleve/notes/notes';
import { Calendrier } from './features/eleve/calendrier/calendrier';
import {EnseignantLayout} from './features/enseignant/layout/enseignant-layout/enseignant-layout';
import {EnseignantDashboard} from './features/enseignant/dashboard/dashboard/dashboard';
import {EnseignantCalendrier} from './features/enseignant/calendrier/calendrier/calendrier';
import {Promotions} from './features/enseignant/promotion/promotion/promotion';
import {CoursEnseignants} from './features/enseignant/cours/cours/cours';
import {NotesEnseignant} from './features/enseignant/notes/notes/notes';

// ---------------- //

export const routes: Routes = [

  {
    path: 'login',
    canActivate: [guestGuard],
    component: LoginComponent
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'eleve',
    component: EleveLayout,
    canActivate: [
      authGuard,
      roleGuard('ELEVE')
    ],
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
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: 'enseignant',
    component: EnseignantLayout,
    canActivate: [
      authGuard,
      roleGuard('ENSEIGNANT')
    ],
    children: [
      {
        path: 'accueil',
        component: EnseignantDashboard
      },
      {
        path: 'calendrier',
        component: EnseignantCalendrier
      },
      {
        path: 'promotion',
        component: Promotions
      },
      {
        path: 'cours',
        component: CoursEnseignants
      },
      {
        path: 'notes',
        component: NotesEnseignant
      },
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }
    ]
  }

];
