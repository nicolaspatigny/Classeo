package fr.eni.classeo.bo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Cursus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 250, nullable = false)
    @Size(max = 250, message = "max 250")
    private String nom;

    @ManyToOne
    @JoinColumn(name = "filiere_id")
    @NotNull(message = "la filière est obligatoire")
    private Filiere filiere;
}
