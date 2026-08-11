package fr.eni.classeo.bo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(of = {"login", "nom", "prenom"})
@EqualsAndHashCode(of = {"login"})
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Utilisateur {

    @Id
    @Column(name = "login",  nullable = false, unique = true)
    private String login;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 150)
    private String prenom;

    @Column(length = 50)
    private String authority;
}
