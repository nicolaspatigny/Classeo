package fr.eni.classeo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoteDto {

    private Integer id;
    private Float note;
    private Integer eleveId;
    private Integer coursId;
}
