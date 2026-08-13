package fr.eni.classeo.dal.inscription;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.InscriptionPromotion;
import fr.eni.classeo.bo.pk.InscriptionPromotionPK;
import fr.eni.classeo.dto.ElevePromotionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InscriptionPromotionRepository extends JpaRepository<InscriptionPromotion, InscriptionPromotionPK> {

    @Query("""
    SELECT new fr.eni.classeo.dto.ElevePromotionDto(
        e.id,
        e.nom,
        e.prenom,
        p.id,
        f.id,
        c.id
    )
    FROM InscriptionPromotion ip
    JOIN ip.eleve e
    JOIN ip.promotion p
    JOIN p.cursus c
    JOIN c.filiere f
    WHERE p.id = :promotionId
""")
    List<ElevePromotionDto> findElevesByPromotionId(Integer promotionId);
}
