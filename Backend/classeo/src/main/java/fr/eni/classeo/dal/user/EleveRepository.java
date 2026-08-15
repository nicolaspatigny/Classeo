package fr.eni.classeo.dal.user;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.dto.EmploiDuTempsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface EleveRepository extends JpaRepository<Eleve, String> {


}
