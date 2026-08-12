import { Component, inject, signal } from '@angular/core';

import { EleveService } from '../../../core/services/eleve';
import { EleveDashboard } from '../../../models/eleve-dashboard';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private readonly eleveService = inject(EleveService);
  private readonly authService = inject(AuthService);

  dashboard = signal<EleveDashboard | undefined>(undefined);

  ngOnInit(): void {

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.eleveService
      .getDashboard(user.id)
      .subscribe(data => {

        this.dashboard.set(data);

      });
  }
}
