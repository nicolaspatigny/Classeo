import { TestBed } from '@angular/core/testing';

import { EmploiDuTemps } from './emploi-du-temps';

describe('EmploiDuTemps', () => {
  let service: EmploiDuTemps;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploiDuTemps);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
