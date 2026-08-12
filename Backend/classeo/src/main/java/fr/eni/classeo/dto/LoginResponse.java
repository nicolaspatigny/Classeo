package fr.eni.classeo.dto;

public record LoginResponse(
        String token,
        UserResponse user
) {
}