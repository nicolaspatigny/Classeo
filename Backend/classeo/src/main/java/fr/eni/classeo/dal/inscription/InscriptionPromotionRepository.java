package fr.eni.classeo.dal.inscription;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.InscriptionPromotion;
import fr.eni.classeo.bo.pk.InscriptionPromotionPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InscriptionPromotionRepository extends JpaRepository<InscriptionPromotion, InscriptionPromotionPK> {

    @Query("SELECT ip.eleve\n" +
            " FROM InscriptionPromotion ip\n" +
            " WHERE ip.promotion.id = :promotionId")
    List<Eleve> findElevesByPromotionId(Integer promotionId);
}
