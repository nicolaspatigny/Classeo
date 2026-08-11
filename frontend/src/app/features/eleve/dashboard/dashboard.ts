import { Component, inject, signal } from '@angular/core';

import { EleveService } from '../../../core/services/eleve';
import { EleveDashboard } from '../../../models/eleve-dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private readonly eleveService = inject(EleveService);

  dashboard = signal<EleveDashboard | undefined>(undefined);

  constructor() {
    this.eleveService.getDashboard(1).subscribe(data => {
      this.dashboard.set(data);
    });
  }
}
