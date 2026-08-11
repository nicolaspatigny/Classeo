import { TestBed } from '@angular/core/testing';

import { CoursEleve } from './cours-eleve';

describe('CoursEleve', () => {
  let service: CoursEleve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursEleve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
