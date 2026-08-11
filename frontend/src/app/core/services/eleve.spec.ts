import { TestBed } from '@angular/core/testing';

import { Eleve } from './eleve';

describe('Eleve', () => {
  let service: Eleve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Eleve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
