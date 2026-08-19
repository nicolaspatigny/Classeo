package fr.eni.classeo.bll;

import fr.eni.classeo.bo.*;
import fr.eni.classeo.bo.pk.CursusCoursPK;
import fr.eni.classeo.dal.CoursPlanifieRepository;
import fr.eni.classeo.dal.CursusCoursRepository;
import fr.eni.classeo.dal.PromotionRepository;
import fr.eni.classeo.dal.SalleRepository;
import fr.eni.classeo.dal.user.FormateurRepository;
import fr.eni.classeo.dto.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CoursPlanifieServiceImpl implements CoursPlanifieService{

    private FormateurRepository formateurRepository;
    private CoursPlanifieRepository coursPlanifieRepository;
    private PromotionRepository  promotionRepository;
    private CursusCoursRepository cursusCoursRepository;
    private SalleRepository salleRepository;

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
    public CoursPlanifieDto addCoursPlanifie(CoursPlanifiePostDto dto) {
        //recup promo et formateur
        Promotion promotion = promotionRepository.findById(dto.getPromotionId())
                .orElseThrow(()-> new EntityNotFoundException("Promotion introuvable"));

        Formateur formateur = formateurRepository.findById(dto.getFormateurId())
                .orElseThrow(()->  new EntityNotFoundException("Formateur introuvable"));

        //recup cursus via promo
        Integer cursusId = promotion.getCursus().getId();

        //créer clef composite cursuscours
        CursusCoursPK cursusCoursPK = new CursusCoursPK(promotion.getCursus().getId(), dto.getCoursId());
        //recup cursuscours
        CursusCours cursusCours = cursusCoursRepository.findById(cursusCoursPK)
                .orElseThrow(()->new EntityNotFoundException("CursusCours introuvable"));

        //salle
        Salle salle = salleRepository.findById(dto.getSalleId())
                .orElseThrow(()-> new EntityNotFoundException("Salle introuvable"));

        //save
        CoursPlanifie coursPlanifie = CoursPlanifie.builder()
                .date(dto.getDate())
                .heureDebut(dto.getHeureDebut())
                .heureFin(dto.getHeureFin())
                .promotion(promotion)
                .cursusCours(cursusCours)
                .formateur(formateur)
                .salle(salle).build();

        CoursPlanifie toSaved = coursPlanifieRepository.save(coursPlanifie);

        return CoursPlanifieDto.builder()
                .id(toSaved.getId())
                .coursId(toSaved.getCursusCours().getCours().getId())
                .date(toSaved.getDate())
                .formateurId(toSaved.getFormateur().getId())
                .promotionId(toSaved.getPromotion().getId())
                .heureDebut(toSaved.getHeureDebut())
                .heureFin(toSaved.getHeureFin())
                .salleId(salle.getId()).build();
    }
}
