package fr.eni.classeo.dal;


import fr.eni.classeo.bo.CoursPlanifie;
import fr.eni.classeo.dto.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CoursPlanifieRepository extends JpaRepository<CoursPlanifie, Integer> {

    @Query("""
        SELECT new fr.eni.classeo.dto.CoursPromotionDto(
            cc.cours.id,
            cp.promotion.id
        )
        FROM CoursPlanifie cp
        JOIN cp.cursusCours cc
    """)
    List<CoursPromotionDto> listeCoursPromotion();

    @Query("""
SELECT DISTINCT new fr.eni.classeo.dto.CoursDto(
        c.id,
        c.nom,
        c.duree
    )
    FROM CoursPlanifie cp
    JOIN cp.cursusCours cc
    JOIN cc.cours c
    WHERE cp.promotion.id = :promotionId
""")
    List<CoursDto> findCoursByPromotionId(Integer promotionId);

    @Query("""
SELECT DISTINCT new fr.eni.classeo.dto.CoursDto(
        c.id,
        c.nom,
        c.duree
    )
    FROM CoursPlanifie cp
    JOIN cp.cursusCours cc
    JOIN cc.cours c
    WHERE cp.formateur.id = :formateurId
""")
    List<CoursDto> findCoursByFormateurId(Integer formateurId);

    @Query("""
SELECT new fr.eni.classeo.dto.CoursPlanifieDto(
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
""")
    List<CoursPlanifieDto> findAllCoursPlanifie();

    @Query("""
SELECT new fr.eni.classeo.dto.CoursPlanifieDto(
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
    WHERE cp.id = :id
""")
    CoursPlanifieDto findCoursPlanifieById(int id);

    @Query("""
    SELECT DISTINCT new fr.eni.classeo.dto.CoursElevesDto(
        cp.cursusCours.cours.id,
        ic.eleve.id
    )
    FROM CoursPlanifie cp
    JOIN InscriptionCours ic ON ic.coursPlanifie.id = cp.id
    
    UNION
    
    SELECT DISTINCT new fr.eni.classeo.dto.CoursElevesDto(
        cp.cursusCours.cours.id,
        ip.eleve.id
    )
    FROM CoursPlanifie cp
    JOIN InscriptionPromotion ip ON ip.promotion.id = cp.promotion.id
""")
    List<CoursElevesDto> listeCoursEleves();

    @Query("""
    SELECT DISTINCT new fr.eni.classeo.dto.CoursFormateurDto(
        cp.cursusCours.cours.id,
        cp.formateur.id
    )
    FROM CoursPlanifie cp
""")
    List<CoursFormateurDto> listeCoursFormateur();


}
