package fr.eni.classeo.bo;

import fr.eni.classeo.bo.pk.InscriptionCoursPK;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class InscriptionCours {

    @EmbeddedId
    @Builder.Default
    private InscriptionCoursPK id = new InscriptionCoursPK();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eleveId")  //la relation utilise eleveId de la clef InscriptionCoursPK
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("coursPlanifieId")
    @JoinColumn(name = "cours_planifie_id")
    private CoursPlanifie coursPlanifie;

    private boolean force;
}
