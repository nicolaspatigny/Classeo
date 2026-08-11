import { TestBed } from '@angular/core/testing';

import { CoursPromotion } from './cours-promotion';

describe('CoursPromotion', () => {
  let service: CoursPromotion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursPromotion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
