package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cours;
import fr.eni.classeo.dal.CoursPlanifieRepository;
import fr.eni.classeo.dto.*;
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

    @Override
    public List<CoursElevesDto> listeCoursEleves() {
        return coursPlanifieRepository.listeCoursEleves();
    }

    @Override
    public List<CoursFormateurDto> listeCoursFormateur() {
        return coursPlanifieRepository.listeCoursFormateur();
    }

    @Override
    public void deleteCoursPlanifie(int id) {

        if (!coursPlanifieRepository.existsById(id)) {
            throw new RuntimeException("Séance introuvable");
        }

        coursPlanifieRepository.deleteById(id);
    }
}
