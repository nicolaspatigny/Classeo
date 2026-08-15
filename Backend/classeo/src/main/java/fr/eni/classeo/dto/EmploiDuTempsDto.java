package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class EmploiDuTempsDto {

    private Integer id;
    private Integer coursId;
    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private String salle;
    private String nomFormateur;
    private String prenomFormateur;
}
