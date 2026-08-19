package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CoursPlanifieService;
import fr.eni.classeo.bll.PromotionService;
import fr.eni.classeo.bo.Eleve;
import fr.eni.classeo.bo.Promotion;
import fr.eni.classeo.dto.ElevePromotionDto;
import fr.eni.classeo.dto.PromotionDto;
import fr.eni.classeo.dto.PromotionPostDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<?> addPromotion(@Valid @RequestBody PromotionPostDto promotion) {
        try {
            promotionService.addPromotion(promotion);
            return ResponseEntity.ok(promotion);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePromotion(
            @PathVariable Integer id,
            @Valid @RequestBody PromotionPostDto promotion) {

        try {
            promotionService.updatePromotion(id, promotion);
            return ResponseEntity.ok(promotion);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable Integer id) {

        try {
            promotionService.deletePromotion(id);
            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}
