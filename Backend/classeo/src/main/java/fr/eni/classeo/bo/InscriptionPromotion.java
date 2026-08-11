package fr.eni.classeo.bo;

import fr.eni.classeo.bo.pk.InscriptionPromotionPK;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class InscriptionPromotion {

    @EmbeddedId
    private InscriptionPromotionPK id =  new InscriptionPromotionPK();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eleveId")
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("promotionId")
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    private Date dateInscription;
}
