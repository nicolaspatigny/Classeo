package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EleveRepository extends JpaRepository<Eleve, String> {
}
