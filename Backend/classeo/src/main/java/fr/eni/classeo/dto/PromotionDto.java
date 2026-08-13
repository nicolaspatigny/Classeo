package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
public class PromotionDto {

    private Integer id;
    private String nom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Integer cursusId;
    private Integer filiereId;
}
