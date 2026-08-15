package fr.eni.classeo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CursusPostDto {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 250, message = "max 250")
    private String nom;

    @NotNull(message = "La filière est obligatoire")
    private Integer filiereId;
}
