import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  if (authService.hasRole('ADMIN')) {
    return router.createUrlTree([
      '/administrateur'
    ]);
  }

  if (authService.hasRole('ENSEIGNANT')) {
    return router.createUrlTree([
      '/enseignant'
    ]);
  }

  if (authService.hasRole('ELEVE')) {
    return router.createUrlTree([
      '/eleve'
    ]);
  }

  return router.createUrlTree(['/login']);
};
