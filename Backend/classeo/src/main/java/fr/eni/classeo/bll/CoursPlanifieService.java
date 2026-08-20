package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.dto.*;

import java.util.List;

public interface CoursPlanifieService {

    List<CoursPromotionDto> listeCoursPromotion();

    List<CoursDto> listeCoursParPromotion(int promotionId);

    List<CoursDto>  listeCoursParFormateur(int formateurId);

    List<CoursPlanifieDto> listeCoursPlanifie();

    CoursPlanifieDto getCoursPlanifieById(int id);

    List<CoursElevesDto> listeCoursEleves();

    CoursPlanifieDto addCoursPlanifie(CoursPlanifiePostDto coursPlanifiePostDto);

    List<CoursFormateurDto> listeCoursFormateur();

    void deleteCoursPlanifie(int id);
}