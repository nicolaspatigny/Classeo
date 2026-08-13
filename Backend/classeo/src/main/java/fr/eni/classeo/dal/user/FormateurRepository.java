package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;



public interface FormateurRepository extends JpaRepository<Formateur, String> {
}
