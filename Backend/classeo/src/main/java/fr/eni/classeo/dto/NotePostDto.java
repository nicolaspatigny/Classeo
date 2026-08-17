package fr.eni.classeo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotePostDto {

    @NotNull(message = "La note est obligatoire")
    @Min(value = 0, message = "La note minimale est 0")
    @Max(value = 20, message = "La note maximale est 20")
    private Float note;

    @NotNull(message = "L'élève est obligatoire")
    private Integer eleveId;

    @NotNull(message = "Le cours est obligatoire")
    private Integer coursId;
}
