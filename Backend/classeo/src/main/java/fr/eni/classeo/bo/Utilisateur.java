package fr.eni.classeo.bo;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"login"})
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Utilisateur {

    @Id
    @Column(name = "login",  nullable = false, unique = true)
    private String login;

    @ToString.Exclude
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY) //  SEULE façon de masquer le mdp en JSON
    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 150)
    private String prenom;

    @Column(length = 50)
    private String authority;
}
