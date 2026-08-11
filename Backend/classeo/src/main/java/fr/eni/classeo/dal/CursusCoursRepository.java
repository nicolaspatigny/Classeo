package fr.eni.classeo.dal;

import fr.eni.classeo.bo.CursusCours;
import fr.eni.classeo.bo.pk.CursusCoursPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursusCoursRepository extends JpaRepository<CursusCours, CursusCoursPK> {
}
