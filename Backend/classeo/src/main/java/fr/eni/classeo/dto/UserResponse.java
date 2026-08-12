package fr.eni.classeo.dto;

public record UserResponse(
        String id,
        String nom,
        String prenom,
        Integer promotionId,
        Integer filiereId,
        Integer cursusId
) {
}