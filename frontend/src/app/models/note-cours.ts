import { Cours } from './cours';
import { Note } from './note';

export interface NoteCours {
  cours: Cours;
  notes: Note[];
}
