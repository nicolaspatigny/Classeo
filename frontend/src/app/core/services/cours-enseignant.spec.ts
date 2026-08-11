import { TestBed } from '@angular/core/testing';

import { CoursEnseignant } from './cours-enseignant';

describe('CoursEnseignant', () => {
  let service: CoursEnseignant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursEnseignant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
