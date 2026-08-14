package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursDto {

    private Integer id;
    private String nom;
    private Integer duree;
}
