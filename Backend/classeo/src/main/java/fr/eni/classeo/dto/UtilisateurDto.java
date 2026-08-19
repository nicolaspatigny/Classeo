package fr.eni.classeo.dto;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class UtilisateurDto {

    private Integer id;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;

    private Role role;

    @Nullable
    private Integer filiereId;

    @Nullable
    private Integer cursusId;

    @Nullable
    private Integer promotionId;
}
