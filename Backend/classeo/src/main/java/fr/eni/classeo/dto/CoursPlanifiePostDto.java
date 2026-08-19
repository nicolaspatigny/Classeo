package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class CoursPlanifiePostDto {

    private Integer coursId;
    private LocalDate date;
    private Integer formateurId;
    private Integer promotionId;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private Integer salleId;
}
