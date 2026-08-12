import { Seance } from './seance';
import { Cours } from './cours';
import { User } from './user';

export interface SeanceCalendrier {
  seance: Seance;
  cours: Cours;
  enseignants: User[];
}
