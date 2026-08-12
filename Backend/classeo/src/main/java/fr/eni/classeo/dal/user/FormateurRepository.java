package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormateurRepository extends JpaRepository<Formateur, String> {
}
