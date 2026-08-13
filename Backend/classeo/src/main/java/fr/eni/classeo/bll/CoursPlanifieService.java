package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.dto.CoursDto;
import fr.eni.classeo.dto.CoursPlanifieDto;
import fr.eni.classeo.dto.CoursPromotionDto;

import java.util.List;

public interface CoursPlanifieService {

    List<CoursPromotionDto> listeCoursPromotion();

    List<CoursDto> listeCoursParPromotion(int promotionId);

    List<CoursDto>  listeCoursParFormateur(int formateurId);

    List<CoursPlanifieDto> listeCoursPlanifie();
}
