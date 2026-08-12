export interface User {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  role: 'ADMIN' | 'ENSEIGNANT' | 'ELEVE';
  filiereId?: number;
  cursusId?: number;
  promotionId?: number;
}
