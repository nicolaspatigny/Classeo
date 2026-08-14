package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.dal.CoursPlanifieRepository;
import fr.eni.classeo.dto.CoursDto;
import fr.eni.classeo.dto.CoursPlanifieDto;
import fr.eni.classeo.dto.CoursPromotionDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CoursPlanifieServiceImpl implements CoursPlanifieService{

    private CoursPlanifieRepository coursPlanifieRepository;

    @Override
    public List<CoursPromotionDto> listeCoursPromotion() {
        return coursPlanifieRepository.listeCoursPromotion();
    }

    @Override
    public List<CoursDto> listeCoursParPromotion(int promotionId) {

        return coursPlanifieRepository.findCoursByPromotionId(promotionId);
    }

    @Override
    public List<CoursDto> listeCoursParFormateur(int formateurId) {
        return coursPlanifieRepository.findCoursByFormateurId(formateurId);
    }

    @Override
    public List<CoursPlanifieDto> listeCoursPlanifie() {
        return coursPlanifieRepository.findAllCoursPlanifie();
    }

    @Override
    public CoursPlanifieDto getCoursPlanifieById(int id) {
        return coursPlanifieRepository.findCoursPlanifieById(id);
    }
}
