import { Cours } from './cours';
import { User } from './user';

export interface CoursEleveDetail {
  cours: Cours;
  enseignants: User[];
}
