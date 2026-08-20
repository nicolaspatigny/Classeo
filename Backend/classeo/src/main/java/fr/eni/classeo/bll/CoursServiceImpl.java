package fr.eni.classeo.bll;


import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.bo.Cursus;
import fr.eni.classeo.bo.CursusCours;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.bo.pk.CursusCoursPK;
import fr.eni.classeo.dal.CoursRepository;
import fr.eni.classeo.dal.CursusCoursRepository;
import fr.eni.classeo.dal.CursusRepository;
import fr.eni.classeo.dal.PromotionRepository;
import fr.eni.classeo.dto.CoursDto;
import fr.eni.classeo.dto.CoursPlanifieDto;
import fr.eni.classeo.dto.CoursPostDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CoursServiceImpl implements CoursService {

    private CoursRepository coursRepository;

    private PromotionRepository  promotionRepository;

    private CursusCoursRepository  cursusCoursRepository;

    private CursusRepository  cursusRepository;

    @Override
    public List<Cours> listeCours() {
        return coursRepository.findAll();
    }

    @Override
    public Cours getCoursById(int id) {
        if(id <= 0){
            throw new RuntimeException("Identifiant n'existe pas");
        }
        final Optional<Cours> cours = coursRepository.findById(id);
        if(cours.isPresent()){
            return cours.get();
        }
        throw new RuntimeException("Aucun cursus ne correspond");
    }

    @Override
    public List<CoursPlanifieDto> listeCoursPlanifieParCoursId(int coursId) {
        return coursRepository.findCoursPlanifieByCoursId(coursId);
    }

    @Override
    @Transactional
    public Cours addCours(CoursPostDto cours) {

        if(cours.getPromotionId() != null){
            Promotion promotion = promotionRepository.findById(cours.getPromotionId())
                    .orElseThrow(() -> new RuntimeException("Promotion n'existe pas"));
            Integer cursusId = promotion.getCursus().getId();
            Cours toSave  = Cours.builder()
                    .nom(cours.getNom())
                    .duree(1).build();
            Cours saved = coursRepository.save(toSave);
            CursusCoursPK ccPK= new CursusCoursPK(cursusId, saved.getId());
            Cursus cursus = cursusRepository.findById(cursusId)
                    .orElseThrow(()->new RuntimeException("cursus introuvable"));
            cursusCoursRepository.save(CursusCours.builder()
                            .cursus(cursus).cours(saved).build());

        }
        Cours toSave  = Cours.builder()
                .nom(cours.getNom())
                .duree(1).build();
        Cours saved = coursRepository.save(toSave);

        return saved;

    }
}
