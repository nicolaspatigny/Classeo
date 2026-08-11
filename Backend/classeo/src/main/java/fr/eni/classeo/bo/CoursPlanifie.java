package fr.eni.classeo.bo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "UK_cours_planifie_promotion_cours",
                        columnNames = {
                                "promotion_id",
                                "cursus_id",
                                "cours_id"
                        }
                )
        }
)
public class CoursPlanifie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date dateDebut;
    private Date dateFin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_id",  nullable = false)
    private Promotion promotion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "cursus_id", referencedColumnName = "cursus_id"),
            @JoinColumn(name = "cours_id", referencedColumnName = "cours_id")
    })
    private CursusCours cursusCours;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "formateur_id", nullable = false)
    private Formateur formateur;
}
