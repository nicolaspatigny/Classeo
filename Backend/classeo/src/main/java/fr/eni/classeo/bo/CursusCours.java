package fr.eni.classeo.bo;

import fr.eni.classeo.bo.pk.CursusCoursPK;
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
public class CursusCours {

    @EmbeddedId
    @Builder.Default
    private CursusCoursPK id = new CursusCoursPK();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("cursusId") // Fait le lien avec cursusId dans CursusCoursPK
    @JoinColumn(name = "cursus_id")
    private Cursus cursus;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("coursId") // Fait le lien avec coursId dans CursusCoursPK
    @JoinColumn(name = "cours_id")
    private Cours cours;

    private int ordre;
}
