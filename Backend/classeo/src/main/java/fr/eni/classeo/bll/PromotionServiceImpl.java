package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dal.PromotionRepository;
import fr.eni.classeo.dal.inscription.InscriptionPromotionRepository;
import fr.eni.classeo.dto.ElevePromotionDto;
import fr.eni.classeo.dto.PromotionDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PromotionServiceImpl implements PromotionService {

    private PromotionRepository promotionRepository;

    private InscriptionPromotionRepository inscriptionPromotionRepository;

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
}
