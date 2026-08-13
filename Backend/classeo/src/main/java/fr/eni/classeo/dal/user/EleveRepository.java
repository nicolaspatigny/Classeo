package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EleveRepository extends JpaRepository<Eleve, String> {


}
