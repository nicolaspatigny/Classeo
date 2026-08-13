package fr.eni.classeo.controller;

import fr.eni.classeo.bll.PromotionService;
import fr.eni.classeo.bo.Eleve;
import lombok.AllArgsConstructor;
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

    @GetMapping("/{id}/eleves")
    public ResponseEntity<?> findElevesByPromotionId(@PathVariable Integer id) {
        List<Eleve> eleves = promotionService.listeElevesParPromotionId(id);
        return ResponseEntity.ok(eleves);
    }
}
