package fr.eni.classeo.association;

import fr.eni.classeo.bo.*;
import fr.eni.classeo.bo.pk.CursusCoursPK;
import fr.eni.classeo.dal.CoursPlanifieRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNull;

@Slf4j
@DataJpaTest
public class TestManyToOneCoursPlanifie {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private CoursPlanifieRepository  coursPlanifieRepository;

    private Promotion  promotion;
    private CursusCours cursusCours;
    private Formateur formateur;

    @BeforeEach
    void beforeEach(){

        //Formateur
       formateur = Formateur.builder()
                .login("gg@mail.com")
                .password("Pass")
                .nom("Magax")
                .prenom("Gerard")
                .authority("FORMATEUR")
                .build();
        testEntityManager.persist(formateur);

        Filiere filiere = Filiere.builder()
                .nom("Developpement")
                .build();
        testEntityManager.persist(filiere);

        Cursus cursus = Cursus.builder()
                .filiere(filiere)
                .nom("CDA")
                .build();
        testEntityManager.persist(cursus);

        Cours cours = Cours.builder()
                .nom("Java")
                .duree(2)
                .build();
        testEntityManager.persist(cours);

        cursusCours = CursusCours.builder()
                .id(new CursusCoursPK(cursus.getId(), cours.getId()))
                .cursus(cursus)
                .cours(cours)
                .ordre(1)
                .build();
        testEntityManager.persist(cursusCours);

        promotion = Promotion.builder()
                .nom("Mai26")
                .cursus(cursus)
                .build();

        testEntityManager.persist(promotion);
        testEntityManager.flush();
    }

    @Test
    void testManyToOneSave(){
        CoursPlanifie cp = CoursPlanifie.builder()
                .formateur(formateur)
                .cursusCours(cursusCours)
                .promotion(promotion)
                .build();

        CoursPlanifie cpDb = coursPlanifieRepository.save(cp);
        assertThat(cpDb.getId()).isGreaterThan(0);

        CoursPlanifie result = coursPlanifieRepository.findById(cpDb.getId()).orElseThrow();

        assertThat(result.getFormateur()).isNotNull();
        assertThat(result.getFormateur().getLogin()).isEqualTo("gg@mail.com");
        assertThat(result.getPromotion()).isNotNull();
        assertThat(result.getPromotion().getNom()).isEqualTo("Mai26");
        assertThat(result.getCursusCours()).isNotNull();
        assertThat(result.getCursusCours().getCursus().getNom()).isEqualTo("CDA");

        log.info(result.toString());
    }

    @Test
    void testManyToOneDelete(){
        CoursPlanifie cp = CoursPlanifie.builder()
                .formateur(formateur)
                .cursusCours(cursusCours)
                .promotion(promotion)
                .build();

        final CoursPlanifie cpDb = testEntityManager.persist(cp);
        testEntityManager.flush();
        assertThat(cpDb.getId()).isGreaterThan(0);

        coursPlanifieRepository.delete(cpDb);

        final CoursPlanifie cpDb2 = testEntityManager.find(CoursPlanifie.class, cpDb.getId());
        assertNull(cpDb2);

    }


}
