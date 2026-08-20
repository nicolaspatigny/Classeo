package fr.eni.classeo.dal;

import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.dto.CoursPlanifieDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CoursRepository extends JpaRepository<Cours, Integer> {

    @Query("""
Select new fr.eni.classeo.dto.CoursPlanifieDto(
        cp.id,
        cp.cursusCours.id.coursId,
        cp.date,
        cp.formateur.id,
        cp.promotion.id,
        cp.heureDebut,
        cp.heureFin,
        cp.salle.id
)
FROM CoursPlanifie cp
WHERE cp.cursusCours.id.coursId = :coursId
""")
    List<CoursPlanifieDto> findCoursPlanifieByCoursId(Integer coursId);
}
