package fr.eni.classeo.dal.inscription;

import fr.eni.classeo.bo.InscriptionPromotion;
import fr.eni.classeo.bo.pk.InscriptionPromotionPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscriptionPromotionRepository extends JpaRepository<InscriptionPromotion, InscriptionPromotionPK> {
}
