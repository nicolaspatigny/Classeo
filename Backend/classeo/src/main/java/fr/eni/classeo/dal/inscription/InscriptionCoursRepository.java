package fr.eni.classeo.dal.inscription;

import fr.eni.classeo.bo.InscriptionCours;
import fr.eni.classeo.bo.pk.InscriptionCoursPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscriptionCoursRepository extends JpaRepository<InscriptionCours, InscriptionCoursPK> {
}
