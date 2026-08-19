package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.dto.CoursPlanifieDto;

import java.util.List;

public interface CoursService {

    List<Cours> listeCours();

    Cours getCoursById(int id);

    List<CoursPlanifieDto> listeCoursPlanifieParCoursId(int coursId);

    void updateCours(Integer id, Cours cours);

    void deleteCours(Integer id);
}