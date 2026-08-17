package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository
        extends JpaRepository<Utilisateur, Integer> {
}