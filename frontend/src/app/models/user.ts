export interface User {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  role: UserRole;

  filiereId?: number;
  cursusId?: number;
  promotionId?: number;
}

export type UserRole =
  | 'ELEVE'
  | 'ENSEIGNANT'
  | 'ADMIN';
