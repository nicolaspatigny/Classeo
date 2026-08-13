package fr.eni.classeo.controller;

import fr.eni.classeo.bll.CoursService;
import fr.eni.classeo.bo.Cours;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cours")
public class CoursController {

    private CoursService coursService;

    @GetMapping
    public ResponseEntity<?> listeCours(){
        return ResponseEntity.ok(coursService.listeCours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCours(@PathVariable Integer id){
        try {
            Cours cours = coursService.getCoursById(id);
            if (cours == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cours introuvable");
            }
            return ResponseEntity.ok(cours);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
