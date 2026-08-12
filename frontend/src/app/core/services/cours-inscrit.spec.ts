import { TestBed } from '@angular/core/testing';

import { CoursInscrit } from './cours-inscrit';

describe('CoursInscrit', () => {
  let service: CoursInscrit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursInscrit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
