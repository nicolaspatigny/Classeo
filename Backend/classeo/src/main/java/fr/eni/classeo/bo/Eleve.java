package fr.eni.classeo.bo;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
@ToString(callSuper=true)
@Entity
public class Eleve extends Utilisateur{
}
