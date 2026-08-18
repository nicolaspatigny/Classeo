package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UtilisateurRepository
        extends JpaRepository<Utilisateur, Integer> {


        @Query("""
    SELECT u, a.authority
    FROM Utilisateur u
    JOIN Auth a ON a.userId.id = u.id
    """)
        List<Object[]> findAllUtilisateurs();


}