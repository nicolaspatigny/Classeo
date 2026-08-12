import { User } from './user';
import { Promotion } from './promotion';
import { Filiere } from './filiere';
import { Cursus } from './cursus';

export interface EleveDashboard {
  user: User;
  promotion?: Promotion;
  filiere?: Filiere;
  cursus?: Cursus;
}
