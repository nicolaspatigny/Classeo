package fr.eni.classeo.dal.inscription;

import fr.eni.classeo.bo.InscriptionPromotion;
import fr.eni.classeo.bo.pk.InscriptionPromotionPK;
import fr.eni.classeo.dto.ElevePromotionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InscriptionPromotionRepository
        extends JpaRepository<InscriptionPromotion, InscriptionPromotionPK> {

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

    @Query("""
        SELECT ip
        FROM InscriptionPromotion ip
        JOIN FETCH ip.promotion p
        JOIN FETCH p.cursus c
        JOIN FETCH c.filiere f
        WHERE ip.eleve.id = :eleveId
    """)
    List<InscriptionPromotion> findByEleveIdWithDetails(Integer eleveId);


    @Query("""
    SELECT ip
    FROM InscriptionPromotion ip
    JOIN FETCH ip.promotion p
    JOIN FETCH p.cursus c
    JOIN FETCH c.filiere f
    WHERE ip.eleve.id = :eleveId
    ORDER BY ip.dateInscription DESC
    LIMIT 1
""")
    Optional<InscriptionPromotion> findFirstByEleveIdOrderByDateInscriptionDesc(Integer eleveId);

    void deleteByEleveId(Integer eleveId);

}