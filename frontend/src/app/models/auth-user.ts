export interface AuthUser {
  id: number;
  userId: number;
  login: string;
  password: string;
  userType: 'ELEVE' | 'ENSEIGNANT' | 'ADMIN';
}
