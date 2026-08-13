package fr.eni.classeo.bll;

import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dto.ElevePromotionDto;
import fr.eni.classeo.dto.PromotionDto;

import java.util.List;

public interface PromotionService {

    List<PromotionDto> listePromotions();

    PromotionDto getPromotionById(int id);

    List<ElevePromotionDto> listeElevesParPromotionId(int id);

}
