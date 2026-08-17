package fr.eni.classeo.bo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "eleve_id", nullable = false)
    @NotNull(message = "L'élève est obligatoire")
    private Eleve eleve;

    @Column(nullable = false)
    @NotNull(message = "La note est obligatoire")
    @Min(value = 0, message = "La note ne peut pas être inférieure à 0")
    @Max(value = 20, message = "La note ne peut pas dépasser 20")
    private Float note;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cours_id", nullable = false)
    @NotNull(message = "Le cours est obligatoire")
    private Cours cours;
}
