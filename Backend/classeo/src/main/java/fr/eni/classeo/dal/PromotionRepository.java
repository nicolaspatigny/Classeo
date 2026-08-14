package fr.eni.classeo.dal;

import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dto.PromotionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {

    @Query("""

            SELECT new fr.eni.classeo.dto.PromotionDto(
                           p.id,
                           p.nom,
                           p.dateDebut,
                           p.dateFin,
                           c.id,
                           f.id
                       )
                       FROM Promotion p
                       JOIN p.cursus c
                       JOIN c.filiere f
""")
    List<PromotionDto> findAllPromotion();


    @Query("""
        SELECT new fr.eni.classeo.dto.PromotionDto(
            p.id,
            p.nom,
            p.dateDebut,
            p.dateFin,
            c.id,
            f.id
        )
        FROM Promotion p
        JOIN p.cursus c
        JOIN c.filiere f
        WHERE p.id = :id
        """)
    PromotionDto getPromotionById(Integer id);
}
