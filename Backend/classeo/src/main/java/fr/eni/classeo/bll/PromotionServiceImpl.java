package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dal.PromotionRepository;
import fr.eni.classeo.dal.inscription.InscriptionPromotionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PromotionServiceImpl implements PromotionService {

    private PromotionRepository promotionRepository;

    private InscriptionPromotionRepository inscriptionPromotionRepository;

    @Override
    public List<Promotion> listePromotions() {
        return promotionRepository.findAll();
    }

    @Override
    public Promotion getPromotionById(int id) {
        return null;
    }

    @Override
    public List<Eleve> listeElevesParPromotionId(int id) {
        final List<Eleve> elevesPromo = inscriptionPromotionRepository.findElevesByPromotionId(id);

        return elevesPromo;
    }
}
