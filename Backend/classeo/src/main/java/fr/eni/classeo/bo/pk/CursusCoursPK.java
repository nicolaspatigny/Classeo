package fr.eni.classeo.bo.pk;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class CursusCoursPK implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Column(name = "cursus_id")
    private Integer cursusId;

    @Column(name = "cours_id")
    private Integer coursId;
}
