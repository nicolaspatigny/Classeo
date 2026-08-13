package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ElevePromotionDto {

    private Integer id;
    private String nom;
    private String prenom;
    private Integer promotionId;
    private Integer cursusId;
    private Integer filiereId;
}
