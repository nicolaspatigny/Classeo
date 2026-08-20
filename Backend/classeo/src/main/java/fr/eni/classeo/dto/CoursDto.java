package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CoursDto {

    private Integer id;
    private String nom;
    private Integer duree;
}
