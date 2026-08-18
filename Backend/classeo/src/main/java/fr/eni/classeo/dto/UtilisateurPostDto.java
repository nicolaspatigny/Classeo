package fr.eni.classeo.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UtilisateurPostDto {

    @NotNull(message = "nom vide")
    @NotBlank(message = "nom vide")
    private String nom;

    @NotNull(message = "prenom vide")
    @NotBlank(message = "prenom vide")
    private String prenom;

    @Nullable
    private LocalDate dateNaissance;

    @NotNull(message = "role vide")
    @NotBlank(message = "role vide")
    private String role;

    @NotNull(message = "login vide")
    @NotBlank(message = "login vide")
    private String login;

    @NotNull(message = "password vide")
    @NotBlank(message = "password vide")
    private String password;

    @Nullable
    private Integer promotionId;
}
