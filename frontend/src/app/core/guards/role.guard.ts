import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';
import { User } from '../../models/user';

export const roleGuard = (
  role: User['role']
): CanActivateFn => {

  return () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    if (!authService.hasRole(role)) {
      return router.createUrlTree(['/login']);
    }

    return true;
  };
};
