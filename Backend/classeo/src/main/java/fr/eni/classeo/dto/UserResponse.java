package fr.eni.classeo.dto;

public record UserResponse(
        Integer id,
        String nom,
        String prenom,
        String role,
        Integer promotionId,
        Integer cursusId,
        Integer filiereId
) {
}