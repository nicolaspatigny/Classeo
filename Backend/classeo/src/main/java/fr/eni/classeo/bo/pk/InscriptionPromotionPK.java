package fr.eni.classeo.bo.pk;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class InscriptionPromotionPK implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Column(name = "promotion_id")
    private Integer promotionId;

    @Column(name = "eleve_id")
    private String eleveId;

}