package fr.eni.classeo.bll;


import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.bo.Cursus;
import fr.eni.classeo.dal.CoursRepository;
import fr.eni.classeo.dto.CoursPlanifieDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CoursServiceImpl implements CoursService {

    private CoursRepository coursRepository;


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
    public void updateCours(Integer id, Cours cours) {

        Cours existingCours = coursRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Cours introuvable : " + id)
                );

        existingCours.setNom(cours.getNom());
        existingCours.setDuree(cours.getDuree());

        coursRepository.save(existingCours);
    }

    @Override
    public void deleteCours(Integer id) {

        Cours cours = coursRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Cours introuvable : " + id)
                );

        coursRepository.delete(cours);
    }
}
