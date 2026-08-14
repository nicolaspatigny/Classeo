package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CoursPlanifieService;
import fr.eni.classeo.bll.PromotionService;
import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dto.ElevePromotionDto;
import fr.eni.classeo.dto.PromotionDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    private PromotionService promotionService;

    private CoursPlanifieService coursPlanifieService;

    @GetMapping
    public ResponseEntity<?> findAllPromotions() {
        List<PromotionDto> promotions = promotionService.listePromotions();
        return ResponseEntity.ok(promotions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findPromotionById(@PathVariable Integer id) {
        PromotionDto promotion = promotionService.getPromotionById(id);
        return ResponseEntity.ok(promotion);
    }

    @GetMapping("/{id}/eleves")
    public ResponseEntity<?> findElevesByPromotionId(@PathVariable Integer id) {
        List<ElevePromotionDto> eleves = promotionService.listeElevesParPromotionId(id);
        return ResponseEntity.ok(eleves);
    }

    @GetMapping("/{promotionId}/cours")
    public ResponseEntity<?> findCoursByPromotionId(@PathVariable Integer promotionId) {
        return ResponseEntity.ok(coursPlanifieService.listeCoursParPromotion(promotionId));
    }
}
