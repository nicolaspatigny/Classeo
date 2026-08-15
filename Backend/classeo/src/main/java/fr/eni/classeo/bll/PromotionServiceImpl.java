package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Cursus;
import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Filiere;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dal.CursusRepository;
import fr.eni.classeo.dal.FiliereRepository;
import fr.eni.classeo.dal.PromotionRepository;
import fr.eni.classeo.dal.inscription.InscriptionPromotionRepository;
import fr.eni.classeo.dto.ElevePromotionDto;
import fr.eni.classeo.dto.PromotionDto;
import fr.eni.classeo.dto.PromotionPostDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PromotionServiceImpl implements PromotionService {

    private PromotionRepository promotionRepository;

    private InscriptionPromotionRepository inscriptionPromotionRepository;

    private FiliereRepository filiereRepository;

    private CursusRepository cursusRepository;

    @Override
    public List<PromotionDto> listePromotions() {
        return promotionRepository.findAllPromotion();
    }

    @Override
    public PromotionDto getPromotionById(int id) {

        return promotionRepository.getPromotionById(id);


    }

    @Override
    public List<ElevePromotionDto> listeElevesParPromotionId(int id) {
        final List<ElevePromotionDto> elevesPromo = inscriptionPromotionRepository.findElevesByPromotionId(id);

        return elevesPromo;
    }

    @Override
    public void addPromotion(PromotionPostDto promotion) {
        if(promotion == null){
            throw new RuntimeException("promotion is null");
        }
        if(promotion.getCursusId() == null){
            throw new RuntimeException("cursusId is null");
        }

        Cursus cursus = cursusRepository.findById(promotion.getCursusId())
                .orElseThrow(()->
                        new RuntimeException("La cursus n'existe pas"));

        Promotion promotionToSave = Promotion.builder()
                .nom(promotion.getNom())
                .dateDebut(promotion.getDateDebut())
                .dateFin(promotion.getDateFin())
                .cursus(cursus)
                .build();

        promotionRepository.save(promotionToSave);
    }
}
