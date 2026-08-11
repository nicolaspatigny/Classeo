import { TestBed } from '@angular/core/testing';

import { NoteEleve } from './note-eleve';

describe('NoteEleve', () => {
  let service: NoteEleve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteEleve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
