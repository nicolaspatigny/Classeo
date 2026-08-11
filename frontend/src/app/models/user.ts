export interface User {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  role: 'ADMIN' | 'ENSEIGNANT' | 'ELEVE';
  filiere?: number;
  cursus?: number;
  promotion?: number;
}
