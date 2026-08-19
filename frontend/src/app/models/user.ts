export interface User {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  role:
    | 'ELEVE'
    | 'ENSEIGNANT'
    | 'ADMINISTRATEUR';
  login: string;
  promotionId?: number;
  cursusId?: number;
  filiereId?: number;
}
