package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dto.ElevePromotionDto;

import java.util.List;

public interface PromotionService {

    List<Promotion> listePromotions();

    Promotion getPromotionById(int id);

    List<ElevePromotionDto> listeElevesParPromotionId(int id);

}
