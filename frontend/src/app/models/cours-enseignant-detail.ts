import { Cours } from './cours';
import { Promotion } from './promotion';

export interface CoursEnseignantDetail {
  cours: Cours;
  promotions: Promotion[];
}
