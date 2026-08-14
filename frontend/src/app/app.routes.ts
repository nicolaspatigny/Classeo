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
import {UtilisateursAdministrateur} from './features/administrateur/utilisateurs/utilisateurs';
import {AdministrateurLayout} from './features/administrateur/layout/layout';
import {PromotionsAdministrateur} from './features/administrateur/promotions/promotions';
import {FilieresAdministrateur} from './features/administrateur/filieres/filieres';
import {CursusAdministrateur} from './features/administrateur/cursus/cursus';
import {CoursAdministrateur} from './features/administrateur/cours/cours';
import {SeancesAdministrateur} from './features/administrateur/seances/seances';
import {AccueilAdministrateur} from './features/administrateur/accueil/accueil';

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
  },

  {
    path: 'administrateur',
    component: AdministrateurLayout,
    canActivate: [
      roleGuard('ADMIN')
    ],
    children: [
      {
        path: 'accueil',
        component: AccueilAdministrateur
      },
      {
        path: 'utilisateurs',
        component: UtilisateursAdministrateur
      },
      {
        path: 'promotions',
        component: PromotionsAdministrateur
      },
      {
        path: 'filieres',
        component: FilieresAdministrateur
      },
      {
        path: 'cursus',
        component: CursusAdministrateur
      },
      {
        path: 'cours',
        component: CoursAdministrateur
      },
      {
        path: 'seances',
        component: SeancesAdministrateur
      },
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }
    ]
  }

];
