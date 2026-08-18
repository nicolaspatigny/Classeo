package fr.eni.classeo.dto;

public enum Role {
    ADMIN,
    ENSEIGNANT,
    ELEVE;

    public static Role fromAuthority(String authority) {
        return switch (authority) {
            case "ROLE_ADMIN" -> ADMIN;
            case "ROLE_ENSEIGNANT" -> ENSEIGNANT;
            case "ROLE_ELEVE" -> ELEVE;
            default -> throw new IllegalArgumentException(
                    "Authority inconnue : " + authority
            );
        };
    }
}
